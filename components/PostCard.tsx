import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group py-6">
      <Link href={`/blog/${post.slug}`} className="block">
        <h3 className="text-lg font-medium text-neutral-900 transition-colors group-hover:text-accent dark:text-neutral-100">
          {post.title}
        </h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {post.summary}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-500">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent/10 px-2.5 py-0.5 font-medium text-accent-fg dark:text-accent"
            >
              {tag}
            </span>
          ))}
          <span>{formatDate(post.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTimeText}</span>
        </div>
      </Link>
    </article>
  );
}
