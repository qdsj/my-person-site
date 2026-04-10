import Link from "next/link";
import { getLocalizedHref } from "@/lib/i18n";
import { getLocalizedText, navItems, type LocalizedText } from "@/lib/site-content";
import type { Locale } from "@/lib/site-content";

type SiteShellProps = {
  locale: Locale;
  currentPath: string;
  activeNav?: (typeof navItems)[number]["href"];
  showLocaleSwitcher?: boolean;
  title: LocalizedText;
  description: LocalizedText;
  kicker?: LocalizedText;
  children: React.ReactNode;
};

export function SiteShell({
  locale,
  currentPath,
  activeNav,
  showLocaleSwitcher = true,
  title,
  description,
  kicker,
  children,
}: SiteShellProps) {
  return (
    <div className="page-shell">
      <div className="page-frame">
        <header className="border-b border-black/8 px-4 py-4 sm:px-6 sm:py-5 md:px-8 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-3">
                <Link
                  href={getLocalizedHref(locale)}
                  className="display-font text-[2rem] leading-none text-[var(--accent-strong)] sm:text-3xl"
                >
                  Hao Cheng
                </Link>
                {showLocaleSwitcher ? (
                  <div className="flex shrink-0 rounded-full border border-black/10 bg-white/70 p-1 text-sm lg:hidden">
                    {(["zh", "en"] as const).map((option) => (
                      <Link
                        key={option}
                        href={getLocalizedHref(option, currentPath)}
                        className={`min-h-9 rounded-full px-3 py-1.5 text-xs transition sm:min-h-10 sm:px-3.5 sm:py-2 sm:text-sm ${
                          locale === option
                            ? "bg-[var(--secondary)] text-white"
                            : "text-black/60 hover:bg-black/5"
                        }`}
                      >
                        {option.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
              <p className="max-w-2xl text-sm leading-6 text-black/60">
                {locale === "zh"
                  ? "前端工程 / AI Agent / 技术分享 / 摄影表达"
                  : "Frontend engineering / AI agents / technical writing / photography"}
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row lg:items-start lg:justify-end">
              <nav className="grid w-full grid-cols-3 gap-2 rounded-[24px] border border-black/10 bg-white/70 p-2 lg:w-auto lg:grid-cols-none lg:auto-cols-max lg:grid-flow-col lg:rounded-full lg:p-1">
                {navItems.map((item) => {
                  const active = activeNav === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={getLocalizedHref(locale, item.href)}
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
              {showLocaleSwitcher ? (
                <div className="hidden rounded-full border border-black/10 bg-white/70 p-1 text-sm lg:flex lg:shrink-0">
                  {(["zh", "en"] as const).map((option) => (
                    <Link
                      key={option}
                      href={getLocalizedHref(option, currentPath)}
                      className={`min-h-9 rounded-full px-3 py-1.5 text-xs transition sm:min-h-10 sm:px-3.5 sm:py-2 sm:text-sm ${
                        locale === option
                          ? "bg-[var(--secondary)] text-white"
                          : "text-black/60 hover:bg-black/5"
                      }`}
                    >
                      {option.toUpperCase()}
                    </Link>
                  ))}
                </div>
              ) : null}
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
                ? "这个站点用于承载我的项目经历、AI 能力、技术分享和摄影内容。"
                : "This site brings together my project work, AI capabilities, technical writing, and photography."}
            </p>
            <p className="text-safe-wrap leading-6">
              {locale === "zh"
                ? "后续会继续接入真实知识库、媒体资源和更完整的 AI Agent 工作流。"
                : "It will keep expanding with a real knowledge base, media assets, and a fuller AI agent workflow."}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
