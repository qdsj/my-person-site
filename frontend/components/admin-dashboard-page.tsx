"use client";

import Link from "next/link";
import { SiteShell } from "@/components/site-shell";
import { useLanguage } from "@/components/language-provider";
import { adminModules, getLocalizedText } from "@/lib/site-content";

export function AdminDashboardPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell
      kicker={{ zh: "后台控制台", en: "Admin console" }}
      title={{ zh: "把内容维护变成一个稳定流程。", en: "Turn content maintenance into a stable workflow." }}
      description={{
        zh: "后台在前端中负责管理界面，在后端中负责真正的数据写入、上传和索引流程。这里先把模块边界和页面结构立起来。",
        en: "The frontend owns the admin UI while the backend owns persistence, upload logic, and indexing workflows. This page establishes the module boundaries and screen structure.",
      }}
    >
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="grid gap-4 md:grid-cols-2">
          {adminModules.map((module, index) => (
            <article
              key={module.title.zh}
              className="animated-rise rounded-[24px] border border-black/8 bg-white/80 p-5 sm:rounded-[28px] sm:p-6"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <h2 className="display-font text-xl sm:text-2xl">
                {getLocalizedText(module.title, locale)}
              </h2>
              <p className="mt-3 leading-7 text-black/65">
                {getLocalizedText(module.description, locale)}
              </p>
            </article>
          ))}
        </section>

        <aside className="space-y-4">
          <div className="rounded-[24px] border border-black/8 bg-[var(--surface)] p-5 sm:rounded-[28px] sm:p-6">
            <p className="display-font text-xl sm:text-2xl">
              {locale === "zh" ? "后台能力边界" : "Admin boundaries"}
            </p>
            <ul className="text-safe-wrap mt-4 space-y-3 leading-7 text-black/65">
              <li>{locale === "zh" ? "登录由 NestJS `/api/v1/auth/login` 处理。" : "Login is handled by NestJS `/api/v1/auth/login`."}</li>
              <li>{locale === "zh" ? "上传通过对象存储直传或经后端签名上传。" : "Uploads go through direct object storage upload or signed backend upload."}</li>
              <li>{locale === "zh" ? "知识库发布后触发切分、Embedding 和 reindex。" : "Publishing knowledge content triggers chunking, embeddings, and reindexing."}</li>
            </ul>
          </div>
          <Link
            href="/admin/login"
            className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white sm:w-auto"
          >
            {locale === "zh" ? "前往登录页" : "Open login page"}
          </Link>
        </aside>
      </div>
    </SiteShell>
  );
}
