import {
  LayoutTemplate,
  Palette,
  Server,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export type ServiceDef = {
  id: "web" | "mobile" | "uiux" | "backend";
  icon: LucideIcon;
  tech: string[];
  images: string[];
  color: string;
  gradient: string;
};

export const serviceList: ServiceDef[] = [
  {
    id: "web",
    icon: LayoutTemplate,
    tech: ["Next.js", "React", "TailwindCSS", "TypeScript"],
    images: [
      "/images/services/web-1.webp",
      "/images/services/web-2.webp",
      "/images/services/web-3.webp",
    ],
    color: "from-indigo-500 to-violet-600",
    gradient: "bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-indigo-600/20",
  },
  {
    id: "mobile",
    icon: Smartphone,
    tech: ["Flutter", "Dart", "Firebase"],
    images: [
      "/images/services/mobile-1.webp",
      "/images/services/mobile-2.webp",
      "/images/services/mobile-3.webp",
    ],
    color: "from-emerald-500 to-teal-600",
    gradient: "bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-600/20",
  },
  {
    id: "uiux",
    icon: Palette,
    tech: ["Figma", "Prototyping", "Design tokens"],
    images: [
      "/images/services/uiux-1.webp",
      "/images/services/uiux-2.webp",
      "/images/services/uiux-3.webp",
    ],
    color: "from-violet-500 to-fuchsia-600",
    gradient: "bg-gradient-to-br from-violet-500/20 via-fuchsia-500/20 to-fuchsia-600/20",
  },
  {
    id: "backend",
    icon: Server,
    tech: ["Node.js", "PostgreSQL", "Docker"],
    images: [
      "/images/services/backend-1.webp",
      "/images/services/backend-2.webp",
      "/images/services/backend-3.webp",
    ],
    color: "from-slate-600 to-indigo-700",
    gradient: "bg-gradient-to-br from-slate-500/20 via-indigo-600/20 to-indigo-800/20",
  },
];

export const pricingTierIds = ["starter", "pro", "enterprise"] as const;

export type PricingTierId = (typeof pricingTierIds)[number];
