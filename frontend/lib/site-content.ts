export type Locale = "zh" | "en";

export type LocalizedText = {
  zh: string;
  en: string;
};

export type Project = {
  slug: string;
  year: string;
  title: LocalizedText;
  summary: LocalizedText;
  outcome: LocalizedText;
  responsibilities: LocalizedText[];
  tags: string[];
};

export type MediaItem = {
  id: string;
  kind: "image" | "video";
  title: LocalizedText;
  description: LocalizedText;
  format: string;
  duration?: string;
};

export type ChatPrompt = {
  id: string;
  label: LocalizedText;
  message: LocalizedText;
};

export type JourneyItem = {
  period: string;
  title: LocalizedText;
  organization: LocalizedText;
  summary: LocalizedText;
};

export type CapabilitySection = {
  title: LocalizedText;
  description: LocalizedText;
  points: LocalizedText[];
};

export const navItems = [
  { href: "/", label: { zh: "首页", en: "Home" } },
  { href: "/projects", label: { zh: "项目", en: "Projects" } },
  { href: "/media", label: { zh: "媒体", en: "Media" } },
  { href: "/chat", label: { zh: "AI 对话", en: "Chat" } },
  { href: "/contact", label: { zh: "联系", en: "Contact" } },
  { href: "/admin", label: { zh: "后台", en: "Admin" } },
] as const;

export const hero = {
  eyebrow: {
    zh: "高级前端工程师 / AI Agent 开发者",
    en: "Senior frontend engineer / AI agent developer",
  },
  title: {
    zh: "把工程化前端、AI Agent 和内容表达，做成一个能持续生长的个人站。",
    en: "Turn frontend engineering, AI agents, and expressive storytelling into a personal site that keeps growing.",
  },
  description: {
    zh: "我长期使用 React、Next.js 与工程化体系构建复杂前端产品，也在推进多模态、RAG、语音交互和流式输出的 AI Agent 落地；平时会在掘金分享技术，并持续把摄影发展成副业方向。",
    en: "I build complex frontend products with React, Next.js, and solid engineering workflows, and I also ship AI agents with multimodal processing, RAG, voice interaction, and streaming output. I share what I learn on Juejin and am growing photography into a serious side business.",
  },
  primaryCta: {
    zh: "查看 AI 能力",
    en: "Explore AI capabilities",
  },
  secondaryCta: {
    zh: "浏览项目经历",
    en: "Browse projects",
  },
};

export const profile = {
  name: "程豪 / Hao Cheng",
  role: {
    zh: "高级前端工程师 / AI Agent 开发者",
    en: "Senior frontend engineer / AI agent developer",
  },
  bio: {
    zh: "5 年前端研发经验，经历过门户网站、业务组件库、SSG 文档脚手架、在线 Playground 和企业 AI 助手等项目，持续关注复杂交互、工程效率、知识沉淀与更有记忆点的内容表达。",
    en: "With 5 years in frontend engineering, I have worked on enterprise portals, component libraries, SSG documentation tooling, online playgrounds, and internal AI assistants. I care about complex interaction, engineering efficiency, reusable knowledge, and memorable digital storytelling.",
  },
  stats: [
    { value: "5+", label: { zh: "年前端研发经验", en: "years in frontend engineering" } },
    { value: "30+", label: { zh: "业务组件沉淀", en: "business components built" } },
    { value: "9", label: { zh: "项目组复用落地", en: "internal teams using the work" } },
  ],
};

