# Progress

## Now
Gmail auto-labeler FINISHED and owner-verified (2026-11-18): merged script runs every 10 minutes — content-based Gmail labels + automatic status updates (rejection → Rejected with Auto note). Issue #11 closed; portfolio /projects card + gmail page updated to the finished scope (8cf9e8e, pushed). Map #2: #3-#7 + #11 closed; frontier = #10 (CV PDF) and #8 (go-live decisions), then #9 (execute).

## Next action
Owner: review the updated gmail page on the preview; decide the CV PDF route (#10) and the go-live decisions (#8: merge PR #1? clean URL name? delete old Netlify projects johnmark-ong-portfolio + johnmarkong? custom domain now or later?). Then #9 execute go-live. Owner also reminded to set the tracker Sheet sharing to Restricted before client demos.

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
