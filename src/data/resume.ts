/**
 * Portfolio content — single source of truth.
 * Populated from Manan Parikh's resume.
 * Swap fields here and the site reflows automatically.
 */

export type Project = {
  id: string;
  index: string;
  year: string;
  title: string;
  client: string;
  role: string;
  medium: string[];
  summary: string;
  highlights: string[];
  accent: "rust" | "moss" | "ink" | "clay";
  href?: string;
};

export type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  location: string;
  note: string;
};

export type Capability = {
  title: string;
  detail: string;
  tags: string[];
};

export type Award = {
  year: string;
  name: string;
  outlet: string;
};

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
};

// Single source of truth for GPAs — update here, reflows everywhere.
export const MS_GPA = "3.78";    // MS Computer Science · UMass Amherst
export const BTECH_GPA = "3.79"; // BTech Computer Engineering · Charotar University

export const profile = {
  name: "Manan Parikh",
  firstName: "Manan",
  lastName: "Parikh",
  titleLine1: "Software Engineer",
  titleLine2: "& Distributed Systems Builder",
  location: "Amherst, MA → open to relocate",
  timezone: "EST",
  availability: "Open to new-grad roles starting from December 2026",
  email: "manan.parikh.work@gmail.com",
  phone: "+1 (413) 409-9851",
  pronouns: "he/him",
  pitch:
    "I build the parts of software that have to stay up — REST services, replication protocols, the caching layer nobody notices until it's gone. I like code where correctness is measurable and the tests actually run.",
  longPitch:
    "I'm a backend-leaning full-stack engineer with two years of production experience at Thomson Reuters and a Master's in Computer Science at UMass Amherst. I've shipped REST APIs that serve thousands of users, encrypted records from a million-row database, and built distributed systems from scratch in Java — caching, leader-based replication, crash recovery, the works.",
  // Hero "Currently" line
  currently:
    `Pursuing MS in Computer Science at UMass Amherst (GPA ${MS_GPA}). Previously Associate Software Engineer at Thomson Reuters. Open to SDE / backend / full-stack roles starting in December 2026/ January 2027`,
  // Bio paragraphs for the About section
  bioLead:
    "I'm Manan — an engineer who likes the parts of software most people skip past. The test suite. The cache invalidation strategy. The replication protocol that survives a node going down at 3 a.m. I've spent the last two years writing production Java at Thomson Reuters and the two before that building distributed systems in Java for coursework that I treated like production.",
  bioBody1:
    "I work best when the problem has a measurable definition of done — latency curves, test coverage, a confusion matrix. I think REST APIs are a craft, not a chore. I think the difference between a junior and a senior is mostly about reading logs.",
  bioBody2:
    "Right now I'm at UMass Amherst finishing my MS. I have taken classes in distributed systems, Machine Learning, Neural Networks and Software Engineering. I'm looking for new grad roles starting in December 2026 role where the backend is the product, or where it might as well be.",
  // About sidenotes
  studied:
    `MS Computer Science — UMass Amherst (2026), GPA ${MS_GPA}/4.0. BTech Computer Engineering — Charotar University (2023), GPA ${BTECH_GPA}/4.0.`,
  // Hero keyword marquee
  keywords: [
    "Backend systems",
    "Distributed systems",
    "Java · Spring",
    "REST APIs",
    "Microservices",
    "React · Node",
    "AWS · Docker",
    "Replication",
    "Caching",
    "Machine learning",
    "CI/CD",
    "Full-stack",
  ],
  // Recognition pull quote (personal engineering philosophy)
  pullQuote:
    "The best code I've written is the code nobody mentions — because it ran, the tests passed, and the on-call didn't page anyone.",
  pullQuoteAttribution: "Personal engineering note",
  // Recognition CTA
  recognitionCta: {
    label: "Want the long version?",
    body: "I keep a one-pager with the un-resume-fied details — failed approaches, prod incidents, and the bug that took three days.",
    button: "Request the one-pager",
  },
} as const;

export const stats = [
  { value: "1M+", label: "Records encrypted" },
  { value: "15+", label: "REST APIs shipped" },
  { value: "90–95%", label: "Test coverage" },
  { value: "94–96%", label: "ML model accuracy" },
];

