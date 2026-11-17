# Progress

## Now
Phase 0 complete and reviewed. Live site: https://johnmark-ong-portfolio.netlify.app (static deploy, no build yet). Inventory in `docs/architecture.md` section A, confirmed by owner. Node v24.22.3 installed via nvm and default-aliased (verified in a fresh shell — old open terminals need `nvm use 24` or a restart). `.nvmrc` contains `24`. Owner decisions recorded: Cebu stays, Atlassian Rovo stays.

## Next action
Phase 0 committed. Start **Phase 1**: move old site into `legacy/`, scaffold TanStack Start + shadcn/ui (see ADR 0002 for chosen route), add one shadcn Button to the home page as a test, fill in versions in `docs/tech-stack.md` and scripts in AGENTS.md. Checkpoint: `npm run dev` shows the starter page with a shadcn button; `npm run build` passes. Note: run node/npm commands with Node 24 (`nvm use 24`) — non-interactive shells still see v22.

## Blocked / open questions
- (none)

## Blocked / open questions
- (none)

## Log
- (date): added AGENTS.md and docs/ for the TanStack Start + shadcn/ui + Netlify rebuild
- 2026-11-17: agent-skills setup — added `docs/agents/` (issue tracker, triage labels, domain docs) and the Agent skills section in `AGENTS.md`; created the triage labels on GitHub
- 2026-11-17: Netlify site created (`johnmark-ong-portfolio`), existing static site deployed via CLI, project made public in the Netlify UI (new projects are private by default), `.gitignore` added
