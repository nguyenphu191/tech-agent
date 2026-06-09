export const techStackGroupIds = [
  "frontend",
  "mobile",
  "backend",
  "deploy",
] as const;

export const techStackByGroup: Record<
  (typeof techStackGroupIds)[number],
  readonly string[]
> = {
  frontend: ["React", "Next.js", "TailwindCSS", "TypeScript"],
  mobile: ["Flutter", "Dart"],
  backend: ["Node.js", "Express", "Firebase", "PostgreSQL"],
  deploy: ["Vercel", "Docker", "VPS", "Cloudflare"],
};

export const techLogos = [
  "React",
  "Flutter",
  "Next.js",
  "Node.js",
  "Firebase",
] as const;
