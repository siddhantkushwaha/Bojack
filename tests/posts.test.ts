import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/posts";

describe("posts library", () => {
  it("discovers the seeded MDX posts", () => {
    const slugs = getPostSlugs();
    expect(slugs).toContain("designing-idempotent-backup-pipelines");
    expect(slugs.length).toBeGreaterThanOrEqual(3);
  });

  it("parses frontmatter and computes reading time", () => {
    const post = getPostBySlug("designing-idempotent-backup-pipelines");
    expect(post).not.toBeNull();
    expect(post!.title).toMatch(/idempotent/i);
    expect(post!.tags.length).toBeGreaterThan(0);
    expect(post!.readingTimeText).toMatch(/min read/);
  });

  it("returns posts sorted newest-first", () => {
    const posts = getAllPosts();
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].date >= posts[i].date).toBe(true);
    }
  });

  it("returns null for an unknown slug", () => {
    expect(getPostBySlug("does-not-exist")).toBeNull();
  });
});
