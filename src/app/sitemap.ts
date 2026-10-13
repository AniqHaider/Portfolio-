import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aniq-haider.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
