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
    zh: "中英双语个人品牌网站",
    en: "Bilingual personal brand site",
  },
  title: {
    zh: "把个人经历、作品和 AI 分身放进一个可持续运营的站点。",
    en: "Turn your story, work, and AI persona into one living personal site.",
  },
  description: {
    zh: "这个前端骨架已经为个人介绍、图片视频展示、AI 对话入口和后台管理预留了结构，后续接上 NestJS API 后就能进入真实运营阶段。",
    en: "This frontend scaffold already reserves space for personal storytelling, media showcases, an AI guide, and an admin workflow. Once the NestJS API is wired in, it can move into real operation.",
  },
  primaryCta: {
    zh: "查看 AI 对话",
    en: "Open AI chat",
  },
  secondaryCta: {
    zh: "浏览代表项目",
    en: "Browse projects",
  },
};

export const profile = {
  name: "Chengtong Xue",
  role: {
    zh: "产品型开发者 / 个人品牌构建者",
    en: "Product-minded builder / personal brand architect",
  },
  bio: {
    zh: "我关注如何把抽象能力讲清楚、把复杂系统做顺手，也让网站既有内容价值又有记忆点。",
    en: "I focus on making complex systems feel approachable while giving digital experiences a clear point of view.",
  },
  stats: [
    { value: "3", label: { zh: "核心体验层", en: "core experience layers" } },
    { value: "6", label: { zh: "首期文档模块", en: "planning documents" } },
    { value: "1", label: { zh: "单管理员后台", en: "single-admin CMS" } },
  ],
};

export const featuredHighlights = [
  {
    title: {
      zh: "个人叙事",
      en: "Personal narrative",
    },
    body: {
      zh: "用首页、项目页和 AI 对话把“你是谁”讲成一条完整路径。",
      en: "Use the homepage, project detail, and AI chat to tell a coherent story about who you are.",
    },
  },
  {
    title: {
      zh: "媒体表达",
      en: "Media presentation",
    },
    body: {
      zh: "统一管理图片和视频，让作品展示不再散落在不同平台。",
      en: "Manage images and videos in one place so the work does not stay fragmented across platforms.",
    },
  },
  {
    title: {
      zh: "持续更新",
      en: "Continuous updates",
    },
    body: {
      zh: "后台把资料维护、项目发布和语料录入合在一起，减少重复工作。",
      en: "The admin side combines profile editing, project publishing, and knowledge maintenance into one workflow.",
    },
  },
];

export const projects: Project[] = [
  {
    slug: "personal-ai-brand-site",
    year: "2026",
    title: {
      zh: "个人品牌网站与 AI 分身",
      en: "Personal brand site with AI persona",
    },
    summary: {
      zh: "围绕个人介绍、作品展示、后台管理和 AI 知识问答，搭建一套可长期演进的网站系统。",
      en: "A long-lived site system combining personal presentation, portfolio content, admin operations, and AI knowledge chat.",
    },
    outcome: {
      zh: "明确了前后端分层、知识库管理流程和中英双语内容模型。",
      en: "Defined the frontend/backend split, the knowledge maintenance workflow, and the bilingual content model.",
    },
    responsibilities: [
      {
        zh: "规划前端信息架构与交互优先级。",
        en: "Planned the frontend information architecture and interaction priority.",
      },
      {
        zh: "定义后台模块、媒体上传和语料库维护范围。",
        en: "Defined the admin modules, media upload flow, and knowledge management scope.",
      },
      {
        zh: "设计 API 边界与对象存储、向量检索的协作关系。",
        en: "Designed the API boundaries and how object storage and vector retrieval work together.",
      },
    ],
    tags: ["Next.js", "NestJS", "RAG", "CMS"],
  },
  {
    slug: "media-storytelling-system",
    year: "2025",
    title: {
      zh: "图片与视频叙事系统",
      en: "Visual storytelling system",
    },
    summary: {
      zh: "把图片、视频和项目背景串成一组连贯的讲述模块，让内容更有停留价值。",
      en: "Connected image, video, and project context into a set of narrative modules that invite visitors to stay longer.",
    },
    outcome: {
      zh: "提升展示一致性，并为对象存储接入提供清晰的数据约束。",
      en: "Improved presentation consistency and created clean data contracts for future object storage integration.",
    },
    responsibilities: [
      {
        zh: "梳理媒体类型、封面图、摘要和排序字段。",
        en: "Mapped media types, cover assets, summaries, and sort fields.",
      },
      {
        zh: "定义公共展示与后台维护的双视角信息结构。",
        en: "Defined the information model for both public display and admin editing.",
      },
    ],
    tags: ["Media", "Content Design", "UX"],
  },
];

