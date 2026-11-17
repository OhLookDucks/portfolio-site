# Progress

## Now
Phase 3 content complete (2026-11-18): warm theme, shared header/nav/footer, Home (hero + photo + About), Skills (5 card groups incl. AI-agent learning), Projects (3 cards with peach tags), Contact (sand card + 3 buttons). All pushed to PR #1; owner reviews on the Deploy Preview at https://deploy-preview-1--incredible-gecko-ee96a8.netlify.app (that project is the Git-connected one; the `polite-croissant-ca9011` duplicate was deleted by the owner).

## Next action
Owner reviews Home/Skills/Projects/Contact on the preview (phone + desktop). Then **Phase 4 — quality pass**: rules check (no Zendesk/Jira, no phone; Cebu approved), page titles/descriptions per route, typo/link pass. Then Phase 5 — merge PR #1, go live, clean URL.

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