export const projects: Project[] = [
  {
    id: "cleardocs",
    index: "01",
    year: "2023 – 24",
    title: "Cleardocs",
    client: "Thomson Reuters · Backend",
    role: "Associate Software Engineer",
    medium: ["Java", "Spring", "Hibernate", "REST"],
    summary:
      "Backend services for a platform thousands of businesses rely on to incorporate and manage legal entities. I shipped 15+ REST APIs and owned the data-persistence layer.",
    highlights: [
      "Encrypted sensitive records across a 1M+ row database, bringing the platform into compliance",
      "Resolved 20+ legacy backend issues by tracing service flows through logs",
      "Pushed test coverage to 90–95% across the services I owned",
      "Built cron-driven admin automation that saved the team 2+ hours per sprint",
    ],
    accent: "rust",
    href: "#",
  },
  {
    id: "stock-bazaar",
    index: "02",
    year: "2025",
    title: "Stock Bazaar",
    client: "Coursework · Distributed Systems",
    role: "Team of 2",
    medium: ["Java", "AWS"],
    summary:
      "A three-microservice distributed trading system with an in-memory LRU cache, leader-based replication, log-based sync, and automatic leader re-election on crash.",
    highlights: [
      "Front-end, catalog, and 3-replica order service, each a Java HTTP microservice",
      "LRU cache in the front-end with push-based invalidation from the catalog service",
      "Leader fans every order out to two followers; replicas resync their log on restart",
      "Automatic leader re-election on crash; deployed and load-tested on AWS EC2",
    ],
    accent: "moss",
    href: "#",
  },
  {
    id: "spam-classifier",
    index: "03",
    year: "2024",
    title: "Spam Classifier",
    client: "Coursework · Machine Learning",
    role: "Sole engineer",
    medium: ["Python", "scikit-learn", "NLP", "TF-IDF"],
    summary:
      "A Multinomial Naive Bayes spam classifier over ~5,000 labeled emails, with a full preprocessing pipeline — tokenization, stop-word removal, TF-IDF vectorization.",
    highlights: [
      "Achieved 94–96% accuracy on the held-out test set",
      "Built the full NLP pipeline from scratch — no pre-trained embeddings",
      "Wrote evaluation harness that printed precision, recall, and confusion matrix",
      "Compared multinomial vs. Bernoulli Naive Bayes; multinomial won by 3 pts",
    ],
    accent: "ink",
    href: "#",
  },
  {
    id: "guest-checkout",
    index: "04",
    year: "2023",
    title: "Guest Checkout",
    client: "Thomson Reuters · Cleardocs",
    role: "Technology Intern",
    medium: ["Java", "Spring", "Full-stack"],
    summary:
      "A guest checkout flow for Cleardocs that let thousands of users complete transactions without creating an account — shipped to production and contributed to platform revenue.",
    highlights: [
      "Shipped to production; first intern project on the team to launch in the same quarter",
      "Traced backend defects through service logs to root cause during dev cycles",
      "Collaborated with senior engineers in code review and Agile sprints",
      "Learned production Git workflows the hard way — by merging the wrong branch once",
    ],
    accent: "clay",
    href: "#",
  },
];

export const experience: ExperienceItem[] = [
  {
    period: "2025 — now",
    role: "MS Computer Science",
    company: "University of Massachusetts Amherst",
    location: "Amherst, MA",
    note: `Coursework in distributed systems, OS, ML, software engineering, and system defense. GPA ${MS_GPA}/4.0.`,
  },
  {
    period: "2023 — 2024",
    role: "Associate Software Engineer",
    company: "Thomson Reuters",
    location: "Ahmedabad, India",
    note: "Backend services on the Cleardocs platform. REST APIs, data persistence, encryption, test coverage, admin automation.",
  },
  {
    period: "2023",
    role: "Technology Intern",
    company: "Thomson Reuters",
    location: "Ahmedabad, India",
    note: "Built and shipped the guest checkout feature. First intern project on the team to launch the same quarter.",
  },
  {
    period: "2019 — 2023",
    role: "BTech Computer Engineering",
    company: "Charotar University",
    location: "Anand, India",
    note: `OOP, data structures, DBMS, advanced web tech, networks, info security, blockchain. GPA ${BTECH_GPA}/4.0.`,
  },
];

