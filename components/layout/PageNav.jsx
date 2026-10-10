"use client";
import Link from "next/link";
import { useApp } from "@/components/providers/AppContext";
import { useNav } from "@/lib/useNav";
import Clock from "@/components/ui/Clock";
import { navLinks } from "@/data/content";

/** Top bar for inner pages (dark text on white). */
export default function PageNav({ current = "/contact" }) {
  const { setMenuOpen } = useApp();
  const go = useNav();

  return (
    <header className="page-x absolute inset-x-0 top-0 z-20 flex items-start justify-between pt-6 md:pt-7">
      <div>
        <Link href="/" className="font-inter text-[clamp(16px,1.5vw,24px)] leading-none tracking-tight">
          ZENVOK® STUDIO
        </Link>
        <p className="mt-2 flex gap-3 font-mono text-[10px] uppercase leading-none text-black/55">
          <Clock />
        </p>
      </div>

      <nav className="absolute left-[40.5vw] hidden gap-[4.7vw] text-[clamp(11px,0.95vw,15px)] uppercase leading-none md:flex" style={{ top: "1.85rem" }}>
        {navLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={(e) => go(e, l.href)}
            className={`transition-opacity hover:opacity-60 ${l.href === current ? "underline underline-offset-4" : ""}`}
          >
            {l.label}
          </a>
        ))}
      </nav>

      <button onClick={() => setMenuOpen(true)} aria-label="Open menu" className="-mr-2 -mt-2 p-2">
        <span className="block w-[22px] space-y-[7px]">
          <span className="block h-px bg-black" />
          <span className="block h-px bg-black" />
        </span>
      </button>
    </header>
  );
}