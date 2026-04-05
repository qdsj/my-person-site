"use client";

import { SiteShell } from "@/components/shared/site-shell";
import { useLanguage } from "@/components/shared/language-provider";
import { getLocalizedText, mediaItems } from "@/lib/site-content";

export function MediaPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell
      kicker={{ zh: "图片与视频", en: "Images and video" }}
      title={{ zh: "媒体内容会把技术能力和摄影表达连接在一起。", en: "Media is where product demos and photography start to meet." }}
      description={{
        zh: "这里既会放摄影作品，也会放 AI Agent、知识库和语音交互相关的产品演示，作为更直观的能力展示层。",
        en: "This space will hold both photography work and product demos for AI agents, knowledge flows, and voice interaction so the capabilities are easier to feel.",
      }}
    >
      <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mediaItems.map((item, index) => (
          <article
            key={item.id}
            className="animated-rise rounded-[24px] border border-black/8 bg-white/80 p-5 sm:rounded-[28px] sm:p-6"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="rounded-[20px] bg-gradient-to-br from-[rgba(29,107,86,0.12)] via-white to-[rgba(180,92,61,0.16)] p-4 sm:rounded-[22px] sm:p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-black/45">
                {item.kind === "video"
                  ? locale === "zh"
                    ? "视频"
                    : "Video"
                  : locale === "zh"
                    ? "图片"
                    : "Image"}
              </p>
              <h2 className="display-font mt-3 text-xl sm:text-2xl">
                {getLocalizedText(item.title, locale)}
              </h2>
              <p className="mt-3 min-h-0 leading-7 text-black/65 md:min-h-28">
                {getLocalizedText(item.description, locale)}
              </p>
            </div>
            <div className="text-safe-wrap mt-5 flex flex-col items-start gap-2 text-sm text-black/55 sm:flex-row sm:items-center sm:justify-between">
              <span>{item.format}</span>
              <span>{item.duration ?? (locale === "zh" ? "静态资源" : "Static asset")}</span>
            </div>
          </article>
        ))}
      </div>
    </SiteShell>
  );
}
