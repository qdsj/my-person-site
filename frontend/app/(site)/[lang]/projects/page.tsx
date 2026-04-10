import { notFound } from "next/navigation";
import { ProjectsPage } from "@/components/page/projects";
import { hasLocale } from "@/lib/i18n";

export default async function Projects({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return <ProjectsPage locale={lang} />;
}
