"use client";
import { useEffect, useState } from "react";
import { useApp } from "@/components/providers/AppContext";

/** Floating menu button that appears once the hero nav has scrolled away. */
export default function MenuButton() {
  const { setMenuOpen } = useApp();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => setMenuOpen(true)}
      aria-label="Open menu"
      tabIndex={show ? 0 : -1}
      className={`fixed right-5 top-5 z-[80] grid h-12 w-12 place-items-center rounded-full bg-black text-white transition-all duration-500 md:right-10 ${show ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
        }`}
    >
      <span className="block w-[18px] space-y-[5px]">
        <span className="block h-px bg-current" />
        <span className="block h-px bg-current" />
      </span>
    </button>
  );
}