export const featuredHighlights = [
  {
    title: {
      zh: "AI Agent 落地能力",
      en: "AI agent delivery",
    },
    body: {
      zh: "支持多模态文件、语音、视频分析，后台上传任意资料并沉淀为 RAG 知识库，同时提供语音交互、流式返回和组件化样式输出。",
      en: "I build AI agents that handle multimodal files, audio, and video, let admins upload domain materials into a RAG workflow, and support voice interaction, streaming responses, and styled AI output components.",
    },
  },
  {
    title: {
      zh: "技术分享",
      en: "Technical sharing",
    },
    body: {
      zh: "我会持续在掘金输出前端工程化、组件库、文档系统和 AI 应用相关内容，把项目方法论沉淀成可复用经验。",
      en: "I regularly share thoughts on frontend engineering, component systems, documentation tooling, and AI products on Juejin so project learnings can become reusable patterns.",
    },
  },
  {
    title: {
      zh: "摄影表达",
      en: "Photography practice",
    },
    body: {
      zh: "摄影作品和拍摄能力获得了较多认可，我希望把这种视觉表达继续延伸到个人品牌建设，并逐步发展成副业。",
      en: "My photography work has received strong recognition, and I want that visual language to become part of my personal brand while growing into a meaningful side business.",
    },
  },
];

export const capabilitySections: CapabilitySection[] = [
  {
    title: {
      zh: "前端工程化",
      en: "Frontend engineering",
    },
    description: {
      zh: "围绕复杂业务系统搭建稳定的开发、构建、规范和发布体系。",
      en: "Build reliable development, build, quality, and release workflows for complex product teams.",
    },
    points: [
      {
        zh: "熟悉 React、TypeScript、Next.js、SSR、国际化和 SEO 优化。",
        en: "Comfortable with React, TypeScript, Next.js, SSR, i18n, and SEO optimization.",
      },
      {
        zh: "具备 Webpack、Vite、Rollup、Babel、Esbuild、Rehype 等工具链经验。",
        en: "Experienced with Webpack, Vite, Rollup, Babel, Esbuild, and Rehype-based tooling.",
      },
      {
        zh: "长期推动 ESLint、Prettier、Husky、lint-staged、commitlint 等规范落地。",
        en: "I drive shared quality standards with ESLint, Prettier, Husky, lint-staged, and commitlint.",
      },
    ],
  },
  {
    title: {
      zh: "AI Agent 产品化",
      en: "AI agent productization",
    },
    description: {
      zh: "把模型能力接入到真实产品流程里，而不是停留在 Demo。",
      en: "Turn model capabilities into usable product flows instead of leaving them as demos.",
    },
    points: [
      {
        zh: "封装 OpenAI、DeepSeek、Ollama、火山引擎等多模型接入与切换能力。",
        en: "Wrap and switch between OpenAI, DeepSeek, Ollama, and Volcano Engine models.",
      },
      {
        zh: "支持文档上传、知识库沉淀、语料检索和基于资料的对话回答。",
        en: "Support document upload, knowledge-base indexing, retrieval, and grounded conversations.",
      },
      {
        zh: "支持语音交互、SSE 流式输出和适合产品场景的 AI UI 组件展示。",
        en: "Support voice interaction, SSE streaming responses, and polished AI UI components for product use.",
      },
    ],
  },
  {
    title: {
      zh: "内容与表达",
      en: "Content and expression",
    },
    description: {
      zh: "让技术能力不只停留在实现层，也能被更清楚地看见和理解。",
      en: "Make technical depth visible through better presentation, documentation, and storytelling.",
    },
    points: [
      {
        zh: "持续在掘金分享技术内容，沉淀个人方法论和实践复盘。",
        en: "I publish technical writing on Juejin to capture process, tradeoffs, and lessons learned.",
      },
      {
        zh: "摄影创作帮助我建立更强的视觉表达和品牌感知。",
        en: "Photography strengthens how I think about visuals, atmosphere, and personal branding.",
      },
      {
        zh: "希望把产品体验、知识分享和视觉内容整合进统一的个人品牌站点。",
        en: "I want one site that brings together product thinking, shared knowledge, and visual storytelling.",
      },
    ],
  },
];

