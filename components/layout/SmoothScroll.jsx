"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lenisStore } from "@/lib/lenis";
import { useApp } from "@/components/providers/AppContext";

export default function SmoothScroll() {
  const { ready } = useApp();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisStore.current = lenis;
    lenis.stop(); // locked until the loader is done
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisStore.current = null;
    };
  }, []);

  useEffect(() => {
    if (ready) lenisStore.current?.start();
  }, [ready]);

  return null;
}
