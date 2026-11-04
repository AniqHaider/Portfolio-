"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
  Deferred motion layer. The page is server-rendered and fully visible on first paint;
  this mounts afterwards and *enhances* it. Heavy libs (GSAP + Lenis) are dynamically
  imported only once the browser is idle, so they never block the initial load. Under
  prefers-reduced-motion it does nothing and the static page stands on its own.
*/

type Lenis = {
  raf: (t: number) => void;
  on: (e: string, cb: () => void) => void;
  scrollTo: (target: number | string | HTMLElement, opts?: Record<string, unknown>) => void;
  destroy: () => void;
};

export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let lenis: Lenis | null = null;
    let cleanupFns: Array<() => void> = [];
    let killed = false;
    let tickerFn: ((t: number) => void) | null = null;

    // Arm the hidden start states now (before paint of this frame), behind the cover,
    // so nothing that was already on screen visibly jumps.
    document.documentElement.classList.add("motion");

    const run = async () => {
      if (killed) return;
      const [{ gsap }, { ScrollTrigger }, LenisMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (killed) return;

      gsap.registerPlugin(ScrollTrigger);
      const LenisCtor = LenisMod.default as unknown as new (o?: Record<string, unknown>) => Lenis;

      // --- Smooth scroll, wired into ScrollTrigger ---
      lenis = new LenisCtor({ duration: 1.1, lerp: 0.1, wheelMultiplier: 1 });
      document.documentElement.classList.add("lenis");
      lenis.on("scroll", ScrollTrigger.update);
      tickerFn = (t: number) => lenis && lenis.raf(t * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      // Same-page anchor links scroll smoothly through Lenis.
      const onAnchorClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement)?.closest?.("a");
        if (!a) return;
        const href = a.getAttribute("href") || "";
        const hash = href.startsWith("#") ? href : href.startsWith("/#") ? href.slice(1) : "";
        if (!hash || hash === "#") return;
        const el = document.querySelector(hash);
        if (!el) return;
        e.preventDefault();
        lenis?.scrollTo(el as HTMLElement, { offset: -96, duration: 1.2 });
      };
      document.addEventListener("click", onAnchorClick);
      cleanupFns.push(() => document.removeEventListener("click", onAnchorClick));

      // --- Scroll reveals: everything tagged [data-reveal] ---
      const triggers: Array<{ kill: () => void }> = [];
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const mask = el.getAttribute("data-reveal") === "mask";
        const tween = gsap.to(el, {
          opacity: 1,
          y: 0,
          clipPath: mask ? "inset(0 0 0% 0)" : undefined,
          duration: 1,
          ease: "power3.out",
          delay: Number(el.getAttribute("data-reveal-delay")) || 0,
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });
      cleanupFns.push(() => triggers.forEach((t) => t.kill()));

      // --- Intro: lift the cover, play the hero in behind it (first load only) ---
      const cover = document.getElementById("intro-cover");
      const heroEls = gsap.utils.toArray<HTMLElement>("[data-hero]");
      const tl = gsap.timeline();
      if (heroEls.length) gsap.set(heroEls, { opacity: 0, y: 44 });

      if (cover && cover.getAttribute("data-done") !== "true") {
        const mark = cover.querySelector("[data-cover-mark]");
        if (mark) tl.to(mark, { opacity: 1, duration: 0.5, ease: "power2.out" }).to(mark, { opacity: 0, duration: 0.4, ease: "power2.in" }, "+=0.35");
        tl.to(cover, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => cover.setAttribute("data-done", "true"),
        });
      }
      if (heroEls.length) {
        tl.to(heroEls, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.09 }, cover ? "-=0.45" : 0);
      }

      ScrollTrigger.refresh();
      cleanupFns.push(() => {
        gsap.set("[data-reveal]", { clearProps: "all" });
      });
    };

    // Only reach for the libraries once the page is loaded and the main thread is idle.
    const idle = () => {
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
      if (ric) ric(() => run());
      else setTimeout(run, 200);
    };
    if (document.readyState === "complete") idle();
    else {
      window.addEventListener("load", idle, { once: true });
      cleanupFns.push(() => window.removeEventListener("load", idle));
    }

    return () => {
      killed = true;
      cleanupFns.forEach((fn) => fn());
      cleanupFns = [];
      if (tickerFn) {
        import("gsap").then(({ gsap }) => tickerFn && gsap.ticker.remove(tickerFn));
      }
      lenis?.destroy();
      document.documentElement.classList.remove("lenis");
    };
    // Re-scan on route change so blog pages get their reveals wired too.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div id="intro-cover" className="intro-cover" aria-hidden>
      <span data-cover-mark className="font-serif text-2xl tracking-tight text-accent opacity-0">
        AH
      </span>
    </div>
  );
}
