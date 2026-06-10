import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SafeImage } from "@/components/ui/safe-image";
import { Button } from "@/components/ui/button";
import {
  getAllWorkSlugs,
  getWorkBySlug,
  getWorks,
  getDemoWorkBySlug,
  type WorkItem,
} from "@/data/works";
import { routing } from "@/i18n/routing";
import { Reveal } from "@/components/motion/reveal";
import { ParticleNetwork } from "@/components/animations/ParticleNetwork";
import { ProjectImageCarousel } from "@/components/ui/ProjectImageCarousel";
import { DemoRenderer } from "@/components/demos/demo-renderer";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getAllWorkSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const work = await getWorkBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "meta" });
  if (!work) return { title: t("notFound") };
  return {
    title: work.title,
    description: work.shortDescription,
    openGraph: {
      title: work.title,
      description: work.shortDescription,
      images: work.coverImage ? [{ url: work.coverImage }] : [],
    },
  };
}

async function CaseStudyDetail({ work, locale }: { work: WorkItem; locale: string }) {
  const allWorks = await getWorks(locale);
  const sameTypeWorks = allWorks.filter((w) => w.type === "case-study");
  const currentIdx = sameTypeWorks.findIndex((w) => w.slug === work.slug);
  const prevProject = currentIdx > 0 ? sameTypeWorks[currentIdx - 1] : null;
  const nextProject =
    currentIdx < sameTypeWorks.length - 1
      ? sameTypeWorks[currentIdx + 1]
      : null;
  const relatedProjects = sameTypeWorks.filter(
    (w) => w.slug !== work.slug && w.category === work.category,
  ).slice(0, 3);

  const allImages = [work.coverImage, ...(work.gallery || [])].filter(Boolean) as string[];

  return (
    <main className="flex-1 relative overflow-hidden">
      <ParticleNetwork variant="light" />
      <article className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <Button
          variant="ghost"
          asChild
          className="mb-8 -ml-2 gap-2 text-muted-foreground hover:text-foreground"
        >
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>

        <div className="relative">
          <ProjectImageCarousel images={allImages} />
          <span className="absolute bottom-6 left-6 z-20 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur-sm">
            {work.category}
          </span>
        </div>

        <Reveal>
        <header className="mt-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {work.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            {work.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {work.tech?.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs"
              >
                {tech}
              </span>
            ))}
            {work.timeline && (
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
                {work.timeline}
              </span>
            )}
          </div>
        </header>
        </Reveal>

        <Reveal>
        <div className="mt-14 flex flex-col gap-12 lg:flex-row">
          <div className="min-w-0 flex-1">
            <div className="grid gap-12 md:grid-cols-2">
              {work.problem && (
                <section>
                  <h2 className="text-lg font-semibold text-primary">Problem</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {work.problem}
                  </p>
                </section>
              )}
              {work.solution && (
                <section>
                  <h2 className="text-lg font-semibold text-primary">Solution</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {work.solution}
                  </p>
                </section>
              )}
            </div>

            {work.results && (
              <section className="mt-14 rounded-2xl border border-border bg-card p-8 shadow-sm">
                <h2 className="text-lg font-semibold text-primary">Results</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {work.results}
                </p>
                <Button asChild variant="cta" className="mt-6">
                  <Link href="/contact">Start a similar project</Link>
                </Button>
              </section>
            )}

            <nav className="mt-16 flex items-center justify-between gap-4 border-t border-border pt-8">
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
          </div>

          {relatedProjects.length > 0 && (
            <aside className="w-full shrink-0 lg:w-72">
              <div className="lg:sticky lg:top-24">
                <h2 className="text-lg font-bold">Related projects</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {relatedProjects.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/projects/${rp.slug}`}
                      className="group flex gap-4 overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 lg:flex-col lg:p-0"
                    >
                      <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl lg:hidden">
                        <SafeImage
                          src={rp.coverImage || "/images/default.png"}
                          alt={rp.title}
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="80px"
                          fallback="/images/default.png"
                        />
                      </div>
                      <div className="relative hidden aspect-video w-full overflow-hidden lg:block">
                        <SafeImage
                          src={rp.coverImage || "/images/default.png"}
                          alt={rp.title}
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="288px"
                          fallback="/images/default.png"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold transition-colors group-hover:text-primary">
                          {rp.title}
                        </h3>
                        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                          {rp.shortDescription}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
        </Reveal>
      </article>
    </main>
  );
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const work = await getWorkBySlug(slug, locale);

  if (!work) notFound();

  if (work.type === "demo") {
    const demo = getDemoWorkBySlug(slug);
    if (!demo) notFound();
    return (
      <DemoRenderer
        workSlug={slug}
        title={demo.title}
        description={demo.description}
        gradient={demo.gradient}
      />
    );
  }

  return <CaseStudyDetail work={work} locale={locale} />;
}
