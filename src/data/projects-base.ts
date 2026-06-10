export type ProjectCategory = "web" | "mobile" | "uiux" | "dashboard";

export type ProjectBase = {
  slug: string;
  category: ProjectCategory;
  tech: string[];
  coverImage: string;
  gallery: string[];
};

/** Shared assets & taxonomy — copy lives in messages/{locale}.json under `projects.items` */
export const projectBases: ProjectBase[] = [
  {
    slug: "ecommerce-analytics",
    category: "dashboard",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "TailwindCSS"],
    coverImage: "/images/projects/ecommerce-analytics.webp",
    gallery: [
      "/images/projects/ecommerce-analytics-1.webp",
      "/images/projects/ecommerce-analytics-2.webp",
    ],
  },
  {
    slug: "fitness-companion-app",
    category: "mobile",
    tech: ["Flutter", "Firebase", "Node.js"],
    coverImage: "/images/projects/fitness-companion-app.webp",
    gallery: [
      "/images/projects/fitness-companion-app-1.webp",
    ],
  },
  {
    slug: "saas-landing-rebrand",
    category: "uiux",
    tech: ["Figma", "Next.js", "Framer Motion"],
    coverImage: "/images/projects/saas-landing-rebrand.webp",
    gallery: [
      "/images/projects/saas-landing-rebrand-1.webp",
    ],
  },
  {
    slug: "booking-portal-web",
    category: "web",
    tech: ["Next.js", "Prisma", "Stripe"],
    coverImage: "/images/projects/booking-portal-web.webp",
    gallery: [
      "/images/projects/booking-portal-web-1.webp",
    ],
  },
  {
    slug: "corporate-identity",
    category: "web",
    tech: ["Next.js", "Three.js", "TailwindCSS"],
    coverImage: "/images/projects/corporate-identity.webp",
    gallery: [
      "/images/projects/corporate-identity-1.webp",
      "/images/projects/corporate-identity-2.webp",
    ],
  },
  {
    slug: "product-catalog",
    category: "web",
    tech: ["Next.js", "CMS", "Framer Motion"],
    coverImage: "/images/projects/product-catalog.webp",
    gallery: [
      "/images/projects/product-catalog-1.webp",
    ],
  },
  {
    slug: "fashion-brand",
    category: "web",
    tech: ["Next.js", "Three.js", "GSAP"],
    coverImage: "/images/projects/fashion-brand.webp",
    gallery: [
      "/images/projects/fashion-brand-1.webp",
    ],
  },
  {
    slug: "ordering-app",
    category: "mobile",
    tech: ["Flutter", "Firebase"],
    coverImage: "/images/projects/ordering-app.webp",
    gallery: [],
  },
  {
    slug: "driver-app",
    category: "mobile",
    tech: ["React Native", "Google Maps API"],
    coverImage: "/images/projects/driver-app.webp",
    gallery: [],
  },
  {
    slug: "note-app",
    category: "mobile",
    tech: ["Swift", "CoreData"],
    coverImage: "/images/projects/note-app.webp",
    gallery: [],
  },
  {
    slug: "ecommerce-platform",
    category: "web",
    tech: ["Next.js", "Stripe", "PostgreSQL"],
    coverImage: "/images/projects/ecommerce-platform.webp",
    gallery: [],
  },
  {
    slug: "language-learning",
    category: "mobile",
    tech: ["Flutter", "AI Integration"],
    coverImage: "/images/projects/language-learning.webp",
    gallery: [],
  },
];

export function getProjectBaseBySlug(slug: string) {
  return projectBases.find((p) => p.slug === slug);
}
