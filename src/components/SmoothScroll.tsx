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

// Starting point of each reveal style; elements animate from here to their place.
const from: Record<string, gsap.TweenVars> = {
  up: { y: 50, opacity: 0 },
  left: { x: -80, opacity: 0 },
  right: { x: 80, opacity: 0 },
  zoom: { scale: 0.85, opacity: 0 },
  fade: { opacity: 0 },
};

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in
 * sync, plus the scroll animations:
 *   data-reveal="up|left|right|zoom|fade"  animate the element in
 *   data-reveal="stagger"                  animate its children in one by one
 *   data-parallax="0.2"                    move at a different speed while scrolling
 *   data-parallax-bg                       slide the background image while scrolling
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

  // New page: start at the top and wire up that page's animations.
  useGSAP(
    () => {
      lenis?.scrollTo(0, { immediate: true });
      if (reducedMotion()) return;

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const kind = el.dataset.reveal || "up";
        const stagger = kind === "stagger";
        gsap.from(stagger ? Array.from(el.children) : el, {
          ...(from[stagger ? "up" : kind] ?? from.up),
          duration: 1,
          ease: "power3.out",
          stagger: stagger ? 0.12 : 0,
          // Cards have CSS hover transitions; keep them out of GSAP's way.
          transition: "none",
          clearProps: "transition,transform,opacity",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // data-wipe: the photo is uncovered from left to right, with a slight zoom-out.
      gsap.utils.toArray<HTMLElement>("[data-wipe]").forEach((el, i) => {
        const trigger = { trigger: el, start: "top 85%", once: true };
        gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, delay: (i % 2) * 0.25, ease: "power3.inOut", scrollTrigger: trigger, clearProps: "clipPath" });
        const img = el.querySelector("img");
        if (img) gsap.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 1.6, delay: (i % 2) * 0.25, ease: "power3.out", scrollTrigger: trigger, clearProps: "transform" });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.15;
        gsap.fromTo(
          el,
          { yPercent: speed * 50 },
          { yPercent: speed * -50, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax-bg]").forEach((el) => {
        gsap.fromTo(
          el,
          { backgroundPositionY: "0%" },
          { backgroundPositionY: "100%", ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      ScrollTrigger.refresh();
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
