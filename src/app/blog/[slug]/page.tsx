import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FlowDiagram from "@/components/FlowDiagram";
import Nav from "@/components/Nav";
import { getPost, posts } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} · Aniq Haider`,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: ["Aniq Haider"],
      tags: post.stack,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary },
  };
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aniq-haider.vercel.app";

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const idx = posts.findIndex((p) => p.slug === slug);
  const next = posts[(idx + 1) % posts.length];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    keywords: post.stack.join(", "),
    author: { "@type": "Person", name: "Aniq Haider", url: siteUrl },
  };

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
    />
    <Nav />
    <main id="main" className="mx-auto w-full max-w-4xl px-6 pb-24 pt-32 md:px-8">
      <Link
        href="/#writing"
        data-testid="blog-back"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
      >
        <span aria-hidden>←</span> Back to portfolio
      </Link>
      <article>
        <header className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            {post.tag} · {post.readTime}
          </p>
          <h1 className="text-balance text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{post.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
            {post.stack.map((s) => (
              <li key={s} className="rounded-full border border-line bg-surface-2 px-3 py-1 text-sm">
                {s}
              </li>
            ))}
          </ul>
          {post.links && (
            <p className="mt-5 flex flex-wrap gap-3">
              {post.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="blog-source-link"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  {l.label} <span aria-hidden>↗</span>
                </a>
              ))}
            </p>
          )}
        </header>

        <div className="space-y-5 text-[1.05rem] leading-relaxed">
          {post.blocks.map((b, i) => {
            switch (b.t) {
              case "p":
                return <p key={i} className="max-w-3xl">{b.text}</p>;
              case "h":
                return (
                  <h2 key={i} className="max-w-3xl pt-4 text-2xl font-semibold tracking-tight">
                    {b.text}
                  </h2>
                );
              case "ul":
                return (
                  <ul key={i} className="max-w-3xl space-y-3">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                );
              case "callout":
                return (
                  <p key={i} className="max-w-3xl rounded-2xl border border-accent/40 bg-accent-soft p-5 font-medium">
                    {b.text}
                  </p>
                );
              case "diagram":
                return <FlowDiagram key={i} title={b.title} caption={b.caption} lanes={b.lanes} video={post.video} />;
            }
          })}
        </div>
      </article>

      <nav className="mt-16 border-t border-line pt-8" aria-label="Next post">
        <p className="mb-2 text-sm text-muted">Next up</p>
        <Link href={`/blog/${next.slug}`} data-testid="blog-next" className="text-xl font-semibold hover:text-accent">
          {next.title} →
        </Link>
      </nav>
    </main>
    </>
  );
}
