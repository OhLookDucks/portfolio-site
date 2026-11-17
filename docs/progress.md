# Progress

## Now
Phase 1 code done, awaiting owner checkpoint. Old site moved to `legacy/`. TanStack Start 1.169.5 + shadcn (nova preset / Base UI) scaffolded at repo root (ADR 0002); npm only (ADR 0003). Build and typecheck pass; dev server verified serving the starter page with a shadcn Button at localhost:3000. Versions filled in `docs/tech-stack.md`; AGENTS.md scripts table updated. Phase 0 committed (ca26fb0); Phase 1 NOT committed yet.

## Next action
Owner: open http://localhost:3000 and confirm the starter page + Button show. Then review `git status` and confirm so Phase 1 gets committed. After that: Phase 2 — add `@netlify/vite-plugin-tanstack-start`, connect GitHub repo to Netlify, deploy the branch.

## Blocked / open questions
- VS Code terminals show Node v22 until VS Code is fully restarted (background server holds old PATH); `nvm use 24` works per-terminal. Cosmetic, does not block anything.

## Blocked / open questions
- (none)

## Log
- (date): added AGENTS.md and docs/ for the TanStack Start + shadcn/ui + Netlify rebuild
- 2026-11-17: agent-skills setup — added `docs/agents/` (issue tracker, triage labels, domain docs) and the Agent skills section in `AGENTS.md`; created the triage labels on GitHub
- 2026-11-17: Netlify site created (`johnmark-ong-portfolio`), existing static site deployed via CLI, project made public in the Netlify UI (new projects are private by default), `.gitignore` added
