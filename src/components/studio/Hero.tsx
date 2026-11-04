import Image from "next/image";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-svh max-w-[88rem] flex-col justify-center px-6 pb-20 pt-32 md:px-10 md:pt-28"
    >
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7 lg:col-span-8">
          <p data-hero className="label mb-7 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-accent align-middle" />
            {profile.role} — {profile.location}
          </p>

          <h1
            data-hero
            className="font-serif text-[clamp(2.6rem,7vw,5.5rem)] font-light leading-[1.02] tracking-[-0.01em]"
          >
            {profile.headline[0]}{" "}
            <span className="italic text-accent">{profile.headline[1]}</span>.
          </h1>

          <p
            data-hero
            className="mt-8 max-w-xl text-[clamp(1.05rem,1.6vw,1.35rem)] leading-relaxed text-muted"
          >
            {profile.tagline}
          </p>

          <div data-hero className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#experience"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-fg"
            >
              View selected work
              <span aria-hidden className="text-accent transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="/Aniq-Haider-Resume.pdf"
              download="Aniq-Haider-Resume.pdf"
              className="label inline-flex items-center gap-2 border-b border-line pb-1 transition-colors hover:text-fg"
            >
              Résumé ↓
            </a>
          </div>
        </div>

        <div data-hero className="md:col-span-5 lg:col-span-4">
          <figure className="relative mx-auto aspect-[3/4] w-[min(78vw,22rem)] overflow-hidden rounded-sm bg-surface-2 md:w-full">
            <Image
              src="/portrait-studio.jpg"
              alt="Portrait of Aniq Haider"
              fill
              priority
              sizes="(max-width: 767px) 78vw, 30vw"
              className="object-cover object-[50%_25%]"
            />
          </figure>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        data-testid="scroll-cue"
        className="absolute bottom-8 left-6 flex items-center gap-3 text-muted transition-colors hover:text-accent md:left-10"
      >
        <span className="label">Scroll</span>
        <span aria-hidden className="inline-block h-px w-10 bg-current" />
      </a>
    </section>
  );
}
