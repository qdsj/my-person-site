"use client";

import { SiteShell } from "@/components/site-shell";
import { useLanguage } from "@/components/language-provider";
import { contactPoints, getLocalizedText } from "@/lib/site-content";

export function ContactPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell
      kicker={{ zh: "联系与合作", en: "Contact and collaboration" }}
      title={{ zh: "给访客一个清晰的下一步。", en: "Give visitors a clear next step." }}
      description={{
        zh: "联系页保持轻量，但要足够清楚。v1 以邮箱和社交入口为主，避免过早引入复杂表单流程。",
        en: "Keep the contact page light but clear. Version one focuses on email and social entry points instead of introducing a complex form workflow too early.",
      }}
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-4">
          {contactPoints.map((point, index) => (
            <article
              key={point.value}
              className="animated-rise rounded-[28px] border border-black/8 bg-white/80 p-6"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                {getLocalizedText(point.label, locale)}
              </p>
              <p className="mt-3 text-xl text-black/75">{point.value}</p>
            </article>
          ))}
        </section>

        <aside className="rounded-[28px] border border-black/8 bg-[var(--surface)] p-7">
          <h2 className="display-font text-3xl">
            {locale === "zh" ? "适合放在这里的信息" : "What belongs here"}
          </h2>
          <ul className="mt-4 space-y-4 leading-7 text-black/65">
            <li>
              {locale === "zh"
                ? "你擅长的合作类型，比如咨询、顾问、全职机会或创作合作。"
                : "The collaboration formats you are open to, such as advisory work, product building, or creative partnerships."}
            </li>
            <li>
              {locale === "zh"
                ? "希望对方联系前先了解的内容，例如项目方向、时间窗口或预算范围。"
                : "Anything you want people to understand before they reach out, such as scope, timing, or budget range."}
            </li>
            <li>
              {locale === "zh"
                ? "若后续增加表单，可以由 NestJS API 统一做验证、限流与通知。"
                : "If you add a form later, the NestJS API can handle validation, rate limiting, and notifications."}
            </li>
          </ul>
        </aside>
      </div>
    </SiteShell>
  );
}
