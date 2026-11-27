# n8n from zero: the complete study course

A self-contained course. No prior coding knowledge assumed. Everything works on the free, self-hosted version of n8n.

## How this course works

1. Study one lesson at a time. Read it, do the exercise, and check yourself against the checkpoint questions at the end.
2. When a lesson feels solid, come back and say: "quiz me on lesson 7".
3. Quizzes work like a real classroom: I ask 5 to 8 questions, you answer ALL of them first in your own words, and only then do I grade you (a score out of 10) and correct every mistake with a full explanation. No looking things up while the quiz is running.
4. Pass mark is 8 out of 10. Fail means restudy and a fresh quiz later; nothing else changes.
5. After every few lessons, I will offer a mixed review quiz of older lessons, because knowledge that is not revisited quietly disappears.

There are 17 lessons in 6 parts, plus a cookbook, a glossary, and the study protocol.

---

# Part 1: Foundations

## Lesson 1: What automation is, and what n8n is

**The idea.** Every week, you do digital chores: copy information from one app to another, sort messages, send reminders, build reports. An automation is a set of steps described once so a machine repeats them exactly, at any hour, without getting bored or distracted. n8n is a tool for describing those steps visually: you draw boxes on a canvas, connect them with lines, and each box does one specific job. The boxes are called **nodes**, the drawing is called a **workflow**, and each time it runs is called an **execution**.

n8n has two flavors. **Cloud** is their hosted service: you pay a subscription and they run it for you. **Self-hosted** is free software running on your own machine: unlimited workflows and executions, no credits, but it only runs while your machine is on. Both work identically inside the editor.

**In practice.** The editor has four areas you will live in: the canvas (where workflows are drawn), the node panel (opens when you double-click any node; every setting lives there), the input and output panels (they show what data entered and left a node), and the executions list (every run, successful or failed, with its full log).

**Watch out.** An automation is only as reliable as its most fragile step. Good automation is not "it worked once"; it is "I know what happens when it fails". The later lessons on errors exist because of this rule.

**Exercise.** Write down three repetitive digital chores from your own week. For each one, fill in this sentence: "When THING HAPPENS, I want these STEPS to run, ending with RESULT."

**Checkpoint questions.** What is a node? What is an execution? What is the practical difference between cloud and self-hosted n8n? What does publishing a workflow do?

## Lesson 2: The editor, and the difference between a draft and the live world

**The idea.** Building and living are two different states. While you edit, a workflow is a **draft**: nothing automatic happens. When you publish it (older versions called it "activate"), the triggers go live and the workflow starts running on its own. Every edit after that stays a draft until you publish again. Forgetting this is the single most common "why is it still behaving the old way?" mistake.

**In practice.** Add nodes with the plus button; search by name. Click any node to open its panel: Parameters (its settings) and Settings (its behavior, like retries). The "Execute step" button runs just that one node using real data from the previous step. The executions tab shows each run as a timeline of nodes: green checkmarks or a red X with the error message. When debugging, always start from the executions tab: read the run node by node until the data stops looking like you expect.

**Watch out.** Manual runs (clicking execute) are for building, not for production: triggers behave differently, and some memory features do not save during manual runs. Never judge "it works" from a manual run alone; the proof is a live execution.

**Exercise.** In any workflow of yours, open one failed execution and trace it node by node until you find the first node whose output looks wrong.

**Checkpoint questions.** What is a draft? Where do you find why a past run failed? What does "Execute step" do differently from running the whole workflow?

## Lesson 3: Triggers: every workflow starts here

**The idea.** The first node in every workflow is a trigger, and it answers one question: when does this run? Four families cover almost everything: **Manual** (you click), **Schedule** (the clock: every hour, every morning, custom patterns), **Webhook** (a specific URL gets called), and **App triggers** (an app event: a new email arrives, a new row appears, a form is submitted). App triggers come in two styles: **polling** (n8n checks the app every few minutes and collects anything new) and **event** (the app notifies n8n instantly).

**In practice.** A schedule trigger has an interval setting and respects the workflow's timezone, which you set in workflow settings. If your 8am digest fires at the wrong hour, the timezone is the first suspect. Polling triggers only output what is new since the last check; if nothing is new, they output zero items and the workflow simply does nothing that cycle.

