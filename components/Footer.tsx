import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-8 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between dark:text-neutral-400">
        <p>
          © {year} {site.name}
        </p>
        <div className="flex gap-4">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
