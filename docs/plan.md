# Plan

Each phase ends with a CHECKPOINT I can see with my own eyes. Do not start the next phase until I confirm.

## Phase 0: Environment and baseline (no site changes)
- [ ] I complete `docs/setup-wsl.md` (human steps)
- [ ] Agent creates branch `tanstack-migration`
- [ ] Agent fills in section A of `docs/architecture.md` (current site inventory) and flags rule conflicts
- [ ] Agent adds `.nvmrc` containing `24`
- CHECKPOINT: I read the inventory and confirm it matches my site.

## Phase 1: Scaffold TanStack Start + shadcn/ui
- [ ] Move the old site into `legacy/` (so nothing is lost)
- [ ] Scaffold TanStack Start with shadcn/ui (see ADR 0002 for the chosen route and fallback)
- [ ] Add one shadcn `Button` to the home page as a test
- [ ] Fill in exact versions in `docs/tech-stack.md` and the real scripts in `AGENTS.md`
- CHECKPOINT: `npm run dev` shows the starter page with a shadcn button in my browser. `npm run build` passes.

## Phase 2: Netlify, early
- [ ] Add `@netlify/vite-plugin-tanstack-start` and register it in `vite.config.ts`
- [ ] Connect the GitHub repo to Netlify (follow `docs/netlify.md`)
- [ ] Deploy the branch
- CHECKPOINT: the starter page is live on a Netlify preview URL.

## Phase 3: Rebuild the site, one page at a time
- [ ] Theme: carry over the warm colours and fonts into the global theme variables
- [ ] Layout: shared header, navigation and footer
- [ ] Home / About (with my photo)
- [ ] Skills
- [ ] Projects
- [ ] Public CV page or download, and Contact
- CHECKPOINT after each page: it looks like my current site on the preview URL, on phone and desktop.

## Phase 4: Quality
- [ ] Rules check: no Zendesk/Jira, no phone number or town on public pages or the public CV
- [ ] Page titles and descriptions for each route
- [ ] Phone and desktop layout pass, typo pass, link check
- CHECKPOINT: I review the full preview site.

## Phase 5: Go live
- [ ] I approve a pull request into `main`
- [ ] Production deploy on Netlify
- [ ] Remove `legacy/` (record in an ADR)
- [ ] Optional: custom domain
- CHECKPOINT: the production URL shows the new site.
