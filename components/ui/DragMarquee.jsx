"use client";
import { Children, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Infinite auto-scrolling strip you can also grab and drag. */
export default function DragMarquee({ children, speed = 40, gap = 20, copies = 3, className = "" }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const items = Children.toArray(children);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const auto = reduce ? 0 : speed;
    let loop = 0, x = 0, velocity = 0, dragging = false, visible = true, lastX = 0, lastT = 0;

    const measure = () => {
      loop = track.children[items.length].offsetLeft - track.children[0].offsetLeft;
    };
    const wrap = (v) => (loop ? (((v % loop) + loop) % loop) - loop : v);

    const tick = (_, dtRaw) => {
      if (!visible) return;
      const dt = Math.min(dtRaw, 50);
      if (!dragging) {
        x -= (auto * dt) / 1000;
        x += velocity * dt;
        velocity *= Math.pow(0.94, dt / 16.67);
        if (Math.abs(velocity) < 0.001) velocity = 0;
      }
      x = wrap(x);
      track.style.transform = `translate3d(${x}px,0,0)`;
    };

    const down = (e) => {
      dragging = true;
      velocity = 0;
      lastX = e.clientX;
      lastT = performance.now();
      viewport.setPointerCapture?.(e.pointerId);
    };
    const move = (e) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      x += dx;
      velocity = dx / Math.max(now - lastT, 1);
      lastX = e.clientX;
      lastT = now;
    };
    const up = () => {
      dragging = false;
    };

    measure();
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(viewport);
    window.addEventListener("resize", measure);
    viewport.addEventListener("pointerdown", down);
    viewport.addEventListener("pointermove", move);
    viewport.addEventListener("pointerup", up);
    viewport.addEventListener("pointercancel", up);
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      window.removeEventListener("resize", measure);
      viewport.removeEventListener("pointerdown", down);
      viewport.removeEventListener("pointermove", move);
      viewport.removeEventListener("pointerup", up);
      viewport.removeEventListener("pointercancel", up);
    };
  }, [speed, items.length]);

  return (
    <div
      ref={viewportRef}
      className={`cursor-grab select-none overflow-hidden active:cursor-grabbing ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      <div ref={trackRef} className="flex w-max items-start will-change-transform" style={{ gap }}>
        {Array.from({ length: copies }).flatMap((_, c) =>
          items.map((item, i) => (
            <div key={`${c}-${i}`} className="shrink-0" aria-hidden={c > 0 || undefined}>
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
