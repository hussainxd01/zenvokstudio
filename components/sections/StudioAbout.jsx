"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import MaskedText from "@/components/ui/MaskedText";
import { studioPage } from "@/data/studio";

const pad = (n) => String(n + 1).padStart(2, "0");

function Block({ label, children }) {
    return (
        <section>
            <div data-line className="h-px w-full bg-black/20" />
            <div className="grid-12 page-x gap-y-8 py-[clamp(48px,6vw,110px)]">
                <div className="col-span-12 lg:col-span-5">
                    <div className="flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full bg-black" />
                        <span className="font-mono text-mono uppercase text-black/50">{label}</span>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-6 lg:col-start-7">{children}</div>
            </div>
        </section>
    );
}

export default function StudioAbout() {
    const rootRef = useRef(null);
    const { about, principles, stat, cta } = studioPage;

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
            <Block label={about.label}>
                <MaskedText text={about.lead} className="text-[clamp(24px,2.8vw,52px)] font-light leading-[1.08] tracking-[-0.035em]" />
                <MaskedText text={about.body} className="mt-[clamp(28px,3vw,56px)] text-[clamp(15px,1.2vw,20px)] leading-relaxed text-black/70" />
            </Block>

            <Block label={principles.label}>
                <ul>
                    {principles.items.map((item, i) => (
                        <li key={item} className="relative flex items-baseline justify-between gap-6 py-[clamp(14px,1.4vw,26px)]">
                            <span data-line className="absolute inset-x-0 bottom-0 h-px bg-black/15" />
                            <MaskedText as="span" text={item} delay={i * 0.05} className="block text-[clamp(26px,3.2vw,60px)] font-bold uppercase leading-none tracking-[-0.05em]" />
                            <span className="font-mono text-mono text-black/35">{pad(i)}</span>
                        </li>
                    ))}
                </ul>
            </Block>

            <Block label={stat.label}>
                <p className="text-[clamp(80px,14vw,260px)] font-bold leading-[0.85] tracking-[-0.06em]">
                    <MaskedText as="span" text={stat.value} className="block" />
                </p>
                <MaskedText text={stat.text} delay={0.1} className="mt-4 text-[clamp(16px,1.6vw,28px)] font-light tracking-tight" />
            </Block>

            {/* closing link to the contact page */}
            <div data-line className="h-px w-full bg-black/20" />
            <div className="page-x flex flex-col gap-6 py-[clamp(48px,6vw,110px)] md:flex-row md:items-end md:justify-between">
                <MaskedText as="p" text={cta.text} className="text-[clamp(28px,3.6vw,68px)] font-bold uppercase leading-[0.95] tracking-[-0.05em]" />
                <Link href={cta.href} className="group inline-flex items-center gap-3 border-b border-black pb-2 text-[clamp(13px,1vw,16px)] uppercase tracking-[0.12em]">
                    {cta.label}
                    <span className="inline-block transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                </Link>
            </div>
        </div>
    );
}