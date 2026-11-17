# Deploying on Netlify

TanStack Start runs on Netlify through an official plugin. Server rendering, server routes and server functions run on Netlify Functions. Netlify also makes preview deploys for pull requests and can deploy branches.

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
