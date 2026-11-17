# Progress

## Now
Phase 2 code done; Phase 1 committed (90e8c10). Netlify plugin installed and registered in `vite.config.ts`; build + typecheck pass; `npx netlify deploy --build` draft deploy of the NEW TanStack starter works on Netlify Functions. Production still shows the old site. Git CD not connected yet. Phase 2 code changes NOT committed yet (vite.config.ts, package.json, package-lock.json, ajv devDep, docs).

## Next action
Owner: (1) open the draft URL from the last deploy — visible when logged into Netlify; (2) fix preview visibility: Project configuration → General → Visitor access → set Deploy previews/branch deploys to Public; (3) connect the repo for Git CD per `docs/netlify.md` ("Connect the repo"). Then agent commits Phase 2, pushes `tanstack-migration`, and the branch deploy URL is the checkpoint.

## Blocked / open questions
- ajv peer-dep: Netlify plugin needs ajv@8; scaffold's `legacy-peer-deps=true` skips peers — fixed with explicit `ajv@^8` devDependency (see `docs/netlify.md`).
- VS Code terminals show Node v22 until VS Code fully restarts; `nvm use 24` per-terminal. Cosmetic.

## Blocked / open questions
- (none)

## Log
- (date): added AGENTS.md and docs/ for the TanStack Start + shadcn/ui + Netlify rebuild
- 2026-11-17: agent-skills setup — added `docs/agents/` (issue tracker, triage labels, domain docs) and the Agent skills section in `AGENTS.md`; created the triage labels on GitHub
- 2026-11-17: Netlify site created (`johnmark-ong-portfolio`), existing static site deployed via CLI, project made public in the Netlify UI (new projects are private by default), `.gitignore` added
