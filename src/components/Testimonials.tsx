"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaQuoteRight, FaStar } from "react-icons/fa6";
import { testimonials } from "@/data/content";

/** Three cards at a time; the middle one is highlighted and they rotate slowly. */
export default function Testimonials() {
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setStart((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  const visible = [0, 1, 2].map((k) => testimonials[(start + k) % testimonials.length]);

  return (
    <section className="section">
      <div className="container-site">
        <div className="mx-auto mb-12 max-w-[600px] text-center">
          <h2 className="text-4xl lg:text-5xl">What Our Clients Say</h2>
          <p className="mt-4">
            Hear from our satisfied clients who have experienced the transformation of their brows and lips with our expert
            treatments. Our goal is to enhance your natural beauty and boost your confidence, one service at a time.
          </p>
        </div>
        <ul data-reveal="stagger" className="grid gap-6 lg:grid-cols-3" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {visible.map((t, k) => {
            const active = k === 1;
            return (
              <li
                key={t.name}
                className={`relative mt-8 rounded-md transition-colors bg-white px-7 pt-14 pb-8 shadow-[0_10px_30px_rgb(18_31_56/0.06)] ${active ? "border-b-4 border-theme" : "border-b-4 border-transparent"} ${k !== 1 ? "hidden lg:block" : ""}`}
              >
                <Image src={t.image} alt="" width={66} height={66} className="absolute -top-8 left-7 size-[66px] rounded-full border-4 border-white shadow" />
                <FaQuoteRight className={`absolute -top-6 right-7 text-6xl ${active ? "text-theme" : "text-theme/20"}`} aria-hidden="true" />
                <div className="flex gap-1 text-theme" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, i) => <FaStar key={i} aria-hidden="true" />)}
                </div>
                <blockquote className="mt-3">{t.text}</blockquote>
                <p className="mt-4 font-title text-2xl text-title">{t.name}</p>
                <p className="text-xs font-medium tracking-wide text-theme uppercase">{t.role}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setStart((i - 1 + testimonials.length) % testimonials.length)}
              aria-label={`Show review from ${t.name}`}
              className={`h-2 rounded-full transition-all ${(start + 1) % testimonials.length === i ? "w-8 bg-theme" : "w-2 bg-theme/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
