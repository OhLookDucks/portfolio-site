# Architecture

## A. Current site inventory (filled in 2026-11-17, Phase 0)

### Shape
One single-page website, no menu — you scroll. Everything lives in **`index.html`** (202 lines, 157 KB): text, styles, photo, and even the CV. No build tools, no JavaScript app. Only external dependency: Google Fonts. Live copy deployed 2026-11-17 at https://johnmark-ong-portfolio.netlify.app.

### File map
- `index.html` — all text, all styles (one `<style>` block), the photo (base64 JPEG ~28 KB, class `photo`, in the hero), and the CV download button
- `JohnMark_Ong_CV_Public.pdf` — public CV (2 pages). **The same PDF is also embedded inside `index.html`** as a base64 blob (checksums match exactly — same file, one version). Download name shown to visitors: `JohnMark_Ong_CV.pdf`
- That is all. No other site files exist.

### Page sections, top to bottom
1. **Hero** — title "John Mark Ong – Support Operations & Automation", badge "Open to support operations and automation roles", headline "Hi, I'm John Mark…", photo, buttons **Email me** (opens Gmail compose) and **Download CV**
2. **About me** — support background; ⚠ contains "Based in Cebu, Philippines. Comfortable working across time zones, with a dedicated home office and reliable fiber internet."
3. **Projects** — 3 cards: Downloads auto-sorter (Python · Windows Task Scheduler), Gmail auto-labeler (tag: In progress), Support ticket triage (tag: Planned)
4. **Experience** — 4 roles: Enshored Inc. CSR (Apr 2024–present), Staffme Online LLC Content Moderator (Nov 2025–Aug 2026, contract), Foundever CSR (Feb 2023–Apr 2024), Qualfon Inc. CSR (Mar 2022–Jan 2023)
5. **Skills and tools** — 4 groups: Support platforms (Freshworks, Amazon Connect, Slack) · Workspace (Google Workspace, Microsoft 365, Zoom, Google Meet, Microsoft Teams) · Automation and AI (Python (learning), Windows Task Scheduler, ChatGPT, Claude, Gemini, Atlassian Rovo) · Support work (calls, email, live chat, troubleshooting, COI compliance, content moderation)
6. **Let's talk** (contact) — buttons: Email me, LinkedIn, Download CV
7. **Footer** — © John Mark Ong

### Theme (the warm design — carry all of this over)
CSS variables in the `<style>` block:

| Variable | Colour | Role |
|---|---|---|
| `--bg` | `#faf8f5` | warm white background |
| `--surface` | `#ffffff` | cards |
| `--sand` | `#f3ede4` | soft sand panel |
| `--line` | `#e9dfd2` | borders |
| `--peach` | `#fde3cf` | peach highlight |
| `--accent` | `#0f766e` | teal accent (buttons, links) |
| `--accent-dark` | `#0b5c56` | teal hover |
| `--accent-soft` | `#d9efec` | soft teal chip |
| `--ink` | `#243238` | main text |
| `--muted` | `#5d6c72` | secondary text |

Plus one-off brown `#7a3e12` used once. Font: **Plus Jakarta Sans**, weights 400/500/700/800, from Google Fonts. Meta description: "Customer support professional building automations for support teams."

### Contact details on the page
Email ongjohnmarkc@gmail.com (as Gmail-compose links), LinkedIn linkedin.com/in/johnmarkong, CV download.

### Must not be lost in the rebuild
The photo; all section wording above; the CV (also in repo as PDF); email + LinkedIn links; the full colour palette and font; the meta description.

### Rule conflicts and risks (reviewed with owner 2026-11-17)
1. ✅ **"Cebu" on the site and CV** — owner decision: comfortable with it staying (city level is acceptable, rule 7 not violated). No change needed.
2. ✅ No phone number anywhere (checked page text and full CV text).
3. ✅ No Zendesk or Jira anywhere. **"Atlassian Rovo"** confirmed intentional by the owner — keep it.
4. ℹ️ The CV is duplicated (repo file + base64 inside `index.html`), so the two copies could drift apart. In the rebuild, keep one file in `public/` and link to it.

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
