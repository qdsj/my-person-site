import { BuildTimeScript } from "@/components/shared/build-time-script";
import "../globals.css";

export default function LegacyRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full">
        <BuildTimeScript />
        {children}
      </body>
    </html>
  );
}
