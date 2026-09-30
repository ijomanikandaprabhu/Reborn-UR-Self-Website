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
    const id = setInterval(() => setActive((i) => (i + 1) % heroSlides.length), 7000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      ref={scope}
      className="relative overflow-hidden bg-gradient-to-b from-[#fdf0e8] to-[#fdeee6]"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Image src="/assets/img/hero/leaf-1-8.png" alt="" width={258} height={271} className="absolute bottom-24 left-8 z-10 hidden w-[90px] animate-float md:block" />
      <Image src="/assets/img/hero/leaf-1-5.png" alt="" width={193} height={206} className="absolute top-52 -right-4 z-10 hidden w-[80px] animate-float [animation-delay:1.5s] md:block" />

      <div className="container-site relative grid min-h-[calc(100svh-var(--header-h,161px))] items-end lg:portrait:min-h-0 lg:portrait:pt-10 lg:hero-grid">
        <div className="relative z-10 pt-14 text-center lg:self-center lg:pt-0 lg:pl-16 lg:text-left">
          <p className="text-[15px] text-title">Permanent Beauty</p>
          {/* Every headline stays in the page; only the active one shows. */}
          <div className="grid">
            {heroSlides.map((s, i) => (
              <p
                key={s.line1}
                aria-hidden={i !== active}
                className={`col-start-1 row-start-1 mt-2 font-title text-5xl leading-[1.15] whitespace-nowrap text-title transition-opacity sm:text-[56px] ${i === active ? "opacity-100 delay-300 duration-700" : "opacity-0 duration-300"}`}
              >
                {s.line1}
                <br />
                {s.line2}
              </p>
            ))}
          </div>
          <Link href="/contact" className="mt-8 inline-flex items-center gap-4 whitespace-nowrap rounded-full bg-white py-2 pr-2 pl-6 text-base text-theme shadow-sm hover:text-title">
            Make Appointment
            <span className="flex size-[50px] items-center justify-center rounded-full bg-theme text-xl text-white"><LuArrowRight /></span>
          </Link>
        </div>

        <div className="hero-art relative mx-auto mt-6 aspect-[950/980] w-full max-w-[min(560px,84vw)] lg:mt-0 lg:w-[min(860px,calc((100svh-var(--header-h,161px))*0.95))] lg:max-w-none lg:justify-self-center lg:-translate-x-8">
          <div className="absolute inset-x-[2%] top-[2%] flex aspect-square items-center justify-center" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className="hero-ring absolute size-[66%] rounded-full bg-theme opacity-0" />
            ))}
            <div className="relative size-full rounded-full border-[14px] border-[#f7e6dc] bg-white shadow-[0_0_0_70px_rgb(255_255_255/0.35)]" />
          </div>
          {heroSlides.map((s, i) => (
            <Image
              key={s.image}
              src={s.image}
              alt=""
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 620px, 90vw"
              className={`object-contain object-bottom transition-opacity duration-1000 ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>

        <div className="relative z-10 hidden self-center lg:block">
          <div className="relative ml-auto w-[245px] bg-theme px-6 py-9 text-center text-white shadow-[0_20px_40px_rgb(154_86_58/0.35)]">
            <span className="absolute top-0 -left-[18px] size-[18px] bg-theme-dark [clip-path:polygon(0_0,100%_0,100%_100%)]" aria-hidden="true" />
            <Image src="/assets/img/hero/rose-1.png" alt="" width={93} height={60} className="mx-auto w-[70px] brightness-0 invert" />
            <p className="mt-3 font-title text-xl">Rebornurself</p>
            <ul className="mt-4 space-y-1.5 text-xs font-bold">
              <li>Flexible Services</li>
              <li>Expert Treatments</li>
              <li>Virtual Consults</li>
            </ul>
          </div>
        </div>

        <div className="relative z-10 flex justify-center gap-2 pb-6 lg:absolute lg:bottom-8 lg:left-[76px] lg:pb-0">
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
