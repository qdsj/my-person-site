import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/page/project-detail";
import { hasLocale, locales } from "@/lib/i18n";
import { getProjectBySlug, projects } from "@/lib/site-content";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.map((project) => ({
      lang,
      slug: project.slug,
    })),
  );
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage locale={lang} project={project} />;
}
