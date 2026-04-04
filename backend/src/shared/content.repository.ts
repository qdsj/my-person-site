import type { ChatReply } from "../chat/chat.service";
import type { KnowledgeDocumentSummary } from "../knowledge-base/knowledge-base.service";
import type { MediaRecord } from "../media/media.service";
import type { ProfileRecord } from "../profile/profile.service";
import type { ProjectRecord } from "../projects/projects.service";

const profile: ProfileRecord = {
  name: "Chengtong Xue",
  headline: "Product-minded builder / AI-guided personal site",
  summary:
    "A placeholder public profile record that will later move to PostgreSQL and the admin CMS.",
  locales: ["zh", "en"],
};

const projects: ProjectRecord[] = [
  {
    id: "personal-ai-brand-site",
    slug: "personal-ai-brand-site",
    title: "Personal brand site with AI persona",
    status: "published",
  },
  {
    id: "media-storytelling-system",
    slug: "media-storytelling-system",
    title: "Visual storytelling system",
    status: "published",
  },
];

const media: MediaRecord[] = [
  {
    id: "launch-film",
    kind: "video",
    title: "Brand opening reel",
    status: "published",
  },
  {
    id: "portrait-series",
    kind: "image",
    title: "Portrait collection",
    status: "published",
  },
];

const knowledgeDocuments: KnowledgeDocumentSummary[] = [
  {
    id: "faq-intro",
    title: "About me FAQ",
    status: "published",
    locale: "bilingual",
  },
];

export const contentRepository = {
  getProfile() {
    return profile;
  },
  listProjects() {
    return projects;
  },
  getProjectBySlug(slug: string) {
    return projects.find((project) => project.slug === slug) ?? null;
  },
  listMedia() {
    return media;
  },
  listKnowledgeDocuments() {
    return knowledgeDocuments;
  },
  createChatReply(message: string, locale: string): ChatReply {
    return {
      answer:
        locale === "zh"
          ? `这是一个占位回答：后续会从已发布语料中检索与你相关的资料来回答“${message}”。`
          : `This is a placeholder answer. The final service will retrieve published knowledge before answering "${message}".`,
      sessionId: "demo-session",
      sourceCount: 0,
    };
  },
};
