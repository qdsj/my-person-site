import { notFound } from "next/navigation";
import { AdminDashboardPage } from "@/components/page/admin-dashboard";
import { hasLocale } from "@/lib/i18n";

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return <AdminDashboardPage locale={lang} />;
}
