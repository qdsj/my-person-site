import { notFound } from "next/navigation";
import { ContactPage } from "@/components/page/contact";
import { hasLocale } from "@/lib/i18n";

export default async function Contact({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return <ContactPage locale={lang} />;
}