export const capabilities: Capability[] = [
  {
    title: "Backend engineering",
    detail:
      "Production Java with Spring & Hibernate. I've shipped 15+ REST APIs, owned data-persistence layers, and written the unit + integration tests that make them safe to refactor at 2 a.m.",
    tags: ["Java", "Spring Boot", "Hibernate", "REST", "JUnit"],
  },
  {
    title: "Distributed systems",
    detail:
      "Built a three-service trading system in Java — an LRU cache in the front-end, a leader that fans every order out to two followers, and automatic re-election when the leader crashes. I think about consistency the way most people think about coffee.",
    tags: ["Java", "REST", "Replication", "Caching", "Fault tolerance"],
  },
  {
    title: "Full-stack development",
    detail:
      "React, Node.js, Express, GraphQL, REST. I've shipped a guest checkout flow end-to-end — frontend, backend, the database row that says 'paid'.",
    tags: ["React", "Node.js", "Express", "GraphQL", "HTML/CSS"],
  },
  {
    title: "Cloud & DevOps",
    detail:
      "AWS, Docker, CI/CD pipelines, Bash. I deploy what I build and I'd rather write a 30-line shell script than click the same button twice.",
    tags: ["AWS", "Docker", "CI/CD", "Bash", "Linux"],
  },
  {
    title: "Machine learning",
    detail:
      "NLP pipelines with scikit-learn — tokenization, TF-IDF, Naive Bayes, model evaluation. I treat ML like any other system: measurable, reproducible, tested.",
    tags: ["Python", "scikit-learn", "NLP", "TF-IDF", "Classification"],
  },
];

export const awards: Award[] = [
  {
    year: "2024",
    name: "Global AI Hackathon — Winner",
    outlet: "Thomson Reuters · led a team of 6",
  },
  
  {
    year: "2023",
    name: "Peer-learning session — Blockchain & Solidity",
    outlet: "30+ junior students taught",
  },
];

