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

## Exact versions (filled in 2026-11-17, Phase 1)
| Package | Installed | Note |
|---|---|---|
| `@tanstack/react-start` | 1.169.5 | the framework |
| `@tanstack/react-router` | 1.170.46 | routing |
| `react` / `react-dom` | 19.3.1 | |
| `vite` | 8.3.8 | build tool |
| `tailwindcss` (and `@tailwindcss/vite`) | 4.3.5 | v4, no config file — theme lives in `src/styles.css` |
| `shadcn` (CLI) | 4.23.0 | run via `npx shadcn@latest add <name>` |
| `@base-ui/react` | 1.9.0 | primitives under shadcn components (preset `nova`, see ADR 0002) |
| `typescript` | 6.0.3 | |
| `eslint` | 10.15.0 | |

Note: `package.json` lists most of these as ranges (e.g. `"vite": "^8"`); the table shows what actually installed per `package-lock.json`.

## Docs to trust over memory
- https://tanstack.com/start/latest
- https://ui.shadcn.com/docs/installation/tanstack
- https://docs.netlify.com/build/frameworks/framework-setup-guides/tanstack-start/
