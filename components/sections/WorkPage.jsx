"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import MaskedText from "@/components/ui/MaskedText";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { workPage } from "@/data/work";

const pad = (n) => String(n + 1).padStart(2, "0");
const { projects } = workPage;

function ProjectLink({ project, className = "", children }) {
  const external = /^https?:/.test(project.url);
  return (
    <a
      href={project.url}
      aria-label={project.name}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/** Stacked full-screen slides: one pinned stage, one scrubbed timeline. */
function Showcase() {
  const stageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray("[data-slide]");
      const media = (s) => s.querySelector("[data-media]");

      // next slides wait below the stage; their image sits 30% up for the parallax
      gsap.set(slides.slice(1), { yPercent: 100, y: 0, autoAlpha: 1 });
      gsap.set(slides.slice(1).map(media), { yPercent: -30, y: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: () => `+=${(slides.length - 1) * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // each step: current slide leaves up (image lags down), next one rises (image catches up)
      slides.forEach((slide, i) => {
        if (!i) return;
        const prev = slides[i - 1];
        const t = i - 1;
        tl.to(prev, { yPercent: -100 }, t)
          .to(media(prev), { yPercent: 30 }, t)
          .to(slide, { yPercent: 0 }, t)
          .to(media(slide), { yPercent: 0 }, t);
      });
    }, stageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div>
      <section ref={stageRef} data-theme="dark" className="relative h-[100svh] w-full overflow-hidden bg-black">
        {projects.map((p, i) => (
          <div
            key={p.name}
            data-slide
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex: i + 1, visibility: i === 0 ? "visible" : "hidden" }}
          >
            <ProjectLink project={p} className="block h-full w-full">
              <div data-media className="absolute inset-0 will-change-transform">
                <ImageWithFallback
                  src={p.image}
                  alt={p.name}
                  priority={i === 0}
                  label={p.image.replace("/", "")}
                  className="h-full w-full"
                  placeholder={`bg-gradient-to-br ${p.placeholder}`}
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center px-5">
                <h2 className="border-b border-white/30 pb-2 text-center text-[clamp(40px,8vw,150px)] font-bold uppercase leading-none tracking-[-0.05em] text-white">
                  {p.name}
                </h2>
              </div>
              <span className="page-x absolute inset-x-0 bottom-6 flex items-end justify-between text-white md:bottom-8">
                <span className="font-mono text-mono uppercase text-white/80">{p.category}</span>
                <span className="text-lg font-light md:text-xl">{pad(i)}</span>
              </span>
            </ProjectLink>
          </div>
        ))}
      </section>
    </div>
  );
}

/** Simple stacked list alternative. */
function List() {
  const rootRef = useRef(null);

  useEffect(() => {
    const items = rootRef.current.querySelectorAll("[data-row]");
    const ctx = gsap.context(() => {
      gsap.set(items, { y: 40 });
      ScrollTrigger.batch(items, {
        start: "top 92%",
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" }),
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} data-theme="dark" className="bg-black">
      {projects.map((p, i) => (
        <ProjectLink key={p.name} project={p} className="group relative block">
          <div data-row className="relative h-[24vh] opacity-0 overflow-hidden border-t border-white/15 md:h-[38vh]">
            <ImageWithFallback
              src={p.image}
              alt={p.name}
              label={p.image.replace("/", "")}
              className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
              placeholder={`bg-gradient-to-br ${p.placeholder}`}
            />
            <div className="absolute inset-0 bg-black/40 transition-colors duration-500 group-hover:bg-black/20" />
            <div className="page-x absolute inset-0 flex items-center justify-between text-white">
              <div>
                <h3 className="text-[clamp(28px,5vw,92px)] font-bold uppercase leading-none tracking-[-0.05em]">{p.name}</h3>
                <p className="mt-2 font-mono text-mono uppercase text-white/70">{p.category}</p>
              </div>
              <span className="text-lg font-light text-white/70 md:text-xl">{pad(i)}</span>
            </div>
          </div>
        </ProjectLink>
      ))}
    </div>
  );
}

export default function WorkPage() {
  const [listView, setListView] = useState(false);

  // reduced motion: skip the pinned parallax and use the list
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setListView(true);
  }, []);

  // positions below the toggle change when the view swaps
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [listView]);

  return (
    <>
      <section data-theme="light" className="page-x pb-[12vw] pt-[30vw] md:pb-[8vw] md:pt-[10.5vw]">
        <MaskedText
          as="h1"
          when="intro"
          delay={0.2}
          text={workPage.title}
          className="text-[clamp(52px,9.8vw,210px)] font-bold uppercase leading-[0.88] tracking-[-0.055em]"
        />

        <div className="grid-12 mt-[14vw] gap-y-10 md:mt-[6vw]">
          <div className="col-span-12 flex items-end md:col-span-5">
            <button
              onClick={() => setListView((v) => !v)}
              className="flex items-center gap-3 text-[clamp(13px,1vw,16px)] text-black/70 transition-colors hover:text-black"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full border border-black/30">
                <span className="block w-3 space-y-[3px]">
                  <span className="block h-px bg-current" />
                  <span className="block h-px bg-current" />
                </span>
              </span>
              {listView ? workPage.toggle.showcase : workPage.toggle.list}
            </button>
          </div>
          <MaskedText
            text={workPage.statement}
            delay={0.3}
            className="col-span-12 text-[clamp(20px,2.2vw,40px)] font-light leading-[1.1] tracking-[-0.03em] md:col-span-6 md:col-start-7"
          />
        </div>
      </section>

      {listView ? <List key="list" /> : <Showcase key="showcase" />}
    </>
  );
}