import type { Metadata } from "next";
import { Comic_Neue, Figtree } from "next/font/google";
import "./globals.css";
import "./retro.css";
import { profile } from "@/lib/data";
import { RetroDock, RetroTop } from "@/components/RetroView";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Fallback for the retro view on devices without Comic Sans; only downloaded when that view is used.
const comic = Comic_Neue({
  variable: "--font-comic",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Aniq Haider · Software engineer building scalable products with AI",
  description:
    "Aniq Haider is a software engineer building production web platforms, AI-integrated fintech tools and developer tooling with React, Next.js, Node.js and Python.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://aniq-haider.vercel.app",
  ),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Aniq Haider · Software Engineer",
    description:
      "Full-stack web apps, APIs and AI-powered developer tools. React · Next.js · Node.js · Python · AWS.",
    type: "website",
    url: "/",
    siteName: "Aniq Haider",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aniq Haider · Software Engineer",
    description:
      "Full-stack web apps, APIs and AI-powered developer tools. React · Next.js · Node.js · Python · AWS.",
  },
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aniq-haider.vercel.app";

// Person structured data: ties the site to the GitHub and LinkedIn profiles so search engines treat them as one entity.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: siteUrl,
  image: `${siteUrl}/portrait.jpg`,
  address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressCountry: "IN" },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ["React", "Next.js", "Node.js", "Python", "AWS", "Developer tooling"],
};

// WebSite structured data: this is what Google reads for the "site name" shown above a result, so it shows the name instead of the host's.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: profile.name,
  alternateName: [`${profile.name} Portfolio`, "Aniq Haider"],
  url: `${siteUrl}/`,
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var m=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.setAttribute("data-theme",t==="light"||t==="dark"?t:m);if(localStorage.getItem("view")==="retro")document.documentElement.setAttribute("data-view","retro")}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" data-view="modern" suppressHydrationWarning className={`${figtree.variable} ${comic.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <RetroTop />
        {children}
        <RetroDock />
      </body>
    </html>
  );
}
