"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { getLocalizedText, type Project } from "@/lib/site-content";

export function ProjectDetailPage({ project }: { project: Project }) {
  const { locale } = useLanguage();

  return (
    <SiteShell
      kicker={{ zh: "项目详情", en: "Project detail" }}
      title={project.title}
      description={project.summary}
    >
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[24px] border border-black/8 bg-white/78 p-5 sm:rounded-[28px] sm:p-7">
          <p className="text-sm uppercase tracking-[0.18em] text-black/45">
            {project.year}
          </p>
          <h2 className="display-font mt-3 text-2xl text-[var(--accent-strong)] sm:text-3xl">
            {getLocalizedText(project.title, locale)}
          </h2>
          <p className="mt-4 leading-7 text-black/65 sm:leading-8">
            {getLocalizedText(project.outcome, locale)}
          </p>

          <div className="mt-8">
            <p className="text-sm font-medium text-black/45">
              {locale === "zh" ? "我负责的部分" : "What I owned"}
            </p>
            <ul className="mt-3 space-y-3">
              {project.responsibilities.map((item) => (
                <li key={item.zh} className="rounded-2xl bg-black/3 px-4 py-3 leading-7 text-black/70">
                  {getLocalizedText(item, locale)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-[24px] border border-black/8 bg-[var(--surface)] p-5 sm:rounded-[28px] sm:p-6">
            <p className="text-sm font-medium text-black/45">
              {locale === "zh" ? "核心标签" : "Core tags"}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs text-[var(--accent-strong)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-black/8 bg-white/80 p-5 sm:rounded-[28px] sm:p-6">
            <p className="display-font text-xl sm:text-2xl">
              {locale === "zh" ? "下一步可接入" : "Ready to plug in next"}
            </p>
            <ul className="mt-4 space-y-3 text-black/65">
              <li>{locale === "zh" ? "真实项目封面与媒体资源" : "Real cover assets and media"}</li>
              <li>{locale === "zh" ? "后台多语言编辑表单" : "Bilingual admin editing forms"}</li>
              <li>{locale === "zh" ? "AI 知识库的项目专属文档" : "Project-specific AI knowledge docs"}</li>
            </ul>
            <Link
              href="/chat"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5 sm:w-auto"
            >
              {locale === "zh" ? "用 AI 继续了解我" : "Continue with AI chat"}
            </Link>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}
