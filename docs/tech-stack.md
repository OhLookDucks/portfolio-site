# Tech stack

| Area | Choice | Notes |
|---|---|---|
| OS / environment | Windows + WSL2 Ubuntu 24 | Repo in `~/portfolio-site`, not `/mnt/c` |
| Runtime | Node 24 | Pinned by `.nvmrc` and `engines` in `package.json` |
| Package manager | npm | ADR 0003 |
| Framework | TanStack Start (React) | 1.0 released Oct 2026; file-based routes |
| Build tool | Vite | Comes with TanStack Start |
| Styling | Tailwind CSS | Installed by the shadcn init |
| UI components | shadcn/ui | Added per component with the CLI |
| Hosting | Netlify | Official TanStack Start partner; SSR runs on Netlify Functions |
| Netlify integration | `@netlify/vite-plugin-tanstack-start` | Added to `vite.config.ts` |
| Source control | Git + GitHub (`OhLookDucks/portfolio-site`) | Branch `tanstack-migration` |

## Exact versions
TO BE FILLED IN during Phase 1 from `package.json` (Start, React, Vite, Tailwind, shadcn).

## Docs to trust over memory
- https://tanstack.com/start/latest
- https://ui.shadcn.com/docs/installation/tanstack
- https://docs.netlify.com/build/frameworks/framework-setup-guides/tanstack-start/
