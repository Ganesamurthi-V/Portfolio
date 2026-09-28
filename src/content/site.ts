/**
 * Single source of truth for identity, links and section copy.
 * Update values here rather than inside components.
 */

export const site = {
  name: "Ganesamurthi V",
  shortName: "Ganesamurthi",
  initials: "GV",
  role: "Full-Stack Developer",
  statement:
    "Building modern web applications, SaaS platforms, and scalable backend systems.",
  focus: [
    "Web Applications",
    "SaaS",
    "Backend Systems",
    "Databases",
    "APIs",
    "Deployment",
  ],
  location: "Puducherry, India",
  // Deployed origin — used for metadata, OG tags and sitemap.
  url: "https://ganesamurthi.dev",
  email: "ganesamurthiv@gmail.com",
  phone: "+91 93848 86895",
  phoneHref: "tel:+919384886895",
  resume: "/Ganesamurthi-V-Resume.pdf",
  links: {
    github: "https://github.com/Ganesamurthi-V",
    // TODO: replace with the real LinkedIn vanity URL.
    linkedin: "https://www.linkedin.com/in/ganesamurthi-v",
    email: "mailto:ganesamurthiv@gmail.com",
  },
} as const;

export const nav = [
  { label: "Home", href: "/#top", id: "top" },
  { label: "Work", href: "/#work", id: "work" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;

export const about = {
  heading: "Built across the whole stack",
  body: "I'm a Computer Science and Business Systems undergraduate focused on full-stack development. I build web applications across the frontend, backend, database, and deployment layers, with a particular interest in SaaS products and practical business applications.",
  detail:
    "Most of what I know came from shipping: designing schemas that survive real data, wiring auth that holds up under multi-tenant access rules, and getting things onto a URL that other people actually use.",
} as const;

export const education = {
  degree: "B.Tech, Computer Science and Business Systems",
  institution: "Sri Manakula Vinayagar Engineering College",
  expected: "Expected May 2027",
  note: "Coursework spanning data structures, database systems, software engineering, and business systems analysis.",
} as const;

export const currentlyBuilding = {
  project: "GymFlow",
  summary:
    "Live at gymflow.sbs and taking signups. The platform ships members, payments, dues, attendance, inventory, programs and a member PWA — and the work now is the reporting module and deeper WhatsApp automation.",
  stages: ["Building", "Testing", "Shipped"] as const,
  activeStage: 2,
  notes: [
    "Reports module: owner-facing revenue, retention and utilisation views",
    "WhatsApp automation for expiry and dues reminder sweeps",
    "Gamified rewards and streaks in the member PWA",
  ],
} as const;

export const contact = {
  heading: "Let's Build Something",
  body: "Have a project, opportunity, or idea? Let's talk.",
} as const;
