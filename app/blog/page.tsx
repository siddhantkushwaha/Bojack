import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical articles on backend engineering and distributed systems.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Blog
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Notes on backend engineering, distributed systems, and building data
        protection software.
      </p>
      <div className="mt-6 divide-y divide-neutral-100 dark:divide-neutral-900">
        {posts.length === 0 ? (
          <p className="py-6 text-neutral-500">No posts yet.</p>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </div>
  );
}
