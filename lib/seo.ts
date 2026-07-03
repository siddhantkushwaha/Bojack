import type { Metadata } from "next";
import { site } from "./site";

// Builds a page's Metadata with matching Open Graph tags. Next.js does not
// deep-merge a child route's `openGraph` into the layout default, so each page
// that wants correct social previews must supply its own. Centralised here so
// the share image, canonical URL, and site name stay consistent.
export function pageMeta({
  title,
  description,
  path = "/",
  type = "website",
}: {
  title?: string;
  description: string;
  path?: string;
  type?: "website" | "article";
}): Metadata {
  const ogTitle = title ? `${title} · ${site.name}` : `${site.name} · ${site.role}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      siteName: site.name,
      type,
      images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
    },
  };
}
