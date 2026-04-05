import type { Metadata } from "next";
import Script from "next/script";
import { LanguageProvider } from "@/components/language-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "程豪 | 前端工程师与 AI Agent 开发者",
  description:
    "程豪的个人站点，展示前端工程、AI Agent 项目、技术分享与摄影内容。",
};

const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME ?? "";
const buildTimeScript = `
  (() => {
    if (typeof window === "undefined") return;
    if (window.__PROJECT_BUILD_TIME_LOGGED__) return;
    window.__PROJECT_BUILD_TIME_LOGGED__ = true;
    window.__PROJECT_BUILD_TIME__ = ${JSON.stringify(buildTime)};
    console.log("[build time]", window.__PROJECT_BUILD_TIME__);
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full">
        <Script id="project-build-time" strategy="afterInteractive">
          {buildTimeScript}
        </Script>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
