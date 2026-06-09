import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServicesFaq, type FaqItem } from "@/components/services/services-faq";
import { Reveal } from "@/components/motion/reveal";
import { ServiceGallery } from "@/components/sections/services-gallery";
import {
  pricingTierIds,
  serviceList,
  type PricingTierId,
} from "@/data/services";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("servicesTitle"),
    description: t("servicesDescription"),
    openGraph: {
      title: `${t("servicesTitle")} — ${t("siteName")}`,
      description: t("servicesDescription"),
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  const tc = await getTranslations({ locale, namespace: "servicesPage.cards" });
  const tp = await getTranslations({ locale, namespace: "servicesPage.pricing" });
  const messages = await getMessages();
  const faq = (messages as { servicesPage: { faq: FaqItem[] } }).servicesPage
    .faq;

  return (
    <main className="flex-1">
      <section className="border-b border-border px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              {t("eyebrow")}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              {t("intro")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl space-y-20">
          {serviceList.map((s, index) => {
            const Icon = s.icon;
            const includes = tc.raw(`${s.id}.includes`) as string[];
            return (
              <Reveal key={s.id} delay={index * 0.03}>
                <article
                  id={s.id}
                  className={`overflow-hidden rounded-3xl border border-border ${s.gradient} p-8 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-md hover:shadow-primary/5 md:p-10`}
                >
                  {/* Grid with image and content */}
                  <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
                    {/* Content Section */}
                    <div className="flex flex-col justify-between">
                      <div>
                        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} bg-opacity-20 text-transparent bg-clip-text`}>
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <h2 className="mt-6 text-2xl font-bold">{tc(`${s.id}.title`)}</h2>
                        <p className="mt-3 text-muted-foreground">
                          {tc(`${s.id}.description`)}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {s.tech.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md bg-secondary px-2 py-1 text-xs transition-colors hover:bg-secondary/80 text-secondary-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Includes Section */}
                      <div>
                        <h3 className="text-sm font-semibold text-muted-foreground">
                          {t("scopeTitle")}
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {includes.map((item) => (
                            <li key={item} className="flex gap-3 text-sm">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="flex flex-col items-center justify-center">
                      <ServiceGallery
                        images={s.images}
                        title={tc(`${s.id}.title`)}
                        color={s.color}
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-3xl font-bold">{t("pricingTitle")}</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {t("pricingNote")}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pricingTierIds.map((tierId: PricingTierId, i) => {
              const highlighted = tierId === "pro";
              const features = tp.raw(`${tierId}.features`) as string[];
              return (
                <Reveal key={tierId} delay={i * 0.05}>
                  <div
                    className={`flex h-full flex-col rounded-2xl border p-6 ${
                      highlighted
                        ? "border-primary/50 bg-primary/10 shadow-lg shadow-primary/10"
                        : "border-border bg-card shadow-sm"
                    }`}
                  >
                    <h3 className="text-lg font-semibold">
                      {tp(`${tierId}.name`)}
                    </h3>
                    <p className="mt-2 text-2xl font-bold text-gradient">
                      {tp(`${tierId}.price`)}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {tp(`${tierId}.description`)}
                    </p>
                    <ul className="mt-6 flex-1 space-y-2 text-sm">
                      {features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <Check className="h-4 w-4 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="mt-8 w-full rounded-full">
                      <Link href="/contact">{t("contactQuote")}</Link>
                    </Button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-bold">{t("faqTitle")}</h2>
          </Reveal>
          <ServicesFaq items={faq} />
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-3xl border border-border bg-card shadow-sm p-10 text-center">
          <h2 className="text-2xl font-bold">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            {t("ctaSubtitle")}
          </p>
          <Button asChild size="lg" className="mt-6 rounded-full">
            <Link href="/contact">{t("ctaButton")}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
