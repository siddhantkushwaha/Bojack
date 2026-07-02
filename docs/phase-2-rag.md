# Phase 2 — RAG-powered AI agent (requirements & resume notes)

_Status: **not started.** Captured 2026-07-01 so we can resume cleanly. This is
a requirements/design-intent doc, not an implementation plan. When we pick this
up, run it through a proper brainstorm → spec → plan cycle._

## Goal

Let a reader ask natural-language questions and get answers **grounded in the
blog's own posts**, with citations back to the source articles. Think "chat
with Siddhant's writing," not a general-purpose chatbot.

## Why it's deferred

Phase 1 (blog + career + newsletter) was scoped to ship first. The RAG agent is
a distinct subsystem (embeddings, a vector store, an LLM, a chat UI) and earns
its own spec. Phase 1 was intentionally designed to leave clean seams for it
(see "Seams already in place").

## Product requirements

- **Grounded answers only.** Responses must draw from post content; when the
  corpus doesn't cover a question, say so rather than hallucinate.
- **Citations.** Each answer links to the post(s) it drew from (title + anchor).
- **Chat UI.** A widget/page on the site. Streaming responses preferred.
- **Fresh on publish.** New/edited posts should be (re)indexed without a manual
  data-migration dance — ideally part of the build/deploy.
- **Cheap at rest.** No always-on GPU; embed once, query on demand.
- **Privacy.** Don't log full question text tied to identity without reason;
  keep any stored chat history minimal and documented.

## Decided constraints (from the user)

- **Vector store: a dedicated vector DB** — Pinecone / Chroma / Weaviate (or
  similar). **Not** `sqlite-vec` and **not** `pgvector`. Rationale: keep the
  vector store independent of the app DB (SQLite) so neither constrains the
  other, and use a purpose-built similarity-search engine.
- App data (subscribers, etc.) stays in SQLite; the vector DB is separate.
- Follow the existing `/api/*` route pattern for any new backend endpoint.

## Open decisions (resolve during the Phase 2 brainstorm)

1. **Which vector DB.** Chroma (self-hostable, fits the Docker story) vs Pinecone
   (managed, zero-ops, external dependency) vs Weaviate. Trade-off: self-hosted
   keeps everything in `docker compose`; managed reduces ops but adds a vendor.
2. **Embedding model.** Hosted embeddings (e.g. an API) vs local. Cost, quality,
   and whether we want an external call at index time.
3. **LLM for answering.** Which provider/model; streaming; cost per query;
   prompt/citation format. (Default to the latest, most capable Claude model.)
4. **Chunking strategy.** How to split MDX (by heading? fixed tokens?) and how
   to carry metadata (post slug, heading anchor) for citations.
5. **Indexing trigger.** Build-time step, a deploy hook, or an admin endpoint.
   Idempotent re-indexing on content change.
6. **Chat surface.** Floating widget on every page vs a dedicated `/ask` page.
7. **Abuse/cost controls.** Rate limiting, max tokens, and a spend ceiling.
8. **Chat history.** Ephemeral vs stored (and if stored, where — SQLite).

## Proposed shape (starting point, subject to the brainstorm)

```
Indexing (offline / at deploy):
  content/posts/*.mdx
    → chunk (by heading, with slug + anchor metadata)
    → embed (embedding model)
    → upsert into vector DB

Query (online):
  Browser chat widget
    → POST /api/chat  (Node runtime, streaming)
      → embed the question
      → similarity search in vector DB → top-k chunks
      → prompt LLM with chunks + question, ask for grounded answer + citations
      → stream tokens back
```

## Seams already in place (Phase 1)

- **`/api/*` route pattern** — `app/api/subscribe/route.ts` establishes how a
  backend endpoint is written (Node runtime, validation, JSON responses).
  `/api/chat` slots in the same way.
- **Posts as structured data** — `lib/posts.ts` already parses MDX + frontmatter
  and exposes `getAllPosts()` / `getPostBySlug()`; the indexer can reuse it to
  enumerate and read content (raw MDX is on `Post.content`).
- **Docker + compose** — a self-hosted vector DB (e.g. Chroma) can be added as
  another compose service; the app already reads config from env.
- **SQLite** — available if we want to store chat history or index metadata,
  without touching the vector store.

## Definition of done (Phase 2)

- A visitor can ask a question and get a grounded, cited answer from the posts.
- New posts are indexed as part of deploy (no manual step).
- Cost controls and rate limiting are in place.
- Tests cover chunking, retrieval wiring (mocked vector DB + LLM), and the
  `/api/chat` contract.
- `docs/ARCHITECTURE.md` updated to fold Phase 2 into the current-state doc.

## How to resume

1. Re-read this file and `docs/ARCHITECTURE.md`.
2. Run the brainstorming skill to resolve the "Open decisions" above.
3. Write a spec, then an implementation plan, then build.
