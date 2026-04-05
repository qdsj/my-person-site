import type { Metadata } from "next";
import { connection } from "next/server";
import { BuildTimeScript } from "@/components/shared/build-time-script";
import { LanguageProvider } from "@/components/shared/language-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "程豪 | 前端工程师与 AI Agent 开发者",
  description:
    "程豪的个人站点，展示前端工程、AI Agent 项目、技术分享与摄影内容。",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connection();

  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full">
        <BuildTimeScript />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
