"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import MaskedText from "@/components/ui/MaskedText";
import { servicesPage } from "@/data/services";

const pad = (n) => String(n).padStart(2, "0");

export default function ServicesList() {
  const rootRef = useRef(null);
  const { groups, cta } = servicesPage;

  // divider lines draw in from the left as they scroll into view
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const lines = rootRef.current.querySelectorAll("[data-line]");
      gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });
      ScrollTrigger.batch(lines, {
        start: "top 95%",
        once: true,
        onEnter: (els) => gsap.to(els, { scaleX: 1, duration: 1.2, ease: "power3.out", stagger: 0.04 }),
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} data-theme="light">
      {groups.map((group, gi) => (
        <section key={group.title}>
          <div data-line className="h-px w-full bg-black/20" />
          <div className="grid-12 page-x gap-y-8 py-[clamp(48px,6vw,110px)]">
            {/* title (sticks while the list scrolls on desktop) */}
            <div className="col-span-12 lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-black" />
                  <span className="font-mono text-mono uppercase text-black/50">({pad(gi + 1)})</span>
                </div>
                <MaskedText
                  as="h2"
                  text={group.title}
                  className="mt-5 text-[clamp(34px,4.6vw,88px)] font-bold uppercase leading-[0.92] tracking-[-0.05em]"
                />
              </div>
            </div>

            {/* capabilities */}
            <ul className="col-span-12 lg:col-span-6 lg:col-start-7">
              {group.items.map((item, ii) => (
                <li key={item} className="group relative flex items-baseline justify-between gap-6 py-[clamp(12px,1.1vw,20px)]">
                  <span data-line className="absolute inset-x-0 bottom-0 h-px bg-black/15" />
                  <MaskedText
                    as="span"
                    text={item}
                    delay={ii * 0.03}
                    className="block text-[clamp(16px,1.6vw,28px)] font-light tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2"
                  />
                  <span className="shrink-0 font-mono text-mono text-black/35">{pad(ii + 1)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* closing link to the contact page */}
      <div data-line className="h-px w-full bg-black/20" />
      <div className="page-x flex flex-col gap-6 py-[clamp(48px,6vw,110px)] md:flex-row md:items-end md:justify-between">
        <MaskedText as="p" text={cta.text} className="text-[clamp(28px,3.6vw,68px)] font-bold uppercase leading-[0.95] tracking-[-0.05em]" />
        <Link
          href={cta.href}
          className="group inline-flex items-center gap-3 border-b border-black pb-2 text-[clamp(13px,1vw,16px)] uppercase tracking-[0.12em]"
        >
          {cta.label}
          <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
        </Link>
      </div>
    </div>
  );
}