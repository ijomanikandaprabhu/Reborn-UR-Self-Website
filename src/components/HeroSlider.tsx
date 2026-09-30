"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { heroSlides } from "@/data/content";

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-cream to-peach/60"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Image src="/assets/img/hero/leaf-1-8.png" alt="" width={258} height={271} className="absolute bottom-10 left-4 hidden w-24 animate-float md:block" />
      <Image src="/assets/img/hero/leaf-1-5.png" alt="" width={193} height={206} className="absolute top-24 right-0 hidden w-24 animate-float [animation-delay:1s] md:block" />

      <div className="container-site grid items-center gap-8 pt-12 lg:min-h-[640px] lg:grid-cols-2 lg:pt-0">
        <div className="relative z-10 text-center lg:text-left">
          <p className="text-lg text-title">Permanent Beauty in Chennai</p>
          {/* Every slide's headline is in the page; only the active one shows. */}
          <div className="grid">
            {heroSlides.map((s, i) => (
              <p
                key={s.line1}
                aria-hidden={i !== active}
                className={`col-start-1 row-start-1 mt-3 font-title text-5xl leading-[1.1] text-title transition-all duration-700 sm:text-6xl xl:text-7xl ${i === active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                {s.line1}
                <br />
                {s.line2}
              </p>
            ))}
          </div>
          <Link href="/contact" className="mt-8 inline-flex items-center gap-4 rounded-full bg-white py-2 pr-2 pl-6 text-sm font-medium text-title shadow-card hover:text-theme">
            Make Appointment
            <span className="flex size-9 items-center justify-center rounded-full bg-theme text-white"><LuArrowRight /></span>
          </Link>
          <div className="mt-8 flex justify-center gap-2 lg:justify-start">
            {heroSlides.map((s, i) => (
              <button
                key={s.line1}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-theme" : "w-2 bg-theme/30"}`}
              />
            ))}
          </div>
        </div>

        <div className="relative mx-auto aspect-[950/980] w-full max-w-[520px] self-end">
          <div className="absolute inset-x-[6%] top-[4%] aspect-square rounded-full bg-white" aria-hidden="true" />
          {heroSlides.map((s, i) => (
            <Image
              key={s.image}
              src={s.image}
              alt=""
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 520px, 90vw"
              className={`object-contain object-bottom transition-opacity duration-1000 ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
