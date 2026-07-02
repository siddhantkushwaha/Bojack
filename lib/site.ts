// Central place for site-wide, content-ish config. Edit these to make the
// site yours: nav, socials, career, education, projects, and skills.

export const site = {
  name: "Siddhant Kushwaha",
  role: "Software Engineer",
  tagline: "Software Engineer 3 at Cohesity · backup, recovery, and large-scale data indexing",
  description:
    "Technical writing on backend engineering and the data protection, backup, and indexing systems I work on.",
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
  location?: string;
  summary: string;
  highlights: string[];
};

export const career: TimelineEntry[] = [
  {
    company: "Cohesity",
    role: "Software Engineer 3",
    period: "August 2024 - Present",
    summary:
      "Working on backup, recovery, and database protection for a large-scale data management platform.",
    highlights: [
      "Built a proof of concept to deploy an external NFS service outside Cohesity's cluster, enabling new backup and restore workflows.",
      "Increased unit-test coverage by 50% across team-owned components, reducing regression bugs and field issues.",
      "Developed clone-based recovery for Oracle CDB databases on Linux and AIX, enabling faster and more space-efficient restores than traditional methods.",
    ],
  },
  {
    company: "Commvault",
    role: "Senior Software Development Engineer",
    period: "January 2020 - July 2024",
    summary:
      "Worked on backup and large-scale indexing across the data protection stack.",
    highlights: [
      "Played a pivotal role in designing and building backup and indexing of 12 billion objects across 45,000 laptops for a customer, using the Apache SOLR framework.",
      "Designed indexing of files larger than 1 GB stored in segments, enabling efficient data validation as well as browsing and restoration of fully backed-up files.",
      "Established index backup and retention strategies that kept data available during index-related issues and reduced restore downtime, saving over 50% space.",
      "Wrote an enhanced cache-cleanup strategy for index transactions, reducing transaction-log disk usage by over 80%.",
    ],
  },
];

export type EducationEntry = {
  school: string;
  credential: string;
  period?: string;
  location?: string;
  detail?: string;
};

export const education: EducationEntry[] = [
  {
    school: "Indian Institute of Information Technology, Sri City",
    credential: "B.Tech, Computer Science and Engineering",
    period: "August 2016 - May 2020",
    detail: "GPA: 8.22",
  },
  {
    school: "Aryaman Vikram Birla Institute of Learning",
    location: "Haldwani, Uttarakhand",
    credential: "Class X and Class XII",
    detail: "Class XII: 92.8% · Class X GPA: 9.8",
  },
];

export type Project = {
  name: string;
  description: string;
};

export const projects: Project[] = [
  {
    name: "ProText",
    description:
      "An Android SMS app that uses on-device TensorFlow-Lite models to classify SMS, helping with inbox organization and spam-notification prevention. Over 100 downloads to date.",
  },
  {
    name: "Email management tool",
    description:
      "Periodically labels and unsubscribes from emails based on customizable rules, boosting productivity. Received 17 stars on GitHub.",
  },
];

export type Achievement = {
  title: string;
  description: string;
};

export const achievements: Achievement[] = [
  {
    title: "Second place, Google India Hackathon 2018",
    description:
      "Developed an app using an on-device deep-learning model to accurately detect potholes, enhancing road safety and infrastructure maintenance.",
  },
  {
    title: "Winner, Bot Fight Competition 2023 at Commvault",
    description:
      "Wrote a winning bot for the game of Blokus, showcasing strategic algorithms and programming skills.",
  },
  {
    title: "Runner-up, Commvault Create 2024",
    description:
      "Leveraged large language models (LLM) and retrieval-augmented generation (RAG) to bring conversational search and insights to enterprise data.",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["C", "C++", "Java", "Kotlin", "Python", "JavaScript"],
  },
  {
    group: "Fundamentals",
    items: ["Algorithms", "Object-Oriented Design", "Databases"],
  },
  {
    group: "Tools & Frameworks",
    items: [
      "Git",
      "MySQL",
      "MS SQL",
      "MongoDB",
      "Apache SOLR",
      "Android SDK",
      "Django",
      "Spring",
    ],
  },
];
