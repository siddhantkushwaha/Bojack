# Architecture & current state

_Last updated: 2026-07-01_

This document describes what exists today: a personal technical blog and career
site for a backend engineer. It is intentionally minimal, static-first, and
Dockerized. Phase 2 (a RAG AI agent) is **not** built yet — see
[phase-2-rag.md](./phase-2-rag.md).

## Goals

- A professional but minimal site — blog + career/about page.
- Low maintenance: content lives in git, most pages are static.
- A real, self-owned data layer for dynamic features (newsletter today).
- Runs as a single Docker container.

## Stack

| Concern        | Choice                                             |
| -------------- | -------------------------------------------------- |
| Framework      | Next.js 14 (App Router) + TypeScript               |
| Styling        | Tailwind CSS + Typography plugin                   |
| Theme          | Light/dark toggle via `next-themes`                |
| Content        | MDX files in `content/posts/` (frontmatter + body) |
| Rendering      | `next-mdx-remote/rsc`, Shiki (code), KaTeX (math)  |
| Data store     | SQLite via `better-sqlite3` (embedded, file-based) |
| Newsletter     | SQLite (source of truth) + optional Buttondown     |
| Tests          | Vitest + React Testing Library                     |
| Deploy         | Docker (standalone output), non-root, volume-backed |

## Directory map

```
app/
  layout.tsx              Root layout: theme provider, header/footer, metadata
  page.tsx                Home: intro + latest posts + subscribe form
  blog/page.tsx           Blog index (all posts)
  blog/[slug]/page.tsx    Post page: renders MDX (SSG via generateStaticParams)
  about/page.tsx          Career timeline, skills, résumé download
  api/subscribe/route.ts  POST endpoint: validate → save to SQLite → forward
components/               Header, Footer, PostCard, Timeline, SubscribeForm,
                          ThemeProvider/ThemeToggle, mdx-components
content/posts/*.mdx       The articles (source of truth for blog content)
lib/
  site.ts                 Site config: name, nav, socials, career, skills
  posts.ts                Read/parse MDX, frontmatter, reading time, sorting
  mdx.ts                  Shared remark/rehype plugin options
  db.ts                   Lazy SQLite singleton + schema migration
  subscribers.ts          Subscriber queries (add/count/list)
  buttondown.ts           Optional Buttondown forward
  format.ts               Date formatting
public/
  resume.pdf              Placeholder résumé (replace with real one)
  posts/*.svg             Post diagrams/images
tests/                    Vitest suites
docs/                     This file + Phase 2 requirements
Dockerfile, docker-compose.yml
```

## Data flow

### Reading content (static)

MDX files → `lib/posts.ts` (parse frontmatter, compute reading time) →
statically generated pages at build time. Adding a post = add a `.mdx` file;
no rebuild config needed. `draft: true` hides a post in production.

### Newsletter subscribe (dynamic)

```
Browser (SubscribeForm)
  → POST /api/subscribe            (Node runtime, force-dynamic)
    → validate email (regex)
    → addSubscriber(email)         INSERT ... ON CONFLICT DO NOTHING  [SQLite]
    → subscribeEmail(email)        best-effort forward to Buttondown (if key)
  → { ok, message }                "on the list" | "already subscribed"
```

SQLite is the **source of truth**. Buttondown is an optional forward so the
newsletter can actually be sent; a Buttondown failure does not fail the request
because the email is already saved locally.

## Data layer

- **Engine:** SQLite (`better-sqlite3`), synchronous, no ORM.
- **File:** `DATABASE_PATH` env, default `./data/app.db` locally,
  `/app/data/app.db` in the container.
- **Persistence in Docker:** a named volume (`myblog-data`) mounted at
  `/app/data`. `.dockerignore` excludes `data/` so a local dev DB never leaks
  into the image.
- **Schema:** created lazily on first query (`CREATE TABLE IF NOT EXISTS`).

```sql
CREATE TABLE subscribers (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  email      TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
```

Emails are normalized to lowercase before insert, so dedup is
case-insensitive.

## Configuration

| Env var             | Purpose                              | Default            |
| ------------------- | ------------------------------------ | ------------------ |
| `DATABASE_PATH`     | SQLite file location                 | `./data/app.db`    |
| `BUTTONDOWN_API_KEY`| Enable Buttondown forward (optional) | unset (SQLite only)|

## Testing

- `lib/posts.ts` — discovery, frontmatter parsing, sort order.
- `lib/subscribers.ts` — insert, case-insensitive dedup, persistence (temp DB).
- `/api/subscribe` — valid, duplicate, malformed, missing email.
- `lib/buttondown.ts` — skip/subscribe/already/error branches.
- `SubscribeForm` — success and error UI states.

Run: `npm run test` · `npm run typecheck` · `npm run build`.

## Known limitations / deliberate omissions

- No auth/admin UI — posts are authored in git by design.
- No comments, no analytics, no view counts (not requested).
- SQLite is single-node; fine for this scale. If the app is ever horizontally
  scaled, subscriber storage would need to move to a networked DB.
- The résumé PDF is a placeholder.

## Decision log (why things are the way they are)

- **MDX-in-git over CMS/DB for content:** diagrams/code/math work as embedded
  assets; no server or login to maintain.
- **Next.js over Astro/SPA:** one codebase for React + MDX + API routes; clean
  path to the Phase 2 agent.
- **SQLite over Postgres for app data:** lightweight, embedded, zero infra for
  the current scale (subscribers). Chosen deliberately in favor of minimalism.
- **Dedicated vector DB for RAG (later), not SQLite/pgvector:** keep the vector
  store independent of the app DB. See [phase-2-rag.md](./phase-2-rag.md).
