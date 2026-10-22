import { ImageResponse } from "next/og";
import { getPost, posts } from "@/lib/posts";

export const alt = "Blog post by Aniq Haider";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Aniq Haider";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0b0d12",
          color: "#f5f6f8",
        }}
      >
        <div style={{ fontSize: 28, color: "#9aa3b2" }}>
          {post ? `${post.tag} · ${post.readTime}` : "Blog"}
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>{title}</div>
        <div style={{ fontSize: 30, color: "#9aa3b2" }}>Aniq Haider · aniq-haider.vercel.app</div>
      </div>
    ),
    size,
  );
}
