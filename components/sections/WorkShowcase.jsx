"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { projects } from "@/data/content";

const BG = ["bg-work-1", "bg-work-2", "bg-work-3", "bg-work-4"];

/**
 * Stacking cards: each card pins under the previous one so only its header
 * strip stays visible, ending in the layered look from the design.
 * Pure CSS sticky = no scroll JS, so it stays smooth with Lenis.
 */
export default function WorkShowcase() {
  const rootRef = useRef(null);

  // gentle image parallax inside each card
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-work-card]").forEach((card) => {
        gsap.fromTo(
          card.querySelector("[data-work-parallax]"),
          { yPercent: -7 },
          { yPercent: 7, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="works"
      ref={rootRef}
      data-theme="dark"
      className="relative [--work-head:48px] md:[--work-head:60px]"
    >
      {projects.map((p, i) => (
        <article
          key={p.title}
          data-work-card
          className={`sticky flex h-[100svh] flex-col text-white ${BG[i]}`}
          style={{ top: `calc(var(--work-head) * ${i})`, zIndex: i + 1 }}
        >
          <a
            href={p.url}
            className="page-x flex h-[var(--work-head)] shrink-0 items-center gap-6 md:gap-[3.4vw]"
          >
            <span className="w-5 font-mono text-[10px] md:text-[11px]">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-[clamp(15px,1.3vw,22px)] font-light tracking-tight text-white/90">{p.title}</span>
          </a>
          <a href={p.url} aria-label={p.title} className="relative block flex-1 overflow-hidden">
            <div data-work-parallax className="absolute inset-x-0 -top-[8%] h-[116%]">
              <ImageWithFallback
                src={p.image}
                className="h-full w-full"
                placeholder="bg-black/10"
                label={p.image.replace("/", "")}
              />
            </div>
          </a>
        </article>
      ))}
      {/* keeps the finished stack pinned for a moment before it scrolls away */}
      <div aria-hidden className="h-[30svh]" />
    </section>
  );
}
