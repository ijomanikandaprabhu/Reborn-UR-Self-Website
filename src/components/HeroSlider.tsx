"use client";

import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { heroSlides } from "@/data/content";

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const scope = useRef<HTMLElement>(null);

  // Rings that grow out from behind the photo and fade (as on the old site),
  // and a gentle sideways drift of the photo that follows the mouse.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".hero-ring",
        { scale: 1, opacity: 0.2 },
        { scale: 2, opacity: 0, duration: 5, ease: "none", stagger: { each: 1.5, repeat: -1 } },
      );
      const art = scope.current?.querySelector(".hero-art");
      if (!art || !window.matchMedia("(pointer: fine)").matches) return;
      const moveX = gsap.quickTo(art, "x", { duration: 1.2, ease: "power3.out" });
      const onMove = (e: MouseEvent) => moveX(((e.clientX / window.innerWidth) - 0.5) * -30);
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope },
  );

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % heroSlides.length), 9000);
    return () => clearInterval(id);
  }, [paused]);

  // Slide change, with the old site's layer timings: the outgoing words slide
  // left, the badge slides right; then the new words slide in from the left
  // line by line, the button rises, and the badge comes back from the right
  // with its icon dropping in and its lines rising one by one.
  const prev = useRef<number | null>(null);
  useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLElement>(".hero-slide");
      const badge = ".hero-badge";
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const from = prev.current;
      prev.current = active;

      slides.forEach((s, i) => {
        if (i !== active && i !== from) gsap.set(s, { autoAlpha: 0 });
      });
      if (reduce) {
        gsap.set(slides, { autoAlpha: 0 });
        gsap.set(slides[active], { autoAlpha: 1 });
        return;
      }

      const ease = "expo.out";
      const tl = gsap.timeline();
      let start = 0;
      if (from !== null && from !== active) {
        const out = slides[from];
        tl.to(out.querySelectorAll(".hl"), { x: -100, autoAlpha: 0, duration: 0.6, ease: "power2.in", stagger: 0.05 }, 0)
          .to(out.querySelector(".hl-btn"), { y: 150, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 0)
          .to(badge, { x: 300, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 0)
          .set(out, { autoAlpha: 0 });
        start = 0.65;
      } else if (!document.documentElement.hasAttribute("data-seen")) {
        start = 1.4; // wait for the eyes loader on a first visit
      }

      const inn = slides[active];
      const lines = inn.querySelectorAll(".hl");
      tl.set(inn, { autoAlpha: 1 }, start)
        .fromTo(lines, { x: -100, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.5, ease, stagger: (i) => [0, 0.4, 0.6][i] ?? 0.6 }, start)
        .fromTo(inn.querySelector(".hl-btn"), { y: 150, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.5, ease }, start + 0.8)
        .fromTo(badge, { x: 100, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.5, ease }, start + 0.5)
        .fromTo(`${badge} .hb-icon`, { y: -50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.5, ease }, start + 1)
        .fromTo(`${badge} .hb-txt`, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.5, ease, stagger: 0.1 }, start + 1);
    },
    { scope, dependencies: [active] },
  );

  // Phones: stacked (text, then photo). Desktop: a full-width stage laid out
  // in percentages, with the circle and photo centred on the page.
  return (
    <section
      ref={scope}
      className="relative overflow-hidden bg-gradient-to-b from-[#fdf0e8] to-[#fdeee6]"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative flex min-h-[calc(100svh-var(--header-h,161px))] flex-col items-center lg:block lg:h-[calc(100svh-var(--header-h,161px))] lg:min-h-[600px] lg:portrait:h-[760px]">
        <Image src="/assets/img/hero/leaf-1-5.png" alt="" width={193} height={206} className="absolute top-[38%] left-[83.5%] z-10 hidden w-[6.5%] max-w-[130px] animate-float [animation-delay:1.5s] md:block" />
        <Image src="/assets/img/hero/leaf-1-8.png" alt="" width={258} height={271} className="absolute top-[73%] left-[14.5%] z-10 hidden w-[5%] max-w-[100px] animate-float md:block" />

        {/* Words: one block per slide, stacked; only the active one shows. */}
        <div className="relative z-10 grid px-4 pt-12 text-center lg:absolute lg:top-1/2 lg:left-[19%] lg:-translate-y-[40%] lg:p-0 lg:text-left">
          {heroSlides.map((s, i) => (
            <div key={s.line1} className={`hero-slide col-start-1 row-start-1 ${i === 0 ? "" : "invisible"}`} aria-hidden={i !== active}>
              <p className="hl text-[15px] text-title">Permanent Beauty</p>
              <p className="mt-2 font-title text-5xl leading-[1.15] whitespace-nowrap text-title sm:text-[56px] xl:text-[60px]">
                <span className="hl block">{s.line1}</span>
                <span className="hl block">{s.line2}</span>
              </p>
              <Link href="/contact" tabIndex={i === active ? 0 : -1} className="hl-btn mt-7 inline-flex items-center gap-4 whitespace-nowrap rounded-full bg-white py-2 pr-2 pl-6 text-base text-theme shadow-sm hover:text-title">
                Make Appointment
                <span className="flex size-[46px] items-center justify-center rounded-full bg-theme text-xl text-white"><LuArrowRight /></span>
              </Link>
            </div>
          ))}
        </div>

        {/* Circle and photo, centred */}
        <div className="hero-art relative mt-8 aspect-square w-[min(520px,84vw)] lg:absolute lg:inset-0 lg:mt-0 lg:aspect-auto lg:w-auto">
          <div className="absolute inset-[4%] flex items-center justify-center lg:inset-auto lg:top-[17%] lg:left-1/2 lg:h-[66%] lg:-translate-x-1/2 lg:aspect-square" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className="hero-ring absolute size-[66%] rounded-full bg-theme opacity-0" />
            ))}
            <div className="relative size-full rounded-full border-[12px] border-[#f5e2d8] bg-white shadow-[0_0_0_clamp(30px,4vw,70px)_rgb(255_255_255/0.35)]" />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-[92%] lg:left-1/2 lg:h-[73%] lg:w-auto lg:-translate-x-1/2 lg:aspect-[950/980]">
            {heroSlides.map((s, i) => (
              <Image
                key={s.image}
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 45vh, 84vw"
                className={`object-contain object-bottom transition-opacity duration-1000 ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>

        {/* Badge */}
        <div className="hero-badge absolute top-[min(62%,calc(100%-290px))] left-[68.6%] z-10 hidden w-[clamp(220px,14vw,280px)] bg-theme px-6 py-9 text-center text-white shadow-[0_20px_40px_rgb(154_86_58/0.35)] lg:block">
          <span className="absolute top-0 -left-[18px] size-[18px] bg-theme-dark [clip-path:polygon(0_0,100%_0,100%_100%)]" aria-hidden="true" />
          <Image src="/assets/img/hero/rose-1.png" alt="" width={93} height={60} className="hb-icon mx-auto w-[70px] brightness-0 invert" />
          <p className="hb-txt mt-3 font-title text-xl">Rebornurself</p>
          <ul className="mt-4 space-y-1.5 text-xs font-bold">
            <li className="hb-txt">Flexible Services</li>
            <li className="hb-txt">Expert Treatments</li>
            <li className="hb-txt">Virtual Consults</li>
          </ul>
        </div>

        <div className="relative z-10 mt-auto flex justify-center gap-2 py-5 lg:absolute lg:bottom-8 lg:left-[19%] lg:mt-0 lg:py-0">
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
    </section>
  );
}
