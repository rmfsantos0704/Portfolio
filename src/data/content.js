export const profile = {
  firstName: "Russel",
  lastName: "Santos",
  tagline:
    "A Full-Stack Developer specializing in the traditional Laravel Blade stack, creating robust applications with hardware-level precision.",
  github: "https://github.com/rmfsantos0704",
  linkedin: "https://www.linkedin.com/in/russel-santos-36720b3a3/",
  email: "santosrussel0704@gmail.com",
  phone: "0945 119 1938",
};

export const skills = [
  {
    id: "laravel",
    title: "Laravel & Blade",
    
    description:
      "Mastery in server-side rendering, Eloquent ORM, and complex component architecture.",
    accent: "bg-indigo-500/20 text-indigo-300",
  },
  {
    id: "tailwind",
    title: "Tailwind CSS",
    description:
      "Building modern, responsive design systems using utility-first CSS-v4 standards.",
    accent: "bg-slate-200/10 text-slate-100",
  },
  {
    id: "mysql",
    title: "MySQL",
    description:
      "Expert database schema design, optimization, and complex relational management.",
    accent: "bg-violet-500/20 text-violet-300",
  },
  {
    id: "nfc",
    title: "NFC & Reverb",
    description:
      "Bridging web apps with Python and real-time communication.",
    accent: "bg-purple-500/20 text-purple-300",
  },
  {
    id: "reactNative",
    title: "Expo & React Native",
    description:
      "Developed cross-platform mobile experiences with Expo and React Native, creating performant UI and native app behavior from a single codebase.",
    accent: "bg-indigo-500/20 text-indigo-300",
  },
  {
    id: "mern",
    title: "MERN Stack",
    description:
      "Set up and scaled a full MERN ecosystem using MongoDB, Express, React, and Node.js to power robust web and mobile backend services.",
    accent: "bg-violet-500/20 text-violet-300",
  },
  {
    id: "htmlCss",
    title: "HTML & CSS",
    description: "Certified in building responsive, accessible, and structured web interfaces using semantic HTML5 and modern CSS techniques.",
    accent: "bg-orange-500/10 text-orange-400",
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "Certified in developing dynamic, interactive web applications and scripts to manage DOM manipulation and state.",
    accent: "bg-yellow-500/10 text-yellow-400",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Trained in fundamental security principles, threat mitigation, safe computing practices, and digital protection.",
    accent: "bg-blue-500/10 text-blue-400",
  },
  {
    id: "excel",
    title: "Microsoft Excel",
    description: "Microsoft Associate certified in data analysis, spreadsheet modeling, and advanced formula creation.",
    accent: "bg-green-600/10 text-green-500",
  },
  {
    id: "word",
    title: "Microsoft Word",
    description: "Microsoft Associate certified in advanced document formatting, styling, and professional documentation.",
    accent: "bg-blue-600/10 text-blue-500",
  },
  {
    id: "powerpoint",
    title: "Microsoft PowerPoint",
    description: "Microsoft Associate certified in designing compelling presentations with engaging visual elements and animations.",
    accent: "bg-orange-600/10 text-orange-500",
  },
  {
    id: "loxCli",
    title: "CLI & Local AI Engineering",
    description: "Engineered LOX, an autonomous VS Code CLI tool that orchestrates local LLMs (Ollama) with optimized diff statistics, deterministic regex guards, and domain-aware file grouping to automate and enforce strict atomic Conventional Commits.",
    accent: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  },
];

