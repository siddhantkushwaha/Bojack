# Project guidelines

## Content & writing

- **No em-dashes (`—`) in any content.** This includes blog posts (`content/`),
  page copy, `lib/site.ts`, metadata titles/descriptions, and code comments.
  Use a colon, comma, semicolon, or parentheses instead; use a hyphen (`-`) for
  ranges like dates. Avoid en-dashes (`–`) too.
- Write in plain, direct prose. Prefer restructuring a sentence over reaching
  for a dash.

## Content authoring

- Blog posts are MDX files in `content/posts/<slug>.mdx` with frontmatter
  (`title`, `date`, `summary`, `tags`, optional `draft`).
- Career/about content lives in `lib/site.ts`, not hard-coded in pages.
- Don't invent biographical or résumé details; use only what the user provides.

## Stack notes

- Next.js 14 App Router. Content is static-first; the only dynamic route is
  `/api/subscribe`.
- Data layer is SQLite via `better-sqlite3`. Keep app data here; a dedicated
  vector DB is planned for the Phase 2 RAG agent (see `docs/phase-2-rag.md`).
- Verify changes with `npm run typecheck`, `npm run test`, and `npm run build`
  before claiming done.
