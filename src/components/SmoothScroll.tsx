"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

let lenis: Lenis | null = null;

/** Freeze or release page scrolling (menus and the photo viewer use this). */
export function setScrollLocked(locked: boolean) {
  document.body.style.overflow = locked ? "hidden" : "";
  if (locked) lenis?.stop();
  else lenis?.start();
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in
 * sync, plus fade-up reveals for anything marked with data-reveal.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion()) return;
    lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // New page: start at the top and wire up that page's reveals.
  useGSAP(
    () => {
      lenis?.scrollTo(0, { immediate: true });
      if (reducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const children = el.dataset.reveal === "stagger" ? Array.from(el.children) : [el];
        gsap.from(children, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          // Cards have CSS hover transitions; keep them out of GSAP's way.
          transition: "none",
          clearProps: "transition,transform,opacity",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      ScrollTrigger.refresh();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
