import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Aniq Haider · Full-stack engineer shipping commerce platforms with AI",
  description:
    "Aniq Haider is a full-stack software engineer building production commerce platforms, AI-integrated fintech tools and document-processing systems with React, Next.js, Node.js and Python.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://aniq-haider.vercel.app",
  ),
  openGraph: {
    title: "Aniq Haider · Full Stack Software Engineer",
    description:
      "Storefronts, APIs and AI pipelines that scale. React · Next.js · Node.js · Python · AWS.",
    type: "website",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var m=window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.setAttribute("data-theme",t==="light"||t==="dark"?t:m)}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={figtree.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
