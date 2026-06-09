import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    openGraph: {
      title: `${t("aboutTitle")} — ${t("siteName")}`,
      description: t("aboutDescription"),
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const messages = await getMessages();
  const ap = messages.aboutPage as {
    skills: string[];
    experienceItems: string[];
    workingItems: string[];
  };
  const { skills, experienceItems, workingItems } = ap;

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5 px-4 py-16 sm:px-6 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_60%)]" />
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-left">
              {/* Avatar placeholder */}
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5 p-1 md:h-40 md:w-40">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/5 text-4xl font-bold text-primary">
                  MTA
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {t("title")}
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {t("intro1")}
                </p>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {t("intro2")}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-white/5 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { value: "20+", label: "Projects shipped" },
              { value: "3+", label: "Years experience" },
              { value: "5", label: "Technologies mastered" },
            ].map((s) => (
              <Reveal key={s.label}>
                <div className="rounded-2xl border border-white/5 bg-card/30 p-6 text-center backdrop-blur-sm transition-colors hover:border-primary/20">
                  <span className="text-3xl font-bold text-gradient">{s.value}</span>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills with bars */}
      <section className="border-b border-white/5 px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-2xl font-bold">{t("skillsTitle")}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                [skills[0], 85],
                [skills[1], 75],
                [skills[2], 90],
                [skills[3], 70],
                [skills[4], 80],
                [skills[5], 65],
              ].map(([name, level]) => (
                <div key={name as string}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{name as string}</span>
                    <span className="text-muted-foreground">{level}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-700"
                      style={{ width: `${level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience timeline */}
      <section className="border-b border-white/5 px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-2xl font-bold">{t("experienceTitle")}</h2>
            <div className="relative mt-8 pl-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-primary/40 before:to-transparent">
              {experienceItems.map((item) => (
                <div key={item} className="relative pb-8 last:pb-0">
                  <div className="absolute -left-[1.625rem] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                  <div className="rounded-xl border border-white/5 bg-card/30 p-4 backdrop-blur-sm">
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section className="border-b border-white/5 px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-2xl font-bold">{t("workingTitle")}</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { item: workingItems[0], icon: "⌨️" },
              { item: workingItems[1], icon: "📱" },
              { item: workingItems[2], icon: "🏗️" },
              { item: workingItems[3], icon: "🎯" },
            ].map((w) => (
              <Reveal key={w.item}>
                <div className="group rounded-2xl border border-white/5 bg-card/30 p-5 backdrop-blur-sm transition-all hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5">
                  <span className="text-2xl">{w.icon}</span>
                  <p className="mt-3 text-sm font-medium">{w.item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-card/30 p-10 backdrop-blur-sm">
              <h2 className="text-2xl font-bold">{t("cta")}</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                {t("intro1")}
              </p>
              <Button asChild size="lg" className="mt-6 rounded-full">
                <Link href="/contact">Start a conversation</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
