import type { Metadata } from "next";
import Nav from "@/components/studio/Nav";
import Hero from "@/components/studio/Hero";
import { About, Contact, Education, Experience, Skills, Writing } from "@/components/studio/Sections";
import Motion from "@/components/studio/Motion";

export const metadata: Metadata = {
  title: "Aniq Haider · Studio — an animated cut",
  description:
    "An animated, editorial version of Aniq Haider's portfolio. Software engineer building full-stack web apps, APIs and AI-powered developer tools.",
  alternates: { canonical: "/studio" },
};

export default function Studio() {
  return (
    <div className="site-studio">
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Writing />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Motion />
    </div>
  );
}
