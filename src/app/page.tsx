import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { About, Contact, Education, Experience, Skills, Writing } from "@/components/Sections";

export default function Home() {
  return (
    <>
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
    </>
  );
}
