# Job email triage workflow (n8n): the plan (v1)

Status: v1 SHIPPED 2026-11-19 — live in n8n and verified end-to-end.
Build tool: n8n, self-hosted at localhost:5678.
Workflow name: "Job Email Triage". Output: "Support Triage Log" spreadsheet.

## The pivot

The original plan was a support-ticket triage demo with fake tickets. Better
idea: triage REAL job application emails instead. The owner gets job mail
every day, so the workflow is useful immediately, and it doubles as n8n
triage practice. No company needed.

## What already exists (the reuse case)

The "Support Ticket Triage" workflow in n8n already has the right skeleton:

    Gmail Trigger -> Basic LLM Chain (Gemini) -> Parse AI verdict -> Append row in sheet

The credentials (Gmail, Gemini, Google Sheets) are already connected, and
credentials are the most tedious part of n8n. So we UPDATE this workflow,
we do not rebuild.

## How this fits with the Apps Script tracker (important)

The Gmail tracker (Apps Script, every 30 min) stays the system of record:
it labels mail into Jobs/* and moves the Applications tab statuses. The n8n
workflow is a SEPARATE observer: it reads new mail, classifies with AI, and
writes to its own tab. It does not touch the Applications tab in v1, so the
two systems cannot fight each other.

This is exactly the story the portfolio case study already promises:
"Simple rules run the pipeline; AI is next for the messages the rules miss."

## The workflow (v1)

    Gmail Trigger -> AI classify (Gemini) -> Filter: job-related? -> Triage tab row

- Trigger: new mail in inbox.
- AI returns strict JSON: job_related (yes/no), signal (confirmation /
  rejection / interview / assessment / requirements / offer / other),
  company, role, next_action, why (one plain sentence).
- Filter: only job_related = yes continues. Everything else stops there.
- Output: one row per email in a new "Triage" tab of the tracker sheet:
  time, from, subject, signal, company, role, next action, why.
- The AI verdict is always written with its "why": auditable beats magic.

## Learning steps (one at a time, visible result each)

1. Rename the workflow to "Job Email Triage" and look inside the Gmail
   Trigger: what it listens to, and its filter options.
2. Rewrite the Gemini prompt for job emails, demanding strict JSON.
   Learn: prompts + structured output (and why the Code node parse may be
   replaceable with n8n's structured output parser).
3. Update the parse step to the new JSON fields.
4. Point the Sheets node at a new "Triage" tab and map the columns.
5. Add the IF node that filters non-job mail (the owner's "filter" ask).
6. Test: pin 3 sample emails from the inbox, execute, check the tab.
7. Publish, let it run for a day, review the tab together.

## Out of scope for v1

Writing to the Applications tab, auto-labeling Gmail from n8n, dedupe across
thread replies, auto-replies, dashboards. Each is a later version.

## v1 outcome (2026-11-19)

Shipped and verified: a fresh email was classified by Gemini, a non-job
email was correctly stopped at the filter, and a test interview email
landed in the sheet minutes after publishing.

Known v1 limitations (accepted for v1, candidates for v2):
- Every message in a Gmail thread becomes its own row (no dedupe yet)
- Timestamps are machine format (ISO)
- A very short self-sent test email can be judged "not job related"

## v2 candidate improvements

1. Daily digest email (Schedule Trigger -> summarize last 24h -> Gmail):
   "2 rejections, 1 interview, 3 actions needed" every morning.
2. Dedupe by Gmail thread: update the existing row instead of appending.
3. Cheap keyword pre-filter BEFORE Gemini: obvious newsletters never
   reach the AI (token cost awareness).
4. Error workflow: n8n emails the owner when any run fails.
5. Metrics tab: response rate and pipeline counts.
