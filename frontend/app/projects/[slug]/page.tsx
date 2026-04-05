import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/page/project-detail";
import { getProjectBySlug, projects } from "@/lib/site-content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