export const journey: JourneyItem[] = [
  {
    period: "2022.04 - 至今",
    title: {
      zh: "高级前端工程师",
      en: "Senior frontend engineer",
    },
    organization: {
      zh: "花旗金融信息服务（中国）有限公司",
      en: "Citi Financial Information Services (China)",
    },
    summary: {
      zh: "负责业务需求开发、前端组件库建设、SSG 文档脚手架和代码规范脚手架等基础设施，为多个项目组提升交付效率。",
      en: "I handle product delivery while building shared infrastructure such as component systems, SSG documentation tooling, and code-quality scaffolds for multiple teams.",
    },
  },
  {
    period: "2021.03 - 2022.04",
    title: {
      zh: "前端工程师",
      en: "Frontend engineer",
    },
    organization: {
      zh: "高知特信息技术（上海）有限公司",
      en: "Cognizant Technology Solutions (Shanghai)",
    },
    summary: {
      zh: "负责 React 页面开发、代码优化、组件抽离与重构，并参与需求讨论和 UI 协作。",
      en: "Built React pages, optimized legacy code, extracted reusable components, and worked closely with PMs and designers on requirements.",
    },
  },
  {
    period: "2017.01 - 2021.01",
    title: {
      zh: "软件工程本科",
      en: "B.Eng. in Software Engineering",
    },
    organization: {
      zh: "江西师范大学",
      en: "Jiangxi Normal University",
    },
    summary: {
      zh: "系统学习前后端与移动端开发，曾带领团队项目获得“互联网+”省级银奖，并取得英语四级、软件设计师、普通话二级甲等等证书。",
      en: "Studied frontend, backend, and mobile development, led a student project to a provincial silver award in Internet+, and earned CET-4, software designer, and Mandarin certifications.",
    },
  },
];

