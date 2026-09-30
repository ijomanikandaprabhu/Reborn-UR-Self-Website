"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaQuoteRight, FaStar } from "react-icons/fa6";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { testimonials } from "@/data/content";

const n = testimonials.length;

/**
 * Reviews that rotate slowly. Phones show one, tablets two, desktops three
 * (with the middle one highlighted). Swipe or use the arrows to move.
 */
export default function Testimonials() {
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);
  const dir = useRef(1);
  const moved = useRef(false);
  const scope = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const go = (step: number) => {
    dir.current = step >= 0 ? 1 : -1;
    moved.current = true;
    setStart((i) => (i + step + n) % n);
  };

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      dir.current = 1;
      moved.current = true;
      setStart((i) => (i + 1) % n);
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  // Each move: the new set of cards slides in from the side it came from.
  useGSAP(
    () => {
      if (!moved.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.set("ul > li", { transition: "none" });
      gsap.fromTo(
        "ul > li",
        { x: 60 * dir.current, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.08 * dir.current, clearProps: "transform,opacity,transition" },
      );
    },
    { scope, dependencies: [start] },
  );

  const visible = [0, 1, 2].map((k) => testimonials[(start + k) % n]);

  return (
    <section className="section">
      <div ref={scope} className="container-site">
        <div className="mx-auto mb-12 max-w-[600px] text-center">
          <h2 className="text-4xl lg:text-5xl">What Our Clients Say</h2>
          <p className="mt-4">
            Hear from our satisfied clients who have experienced the transformation of their brows and lips with our expert
            treatments. Our goal is to enhance your natural beauty and boost your confidence, one service at a time.
          </p>
        </div>
        <ul
          data-reveal="stagger"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setPaused(true); }}
          onTouchEnd={(e) => {
            const start = touchX.current;
            touchX.current = null;
            setPaused(false);
            if (start === null) return;
            const dx = e.changedTouches[0].clientX - start;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          }}
        >
          {visible.map((t, k) => {
            const active = k === 1;
            // Phones: middle card only. Tablets: middle and right. Desktop: all three.
            const show = k === 1 ? "" : k === 2 ? "hidden md:block" : "hidden lg:block";
            return (
              <li
                key={t.name}
                className={`relative mt-8 rounded-md border-b-4 bg-white px-7 pt-14 pb-8 shadow-[0_10px_30px_rgb(18_31_56/0.06)] transition-colors ${active ? "border-theme" : "border-transparent"} ${show}`}
              >
                <Image src={t.image} alt="" width={66} height={66} className="absolute -top-8 left-7 size-[66px] rounded-full border-4 border-white shadow" />
                <FaQuoteRight className={`absolute -top-6 right-7 text-6xl ${active ? "text-theme" : "text-theme/20"}`} aria-hidden="true" />
                <div className="flex gap-1 text-theme" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, i) => <FaStar key={i} aria-hidden="true" />)}
                </div>
                <blockquote className="mt-3">{t.text}</blockquote>
                <p className="mt-4 font-title text-2xl text-title">{t.name}</p>
                <p className="text-[13px] font-medium tracking-wide text-theme uppercase">{t.role}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="flex  size-11 items-center justify-center rounded-full border border-line text-title transition hover:border-theme hover:bg-theme hover:text-white">
            <LuChevronLeft />
          </button>
          <div className="flex">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => {
                  const target = (i - 1 + n) % n;
                  if (target === start) return;
                  dir.current = 1;
                  moved.current = true;
                  setStart(target);
                }}
                aria-label={`Show review from ${t.name}`}
                className="flex h-11 min-w-6 items-center justify-center px-1"
              >
                <span className={`block h-2 rounded-full transition-all ${(start + 1) % n === i ? "w-8 bg-theme" : "w-2 bg-theme/30"}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next review" className="flex  size-11 items-center justify-center rounded-full border border-line text-title transition hover:border-theme hover:bg-theme hover:text-white">
            <LuChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
