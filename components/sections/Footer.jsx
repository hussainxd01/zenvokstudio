"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useNav } from "@/lib/useNav";
import MaskedText from "@/components/ui/MaskedText";
import { footer } from "@/data/content";

const INK = "text-[#d6d4cf]"; // soft off-white, not pure white

const linkText = "text-[clamp(14px,1.05vw,17px)] leading-none";

function Arrow({ className = "" }) {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.2" className={className}>
      <path d="M0 7h18M12 1l6 6-6 6" />
    </svg>
  );
}

function External() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M1 8l7-7M2 1h6v6" />
    </svg>
  );
}

/** Full-width SVG wordmark (scales with the viewport, no JS sizing). */
function Wordmark({ className = "", twoLines = false }) {
  const base = "font-sans font-bold";
  return twoLines ? (
    <svg viewBox="0 0 1000 330" className={className} fill="currentColor" role="img" aria-label="ZENVOK Studio" preserveAspectRatio="xMinYMax meet">
      <text x="0" y="150" fontSize="200" textLength="1000" lengthAdjust="spacingAndGlyphs" className={base}>
        ZENVOK<tspan fontSize="90" dy="-70">®</tspan>
      </text>
      <text x="0" y="318" fontSize="200" textLength="1000" lengthAdjust="spacingAndGlyphs" className={base}>
        STUDIO
      </text>
    </svg>
  ) : (
    <svg viewBox="0 0 1000 92" className={className} fill="currentColor" role="img" aria-label="ZENVOK Studio" preserveAspectRatio="xMinYMax meet">
      <text x="0" y="88" fontSize="116" textLength="1000" lengthAdjust="spacingAndGlyphs" className={base}>
        ZENVOK<tspan fontSize="52" dy="-46">®</tspan>
        <tspan dy="46"> STUDIO</tspan>
      </text>
    </svg>
  );
}

export default function Footer() {
  const markRef = useRef(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  // wordmark rises out of its mask when the footer scrolls into view
  useEffect(() => {
    const el = markRef.current;
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
        onEnter: () => gsap.to(el, { yPercent: 0, duration: 1.3, ease: "power3.out" }),
      });
    });
    return () => ctx.revert();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: send `email` to your newsletter provider / API route
    setSent(true);
    setEmail("");
  };

 const go = useNav();

  return (
    <footer data-theme="dark" className={`page-x bg-black pb-0 pt-[10vw] md:pt-[3.5vw] ${INK}`}>
      <div className="grid-12 gap-y-12">
        {/* tagline + newsletter */}
        <div className="col-span-12 md:col-span-5">
          <MaskedText as="h2" text={footer.tagline} className="text-[clamp(30px,3.3vw,56px)] font-light leading-[1.05] tracking-[-0.05em]" />
          <p className={`${linkText} mt-[clamp(28px,3.2vw,56px)]`}>
            <MaskedText as="span" text={footer.newsletterLabel} />
          </p>
          <form onSubmit={onSubmit} className="mt-3 flex max-w-[320px] items-center border-b border-[#d6d4cf]/70 pb-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSent(false);
              }}
              placeholder="Email"
              aria-label="Email address"
              className="w-full bg-transparent text-[clamp(14px,1.05vw,17px)] text-[#d6d4cf] placeholder:text-[#d6d4cf]/50 focus:outline-none"
            />
            <button type="submit" aria-label="Subscribe" className="shrink-0 transition-transform duration-300 hover:translate-x-1">
              <Arrow />
            </button>
          </form>
          {sent && (
            <p role="status" className="mt-3 text-[13px] text-[#d6d4cf]/70">
              Thanks, you&apos;re on the list.
            </p>
          )}
        </div>

        {/* navigation */}
        <ul className="col-span-6 space-y-[clamp(14px,1.9vw,26px)] md:col-span-2 md:col-start-6">
          {footer.nav.map((l, i) => (
            <li key={l.label}>
              <a href={l.href} onClick={(e) => go(e, l.href)} className={`${linkText} block w-fit transition-opacity hover:opacity-60`}>
                <MaskedText as="span" text={l.label} delay={i * 0.06} />
              </a>
            </li>
          ))}
        </ul>

        {/* socials + meta */}
        <div className="col-span-6 md:col-span-3 md:col-start-8">
          <ul className="space-y-[clamp(14px,1.9vw,26px)]">
            {footer.socials.map((s, i) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={`${linkText} flex w-fit items-center gap-1.5 transition-opacity hover:opacity-60`}>
                  <MaskedText as="span" text={s.label} delay={i * 0.06} />
                  <External />
                </a>
              </li>
            ))}
          </ul>
          <div className={`${linkText} mt-[clamp(28px,3.4vw,56px)] space-y-[clamp(10px,1.1vw,16px)] leading-snug`}>
            <MaskedText as="p" text={footer.location} />
            <a href={footer.terms.href} className="block w-fit transition-opacity hover:opacity-60">
              <MaskedText as="span" text={footer.terms.label} />
            </a>
            <MaskedText as="p" text={footer.copyright} />
          </div>
        </div>
      </div>

      {/* wordmark */}
      <div className="mt-[14vw] overflow-hidden md:mt-[3vw]">
        <div ref={markRef} style={{ transform: "translateY(101%)" }}>
          <Wordmark className="block h-auto w-full md:hidden" twoLines />
          <Wordmark className="hidden h-auto w-full md:block" />
        </div>
      </div>
    </footer>
  );
}