import { notFound } from "next/navigation";
import { MediaPage } from "@/components/page/media";
import { hasLocale } from "@/lib/i18n";

export default async function Media({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return <MediaPage locale={lang} />;
}
