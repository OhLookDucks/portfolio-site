# Progress

## Now
Wayfinder milestone map charted on GitHub Issues (2026-11-18): map = issue #2 "Portfolio milestones: setup to deployment", 8 tickets #3–#10 in milestones Foundations & research / Project detail pages / Go-live. Two fact tickets already resolved: Downloads auto-sorter fully recovered from the owner's PC (task \Sort Downloads, script in Documents/automation, 119 lines stdlib Python) and Gmail auto-labeler structure captured from the live Sheet (8 columns; filters → extension → Apps Script; owner warned the Sheet link is public). Research ticket #3 running in background.

## Next action
Work the map: frontier ticket #6 "Prototype the project detail page" (unblocked now #4/#5 are closed) — build a cheap prototype detail page for the owner to react to. Research #3 lands in background. Then #7 build pages, #10 CV, #8/#9 go-live decisions and execution.

## Blocked / open questions
- **CV PDF needs updating** to match the new skills (AI coding agents, portfolio tools) — the PDF is an external artifact; owner to decide: agent drafts new CV content for them to regenerate, or leave as is for now.
- Netlify projects: `incredible-gecko-ee96a8` is the keeper (rename at Phase 5 for a clean URL). Old `johnmark-ong-portfolio` + `johnmarkong` projects still exist with no repo — candidates for deletion at Phase 5 (destructive, owner's call).
- ajv peer-dep fixed with explicit `ajv@^8` devDependency (see `docs/netlify.md`). Do not remove.
- VS Code terminals show Node v22 until VS Code fully restarts; `nvm use 24` per-terminal. Cosmetic.

## Log
- (date): added AGENTS.md and docs/ for the TanStack Start + shadcn/ui + Netlify rebuild
- 2026-11-17: agent-skills setup — added `docs/agents/` (issue tracker, triage labels, domain docs) and the Agent skills section in `AGENTS.md`; created the triage labels on GitHub
- 2026-11-17: Netlify site created (`johnmark-ong-portfolio`), existing static site deployed via CLI, project made public in the Netlify UI (new projects are private by default), `.gitignore` added
- 2026-11-18: Phase 0–2 done and committed; PR #1 open; Git CD connected (project `incredible-gecko-ee96a8` after import retries); Phase 3 pages built and pushed
