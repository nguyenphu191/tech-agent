import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HeroSection } from "@/components/sections/hero-section";
import { SocialProofSection } from "@/components/sections/social-proof-section";
import { ServicesPreviewSection } from "@/components/sections/services-preview-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CtaSection } from "@/components/sections/cta-section";
import { getFeaturedWorks } from "@/data/works";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    openGraph: {
      title: t("siteTitleDefault"),
      description: t("homeDescription"),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const featured = await getFeaturedWorks(locale, 4);

  return (
    <>
      <HeroSection />
      <SocialProofSection />
      <ServicesPreviewSection />
      <FeaturedProjectsSection projects={featured} />
      <ProcessSection />
      <TechStackSection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
