import type { MetadataRoute } from "next";

const BASE_URL = "https://nexusbuilds.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutes = ["", "/work", "/services", "/about"];

  const lastModified = new Date();

  return publicRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
