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
        <nav className="hidden items-center gap-1 sm:flex">
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
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800">
              Menu
            </summary>
            <nav className="absolute right-0 top-12 z-10 min-w-36 rounded-md border border-neutral-200 bg-white p-1 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
