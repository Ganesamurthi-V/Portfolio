export type ProjectStatus = "live" | "in-development" | "open-source" | "shipped";

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel?: string;
  kind: "client" | "edge" | "service" | "data" | "external";
}

export interface ArchitectureEdge {
  from: string;
  to: string;
  label?: string;
}

export interface CaseStudySection {
  title: string;
  body?: string;
  bullets?: string[];
}

export interface Project {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  category: string;
  year: string;
  status: ProjectStatus;
  flagship?: boolean;
  summary: string;
  tech: string[];
  features: string[];
  image: string;
  imageAlt: string;
  gallery: {
    src: string;
    alt: string;
    caption: string;
    /** Tall screenshots are framed and contained rather than cropped to fill. */
    portrait?: boolean;
  }[];
  repo?: string;
  /** Public marketing site. */
  demo?: string;
  /** Deep link into the running application. */
  appUrl?: string;
  metrics: { label: string; value: number; suffix?: string; prefix?: string }[];
  caseStudy: {
    problem: CaseStudySection;
    solution: CaseStudySection;
    features: CaseStudySection;
    architecture: {
      title: string;
      body: string;
      nodes: ArchitectureNode[];
      edges: ArchitectureEdge[];
    };
    implementation: CaseStudySection;
    challenges: { title: string; body: string }[];
    result: CaseStudySection;
    lessons: CaseStudySection;
  };
}