**Watch out.** Three classic traps. First, timezone: a schedule set for 08:00 in the wrong timezone runs at a surprising hour. Second, zero items: a trigger finding nothing new is normal and healthy, not a bug. Third, failed runs: with many polling triggers, items that caused a failure are not marked as processed, so they come back on the next poll. If your failure repeats on a schedule, that is usually why.

**Exercise.** Choose the trigger for each scenario and justify in one sentence: a sales summary every morning at 07:00; an instant reaction when someone submits a form; a check of a weather API every 15 minutes.

**Checkpoint questions.** Name the four trigger families. What is the difference between polling and event triggers? Why does timezone matter? What happens when a trigger finds nothing new?

## Lesson 4: Items and JSON: how information moves

**The idea.** Data inside n8n moves as **items**. Each item is one JSON object: a set of named fields with values, like `{"subject": "Hello", "unread": true}`. JSON has a tiny vocabulary worth memorizing: objects (curly braces holding named fields), arrays (square brackets holding lists), and values that are strings, numbers, booleans (true/false), or null. Items can nest: a field can contain an object or an array of objects.

The key mental model: a node receives items, does its job **once per item**, and outputs items. One execution can carry one item or a thousand. Most nodes handle each item independently, which means a workflow built for one email automatically works for fifty.

**In practice.** Every node panel has an INPUT and an OUTPUT side, each with three views: Schema (fields as friendly rows), Table (a spreadsheet-like grid of items), and JSON (the raw truth). When something confuses you, switch to the JSON view: it shows exactly what exists, including fields you did not expect and exact capitalization.

**Watch out.** Field names are case-sensitive: `Subject` and `subject` are different fields, and using the wrong one gives you "undefined". Missing fields do not error by themselves; they produce undefined, which then breaks whatever tried to use it. And remember the difference between an array field (a list inside one item) and multiple items (several objects flowing through).

**Exercise.** On paper, write the JSON for one customer message: sender, subject, body, received date, and a list of labels attached to it.

**Checkpoint questions.** What is an item? What does a node do when it receives five items? Where do you see the exact data a node received? What does "undefined" usually mean in an output?

---

# Part 2: Working with data

## Lesson 5: Expressions: teaching nodes to compute

**The idea.** A field can hold a fixed value ("Hello") or an **expression**: a small piece of logic in double curly braces that n8n evaluates at run time. Expressions are JavaScript-flavored but you only need a small toolkit. The most important variable is `$json`, which is the data of the item currently being processed. `{{ $json.subject }}` means "put the subject field here".

**In practice.** The everyday toolkit: `{{ $json.email }}` reads a field. `{{ $json.subject.toLowerCase() }}` transforms it. `{{ ($json.subject || "") }}` provides a safe fallback when a field might be missing. `.includes("word")` checks whether text contains something. `.replace("a", "b")` swaps text. `.slice(0, 100)` cuts text to a length. Dates use a library called Luxon: `{{ $now }}` is the current time, `{{ $now.minus({ hours: 24 }) }}` is yesterday, `{{ $now.toFormat("yyyy-MM-dd") }}` formats it. To reference data from an earlier node rather than the immediate one: `{{ $('Node name').first().json.field }}`.

Every value box has a **Fixed / Expression** toggle. Fixed means "this exact text"; Expression means "compute it". The expression editor shows a live preview underneath, which is how you check your work before running anything.

**Watch out.** Four recurring traps. Case sensitivity: `Subject` and `subject` differ. Missing fields: guard with `|| ""` or `|| "default"`. Escaping: writing `\n` inside an expression does not always survive n8n's editor storage; if a newline trick misbehaves, move that logic into a Code node where the JavaScript is real. And empty input: an expression cannot run without data, so "no output" during a manual test usually means the previous step had zero items, not that your expression is wrong.

**Exercise.** Given an item with fields `firstName` and `email`, write an expression producing `Welcome, Ana!` and a safe version that says `Welcome, friend!` when `firstName` is missing.

**Checkpoint questions.** Fixed vs Expression: what is the difference? What is `$json`? How do you read a field from a node two steps back? How do you handle a field that might be missing?

## Lesson 6: Shaping data: the workshop nodes

