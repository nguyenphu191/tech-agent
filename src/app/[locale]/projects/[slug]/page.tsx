import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  getAllProjectSlugs,
  getLocalizedProject,
  getLocalizedProjects,
} from "@/data/projects";
import { routing } from "@/i18n/routing";
import { ParticleNetwork } from "@/components/animations/ParticleNetwork";

import { ProjectImageCarousel } from "@/components/ui/ProjectImageCarousel";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getLocalizedProject(slug, locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  if (!project) return { title: t("notFound") };
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const project = await getLocalizedProject(slug, locale);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "projectDetail" });
  const tCat = await getTranslations({ locale, namespace: "categories" });

  const allImages = [project.coverImage, ...project.gallery];
  const allProjects = await getLocalizedProjects(locale);
  const currentIdx = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIdx > 0 ? allProjects[currentIdx - 1] : null;
  const nextProject =
    currentIdx < allProjects.length - 1 ? allProjects[currentIdx + 1] : null;
  const relatedProjects = allProjects.filter(
    (p) => p.slug !== slug && p.category === project.category,
  ).slice(0, 3);

  return (
    <main className="flex-1 relative overflow-hidden">
      <ParticleNetwork />
      <article className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <Button
          variant="ghost"
          asChild
          className="mb-8 -ml-2 gap-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>
        </Button>

        <div className="relative">
          <ProjectImageCarousel images={allImages} />
          <span className="absolute bottom-6 left-6 z-20 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            {tCat(project.category)}
          </span>
        </div>

        <header className="mt-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs"
              >
                {tech}
              </span>
            ))}
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
              {project.timeline}
            </span>
          </div>
        </header>

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <section>
            <h2 className="text-lg font-semibold text-primary">{t("problem")}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {project.problem}
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-primary">{t("solution")}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {project.solution}
            </p>
          </section>
        </div>

        <section className="mt-14 rounded-2xl border border-white/10 bg-card/40 p-8">
          <h2 className="text-lg font-semibold text-primary">{t("results")}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {project.results}
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link href="/contact">{t("similarCta")}</Link>
          </Button>
        </section>

        {/* Prev / Next navigation */}
        <nav className="mt-16 flex items-center justify-between gap-4 border-t border-white/5 pt-8">
          {prevProject ? (
            <Button variant="ghost" asChild className="group gap-2">
              <Link href={`/projects/${prevProject.slug}`}>
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span className="text-left">
                  <span className="block text-xs text-muted-foreground">Previous</span>
                  <span className="block text-sm font-medium">{prevProject.title}</span>
                </span>
              </Link>
            </Button>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Button variant="ghost" asChild className="group gap-2">
              <Link href={`/projects/${nextProject.slug}`}>
                <span className="text-right">
                  <span className="block text-xs text-muted-foreground">Next</span>
                  <span className="block text-sm font-medium">{nextProject.title}</span>
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          ) : (
            <div />
          )}
        </nav>

        {/* Related projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold">Related projects</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/projects/${rp.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/5 bg-card/20 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={rp.coverImage}
                      alt={rp.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold transition-colors group-hover:text-primary">
                      {rp.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {rp.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