export const projects: Project[] = [
  {
    slug: "gymflow",
    index: "01",
    name: "GymFlow",
    tagline: "Gym Management SaaS Platform",
    category: "Multi-tenant SaaS",
    year: "2026",
    status: "live",
    flagship: true,
    summary:
      "A live, commercial multi-tenant SaaS for independent gyms in India. Two product surfaces — an owner console covering members, payments, dues, attendance, inventory and programs, plus a member PWA — sold on its own subscription with a 14-day trial.",
    tech: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Tailwind CSS",
      "WhatsApp API",
    ],
    features: [
      "Member management",
      "Payments with UPI, cash and card reconciliation",
      "Fee dues and renewal tracking",
      "Self-service attendance kiosk",
      "Inventory and workout programs",
      "Member PWA with gamified rewards",
      "WhatsApp renewal automation",
      "Owner subscription billing and trials",
      "Multi-tenant architecture",
    ],
    image: "/projects/gymflow-landing.png",
    imageAlt:
      "GymFlow marketing site hero reading 'Gym management, made effortless' above a product dashboard",
    gallery: [
      {
        src: "/projects/gymflow-demo.png",
        alt: "GymFlow owner dashboard with active members, collection and dues metrics",
        caption:
          "Owner dashboard — active members, today's collection, expiring memberships and outstanding dues",
      },
      {
        src: "/projects/gymflow-members.png",
        alt: "GymFlow member roster with plan, expiry and status columns",
        caption:
          "Members — roster filtered by status, searchable by name, phone or member ID, with CSV import and export",
      },
      {
        src: "/projects/gymflow-payments.png",
        alt: "GymFlow payments screen showing monthly collection split by payment mode",
        caption:
          "Payments — collection split across cash, UPI and card, separated into memberships, inventory and dues",
      },
      {
        src: "/projects/gymflow-attendance.png",
        alt: "GymFlow self-service attendance kiosk asking for a member ID",
        caption:
          "Attendance — a kiosk screen members operate themselves, with morning and evening sessions",
      },
      {
        src: "/projects/gymflow-member-app.png",
        alt: "GymFlow member portal management with invitation and login activity",
        caption:
          "Member App — portal access, invitations and gamification, with weekly and monthly active counts",
      },
      {
        src: "/projects/gymflow-subscription.png",
        alt: "GymFlow subscription plans with monthly, six-month and yearly pricing",
        caption:
          "Subscription — GymFlow's own billing: three tiers behind a 14-day trial, no card required",
      },
      {
        src: "/projects/gymflow-add-member.png",
        alt: "GymFlow add member wizard with live member ID availability check",
        caption:
          "Onboarding — a two-step wizard that suggests the next member ID and checks availability live",
      },
      {
        src: "/projects/gymflow-mobile.png",
        alt: "GymFlow owner dashboard on a phone viewport with bottom navigation",
        caption:
          "Responsive — the owner console on a phone, since most gym owners run the floor from one",
        portrait: true,
      },
    ],
    repo: "https://github.com/Ganesamurthi-V",
    demo: "https://gymflow.sbs",
    appUrl: "https://app.gymflow.sbs",
    metrics: [
      { label: "Shipped modules", value: 8, suffix: "" },
      { label: "Product surfaces", value: 2, suffix: "" },
      { label: "Subscription tiers", value: 3, suffix: "" },
    ],
    caseStudy: {
      problem: {
        title: "Problem",
        body: "Independent gyms in India run on notebooks, a spreadsheet and a WhatsApp thread. Nothing reconciles. A membership lapses and nobody notices until the member stops showing up; the day's cash is counted separately from the UPI screenshots; the register at the front desk only gets filled in when someone remembers. The owner has no answer to the two questions that matter — who owes money, and who is about to leave.",
        bullets: [
          "Member records split across a notebook, a spreadsheet and chat history",
          "Renewals tracked by memory, so expiries and dues quietly slip past",
          "Cash, UPI and card collections never reconciled into one number",
          "Attendance registers filled in retrospectively, if at all",
          "Reminders sent manually, one member at a time",
        ],
      },
      solution: {
        title: "Solution",
        body: "GymFlow replaces that stack with one multi-tenant application, and deliberately ships two surfaces rather than one. Owners get a console covering members, payments, dues, attendance, inventory and workout programs. Members get their own progressive web app for membership status, workouts, progress and rewards. Renewal chasing — the job owners most want to stop doing — is automated over WhatsApp.",
        bullets: [
          "One relational model spanning members, plans, payments, dues and attendance",
          "Each gym is a tenant with its data isolated at the database layer",
          "A second product surface: a member PWA with gamified rewards",
          "Attendance captured as self-service, so it costs the front desk nothing",
          "WhatsApp automation for expiry and dues reminders",
          "GymFlow sells itself: owner subscriptions with a 14-day trial and three tiers",
        ],
      },
      features: {
        title: "Features",
        bullets: [
          "Members — roster with plan, expiry and status, searchable by name, phone or member ID, with CSV import and export",
          "Onboarding — a two-step wizard that suggests the next member ID and validates availability as you type",
          "Payments — collection split by cash, UPI and card, separated into memberships, inventory and dues, over any date range",
          "Dues — outstanding fee tracking with per-member balances and reminder actions",
          "Attendance — a kiosk screen members operate themselves, with morning and evening sessions and a daily check-in count",
          "Inventory — stock and supplement sales that feed the same collection totals",
          "Programs — reusable workout templates with draft and published states, assignable to members",
          "Member App — portal access control, invitations, gamification, and weekly and monthly active counts",
          "Subscription — GymFlow's own billing across monthly, six-month and yearly tiers behind a trial",
          "Daily report PDF, light and dark themes, and a responsive layout for running the floor from a phone",
        ],
      },
      architecture: {
        title: "Architecture",
        body: "Two clients and a kiosk talk to one Next.js application. Middleware resolves the session and the tenant before a request reaches a route handler, authorisation is applied in a single policy layer, and Postgres row level security acts as the backstop. Supabase supplies auth, Postgres and storage; WhatsApp sits behind the service boundary.",
        nodes: [
          { id: "owner", label: "Owner console", sublabel: "Next.js App Router", kind: "client" },
          { id: "member", label: "Member PWA", sublabel: "Status, workouts, rewards", kind: "client" },
          { id: "kiosk", label: "Attendance kiosk", sublabel: "Self-service check-in", kind: "client" },
          { id: "edge", label: "Middleware", sublabel: "Session + tenant resolution", kind: "edge" },
          { id: "api", label: "Route handlers", sublabel: "Server actions, validation", kind: "service" },
          { id: "authz", label: "Authorisation", sublabel: "Role policy + RLS context", kind: "service" },
          { id: "jobs", label: "Reminder jobs", sublabel: "Expiry and dues sweeps", kind: "service" },
          { id: "db", label: "PostgreSQL", sublabel: "Row level security per tenant", kind: "data" },
          { id: "storage", label: "Object storage", sublabel: "Photos, report PDFs", kind: "data" },
          { id: "auth", label: "Supabase Auth", sublabel: "Sessions, recovery", kind: "external" },
          { id: "wa", label: "WhatsApp API", sublabel: "Renewal reminders", kind: "external" },
        ],
        edges: [
          { from: "owner", to: "edge", label: "HTTPS" },
          { from: "member", to: "edge", label: "HTTPS" },
          { from: "kiosk", to: "edge", label: "check-in" },
          { from: "edge", to: "auth", label: "verify" },
          { from: "edge", to: "api", label: "session" },
          { from: "api", to: "authz", label: "role check" },
          { from: "authz", to: "db", label: "scoped SQL" },
          { from: "api", to: "storage", label: "signed URL" },
          { from: "jobs", to: "db", label: "sweep" },
          { from: "jobs", to: "wa", label: "send" },
        ],
      },
      implementation: {
        title: "Implementation",
        body: "The decisions that mattered were mostly about where to put trust, and how much the front desk should have to do. Anything security-relevant resolves on the server and is re-checked in the database; anything routine is designed to need no staff attention at all.",
        bullets: [
          "Tenant id is derived from the session, never read from the request body",
          "Row level security policies mirror the application's role rules, so a mistake in a query cannot leak another gym's data",
          "Money is stored in integer minor units, so cash, UPI and card totals reconcile exactly",
          "Attendance writes are idempotent per member per session, so a double tap at the kiosk cannot inflate the count",
          "Member IDs are human-readable and sequential per tenant, with availability checked live during onboarding",
          "Reminder sweeps are scheduled and idempotent, so a retry cannot message the same member twice",
          "Dashboard counters are computed in SQL against indexes on tenant and date rather than aggregated in JavaScript",
          "Every mutation boundary is schema-validated before it reaches the database",
        ],
      },
      challenges: [
        {
          title: "Multi-tenancy without a database per gym",
          body: "A database per tenant is easy to reason about and expensive to operate. I went with shared tables plus row level security, which meant every policy had to be written and tested deliberately. The rule I settled on: the application filters for correctness, the database filters for safety, and both apply the same tenant predicate.",
        },
        {
          title: "Reconciling three payment modes into one number",
          body: "Cash, UPI and card arrive through completely different paths, and owners care about one figure. Modelling every collection as a payment row with a mode, and deriving the split at query time, meant the dashboard, the payments screen and the daily PDF could never disagree with each other.",
        },
        {
          title: "Getting attendance recorded at all",
          body: "The first version put attendance behind a staff login, and it went unused — the front desk is busy. Turning it into a kiosk the member operates themselves, with nothing but a member ID and a session toggle, is what made the data start existing. Idempotent writes were then non-negotiable.",
        },
        {
          title: "Dues and expiry that stay correct over time",
          body: "Memberships get renewed late, extended, and paid in parts. Treating a membership as a date pair broke immediately. It became a series of periods with explicit status plus a separate dues ledger, so a part payment and a late renewal are two different facts rather than one overwritten field.",
        },
        {
          title: "Building for two audiences at once",
          body: "An owner console and a member app want opposite things — density versus focus. Sharing the data layer but keeping the interfaces genuinely separate, instead of trying to make one responsive app serve both, kept each surface honest about who it was for.",
        },
        {
          title: "Being the vendor as well as the developer",
          body: "GymFlow charges for itself, which means trials, tier limits and an expiring subscription banner are product features, not afterthoughts. Modelling the gym's own subscription with the same rigour as its members' memberships avoided two competing notions of what 'expired' means.",
        },
      ],
      result: {
        title: "Result",
        body: "GymFlow is live and selling. The marketing site is at gymflow.sbs and the product runs at app.gymflow.sbs, with eight shipped modules across an owner console and a member PWA, a 14-day trial, and three subscription tiers. It is the project where I own every layer — schema, authorisation, billing, deployment and the pricing page — rather than just the features.",
      },
      lessons: {
        title: "Lessons Learned",
        body: "Two things I would do differently. Write the row level security policies alongside the schema rather than after the features, because retrofitting them meant re-testing every read path. And model money as an append-only ledger from the first commit — I arrived there, but only after the mutable version had produced balances I could not explain. The broader lesson was about adoption: the attendance module only started producing data once I stopped asking staff to operate it.",
      },
    },
  },
  {
    slug: "lightbase",
    index: "02",
    name: "LightBase",
    tagline: "Open Source Backend Platform",
    category: "Backend platform",
    year: "2025",
    status: "open-source",
    summary:
      "A self-hostable, open-source backend platform inspired by Supabase: authentication, database management and REST APIs in a deliberately lightweight package.",
    tech: ["TypeScript", "PostgreSQL", "REST APIs", "Docker"],
    features: [
      "Authentication",
      "Database management",
      "API services",
      "Self-hosting",
      "Lightweight architecture",
      "Extensibility",
      "Community contribution support",
    ],
    image: "/projects/lightbase-console.svg",
    imageAlt: "LightBase console showing table editor, API keys and auth providers",
    gallery: [
      {
        src: "/projects/lightbase-console.svg",
        alt: "LightBase console with table browser and row editor",
        caption: "Console — browse schemas, inspect rows and manage policies",
      },
      {
        src: "/projects/lightbase-api.svg",
        alt: "LightBase auto-generated REST API reference",
        caption: "Auto-generated REST endpoints derived from the schema",
      },
    ],
    repo: "https://github.com/Ganesamurthi-V",
    metrics: [
      { label: "Core services", value: 4 },
      { label: "Container footprint", value: 3, suffix: " images" },
      { label: "Endpoints generated", value: 100, prefix: "auto " },
    ],
    caseStudy: {
      problem: {
        title: "Problem",
        body: "Managed backend platforms are excellent until you need to own your data, run inside a private network, or keep costs flat. The self-hosted alternatives tend to be heavy: many services, a large compose file, and a lot of moving parts for a small project. I wanted the ergonomics of a hosted backend with a footprint a student project or an internal tool could realistically operate.",
        bullets: [
          "Vendor-hosted backends make data residency and cost control awkward",
          "Existing self-hosted options require significant infrastructure to run",
          "Small teams still need auth, a database API and a way to inspect data",
        ],
      },
      solution: {
        title: "Solution",
        body: "LightBase exposes a Postgres database through a generated REST layer, adds token-based authentication, and ships a console for inspecting and editing data. It runs from a small set of containers and is designed to be read: the code is deliberately plain TypeScript so contributors can follow a request end to end.",
        bullets: [
          "REST endpoints derived from the database schema rather than hand-written per table",
          "Token-based auth with password hashing and refresh handling",
          "A console for schema browsing, row editing and key management",
          "Single compose file, no orchestration required to self-host",
        ],
      },
      features: {
        title: "Features",
        bullets: [
          "Authentication — signup, login, token refresh and password hashing",
          "Database management — schema introspection, table browsing and row editing",
          "API services — generated REST resources with filtering, ordering and pagination",
          "Self-hosting — containerised services with environment-driven configuration",
          "Lightweight architecture — a small number of processes and dependencies",
          "Extensibility — a plugin seam for custom routes and middleware",
          "Community contribution support — documented layout and typed boundaries",
        ],
      },
      architecture: {
        title: "Architecture",
        body: "An HTTP gateway fronts three internal concerns: auth, the generated data API, and schema introspection. Everything persists to a single Postgres instance. The console is a client of the same public API, which keeps the API honest.",
        nodes: [
          { id: "sdk", label: "Client / SDK", sublabel: "fetch, typed helpers", kind: "client" },
          { id: "console", label: "Console", sublabel: "Schema + row editor", kind: "client" },
          { id: "gateway", label: "HTTP gateway", sublabel: "Routing, CORS, rate limits", kind: "edge" },
          { id: "authsvc", label: "Auth service", sublabel: "Tokens, hashing, refresh", kind: "service" },
          { id: "datasvc", label: "Data API", sublabel: "Query builder, filters", kind: "service" },
          { id: "introspect", label: "Introspection", sublabel: "Schema to routes", kind: "service" },
          { id: "pg", label: "PostgreSQL", sublabel: "Single source of truth", kind: "data" },
        ],
        edges: [
          { from: "sdk", to: "gateway", label: "REST" },
          { from: "console", to: "gateway", label: "REST" },
          { from: "gateway", to: "authsvc", label: "/auth" },
          { from: "gateway", to: "datasvc", label: "/rest" },
          { from: "datasvc", to: "introspect", label: "schema" },
          { from: "authsvc", to: "pg" },
          { from: "datasvc", to: "pg", label: "parameterised SQL" },
          { from: "introspect", to: "pg", label: "catalog" },
        ],
      },
      implementation: {
        title: "Implementation",
        body: "The interesting work was in the generated data API: turning URL query parameters into SQL without opening an injection hole, and keeping the generated surface predictable as the schema changes.",
        bullets: [
          "Schema is read from the Postgres catalog at boot and cached, then invalidated on migration",
          "Every generated query is parameterised; identifiers are validated against the introspected catalog rather than interpolated",
          "Filter grammar is a small, closed set of operators so the query surface stays auditable",
          "Pagination is keyset-based by default to avoid deep-offset scans",
          "Auth tokens are short-lived with rotating refresh tokens stored hashed",
          "Services share typed request/response contracts so the console cannot drift from the API",
        ],
      },
      challenges: [
        {
          title: "Generating SQL safely",
          body: "The whole value of a generated API is that clients can express queries, which is also exactly where injection lives. The rule became: values are always bound parameters, and identifiers are only ever looked up from the introspected catalog. If a column name is not in the catalog, the request is rejected before any SQL is built.",
        },
        {
          title: "API design that stays stable as schemas change",
          body: "Early versions exposed database details directly, so a column rename was a breaking API change. Adding an explicit exposure layer — which tables and columns are public, under what names — decoupled the API contract from the physical schema.",
        },
        {
          title: "Keeping the footprint genuinely light",
          body: "Every convenience wanted its own service. I set a hard budget on process count and dependency weight, which forced choices like doing introspection in-process instead of running a separate metadata service.",
        },
        {
          title: "Making it contributable",
          body: "Open source only works if a stranger can find their way around. That meant boring but useful things: one obvious entry point per service, typed boundaries between them, and a request lifecycle short enough to read in one sitting.",
        },
      ],
      result: {
        title: "Result",
        body: "LightBase runs as a self-hosted backend: bring a Postgres instance, start the containers, and you have authentication, a generated REST API and a console over your own data. It is the project where I did the most deliberate backend and API design work.",
      },
      lessons: {
        title: "Lessons Learned",
        body: "Generating an API from a schema is the easy half; deciding what not to expose is the half that determines whether the thing is maintainable. If I rebuilt it, the exposure layer would come first and the generator second. I would also add contract tests against a matrix of Postgres versions, since catalog behaviour is where the surprises live.",
      },
    },
  },
  {
    slug: "air-filter-prediction",
    index: "03",
    name: "Air Filter Prediction System",
    tagline: "Predictive maintenance service",
    category: "Applied ML service",
    year: "2025",
    status: "shipped",
    summary:
      "A production service that predicts AC air filter health from sensor data, built during an internship at Iinvsys with Flask REST APIs serving real-time predictions.",
    tech: ["Python", "Flask", "TSMixer", "REST APIs", "Docker"],
    features: [
      "Flask REST APIs",
      "Real-time prediction services",
      "Production deployment",
      "Feature engineering",
      "System integration",
      "Monitoring support",
    ],
    image: "/projects/airfilter-monitor.svg",
    imageAlt: "Air filter monitoring dashboard with health score and sensor time series",
    gallery: [
      {
        src: "/projects/airfilter-monitor.svg",
        alt: "Filter health dashboard with predicted remaining life",
        caption: "Monitoring view — predicted filter health and remaining service life",
      },
    ],
    metrics: [
      { label: "Pipeline stages", value: 5 },
      { label: "Model heads", value: 2 },
      { label: "API endpoints", value: 7 },
    ],
    caseStudy: {
      problem: {
        title: "Problem",
        body: "AC air filters were serviced on a fixed calendar schedule, which is wrong in both directions: clean filters get replaced early, and filters in dusty environments degrade well before their service date, quietly costing efficiency. The sensor data needed to tell the difference already existed but was not being used to decide anything.",
        bullets: [
          "Fixed-interval servicing ignores actual operating conditions",
          "Degradation shows up in sensor trends before it shows up in symptoms",
          "Any prediction only matters if an application can consume it in real time",
        ],
      },
      solution: {
        title: "Solution",
        body: "A service that turns sensor time series into two answers: a continuous health estimate and a discrete replace/do-not-replace classification. A TSMixer-based regression head handles the trend, a classification head handles the decision boundary, and both are exposed behind a Flask REST API so the surrounding systems can act on them.",
        bullets: [
          "Regression pipeline estimating filter health over time",
          "Classification pipeline producing an actionable service decision",
          "Flask REST API serving predictions synchronously to client systems",
          "Web interface for visualising predictions against recent sensor history",
        ],
      },
      features: {
        title: "Features",
        bullets: [
          "Flask REST APIs with versioned prediction and health endpoints",
          "Real-time prediction serving with warm model loading",
          "Feature engineering over rolling sensor windows",
          "Production deployment with containerised, reproducible builds",
          "System integration with the existing data collection layer",
          "Monitoring support — request logging, latency and input drift signals",
        ],
      },
      architecture: {
        title: "Architecture",
        body: "Sensor readings land in storage, a preprocessing stage builds windowed features, and the Flask service loads trained artefacts once at startup and serves predictions over HTTP. Visualisation reads the same API.",
        nodes: [
          { id: "sensors", label: "Sensor feed", sublabel: "Time series readings", kind: "external" },
          { id: "store", label: "Data store", sublabel: "Historical windows", kind: "data" },
          { id: "features", label: "Feature pipeline", sublabel: "Rolling aggregates, scaling", kind: "service" },
          { id: "models", label: "Model artefacts", sublabel: "TSMixer regressor + classifier", kind: "data" },
          { id: "api", label: "Flask API", sublabel: "Prediction endpoints", kind: "service" },
          { id: "ui", label: "Web interface", sublabel: "Prediction visualisation", kind: "client" },
        ],
        edges: [
          { from: "sensors", to: "store", label: "ingest" },
          { from: "store", to: "features", label: "windows" },
          { from: "features", to: "api", label: "vectors" },
          { from: "models", to: "api", label: "loaded once" },
          { from: "api", to: "ui", label: "JSON" },
        ],
      },
      implementation: {
        title: "Implementation",
        body: "Most of the engineering effort went into the boundary between training and serving, which is where this class of system usually breaks.",
        bullets: [
          "The same feature-engineering code path is used for training and inference, so the two cannot diverge",
          "Scalers and encoders are versioned alongside model weights and loaded as one artefact bundle",
          "Models load once at process start rather than per request, keeping latency predictable",
          "Input validation rejects malformed or out-of-range sensor windows before inference",
          "Endpoints return the prediction plus the model version that produced it, which makes results traceable",
          "Request/latency logging and basic input-distribution checks feed the monitoring layer",
        ],
      },
      challenges: [
        {
          title: "Training/serving skew",
          body: "The first deployment produced predictions that did not match validation results. The cause was a preprocessing difference between the notebook and the service. Extracting the transformation into a single shared module, imported by both, removed the class of bug entirely.",
        },
        {
          title: "Latency under synchronous requests",
          body: "Loading model artefacts per request made responses unusable. Moving to warm, process-lifetime model loading with a health endpoint to confirm readiness brought response times into a range the client systems could call inline.",
        },
        {
          title: "Turning a continuous score into a decision",
          body: "A health percentage is not an action. Pairing the regressor with a classifier, and reporting both, let the consuming system show a trend while still receiving an unambiguous replace/keep signal.",
        },
        {
          title: "Deploying reproducibly",
          body: "Python dependency drift made builds non-deterministic across machines. Pinning the environment and containerising the service made deployments repeatable, which mattered once other people needed to run it.",
        },
      ],
      result: {
        title: "Result",
        body: "The system was deployed during the internship and served predictions through its REST API to the surrounding application, with a web interface for inspecting predicted filter health against recent sensor history. My contribution spanned preprocessing, feature engineering, model training, API development and the deployment path.",
      },
      lessons: {
        title: "Lessons Learned",
        body: "The model was never the hard part. Reproducible environments, one shared preprocessing path, and versioned artefacts are what made it a service rather than an experiment. Next time I would put a schema contract on the sensor input from the first commit, because every ambiguity there eventually surfaced as a production bug.",
      },
    },
  },
  {
    slug: "smart-career-guide",
    index: "04",
    name: "Smart Career Guide",
    tagline: "AI Resume & Job Matcher",
    category: "Web application",
    year: "2025",
    status: "shipped",
    summary:
      "A web application that analyses a resume against job descriptions, then returns role recommendations and a structured skill-gap report.",
    tech: ["Python", "NLP", "Flask", "PostgreSQL"],
    features: [
      "Resume parsing",
      "Job description analysis",
      "Match scoring",
      "Skill-gap reporting",
      "Recommendation feed",
    ],
    image: "/projects/career-guide.svg",
    imageAlt: "Smart Career Guide interface showing match score and skill gap breakdown",
    gallery: [
      {
        src: "/projects/career-guide.svg",
        alt: "Resume match report with skill gap breakdown",
        caption: "Match report — overlap, gaps and recommended roles from one upload",
      },
    ],
    metrics: [
      { label: "Processing stages", value: 4 },
      { label: "Supported formats", value: 3 },
      { label: "Report sections", value: 3 },
    ],
    caseStudy: {
      problem: {
        title: "Problem",
        body: "Candidates apply broadly and learn nothing from rejections. The information needed to target better applications is sitting in the gap between their resume and the job description, but comparing the two by hand across dozens of postings is not something anyone sustains.",
        bullets: [
          "No structured feedback on why a resume does not match a role",
          "Manual comparison across many postings is impractical",
          "Skill gaps stay implicit, so learning effort is unfocused",
        ],
      },
      solution: {
        title: "Solution",
        body: "Upload a resume once, point it at job descriptions, and get a structured report: what overlaps, what is missing, and which roles fit best. The interface leads with the gap rather than a single opaque score, because the gap is the part a candidate can act on.",
        bullets: [
          "Resume parsing across common document formats into a normalised profile",
          "Job description analysis extracting required and preferred skills",
          "Match scoring with the contributing terms shown, not hidden",
          "Skill-gap report grouped by theme so it maps onto learning decisions",
        ],
      },
      features: {
        title: "Features",
        bullets: [
          "Resume upload and text extraction with format detection",
          "Normalisation of skills and titles against a controlled vocabulary",
          "Job description parsing into required versus preferred requirements",
          "Match score with visible contributing and missing terms",
          "Skill-gap report grouped into themes",
          "Role recommendations ranked by fit",
        ],
      },
      architecture: {
        title: "Architecture",
        body: "A thin web layer handles upload and rendering. Extraction, normalisation and matching run as distinct stages so each can be tested and swapped independently, with parsed profiles and postings persisted for reuse.",
        nodes: [
          { id: "ui", label: "Web app", sublabel: "Upload, report views", kind: "client" },
          { id: "api", label: "Flask API", sublabel: "Upload + analyse routes", kind: "edge" },
          { id: "extract", label: "Extraction", sublabel: "Document to text", kind: "service" },
          { id: "nlp", label: "NLP pipeline", sublabel: "Normalise, extract skills", kind: "service" },
          { id: "match", label: "Matcher", sublabel: "Score, rank, diff", kind: "service" },
          { id: "db", label: "PostgreSQL", sublabel: "Profiles, postings, reports", kind: "data" },
        ],
        edges: [
          { from: "ui", to: "api", label: "upload" },
          { from: "api", to: "extract" },
          { from: "extract", to: "nlp", label: "text" },
          { from: "nlp", to: "match", label: "profile" },
          { from: "match", to: "db", label: "persist" },
          { from: "db", to: "ui", label: "report" },
        ],
      },
      implementation: {
        title: "Implementation",
        body: "The application architecture mattered more than the modelling. Keeping each stage independent is what made the pipeline debuggable.",
        bullets: [
          "Extraction, normalisation and matching are separate stages with explicit data contracts",
          "A controlled skill vocabulary collapses synonyms so scoring is not defeated by wording",
          "Parsed artefacts are cached, so re-analysing against a new posting skips extraction",
          "Scores always ship with their contributing terms, which keeps the output inspectable",
          "Uploads are validated by type and size before any parsing runs",
        ],
      },
      challenges: [
        {
          title: "Resume formats are not a format",
          body: "Two PDFs that look identical can extract into completely different text orders. Adding a normalisation pass after extraction, and checking for obviously degenerate output before continuing, made downstream stages far more predictable.",
        },
        {
          title: "Vocabulary mismatch between resumes and postings",
          body: "The same skill appears under many names. Without a controlled vocabulary the matcher penalised candidates for word choice. Mapping surface forms onto canonical skills fixed most of the false gaps.",
        },
        {
          title: "Making a score trustworthy",
          body: "An unexplained number invites suspicion. Showing the terms that produced the score, and which requirements went unmatched, turned it from a verdict into something a user could reason about.",
        },
      ],
      result: {
        title: "Result",
        body: "A working application where a single resume upload produces a match score, an explicit skill-gap breakdown and ranked role recommendations against the job descriptions it is compared with.",
      },
      lessons: {
        title: "Lessons Learned",
        body: "Explainability was a product feature, not a nicety — the report only became useful once the reasoning was visible. If I extended it, the next step would be tracking a candidate's gaps over time so the app can show progress rather than a snapshot.",
      },
    },
  },
];

export const projectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);

export const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  "in-development": "In development",
  "open-source": "Open source",
  shipped: "Shipped",
};
