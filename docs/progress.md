# Progress

## Now
Phase 2 checkpoint reached (2026-11-18). Git CD is connected — but on a NEW Netlify project `polite-croissant-ca9011` (the re-import created a fresh project instead of reusing `johnmark-ong-portfolio`, which keeps the old manual static site and its URL). PR #1 (tanstack-migration → main) is open; its Deploy Preview built successfully: https://deploy-preview-1--polite-croissant-ca9011.netlify.app (401 for anonymous until preview visibility is set Public on that project). The failed production build on main is expected (main still holds the old static site; fixes itself at Phase 5 merge). All Phase 1+2 code committed and pushed (bd1e587).

## Next action
Phase 3a (warm theme) and 3b (header/nav/footer + placeholder routes) done, pushed — owner reviewing on the Deploy Preview. Next: 3c Home/About page with photo, then Skills, Projects, CV+Contact.

## Blocked / open questions
- Two Netlify projects exist now. At Phase 5 go-live: merge PR #1 → new project's production builds the new site → then rename projects so the final URL is clean (old project owns `johnmark-ong-portfolio` name until then) or attach a custom domain. Decision to make at Phase 5.
- ajv peer-dep fixed with explicit `ajv@^8` devDependency (see `docs/netlify.md`). Do not remove.
- VS Code terminals show Node v22 until VS Code fully restarts; `nvm use 24` per-terminal. Cosmetic.

## Blocked / open questions
- (none)

## Log
- (date): added AGENTS.md and docs/ for the TanStack Start + shadcn/ui + Netlify rebuild
- 2026-11-17: agent-skills setup — added `docs/agents/` (issue tracker, triage labels, domain docs) and the Agent skills section in `AGENTS.md`; created the triage labels on GitHub
- 2026-11-17: Netlify site created (`johnmark-ong-portfolio`), existing static site deployed via CLI, project made public in the Netlify UI (new projects are private by default), `.gitignore` added
