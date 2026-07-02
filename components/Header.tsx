import Link from "next/link";
import { site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-medium tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          {site.name}
        </Link>
        <nav className="flex items-center gap-1">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