**The idea.** Real apps never send data in exactly the shape the next step needs, so n8n has a workshop of reshaping nodes. **Edit Fields (Set)** picks, renames, computes, and cleans fields. **Split Out** takes one item holding an array and splits it into many items. **Aggregate** does the opposite: many items become one (a list, a total, a summary). **Sort** orders items, **Limit** keeps the first few, **Remove Duplicates** drops repeats, and **Merge** combines two branches into one (by position, by matching a key, or by appending).

**In practice.** A classic chain: an API returns 100 rows, and you want the five most recent summarized into one item. Sort by date, Limit to 5, then Aggregate into a single item whose field is the array of the five. Another classic: a form returns one item with a `tags` array; Split Out turns it into one item per tag so each tag flows through the rest of the workflow separately.

**Watch out.** Two mind-benders. First, Aggregate has two personalities: "combine into one item" and "keep items but add a shared field"; read its mode carefully. Second, when many items flow into a node that talks to an external service, that service gets called once per item: fifty items means fifty emails. If you want one email, aggregate first.

**Exercise.** Describe the node chain that turns 50 survey answers into one item containing the average score and a list of all comments.

**Checkpoint questions.** What are Split Out and Aggregate for? Name three Merge modes. Why might fifty items accidentally mean fifty emails?

## Lesson 7: Decisions: IF, Switch, Filter, and the zero-item rule

**The idea.** Three nodes make decisions. **IF** is a fork with exactly two exits (true and false). **Switch** is a router with many exits (route by category: technical, billing, account). **Filter** is a gate in a straight line: matching items continue, non-matching items are dropped. Conditions compare values with typed operators (string contains, number is greater than, date is before, boolean is true) combined with AND (all must match) or OR (any must match).

**In practice.** The zero-item rule is the most important behavior in this lesson: if no items pass a decision, the downstream nodes do not run at all. A report workflow with nothing to report sends no email, and that is usually the correct design. The other side of the coin: when you want "do something only when there IS data", you must design for it, because zero items skip everything, including your "send the empty report" step.

**Watch out.** "Contains" versus "equals": contains finds text inside text, equals demands exact equality. Comparisons are case-sensitive unless you normalize first (compare lowercased versions). And remember that decisions evaluate per item: one item may pass while the next fails, so a single run can produce true output and false output at the same time.

**Exercise.** Design the decision shape for a ticket desk: urgent tickets alert the owner immediately, billing tickets go to a spreadsheet, everything else gets archived.

**Checkpoint questions.** IF vs Switch vs Filter: when do you use each? What is the zero-item rule? How do "contains" and "equals" differ?

---

# Part 3: The outside world

## Lesson 8: Credentials: how n8n keeps secrets

**The idea.** Almost every external service needs proof that you are you. n8n stores those proofs as **credentials**: encrypted inside n8n, referenced by nodes, never written into workflow logic. The two species you must understand: **API keys** (a long secret string you paste once; simple, and it stays valid until revoked) and **OAuth** (a login dance: you click "sign in with Google", approve permissions, and n8n receives tokens it can refresh automatically).

**In practice.** OAuth has moving parts: a consent screen (you approve scopes: what the app may access), a redirect URL (where Google sends you back; for self-hosted n8n this points at your own machine), and tokens. Test-mode OAuth apps have tokens that expire quickly (about weekly for Google), while published apps get long-lived tokens. When you see "the credential needs to be reconnected", it means the token died: open the credential, sign in again, save.

**Watch out.** Secrets belong only in credentials: never in node fields, never in sticky notes, never in chat messages. Name credentials by purpose ("Google account: main") so future-you knows which is which, because when a node uses the wrong credential, everything looks right and silently touches the wrong account. And prefer least access: approve the narrowest scopes that work.

**Exercise.** List every credential in your n8n, what it is for, and which one would hurt most if it expired tomorrow.

**Checkpoint questions.** API key vs OAuth: what is the difference? Why do OAuth tokens expire? What are the first three things to do when a credential breaks? Where must secrets never be pasted?

## Lesson 9: The HTTP Request node: talk to anything

**The idea.** One node can talk to almost every service on the internet: **HTTP Request**. It speaks the web's native language: a **method** (GET to read, POST to create, PUT to update, DELETE to remove), a **URL**, optional **headers** (extra instructions, often the authentication), optional **query parameters** (filters in the URL), and a **body** (the data you send, usually JSON). If n8n has no dedicated node for a service, this node is the answer.

