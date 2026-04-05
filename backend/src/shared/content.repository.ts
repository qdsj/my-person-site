import type { ChatReply } from "../chat/chat.service";
import type { KnowledgeDocumentSummary } from "../knowledge-base/knowledge-base.service";
import type { MediaRecord } from "../media/media.service";
import type { ProfileRecord } from "../profile/profile.service";
import type { ProjectRecord } from "../projects/projects.service";

const profile: ProfileRecord = {
  name: "Hao Cheng",
  headline: "Senior frontend engineer / AI agent developer",
  summary:
    "Frontend engineer focused on React, Next.js, component systems, documentation tooling, and AI agents with multimodal, RAG, voice, and streaming interaction capabilities.",
  locales: ["zh", "en"],
};

const projects: ProjectRecord[] = [
  {
    id: "enterprise-portal",
    slug: "enterprise-portal",
    title: "Enterprise portal website",
    status: "published",
  },
  {
    id: "ssg-docs-starter",
    slug: "ssg-docs-starter",
    title: "SSG documentation starter",
    status: "published",
  },
  {
    id: "business-component-library",
    slug: "business-component-library",
    title: "Business component library",
    status: "published",
  },
  {
    id: "ai-assistant-agent",
    slug: "ai-assistant-agent",
    title: "AI assistant and agent platform",
    status: "published",
  },
  {
    id: "react-playground",
    slug: "react-playground",
    title: "Online React code playground",
    status: "published",
  },
];

const media: MediaRecord[] = [
  {
    id: "photo-series",
    kind: "image",
    title: "Photography collection",
    status: "published",
  },
  {
    id: "rag-admin-flow",
    kind: "video",
    title: "RAG upload and indexing flow",
    status: "published",
  },
  {
    id: "voice-agent-demo",
    kind: "video",
    title: "Voice-first AI agent demo",
    status: "published",
  },
];

const knowledgeDocuments: KnowledgeDocumentSummary[] = [
  {
    id: "resume-profile",
    title: "Resume and profile",
    status: "published",
    locale: "bilingual",
  },
  {
    id: "agent-capabilities",
    title: "AI agent capabilities",
    status: "published",
    locale: "bilingual",
  },
  {
    id: "sharing-and-photography",
    title: "Technical sharing and photography notes",
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
          ? `这是基于当前站点资料生成的占位回答：程豪是一名前端工程师兼 AI Agent 开发者，长期聚焦 React、Next.js、组件库、SSG 文档系统，以及支持多模态处理、RAG、语音交互和流式输出的 AI 产品。正式接入知识库后，我会结合简历、项目资料和分享内容来回答“${message}”。`
          : `This is a placeholder answer generated from the current site data: Hao Cheng is a frontend engineer and AI agent developer focused on React, Next.js, component systems, SSG documentation, and AI products with multimodal, RAG, voice, and streaming capabilities. Once the knowledge base is connected, I will answer "${message}" using the resume, project notes, and published writing.`,
      sessionId: "demo-session",
      sourceCount: 3,
    };
  },
};
