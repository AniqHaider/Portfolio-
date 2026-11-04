import Nav from "@/components/classic/Nav";
import Hero from "@/components/classic/Hero";
import { About, Contact, Education, Experience, Skills, Writing } from "@/components/classic/Sections";
import ViewNudge from "@/components/ViewNudge";

export default function Home() {
  return (
    <div className="site-classic">
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
      <ViewNudge />
    </div>
  );
}
