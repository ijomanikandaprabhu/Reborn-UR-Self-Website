"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaStar, FaWhatsapp } from "react-icons/fa6";
import { LuArrowRight, LuAward } from "react-icons/lu";
import { heroSlides } from "@/data/content";
import { whatsappLink } from "@/lib/site";

const SLIDE_MS = 7000;

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const scope = useRef<HTMLElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % heroSlides.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [paused, active]);

  // Ambient motion: rings pulsing out from behind the arch, cards bobbing.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".hero-ring", { scale: 0.9, opacity: 0.25 }, { scale: 1.6, opacity: 0, duration: 4.5, ease: "sine.out", stagger: { each: 1.5, repeat: -1 } });
      gsap.to(".hero-chip", { y: -10, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.8 });
    },
    { scope },
  );

  // Slide change: old words and photo leave, new ones arrive.
  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const slides = gsap.utils.toArray<HTMLElement>(".hero-slide");
      const photos = gsap.utils.toArray<HTMLElement>(".hero-photo");
      const bars = gsap.utils.toArray<HTMLElement>(".hero-bar");

      slides.forEach((s, i) => gsap.set(s, { autoAlpha: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }));
      gsap.killTweensOf(bars);
      bars.forEach((b, i) => gsap.set(b, { scaleX: i < active ? 1 : 0 }));
      if (!paused && !reduce) gsap.to(bars[active], { scaleX: 1, duration: SLIDE_MS / 1000, ease: "none" });
      else gsap.set(bars[active], { scaleX: 1 });

      const words = slides[active].querySelectorAll(".hero-word");
      const lines = slides[active].querySelectorAll(".hero-line");
      if (reduce) {
        photos.forEach((p, i) => gsap.set(p, { autoAlpha: i === active ? 1 : 0, clipPath: "inset(0% 0 0 0)" }));
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      photos.forEach((p, i) => {
        if (i === active) {
          tl.fromTo(p, { autoAlpha: 1, clipPath: "inset(100% 0 0 0)", scale: 1.12 }, { clipPath: "inset(0% 0 0 0)", scale: 1, duration: first.current ? 1.4 : 1.2, zIndex: 2 }, 0);
        } else {
          tl.to(p, { autoAlpha: 0, duration: 0.8, zIndex: 1 }, 0.3);
        }
      });
      tl.fromTo(words, { yPercent: 110, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.08 }, 0.15);
      tl.fromTo(lines, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1 }, 0.45);
      first.current = false;
    },
    { scope, dependencies: [active, paused] },
  );

  const go = (i: number) => setActive((i + heroSlides.length) % heroSlides.length);

  return (
    <section
      ref={scope}
      className="relative overflow-hidden bg-gradient-to-br from-[#fdf3ed] via-[#fdeee6] to-[#f9e1d4]"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Image src="/assets/img/hero/leaf-1-8.png" alt="" width={258} height={271} className="absolute -bottom-6 -left-6 hidden w-[120px] animate-float md:block" />
      <Image src="/assets/img/hero/leaf-1-5.png" alt="" width={193} height={206} className="absolute top-10 right-[3%] hidden w-[70px] animate-float [animation-delay:1.5s] md:block" />

      <div className="container-site grid items-center gap-8 pt-10 pb-12 sm:py-14 lg:min-h-[680px] lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:py-0">
        {/* Words */}
        <div className="relative z-10 grid text-center lg:text-left">
          {heroSlides.map((s, i) => (
            <div key={s.line1} className="hero-slide col-start-1 row-start-1" aria-hidden={i !== active}>
              <p className="hero-line eyebrow">{s.eyebrow}</p>
              <p className="mt-3 font-title text-[44px] leading-[1.08] text-title sm:text-6xl xl:text-[76px]">
                {[s.line1, s.line2].map((line, li) => (
                  <span key={line} className={`block ${li === 1 ? "text-theme" : ""}`}>
                    {line.split(" ").map((w) => (
                      <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                        <span className="hero-word inline-block">{w}&nbsp;</span>
                      </span>
                    ))}
                  </span>
                ))}
              </p>
              <p className="hero-line mx-auto mt-6 hidden max-w-[460px] text-[17px] sm:block lg:mx-0">{s.text}</p>
              <div className="hero-line mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
                <a href={whatsappLink(`Hi Rebornurself, I would like to book ${s.topic}.`)} target="_blank" rel="noopener" tabIndex={i === active ? 0 : -1} className="btn-theme px-8 py-4">
                  <FaWhatsapp className="text-lg" /> Book on WhatsApp
                </a>
                <Link href={s.href} tabIndex={i === active ? 0 : -1} className="btn border border-title/15 bg-white/60 px-8 py-4 text-title hover:bg-white">
                  Explore {s.topic} <LuArrowRight />
                </Link>
              </div>
            </div>
          ))}

          {/* Slide controls */}
          <div className="col-start-1 row-start-2 mt-8 flex sm:mt-12 justify-center gap-6 lg:justify-start">
            {heroSlides.map((s, i) => (
              <button key={s.line1} type="button" onClick={() => go(i)} aria-label={`Show slide ${i + 1}: ${s.topic}`} aria-current={i === active} className="group w-20 text-left sm:w-28">
                <span className={`font-title text-lg transition-colors ${i === active ? "text-title" : "text-title/35 group-hover:text-title/70"}`}>0{i + 1}</span>
                <span className="mt-1.5 block h-0.5 overflow-hidden bg-title/10">
                  <span className="hero-bar block h-full origin-left scale-x-0 bg-theme" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[520px] lg:mr-0">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            {[0, 1, 2].map((i) => <span key={i} className="hero-ring absolute aspect-square w-[92%] rounded-full border-2 border-theme/40 opacity-0" />)}
          </div>
          <div className="relative mx-auto aspect-[4/5] w-[86%] overflow-hidden rounded-t-full border-[10px] border-white/70 bg-gradient-to-b from-white to-[#f8dccd] shadow-[0_30px_60px_rgb(154_86_58/0.18)]">
            {heroSlides.map((s, i) => (
              <Image
                key={s.image}
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 450px, 86vw"
                className={`hero-photo object-contain object-bottom pt-6 ${i === 0 ? "" : "invisible"}`}
              />
            ))}
          </div>

          <div className="hero-chip absolute z-10 top-[18%] -left-2 hidden items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-card-hover backdrop-blur sm:flex">
            <span className="flex size-10 items-center justify-center rounded-full bg-theme text-lg text-white"><LuAward /></span>
            <span className="text-sm leading-tight">
              <strong className="block font-semibold text-title">Certified PMU Artist</strong>Master’s Advanced Level
            </span>
          </div>
          <div className="hero-chip absolute z-10 right-0 bottom-[14%] hidden rounded-2xl bg-white/90 px-4 py-3 shadow-card-hover backdrop-blur sm:block">
            <span className="flex gap-0.5 text-sm text-[#f5b400]" aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <FaStar key={i} />)}</span>
            <span className="mt-1 block text-sm leading-tight"><strong className="font-semibold text-title">Women &amp; Men</strong> · New Perungalathur</span>
          </div>
        </div>
      </div>
    </section>
  );
}