export const socials: SocialLink[] = [
  { label: "Email", handle: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", handle: "/in/manan-r-parikh", href: "https://www.linkedin.com/in/manan-r-parikh/" },
  { label: "GitHub", handle: "/MananParikh", href: "https://github.com/MananParikh" },
  { label: "Phone", handle: "+1 (413) 409-9851", href: "tel:+14134099851" },
];

export const nav = [
  { label: "Index", href: "#top", num: "00" },
  { label: "Work", href: "#work", num: "01" },
  { label: "About", href: "#about", num: "02" },
  { label: "Architecture", href: "#architecture", num: "03" },
  { label: "Activity", href: "#activity", num: "04" },
  { label: "Capabilities", href: "#capabilities", num: "05" },
  { label: "Experience", href: "#experience", num: "06" },
  { label: "Recognition", href: "#recognition", num: "07" },
  { label: "Contact", href: "#contact", num: "08" },
] as const;

// ─── Architecture diagram data (Stock Bazaar distributed system) ───

export type ArchNode = {
  id: string;
  label: string;
  sublabel: string;
  x: number; // 0-100 (percent of viewBox width)
  y: number; // 0-100
  role: string;
  tech: string[];
  detail: string;
  metric?: string;
  kind: "client" | "frontend" | "service" | "leader" | "replica" | "cache" | "store";
};

export type ArchEdge = {
  from: string;
  to: string;
  label: string;
  animated?: boolean;
};

export const archNodes: ArchNode[] = [
  {
    id: "clients",
    label: "Clients",
    sublabel: "Concurrent traders",
    x: 50,
    y: 9,
    role: "Load generator + verifier",
    tech: ["Java", "REST"],
    detail:
      "Each client fires a configurable mix of lookups (GET /stocks) and trades (POST /orders) at probability p, storing every successful trade locally. It then re-queries each order via GET /orders/<id> and checks the server's response against its own record. Load-tested with 5 clients × 1000 requests against AWS.",
    metric: "5 × 1000 reqs",
    kind: "client",
  },
  {
    id: "frontend",
    label: "Front-end Service",
    sublabel: "HTTP gateway · port 8080",
    x: 50,
    y: 30,
    role: "Gateway · cache · leader election",
    tech: ["Java", "HttpServer", "LRU"],
    detail:
      "Single entry point for all client requests. On a lookup it checks the LRU cache first, falling back to the catalog. On a trade it forwards to the current order-service leader at /trade. It elects the leader on startup and re-elects on failure.",
    metric: "~58ms lookup",
    kind: "frontend",
  },
  {
    id: "cache",
    label: "LRU Cache",
    sublabel: "In-memory · per-stock lock",
    x: 17,
    y: 52,
    role: "Hot-path read accelerator",
    tech: ["HashMap", "Doubly linked list", "RW lock"],
    detail:
      "LRU cache inside the front-end: a HashMap for O(1) lookup plus a doubly linked list for access order, capacity 5. Invalidation is push-based — the catalog calls /updateCache when a stock is traded, and a per-stock ReentrantReadWriteLock blocks lookups for only that stock while it is dropped.",
    metric: "capacity 5",
    kind: "cache",
  },
  {
    id: "catalog",
    label: "Catalog Service",
    sublabel: "Stock data · invalidation",
    x: 83,
    y: 52,
    role: "Stock data + cache invalidation",
    tech: ["Java", "In-memory"],
    detail:
      "Holds stock data (name, price, quantity) and validates every trade the order service proposes. When it approves a trade it pushes an invalidation to the front-end — GET /updateCache?name=<stock> — so the cache drops the stale entry before the client can read it.",
    metric: "invalidation source",
    kind: "service",
  },
  {
    id: "leader",
    label: "Order Service · Leader",
    sublabel: "Primary · fans out to followers",
    x: 50,
    y: 73,
    role: "Write ordering + replication",
    tech: ["Java", "Order log", "Replication"],
    detail:
      "Receives every trade at POST /trade (which is how a replica knows it is the leader), appends it to its order log, then calls UpdateFollowers() to POST the order to /update on both followers. The highest-ID replica answering /health is elected leader.",
    metric: "leader = highest ID",
    kind: "leader",
  },
  {
    id: "replica1",
    label: "Order Replica 01",
    sublabel: "Follower · log sync",
    x: 27,
    y: 91,
    role: "Hot standby + recovery",
    tech: ["Java", "Log replay"],
    detail:
      "Follower built from the same code and Dockerfile as the leader. Receives replicated orders at POST /update. On restart it calls recoverOrders() — GET /inform?transactionNumber=<last> — to pull every order it missed from the leader and replay them into its log.",
    metric: "log sync",
    kind: "replica",
  },
  {
    id: "replica2",
    label: "Order Replica 02",
    sublabel: "Follower · log sync",
    x: 73,
    y: 91,
    role: "Hot standby + failover",
    tech: ["Java", "Log replay"],
    detail:
      "Identical follower. If the leader crashes, the front-end catches the failed connection (30ms timeout), re-elects the highest-ID replica still answering /health, and retries the request against the new leader — so the client only sees a slightly slower call, never an error.",
    metric: "30ms failover",
    kind: "replica",
  },
];

export const archEdges: ArchEdge[] = [
  { from: "clients", to: "frontend", label: "orders", animated: true },
  { from: "frontend", to: "cache", label: "read", animated: true },
  { from: "frontend", to: "catalog", label: "lookup", animated: true },
  { from: "frontend", to: "leader", label: "trade", animated: true },
  { from: "leader", to: "replica1", label: "update", animated: true },
  { from: "leader", to: "replica2", label: "update", animated: true },
  { from: "catalog", to: "cache", label: "invalidate", animated: false },
];

// ─── Contribution graph data ───

export type ContributionWeek = {
  // 7 days, each 0-4 intensity level
  days: (0 | 1 | 2 | 3 | 4)[];
};

// 52 weeks of representative activity
// Pattern: ramping up during coursework (2025), heavy during Thomson Reuters (2023-24), lighter during transition
export const contributionWeeks: ContributionWeek[] = [
  // Weeks 1-8: Early MS coursework (moderate)
  { days: [1, 2, 1, 0, 2, 1, 0] }, { days: [0, 2, 3, 2, 1, 0, 1] }, { days: [2, 1, 0, 2, 3, 2, 0] }, { days: [1, 0, 2, 1, 2, 1, 0] },
  { days: [3, 2, 1, 2, 0, 1, 2] }, { days: [1, 2, 0, 3, 2, 1, 0] }, { days: [0, 1, 2, 1, 2, 3, 1] }, { days: [2, 1, 2, 0, 1, 2, 1] },
  // Weeks 9-16: Distributed systems course (heavy)
  { days: [3, 4, 3, 4, 2, 3, 2] }, { days: [4, 3, 4, 3, 4, 2, 3] }, { days: [3, 4, 2, 4, 3, 4, 3] }, { days: [4, 3, 4, 4, 3, 4, 2] },
  { days: [3, 4, 4, 3, 4, 3, 4] }, { days: [4, 4, 3, 4, 4, 3, 4] }, { days: [3, 4, 4, 4, 3, 4, 4] }, { days: [4, 3, 4, 4, 4, 3, 4] },
  // Weeks 17-24: Stock Bazaar project (peak)
  { days: [4, 4, 4, 4, 4, 3, 4] }, { days: [4, 4, 3, 4, 4, 4, 4] }, { days: [4, 4, 4, 4, 4, 4, 3] }, { days: [4, 3, 4, 4, 4, 4, 4] },
  { days: [4, 4, 4, 4, 3, 4, 4] }, { days: [3, 4, 4, 4, 4, 4, 4] }, { days: [4, 4, 3, 4, 4, 4, 4] }, { days: [4, 4, 4, 4, 4, 3, 4] },
  // Weeks 25-32: ML coursework (moderate-heavy)
  { days: [3, 3, 4, 2, 3, 4, 2] }, { days: [2, 4, 3, 3, 4, 2, 3] }, { days: [3, 2, 4, 3, 3, 4, 3] }, { days: [4, 3, 3, 4, 2, 3, 4] },
  { days: [3, 4, 2, 3, 4, 3, 3] }, { days: [2, 3, 4, 3, 3, 4, 2] }, { days: [3, 3, 4, 2, 3, 3, 4] }, { days: [4, 2, 3, 3, 4, 3, 3] },
  // Weeks 33-40: Transition / lighter
  { days: [1, 2, 1, 0, 2, 1, 0] }, { days: [0, 1, 2, 1, 0, 2, 1] }, { days: [2, 0, 1, 2, 1, 0, 1] }, { days: [1, 2, 0, 1, 2, 1, 0] },
  { days: [0, 1, 2, 0, 1, 2, 1] }, { days: [1, 0, 2, 1, 0, 1, 2] }, { days: [2, 1, 0, 2, 1, 0, 1] }, { days: [0, 2, 1, 0, 1, 2, 0] },
  // Weeks 41-48: Thomson Reuters wind-down + new prep
  { days: [2, 3, 2, 1, 3, 2, 1] }, { days: [1, 2, 3, 2, 1, 2, 3] }, { days: [3, 2, 1, 3, 2, 1, 2] }, { days: [2, 1, 3, 2, 3, 1, 2] },
  { days: [1, 3, 2, 1, 2, 3, 2] }, { days: [3, 1, 2, 3, 2, 1, 3] }, { days: [2, 3, 1, 2, 3, 2, 1] }, { days: [1, 2, 3, 1, 2, 3, 2] },
  // Weeks 49-52: Recent
  { days: [2, 1, 2, 3, 2, 1, 2] }, { days: [3, 2, 1, 2, 3, 2, 1] }, { days: [1, 2, 3, 2, 1, 3, 2] }, { days: [2, 3, 2, 1, 2, 3, 2] },
];

export const contributionStats = {
  total: 1287,
  streak: 47,
  bestDay: 24,
  longestStreak: 89,
};

// ─── Skill proficiency data ───

export type SkillProficiency = {
  skill: string;
  level: number; // 0-100
  years: number;
  detail: string;
  tags: string[];
};

export const skillProficiencies: SkillProficiency[] = [
  {
    skill: "Backend Engineering",
    level: 92,
    years: 4,
    detail:
      "Production Java at Thomson Reuters — 15+ REST APIs, 1M+ records encrypted, 90-95% test coverage. Spring & Hibernate are muscle memory.",
    tags: ["Java", "Spring", "Hibernate", "REST", "JUnit"],
  },
  {
    skill: "Distributed Systems",
    level: 85,
    years: 3,
    detail:
      "Built a 3-service trading system in Java with leader-based replication, log sync, and automatic re-election. Push-based cache invalidation driven by the catalog service.",
    tags: ["Java", "Replication", "Caching", "Fault tolerance"],
  },
  {
    skill: "Full-stack Development",
    level: 80,
    years: 4,
    detail:
      "React, Node.js, Express, GraphQL. Shipped the guest checkout flow at Thomson Reuters end-to-end — frontend, backend, and the database row that says 'paid'.",
    tags: ["React", "Node.js", "Express", "GraphQL"],
  },
  {
    skill: "Cloud & DevOps",
    level: 78,
    years: 3,
    detail:
      "AWS, Docker, CI/CD pipelines, Bash. Deployed Stock Bazaar on AWS. I'd rather write a 30-line shell script than click the same button twice.",
    tags: ["AWS", "Docker", "CI/CD", "Bash", "Linux"],
  },
  {
    skill: "Machine Learning",
    level: 72,
    years: 2,
    detail:
      "NLP pipelines with scikit-learn — tokenization, TF-IDF, Naive Bayes, model evaluation. 94-96% accuracy on the spam classifier. Treats ML like any system: measurable, reproducible, tested.",
    tags: ["Python", "scikit-learn", "NLP", "TF-IDF"],
  },
  {
    skill: "Systems Programming",
    level: 70,
    years: 2,
    detail:
      "C++ for the distributed trading system — sockets, thread pools, manual memory management. Coursework in OS and system defense rounding it out.",
    tags: ["C++", "Sockets", "Threading", "Memory"],
  },
];

