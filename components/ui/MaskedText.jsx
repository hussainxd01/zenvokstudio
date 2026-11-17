"use client";
import { Fragment, memo, useEffect, useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReady } from "@/components/providers/AppContext";

/**
 * Word-by-word masked reveal.
 *  - `\n` in text = forced line break (desktop only; wraps naturally on mobile)
 *  - runs of 2+ spaces are preserved on desktop (used for the Studio copy)
 *  - when="scroll" plays once when in view; when="intro" waits for the loader
 *
 * Performance: one shared IntersectionObserver (no per-element scroll listeners),
 * no permanent will-change, and the words are left with `transform: none` once played.
 * Self-contained: the hidden state is inline, so no CSS rules are needed in globals.css.
 */
function tokenize(text) {
  return text.split(/(\n| {2,})/).flatMap((part) => {
    if (part === "\n") return [{ t: "br" }];
    if (/^ {2,}$/.test(part)) return [{ t: "gap", v: part }];
    const words = part.split(" ").filter(Boolean);
    return words.flatMap((w, i) => (i < words.length - 1 ? [{ t: "word", v: w }, { t: "sp" }] : [{ t: "word", v: w }]));
  });
}

/* ---- one observer for every MaskedText on the page ---- */
let io = null;
const callbacks = new WeakMap();

function watch(el, onEnter) {
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          // in view, or already scrolled past (e.g. page reloaded further down)
          if (en.isIntersecting || en.boundingClientRect.top < 0) {
            const cb = callbacks.get(en.target);
            if (!cb) continue;
            callbacks.delete(en.target);
            io.unobserve(en.target);
            cb();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" } // fire when the top is ~90% down the viewport
    );
  }
  callbacks.set(el, onEnter);
  io.observe(el);
  return () => {
    callbacks.delete(el);
    io.unobserve(el);
  };
}

function MaskedText({ text, as: Tag = "p", className = "", when = "scroll", delay = 0, stagger = 0.045, duration = 0.85 }) {
  const ref = useRef(null);
  const played = useRef(false);
  const ready = useReady();
  const tokens = useMemo(() => tokenize(text), [text]);
  const waiting = when === "intro" && !ready;

  useEffect(() => {
    const el = ref.current;
    if (!el || waiting || played.current) return;
    const words = el.querySelectorAll(".mask-word");

    // final state: visible, no layer. Inline `none` also beats any stale CSS rule.
    const finish = () => {
      played.current = true;
      gsap.set(words, { clearProps: "transform,willChange" });
      words.forEach((w) => (w.style.transform = "none"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    let tween;
    const play = () => {
      tween = gsap.fromTo(
        words,
        { yPercent: 110, y: 0 },
        { yPercent: 0, y: 0, duration, delay, stagger, ease: "power3.out", onComplete: finish }
      );
    };

    const stop = when === "intro" ? (play(), () => { }) : watch(el, play);
    return () => {
      stop();
      tween?.kill();
    };
  }, [waiting, when, delay, stagger, duration, text]);

  return (
    <Tag ref={ref} className={className}>
      {tokens.map((tk, i) => {
        if (tk.t === "word")
          return (
            <span key={i} className="-my-[0.1em] inline-block overflow-hidden py-[0.1em] align-top">
              <span className="mask-word inline-block" style={{ transform: "translateY(110%)" }}>
                {tk.v}
              </span>
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

export default memo(MaskedText);