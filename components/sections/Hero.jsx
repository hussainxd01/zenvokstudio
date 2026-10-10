"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scrollTo";
import { useApp } from "@/components/providers/AppContext";
import MaskedText from "@/components/ui/MaskedText";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Clock from "@/components/ui/Clock";
import { heroImage, hero, navLinks } from "@/data/content";
import { useNav } from "@/lib/useNav";

export default function Hero() {
  const { ready, setMenuOpen } = useApp();
  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const dimRef = useRef(null);

  // slide in from above as the loader slides down
  useEffect(() => {
    if (!ready || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      rootRef.current,
      { yPercent: -100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.1, ease: "power3.out", clearProps: "transform,opacity" }
    );
    return () => tween.kill();
  }, [ready]);

  // Studio scrolls over the hero: drift + darken the hero underneath
  useEffect(() => {
    const group = rootRef.current.parentElement;
    const ctx = gsap.context(() => {
      const st = { trigger: group, start: "top top", end: "+=100%", scrub: true };
      gsap.to(bgRef.current, { yPercent: 13, ease: "none", scrollTrigger: st });
      gsap.to(dimRef.current, { opacity: 0.55, ease: "none", scrollTrigger: st });
    });
    return () => ctx.revert();
  }, []);

const go = useNav();


  return (
    <div ref={rootRef} id="top" data-theme="dark" className="sticky top-0 z-0 h-[100svh] min-h-[560px] w-full overflow-hidden bg-night text-white">
      {/* full-bleed background (public/Hero.png) */}
      <div ref={bgRef} className="absolute inset-x-0 -top-[15%] h-[115%]">
        <ImageWithFallback
          src={heroImage}
          alt=""
          priority
          label="Hero.png"
          className="h-full w-full"
          placeholder="bg-gradient-to-b from-[#3b4452] via-[#6d5a49] to-[#4a3a2c]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/35" />
      <div ref={dimRef} className="absolute inset-0 bg-black opacity-0" />

      {/* nav */}
      <header className="page-x absolute inset-x-0 top-0 flex items-start justify-between pt-6 md:pt-7">
        <a href="#top" onClick={(e) => go(e, "#top")} className="font-inter text-[clamp(16px,1.5vw,24px)] leading-none tracking-tight">
          ZENVOK® STUDIO
        </a>
        <nav className="absolute left-[40.5vw] hidden gap-[4.7vw] text-[clamp(11px,0.95vw,15px)] uppercase leading-none md:flex" style={{ top: "1.85rem" }}>
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={(e) => go(e, l.href)} className="transition-opacity hover:opacity-60">
              {l.label}
            </a>
          ))}
        </nav>
        <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="-mr-2 -mt-2 p-2">
          <span className="block w-[22px] space-y-[7px]">
            <span className="block h-px bg-white" />
            <span className="block h-px bg-white" />
          </span>
        </button>
      </header>

      {/* statement */}
      <div className="page-x absolute inset-x-0 bottom-[16vw] md:bottom-[8.5vw]">
        <MaskedText as="h1" when="intro" delay={0.5} text={hero.statement} className="text-hero font-light md:whitespace-nowrap" />
      </div>

      {/* bottom row */}
      <div className="page-x absolute inset-x-0 bottom-0 flex items-end justify-between pb-8 font-mono text-[11px] uppercase leading-none md:pb-11 md:text-mono">
        <div className="flex gap-[6vw] md:gap-[4vw]">
          <span>©2026</span>
          <Clock />
        </div>
        <button onClick={() => scrollToTarget("#studio")} className="transition-opacity hover:opacity-60">
          [Scroll down]
        </button>
      </div>
    </div>
  );
}
