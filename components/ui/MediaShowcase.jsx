"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lenisStore } from "@/lib/lenis";
import ImageWithFallback from "./ImageWithFallback";

/* ---------- tiny inline icons (no icon package needed) ---------- */
const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
const Icon = {
    play: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>,
    pause: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>,
    close: (s = 20) => <svg width={s} height={s} viewBox="0 0 24 24" {...P}><path d="M5 5l14 14M19 5L5 19" /></svg>,
    volume: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" {...P}><path d="M4 9v6h4l5 4V5L8 9H4zM17 9a4 4 0 010 6M19.5 6.5a8 8 0 010 11" /></svg>,
    muted: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" {...P}><path d="M4 9v6h4l5 4V5L8 9H4zM17 9l4 6M21 9l-4 6" /></svg>,
    prev: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" {...P}><path d="M15 5l-7 7 7 7" /></svg>,
    next: (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" {...P}><path d="M9 5l7 7-7 7" /></svg>,
};

const ctrl = "grid h-7 w-7 place-items-center text-white/80 transition-colors hover:text-white";

/**
 * Media section that scales in on scroll and opens a lightbox (video / image / slideshow)
 * with a cursor label ("Play Reel" / "Close Reel").
 */
export default function MediaShowcase({
    type = "video",
    src = "",
    sources = [],
    title = "",
    height = "clamp(420px, 56vw, 900px)",
    scaleIn = true,
    loop = true,
    playText = "Play Reel",
    closeText = "Close Reel",
    className = "",
    onOpen,
    onClose,
}) {
    const items = type === "slideshow" && sources.length ? sources : [{ src, alt: title }];
    const isVideo = type === "video";

    const [mounted, setMounted] = useState(false); // lightbox in the DOM
    const [cursor, setCursor] = useState(null); // null | "play" | "close"
    const [current, setCurrent] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(true);
    const [previewReady, setPreviewReady] = useState(false);

    const sectionRef = useRef(null);
    const mediaRef = useRef(null);
    const cursorRef = useRef(null);
    const overlayRef = useRef(null);
    const panelRef = useRef(null);
    const closeBtnRef = useRef(null);
    const videoRef = useRef(null);
    const barRef = useRef(null);
    const trackRef = useRef(null);
    const scrubbing = useRef(false);
    const closing = useRef(false);
    const pointer = useRef({ x: 0, y: 0 });

    /* ---- scale in as the section scrolls into view ---- */
    useEffect(() => {
        const el = mediaRef.current;
        if (!scaleIn || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.set(el, { opacity: 1 });
            return;
        }
        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                { scale: 0.3, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    ease: "power2.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "center center", scrub: 1 },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, [scaleIn]);

    /* ---- one cursor label that follows the mouse (no rAF loop) ---- */
    useEffect(() => {
        const el = cursorRef.current;
        gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.5 });
        const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
        const onMove = (e) => {
            if (e.pointerType !== "mouse") return;
            pointer.current = { x: e.clientX, y: e.clientY };
            xTo(e.clientX);
            yTo(e.clientY);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, []);

    useEffect(() => {
        const el = cursorRef.current;
        if (cursor) gsap.set(el, { x: pointer.current.x, y: pointer.current.y });
        gsap.to(el, { opacity: cursor ? 1 : 0, scale: cursor ? 1 : 0.5, duration: 0.25, ease: "power3.out", overwrite: "auto" });
    }, [cursor]);

    /* ---- open / close ---- */
    const open = () => {
        setMounted(true);
        setCursor("close");
        onOpen?.();
    };

    const close = () => {
        if (closing.current) return;
        closing.current = true;
        videoRef.current?.pause();
        setCursor(null);
        gsap
            .timeline({
                onComplete: () => {
                    closing.current = false;
                    setMounted(false);
                    setPlaying(false);
                    onClose?.();
                },
            })
            .to(panelRef.current, { opacity: 0, scale: 0.95, rotate: 5, duration: 0.4, ease: "power3.in" })
            .to(overlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.out" }, "-=0.2");
    };

    // lightbox intro (+ lock page scroll while open)
    useEffect(() => {
        if (!mounted) return;
        lenisStore.current?.stop();
        gsap.set(panelRef.current, { scale: 0.95, rotate: 5 });
        gsap
            .timeline()
            .to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" })
            .to(panelRef.current, { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
            .call(() => {
                videoRef.current?.play().catch(() => { });
                closeBtnRef.current?.focus();
            });
        return () => lenisStore.current?.start();
    }, [mounted]);

    /* ---- video helpers ---- */
    const togglePlay = () => {
        const v = videoRef.current;
        if (!v) return;
        v.paused ? v.play().catch(() => { }) : v.pause();
    };
    const toggleMute = () => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = !v.muted;
        setMuted(v.muted);
        if (!v.muted && v.paused) v.play().catch(() => { });
    };
    const onTimeUpdate = () => {
        const v = videoRef.current;
        if (v?.duration && !scrubbing.current) barRef.current.style.width = `${(v.currentTime / v.duration) * 100}%`;
    };
    const seek = (e) => {
        const v = videoRef.current;
        const track = trackRef.current;
        if (!v?.duration || !track) return;
        const r = track.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
        v.currentTime = ratio * v.duration;
        barRef.current.style.width = `${ratio * 100}%`;
    };

    const go = (dir) => setCurrent((c) => (c + dir + items.length) % items.length);

    // keyboard: Esc closes, arrows change slide, space toggles video
    useEffect(() => {
        if (!mounted) return;
        const onKey = (e) => {
            if (e.key === "Escape") close();
            else if (e.key === "ArrowRight" && items.length > 1) go(1);
            else if (e.key === "ArrowLeft" && items.length > 1) go(-1);
            else if (e.key === " " && isVideo && e.target === document.body) {
                e.preventDefault();
                togglePlay();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    const slide = items[current];
    const placeholder = "bg-gradient-to-br from-night via-[#2a0504] to-[#9a130c]";

    return (
        <>
            {/* cursor label */}
            <div ref={cursorRef} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[10000] flex items-center gap-2 rounded-full bg-black/55 py-2 pl-3 pr-4 text-sm text-white backdrop-blur">
                {cursor === "close" ? Icon.close(16) : Icon.play(16)}
                <span className="whitespace-nowrap">{cursor === "close" ? closeText : playText}</span>
            </div>

            {/* preview */}
            <section ref={sectionRef} className={`relative flex w-full items-center justify-center overflow-hidden bg-white ${className}`} style={{ height }}>
                <div ref={mediaRef} className={`absolute inset-0 ${scaleIn ? "opacity-0" : ""}`}>
                    <button
                        type="button"
                        aria-label={playText}
                        onClick={open}
                        onPointerEnter={(e) => e.pointerType === "mouse" && !mounted && setCursor("play")}
                        onPointerLeave={() => !mounted && setCursor(null)}
                        className="absolute inset-0 block h-full w-full overflow-hidden [@media(hover:hover)]:cursor-none"
                    >
                        {isVideo ? (
                            <>
                                <div className={`absolute inset-0 ${placeholder}`} />
                                <video
                                    src={slide.src}
                                    autoPlay
                                    muted
                                    loop={loop}
                                    playsInline
                                    preload="metadata"
                                    draggable={false}
                                    onLoadedData={() => setPreviewReady(true)}
                                    onError={() => setPreviewReady(false)}
                                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${previewReady ? "opacity-100" : "opacity-0"}`}
                                />
                            </>
                        ) : (
                            <ImageWithFallback src={slide.src} alt={slide.alt || ""} className="h-full w-full" placeholder={placeholder} />
                        )}
                        {title && (
                            <span className="absolute inset-0 grid place-items-center px-5 text-center text-[clamp(40px,8vw,150px)] font-bold uppercase leading-none tracking-[-0.05em] text-white">
                                {title}
                            </span>
                        )}
                    </button>
                    {/* touch devices have no cursor label, so show a visible hint */}
                    <span className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black/55 py-2 pl-3 pr-4 text-sm text-white [@media(hover:hover)]:hidden">
                        {Icon.play(14)} {playText}
                    </span>
                </div>
            </section>

            {/* lightbox */}
            {mounted && (
                <div
                    ref={overlayRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={title || playText}
                    style={{ opacity: 0 }}
                    className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/80 p-4 md:p-8 [@media(hover:hover)]:cursor-none"
                    onClick={close}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setCursor("close")}
                >
                    <div
                        ref={panelRef}
                        style={{ opacity: 0 }}
                        className="relative aspect-video w-full max-w-5xl cursor-auto overflow-hidden bg-black shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                        onPointerEnter={() => setCursor(null)}
                        onPointerLeave={(e) => e.pointerType === "mouse" && setCursor("close")}
                    >
                        {isVideo ? (
                            <video
                                ref={videoRef}
                                src={slide.src}
                                playsInline
                                loop={loop}
                                muted={muted}
                                className="h-full w-full object-cover"
                                onPlay={() => setPlaying(true)}
                                onPause={() => setPlaying(false)}
                                onTimeUpdate={onTimeUpdate}
                            />
                        ) : (
                            <ImageWithFallback key={current} src={slide.src} alt={slide.alt || ""} className="h-full w-full" placeholder={placeholder} />
                        )}

                        <button ref={closeBtnRef} onClick={close} aria-label={closeText} className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center text-white/70 transition-colors hover:text-white">
                            {Icon.close(20)}
                        </button>

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            {isVideo && (
                                <div
                                    ref={trackRef}
                                    className="relative mb-3 h-1 w-full cursor-pointer touch-none bg-white/30"
                                    onPointerDown={(e) => {
                                        scrubbing.current = true;
                                        e.currentTarget.setPointerCapture(e.pointerId);
                                        seek(e);
                                    }}
                                    onPointerMove={(e) => scrubbing.current && seek(e)}
                                    onPointerUp={() => (scrubbing.current = false)}
                                    onPointerCancel={() => (scrubbing.current = false)}
                                >
                                    <div ref={barRef} className="h-full bg-white" style={{ width: "0%" }} />
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                {isVideo && (
                                    <>
                                        <button onClick={togglePlay} aria-label={playing ? "Pause" : "Play"} className={ctrl}>
                                            {playing ? Icon.pause() : Icon.play()}
                                        </button>
                                        <button onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className={ctrl}>
                                            {muted ? Icon.muted() : Icon.volume()}
                                        </button>
                                    </>
                                )}
                                {items.length > 1 && (
                                    <>
                                        <button onClick={() => go(-1)} aria-label="Previous" className={ctrl}>
                                            {Icon.prev()}
                                        </button>
                                        <span className="text-xs text-white/80">
                                            {current + 1} / {items.length}
                                        </span>
                                        <button onClick={() => go(1)} aria-label="Next" className={ctrl}>
                                            {Icon.next()}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}