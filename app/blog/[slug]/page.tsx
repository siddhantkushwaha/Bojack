import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { mdxOptions } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx-components";
import { formatDate } from "@/lib/format";
import { pageMeta } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

export default function PostPage({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article>
      <Link
        href="/blog"
        className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
      >
        ← Back to blog
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {post.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent-fg dark:text-accent"
            >
              {tag}
            </span>
          ))}
          <span>{formatDate(post.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTimeText}</span>
        </div>
      </header>

      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0">
        <MDXRemote
          source={post.content}
          options={mdxOptions}
          components={mdxComponents}
        />
      </div>
    </article>
  );
}
