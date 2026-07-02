import type { Metadata } from "next";
import { Timeline } from "@/components/Timeline";
import { career, skills, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — ${site.role}.`,
};

export default function AboutPage() {
  return (
    <div>
      <section>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          About
        </h1>
        <div className="mt-4 space-y-4 text-neutral-700 dark:text-neutral-300">
          <p>
            I&apos;m {site.name}, a backend engineer with around six years of
            experience building data protection and management software, across
            Commvault and Cohesity. I like the parts of the stack most people
            don&apos;t see: correctness under failure, storage and metadata,
            and pipelines that move a lot of data without losing any of it.
          </p>
          <p>
            This site is where I write about that work — the design decisions,
            the tradeoffs, and the things I learned the hard way.
          </p>
        </div>
        <div className="mt-6">
          <a
            href={site.resumeUrl}
            className="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
            target="_blank"
            rel="noreferrer"
          >
            Download résumé
          </a>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-accent-fg dark:text-accent">
          Experience
        </h2>
        <Timeline entries={career} />
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent-fg dark:text-accent">
          Skills
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {skills.map((group) => (
            <div key={group.group}>
              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {group.group}
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
