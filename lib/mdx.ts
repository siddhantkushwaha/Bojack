import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";

// Shared MDX processing options: GitHub-flavored markdown, LaTeX math, and
// Shiki-based syntax highlighting with matching light/dark themes.
export const mdxOptions: MDXRemoteProps["options"] = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: { dark: "github-dark", light: "github-light" },
          keepBackground: false,
        },
      ],
    ],
  },
};