**In practice.** Reading a response starts with the **status code**: 200 means success; 4xx means you made a mistake (401 unauthorized: bad credentials; 404 not found: wrong URL; 429 too many requests: slow down); 5xx means their server stumbled. Pagination is the art of fetching long lists page by page: common styles include a page number parameter, a "next page URL" handed back in the response, or "fetch until the response is empty". The HTTP node has built-in pagination options; the concept matters more than the settings.

**Watch out.** Rate limits are the web's traffic laws: exceed them and you get 429. Respect them with spacing, batches, and retries. Bodies come in flavors (JSON, form data, raw text) and the wrong flavor produces confusing errors. And always ask: what does this call cost, and what does it change? A GET is a question; a POST usually changes something.

**Exercise.** Pick any free public API. Write down: method, URL, authentication style, and one thing you would do with the response inside n8n.

**Checkpoint questions.** GET vs POST? What do 401, 404, 429 and 5xx each mean? Name two pagination styles. Why should you pause before a node that POSTs?

## Lesson 10: Webhooks: letting the world start your workflows

**The idea.** A webhook flips the trigger around: instead of n8n checking for new things, the outside world calls a URL and your workflow runs instantly. Forms, chat tools, payment services, other automations: anything that can make a web request can start your workflow. A **Respond to Webhook** node lets your workflow answer the caller directly (for example, "ok, received"), which is how you build tiny APIs.

**In practice.** The webhook node gives you two URLs: a test URL (works while you are building, when you click "listen for test event") and a production URL (works only while the workflow is published). The caller's data arrives as items: usually the body of their request. Design what your workflow sends back: instant acknowledgment ("received") or the full result.

**Watch out.** A webhook URL is a door: anyone with the URL can knock. Real doors need validation: a secret token in the URL or a header check before trusting the payload. Self-hosted n8n lives on your machine, so its URLs are reachable only from your own network until you deliberately expose them with a tunnel. And respond fast: callers wait for your answer, so acknowledge first and process later when the work is heavy.

**Exercise.** Design the intake for a form tool that POSTs each submission to your webhook: which fields arrive, how do you validate it is really your form, and what do you answer?

**Checkpoint questions.** Webhook trigger vs polling trigger? Test URL vs production URL? Why validate callers? What does Respond to Webhook do?

---

# Part 4: AI inside n8n

## Lesson 11: Prompting and structured output

**The idea.** An AI language model turns text into text. Your prompt is the specification, and vague specs produce vague output. A production prompt has five parts: a **role** ("you are a support triage agent"), a **task** ("classify the message"), an **exact output format** ("reply with strict JSON using exactly these keys"), **constraints** (allowed values, what to do when unsure), and an **example** when the task is subtle.

The most important professional pattern is **structured output**: instead of asking for prose, demand strict JSON with a fixed set of keys and allowed values. Structured answers can be checked by a machine, stored in a table, and audited by a human. Adding a "why" field with a one-sentence explanation makes every AI verdict reviewable, which is the difference between a magic black box and a trustworthy assistant.

**In practice.** A strict prompt skeleton: role, task, "Reply with strict JSON only, no markdown fences, exactly these keys: category (one of technical, billing, account, other), priority (one of urgent, high, medium, low), summary (one short sentence), why (one short sentence)." Then feed the input text. Then parse the JSON: many workflows include a small parsing step that strips leftover formatting and validates that every expected key exists with an allowed value.

**Watch out.** Models sometimes wrap JSON in markdown code fences (triple backticks), which breaks naive parsers: armor your parsing by stripping fences first. Models occasionally invent values: validate the answer against your allowed lists. And mind the meter: you pay in **tokens** (chunks of text, both what you send and what you receive), so every email that reaches the AI costs money or quota. A cheap gate before the expensive judge is the standard cost pattern: simple keyword checks first, AI only for what passes.

**Exercise.** Write a strict-JSON prompt that classifies a customer message into category, urgency, a one-sentence summary, and a one-sentence why. Include the "no markdown fences" instruction and allowed values.

