import { lenisStore } from "./lenis";

export function scrollToTarget(target) {
  const dest = target === "#top" ? 0 : target;
  const lenis = lenisStore.current;
  if (lenis) {
    lenis.scrollTo(dest, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else if (dest === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.querySelector(dest)?.scrollIntoView({ behavior: "smooth" });
  }
}
