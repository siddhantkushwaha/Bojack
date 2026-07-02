// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let tmpDir: string;

// Write fixture posts into a temp dir and point the posts library at it, so the
// tests don't depend on any real content shipped in the repo.
beforeAll(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "bojack-posts-"));
  process.env.POSTS_DIR = tmpDir;

  fs.writeFileSync(
    path.join(tmpDir, "older-post.mdx"),
    `---\ntitle: "Older Post"\ndate: "2026-02-01"\nsummary: "First."\ntags: ["a"]\n---\n\nBody of the older post with a few words to measure.\n`,
  );
  fs.writeFileSync(
    path.join(tmpDir, "newer-post.mdx"),
    `---\ntitle: "Newer Post"\ndate: "2026-03-01"\nsummary: "Second."\ntags: ["a", "b"]\n---\n\nBody of the newer post.\n`,
  );
  fs.writeFileSync(
    path.join(tmpDir, "life-post.mdx"),
    `---\ntitle: "Life Post"\ndate: "2026-04-01"\nsummary: "Personal."\ntags: ["life"]\n---\n\nA personal post.\n`,
  );
});

afterAll(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

describe("posts library", () => {
  it("discovers MDX posts in the configured directory", async () => {
    const { getPostSlugs } = await import("@/lib/posts");
    expect(getPostSlugs().sort()).toEqual([
      "life-post",
      "newer-post",
      "older-post",
    ]);
  });

  it("parses frontmatter and computes reading time", async () => {
    const { getPostBySlug } = await import("@/lib/posts");
    const post = getPostBySlug("newer-post");
    expect(post).not.toBeNull();
    expect(post!.title).toBe("Newer Post");
    expect(post!.tags).toEqual(["a", "b"]);
    expect(post!.readingTimeText).toMatch(/min read/);
  });

  it("returns posts sorted newest-first", async () => {
    const { getAllPosts } = await import("@/lib/posts");
    const posts = getAllPosts();
    expect(posts.map((p) => p.slug)).toEqual([
      "life-post",
      "newer-post",
      "older-post",
    ]);
  });

  it("splits personal posts out of the public list", async () => {
    const { getPublicPosts, getPersonalPosts } = await import("@/lib/posts");
    expect(getPublicPosts().map((p) => p.slug).sort()).toEqual([
      "newer-post",
      "older-post",
    ]);
    expect(getPersonalPosts().map((p) => p.slug)).toEqual(["life-post"]);
  });

  it("returns null for an unknown slug", async () => {
    const { getPostBySlug } = await import("@/lib/posts");
    expect(getPostBySlug("does-not-exist")).toBeNull();
  });
});
