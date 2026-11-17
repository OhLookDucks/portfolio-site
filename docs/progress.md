# Progress

## Now
GO-LIVE COMPLETE (2026-11-18). Production URL https://johnmark-ong-portfolio.netlify.app serves the new TanStack Start site (public, verified). PR #1 + #12 merged into main; all wayfinder tickets closed (#3-#11) including #10 (CV rebuilt, shipped to public/JohnMark_Ong_CV.pdf) and #8/#9 (go-live decisions + execution: rename swap done, retired projects johnmarkong + johnmark-ong-portfolio-old deleted). Netlify now has exactly ONE project. Milestone map #2: destination reached.

## Next action
Milestone map fulfilled. New work candidates (not started): Support ticket triage build in a no-code tool (owner learning n8n/Make/GHL for upskilling — plain-language walkthrough given 2026-11-18); client-ready Rules tab + dashboard for the Gmail tracker; custom domain purchase (optional). Skills page now names ZCode.

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
