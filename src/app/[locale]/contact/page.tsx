import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/data/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("contactTitle"),
    description: t("contactDescription"),
    openGraph: {
      title: `${t("contactTitle")} — ${t("siteName")}`,
      description: t("contactDescription"),
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
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">{t("subtitle")}</p>
          <ul className="mt-10 space-y-6 text-sm">
            <li className="flex gap-4">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
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
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
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
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium">{t("locationLabel")}</p>
                <p className="text-muted-foreground">{tf("locationValue")}</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-card/40 p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
