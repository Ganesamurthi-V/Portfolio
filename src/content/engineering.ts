export interface StackGroup {
  label: string;
  title: string;
  /** Short line used on the bento tiles. */
  blurb: string;
  description: string;
  items: string[];
}

/** "What I Build" — grouped by layer, reflecting actual working experience. */
export const stackGroups: StackGroup[] = [
  {
    label: "Frontend",
    title: "Interfaces",
    blurb: "Typed React and Next.js UIs, rendering strategy picked per route.",
    description:
      "Component-driven UIs in React and Next.js, typed end to end, with the rendering strategy chosen per route rather than applied globally.",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    title: "Services & APIs",
    blurb: "REST APIs with validated boundaries and predictable errors.",
    description:
      "REST APIs with validated boundaries, predictable error shapes and authorisation resolved on the server before any query runs.",
    items: ["REST APIs", "Flask", "Route handlers", "Server actions", "Python"],
  },
  {
    label: "Databases",
    title: "Data modelling",
    blurb:
      "Relational schemas designed around the queries they actually serve — migrations and indexes are part of the feature, not an afterthought.",
    description:
      "Relational schemas designed for the queries they will actually serve, with migrations and indexes treated as part of the feature.",
    items: ["PostgreSQL", "MySQL", "Supabase", "Firebase", "SQL"],
  },
  {
    label: "Infrastructure",
    title: "Deployment",
    blurb:
      "Containerised, reproducible builds on hosted platforms, with configuration kept out of the codebase.",
    description:
      "Containerised builds and hosted deployments, with environment configuration kept out of the codebase and builds that reproduce across machines.",
    items: ["Docker", "Vercel", "Railway", "Environment config"],
  },
  {
    label: "Access",
    title: "Auth & RBAC",
    blurb: "Sessions, roles and tenant isolation enforced in the database too.",
    description:
      "Session handling, role-based access control and multi-tenant isolation enforced in the database as well as the application layer.",
    items: ["Sessions", "RBAC", "Row level security", "Multi-tenancy"],
  },
  {
    label: "Workflow",
    title: "Development",
    blurb: "Schema and types first, screens second.",
    description:
      "Version control, reviewable branches and a habit of writing the schema and the types before the screens.",
    items: ["Git", "GitHub", "Code review", "CI builds"],
  },
];

/** Marquee row — grouped so the two rows read differently. */
export const techMarquee = {
  primary: [
    "TypeScript",
    "React",
    "Next.js",
    "PostgreSQL",
    "Supabase",
    "Python",
    "Flask",
    "Tailwind CSS",
  ],
  secondary: [
    "Docker",
    "Vercel",
    "Railway",
    "MySQL",
    "Firebase",
    "REST APIs",
    "Git",
    "GitHub",
  ],
};

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Software Development Intern",
    company: "Iinvsys",
    period: "June 2025 — August 2025",
    summary:
      "Built and deployed an AI-powered Air Filter Prediction System, working across the full path from raw sensor data to a running service.",
    highlights: [
      "Developed Flask REST APIs serving real-time predictions to client systems",
      "Owned data preprocessing and feature engineering over sensor time series",
      "Trained regression and classification pipelines and packaged them as versioned artefacts",
      "Built web interfaces for visualising predictions against recent sensor history",
      "Participated in testing, debugging and production deployment cycles",
      "Worked on service performance and scalability under synchronous request load",
    ],
    tech: ["Python", "Flask", "REST APIs", "TSMixer", "Docker"],
  },
];

export interface FeaturedRepo {
  name: string;
  description: string;
  tech: string[];
  repo: string;
  demo?: string;
  slug?: string;
}

export const featuredRepos: FeaturedRepo[] = [
  {
    name: "gymflow",
    description:
      "Live multi-tenant gym management SaaS — owner console, member PWA, payments and WhatsApp renewal automation.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Supabase"],
    repo: "https://github.com/Ganesamurthi-V",
    demo: "https://gymflow.sbs",
    slug: "gymflow",
  },
  {
    name: "lightbase",
    description:
      "Self-hostable open-source backend platform: auth, generated REST APIs and a data console.",
    tech: ["TypeScript", "PostgreSQL", "Docker"],
    repo: "https://github.com/Ganesamurthi-V",
    slug: "lightbase",
  },
  {
    name: "air-filter-prediction",
    description:
      "Predictive maintenance service exposing filter-health models over a Flask REST API.",
    tech: ["Python", "Flask", "TSMixer"],
    repo: "https://github.com/Ganesamurthi-V",
    slug: "air-filter-prediction",
  },
  {
    name: "smart-career-guide",
    description:
      "Resume and job-description matcher producing match scores and structured skill-gap reports.",
    tech: ["Python", "NLP", "Flask"],
    repo: "https://github.com/Ganesamurthi-V",
    slug: "smart-career-guide",
  },
];
