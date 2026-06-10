import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    title: t("projectsTitle"),
    description: t("projectsDescription"),
    openGraph: {
      title: `${t("projectsTitle")} — ${t("siteName")}`,
      description: t("projectsDescription"),
      images: [{ url: `${siteUrl}/og-projects.svg`, width: 1200, height: 630 }],
    },
  };
}

export default function ProjectsLayout({ children }: Props) {
  return children;
}
