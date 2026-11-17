# Progress

## Now
Ticket #7 closed (2026-11-18): all three project detail pages live in the A+C style via the shared `CaseStudy` component (`src/components/case-study.tsx`), all /projects cards link through. Wayfinder map #2 progress: #4 #5 #6 #7 closed; #3 research closed; frontier now #10 (CV PDF) and #8 (go-live decisions), then #9 (execute). Owner also got a local bonus: sorter handles folders now, task switched to windowless pythonw.exe, `sorter-preview` alias added permanently.

## Next action
Ticket #10: update the public CV PDF — decide route (owner regenerates in their CV tool from agent-drafted content, or agent rebuilds the document) and content (add AI coding agents + portfolio-building tools). Then #8 go-live decisions with the owner (merge PR #1? URL name? delete old Netlify projects? custom domain?), then #9 execute. Full-site review on the preview still pending from the owner (phone + desktop).

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
