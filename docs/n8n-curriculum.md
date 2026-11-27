# n8n curriculum: study plan and quiz protocol

Created 2026-11-28 at the owner's request: study n8n as a student, with the
agent as teacher and examiner. Goal: the knowledge a support operations /
support automation role actually uses, in plain language, all of it free.

## How studying works (the protocol for any agent session)

1. The owner studies one module at a time (read, inspect their own live
   workflows, do the exercise), then says: "quiz me on module N".
2. The agent reads this file and the progress tracker first, then asks 5 to
   8 questions on that module: plain-language definitions, "what went wrong
   here" scenarios, read-this-expression questions, and one find-the-bug
   question. No multiple choice unless the owner asks; answers in their own
   words.
3. Grade strictly but kindly. Always explain the correct answer, and point
   back to the owner's own workflows as the evidence.
4. Passing = solid understanding (roughly 8 of 10 in the agent's judgment).
   Record the result in the tracker below (score, date, weak spots). If
   failed, say what to restudy and re-quiz in a later session.
5. After every two or three passed modules, offer a mixed review quiz of
   older modules (spaced repetition). The owner may also ask for "hard
   mode": design or debug a scenario out loud instead of short questions.
6. Quizzes only happen when the owner asks; this file is the memory between
   sessions.

Question sources: the official n8n docs (docs.n8n.io), the owner's own live
workflows, and the official n8n skills installed in this repo's agent setup.

## The modules

### Module 1: Foundations (you have lived this; the quiz makes it conscious)
- Read: docs.n8n.io, "Understand workflows": workflows, nodes, items,
  executions, triggers vs actions.
- Inspect: open "Job Email Daily Digest" and name each node's role out loud.
- Exercise: explain to an imaginary teammate what an "item" is, and why one
  execution can carry many of them.
- Quiz focus: trigger vs action, items vs executions, what publishing does,
  why a run with zero items skips the rest of the chain.
- Your experience: two live workflows shipped.

### Module 2: Data and expressions
- Read: "How n8n structures data", "Expressions versus data nodes",
  "Referencing data", and the Luxon date/time pages.
- Inspect: the digest's Code node and its `{{ $json.date }}` subject; the
  keyword gate's Boolean expression in Job Email Triage.
- Exercise: write an expression that builds a greeting from an email's
  sender field, handling a missing field safely.
- Quiz focus: `$json`, Fixed vs Expression mode, string methods inside
  expressions, why HTML collapses newlines, field name pitfalls
  (Subject vs subject).
- Your experience: subject expressions, the keyword gate, date formatting.

### Module 3: Core flow nodes
- Read: docs on IF, Switch, Filter, Merge, Edit Fields (Set), Loop Over
  Items, Wait, No Operation, do nothing.
- Inspect: the triage's two-way IF, then sketch where a Switch with four
  exits would replace it.
- Exercise: design on paper a Switch that routes tickets by category
  (technical / billing / account / other).
- Quiz focus: IF vs Switch vs Filter, when a Loop node is actually needed,
  what Wait is for, zero-item skipping.
- Your experience: IF gates, filters, deliberate zero-item digests.

### Module 4: Credentials, HTTP, and the outside world
- Read: credentials docs, HTTP Request node, "Handle rate limits", webhooks.
- Inspect: your Google OAuth credentials and the reconnect story; the
  Testing-to-production switch.
- Exercise: explain the three layers that now protect your Gemini quota
  (retry, keyword gate, rate-limited alerts) and what each one catches.
- Quiz focus: OAuth vs API keys, why tokens expire, what a webhook is, how
  HTTP Request handles pagination, rate limit strategies.
- Your experience: OAuth reconnects, a live 429 storm.

### Module 5: AI nodes and prompting
- Read: AI nodes docs: Basic LLM Chain, AI Agent node, Text Classifier,
  Information Extractor, structured output.
- Inspect: the triage prompt and its armored parser; the desk simulator
  plan's draft prompt.
- Exercise: rewrite the triage prompt for a new domain (invoices instead of
  job emails) keeping strict JSON and the one-line why.
- Quiz focus: strict JSON patterns, code-fence armor, AI Agent vs Basic LLM
  Chain, when a structured output parser helps, guardrails.
- Your experience: live Gemini triage with auditable verdicts.

### Module 6: Production discipline
- Read: error handling docs, error workflows, Retry On Fail, pinning and
  mocking data, workflow history, custom execution data.
- Inspect: "Send failure alert email" including the rate limiter's static
  data; the Stop and Error test workflow you built and deleted.
- Exercise: design an alert that cannot flood, before re-reading how yours
  does it. Compare the two.
- Quiz focus: error workflow vs error branch, retries and their limits,
  idempotency and dedup, static data caveats, testing without side
  effects, the unpublished-draft gotcha.
- Your experience: the storm, the limiter, both gotchas first-hand.

### Module 7: Architecture and housekeeping
- Read: sub-workflows, node groups, naming conventions, folders and
  projects, workflow settings (timezone, error workflow, saving executions).
- Inspect: your workflow names against verb-first conventions; the digest's
  Asia/Manila timezone setting.
- Exercise: sketch how the desk simulator should split into sub-workflows
  (triage / draft / escalate) and what would call what.
- Quiz focus: when extracting a sub-workflow is worth it, naming rules,
  why folders and tags exist, timezone pitfalls.
- Your experience: mostly-right naming, one live timezone setting.

### Module 8: Support operations patterns (the job, as workflow shapes)
- Read: no single canonical source; the patterns live in
  `docs/support-desk-simulator-plan.md` and the case study pages.
- Inspect: the funnel dashboard (SLAs and funnels) and the triage case
  study.
- Exercise: map a real support team's day (intake, triage, resolution,
  escalation, review) onto n8n node shapes.
- Quiz focus: SLA concepts, escalation ladders, human-in-the-loop
  approvals, deflection vs automation, which numbers matter (first
  response, resolution time, backlog).
- Your experience: funnels and dashboards built; the simulator planned.

### Module 9: Capstone: the Support Desk Simulator
- Every phase of `docs/support-desk-simulator-plan.md` doubles as applied
  practice. Phase 1 was kicked off 2026-11-28 and is parked while you
  study. Resume it as this module's exercise, one phase at a time, with a
  quiz between phases.

## Progress tracker

| Module | Status | Quiz score | Date | Weak spots to review |
|---|---|---|---|---|
| 1 Foundations | not quizzed | - | - | - |
| 2 Data and expressions | not quizzed | - | - | - |
| 3 Core flow nodes | not quizzed | - | - | - |
| 4 Credentials and HTTP | not quizzed | - | - | - |
| 5 AI nodes | not quizzed | - | - | - |
| 6 Production discipline | not quizzed | - | - | - |
| 7 Architecture | not quizzed | - | - | - |
| 8 Support ops patterns | not quizzed | - | - | - |
| 9 Capstone: desk simulator | parked | - | - | - |

The agent updates this table in the same docs commit as any other change
after each quiz.
