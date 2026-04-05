"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import {
  featuredHighlights,
  getLocalizedText,
  hero,
  profile,
  projects,
} from "@/lib/site-content";
import { useLanguage } from "@/components/language-provider";

export function HomePage() {
  const { locale } = useLanguage();

  return (
    <SiteShell
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
                href="/chat"
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--accent-strong)]"
              >
                {getLocalizedText(hero.primaryCta, locale)}
              </Link>
              <Link
                href="/projects"
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
              href={`/projects/${project.slug}`}
              className="mt-6 inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2 text-sm font-medium hover:bg-black/5"
            >
              {locale === "zh" ? "查看详情" : "View details"}
            </Link>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
