"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useNav } from "@/lib/useNav";
import MaskedText from "@/components/ui/MaskedText";
import { footer } from "@/data/content";

const INK = "text-[#d6d4cf]";
const TAGLINE = "Websites for ambitious businesses.";
const linkText = "text-[clamp(14px,1.05vw,17px)] leading-none";

function External() {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M1 8l7-7M2 1h6v6" />
    </svg>
  );
}

/** Original wordmark preserved. */
function Wordmark({ className = "", twoLines = false }) {
  const base = "font-sans font-bold";

  return twoLines ? (
    <svg
      viewBox="0 0 1000 330"
      className={className}
      fill="currentColor"
      role="img"
      aria-label="ZENVOK Studio"
      preserveAspectRatio="xMinYMax meet"
    >
      <text
        x="0"
        y="150"
        fontSize="200"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        className={base}
      >
        ZENVOK
        <tspan fontSize="90" dy="-70">
          ®
        </tspan>
      </text>
      <text
        x="0"
        y="318"
        fontSize="200"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        className={base}
      >
        STUDIO
      </text>
    </svg>
  ) : (
    <svg
      viewBox="0 0 1000 92"
      className={className}
      fill="currentColor"
      role="img"
      aria-label="ZENVOK Studio"
      preserveAspectRatio="xMinYMax meet"
    >
      <text
        x="0"
        y="88"
        fontSize="116"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        className={base}
      >
        ZENVOK
        <tspan fontSize="52" dy="-46">
          ®
        </tspan>
        <tspan dy="46"> STUDIO</tspan>
      </text>
    </svg>
  );
}

export default function Footer() {
  const markRef = useRef(null);
  const go = useNav();

  useEffect(() => {
    const el = markRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = "none";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(el, { yPercent: 101, y: 0 });

      ScrollTrigger.create({
        trigger: el.parentElement,
        start: "top 98%",
        once: true,
        onEnter: () =>
          gsap.to(el, {
            yPercent: 0,
            duration: 1.3,
            ease: "power3.out",
          }),
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      data-theme="dark"
      className={`page-x overflow-hidden bg-black pb-0 pt-[16vw] md:pt-[7vw] ${INK}`}
    >
      <div className="grid-12 gap-y-12 md:gap-y-0">
        {/* Brand statement */}
        <div className="col-span-12 md:col-span-6">
          <MaskedText
            as="h2"
            text={TAGLINE}
            className="max-w-[10em] text-[clamp(36px,5vw,76px)] font-light leading-[0.98] tracking-[-0.055em]"
          />
          <p className="mt-6 max-w-[26em] text-[clamp(13px,1vw,15px)] leading-relaxed text-white/50">
            Strategy, design and development for businesses ready to grow.
          </p>
        </div>

        {/* Navigation and socials grouped on the left */}
        <div className="col-span-12 mt-4 grid grid-cols-2 gap-8 md:col-span-5 md:col-start-1 md:mt-[7vw] md:gap-12">
          {/* Navigation */}
          <div>
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
              Explore
            </p>

            <ul className="space-y-[clamp(16px,1.7vw,24px)]">
              {footer.nav.map((l, i) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => go(e, l.href)}
                    className={`${linkText} block w-fit transition-opacity hover:opacity-60`}
                  >
                    <MaskedText as="span" text={l.label} delay={i * 0.06} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
              Follow us
            </p>

            <ul className="space-y-[clamp(16px,1.7vw,24px)]">
              {footer.socials.map((s, i) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkText} flex w-fit items-center gap-2 transition-opacity hover:opacity-60`}
                  >
                    <MaskedText as="span" text={s.label} delay={i * 0.06} />
                    <External />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact and legal details on the right */}
        <div className="col-span-12 mt-2 flex flex-col gap-6 border-t border-white/15 pt-6 md:col-span-3 md:col-start-10 md:row-start-1 md:mt-0 md:justify-self-end md:border-0 md:pt-0">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
              Based in
            </p>
            <MaskedText
              as="p"
              text={footer.location}
              className={`${linkText} leading-relaxed`}
            />
          </div>

          <div className="space-y-4">
            <a
              href="https://wa.me/919330533787"
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkText} block w-fit transition-opacity hover:opacity-60`}
            >
              Let's talk ↗
            </a>

            <a
              href={footer.terms.href}
              className={`${linkText} block w-fit transition-opacity hover:opacity-60`}
            >
              <MaskedText as="span" text={footer.terms.label} />
            </a>
          </div>

          <MaskedText
            as="p"
            text={footer.copyright}
            className="text-[11px] leading-relaxed text-white/40"
          />
        </div>
      </div>

      {/* Original animated wordmark preserved */}

      <div className="mt-[18vw] overflow-hidden md:mt-[5vw]">
        <div ref={markRef} style={{ transform: "translateY(101%)" }}>
          <Wordmark className="block h-auto w-full" />
        </div>
      </div>
    </footer>
  );
}
