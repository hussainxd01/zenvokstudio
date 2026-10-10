"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import MaskedText from "@/components/ui/MaskedText";
import ContactForm from "./ContactForm";
import { contact } from "@/data/contact";
import { footer } from "@/data/content";

function PanelHeader({ label, active }) {
  return (
    <div className="page-x flex h-[clamp(64px,5.8vw,96px)] items-center justify-between border-b border-black/20">
      <MaskedText
        as="h2"
        text={label}
        className={`text-[clamp(26px,2.6vw,48px)] font-bold uppercase leading-none tracking-[-0.04em] ${active ? "text-black" : "text-black/40"}`}
      />
      <span className={`h-3.5 w-3.5 rounded-full ${active ? "bg-black" : "bg-black/40"}`} />
    </div>
  );
}

export default function ContactSection() {
  const rootRef = useRef(null);
  const d = contact.details;

  // fade/slide-up every [data-reveal] element as it scrolls in
  useEffect(() => {
    const items = rootRef.current.querySelectorAll("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(items, { opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(items, { y: 24 });
      ScrollTrigger.batch(items, {
        start: "top 92%",
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.8, stagger: 0.07, ease: "power3.out" }),
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} data-theme="light" className="border-t border-black/20">
      <div className="grid lg:grid-cols-[57fr_43fr]">
        <div className="lg:border-r lg:border-black/20">
          <PanelHeader label={contact.tab} active />
          <div className="page-x py-8 md:py-10">
            <ContactForm />
          </div>
        </div>

        <div className="border-t border-black/20 lg:border-t-0">
          <PanelHeader label={contact.detailsTab} />
          <dl className="page-x space-y-[clamp(28px,3vw,48px)] py-8 md:py-10">
            <div data-reveal className="opacity-0">
              <dt className="text-small text-black/50">{d.emailLabel}</dt>
              <dd className="mt-2 text-[clamp(18px,1.6vw,28px)] tracking-tight">
                <a href={`mailto:${d.email}`} className="underline-offset-4 hover:underline">
                  {d.email}
                </a>
              </dd>
            </div>
            <div data-reveal className="opacity-0">
              <dt className="text-small text-black/50">{d.locationLabel}</dt>
              <dd className="mt-2 text-[clamp(18px,1.6vw,28px)] tracking-tight">{d.location}</dd>
            </div>
            <div data-reveal className="opacity-0">
              <dt className="text-small text-black/50">{d.socialsLabel}</dt>
              <dd className="mt-2 space-y-1 text-[clamp(18px,1.6vw,28px)] tracking-tight">
                {footer.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="block w-fit underline-offset-4 hover:underline">
                    {s.label} ↗
                  </a>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}