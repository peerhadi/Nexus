import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/admin/",
        "/settings/",
        "/api/",
        "/login/",
        "/signup/",
      ],
    },
    sitemap: "https://nexusbuilds.vercel.app/sitemap.xml",
    host: "https://nexusbuilds.vercel.app",
  };
}
