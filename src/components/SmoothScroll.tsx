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

      // Each element (or each child of a stagger list) animates when it itself
      // reaches the screen, so long lists never leave items waiting.
      const base = { duration: 0.8, ease: "power3.out", transition: "none", clearProps: "transition,transform,opacity" };
      gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-reveal=stagger])").forEach((el) => {
        gsap.from(el, { ...(from[el.dataset.reveal || "up"] ?? from.up), ...base, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal=stagger] > *");
      gsap.set(items, from.up);
      ScrollTrigger.batch(items, {
        start: "top 92%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, stagger: 0.08, ...base }),
      });

      // data-wipe (photos): a soft fade up with a gentle zoom-out. No wipe.
      gsap.utils.toArray<HTMLElement>("[data-wipe]").forEach((el) => {
        const trigger = { trigger: el, start: "top 92%", once: true };
        gsap.from(el, { opacity: 0, y: 30, duration: 0.9, ease: "power3.out", scrollTrigger: trigger, clearProps: "opacity,transform" });
        const img = el.querySelector("img");
        if (img) gsap.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.2, ease: "power3.out", scrollTrigger: trigger, clearProps: "transform" });
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
      // Images and fonts that finish loading later shift the layout; keep trigger positions in sync.
      let t: ReturnType<typeof setTimeout>;
      const ro = new ResizeObserver(() => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(), 150); });
      ro.observe(document.body);
      return () => { ro.disconnect(); clearTimeout(t); };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
