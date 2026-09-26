import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Clean, shareable links into the v2 Live System section, which lives in the
  // URL hash. When v1 is flagged live at "/", v2 is still served at /v2.
  async redirects() {
    const home = process.env.NEXT_PUBLIC_SITE_VERSION === "v1" ? "/v2" : "/";
    return [
      { source: "/live-system", destination: `${home}#live-system`, permanent: false },
      { source: "/live-system/:path*", destination: `${home}#live-system/:path*`, permanent: false },
    ];
  },
};

export default nextConfig;
