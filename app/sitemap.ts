import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  // Sections are fragments of one page, not separate canonical URLs.
  return siteUrl ? [{ url: siteUrl.href, changeFrequency: "monthly", priority: 1 }] : [];
}
