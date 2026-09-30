import type { Metadata } from "next";
import { site } from "./site";

/**
 * Full metadata for a page. Next.js replaces (rather than merges) nested
 * objects like openGraph, so every page builds the complete set here.
 */
export function pageMeta({
  title,
  description = site.description,
  path,
  image = site.ogImage,
  imageAlt = "Rebornurself — permanent makeup studio in New Perungalathur, Chennai",
}: {
  title: string;
  description?: string;
  path: string;
  image?: string;
  imageAlt?: string;
}): Metadata {
  const images = [{ url: image, alt: imageAlt }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.name, locale: "en_IN", url: path, title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