**Checkpoint questions.** What are the five parts of a production prompt? What is a code fence and why does it break parsers? What does 429 mean? Why is a "why" field worth its tokens?

## Lesson 12: AI nodes: chains, extractors, classifiers, agents

**The idea.** n8n ships four main AI shapes, and choosing the right one is most of the skill. **Basic LLM Chain**: one prompt, one answer. The general-purpose shape. **Information Extractor**: text in, structured fields out (pull the order number and date from a message). **Text Classifier**: text in, one of N categories out (built for routing). **AI Agent**: an LLM that can **call tools** mid-conversation: look something up, write somewhere, decide its own next step. Agents also keep **memory** across a conversation.

The selection rule: use the smallest shape that works. A chain is predictable and cheap; an agent is powerful but less predictable, because the model chooses which tools to use.

**In practice.** A helpdesk example across all four: a chain drafts a reply; an extractor pulls the order number from the customer's message; a classifier routes the message to billing or technical; an agent answers "where is my order" by calling a lookup tool against your order database. Every AI answer that reaches a customer should pass a **human-in-the-loop** checkpoint first: the AI drafts, a person approves, then it sends. That pattern is the first one most real teams deploy.

**Watch out.** Give agent tools short names and honest descriptions: the model reads them to decide what to use. Never let an AI send, delete, or pay without approval. And treat every AI answer as a draft until validated: allowed-value checks, a human glance, or both.

**Exercise.** For each task, pick the right shape and justify: draft a refund reply; pull invoice numbers from emails; route messages to three departments; answer "what is my balance" by looking it up live.

**Checkpoint questions.** Name the four AI shapes and their jobs. What are tools and memory in an agent? Why is human approval the default for anything customer-facing?

---

# Part 5: Production discipline

## Lesson 13: Errors: the lesson that separates toys from systems

**The idea.** Failures are normal operations, not surprises: networks hiccup, quotas run out, inputs arrive wrong. Production workflows have four error tools. **Retry On Fail** (a node setting): try again after a pause; fixes momentary failures. **Error branch**: a node can route failures down a different path instead of dying. **Error workflow**: a dedicated safety-net workflow that runs automatically when ANY workflow fails; it receives the failing workflow's name, the failed node, the error message, and a link to the run. **Stop and Error**: fail on purpose, for validation and for testing your error workflow.

Alerting needs design too. A good failure email contains: which workflow, which node, the error message, and a link to the failed run. And an alert system needs **rate limiting**: without it, a stuck loop (a failing trigger re-processing the same data every minute) emails you sixty times an hour, and you learn to ignore your own alarms. One alert per workflow per hour, with the details in the message, is a sane default.

**In practice.** Two deeper concepts belong here. **Idempotency**: an operation is idempotent when running it twice has the same effect as running it once; achieve it by checking a log before acting ("did I already handle this email?"). **Deduplication**: dropping repeats by a stable key (message ID, thread, order number) before expensive steps.

**Watch out.** Retries cannot fix an exhausted quota; they only fix momentary failures. Alerts that repeat become noise, and noise trains you to ignore the one alert that matters. Code errors are read literally: "identifier already declared" really means the same name was declared twice.

**Exercise.** Design the error layer for a system with three workflows: what fires when something fails, what the alert contains, and how the design prevents a flood.

**Checkpoint questions.** Retry On Fail vs error branch vs error workflow: what does each do? What belongs in a failure alert? Why rate-limit alerts? What does idempotent mean?

## Lesson 14: Testing without fear

**The idea.** The professional difference between a hobbyist and an operator is that the operator tests without touching the real world. n8n's tools: **pinning** (freeze a node's output as sample data, so downstream nodes build against stable data), **mock data** (invent input for a node that has none yet), **Execute step** (run one node, not the whole chain), **Execute previous nodes** (produce input for the node you are building), and **test workflows** (a deliberately failing workflow, published, that proves your error alerting works). Add **version history** (n8n saves every published version and you can restore one) and you can experiment without fear.

**In practice.** The safe-testing question to ask before any run: "what does this workflow touch when it runs?" Triggers, credentialed nodes, and HTTP calls can reach the real world even in tests; pure logic nodes (IF, Set, Code) cannot. Pin the API response, build the logic, verify against pinned data, then unpublish-safe before going live. To test an error workflow, build a tiny separate workflow with a Schedule trigger and a Stop and Error node, point it at your error workflow, publish, let it fail once, then delete it.

