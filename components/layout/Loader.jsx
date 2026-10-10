"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppContext";

const WORDS = ["Shaping", "Tomorrow's", "Web,", "Today.™"];

export default function Loader() {
  const { setReady } = useApp();
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(root, { display: "none" });
      setReady(true);
      return;
    }
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        // word-by-word reveal
        .fromTo(
          "[data-loader-word]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "power2.out" }
        )
        // hero + masked text start as the loader slides down
        .call(() => setReady(true))
        .to(root, { yPercent: 100, duration: 1.1, ease: "power3.inOut" }, "<")
        .set(root, { display: "none" });
    }, root);
    return () => ctx.revert();
  }, [setReady]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[99999] flex items-center justify-center bg-night px-4"
    >
      <div className="flex flex-wrap justify-center gap-2 text-center text-lg font-medium tracking-tight text-white sm:text-3xl md:text-4xl">
        {WORDS.map((w) => (
          <span key={w} data-loader-word style={{ opacity: 0 }}>
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
