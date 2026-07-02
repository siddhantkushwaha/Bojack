import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
        404
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm text-accent hover:underline"
      >
        ← Back home
      </Link>
    </div>
  );
}