**Watch out.** Manual runs are a rehearsal, not the show: triggers feed mock or pinned data, and some memory features do not save outside real runs. A test that "passed" in manual mode can behave differently live. Always prove at least one real production execution before declaring victory.

**Exercise.** For a hypothetical workflow (form in, AI classify, email out, sheet write), list every node as SAFE to test freely or TOUCHES THE REAL WORLD, with one line why.

**Checkpoint questions.** What is pinning? Why do manual runs differ from live runs? How do you test an error workflow without waiting for a real failure? What does version history give you?

## Lesson 15: Structure and housekeeping

**The idea.** Workflows are read by future-you, usually at 2am during an incident. **Naming** carries most of the weight: workflows get verb-first, scoped names ("Send failure alert email", not "Workflow 3"); nodes describe what they do here ("Get row(s) in sheet", not "Google Sheets4"). **Sticky notes** explain the why (the constraint that forced a design), not the obvious. **Node groups** fold sections of the canvas under named frames. **Sub-workflows** are workflows that other workflows call: extract one when multiple workflows need the same logic (a strict-JSON parser, a "send me a notification" helper).

**In practice.** Organization layers: folders and projects group workflows; tags make them searchable; workflow settings hold the timezone, the error workflow, and whether execution data is saved. Every production workflow deserves three settings checked: correct timezone (schedules depend on it), an error workflow attached, and sensible execution saving (you need history to debug, but sensitive data should not sit in logs forever).

**Watch out.** Two rot patterns: giant single workflows that do five jobs and break in five ways (extract coherent pieces into sub-workflows), and default node names that turn the canvas into alphabet soup. Neither is fatal today; both are expensive in six months.

**Exercise.** Take one real workflow of yours: rename it verb-first, rename every node to describe its action, and add one sticky note capturing the why of the design.

**Checkpoint questions.** What makes a good workflow name? When is extracting a sub-workflow worth it? Which three settings should every production workflow have checked?

---

# Part 6: The job

## Lesson 16: Support operations patterns: the classic loop as workflow shapes

**The idea.** Support operations has a loop, and every stage maps to nodes you now know. **Intake**: email, form, or webhook arrives. **Triage**: AI classifies category and urgency (strict JSON, auditable "why"). **Routing**: a Switch sends each type to the right path. **Resolution**: either an instant answer (knowledge base, template) or a drafted reply awaiting **human approval**. **Escalation**: a schedule checks for tickets nobody touched within the promised time and raises an alarm. **Review**: scheduled metrics workflows compute first response time, resolution time, and backlog, and deliver a digest.

The vocabulary hiring managers use: an **SLA** is a promise with a clock ("first reply within 4 hours"); an **escalation ladder** is who sees it first, second, and third when time runs out; **human-in-the-loop** is AI drafts and a person approves, the first pattern real teams deploy because it is safe; **deflection** is answering before the ticket exists (self-service content), which lowers volume rather than speeding up handling.

**In practice.** The minimal serious desk: intake form, AI triage to a log, Switch for urgent vs normal, approval-gated replies, a daily summary. Every stage writes rows to a log, because without logs there are no metrics, and without metrics you are guessing.

**Watch out.** Automate the measurable and repetitive; keep judgment calls human. Every automatic message needs either approval or strict, tested guardrails. And an SLA you do not measure is a wish, not an SLA.

**Exercise.** Draw the full lifecycle for a small online shop's support inbox: stages, nodes per stage, what gets logged, and where the human approvals sit.

**Checkpoint questions.** Define SLA in one sentence. Describe the approval pattern. Name three metrics worth a weekly email. What is deflection?

## Lesson 17: Designing an automation from scratch

**The idea.** A repeatable design method turns vague wishes into buildable workflows. Eight questions, in order:

1. What event starts this? (the trigger)
2. What data arrives, exactly? (fields, shapes, volume)
3. What decisions does the data need? (the branches)
4. What actions and side effects happen? (emails sent, rows written, things changed)
5. What can fail, and what then? (retries, fallbacks, alerts)
6. Who approves the risky parts? (human-in-the-loop)
7. What gets logged? (so metrics and debugging exist later)
8. How will you know it worked? (the proof: a test email, a row, a metric)

