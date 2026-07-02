# bojack

A minimal, professional personal site — technical blog + career page — for a
backend engineer. Built with Next.js (App Router), MDX content in git, Tailwind
CSS, and a dark-mode toggle. Fully Dockerized.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Content**: MDX files in `content/posts/` (frontmatter + prose)
  - Syntax highlighting (Shiki), LaTeX math (KaTeX), GitHub-flavored markdown
  - Diagrams/images are plain assets under `public/` — including hand-drawn SVGs
- **Styling**: Tailwind CSS + Typography plugin, light/dark via `next-themes`
- **Data**: SQLite (`better-sqlite3`) — embedded, file-based, no server
- **Newsletter**: `/api/subscribe` saves to SQLite; optionally forwards to Buttondown
- **Tests**: Vitest + React Testing Library

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full design, and
[docs/phase-2-rag.md](docs/phase-2-rag.md) for the planned RAG agent.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build (standalone output)
npm run test         # run the test suite
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
```

## Writing a post

Add a file to `content/posts/<slug>.mdx`:

```mdx
---
title: "My post title"
date: "2026-07-01"
summary: "One-line summary shown in listings."
tags: ["systems", "reliability"]
draft: false
---

Your MDX here. Code blocks, $LaTeX$ math, tables, and images all work.
```

Reference images/diagrams from `public/`, e.g. `![alt](/posts/diagram.svg)`.
Set `draft: true` to hide a post in production (drafts still show in dev).

## Newsletter & data

Subscriber emails are saved to a local **SQLite** database (the source of
truth). The file lives at `DATABASE_PATH` — `./data/app.db` locally, or
`/app/data/app.db` in the container (backed by a named volume so it persists).

Setting `BUTTONDOWN_API_KEY` (see `.env.example`) additionally forwards new
subscribers to Buttondown so you can actually send the newsletter. Without a
key, emails are still saved locally — nothing is dropped.

Inspect subscribers locally:

```bash
node -e "const D=require('better-sqlite3');console.log(new D('./data/app.db').prepare('SELECT * FROM subscribers').all())"
```

## Docker

```bash
# Build and run the production image
docker compose up --build
# → http://localhost:3000

# Pass a Buttondown key through at runtime
BUTTONDOWN_API_KEY=your_key docker compose up --build
```

The image uses Next.js `standalone` output and runs as a non-root user. The
SQLite database is stored in the `bojack-data` named volume, so subscribers
survive `docker compose down` / `up`. To wipe it, tear down with the volume:

```bash
docker compose down -v
```

## Making it yours

- Edit `lib/site.ts` — name, tagline, socials, career timeline, and skills.
- Replace `public/resume.pdf` with your real résumé. In Docker the `public/`
  folder is bind-mounted from the host (see `docker-compose.yml`), so you can
  swap the PDF on the server and it goes live on the next request with no
  rebuild. Locally, just replace the file.
- Replace the seed posts in `content/posts/`.

## Roadmap

- **Phase 2**: a RAG-powered AI agent that answers questions grounded in the
  posts. The `/api/*` route pattern established by the newsletter endpoint is
  the seam it will plug into.
