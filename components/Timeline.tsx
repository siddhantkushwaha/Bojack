import type { TimelineEntry } from "@/lib/site";

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative border-l border-neutral-200 dark:border-neutral-800">
      {entries.map((entry) => (
        <li key={`${entry.company}-${entry.period}`} className="mb-10 ml-6">
          <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-accent dark:border-neutral-950" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
              {entry.role} · {entry.company}
            </h3>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {entry.period}
            </span>
          </div>
          {entry.location && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {entry.location}
            </p>
          )}
          <p className="mt-2 text-neutral-700 dark:text-neutral-300">
            {entry.summary}
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-400">
            {entry.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
