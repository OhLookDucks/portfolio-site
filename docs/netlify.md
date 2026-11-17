# Deploying on Netlify

## Current state (2026-11-17)
- Site: https://johnmark-ong-portfolio.netlify.app (project `johnmark-ong-portfolio`, ID `6137251b-6fb2-41ba-8c7d-0f547529a7cc`). Production still serves the old static site.
- Phase 2 code is in: `@netlify/vite-plugin-tanstack-start` installed and registered in `vite.config.ts` (after `tanstackStart()`). Build + typecheck pass. A CLI draft deploy (`npx netlify deploy --build`) succeeded and serves the new TanStack starter on Netlify Functions.
- Git CD not connected yet — owner does it in the browser (steps below), then the agent pushes `tanstack-migration` so a branch deploy builds automatically.
- The CLI is logged in and the repo is linked (`.netlify/state.json` — gitignored, never commit it).

### Gotchas learned
- New Netlify projects are **private by default** (since July 2026) and return 401 login pages. Visibility has **two separate scopes**: production, and previews (deploy previews + branch deploys). "Make public" covered only production; draft URLs stayed 401 for anonymous visitors. Set both: Project configuration → General → Visitor access → Project visibility.
- `npx netlify deploy` (manual) does not run a build; use `npx netlify deploy --build` to build first. Manual deploys don't replace Git CD, and a later Git deploy supersedes them.
- The Netlify plugin needs `ajv` v8 at the top level; the shadcn scaffold's `.npmrc` sets `legacy-peer-deps=true` so peer deps aren't auto-installed. Fix applied: `ajv@^8` added as an explicit devDependency. Don't remove it.

## Connect the repo (owner does this in the browser, agent guides)
1. Log in at netlify.com → **Add new project → Import an existing project → GitHub** → pick `OhLookDucks/portfolio-site`.
2. Build settings should auto-detect TanStack Start (build command `npm run build`). Node comes from `.nvmrc` (24). Don't change `components.json` or plugin settings.
3. **Production branch: `main`** (leave as is).
4. **Branches and deploy contexts: enable branch deploys — "All"** (so `tanstack-migration` gets its own URL).
5. If a build for `main` fails right after connecting, that's expected: `main` still holds the old static site with no `package.json`. The published old site stays live anyway; the branch deploy is what matters until Phase 5.

## One-time code setup (Phase 2, agent does this)
1. `npm install -D @netlify/vite-plugin-tanstack-start`
2. In `vite.config.ts`, import it and add `netlify()` to the `plugins` array, after `tanstackStart()`.
3. Confirm `npm run build` still passes.

## Connect the repo (I do this in the browser, agent guides me)
1. Log in at netlify.com and choose to add a new project from a Git repository.
2. Pick GitHub and the repo `portfolio-site`.
3. Build settings are normally detected automatically. If Netlify shows blank fields, the agent tells me what to enter based on `package.json`.
4. Enable deploys for the `tanstack-migration` branch (branch deploys), so I get a preview URL before touching `main`.
5. Production branch stays `main`.

## Node version
Netlify reads `.nvmrc`. It must contain `24`, matching WSL. If the build log shows another Node version, tell the agent.

## Optional: deploy from the terminal
`npx netlify login` then `npx netlify deploy` makes a draft (preview) deploy. Production deploys happen from `main` via Git, not from the terminal.
In WSL the login page may not open by itself. If so, copy the URL from the terminal into the Windows browser.

## Secrets
None needed yet. If one ever is, set it in Netlify's environment variables screen. Never in the repo.

## If a build fails
Copy the failing part of the Netlify deploy log and paste it to the agent. The agent cannot see Netlify unless I paste it.
