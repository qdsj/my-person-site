import { notFound } from "next/navigation";
import { HomePage } from "@/components/page/home";
import { hasLocale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return <HomePage locale={lang} />;
}
