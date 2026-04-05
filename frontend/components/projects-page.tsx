"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useLanguage } from "@/components/language-provider";
import { getLocalizedText, projects } from "@/lib/site-content";

export function ProjectsPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell
      kicker={{ zh: "项目与成果", en: "Projects and outcomes" }}
      title={{ zh: "用更完整的上下文展示你做过的事。", en: "Show the work with enough context to matter." }}
      description={{
        zh: "项目页是个人品牌站的说服力中枢。这里展示代表项目、你的职责、产出和影响，也为 AI 对话提供可靠的事实来源。",
        en: "Projects are the persuasion layer of the site. They show your role, your output, and the impact behind the work while feeding reliable facts into the AI experience.",
      }}
    >
      <div className="space-y-5 sm:space-y-6">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className="animated-rise rounded-[24px] border border-black/8 bg-white/78 p-5 sm:rounded-[28px] sm:p-7"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.18em] text-black/45">
                  {project.year}
                </p>
                <h2 className="display-font text-2xl sm:text-3xl">
                  {getLocalizedText(project.title, locale)}
                </h2>
                <p className="max-w-3xl leading-7 text-black/65 sm:leading-8">
                  {getLocalizedText(project.summary, locale)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
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

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-sm font-medium text-black/50">
                  {locale === "zh" ? "职责" : "Responsibilities"}
                </p>
                <ul className="mt-3 space-y-3 text-black/70">
                  {project.responsibilities.map((item) => (
                    <li key={item.zh} className="rounded-2xl bg-black/3 px-4 py-3 leading-7">
                      {getLocalizedText(item, locale)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[22px] border border-dashed border-black/12 bg-[var(--surface)] p-4 sm:rounded-[24px] sm:p-5">
                <p className="text-sm font-medium text-black/50">
                  {locale === "zh" ? "结果" : "Outcome"}
                </p>
                <p className="mt-3 leading-7 text-black/65 sm:leading-8">
                  {getLocalizedText(project.outcome, locale)}
                </p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white sm:w-auto"
                >
                  {locale === "zh" ? "进入项目详情" : "Open project detail"}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SiteShell>
  );
}
