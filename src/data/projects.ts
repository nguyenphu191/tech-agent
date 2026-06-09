import { getTranslations } from "next-intl/server";
import {
  projectBases,
  type ProjectBase,
  type ProjectCategory,
} from "./projects-base";

export type { ProjectCategory };

export type Project = ProjectBase & {
  title: string;
  shortDescription: string;
  description: string;
  timeline: string;
  problem: string;
  solution: string;
  results: string;
};

export async function getLocalizedProjects(locale: string): Promise<Project[]> {
  const t = await getTranslations({ locale, namespace: "projects.items" });
  return projectBases.map((base) => ({
    ...base,
    title: t(`${base.slug}.title`),
    shortDescription: t(`${base.slug}.shortDescription`),
    description: t(`${base.slug}.description`),
    timeline: t(`${base.slug}.timeline`),
    problem: t(`${base.slug}.problem`),
    solution: t(`${base.slug}.solution`),
    results: t(`${base.slug}.results`),
  }));
}

export async function getLocalizedProject(
  slug: string,
  locale: string,
): Promise<Project | undefined> {
  const base = projectBases.find((p) => p.slug === slug);
  if (!base) return undefined;
  const t = await getTranslations({ locale, namespace: "projects.items" });
  return {
    ...base,
    title: t(`${slug}.title`),
    shortDescription: t(`${slug}.shortDescription`),
    description: t(`${slug}.description`),
    timeline: t(`${slug}.timeline`),
    problem: t(`${slug}.problem`),
    solution: t(`${slug}.solution`),
    results: t(`${slug}.results`),
  };
}

export function getAllProjectSlugs() {
  return projectBases.map((p) => p.slug);
}

export async function getFeaturedProjects(
  locale: string,
  limit = 4,
): Promise<Project[]> {
  const all = await getLocalizedProjects(locale);
  return all.slice(0, limit);
}