export const projects: Project[] = [
  {
    slug: "enterprise-portal",
    year: "2022 - Now",
    title: {
      zh: "企业门户网站",
      en: "Enterprise portal website",
    },
    summary: {
      zh: "面向业务展示和基础功能支持的企业门户项目，长期负责复杂模块的稳定迭代与性能体验优化。",
      en: "An enterprise portal for business presentation and day-to-day operations, where I owned complex modules and long-term performance improvements.",
    },
    outcome: {
      zh: "完成复杂图形模块、样式兼容性治理、性能优化和通用 Hooks 沉淀，持续支撑业务展示效率。",
      en: "Delivered complex data-visual modules, solved style compatibility issues, improved performance, and extracted reusable hooks that support ongoing product delivery.",
    },
    responsibilities: [
      {
        zh: "使用 D3 和 ZRender 实现 SVG 与 Canvas 结合的复杂图形模块。",
        en: "Built complex visualization modules with D3 and ZRender across SVG and Canvas rendering.",
      },
      {
        zh: "通过自定义 Webpack Plugin 处理双组件库样式冲突，解决兼容性问题。",
        en: "Resolved dual-component-library style conflicts by writing a custom Webpack plugin.",
      },
      {
        zh: "围绕代码压缩、CDN、懒加载和缓存策略做性能优化，提升首屏与响应速度。",
        en: "Improved performance through code compression, CDN delivery, lazy loading, and cache strategy tuning.",
      },
      {
        zh: "沉淀通用 React Hooks 库，提升复用性、开发效率和可维护性。",
        en: "Created a reusable React hooks library to improve consistency, speed, and maintainability.",
      },
    ],
    tags: ["React", "D3", "ZRender", "Webpack", "Performance"],
  },
  {
    slug: "ssg-docs-starter",
    year: "2023 - Now",
    title: {
      zh: "SSG 文档站点生成脚手架",
      en: "SSG documentation starter",
    },
    summary: {
      zh: "自研企业级静态站点生成工具，深度整合 MDX 文档体系，为组件库提供开箱即用的文档解决方案。",
      en: "A self-built enterprise SSG that deeply integrates an MDX workflow and gives component teams a ready-to-use documentation platform.",
    },
    outcome: {
      zh: "已在公司两大核心组件库落地，兼顾文档生产效率、实时预览体验和静态构建性能。",
      en: "Now used by two core internal component libraries, balancing authoring speed, live preview quality, and static build performance.",
    },
    responsibilities: [
      {
        zh: "基于 tsup 和 cac 搭建 CLI 工程体系，覆盖 dev/build 等完整命令流。",
        en: "Built a CLI workflow with tsup and cac to support the full dev/build lifecycle.",
      },
      {
        zh: "整合 remark、rehype 和 unified 生态，实现 Markdown AST 处理、代码高亮和 frontmatter 解析。",
        en: "Integrated remark, rehype, and unified for Markdown AST transforms, highlighting, and frontmatter parsing.",
      },
      {
        zh: "开发代码沙箱插件与实时预览链路，提升文档交互性和开发体验。",
        en: "Created a code sandbox plugin and live preview workflow to make docs more interactive.",
      },
      {
        zh: "实现多入口 SSG 构建与混合渲染思路，优化静态资源加载和按需 Hydration。",
        en: "Implemented multi-entry SSG builds and a hybrid rendering strategy to improve loading and selective hydration.",
      },
    ],
    tags: ["React", "TypeScript", "Vite", "MDX", "Rehype", "SSG"],
  },
  {
    slug: "business-component-library",
    year: "2022 - Now",
    title: {
      zh: "项目业务组件库",
      en: "Business component library",
    },
    summary: {
      zh: "从 0 到 1 搭建业务组件库及配套文档环境，为多个项目提供统一、可复用的业务组件能力。",
      en: "Built a business component library and its documentation environment from scratch to give multiple product teams a shared UI foundation.",
    },
    outcome: {
      zh: "沉淀 30 余个业务组件，已服务公司内部 9 个项目组，显著降低重复开发与维护成本。",
      en: "Delivered 30+ reusable business components now used by 9 internal teams, cutting repeated implementation and maintenance cost.",
    },
    responsibilities: [
      {
        zh: "独立搭建 Rollup 与 Vite 的本地开发和发布环境，串联 CI/CD 自动化流程。",
        en: "Set up Rollup- and Vite-based local development and release workflows connected to CI/CD.",
      },
      {
        zh: "构建基于 Vite、Babel、Rehype 的文档开发环境，支持 Markdown、组件嵌套与在线示例。",
        en: "Built a docs environment with Vite, Babel, and Rehype that supports Markdown, nested React components, and live examples.",
      },
      {
        zh: "统一接入 ESLint、Prettier、Husky、lint-staged 和 commitlint，规范团队代码流转。",
        en: "Unified team quality standards with ESLint, Prettier, Husky, lint-staged, and commitlint.",
      },
      {
        zh: "通过统一组件能力减少多项目重复开发，提升交付速度与代码质量。",
        en: "Reduced repeated implementation across projects by centralizing business UI capabilities.",
      },
    ],
    tags: ["React", "Rollup", "Vite", "ESBuild", "Rehype", "CI/CD"],
  },
  {
    slug: "ai-assistant-agent",
    year: "2024 - Now",
    title: {
      zh: "AI 助手与 Agent 能力平台",
      en: "AI assistant and agent platform",
    },
    summary: {
      zh: "面向企业内部员工的 AI 助手项目，支持多模型切换、多模态资料处理、知识库沉淀、语音交互和流式回答。",
      en: "An internal AI assistant for enterprise teams, combining model switching, multimodal processing, knowledge-base retrieval, voice interaction, and streaming responses.",
    },
    outcome: {
      zh: "完成多模型统一封装、SSR 交互体验优化，以及可复用的 AI Agent 能力沉淀，为后续场景扩展打下基础。",
      en: "Delivered a reusable multi-model foundation, improved SSR user experience, and established an AI agent capability layer ready for broader use cases.",
    },
    responsibilities: [
      {
        zh: "封装 OpenAI、DeepSeek、Ollama、火山引擎等模型的接入、切换、流量控制与错误提示。",
        en: "Wrapped OpenAI, DeepSeek, Ollama, and Volcano Engine models with switching, traffic control, and user-friendly error handling.",
      },
      {
        zh: "支持图片、文件、语音、视频等多模态资料处理，并在后台上传任意资料后写入 RAG 知识库。",
        en: "Supported multimodal processing for files, images, audio, and video, with admin uploads feeding a RAG knowledge base.",
      },
      {
        zh: "基于 SSE 实现流式输出与打字机效果，并扩展语音交互和 AI 内容样式化组件。",
        en: "Implemented SSE-based streaming with a typewriter effect and extended the product with voice interaction and styled AI output components.",
      },
      {
        zh: "结合 Docker、Jenkins、PM2 推进自动化构建和部署，保证迭代效率与稳定性。",
        en: "Used Docker, Jenkins, and PM2 to automate build and deployment for stable, fast iteration.",
      },
    ],
    tags: ["Next.js", "AI Agent", "RAG", "SSE", "SSR", "Docker"],
  },
  {
    slug: "react-playground",
    year: "2023 - 2024",
    title: {
      zh: "在线 React 代码 Playground",
      en: "Online React code playground",
    },
    summary: {
      zh: "为组件调试和示例验证打造在线代码编辑平台，让开发者能直接在浏览器里编写和运行 React 代码。",
      en: "An online code playground that lets developers write and run React snippets in the browser for faster component debugging and validation.",
    },
    outcome: {
      zh: "打通浏览器内编译、递归依赖解析、沙箱执行和错误回传，显著提升组件测试效率。",
      en: "Connected in-browser compilation, recursive dependency parsing, sandbox execution, and error forwarding into one smooth debugging workflow.",
    },
    responsibilities: [
      {
        zh: "设计左中右工作台布局，结合 Monaco Editor 与 iframe 展示实时结果。",
        en: "Designed a three-panel workspace with Monaco Editor and an iframe-based live preview.",
      },
      {
        zh: "借助 Babel Standalone 在浏览器中编译 JSX 和 TypeScript，处理 import 语句转换。",
        en: "Compiled JSX and TypeScript in the browser with Babel Standalone and custom import transforms.",
      },
      {
        zh: "递归处理相对路径依赖，将 CSS、JSON 等文件转换后一起注入沙箱环境。",
        en: "Recursively resolved relative imports and converted files like CSS and JSON for sandbox execution.",
      },
      {
        zh: "使用 Web Workers 做异步编译，减少主线程阻塞并提升交互流畅度。",
        en: "Moved compilation into Web Workers to keep the main thread responsive.",
      },
    ],
    tags: ["React", "Monaco", "Babel", "iframe", "Web Workers"],
  },
];

