# n8n study: quiz protocol and progress tracker

The course material of record is `docs/n8n-course.docx` (readable Word copy;
`docs/n8n-course.md` is the editable source of truth, regenerate the docx
with `python3 ~/md2docx.py docs/n8n-course.md docs/n8n-course.docx`).

The course is 17 lessons in 6 parts, self-contained and independent of the
owner's existing projects. The Support Desk Simulator
(`docs/support-desk-simulator-plan.md`) is the capstone after Lesson 17.

## The protocol (for any agent session)

1. The owner studies a lesson, then says: "quiz me on lesson N".
2. The agent reads the tracker below, then asks 5 to 8 questions covering
   that lesson: definitions in the owner's words, "what went wrong"
   scenarios, read-this-expression, and one find-the-bug. No multiple
   choice unless asked. No looking things up during the quiz.
3. **Grade first, correct second**: collect ALL answers before revealing
   anything. Then give a score out of 10, then correct every mistake with a
   full explanation, like a teacher marking a paper.
4. Pass mark: 8/10. On a fail, say what to restudy and re-quiz later.
5. After every few passed lessons, offer a mixed review quiz of older
   lessons. The owner may ask for "hard mode": design a scenario out loud.
6. Update the tracker below in the same docs commit after every quiz.

## Progress tracker

| Lesson | Topic | Status | Score | Date | Weak spots |
|---|---|---|---|---|---|
| 1 | What automation is, and what n8n is | not quizzed | - | - | - |
| 2 | The editor, drafts vs the live world | not quizzed | - | - | - |
| 3 | Triggers | not quizzed | - | - | - |
| 4 | Items and JSON | not quizzed | - | - | - |
| 5 | Expressions | not quizzed | - | - | - |
| 6 | Shaping data (Set, Merge, Split, Aggregate) | not quizzed | - | - | - |
| 7 | Decisions (IF, Switch, Filter, zero-item rule) | not quizzed | - | - | - |
| 8 | Credentials | not quizzed | - | - | - |
| 9 | HTTP Request node | not quizzed | - | - | - |
| 10 | Webhooks | not quizzed | - | - | - |
| 11 | Prompting and structured output | not quizzed | - | - | - |
| 12 | AI nodes (chain, extractor, classifier, agent) | not quizzed | - | - | - |
| 13 | Errors | not quizzed | - | - | - |
| 14 | Testing without fear | not quizzed | - | - | - |
| 15 | Structure and housekeeping | not quizzed | - | - | - |
| 16 | Support operations patterns | not quizzed | - | - | - |
| 17 | Designing an automation from scratch | not quizzed | - | - | - |
| Capstone | Support Desk Simulator build | parked | - | - | - |
