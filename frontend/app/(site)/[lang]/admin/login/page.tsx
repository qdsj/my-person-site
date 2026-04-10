import { notFound } from "next/navigation";
import { AdminLoginPage } from "@/components/page/admin-login";
import { hasLocale } from "@/lib/i18n";

export default async function AdminLogin({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return <AdminLoginPage locale={lang} />;
}
