import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { SubscribeForm } from "@/components/SubscribeForm";
import { site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div>
      <section className="pb-4">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {site.name}
        </h1>
        <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-400">
          {site.tagline}
        </p>
        <p className="mt-4 max-w-2xl text-neutral-700 dark:text-neutral-300">
          {site.description}
        </p>
      </section>

      <section className="mt-10">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-accent-fg dark:text-accent">
            Latest posts
          </h2>
          <Link
            href="/blog"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            View all →
          </Link>
        </div>
        <div className="mt-2 divide-y divide-neutral-100 dark:divide-neutral-900">
          {posts.length === 0 ? (
            <p className="py-6 text-neutral-500">No posts yet.</p>
          ) : (
            posts.map((post) => <PostCard key={post.slug} post={post} />)
          )}
        </div>
      </section>

      <section className="mt-10">
        <SubscribeForm />
      </section>
    </div>
  );
}
