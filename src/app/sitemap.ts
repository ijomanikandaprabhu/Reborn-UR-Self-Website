import type { MetadataRoute } from "next";
import { servicePath, services } from "@/data/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  });

  return [
    page("/", 1),
    ...services.map((s) => page(servicePath(s), 0.9)),
    page("/contact", 0.8),
    page("/about", 0.7),
    page("/gallery", 0.7),
  ];
}
