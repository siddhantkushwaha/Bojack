// Central place for site-wide, content-ish config. Edit these to make the
// site yours — nav, socials, and the career timeline all read from here.

export const site = {
  name: "Siddhant Kushwaha",
  role: "Backend Engineer",
  tagline: "Backend engineer · distributed systems @ Cohesity",
  description:
    "Technical writing on backend engineering, distributed systems, and the things I've learned building data protection software.",
  url: "https://example.com",
  email: "siddhant.kushwaha@example.com",
  resumeUrl: "/resume.pdf",
  nav: [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Email", href: "mailto:siddhant.kushwaha@example.com" },
  ],
} as const;

export type TimelineEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

// Placeholder career data — swap in the real specifics.
export const career: TimelineEntry[] = [
  {
    company: "Cohesity",
    role: "Backend Engineer",
    period: "2022 — Present",
    location: "Bengaluru, India",
    summary:
      "Building backend services for a large-scale data protection and management platform.",
    highlights: [
      "Designed and shipped services for backup and recovery workflows across large fleets.",
      "Worked on metadata stores and the consistency guarantees behind them.",
      "Improved throughput and reliability of long-running data-movement pipelines.",
    ],
  },
  {
    company: "Commvault",
    role: "Software Engineer",
    period: "2019 — 2022",
    location: "Bengaluru, India",
    summary:
      "Worked across the data protection stack, from ingestion to storage and indexing.",
    highlights: [
      "Contributed to core backup and indexing subsystems.",
      "Built tooling and automation that reduced manual operational toil.",
      "Collaborated across teams to ship customer-facing reliability improvements.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Go", "Java", "Python", "C++", "SQL"],
  },
  {
    group: "Systems & Infra",
    items: ["Distributed systems", "Kubernetes", "gRPC", "Kafka", "Docker"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "Metadata stores", "Object storage", "Caching"],
  },
];
