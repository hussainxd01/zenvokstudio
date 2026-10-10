"use client";
import { usePathname, useRouter } from "next/navigation";
import { scrollToTarget } from "./scrollTo";

/**
 * One handler for every internal link:
 *  "#section" -> smooth scroll on the home page, or go to "/#section" from other pages
 *  "/route"   -> client-side navigation (no loader replay)
 *  mailto/http/"#" -> left to the browser
 */
export function useNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (e, href) => {
    if (!href || href === "#" || /^(mailto:|tel:|https?:)/.test(href)) return;
    e?.preventDefault();
    if (href.startsWith("#")) {
      if (pathname === "/") scrollToTarget(href);
      else router.push(href === "#top" ? "/" : `/${href}`);
    } else {
      router.push(href);
    }
  };
}