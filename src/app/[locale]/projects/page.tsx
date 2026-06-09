import { getLocalizedProjects } from "@/data/projects";
import { ProjectsClient } from "./projects-client";

type Props = { params: Promise<{ locale: string }> };

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const projects = await getLocalizedProjects(locale);
  return <ProjectsClient projects={projects} />;
}
