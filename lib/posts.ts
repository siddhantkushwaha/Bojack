import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

// Resolved per call so tests can point it at a fixtures directory via POSTS_DIR.
function postsDir(): string {
  return process.env.POSTS_DIR || path.join(process.cwd(), "content", "posts");
}

export type PostFrontmatter = {
  title: string;
  date: string; // ISO date, e.g. "2026-06-12"
  summary: string;
  tags: string[];
  draft?: boolean;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingTimeText: string;
};

export type Post = PostMeta & {
  content: string;
};

function slugFromFilename(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

export function getPostSlugs(): string[] {
  const dir = postsDir();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .map(slugFromFilename);
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDir(), `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;

  return {
    slug,
    title: fm.title ?? slug,
    date: fm.date ?? "",
    summary: fm.summary ?? "",
    tags: fm.tags ?? [],
    draft: fm.draft ?? false,
    readingTimeText: readingTime(content).text,
    content,
  };
}

// All published posts, newest first. Drafts are hidden in production only.
export function getAllPosts(): PostMeta[] {
  const showDrafts = process.env.NODE_ENV !== "production";
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ content: _content, ...meta }) => meta);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) tags.add(tag);
  }
  return [...tags].sort();
}
