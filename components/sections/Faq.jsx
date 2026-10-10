"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import MaskedText from "@/components/ui/MaskedText";
import { faq } from "@/data/content";
import Link from "next/link";

function Item({ q, a, open, onToggle }) {
  const panelRef = useRef(null);
  const iconRef = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t1 = gsap.to(panelRef.current, {
      height: open ? "auto" : 0,
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => ScrollTrigger.refresh(),
    });
    const t2 = gsap.to(iconRef.current, { rotate: open ? 45 : 0, duration: 0.4, ease: "power2.out" });
    return () => {
      t1.kill();
      t2.kill();
    };
  }, [open]);

  return (
    <div className="border-b border-black/10">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-[clamp(14px,1.05vw,20px)] text-left text-[clamp(14px,1.2vw,20px)] tracking-tight"
      >
        <MaskedText as="span" text={q} className="block" />
        <svg ref={iconRef} width="12" height="12" viewBox="0 0 12 12" className="shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.3">
          <path d="M6 0v12M0 6h12" />
        </svg>
      </button>
      <div ref={panelRef} style={{ height: 0 }} className="overflow-hidden" aria-hidden={!open}>
        <p className="max-w-[44em] pb-5 text-[clamp(13px,1.05vw,17px)] leading-relaxed text-black/65">{a}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="contact" data-theme="light" className="page-x bg-faq pb-[12vw] pt-[9vw] md:pb-[6vw] md:pt-[5.5vw]">
      <MaskedText as="h2" text={faq.title} className="text-faqtitle font-bold uppercase" />

      <div className="grid-12 mt-[10vw] gap-y-10 md:mt-[6vw]">
        <div className="col-span-12 md:col-span-4">
          <Link
            href={faq.cta.href}
            className="inline-block border border-black/80 px-[clamp(24px,2.4vw,40px)] py-[clamp(10px,0.9vw,16px)] text-small transition-colors duration-300 hover:bg-black hover:text-white"
          >
            {faq.cta.label}
          </Link>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          {faq.items.map((it, i) => (
            <Item key={it.q} {...it} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
