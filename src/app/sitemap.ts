import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aniq-haider.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = posts.map((p) => p.date).sort().at(-1);
  return [
    {
      url: base,
      lastModified: latest ? new Date(latest) : undefined,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
