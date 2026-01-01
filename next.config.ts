// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/antiga-pagina",
        destination: "/nova-pagina",
        permanent: true, // true = 301 (permanente), false = 302 (temporário)
      },
      {
        source: "/blog/:slug", // Suporta parâmetros
        destination: "/news/:slug",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
