# AGENTS.md: Rules for AI agents working on this repo

Read this file fully at the start of every session. Then read `docs/progress.md` (where we are) and the doc for the task at hand.

## Project
Personal portfolio website, used instead of a CV when applying for support operations / support automation jobs. Being rebuilt from the existing warm, human-looking site into TanStack Start + shadcn/ui, deployed on Netlify. Full brief: `docs/PRD.md`.

## About the owner
- Works in customer support. Has NO coding background.
- Explain every change in plain language: what changed, why, and how to see it.
- Prefer small steps with a visible result (a page in the browser, a deploy URL).

## Environment (do not assume anything else)
- Windows PC with **WSL2, Ubuntu 24**. All commands are **Linux/bash**. Never give PowerShell or `C:\` instructions.
- **Node 24**. Pinned in `.nvmrc`. Do not change it without an ADR.
- Package manager: **npm** (see `docs/adr/0003-npm.md`). Do not mix in pnpm/yarn, and never delete `package-lock.json`.
- The repo lives in the Linux filesystem (`~/projects/portfolio-site`), NOT under `/mnt/c`.
- Browser is on Windows; the dev server in WSL is reachable at the `localhost` URL it prints.

## Stack
TanStack Start (React, file-based routes) + Vite, Tailwind CSS, shadcn/ui, deployed on Netlify via `@netlify/vite-plugin-tanstack-start`. Details: `docs/tech-stack.md`.
TanStack Start reached 1.0 in October 2026, so older tutorials and your training data may be wrong. When unsure of an API or CLI flag, check the official docs (tanstack.com/start, ui.shadcn.com, docs.netlify.com) or run the tool with `--help`. If you cannot verify, say so. Do not guess.

## Commands
Exact script names come from `package.json`. Check it before running anything and do not invent scripts. Update this table when they change.

| Purpose | Command |
|---|---|
| Install | `npm install` |
| Dev server | `npm run dev` (open the URL it prints, port 3000) |
| Production build | `npm run build` |
| Type check | `npm run typecheck` (same as `npx tsc --noEmit`) |
| Regenerate route tree | `npm run generate-routes` (only if routes changed outside the dev server) |
| Lint | `npm run lint` |
| Add a shadcn component | `npx shadcn@latest add <name>` |
| Netlify draft deploy | `npx netlify deploy` |

## Conventions
- Routes are files in `src/routes/`. Use `createFileRoute`. Internal links use `Link` from `@tanstack/react-router`, not plain `<a>`.
- UI is built from shadcn components in `src/components/ui/`. Add new ones with the CLI, never copy-paste from memory.
- Import with the `@/` alias (`@/components/ui/button`).
- Keep the warm design: colours, fonts and spacing come from theme variables in the global CSS. Change them in one place, not per component.
- Keep code simple, with short comments where a beginner would be lost.
- Do not add dependencies without asking and explaining why.

## Hard guardrails (never break these)
1. ONE small task at a time. Never "rebuild the whole site".
2. Work on the branch `tanstack-migration`. `main` stays the live site until I approve the merge.
3. Do not hand-edit generated or build files: `src/routeTree.gen.ts`, `.netlify/`, `node_modules/`, build output folders.
4. Do not edit `components.json`, `.nvmrc` or the Netlify plugin setup in `vite.config.ts` unless the task is about them.
5. Keep the warm, human design and my own photo.
6. Do not add Zendesk or Jira to the skills or the CV.
7. The public CV must not contain my phone number or town. Check any CV file before it goes in the repo.
8. Never commit secrets or `.env` files. Confirm `.gitignore` covers them.
9. Do not commit until I confirm the result looks right. Do not push to `main`.
10. Do not run destructive commands (`rm -rf`, `git reset --hard`, force push) without asking first.
11. No em dashes (—) anywhere on the public site or in CV material. If a dash feels truly needed, ask me first.

## Working loop (every task)
1. **Prompt:** I give you a task (`docs/task-template.md`).
2. **Execute and check:** make the change, then run the checks below.
3. **Review:** show me what changed (`git diff`) in plain language and tell me how to see it.
4. **Iterate** on my feedback.
5. **Update state:** `docs/progress.md` and any doc that is now out of date.
6. **Commit** only after I say it looks good.

## Checks after every change
- `npm run build` passes
- `npx tsc --noEmit` passes
- Page looks right at phone width and desktop width in the browser
- Links work, no typos
- No Zendesk/Jira, and no phone number or town anywhere on public pages

## Start and end of a session
- Start: read this file, `docs/progress.md`, then the relevant doc. State in one line what you understand the next task to be.
- End: update `docs/progress.md` (what was done, what is next, anything blocked) so the next session can pick up cold.

## Keeping context healthy
- Update this file when commands, tools or conventions change.
- Keep `docs/architecture.md` matching the real files.
- Record big decisions in `docs/adr/` so we do not re-argue them.
- Outdated docs mislead you. If a doc is wrong, fix it or tell me.

## Docs map
- `docs/PRD.md`: what the site is and must contain
- `docs/tech-stack.md`: tools and versions
- `docs/architecture.md`: current site inventory and target structure
- `docs/plan.md`: phases with checkpoints
- `docs/progress.md`: where we are now
- `docs/setup-wsl.md`: one-time environment setup (for me, the human)
- `docs/netlify.md`: how deployment works
- `docs/task-template.md`: how I phrase tasks
- `docs/adr/`: decisions and why
- `docs/agents/`: how engineering skills find issues, labels, and domain docs

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues (OhLookDucks/portfolio-site) via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default triage labels, unchanged: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` at the repo root (created lazily, only when needed) plus `docs/adr/` for decisions. See `docs/agents/domain.md`.