export const mediaItems: MediaItem[] = [
  {
    id: "photo-series",
    kind: "image",
    title: {
      zh: "摄影作品集",
      en: "Photography collection",
    },
    description: {
      zh: "展示我在人物、氛围和故事感表达上的摄影作品，也会逐步承接副业方向的展示与预约入口。",
      en: "A photography collection focused on portrait, mood, and narrative expression, and a future base for side-business showcases and bookings.",
    },
    format: "JPG / Curated Set",
  },
  {
    id: "rag-admin-flow",
    kind: "video",
    title: {
      zh: "RAG 资料上传与知识入库流程",
      en: "RAG upload and indexing flow",
    },
    description: {
      zh: "演示在管理后台上传任意资料后，如何完成解析、切片、向量化和后续对话引用。",
      en: "Shows how admin-uploaded materials are parsed, chunked, embedded, and later used in grounded conversations.",
    },
    format: "MP4 / Product Demo",
    duration: "01:36",
  },
  {
    id: "voice-agent-demo",
    kind: "video",
    title: {
      zh: "语音交互 AI Agent 演示",
      en: "Voice-first AI agent demo",
    },
    description: {
      zh: "展示语音输入、流式回答和组件化内容输出结合后的产品体验。",
      en: "A walkthrough of voice input, streaming replies, and styled AI output working together in one interface.",
    },
    format: "MOV / Interaction Demo",
    duration: "00:54",
  },
];

