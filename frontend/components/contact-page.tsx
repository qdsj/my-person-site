"use client";

import { SiteShell } from "@/components/site-shell";
import { useLanguage } from "@/components/language-provider";
import { collaborationNotes, contactPoints, getLocalizedText } from "@/lib/site-content";

export function ContactPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell
      kicker={{ zh: "联系与合作", en: "Contact and collaboration" }}
      title={{ zh: "如果要合作，这一页应该让人快速知道怎么联系你。", en: "If someone wants to collaborate, this page should make the next step obvious." }}
      description={{
        zh: "当前版本以邮箱、电话和掘金为主，先把高频沟通入口放清楚。后续如果接表单，也可以由后端统一处理验证、通知和线索沉淀。",
        en: "The current version focuses on email, phone, and Juejin so the most useful contact paths are obvious first. A form can be added later and handled by the backend.",
      }}
    >
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-4">
          {contactPoints.map((point, index) => (
            <article
              key={point.value}
              className="animated-rise rounded-[24px] border border-black/8 bg-white/80 p-5 sm:rounded-[28px] sm:p-6"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-black/45">
                {getLocalizedText(point.label, locale)}
              </p>
              <p className="text-safe-wrap mt-3 text-lg leading-7 text-black/75 sm:text-xl">
                {point.value}
              </p>
            </article>
          ))}
        </section>

        <aside className="rounded-[24px] border border-black/8 bg-[var(--surface)] p-5 sm:rounded-[28px] sm:p-7">
          <h2 className="display-font text-2xl sm:text-3xl">
            {locale === "zh" ? "适合合作前先对齐的事情" : "What to align on before collaborating"}
          </h2>
          <ul className="mt-4 space-y-4 leading-7 text-black/65">
            {collaborationNotes.map((item) => (
              <li key={item.zh}>{getLocalizedText(item, locale)}</li>
            ))}
          </ul>
        </aside>
      </div>
    </SiteShell>
  );
}
