"use client";

import { SiteShell } from "@/components/site-shell";
import { useLanguage } from "@/components/language-provider";
import { getLocalizedText, mediaItems } from "@/lib/site-content";

export function MediaPage() {
  const { locale } = useLanguage();

  return (
    <SiteShell
      kicker={{ zh: "图片与视频", en: "Images and video" }}
      title={{ zh: "把静态资料变成更有感受力的表达层。", en: "Turn static content into a more sensory presentation layer." }}
      description={{
        zh: "媒体页展示未来接入对象存储后的公共体验形态，包括图片卡片、视频条目、封面和摘要信息。",
        en: "The media page previews how public-facing media will look once object storage is connected, including image cards, video entries, covers, and summaries.",
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
