import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuildTimeScript } from "@/components/shared/build-time-script";
import { getHtmlLang, hasLocale, locales } from "@/lib/i18n";
import "../../globals.css";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    return {};
  }

  return {
    title:
      lang === "zh"
        ? "程豪 | 前端工程师与 AI Agent 开发者"
        : "Hao Cheng | Frontend Engineer and AI Agent Developer",
    description:
      lang === "zh"
        ? "程豪的个人站点，展示前端工程、AI Agent 项目、技术分享与摄影内容。"
        : "Hao Cheng's personal site covering frontend engineering, AI agent projects, technical writing, and photography.",
  };
}

export default async function LocalizedRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return (
    <html lang={getHtmlLang(lang)} className="h-full antialiased">
      <body className="min-h-full">
        <BuildTimeScript />
        {children}
      </body>
    </html>
  );
}
