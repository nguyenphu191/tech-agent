import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/data/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
    openGraph: {
      title: `${t("contactTitle")} — ${t("siteName")}`,
      description: t("contactDescription"),
      images: [{ url: `${siteUrl}/og-contact.svg`, width: 1200, height: 630 }],
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const tf = await getTranslations({ locale, namespace: "footer" });

  return (
    <main className="flex-1 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
          </Reveal>
          <Reveal>
          <ul className="mt-10 space-y-6 text-sm">
            <li className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t("emailLabel")}</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {siteConfig.email}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t("phoneLabel")}</p>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="text-muted-foreground hover:text-primary"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{t("locationLabel")}</p>
                <p className="text-muted-foreground">{tf("locationValue")}</p>
              </div>
            </li>
          </ul>
          </Reveal>
        </div>
        <Reveal>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <ContactForm />
        </div>
        </Reveal>
      </div>
    </main>
  );
}
