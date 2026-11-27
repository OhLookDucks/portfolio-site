# Support Desk Simulator (n8n): the plan

Status: PLANNED 2026-11-28. Phase 0 (error alerting, shared with all workflows)
shipped the same day. Phase 1 is next.

## The concept

A simulated support ticket desk, end to end, built for the portfolio. Honest
framing for the case study: "simulated intake, real automation". It shows the
core loop of support operations work with generic tools only: intake, AI
triage, routing, human approval, SLA escalation, metrics. No helpdesk product
is claimed or needed.

Why this project: the email triage workflow proves intake and classification.
This one adds the layers real support-automation roles ask about: routing,
human-in-the-loop approvals, SLA timers, and reporting.

## Guardrails

- Everything is free: self-hosted n8n (no credits), Gemini free tier, Google
  Sheets. The only real constraint: n8n runs while the owner's PC is on.
- The simulator gets its OWN spreadsheet. It never reads or writes the job
  tracker, the triage log, or the demo dashboard spreadsheet.
- The intake form is self-hosted (localhost), so it works on the owner's PC.
  Screenshots go into the case study; a public tunnel is a stretch goal, not
  a requirement.
- No Zendesk or Jira anywhere in skills, CV, or case study.

## The phases (one small visible result each)

- Phase 0, DONE 2026-11-28: "Send failure alert email" with a rate limiter
  (max 1 alert per workflow per hour) protects every workflow, including the
  future ones below.
- Phase 1: intake and triage. An n8n `Form Trigger` ("Submit a support
  ticket": Email, Subject, Description) feeds a Gemini prompt that answers in
  strict JSON: category (technical / billing / account / other), priority
  (urgent / high / medium / low), a one-sentence summary, and a one-sentence
  why. Every ticket lands in the Tickets tab of the simulator spreadsheet.
  Reuse the strict-JSON pattern the owner already knows from Job Email
  Triage.
- Phase 2: routing. A `Switch` node routes on the AI verdict: urgent tickets
  also fire an immediate email to the owner; everything else just logs. This
  is where multi-exit routing replaces the two-way IF.
- Phase 3: human-in-the-loop. The AI drafts a reply, an approval email with
  Approve / Reject links lands in the owner's inbox, and only a click sends
  it. Approval links point at localhost, which works on the owner's PC.
- Phase 4: SLA escalation. A schedule checks for tickets still unresolved
  after N hours and escalates; state lives in a n8n Data Table so nothing
  double-escalates. This is the Data Tables learning step.
- Phase 5: metrics and the case study page. Weekly summary workflow plus a
  new project page with screenshots (canvas, form, approval email, ticket
  board).

## Out of scope

Public webhook intake (needs a tunnel; stretch goal), multi-user anything,
payments, and any real customer data. The desk is a demo fed by the owner's
own test tickets.
