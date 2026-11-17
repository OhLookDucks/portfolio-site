# Architecture

## A. Current site inventory (Phase 0, agent fills in; I confirm)
Describe the existing site exactly as it is today, before any change:
- Pages and what each contains
- Which file holds the text, styles, photo, CV files
- Fonts and colour palette (warm design)
- Anything that must not be lost (photo, wording, links)
- Anything that breaks my rules (Zendesk/Jira, phone number or town)

## B. Target structure (after the rebuild)
```text
portfolio-site/
├── AGENTS.md
├── docs/
├── legacy/                  # old site, kept for reference until go-live, then removed (ADR)
├── public/                  # photo, public CV, favicon
├── src/
│   ├── routes/              # one file per page (index, about, skills, projects, cv...)
│   ├── components/
│   │   └── ui/              # shadcn components (added via CLI)
│   ├── styles/ (or global css)  # theme variables for the warm design
│   └── routeTree.gen.ts     # GENERATED, never edit
├── .nvmrc                   # 24
├── components.json
├── package.json
└── vite.config.ts           # includes the Netlify plugin
```
Agent: adjust this to match what the scaffold really creates, and note the change.
