import type { Metadata } from "next";
import { getMessages, getTranslations } from "next-intl/server";
import { Code2, Smartphone, Layers, Target } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const team = [
  { initials: "JD", name: "Jane Doe", role: "Founder & Lead Engineer", gradient: "from-indigo-500 to-violet-600" },
  { initials: "JM", name: "John Miller", role: "Full-Stack Developer", gradient: "from-emerald-500 to-teal-600" },
  { initials: "AL", name: "Anna Lee", role: "UI/UX Designer", gradient: "from-violet-500 to-fuchsia-600" },
  { initials: "MK", name: "Mike Kim", role: "Backend Engineer", gradient: "from-slate-600 to-indigo-700" },
];

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    title: t("aboutTitle"),
    description: t("aboutDescription"),
    openGraph: {
      title: `${t("aboutTitle")} — ${t("siteName")}`,
      description: t("aboutDescription"),
      images: [{ url: `${siteUrl}/og-about.svg`, width: 1200, height: 630 }],
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
      <section className="relative overflow-hidden border-b border-border px-4 py-16 sm:px-6 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in srgb,var(--primary) 8%,transparent),transparent_60%)]" />
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
      <section className="border-b border-border px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { value: "20+", label: "Projects shipped" },
              { value: "3+", label: "Years experience" },
              { value: "5", label: "Technologies mastered" },
            ].map((s) => (
              <Reveal key={s.label}>
                <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-colors hover:border-primary/30">
                  <span className="text-3xl font-bold text-gradient">{s.value}</span>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills with bars */}
      <section className="border-b border-border px-4 py-16 sm:px-6 md:py-20">
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
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
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
      <section className="border-b border-border px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-2xl font-bold">{t("experienceTitle")}</h2>
            <div className="relative mt-8 pl-8 before:absolute before:left-3 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-primary/40 before:to-transparent">
              {experienceItems.map((item) => (
                <div key={item} className="relative pb-8 last:pb-0">
                  <div className="absolute -left-[1.625rem] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                  <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section className="border-b border-border px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-2xl font-bold">{t("workingTitle")}</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { item: workingItems[0], icon: Code2, boxBg: "bg-primary/10 text-primary" },
                { item: workingItems[1], icon: Smartphone, boxBg: "bg-emerald-500/10 text-emerald-600" },
                { item: workingItems[2], icon: Layers, boxBg: "bg-amber-500/10 text-amber-600" },
                { item: workingItems[3], icon: Target, boxBg: "bg-rose-500/10 text-rose-600" },
              ].map((w) => {
                const Icon = w.icon;
                return (
                  <Reveal key={w.item}>
                    <div className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${w.boxBg}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="mt-3 text-sm font-medium">{w.item}</p>
                    </div>
                  </Reveal>
                );
              })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-b border-border px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-2xl font-bold">Our Team</h2>
            <p className="mt-2 text-muted-foreground">
              The people behind the work.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <Reveal key={m.name}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:border-primary/30 hover:shadow-lg">
                  <div className={`mx-auto h-20 w-20 rounded-full bg-gradient-to-br ${m.gradient} flex items-center justify-center text-xl font-bold text-white shadow-md`}>
                    {m.initials}
                  </div>
                  <h3 className="mt-4 font-semibold">{m.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
                  <div className="mt-4 flex justify-center gap-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <svg className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="GitHub"><title>GitHub</title><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                    <svg className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="LinkedIn"><title>LinkedIn</title><path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62v10.86zM5.47 7.76a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM20.34 20.1h-3.62v-5.61c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.16 1.46-2.16 2.97v5.7H9.08V9.24h3.48v1.59h.05c.48-.92 1.67-1.89 3.44-1.89 3.68 0 4.36 2.42 4.36 5.57v5.59z"/></svg>
                  </div>
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
            <div className="rounded-3xl border border-border bg-card p-10 shadow-sm surface-elevated">
              <h2 className="text-2xl font-bold">{t("cta")}</h2>
              <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                {t("intro1")}
              </p>
              <Button asChild size="lg" variant="cta" className="mt-6">
                <Link href="/contact">Start a conversation</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
