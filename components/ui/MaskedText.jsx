"use client";
import { Fragment, useEffect, useMemo, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppContext";

/**
 * Word-by-word masked reveal.
 *  - `\n` in text = forced line break (desktop only; wraps naturally on mobile)
 *  - runs of 2+ spaces are preserved on desktop (used for the Studio copy)
 *  - when="scroll" plays once when in view; when="intro" waits for the loader
 */
function tokenize(text) {
  return text.split(/(\n| {2,})/).flatMap((part) => {
    if (part === "\n") return [{ t: "br" }];
    if (/^ {2,}$/.test(part)) return [{ t: "gap", v: part }];
    const words = part.split(" ").filter(Boolean);
    return words.flatMap((w, i) => (i < words.length - 1 ? [{ t: "word", v: w }, { t: "sp" }] : [{ t: "word", v: w }]));
  });
}

export default function MaskedText({
  text,
  as: Tag = "p",
  className = "",
  when = "scroll",
  delay = 0,
  stagger = 0.045,
  duration = 0.85,
  start = "top 90%",
}) {
  const ref = useRef(null);
  const { ready } = useApp();
  const tokens = useMemo(() => tokenize(text), [text]);
  const waiting = when === "intro" && !ready;

  useEffect(() => {
    const el = ref.current;
    if (!el || waiting) return;
    const words = el.querySelectorAll(".mask-word");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(words, { yPercent: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      // y: 0 clears the px value GSAP reads from the CSS class (translateY(110%)),
      // otherwise words end up offset and stay hidden behind the mask
      gsap.set(words, { yPercent: 110, y: 0 });
      const play = () =>
        gsap.to(words, {
          yPercent: 0,
          duration,
          delay,
          stagger,
          ease: "power3.out",
          onComplete: () => gsap.set(words, { willChange: "auto" }),
        });
      if (when === "intro") play();
      else ScrollTrigger.create({ trigger: el, start, once: true, onEnter: play });
    }, el);
    return () => ctx.revert();
  }, [waiting, when, delay, stagger, duration, start, text]);

  return (
    <Tag ref={ref} className={className}>
      {tokens.map((tk, i) => {
        if (tk.t === "word")
          return (
            <span key={i} className="-my-[0.1em] inline-block overflow-hidden py-[0.1em] align-top">
              <span className="mask-word">{tk.v}</span>
            </span>
          );
        if (tk.t === "sp") return <Fragment key={i}> </Fragment>;
        if (tk.t === "gap")
          return (
            <Fragment key={i}>
              <span className="md:hidden"> </span>
              <span className="hidden whitespace-pre md:inline">{tk.v}</span>
            </Fragment>
          );
        return (
          <Fragment key={i}>
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>
          </Fragment>
        );
      })}
    </Tag>
  );
}