export const mediaItems: MediaItem[] = [
  {
    id: "launch-film",
    kind: "video",
    title: {
      zh: "品牌开场短片",
      en: "Brand opening reel",
    },
    description: {
      zh: "用于主页首屏和项目介绍的短视频占位，后续会接对象存储与封面管理。",
      en: "A placeholder short film for the hero section and project stories, ready for object storage and cover asset handling.",
    },
    format: "MP4 / 4K",
    duration: "00:48",
  },
  {
    id: "portrait-series",
    kind: "image",
    title: {
      zh: "人物照片组",
      en: "Portrait collection",
    },
    description: {
      zh: "展示个人形象和创作氛围的图片组，适合和自我介绍、联系页联动。",
      en: "A portrait collection that supports the personal narrative and the contact funnel.",
    },
    format: "JPG / 2400px",
  },
  {
    id: "behind-scenes",
    kind: "video",
    title: {
      zh: "幕后工作片段",
      en: "Behind-the-scenes clips",
    },
    description: {
      zh: "更生活化的过程型内容，用来让访客更快理解你的工作方式。",
      en: "Process-driven clips that help visitors understand how you work.",
    },
    format: "MOV / 1080p",
    duration: "01:24",
  },
];

export const chatPrompts: ChatPrompt[] = [
  {
    id: "intro",
    label: {
      zh: "你是谁？",
      en: "Who are you?",
    },
    message: {
      zh: "请你用第一人称介绍一下你自己，以及这个网站的目的。",
      en: "Introduce yourself in first person and explain the purpose of this site.",
    },
  },
  {
    id: "projects",
    label: {
      zh: "代表项目",
      en: "Signature projects",
    },
    message: {
      zh: "请说说你最能代表自己的项目，以及你在其中负责了什么。",
      en: "Tell me about the project that represents you best and what you owned in it.",
    },
  },
  {
    id: "collaboration",
    label: {
      zh: "合作方式",
      en: "Ways to collaborate",
    },
    message: {
      zh: "如果别人想和你合作，你希望他们先了解哪些事情？",
      en: "If someone wants to work with you, what should they understand first?",
    },
  },
];

export const contactPoints = [
  {
    label: {
      zh: "邮箱",
      en: "Email",
    },
    value: "hello@example.com",
  },
  {
    label: {
      zh: "GitHub",
      en: "GitHub",
    },
    value: "github.com/chengtongxue",
  },
  {
    label: {
      zh: "所在地",
      en: "Base",
    },
    value: "Shanghai / Remote",
  },
];

export const adminModules = [
  {
    title: {
      zh: "个人资料",
      en: "Profile",
    },
    description: {
      zh: "维护个人简介、头像、站点文案和联系方式。",
      en: "Manage your bio, portrait, site copy, and contact details.",
    },
  },
  {
    title: {
      zh: "项目管理",
      en: "Projects",
    },
    description: {
      zh: "编辑项目条目、语言版本、状态和排序。",
      en: "Edit project entries, language variants, status, and ordering.",
    },
  },
  {
    title: {
      zh: "媒体资源",
      en: "Media",
    },
    description: {
      zh: "上传图片或视频，维护封面、描述、关联内容和公开状态。",
      en: "Upload images or videos, then manage covers, descriptions, relations, and visibility.",
    },
  },
  {
    title: {
      zh: "知识库",
      en: "Knowledge base",
    },
    description: {
      zh: "录入 FAQ、个人故事、项目补充信息，并触发重新索引。",
      en: "Maintain FAQs, personal stories, project context, and re-index the AI knowledge base.",
    },
  },
];

export function getLocalizedText(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
