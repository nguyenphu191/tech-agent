import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "marketplace.canva.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vcdn1-dulich.vnecdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.yodycdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