export const chatPrompts: ChatPrompt[] = [
  {
    id: "intro",
    label: {
      zh: "你的定位",
      en: "Your profile",
    },
    message: {
      zh: "请你介绍一下自己，重点说说前端工程和 AI Agent 相关的经历。",
      en: "Introduce yourself with a focus on frontend engineering and AI agent work.",
    },
  },
  {
    id: "agent",
    label: {
      zh: "AI Agent 能力",
      en: "AI agent capabilities",
    },
    message: {
      zh: "请详细说说你做过的 AI agent 支持哪些能力，以及适合什么业务场景。",
      en: "Tell me about the AI agent capabilities you have built and the business scenarios they fit.",
    },
  },
  {
    id: "projects",
    label: {
      zh: "代表项目",
      en: "Signature projects",
    },
    message: {
      zh: "从组件库、SSG 脚手架和 AI 助手里选几个项目，讲讲你的核心贡献。",
      en: "Pick a few projects like the component library, SSG starter, and AI assistant, and explain what you owned.",
    },
  },
  {
    id: "sharing",
    label: {
      zh: "分享与摄影",
      en: "Sharing and photography",
    },
    message: {
      zh: "除了工作经历，你平时如何做技术分享，以及摄影和个人品牌有什么关系？",
      en: "Outside of product work, how do you share knowledge, and how does photography connect with your personal brand?",
    },
  },
];

export const contactPoints = [
  {
    label: {
      zh: "邮箱",
      en: "Email",
    },
    value: "zenos.chen@foxmail.com",
  },
  {
    label: {
      zh: "电话",
      en: "Phone",
    },
    value: "18379736380",
  },
  {
    label: {
      zh: "掘金",
      en: "Juejin",
    },
    value: "juejin.cn/user/567787440573229",
  },
];

export const adminModules = [
  {
    title: {
      zh: "个人资料",
      en: "Profile",
    },
    description: {
      zh: "维护个人简介、工作经历、教育信息、摄影方向和合作方式。",
      en: "Maintain your bio, work history, education, photography direction, and collaboration notes.",
    },
  },
  {
    title: {
      zh: "项目管理",
      en: "Projects",
    },
    description: {
      zh: "管理门户网站、组件库、AI Agent 等项目的中英文内容、标签与上线状态。",
      en: "Manage bilingual content, tags, and publish state for portal, component library, and AI agent projects.",
    },
  },
  {
    title: {
      zh: "媒体资源",
      en: "Media",
    },
    description: {
      zh: "上传摄影作品、产品演示视频和封面素材，统一处理对外展示。",
      en: "Upload photography work, product demo videos, and cover assets for public-facing presentation.",
    },
  },
  {
    title: {
      zh: "知识库",
      en: "Knowledge base",
    },
    description: {
      zh: "录入简历、项目资料、FAQ 和分享内容，并触发 RAG 重新索引。",
      en: "Store resume data, project notes, FAQs, and long-form writing, then trigger RAG re-indexing.",
    },
  },
];

export const collaborationNotes = [
  {
    zh: "适合交流复杂前端系统、组件库、文档平台和 AI Agent 产品化相关合作。",
    en: "A strong fit for collaboration around complex frontend systems, component libraries, documentation platforms, and AI agent product work.",
  },
  {
    zh: "如果要聊合作，我更希望先对齐业务目标、资料来源、上线节奏和需要承担的角色边界。",
    en: "When discussing collaboration, I prefer to align on business goals, source materials, launch rhythm, and ownership boundaries early.",
  },
  {
    zh: "除了全职或项目合作，我也欢迎技术内容共创，以及和摄影、品牌表达结合的机会。",
    en: "Beyond full-time roles or project work, I am also open to technical content collaboration and opportunities that combine product, photography, and branding.",
  },
];

export function getLocalizedText(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
