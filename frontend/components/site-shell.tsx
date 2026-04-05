"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { getLocalizedText, navItems, type LocalizedText } from "@/lib/site-content";

type SiteShellProps = {
  title: LocalizedText;
  description: LocalizedText;
  kicker?: LocalizedText;
  children: React.ReactNode;
};

export function SiteShell({
  title,
  description,
  kicker,
  children,
}: SiteShellProps) {
  const pathname = usePathname();
  const { locale, setLocale } = useLanguage();

  return (
    <div className="page-shell">
      <div className="page-frame">
        <header className="border-b border-black/8 px-4 py-4 sm:px-6 sm:py-5 md:px-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <Link
                href="/"
                className="display-font text-[2rem] leading-none text-[var(--accent-strong)] sm:text-3xl"
              >
                Chengtong Xue
              </Link>
              <p className="max-w-2xl text-sm leading-6 text-black/60">
                {locale === "zh"
                  ? "个人品牌站 / 作品展示 / AI 分身 / 单管理员后台"
                  : "Personal brand / portfolio / AI persona / single-admin CMS"}
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 md:w-auto md:items-end">
              <nav className="grid w-full grid-cols-3 gap-2 rounded-[24px] border border-black/10 bg-white/70 p-2 md:flex md:w-auto md:flex-wrap md:justify-end md:rounded-full md:p-1">
                {navItems.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex min-h-11 items-center justify-center rounded-full px-3 py-2 text-center text-sm leading-5 transition sm:px-4 ${
                        active
                          ? "bg-[var(--accent)] text-white"
                          : "text-black/65 hover:bg-black/5"
                      }`}
                    >
                      {getLocalizedText(item.label, locale)}
                    </Link>
                  );
                })}
              </nav>
              <div className="flex self-start rounded-full border border-black/10 bg-white/70 p-1 text-sm md:self-end">
                {(["zh", "en"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLocale(option)}
                    className={`min-h-11 rounded-full px-4 py-2 transition ${
                      locale === option
                        ? "bg-[var(--secondary)] text-white"
                        : "text-black/60 hover:bg-black/5"
                    }`}
                  >
                    {option.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12">
          <section className="animated-rise space-y-3 border-b border-dashed border-black/10 pb-8 sm:space-y-4 sm:pb-10">
            {kicker ? (
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[var(--secondary)] sm:tracking-[0.24em]">
                {getLocalizedText(kicker, locale)}
              </p>
            ) : null}
            <h1 className="display-font max-w-4xl text-[clamp(2.5rem,9vw,4.75rem)] leading-[1.05]">
              {getLocalizedText(title, locale)}
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-black/65 sm:text-base md:text-lg md:leading-8">
              {getLocalizedText(description, locale)}
            </p>
          </section>
          <section className="pt-8 sm:pt-10">{children}</section>
        </main>
        <footer className="border-t border-black/8 px-4 py-5 text-sm text-black/55 sm:px-6 sm:py-6 md:px-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-safe-wrap leading-6">
              {locale === "zh"
                ? "Next.js 前端位于 frontend/，Nest 风格 API 骨架位于 backend/。"
                : "The Next.js frontend lives in frontend/, and the Nest-style API scaffold lives in backend/."}
            </p>
            <p className="text-safe-wrap leading-6">
              {locale === "zh"
                ? "当前为可扩展骨架，后续接入真实数据库、对象存储和模型接口。"
                : "This is an extensible scaffold ready for real database, storage, and model integrations."}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
