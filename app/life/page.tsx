import type { Metadata } from "next";
import { getPersonalPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: site.life.title,
  description: "Life outside work: fitness, sport, and the occasional note.",
};

export default function LifePage() {
  const posts = getPersonalPosts();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {site.life.title}
      </h1>
      <p className="mt-3 max-w-2xl text-neutral-700 dark:text-neutral-300">
        {site.life.intro}
      </p>

      <div className="mt-6 divide-y divide-neutral-100 dark:divide-neutral-900">
        {posts.length === 0 ? (
          <p className="py-6 text-neutral-500">Nothing here yet. Check back soon.</p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </div>
  );
}
