import { getWorks } from "@/data/works";
import { ProjectsClient } from "./projects-client";

type Props = { params: Promise<{ locale: string }> };

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const items = await getWorks(locale);
  return <ProjectsClient items={items} />;
}
