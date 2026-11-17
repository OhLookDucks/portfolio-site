# 0002: How the TanStack Start project was scaffolded
Decision: scaffold with the shadcn CLI (`npx shadcn@latest init -t start`, preset `nova`), not the TanStack CLI or a hand-rolled setup.
Why: one command creates the TanStack Start 1.0 skeleton AND the shadcn/ui setup (Tailwind CSS 4, `@/` alias, `components.json`) already wired together, exactly the stack in `docs/tech-stack.md`. The official shadcn docs list this as the setup path for TanStack Start.
Details (2026-11-17):
- Template home page already includes one shadcn `Button` (Phase 1's test).
- Component library under the hood: Base UI (`@base-ui/react`) — the current shadcn default, not the older Radix.
- Scaffolded in a temp folder, then files copied into the repo root; `node_modules` rebuilt with `npm install`.
- Old static site kept in `legacy/` until go-live (removed later per `docs/plan.md` Phase 5).
- Fallback if this route had failed: `npx @tanstack/cli@latest create` then `shadcn init` on top.
