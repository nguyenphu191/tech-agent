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
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
    ],
  },
  {
    slug: "fitness-companion-app",
    category: "mobile",
    tech: ["Flutter", "Firebase", "Node.js"],
    coverImage:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9d50d?w=1200&q=80",
    ],
  },
  {
    slug: "saas-landing-rebrand",
    category: "uiux",
    tech: ["Figma", "Next.js", "Framer Motion"],
    coverImage:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542744173-8e7e5348bb0c?w=1200&q=80",
    ],
  },
  {
    slug: "booking-portal-web",
    category: "web",
    tech: ["Next.js", "Prisma", "Stripe"],
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80",
    ],
  },
  {
    slug: "corporate-identity",
    category: "web",
    tech: ["Next.js", "Three.js", "TailwindCSS"],
    coverImage: "https://marketplace.canva.com/MADFf6O5thI/1/thumbnail_large/canva-beautiful-natural-background.-MADFf6O5thI.jpg",
    gallery: ["https://vcdn1-dulich.vnecdn.net/2021/07/16/3-1-1626444927.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=KU8IkmrM5HbtYIyyS5k1qQ", "https://m.yodycdn.com/blog/anh-dep-3d-yodyvn4.jpg"],
  },
  {
    slug: "product-catalog",
    category: "web",
    tech: ["Next.js", "CMS", "Framer Motion"],
    coverImage: "https://vcdn1-dulich.vnecdn.net/2021/07/16/3-1-1626444927.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=KU8IkmrM5HbtYIyyS5k1qQ",
    gallery: ["https://marketplace.canva.com/MADFf6O5thI/1/thumbnail_large/canva-beautiful-natural-background.-MADFf6O5thI.jpg"],
  },
  {
    slug: "fashion-brand",
    category: "web",
    tech: ["Next.js", "Three.js", "GSAP"],
    coverImage: "https://m.yodycdn.com/blog/anh-dep-3d-yodyvn4.jpg",
    gallery: ["https://vcdn1-dulich.vnecdn.net/2021/07/16/3-1-1626444927.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=KU8IkmrM5HbtYIyyS5k1qQ"],
  },
  {
    slug: "ordering-app",
    category: "mobile",
    tech: ["Flutter", "Firebase"],
    coverImage: "https://marketplace.canva.com/MADFf6O5thI/1/thumbnail_large/canva-beautiful-natural-background.-MADFf6O5thI.jpg",
    gallery: ["https://m.yodycdn.com/blog/anh-dep-3d-yodyvn4.jpg"],
  },
  {
    slug: "driver-app",
    category: "mobile",
    tech: ["React Native", "Google Maps API"],
    coverImage: "https://vcdn1-dulich.vnecdn.net/2021/07/16/3-1-1626444927.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=KU8IkmrM5HbtYIyyS5k1qQ",
    gallery: ["https://marketplace.canva.com/MADFf6O5thI/1/thumbnail_large/canva-beautiful-natural-background.-MADFf6O5thI.jpg"],
  },
  {
    slug: "note-app",
    category: "mobile",
    tech: ["Swift", "CoreData"],
    coverImage: "https://m.yodycdn.com/blog/anh-dep-3d-yodyvn4.jpg",
    gallery: ["https://vcdn1-dulich.vnecdn.net/2021/07/16/3-1-1626444927.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=KU8IkmrM5HbtYIyyS5k1qQ"],
  },
  {
    slug: "ecommerce-platform",
    category: "web",
    tech: ["Next.js", "Stripe", "PostgreSQL"],
    coverImage: "https://marketplace.canva.com/MADFf6O5thI/1/thumbnail_large/canva-beautiful-natural-background.-MADFf6O5thI.jpg",
    gallery: ["https://m.yodycdn.com/blog/anh-dep-3d-yodyvn4.jpg"],
  },
  {
    slug: "language-learning",
    category: "mobile",
    tech: ["Flutter", "AI Integration"],
    coverImage: "https://vcdn1-dulich.vnecdn.net/2021/07/16/3-1-1626444927.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=KU8IkmrM5HbtYIyyS5k1qQ",
    gallery: ["https://marketplace.canva.com/MADFf6O5thI/1/thumbnail_large/canva-beautiful-natural-background.-MADFf6O5thI.jpg"],
  },
];

export function getProjectBaseBySlug(slug: string) {
  return projectBases.find((p) => p.slug === slug);
}
