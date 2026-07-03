import { site } from "@/lib/site";
import { getPublicPosts } from "@/lib/posts";

// Escape the five XML predefined entities for safe use in text/attributes.
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const dynamic = "force-static";

// RSS 2.0 feed for the technical blog (personal /life posts are excluded, to
// match what /blog shows).
export function GET(): Response {
  const base = site.url.replace(/\/$/, "");
  const posts = getPublicPosts();
  const buildDate = posts[0]?.date
    ? new Date(posts[0].date).toUTCString()
    : undefined;

  const items = posts
    .map((post) => {
      const url = `${base}/blog/${post.slug}`;
      const pubDate = post.date ? new Date(post.date).toUTCString() : "";
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ""}
      <description>${escapeXml(post.summary)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)}</title>
    <link>${base}/blog</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
    ${buildDate ? `<lastBuildDate>${buildDate}</lastBuildDate>` : ""}
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
