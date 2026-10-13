"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center px-6 pb-24 pt-36 text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-12 h-[min(30svh,58vw)] min-h-[200px] w-[min(30svh,58vw)] min-w-[200px]"
        aria-hidden
      >
        {/* stacked rings */}
        <span className="absolute inset-0 translate-y-5 scale-[0.94] rounded-full border border-line bg-surface opacity-40" />
        <span className="absolute inset-0 translate-y-2.5 scale-[0.97] rounded-full border border-line bg-surface opacity-70" />
        <span className="absolute inset-0 rounded-full border border-line bg-surface-2 p-3 shadow-2xl">
          <span className="relative block h-full w-full overflow-hidden rounded-full bg-surface">
            <Image
              src="/aniq.jpg"
              alt="Portrait of Aniq Haider"
              fill
              priority
              sizes="(max-width: 767px) 58vw, 30svh"
              className="object-cover"
            />
          </span>
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="max-w-5xl text-balance text-[clamp(2.25rem,6vw,4.75rem)] font-semibold leading-[1.05] tracking-tight"
      >
        {profile.headline[0]} <span className="text-accent">{profile.headline[1]}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-6 max-w-2xl text-balance text-[clamp(1.05rem,2vw,1.6rem)] font-light text-muted"
      >
        {profile.tagline}
      </motion.p>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        data-testid="scroll-cue"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 text-accent"
      >
        <svg width="30" height="28" viewBox="0 0 30 28" fill="currentColor" aria-hidden>
          <path d="M2 2h26l-3 5H5zM6 10h18l-3 5H9zM10 18h10l-2 4h-6z" />
        </svg>
      </motion.a>
    </section>
  );
}
