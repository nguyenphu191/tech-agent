import { getTranslations } from "next-intl/server";
import { projectBases, type ProjectBase } from "./projects-base";
import { DEMO_CATALOG, getDemoBySlug } from "./demos";
import type { Demo } from "@/types";

export type WorkType = "case-study" | "demo";

export type WorkItem = {
  type: WorkType;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  tags: string[];
  coverImage?: string;
  gallery?: string[];
  gradient?: string;
  color?: string;
  // Case-study detail fields
  description?: string;
  timeline?: string;
  problem?: string;
  solution?: string;
  results?: string;
  tech?: string[];
};

const DEMO_SLUG_RENAME: Record<string, string> = {
  "ordering-app": "ordering-app-demo",
  "product-catalog": "product-catalog-demo",
  "driver-app": "driver-app-demo",
  "note-app": "note-app-demo",
};

const DEMO_SLUG_REVERSE: Record<string, string> = {
  "ordering-app-demo": "ordering-app",
  "product-catalog-demo": "product-catalog",
  "driver-app-demo": "driver-app",
  "note-app-demo": "note-app",
};

function mapDemoSlug(demoSlug: string): string {
  return DEMO_SLUG_RENAME[demoSlug] ?? demoSlug;
}

function unmapDemoSlug(workSlug: string): string {
  return DEMO_SLUG_REVERSE[workSlug] ?? workSlug;
}

function demoToWorkItem(demo: Demo): WorkItem {
  const mappedSlug = mapDemoSlug(demo.slug);
  return {
    type: "demo",
    slug: mappedSlug,
    title: demo.title,
    shortDescription: demo.description,
    category: demo.category,
    tags: [demo.category],
    gradient: demo.gradient,
    color: demo.color,
  };
}

function projectToWorkItem(
  base: ProjectBase,
  title: string,
  shortDescription: string,
  description: string,
  timeline: string,
  problem: string,
  solution: string,
  results: string,
): WorkItem {
  return {
    type: "case-study",
    slug: base.slug,
    title,
    shortDescription,
    category: base.category,
    tags: base.tech,
    coverImage: base.coverImage,
    gallery: base.gallery,
    description,
    timeline,
    problem,
    solution,
    results,
    tech: base.tech,
  };
}

export async function getWorks(locale: string): Promise<WorkItem[]> {
  const t = await getTranslations({ locale, namespace: "projects.items" });

  const caseStudies: WorkItem[] = projectBases.map((base) =>
    projectToWorkItem(
      base,
      t(`${base.slug}.title`),
      t(`${base.slug}.shortDescription`),
      t(`${base.slug}.description`),
      t(`${base.slug}.timeline`),
      t(`${base.slug}.problem`),
      t(`${base.slug}.solution`),
      t(`${base.slug}.results`),
    ),
  );

  const demos: WorkItem[] = DEMO_CATALOG.map(demoToWorkItem);

  return [...caseStudies, ...demos];
}

export async function getWorkBySlug(
  slug: string,
  locale: string,
): Promise<WorkItem | undefined> {
  const all = await getWorks(locale);
  return all.find((w) => w.slug === slug);
}

export function getAllWorkSlugs(): string[] {
  const caseStudySlugs = projectBases.map((p) => p.slug);
  const demoSlugs = DEMO_CATALOG.map((d) => mapDemoSlug(d.slug));
  return [...caseStudySlugs, ...demoSlugs];
}

export function getDemoWorkBySlug(workSlug: string): Demo | undefined {
  const originalSlug = unmapDemoSlug(workSlug);
  return getDemoBySlug(originalSlug);
}

export async function getFeaturedWorks(
  locale: string,
  limit = 4,
): Promise<WorkItem[]> {
  const all = await getWorks(locale);
  const caseStudies = all.filter((w) => w.type === "case-study");
  return caseStudies.slice(0, limit);
}
