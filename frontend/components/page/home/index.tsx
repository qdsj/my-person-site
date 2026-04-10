import Link from "next/link";
import { SiteShell } from "@/components/shared/site-shell";
import { getLocalizedHref } from "@/lib/i18n";
import {
  capabilitySections,
  featuredHighlights,
  getLocalizedText,
  hero,
  journey,
  profile,
  projects,
  type Locale,
} from "@/lib/site-content";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <SiteShell
      locale={locale}
      currentPath="/"
      activeNav="/"
      kicker={hero.eyebrow}
      title={hero.title}
      description={hero.description}
    >
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-8">
          <div className="rounded-[24px] border border-black/8 bg-[var(--surface)] p-5 sm:rounded-[28px] sm:p-7">
            <p className="text-sm uppercase tracking-[0.2em] text-black/45">
              {profile.name}
            </p>
            <h2 className="display-font mt-3 text-2xl text-[var(--accent-strong)] sm:text-3xl">
              {getLocalizedText(profile.role, locale)}
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-black/65 sm:leading-8">
              {getLocalizedText(profile.bio, locale)}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={getLocalizedHref(locale, "/chat")}
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-strong)]"
              >
                {getLocalizedText(hero.primaryCta, locale)}
              </Link>
              <Link
                href={getLocalizedHref(locale, "/projects")}
                className="inline-flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-medium text-black/75 transition hover:bg-black/5"
              >
                {getLocalizedText(hero.secondaryCta, locale)}
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
            {profile.stats.map((stat, index) => (
              <div
                key={stat.value}
                className="animated-rise rounded-[22px] border border-black/8 bg-white/80 p-4 sm:rounded-[24px] sm:p-5"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <p className="display-font text-3xl text-[var(--secondary)] sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-black/60">
                  {getLocalizedText(stat.label, locale)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          {featuredHighlights.map((item, index) => (
            <article
              key={item.title.zh}
              className="animated-rise rounded-[22px] border border-black/8 bg-white/72 p-5 sm:rounded-[24px] sm:p-6"
              style={{ animationDelay: `${index * 0.1 + 0.05}s` }}
            >
              <h3 className="display-font text-xl sm:text-2xl">
                {getLocalizedText(item.title, locale)}
              </h3>
              <p className="mt-3 leading-7 text-black/65">
                {getLocalizedText(item.body, locale)}
              </p>
            </article>
          ))}
        </section>
      </div>

      <section className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            className="animated-rise rounded-[24px] border border-black/8 bg-[var(--surface-strong)] p-5 sm:rounded-[28px] sm:p-7"
            style={{ animationDelay: `${index * 0.12 + 0.15}s` }}
          >
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-black/45">
                  {project.year}
                </p>
                <h3 className="display-font mt-2 text-2xl sm:text-3xl">
                  {getLocalizedText(project.title, locale)}
                </h3>
              </div>
              <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs text-[var(--accent-strong)]">
                {project.tags[0]}
              </span>
            </div>
            <p className="mt-4 leading-7 text-black/65">
              {getLocalizedText(project.summary, locale)}
            </p>
            <p className="mt-4 text-sm leading-6 text-black/50">
              {getLocalizedText(project.outcome, locale)}
            </p>
            <Link
              href={getLocalizedHref(locale, `/projects/${project.slug}`)}
              className="mt-6 inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5"
            >
              {locale === "zh" ? "查看详情" : "View details"}
            </Link>
          </article>
        ))}
      </section>

      <section className="mt-10 space-y-5 sm:mt-12 sm:space-y-6">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--secondary)]">
            {locale === "zh" ? "能力展开" : "Capability view"}
          </p>
          <h2 className="display-font mt-3 text-3xl sm:text-4xl">
            {locale === "zh"
              ? "前端工程、AI Agent 与内容表达是我现在最稳定的三条主线。"
              : "Frontend engineering, AI agents, and content expression are the three threads that define my work right now."}
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {capabilitySections.map((section, index) => (
            <article
              key={section.title.zh}
              className="animated-rise rounded-[24px] border border-black/8 bg-white/78 p-5 sm:rounded-[28px] sm:p-6"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <h3 className="display-font text-2xl">{getLocalizedText(section.title, locale)}</h3>
              <p className="mt-3 leading-7 text-black/65">
                {getLocalizedText(section.description, locale)}
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-black/68">
                {section.points.map((point) => (
                  <li key={point.zh} className="rounded-2xl bg-black/3 px-4 py-3">
                    {getLocalizedText(point, locale)}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[24px] border border-black/8 bg-[var(--surface)] p-5 sm:rounded-[28px] sm:p-7">
          <p className="text-sm uppercase tracking-[0.18em] text-[var(--secondary)]">
            {locale === "zh" ? "经历与教育" : "Journey and education"}
          </p>
          <div className="mt-5 space-y-4">
            {journey.map((item, index) => (
              <article
                key={`${item.period}-${item.title.zh}`}
                className="animated-rise rounded-[22px] border border-black/8 bg-white/78 p-4 sm:rounded-[24px] sm:p-5"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <p className="text-sm uppercase tracking-[0.16em] text-black/45">{item.period}</p>
                <h3 className="display-font mt-2 text-xl sm:text-2xl">
                  {getLocalizedText(item.title, locale)}
                </h3>
                <p className="mt-1 text-sm text-black/50">
                  {getLocalizedText(item.organization, locale)}
                </p>
                <p className="mt-3 leading-7 text-black/65">
                  {getLocalizedText(item.summary, locale)}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[24px] border border-black/8 bg-white/80 p-5 sm:rounded-[28px] sm:p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-black/45">
              {locale === "zh" ? "持续分享" : "Ongoing sharing"}
            </p>
            <h3 className="display-font mt-3 text-2xl">
              {locale === "zh" ? "掘金是我的主要技术输出阵地。" : "Juejin is where I share most of my technical writing."}
            </h3>
            <p className="mt-3 leading-7 text-black/65">
              {locale === "zh"
                ? "我会把项目里的工程化方案、组件库经验、文档系统建设和 AI 应用实践，整理成更容易复用的文章内容。"
                : "I turn real project work such as tooling, component systems, documentation architecture, and AI product practice into reusable writing."}
            </p>
          </div>

          <div className="rounded-[24px] border border-black/8 bg-white/80 p-5 sm:rounded-[28px] sm:p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-black/45">
              {locale === "zh" ? "摄影方向" : "Photography"}
            </p>
            <h3 className="display-font mt-3 text-2xl">
              {locale === "zh" ? "摄影会成为我站点内容里的第二语言。" : "Photography is becoming the second language of this site."}
            </h3>
            <p className="mt-3 leading-7 text-black/65">
              {locale === "zh"
                ? "这部分不仅是兴趣展示，也会逐步转向更完整的作品陈列、品牌表达和副业机会承接。"
                : "This is not just a personal hobby section. It will gradually grow into a fuller portfolio, a visual branding layer, and a side-business entry point."}
            </p>
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