**In practice.** Walk one example end to end. Expense reports by email: trigger, an email arrives (1); fields: sender, attachment amount (2); decisions: amount over limit? known submitter? (3); actions: log the row, notify the manager (4); failures: bad attachment, quota, missing field (5); approvals: over-limit needs the manager's click (6); log: every report with status and decision (7); proof: one real report processed correctly end to end (8). Only now do you open the editor.

**Watch out.** Build the smallest useful version first, then grow it. Side effects come last in testing (log writes before emails, emails before payments). And no error plan means a storm later; question 5 is not optional.

**Exercise.** Fully design one automation for your own life using the eight questions, on paper, before touching n8n.

**Checkpoint questions.** Recite the eight questions in order. Why do side effects come last? What does "smallest useful version" mean?

---

# Appendix A: the expression cookbook

Ten snippets that cover most daily needs. Replace field names with yours.

1. Safe field read: `{{ $json.field || "default" }}`
2. Case-insensitive contains check: `{{ ($json.subject || "").toLowerCase().includes("invoice") }}`
3. Build a line from parts: `{{ ($json.company || "Unknown") + ": " + ($json.amount || "0") }}`
4. Date math: `{{ $now.minus({ hours: 24 }) }}`
5. Format a date: `{{ $now.toFormat("yyyy-MM-dd HH:mm") }}`
6. Turn newlines into HTML breaks: `{{ ($json.text || "").replace(/\n/g, "<br>") }}` (if escaping misbehaves, do the replace in a Code node instead)
7. Join an array of items into one string: `{{ $json.items.map(i => i.name).join(", ") }}`
8. Keep only matching entries: `{{ $json.rows.filter(r => r.status === "open") }}`
9. Reference an earlier node safely: `{{ $('Get customer').first().json.email || "unknown" }}`
10. Count items from the previous node: `{{ $items().length }}` (in a Code node, use `input.all().length`)

# Appendix B: glossary

- **Node**: one box in a workflow; one job.
- **Trigger**: the first node; decides when the workflow runs.
- **Item**: one JSON object flowing through a workflow.
- **Execution**: one run of a workflow, with its full log.
- **Publish (activate)**: make a workflow live; drafts do nothing until published.
- **Credential**: n8n's encrypted storage for logins (API keys, OAuth tokens).
- **OAuth**: a login dance where you approve scopes and n8n receives refreshable tokens.
- **API key**: a secret string that authenticates API calls.
- **Webhook**: a URL that starts a workflow when called.
- **Polling**: a trigger style where n8n checks an app for new items on an interval.
- **Expression**: a computed value in double curly braces.
- **Rate limit**: a service's cap on how often you may call it; exceeded means 429.
- **429**: "too many requests"; the classic over-quota error.
- **Idempotency**: running twice has the same effect as running once.
- **Deduplication**: dropping repeats by a stable key.
- **Sub-workflow**: a workflow that other workflows call as a step.
- **Pinning**: freezing a node's output as sample data for safe testing.
- **Static data**: a small memory n8n keeps between published runs.
- **Error workflow**: a safety-net workflow that runs when any workflow fails.
- **SLA**: a service promise with a clock ("first reply within 4 hours").
- **Human-in-the-loop**: AI drafts, a person approves, then it acts.
- **Deflection**: answering before a ticket exists, lowering volume.

# Appendix C: the study protocol

- Study one lesson at a time. Do the exercise. Answer the checkpoint questions out loud.
- Come back and say "quiz me on lesson N". You may also ask for a mixed review quiz of older lessons, or "hard mode" (design a scenario out loud).
- Quiz rules: I ask 5 to 8 questions. You answer all of them first, in your own words, without looking anything up. Then I grade you out of 10, and then I correct every mistake with a full explanation, like a teacher marking your paper.
- Pass mark: 8 out of 10. Your scores and weak spots are tracked in `docs/n8n-curriculum.md`, so any session can pick up where you left off.
- The Support Desk Simulator (see `docs/support-desk-simulator-plan.md`) is the capstone: build it phase by phase after Lesson 17, and it becomes your second portfolio case study.