export const projects = [
  {
    id: "bataeno-pass",
    label: "DIGITAL ID INTEGRATION",
    labelColor: "text-violet-300",
    badgeColor: "bg-violet-500/10 border-violet-400/30",
    title: "Bataeno Pass",
    deviceType: "desktop",
    // Placeholder path — drop the actual Bataeño Pass logo file at this location in /public.
    logo: "/logos/bataeno-pass.png",
    theme: {
      accent: "#2457f5",
      secondary: "#12b8d4",
      highlight: "#a4e900",
      title: "#a4e900",
      titleOnDark: "#a4e900",
      surface: "#071b70",
      backdrop: "#06113f",
      pageBackground: "#050d2d",
      pageSurface: "#0b1d5a",
      pageText: "#f7fbff",
      pageMuted: "#b8c9ee",
    },
    description:
      "Bridging the gap between software and physical IDs. Implemented OAuth 2.0 and custom Python NFC reader bridges for local government efficiency.",
    watermark: "NFC",
    gradient: "from-slate-800 via-slate-900 to-slate-950",
    challenge:
      "The local government needed a way to verify physical resident IDs instantly without manual data entry or slow database queries.",
    solution:
      "Engineered a custom Python script to act as a bridge between physical USB NFC readers and a Laravel backend. Used Laravel Reverb to broadcast the scan data to the web interface in real-time.",
    techStack: ["Laravel Reverb", "Python", "OAuth 2.0", "WebSockets"],
    // Add your screenshot URLs here, in the order you want them to appear in the slideshow.

      screenshots: [
  "/BataenoPass/Screenshot 2026-04-03 094810.png",
  "/BataenoPass/Screenshot 2026-04-03 094357.png",
  "/BataenoPass/Screenshot 2026-04-03 092435.png",
  "/BataenoPass/Screenshot 2026-04-03 092417.png",
  "/BataenoPass/Screenshot 2026-04-03 092239.png",
  "/BataenoPass/Screenshot 2026-04-03 091859.png",
],
  },
  {
    id: "snowed",
    label: "MOBILE APP \u2022 PLANNER",
    labelColor: "text-purple-300",
    badgeColor: "bg-purple-500/10 border-purple-400/30",
    title: "SnowEd",
    deviceType: "mobile",
    // Placeholder path — drop the SnowEd app icon file at this location in /public.
    logo: "/logos/snowed.png",
theme: {
      accent: "#3d91d8",
      secondary: "#0b4e86",
      highlight: "#98FCFC", // Warm amber/gold for contrast (or use #00b4d8 for bright cyan)
      title: "#0b4e86",
      titleOnDark: "#98FCFC",
      surface: "#eaf4ff",
      backdrop: "#d9eaff",
      pageBackground: "#d9eaff",
      pageSurface: "#f5faff",
      pageText: "#0b4e86",
      pageMuted: "#477da6",
    },
    link: "https://snowed-landing.vercel.app/",
    // Placeholder — replace with the real GitHub repo once you're ready to link it.
    repo: "https://github.com/rmfsantos0704/nurse-scheduler-app",
    description:
      "A mobile scheduler and note-taking app for students. It helps users track courses, deadlines, and completion status while keeping note-taking photo-first.",
    watermark: "SNOW",
    gradient: "from-purple-900 via-violet-900 to-slate-950",
    challenge:
      "Students needed a single place to track coursework, deadlines, and lecture notes without juggling multiple disconnected apps.",
    solution:
      "Built a mobile scheduler with a photo-first notes system, letting students snap and organize notes alongside a calendar view of classes, deadlines, and completion status.",
    techStack: ["React Native", "Firebase", "Expo", "Push Notifications"],
    // Add your screenshot URLs here, in the order you want them to appear in the slideshow.
      screenshots: [
  "/SnowEd/calendar.jpeg",
  "/SnowEd/Courses.jpeg",
  "/SnowEd/Notes.jpeg",
  "/SnowEd/Reminders.jpeg",
  "/SnowEd/research.jpeg",
  "/SnowEd/today.jpeg",
],
  },
  {
    id: "tatai",
    label: "QUALITY ASSURANCE \u2022 NLP ASSISTANT",
    labelColor: "text-indigo-300",
    badgeColor: "bg-indigo-500/10 border-indigo-400/30",
    title: "TatAI",
    deviceType: "desktop",
    // Placeholder path — drop the TatAI icon file at this location in /public.
    logo: "/logos/tatai.png",
    theme: {
      accent: "#0758df",
      secondary: "#24c768",
      highlight: "#f2f2ed",
      title: "#0758df",
      titleOnDark: "#f2f2ed",
      surface: "#f4f4f1",
      backdrop: "#e5e5df",
      pageBackground: "#e5e5df",
      pageSurface: "#f8f8f4",
      pageText: "#17212b",
      pageMuted: "#53616b",
    },
    description:
      "An intelligent home assistant powered by Natural Language Processing (NLP) and a rule-based algorithm. I served as QA, testing the assistant's responses and behavior rather than writing its core code.",
    // Placeholder — since your role here was QA rather than development, double-check
    // this points to something appropriate to share (e.g. your test docs), or remove it.
    repo: "https://github.com/SubiCodes/TatAI",
    watermark: "QA",
    gradient: "from-indigo-950 via-violet-950 to-slate-950",
    challenge:
      "As an NLP-driven home assistant, TatAI needed to reliably interpret varied phrasing and edge-case commands without breaking or misfiring rule-based responses.",
    solution:
      "Acted as Quality Assurance for the project — designing test cases, running functional and regression testing on NLP command handling, and reporting bugs and inconsistent behavior back to the development team.",
    techStack: ["Manual QA", "Test Case Design", "NLP Testing", "Bug Tracking"],
    // Add your screenshot URLs here once uploaded, in the order you want them to appear in the slideshow.
    screenshots: [
      "/TatAI/screenshot-1.png",
      "/TatAI/screenshot-2.png",
      "/TatAI/screenshot-3.png",
      "/TatAI/screenshot-4.png",
      "/TatAI/screenshot-5.png",
      "/TatAI/screenshot-6.png",
      "/TatAI/screenshot-7.png",
    ],
  },
  {
    id: "booknight",
    label: "FULL-STACK \u2022 BOOKMARK MANAGER",
    labelColor: "text-emerald-300",
    badgeColor: "bg-emerald-500/10 border-emerald-400/30",
    title: "Booknight",
    deviceType: "desktop",
    // Placeholder path — drop the Booknight logo file at this location in /public.
    logo: "/logos/booknight.png",
    // Deep-green accent + warm paper-toned surfaces, matching Booknight's actual design system
    // (dark sidebar, warm paper cards, single deep-green accent, editorial serif + grotesque sans).
    theme: {
      accent: "#1f6f4a",
      secondary: "#2f8f63",
      highlight: "#f0e6d2",
      title: "#1f6f4a",
      titleOnDark: "#f0e6d2",
      surface: "#16211c",
      backdrop: "#0c1310",
      pageBackground: "#10160f",
      pageSurface: "#f3e8d3",
      pageText: "#f3ecd9",
      pageMuted: "#a89a7c",
    },
    description:
      "A social bookmark and link-curation platform with automated metadata enrichment, fuzzy search, team digests, and a companion browser extension.",
    // Placeholders — replace with the real deployed URL and GitHub repo once ready.
    link: "https://booknight-rmfs.vercel.app/board",
    repo: "https://github.com/rmfsantos0704/BookNight",
    watermark: "BOOK",
    gradient: "from-emerald-950 via-stone-950 to-slate-950",
    challenge:
      "Newly-saved bookmarks needed their metadata scraped and digest subscriptions checked on a schedule — classic background-job territory. A persistent BullMQ/Redis worker process was the first approach, but free-tier hosting for an always-on worker proved fragile: platforms either charge for genuine background-worker hosting, or cap free-tier uptime in a way a 24/7 process burns through almost immediately.",
    solution:
      "Retired the persistent worker entirely in favor of short-lived, HTTP-triggered processing. A free external scheduler calls a secret-protected endpoint every few minutes; that endpoint atomically claims a batch of pending bookmarks (preventing double-processing from overlapping triggers), scrapes them, and returns. No always-on server, no credit card in the stack — near-instant processing traded for reliable, sustainable \"within a few minutes\" processing on free tiers alone.",
    techStack: ["React (Vite) & Tailwind", "Node.js & Express", "MongoDB Atlas Search", "Chrome Extension (Manifest V3)"],
    // Add your screenshot URLs here once uploaded, in the order you want them to appear in the slideshow.
    screenshots: [
      "/Booknight/Screenshot-1.png",
      "/Booknight/Screenshot-2.png",
            "/Booknight/Screenshot-3.png",
      "/Booknight/Screenshot-4.png",
            "/Booknight/Screenshot-5.png",
      "/Booknight/Screenshot-6.png",
    ],
  },

    {
    id: "lox-cli",
    label: "CLI TOOL \u2022 AI GIT COMMITS",
    labelColor: "text-orange-300",
    badgeColor: "bg-orange-500/10 border-orange-400/30",
    title: "LOX",
    deviceType: "desktop",
    logo: "/logos/lox.png",
    // Placeholder path — drop the LOX logo/icon file at this location in /public.
    logo: "/logos/lox-cli.png",
    theme: {
      accent: "#f97316",
      secondary: "#c2410c",
      highlight: "#fb923c",
      title: "#fb923c",
      titleOnDark: "#fb923c",
      surface: "#1a0f08",
      backdrop: "#120a05",
      pageBackground: "#120a05",
      pageSurface: "#1f130b",
      pageText: "#fff3ea",
      pageMuted: "#c9a186",
    },
    repo: "https://github.com/rmfsantos0704/lox-cli",
    description:
      "An autonomous CLI tool that reads your git diff, groups unrelated changes, and writes strict, granular Conventional Commits using a 100% free local AI model — no API keys, no cost, no rate limits.",
    watermark: "LOX",
   gradient: "from-orange-950 via-stone-950 to-black",
    challenge:
      "Developers often bundle unrelated changes — a bug fix, a doc tweak, a new feature — into a single vague commit message, making history hard to read and bisect later.",
    solution:
      "Built a Node.js CLI that parses `git status`/`git diff` output, categorizes files into commit types (feat, fix, docs, refactor, test, chore, style) using path rules, status flags, and a regex comment interceptor, then sends each diff to a local Ollama model with Few-Shot prompting to generate clean, imperative commit descriptions. Each group is staged and committed independently in one run, with interactive file filtering, a workspace status preview, a semantic-versioning release helper, and automated changelog generation layered on top.",
    techStack: ["Node.js", "Ollama (Local AI)", "Inquirer.js", "Git CLI", "Few-Shot Prompting"],
    sdlc: [
      { phase: "Planning", description: "Scoped the problem of mixed, vague commits and defined a feature set: multi-commit grouping, local AI descriptions, versioning, and changelog automation, with zero paid dependencies." },
      { phase: "Design", description: "Designed the file-categorization rules (path/status/diff heuristics) and the Few-Shot prompt templates that keep local AI output focused on imperative, hallucination-free summaries." },
      { phase: "Development", description: "Built the CLI commands (commit, status, log, release, changelog, config) around Git plumbing commands and a local Ollama integration, with `.loxrc.json` for per-project configuration." },
      { phase: "Testing", description: "Tested categorization accuracy across mixed-change scenarios, verified interactive prompts and pre-commit safety checks, and validated semantic version bumps against real commit histories." },
      { phase: "Deployment & Maintenance", description: "Published via npm link for global CLI installation, with ongoing refinement of prompt accuracy and model support based on usage feedback." },
    ],
    // Add your screenshot URLs here once you upload them, in the order you want them to appear in the slideshow.
    screenshots: [
      "/lox-cli/Screenshot-1.png",
      "/lox-cli/Screenshot-2.png",
      "/lox-cli/Screenshot-3.png",
      "/lox-cli/Screenshot-4.png",
      "/lox-cli/Screenshot-5.png",
      "/lox-cli/Screenshot-6.png",
      "/lox-cli/Screenshot-7.png",
      "/lox-cli/Screenshot-8.png",
    ],
  },
];

