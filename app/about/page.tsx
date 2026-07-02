import type { Metadata } from "next";
import { Timeline } from "@/components/Timeline";
import {
  achievements,
  career,
  education,
  projects,
  skills,
  site,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — ${site.role}.`,
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-accent-fg dark:text-accent">
      {children}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <div>
      <section>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          About
        </h1>
        <div className="mt-4 space-y-4 text-neutral-700 dark:text-neutral-300">
          <p>
            I&apos;m {site.name}, a software engineer focused on data protection
            — backup, recovery, and indexing systems that operate at large
            scale. I&apos;m currently a Software Engineer 3 at Cohesity, and
            before that spent four and a half years at Commvault as a Senior
            Software Development Engineer.
          </p>
          <p>
            My work has ranged from indexing billions of objects across tens of
            thousands of laptops, to clone-based database recovery, to cache and
            retention strategies that cut storage cost. This site is where I
            write about that work — the design decisions, the tradeoffs, and the
            things I learned the hard way.
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
        <SectionHeading>Experience</SectionHeading>
        <Timeline entries={career} />
      </section>

      <section className="mt-8">
        <SectionHeading>Education</SectionHeading>
        <div className="space-y-5">
          {education.map((e) => (
            <div key={e.school}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                  {e.school}
                </h3>
                {e.period && (
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {e.period}
                  </span>
                )}
              </div>
              <p className="text-neutral-700 dark:text-neutral-300">
                {e.credential}
                {e.location ? ` · ${e.location}` : ""}
              </p>
              {e.detail && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {e.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeading>Projects</SectionHeading>
        <div className="space-y-5">
          {projects.map((p) => (
            <div key={p.name}>
              <h3 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                {p.name}
              </h3>
              <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeading>Achievements</SectionHeading>
        <ul className="space-y-4">
          {achievements.map((a) => (
            <li key={a.title}>
              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                {a.title}
              </p>
              <p className="mt-1 text-neutral-700 dark:text-neutral-300">
                {a.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <SectionHeading>Skills</SectionHeading>
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
