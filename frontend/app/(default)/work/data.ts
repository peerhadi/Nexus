export type WorkProjectId =
  "the-prism" | "obsidian" | "dps-campus-event-notifier" | "nexus-game-engine";

export type WorkProject = {
  id: WorkProjectId;
  title: string;
  category: string;
  status: string;
  tagline: string;
  description: string;
  overview: string;
  repository: string | null;
  website: string | null;
  gradient: string;
  accentGradient: string;
  visual: "prism" | "obsidian" | "notifier" | "engine";
  heroEyebrow: string;
  heroStatement: string;
  projectType: string;
  focusAreas: string[];
  technologies: {
    name: string;
    role: string;
    verified: boolean;
  }[];
  capabilities: {
    number: string;
    title: string;
    description: string;
    detail: string;
    icon: string;
  }[];
  workflow: {
    number: string;
    title: string;
    description: string;
    output: string;
  }[];
  deepDive: {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
  }[];
  principles: {
    title: string;
    description: string;
  }[];
  showcase: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
  };
  challenges: {
    title: string;
    problem: string;
    approach: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  galleryLabels: string[];
  nextProjectText: string;
};

export const workProjects: WorkProject[] = [
  {
    id: "the-prism",
    title: "The Prism",
    category: "Content discovery",
    status: "Project",
    tagline: "See the story from more than one angle.",
    description:
      "An RSS-powered content discovery project exploring AI-assisted classification, organized reading, and the different perspectives surrounding a story.",
    overview:
      "The Prism explores a more intentional way to discover and understand content. Instead of treating a stream of articles as an endless list, the idea is to make incoming information easier to classify, browse, and approach from different angles.",
    repository: "https://github.com/peerhadi/The-Prism",
    website: null,
    gradient: "var(--gradient-cyan-violet)",
    accentGradient: "var(--gradient-violet-pink)",
    visual: "prism",
    heroEyebrow: "A different perspective on information",
    heroStatement:
      "Information is everywhere. Understanding it is the real interface.",
    projectType: "Content discovery and reading experience",
    focusAreas: [
      "RSS-based content",
      "AI-assisted classification",
      "Content discovery",
      "Multiple perspectives",
      "Information organization",
      "Reading experience",
    ],
    technologies: [
      {
        name: "RSS",
        role: "A foundation for collecting content from feeds.",
        verified: true,
      },
      {
        name: "AI-assisted classification",
        role: "A project focus for organizing incoming information.",
        verified: true,
      },
      {
        name: "Content discovery",
        role: "The central product experience.",
        verified: true,
      },
      {
        name: "Perspective-based exploration",
        role: "A product direction represented in this case study.",
        verified: true,
      },
    ],
    capabilities: [
      {
        number: "01",
        title: "Bring content together",
        description:
          "RSS provides a structured starting point for collecting articles from different sources.",
        detail:
          "The discovery experience begins with incoming content rather than a blank search box. Sources become part of a broader reading environment.",
        icon: "feeds",
      },
      {
        number: "02",
        title: "Make information easier to navigate",
        description:
          "Classification provides a way to move beyond a single undifferentiated stream.",
        detail:
          "Organizing content helps readers move between subjects and find a useful starting point when the amount of information grows.",
        icon: "classify",
      },
      {
        number: "03",
        title: "Explore different angles",
        description:
          "The Prism's concept emphasizes that a story can be approached from more than one perspective.",
        detail:
          "The interface direction encourages exploration instead of presenting the first result as the only relevant result.",
        icon: "perspectives",
      },
      {
        number: "04",
        title: "Keep discovery readable",
        description:
          "The product experience is centered on helping people navigate information without unnecessary friction.",
        detail:
          "Content structure, hierarchy, and clear entry points are part of the experience—not decoration added after the core idea.",
        icon: "reading",
      },
    ],
    workflow: [
      {
        number: "01",
        title: "Collect",
        description: "Start with content published through RSS feeds.",
        output: "Incoming articles",
      },
      {
        number: "02",
        title: "Classify",
        description: "Use AI-assisted classification as an organizing layer.",
        output: "More structured content",
      },
      {
        number: "03",
        title: "Discover",
        description:
          "Give readers ways to browse and explore what is relevant.",
        output: "A navigable reading experience",
      },
      {
        number: "04",
        title: "Compare perspectives",
        description:
          "Encourage exploration of a subject beyond a single content entry point.",
        output: "A broader view of a topic",
      },
    ],
    deepDive: [
      {
        eyebrow: "01 / The problem space",
        title: "A feed is not the same thing as understanding.",
        description:
          "Feeds are useful for bringing updates into one place. But collecting more content does not automatically make that content easier to navigate or understand.",
        bullets: [
          "A growing list can become harder to browse.",
          "Related content can be difficult to discover when everything looks equally important.",
          "Readers need useful ways to move between subjects and sources.",
          "A good discovery interface should help people explore, not merely scroll.",
        ],
      },
      {
        eyebrow: "02 / The product direction",
        title: "Turn a stream into an experience.",
        description:
          "The Prism's direction combines content collection, AI-assisted classification, and a reading experience designed around discovery.",
        bullets: [
          "Use RSS as a content input.",
          "Treat classification as an organizational aid.",
          "Make navigation and hierarchy central to the interface.",
          "Keep multiple perspectives part of the discovery concept.",
        ],
      },
      {
        eyebrow: "03 / The design challenge",
        title: "Give complex information room to breathe.",
        description:
          "A content-heavy product needs enough information to be useful without turning every screen into a wall of cards, labels, and controls.",
        bullets: [
          "Create clear visual differences between content and navigation.",
          "Make categories recognizable at a glance.",
          "Use motion to direct attention rather than distract from reading.",
          "Keep the underlying content more important than the interface effects.",
        ],
      },
    ],
    principles: [
      {
        title: "Discovery before decoration",
        description:
          "Visual effects should make the information easier to explore, not compete with the content.",
      },
      {
        title: "Structure beats clutter",
        description:
          "Classification and hierarchy give readers a clearer way to move through incoming information.",
      },
      {
        title: "More than one angle",
        description:
          "The product concept values broader exploration instead of reducing a topic to a single entry point.",
      },
      {
        title: "Readable by design",
        description:
          "Typography, spacing, and content grouping should support the act of reading.",
      },
    ],
    showcase: {
      eyebrow: "Interactive concept",
      title: "A reading interface with room to explore.",
      description:
        "This animated showcase demonstrates the content-discovery direction: source cards, topic groupings, and perspective-oriented browsing in one visual environment.",
      note: "The sample headlines and interface content shown here are illustrative. They are not presented as live articles or a live feed from the repository.",
    },
    challenges: [
      {
        title: "Organizing incoming information",
        problem:
          "Content from different sources can arrive in different formats and cover very different subjects.",
        approach:
          "Use the idea of classification and clear content grouping to make browsing more intentional.",
      },
      {
        title: "Keeping discovery approachable",
        problem:
          "Adding more filters and controls can make a reading product feel harder to use.",
        approach:
          "Give the interface a clear hierarchy and make the main paths through content easy to recognize.",
      },
      {
        title: "Showing perspective without overwhelming readers",
        problem:
          "A product about multiple perspectives can become visually noisy if every angle competes for attention.",
        approach:
          "Use focused visual groupings and progressive exploration rather than showing everything at once.",
      },
    ],
    faqs: [
      {
        question: "What is The Prism?",
        answer:
          "The Prism is an RSS-based content discovery project focused on AI-assisted classification, organized information, and exploring different perspectives.",
      },
      {
        question: "What does RSS contribute?",
        answer:
          "RSS provides a way to collect published content from feeds, giving the discovery experience a structured content input.",
      },
      {
        question: "What is AI-assisted classification for?",
        answer:
          "It is an organizing concept in the project: helping incoming content become easier to navigate and discover.",
      },
      {
        question: "Can I inspect the project?",
        answer:
          "Yes. The project has a public GitHub repository linked on this page.",
      },
    ],
    galleryLabels: [
      "Content discovery",
      "Feed organization",
      "Topic exploration",
      "Perspective-driven browsing",
    ],
    nextProjectText:
      "From discovering information to organizing the work behind it.",
  },
  {
    id: "obsidian",
    title: "Obsidian",
    category: "Browser extension",
    status: "Project",
    tagline: "Keep project context closer to the work.",
    description:
      "A browser-extension project exploring an Obsidian-like approach to project organization, with a focus on keeping useful context and work references close at hand.",
    overview:
      "Obsidian explores the idea of bringing project-oriented organization into the browser. Rather than treating browsing and project context as completely separate activities, the concept focuses on a compact workspace for keeping related information together.",
    repository: "https://github.com/peerhadi/Nexus-Engine",
    website: null,
    gradient: "var(--gradient-violet-pink)",
    accentGradient: "var(--gradient-cyan-violet)",
    visual: "obsidian",
    heroEyebrow: "A workspace that stays close",
    heroStatement:
      "Your browser is where work happens. Your context should not disappear into it.",
    projectType: "Browser extension and project organization",
    focusAreas: [
      "Browser extension",
      "Project organization",
      "Context management",
      "Compact workspace",
      "Information retrieval",
      "Workflow continuity",
    ],
    technologies: [
      {
        name: "Browser extension",
        role: "The project's known delivery format.",
        verified: true,
      },
      {
        name: "Project organization",
        role: "The central product direction.",
        verified: true,
      },
      {
        name: "Context management",
        role: "A design focus explored by the concept.",
        verified: true,
      },
      {
        name: "Workspace interface",
        role: "An illustrative interface direction for this case study.",
        verified: false,
      },
    ],
    capabilities: [
      {
        number: "01",
        title: "Keep project context together",
        description:
          "Explore a workspace where related notes, references, and project details can sit close together.",
        detail:
          "The central idea is to reduce the distance between the page someone is working on and the context they need to remember.",
        icon: "workspace",
      },
      {
        number: "02",
        title: "Work from the browser",
        description:
          "A browser extension gives the concept a natural place alongside everyday browsing.",
        detail:
          "Instead of requiring a completely separate full-screen environment, the extension format suggests a compact, nearby workspace.",
        icon: "browser",
      },
      {
        number: "03",
        title: "Organize around projects",
        description:
          "Use projects as a way to group information by what it belongs to, not only where it came from.",
        detail:
          "A project-oriented view can give related material a shared home and make the context behind a task easier to follow.",
        icon: "projects",
      },
      {
        number: "04",
        title: "Reduce context switching",
        description:
          "Keep useful information within reach while moving between browser pages and tasks.",
        detail:
          "The design goal is continuity: make it easier to reconnect with the work instead of repeatedly reconstructing its context.",
        icon: "focus",
      },
    ],
    workflow: [
      {
        number: "01",
        title: "Browse",
        description:
          "Start with the browser as the environment where the work is happening.",
        output: "Current browsing context",
      },
      {
        number: "02",
        title: "Connect",
        description: "Relate useful information to a project or work area.",
        output: "Project-related context",
      },
      {
        number: "03",
        title: "Organize",
        description:
          "Keep references and project information in a more deliberate structure.",
        output: "A more coherent workspace",
      },
      {
        number: "04",
        title: "Return",
        description:
          "Make it easier to pick up the thread when returning to the work.",
        output: "Less context to reconstruct",
      },
    ],
    deepDive: [
      {
        eyebrow: "01 / The idea",
        title: "A small workspace can have a big job.",
        description:
          "Browser extensions occupy a constrained space. That makes clarity and prioritization especially important: the interface should help without taking over the page.",
        bullets: [
          "Treat the browser as the primary working environment.",
          "Keep project context organized around meaningful groups.",
          "Make important information recognizable in a compact interface.",
          "Avoid turning a small extension panel into a crowded dashboard.",
        ],
      },
      {
        eyebrow: "02 / The experience",
        title: "Keep the connection between a page and a project.",
        description:
          "The project explores a closer relationship between browsing, references, and project context. The goal is a more continuous workflow, not another destination that needs constant attention.",
        bullets: [
          "Make the project the organizing unit.",
          "Keep context visually distinct from controls.",
          "Favor quick orientation over unnecessary complexity.",
          "Design for returning to work after interruptions.",
        ],
      },
      {
        eyebrow: "03 / The constraint",
        title: "Useful information, limited space.",
        description:
          "An extension cannot assume that it has an entire monitor to itself. Its interface needs to communicate structure quickly and make efficient use of the available space.",
        bullets: [
          "Use compact information groups.",
          "Establish a clear order of importance.",
          "Make navigation predictable.",
          "Let the surrounding browser remain the main workspace.",
        ],
      },
    ],
    principles: [
      {
        title: "Context stays close",
        description:
          "The project explores bringing relevant project information closer to the browser workflow.",
      },
      {
        title: "Projects are the organizing unit",
        description:
          "Related information should be understandable in relation to the work it supports.",
      },
      {
        title: "Compact, not cramped",
        description:
          "A small interface still needs readable hierarchy and intentional spacing.",
      },
      {
        title: "Continuity over interruption",
        description:
          "The experience should help someone resume work rather than create another task to manage.",
      },
    ],
    showcase: {
      eyebrow: "Interface concept",
      title: "A project workspace, right beside the page.",
      description:
        "Explore an illustrative extension panel with project navigation, references, and a compact workspace. It demonstrates the intended product direction rather than claiming to be a screenshot of a shipped build.",
      note: "The workspace entries and controls shown here are illustrative interface content. No public repository or verified live demo is currently linked for this project.",
    },
    challenges: [
      {
        title: "Working within extension space",
        problem:
          "A compact browser panel has much less room than a full application page.",
        approach:
          "Prioritize clear grouping, quick orientation, and a compact visual hierarchy.",
      },
      {
        title: "Keeping project information connected",
        problem:
          "References and task context can become disconnected from the project they support.",
        approach:
          "Use project-oriented grouping as the organizing concept for the workspace.",
      },
      {
        title: "Avoiding another source of clutter",
        problem:
          "A tool intended to help with organization can become one more crowded surface.",
        approach:
          "Keep the experience focused on the context that matters to the current work.",
      },
    ],
    faqs: [
      {
        question: "What is Obsidian?",
        answer:
          "Obsidian is a browser-extension project exploring an Obsidian-like approach to organizing projects and keeping useful context close to the browser workflow.",
      },
      {
        question: "Is this the same as the Obsidian note-taking app?",
        answer:
          "The name describes this project. The case study focuses on its browser-extension and project-organization direction, not on claiming it is the official Obsidian application.",
      },
      {
        question: "Can I try a live version?",
        answer:
          "A public repository or live demo has not been provided for this project, so this page presents an illustrative interface concept instead of an install link.",
      },
      {
        question: "What is the main design challenge?",
        answer:
          "The concept has to make project context useful and understandable within the limited space of a browser extension.",
      },
    ],
    galleryLabels: [
      "Browser workspace",
      "Project context",
      "Compact organization",
      "Workflow continuity",
    ],
    nextProjectText:
      "From keeping context close to turning incoming messages into usable events.",
  },
  {
    id: "dps-campus-event-notifier",
    title: "DPS Campus Event Notifier",
    category: "Automation",
    status: "Project",
    tagline: "Turn campus messages into calendar-ready events.",
    description:
      "A TypeScript and Gemini project that extracts event details from campus messages and produces a calendar-ready ICS file.",
    overview:
      "Campus announcements can contain useful event information inside ordinary messages. This project explores a practical transformation: take a message, identify the relevant event details, and produce an ICS calendar file that can be imported into a calendar application.",
    repository: "https://github.com/peerhadi/DPS-Campus-Event-Notifier",
    website: null,
    gradient: "var(--gradient-orange-pink)",
    accentGradient: "var(--gradient-emerald-cyan)",
    visual: "notifier",
    heroEyebrow: "From message to calendar",
    heroStatement:
      "An event hidden in a message should not stay trapped in a message.",
    projectType: "Message processing and calendar-file generation",
    focusAreas: [
      "TypeScript",
      "Gemini",
      "Event detail extraction",
      "Date and time handling",
      "ICS generation",
      "Calendar workflow",
    ],
    technologies: [
      {
        name: "TypeScript",
        role: "A named technology used by the project.",
        verified: true,
      },
      {
        name: "Gemini",
        role: "The AI service used in the project.",
        verified: true,
      },
      {
        name: "ICS",
        role: "The calendar-file format produced by the project.",
        verified: true,
      },
      {
        name: "Message-to-event workflow",
        role: "The core transformation demonstrated in this case study.",
        verified: true,
      },
    ],
    capabilities: [
      {
        number: "01",
        title: "Start with a campus message",
        description:
          "Work from the text of an announcement instead of manually re-entering every detail.",
        detail:
          "Messages are the input. The aim is to identify the parts that make an announcement actionable as a calendar event.",
        icon: "message",
      },
      {
        number: "02",
        title: "Identify event details",
        description:
          "Use Gemini to help extract relevant information such as event names and dates.",
        detail:
          "The extraction step is the bridge between natural-language announcements and structured event information.",
        icon: "extract",
      },
      {
        number: "03",
        title: "Structure the result",
        description:
          "Turn the relevant details into an event-shaped representation.",
        detail:
          "Structured information is easier to validate and use as input for a calendar file than a paragraph of announcement text.",
        icon: "structure",
      },
      {
        number: "04",
        title: "Generate a calendar file",
        description:
          "Produce an ICS file that can be used with compatible calendar applications.",
        detail:
          "The output is designed to fit an existing calendar workflow rather than forcing the user to keep checking the original message.",
        icon: "calendar",
      },
    ],
    workflow: [
      {
        number: "01",
        title: "Announcement",
        description: "Provide the text of a campus event message.",
        output: "Unstructured message text",
      },
      {
        number: "02",
        title: "Extraction",
        description:
          "Use Gemini to identify the event information present in the message.",
        output: "Candidate event details",
      },
      {
        number: "03",
        title: "Structuring",
        description:
          "Prepare the extracted information for calendar-file generation.",
        output: "Structured event data",
      },
      {
        number: "04",
        title: "Calendar output",
        description: "Produce a calendar-ready ICS file.",
        output: "An importable event file",
      },
    ],
    deepDive: [
      {
        eyebrow: "01 / The input",
        title: "Announcements are written for people, not calendars.",
        description:
          "A campus message may contain an event name, a date, a time, a venue, and other context in a single block of natural language. A calendar needs those details represented in a more structured form.",
        bullets: [
          "The original message is the starting point.",
          "Event details may appear as part of a longer announcement.",
          "The useful information must be separated from the surrounding text.",
          "The output needs to fit a calendar workflow.",
        ],
      },
      {
        eyebrow: "02 / The transformation",
        title: "Convert natural language into event information.",
        description:
          "The project uses Gemini as part of the extraction workflow. This creates a clear boundary between interpreting a message and producing a calendar file from the resulting details.",
        bullets: [
          "Identify the event-related information in the message.",
          "Represent extracted details in a structured form.",
          "Keep the generated event output distinct from the original message.",
          "Avoid treating illustrative sample data as a verified real announcement.",
        ],
      },
      {
        eyebrow: "03 / The output",
        title: "Make the result useful beyond the original message.",
        description:
          "The ICS format provides the bridge to compatible calendar applications. The purpose is to make an announcement easier to carry into a calendar-based workflow.",
        bullets: [
          "Generate a calendar-ready ICS file.",
          "Make the output recognizable as an event rather than plain text.",
          "Keep the workflow focused on practical use.",
          "Remember that extracted details should be checked when an announcement is ambiguous.",
        ],
      },
    ],
    principles: [
      {
        title: "Automate repetitive work",
        description:
          "Reduce the amount of event information that has to be re-entered manually.",
      },
      {
        title: "Separate interpretation from output",
        description:
          "Extract details first, then represent them in a format a calendar can use.",
      },
      {
        title: "Make the result portable",
        description:
          "An ICS file can be used with compatible calendar applications.",
      },
      {
        title: "Treat dates carefully",
        description:
          "Calendar information is only useful when the event details are represented clearly and accurately.",
      },
    ],
    showcase: {
      eyebrow: "Interactive workflow concept",
      title: "Watch an announcement become a calendar event.",
      description:
        "This visual demonstration presents an illustrative campus announcement, the event details identified from it, and a sample ICS-style output. It shows the transformation at the heart of the project.",
      note: "The sample announcement and extracted event below are fictional demonstration content. They are not live campus data and do not represent a request sent to Gemini.",
    },
    challenges: [
      {
        title: "Extracting details from natural language",
        problem:
          "A message is written for human readers and may not present event details in a consistent structure.",
        approach:
          "Use Gemini as part of a workflow that identifies event information before preparing calendar output.",
      },
      {
        title: "Turning text into structured information",
        problem:
          "Calendar files require event-oriented fields rather than a block of announcement text.",
        approach:
          "Separate the extraction step from the calendar-file generation step.",
      },
      {
        title: "Making the output practical",
        problem:
          "Extracted information is most useful when it can move into a tool people already use.",
        approach:
          "Produce an ICS file that compatible calendar applications can import.",
      },
    ],
    faqs: [
      {
        question: "What does the Campus Event Notifier do?",
        answer:
          "It uses TypeScript and Gemini to extract event details from campus messages and produce a calendar-ready ICS file.",
      },
      {
        question: "What is an ICS file?",
        answer:
          "ICS is a calendar data format supported by many calendar applications. The project uses it as the output format for extracted events.",
      },
      {
        question: "Does this page process real messages?",
        answer:
          "No. The animated showcase uses fictional sample content to demonstrate the workflow. It does not send a message to Gemini or generate a real event file.",
      },
      {
        question: "Where can I inspect the project?",
        answer: "The public GitHub repository is linked on this page.",
      },
    ],
    galleryLabels: [
      "Message input",
      "Event extraction",
      "Structured details",
      "ICS calendar output",
    ],
    nextProjectText:
      "From automating a focused workflow to exploring the foundations of an engine.",
  },
  {
    id: "nexus-game-engine",
    title: "Nexus Game Engine",
    category: "Engine development",
    status: "In development",
    tagline: "A foundation for building interactive worlds.",
    description:
      "An original game-engine project in development, exploring the foundations of interactive scenes, reusable systems, and real-time visual experiences.",
    overview:
      "The Nexus Game Engine is an in-development project in the Engines category. This case study presents a visual exploration of the systems and relationships that matter in an engine project without claiming that every illustrated control or system is already implemented.",
    repository: "https://github.com/peerhadi/Nexus-Engine",
    website: null,
    gradient: "var(--gradient-emerald-cyan)",
    accentGradient: "var(--gradient-cyan-violet)",
    visual: "engine",
    heroEyebrow: "Building the foundations",
    heroStatement: "Every world begins with the systems that bring it to life.",
    projectType: "Game engine and interactive systems",
    focusAreas: [
      "Engine development",
      "Interactive scenes",
      "Reusable systems",
      "Real-time visuals",
      "Development tooling",
      "World-building foundations",
    ],
    technologies: [
      {
        name: "Game engine",
        role: "The project's development category.",
        verified: true,
      },
      {
        name: "Interactive scenes",
        role: "A visual direction demonstrated in this case study.",
        verified: false,
      },
      {
        name: "Reusable systems",
        role: "An engine-design area explored by the showcase.",
        verified: false,
      },
      {
        name: "Development tooling",
        role: "A potential area represented by the illustrative editor view.",
        verified: false,
      },
    ],
    capabilities: [
      {
        number: "01",
        title: "Think in systems",
        description:
          "An engine brings multiple parts of an interactive experience into a coordinated environment.",
        detail:
          "The case study explores how scene content, controls, and reusable building blocks can be presented as connected parts of a larger system.",
        icon: "systems",
      },
      {
        number: "02",
        title: "Build a scene",
        description:
          "A scene provides a useful visual unit for exploring an interactive world.",
        detail:
          "The animated scene below is a demonstration environment, not a claim about a finished in-engine renderer.",
        icon: "scene",
      },
      {
        number: "03",
        title: "Make structure visible",
        description:
          "Development interfaces help expose the relationships behind what appears on screen.",
        detail:
          "A scene tree and inspector-style panel are useful visual metaphors for understanding how an engine workspace might be organized.",
        icon: "structure",
      },
      {
        number: "04",
        title: "Leave room to grow",
        description:
          "An engine project needs a foundation that can accommodate more systems as development continues.",
        detail:
          "The page treats this project as work in progress and distinguishes design exploration from confirmed implementation.",
        icon: "growth",
      },
    ],
    workflow: [
      {
        number: "01",
        title: "Define the scene",
        description:
          "Establish the objects and relationships that make up an interactive environment.",
        output: "A scene structure",
      },
      {
        number: "02",
        title: "Connect systems",
        description:
          "Consider how scene elements and reusable systems relate to one another.",
        output: "A connected engine model",
      },
      {
        number: "03",
        title: "Inspect and adjust",
        description:
          "Use development tooling concepts to understand the scene and its configuration.",
        output: "A clearer development workflow",
      },
      {
        number: "04",
        title: "Expand the foundation",
        description:
          "Develop the project incrementally as its implemented capabilities grow.",
        output: "A foundation for future work",
      },
    ],
    deepDive: [
      {
        eyebrow: "01 / The foundation",
        title: "An engine is more than what appears on screen.",
        description:
          "The visible scene is only one part of an engine-oriented project. The broader challenge is how the scene relates to reusable systems, configuration, and the tools used to develop it.",
        bullets: [
          "Separate the visible experience from the systems behind it.",
          "Consider how scene elements relate to one another.",
          "Keep the development workflow understandable.",
          "Build the project incrementally rather than presenting unfinished systems as complete.",
        ],
      },
      {
        eyebrow: "02 / The tooling",
        title: "Make the work easier to inspect.",
        description:
          "An editor-style interface can make an engine's structure easier to reason about. The showcase uses a scene hierarchy and property panel as an illustrative way to communicate that idea.",
        bullets: [
          "Represent scene elements in a readable hierarchy.",
          "Give related settings a clear place in the interface.",
          "Keep the active scene visually prominent.",
          "Distinguish a design mockup from a working editor feature.",
        ],
      },
      {
        eyebrow: "03 / The direction",
        title: "Treat development as an evolving system.",
        description:
          "The project is in development. This page is designed to show the ambition and areas of exploration while being clear about what has and has not been verified.",
        bullets: [
          "Show the project's direction without inventing implementation claims.",
          "Keep potential systems distinct from confirmed features.",
          "Use visual prototypes to communicate ideas.",
          "Allow the case study to grow as real milestones are completed.",
        ],
      },
    ],
    principles: [
      {
        title: "Systems over isolated effects",
        description:
          "An engine's value comes from how its pieces work together, not just from a striking scene.",
      },
      {
        title: "Make structure understandable",
        description:
          "Development tools should help explain how an interactive experience is organized.",
      },
      {
        title: "Prototype honestly",
        description:
          "Visual exploration can communicate a direction without pretending to be a finished feature.",
      },
      {
        title: "Build incrementally",
        description:
          "An in-development engine should be presented as evolving work, with room for real progress to be documented.",
      },
    ],
    showcase: {
      eyebrow: "Animated scene concept",
      title: "A small window into a larger world.",
      description:
        "Explore a procedural-looking scene, a scene-tree concept, and an inspector-style panel. This is a visual case-study prototype intended to communicate engine-development ideas.",
      note: "The scene and editor panels are illustrative web visuals. They are not a live build of the Nexus Game Engine and do not confirm that the depicted systems have been implemented.",
    },
    challenges: [
      {
        title: "Separating the scene from its systems",
        problem:
          "A visually impressive scene does not communicate how the underlying engine is structured.",
        approach:
          "Show the scene alongside illustrative system and editor views to make the wider development context easier to understand.",
      },
      {
        title: "Communicating work in progress",
        problem:
          "A polished showcase can accidentally imply that every depicted feature is already complete.",
        approach:
          "Label the visuals as illustrative and keep the project's in-development status visible.",
      },
      {
        title: "Planning for expansion",
        problem:
          "An engine project can grow in many directions, making it important to keep its systems understandable.",
        approach:
          "Use reusable concepts and clear organization as the guiding themes for the case study.",
      },
    ],
    faqs: [
      {
        question: "What is the Nexus Game Engine?",
        answer:
          "It is an original game-engine project that is currently in development.",
      },
      {
        question: "Is the animated scene running in the engine?",
        answer:
          "No. The scene on this page is a web-based visual demonstration created for the case study. It is not a live engine build.",
      },
      {
        question: "Are all the editor panels implemented?",
        answer:
          "The editor-style panels are illustrative. They communicate development concepts and should not be read as a list of completed engine features.",
      },
      {
        question: "Can I download it?",
        answer:
          "A public repository or downloadable build has not been provided for this project, so this page does not offer a download link.",
      },
    ],
    galleryLabels: [
      "Scene exploration",
      "System relationships",
      "Editor concepts",
      "Engine development",
    ],
    nextProjectText:
      "Return to the complete collection and explore another project.",
  },
];

export function getWorkProject(id: string): WorkProject | undefined {
  return workProjects.find((project) => project.id === id);
}

export function getNextWorkProject(id: string): WorkProject {
  const currentIndex = workProjects.findIndex((project) => project.id === id);
  const nextIndex =
    currentIndex < 0 ? 0 : (currentIndex + 1) % workProjects.length;
  return workProjects[nextIndex];
}
