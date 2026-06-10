import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Noto_Sans_SC } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type AppLocale } from "@/i18n/routing";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/theme/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansSc = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("siteTitleDefault"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("siteDescription"),
    openGraph: {
      type: "website",
      locale:
        locale === "vi"
          ? "vi_VN"
          : locale === "en"
            ? "en_US"
            : locale === "fr"
              ? "fr_FR"
              : locale === "de"
                ? "de_DE"
                : "zh_CN",
      siteName: t("siteName"),
      images: [{ url: `${siteUrl}/og-default.svg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const fontClass =
    locale === "zh"
      ? `${notoSansSc.variable} ${geistMono.variable}`
      : `${geistSans.variable} ${geistMono.variable}`;

  return (
    <html
      lang={locale}
      className={`${fontClass} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`min-h-full flex flex-col font-sans ${locale === "zh" ? "font-[family-name:var(--font-noto-sc)]" : ""}`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <SiteHeader />
            <div className="flex flex-1 flex-col">{children}</div>
            <SiteFooter />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
