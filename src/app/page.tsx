import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { About, Contact, Education, Experience, Skills } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  );
}
