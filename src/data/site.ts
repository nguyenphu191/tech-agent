export const siteConfig = {
  name: "Studio Dev",
  email: "hello@studiodev.vn",
  phone: "+84 90 123 4567",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    zalo: "https://zalo.me",
  },
} as const;

export const navKeys = [
  { href: "/services", labelKey: "services" },
  { href: "/projects", labelKey: "projects" },
  { href: "/about", labelKey: "about" },
  { href: "/contact", labelKey: "contact" },
] as const;
