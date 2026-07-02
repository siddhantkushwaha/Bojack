import Link from "next/link";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";

// Custom element mappings for MDX content. Prose (Tailwind Typography) handles
// most styling; these add internal-link routing and sane image defaults.
export const mdxComponents: MDXRemoteProps["components"] = {
  a: ({ href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return <Link href={href} {...props} />;
    }
    return <a href={href} target="_blank" rel="noreferrer" {...props} />;
  },
  img: (props: ImgHTMLAttributes<HTMLImageElement>) => (
    // Plain img keeps arbitrary content-authored assets simple (incl. SVG
    // diagrams). eslint-disable justified: not using next/image on purpose.
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ""} className="rounded-lg border border-neutral-200 dark:border-neutral-800" />
  ),
};
