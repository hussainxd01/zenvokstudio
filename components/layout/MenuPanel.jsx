"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { lenisStore } from "@/lib/lenis";
import { usePathname } from "next/navigation";
import { useNav } from "@/lib/useNav";
import { useApp } from "@/components/providers/AppContext";
import { menuLinks, projects, socials } from "@/data/content";

/** Right-hand navigation sidebar with masked-text links. */
export default function MenuPanel() {
  const { menuOpen, setMenuOpen } = useApp();
  const nav = useNav();
  const pathname = usePathname();
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const overlayRef = useRef(null);
  const closeRef = useRef(null);
  const tlRef = useRef(null);
  const wasOpened = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const ctx = gsap.context(() => {
      tlRef.current = gsap
        .timeline({ paused: true, onReverseComplete: () => gsap.set(root, { autoAlpha: 0 }) })
        .fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "power2.out" }, 0)
        .fromTo(panelRef.current, { xPercent: 112 }, { xPercent: 0, duration: 1.05, ease: "expo.out" }, 0)
        .fromTo("[data-menu-word]", { yPercent: 115 }, { yPercent: 0, duration: 0.95, stagger: 0.06, ease: "power4.out" }, 0.3)
        .fromTo("[data-menu-fade]", { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.04, ease: "power2.out" }, 0.55);
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (menuOpen) {
      wasOpened.current = true;
      gsap.set(rootRef.current, { autoAlpha: 1 });
      tl.timeScale(1).play();
      lenisStore.current?.stop();
      const t = setTimeout(() => closeRef.current?.focus(), 400);
      return () => clearTimeout(t);
    }
    if (wasOpened.current) {
      tl.timeScale(1.5).reverse();
      lenisStore.current?.start();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  const go = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => nav(null, href), 450);
  };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90]"
      style={{ visibility: "hidden" }}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
      aria-hidden={!menuOpen}
    >
      <div ref={overlayRef} className="absolute inset-0 bg-black/50" onClick={() => setMenuOpen(false)} />
      <aside
        ref={panelRef}
        data-lenis-prevent
        className="absolute bottom-3 right-3 top-3 flex w-[calc(100%-1.5rem)] flex-col justify-between overflow-y-auto rounded-lg bg-[#efefef] p-5 text-black md:w-[min(46vw,640px)] md:p-6"
      >
        <div>
          <div className="flex items-start justify-between" data-menu-fade>
            <span className="font-mono text-[11px] uppercase text-black/50">Navigation</span>
            <button
              ref={closeRef}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-md border border-black/20 transition-colors hover:bg-black hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>
          <ul className="mt-6">
            {menuLinks.map((l) => (
              <li key={l.label} className="overflow-hidden">
                <a
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  data-menu-word
                  className={`block w-fit text-[clamp(34px,3.6vw,56px)] leading-[1.05] tracking-tight decoration-1 underline-offset-4 hover:underline ${(l.href === "/contact" ? pathname === "/contact" : l.href === "#top" && pathname === "/") ? "text-black/45" : "text-black"
                    }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 text-[12px] leading-snug" data-menu-fade>
          <span className="text-black/50">Most Recent Projects</span>
          <ul>
            {projects.map((p) => (
              <li key={p.title}>
                <a href={p.url} className="hover:underline">
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
          <span className="text-black/50">Socials</span>
          <ul>
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