// Screenshots of your certificates, served from public/Certificates.
// Add or remove entries here — the Certificates section renders whatever is in this array.
export const certificates = [
  { 
    file: "Screenshot 2026-09-04 130223.png", 
    title: "PowerPoint Associate", 
    issuer: "Microsoft", 
    dateIssued: "October 18, 2025" 
  },
  { 
    file: "Screenshot 2026-09-04 130228.png", 
    title: "Microsoft Office Specialist", 
    issuer: "Microsoft", 
    dateIssued: "November 6, 2025" 
  },
  { 
    file: "Screenshot 2026-09-04 130232.png", 
    title: "Excel Associate", 
    issuer: "Microsoft", 
    dateIssued: "November 6, 2025" 
  },
  { 
    file: "Screenshot 2026-09-04 130238.png", 
    title: "Word Associate", 
    issuer: "Microsoft", 
    dateIssued: "September 20, 2025" 
  },
  { 
    file: "Screenshot 2026-09-04 130306.png", 
    title: "IC3 GS6 LEVEL 1", 
    issuer: "Certiport", 
    dateIssued: "May 27, 2024" 
  },
  { 
    file: "Screenshot 2026-09-04 130314.png", 
    title: "HTML5 Application Development", 
    issuer: "Certiport", 
    dateIssued: "April 16, 2026" 
  },
  { 
    file: "Screenshot 2026-09-04 130322.png", 
    title: "JavaScript", 
    issuer: "Certiport", 
    dateIssued: "April 16, 2026" 
  },
  { 
    file: "Screenshot 2026-09-04 130451.png", 
    title: "Cybersecurity", 
    issuer: "Certiport", 
    dateIssued: "May 3, 2025" 
  },
  { 
    file: "Screenshot 2026-09-04 130507.png", 
    title: "HTML and CSS", 
    issuer: "Certiport", 
    dateIssued: "December 14, 2024" 
  },
  { 
    file: "Screenshot 2026-09-04 130515.png", 
    title: "Software Development", 
    issuer: "Certiport", 
    dateIssued: "December 7, 2024" 
  },
].map((c) => ({ ...c, src: `/Certificates/${c.file}` }));

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Projects", href: "/projects" },
];