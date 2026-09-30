"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { LuArrowRight, LuAward, LuHourglass, LuUsers } from "react-icons/lu";
import { heroSlides } from "@/data/content";
import { whatsappLink } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SLIDE_MS = 9000;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Desktop geometry, all derived from CSS variables on the stage:
 *   --d   circle diameter: two-thirds of the hero height, but small enough that the
 *         headline (--t) keeps its gap (--g) to the circle and a margin (--m) from the edge
 *   --t   headline width, --g gap to the circle, --b how far the badge sticks out
 *   --cx  circle centre: the middle of the page
 */
const stageVars = {
  "--t": "min(360px, 23vw)",
  "--g": "24px",
  "--m": "max(64px, 6vw)",
  "--d": "min(calc(max(600px, 100svh - var(--header-h, 161px)) * 0.66), calc(100vw - 2 * (var(--g) + var(--t) + var(--m))))",
  "--bw": "clamp(250px, 16vw, 290px)",
  "--b": "calc(var(--bw) - 60px)",
  "--cx": "50%",
  "--ctop": "calc(100% - var(--d) * 1.25)",
} as React.CSSProperties;

/** A headline line split into letters that can rise one by one. */
function Letters({ text }: { text: string }) {
  return (
    <span className="hl-line block overflow-hidden pb-[0.06em]">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((ch, i) => (
          <span key={i} className="hc inline-block">{ch === " " ? " " : ch}</span>
        ))}
      </span>
    </span>
  );
}

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    if (paused || reducedMotion()) return;
    const id = setInterval(() => setActive((i) => (i + 1) % heroSlides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [paused]);

  // Always-on motion: rings, circle draw-in, mouse depth, scroll exit.
  useGSAP(
    () => {
      if (reducedMotion()) return;
      const firstVisit = !document.documentElement.hasAttribute("data-seen");


      // The circle's border draws itself in, then the photo rises into it.
      const intro = gsap.timeline({ delay: firstVisit ? 1.3 : 0.1 });
      intro
        .fromTo(".hero-draw circle", { strokeDashoffset: 1, opacity: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" })
        .to(".hero-draw", { opacity: 0, duration: 0.8 }, "-=0.2")
        .fromTo(".hero-disc", { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: "expo.out" }, 0.3)
        .fromTo(".hero-photo", { yPercent: 8 }, { yPercent: 0, duration: 1.4, ease: "expo.out" }, 0.2)
        // Then the rings start growing out from behind the circle, as on the old site.
        .fromTo(".hero-ring", { scale: 1, opacity: 0.2 }, { scale: 2, opacity: 0, duration: 5, ease: "none", immediateRender: false, stagger: { each: 1.5, repeat: -1 } }, 1.6);

      // Mouse depth: each layer drifts by a different amount.
      if (window.matchMedia("(pointer: fine)").matches) {
        const layers = gsap.utils.toArray<HTMLElement>("[data-depth]").map((el) => ({
          depth: Number(el.dataset.depth),
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
        }));
        const onMove = (e: MouseEvent) => {
          const dx = e.clientX / window.innerWidth - 0.5;
          const dy = e.clientY / window.innerHeight - 0.5;
          layers.forEach((l) => { l.x(dx * -l.depth); l.y(dy * -l.depth * 0.6); });
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      }
    },
    { scope },
  );

  // Scroll exit (desktop): the photo lags behind the page and the words fade.
  useGSAP(
    () => {
      if (reducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const trigger = { trigger: scope.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero-scroll-art", { yPercent: 18, ease: "none", scrollTrigger: trigger });
        gsap.to(".hero-scroll-text", { opacity: 0, yPercent: -30, ease: "none", scrollTrigger: { ...trigger, end: "60% top" } });
      });
      return () => mm.revert();
    },
    { scope },
  );

  // Slide change: the old site's layer timings, with the headline now
  // rising letter by letter and a slow zoom on the photo.
  const prev = useRef<number | null>(null);
  useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLElement>(".hero-slide");
      const photos = gsap.utils.toArray<HTMLElement>(".hero-photo img");
      const badge = ".hero-badge";
      const from = prev.current;
      prev.current = active;

      slides.forEach((s, i) => {
        if (i !== active && i !== from) gsap.set(s, { autoAlpha: 0 });
      });
      if (reducedMotion()) {
        gsap.set(slides, { autoAlpha: 0 });
        gsap.set(slides[active], { autoAlpha: 1 });
        return;
      }

      const ease = "expo.out";
      const tl = gsap.timeline();
      let start = 0;
      if (from !== null && from !== active) {
        const out = slides[from];
        tl.to(out.querySelectorAll(".hc"), { yPercent: -110, duration: 0.45, ease: "power2.in", stagger: 0.012 }, 0)
          .to(out.querySelectorAll(".hl"), { x: -100, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, 0)
          .to(out.querySelector(".hl-btn"), { y: 150, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 0)
          .to(badge, { x: 300, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 0)
          .set(out, { autoAlpha: 0 });
        start = 0.65;
      } else if (!document.documentElement.hasAttribute("data-seen")) {
        start = 1.4; // wait for the eyes loader on a first visit
      }

      // Slow zoom (Ken Burns) on the photo for as long as the slide shows.
      photos.forEach((p, i) => {
        gsap.killTweensOf(p);
        if (i === active) gsap.fromTo(p, { scale: 1 }, { scale: 1.06, duration: SLIDE_MS / 1000 + 1, ease: "none", transformOrigin: "50% 100%" });
      });

      const inn = slides[active];
      tl.set(inn, { autoAlpha: 1 }, start)
        .fromTo(inn.querySelectorAll(".hl"), { x: -60, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.2, ease }, start)
        .fromTo(inn.querySelectorAll(".hc"), { yPercent: 110, opacity: 1 }, { yPercent: 0, duration: 1, ease, stagger: 0.035 }, start + 0.2)
        .fromTo(inn.querySelector(".hl-btn"), { y: 150, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.5, ease }, start + 0.8)
        .fromTo(badge, { x: 100, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1.5, ease }, start + 0.5)
        .fromTo(`${badge} .hb-icon`, { y: -50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.5, ease }, start + 1)
        .fromTo(`${badge} .hb-txt`, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.5, ease, stagger: 0.1 }, start + 1);
    },
    { scope, dependencies: [active] },
  );

  // Phones: stacked (text, then photo). Tablets: text left, photo right.
  // Desktop: a full-width stage laid out from the CSS variables above.
  return (
    <section
      ref={scope}
      className="relative overflow-hidden bg-gradient-to-b from-[#fdf0e8] to-[#fdeee6]"
      aria-roledescription="carousel"
      aria-label="Highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative flex min-h-[calc(100svh-var(--header-h,161px))] flex-col items-center justify-center md:max-lg:min-h-[min(640px,62svh)] md:flex-row md:items-end md:justify-between md:px-10 lg:block lg:h-[calc(100svh-var(--header-h,161px))] lg:min-h-[600px] lg:px-0 lg:portrait:h-[760px]"
        style={stageVars}
      >
        {/* Leaves, framing the circle */}
        <div data-depth="45" className="absolute top-[calc(var(--ctop)-var(--d)*0.04)] left-[calc(var(--cx)+var(--d)*0.12)] z-10 hidden w-[clamp(60px,5vw,110px)] lg:block">
          <Image src="/assets/img/hero/leaf-1-5.png" alt="" width={193} height={206} className="w-full animate-float [animation-delay:1.5s]" />
        </div>
        <div data-depth="35" className="absolute top-[calc(var(--ctop)+var(--d)*0.95)] left-[calc(var(--cx)-var(--d)/2-var(--g)-clamp(50px,4.5vw,95px))] z-10 hidden w-[clamp(50px,4.5vw,95px)] lg:block">
          <Image src="/assets/img/hero/leaf-1-8.png" alt="" width={258} height={271} className="w-full animate-float" />
        </div>

        {/* Words: one block per slide, stacked; only the active one shows. */}
        <div className="hero-scroll-text relative z-10 px-4 pt-12 pb-8 md:self-center md:px-0 md:pt-0 md:pb-10 lg:absolute lg:top-1/2 lg:right-[calc(100%-var(--cx)+var(--d)/2+var(--g))] lg:-translate-y-[40%] lg:p-0">
          <div data-depth="-10" className="grid text-center md:text-left">
            {heroSlides.map((s, i) => (
              <div key={s.line1} className={`hero-slide col-start-1 row-start-1 ${i === 0 ? "" : "invisible"}`} aria-hidden={i !== active}>
                <p className="hl text-[15px] text-title">Permanent Beauty</p>
                <p className="mt-2 font-title text-5xl leading-[1.15] whitespace-nowrap text-title sm:text-[56px] lg:text-[min(60px,3.6vw)]">
                  <Letters text={s.line1} />
                  <Letters text={s.line2} />
                </p>
                <Link href="/contact" tabIndex={i === active ? 0 : -1} className="hl-btn btn-shine group mt-7 inline-flex items-center gap-4 whitespace-nowrap rounded-full bg-white py-2 pr-2 pl-6 text-base text-theme shadow-sm transition-[box-shadow,color] hover:shadow-card-hover hover:text-title">
                  Make Appointment
                  <span className="flex size-[46px] items-center justify-center rounded-full bg-theme text-xl text-white transition group-hover:bg-title"><LuArrowRight className="transition-transform duration-300 group-hover:translate-x-1" /></span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Circle and photo */}
        <div className="hero-scroll-art hero-art relative mt-2 aspect-square w-full max-w-[min(520px,84vw,calc(100svh-var(--header-h,145px)-380px))] md:mt-10 md:max-w-[min(52%,calc(62svh-40px))] lg:absolute lg:inset-0 lg:mt-0 lg:aspect-auto lg:w-auto lg:max-w-none">
          <div data-depth="12" className="absolute inset-[4%] flex items-center justify-center lg:inset-auto lg:top-[var(--ctop)] lg:left-[calc(var(--cx)-var(--d)/2)] lg:size-[var(--d)]" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className="hero-ring absolute size-[66%] rounded-full bg-theme opacity-0" />
            ))}
            <div className="hero-disc relative size-full rounded-full border-[12px] border-[#f5e2d8] bg-white shadow-[0_0_0_clamp(30px,4vw,70px)_rgb(255_255_255/0.35)]" />
            <svg className="hero-draw pointer-events-none absolute inset-0 size-full -rotate-90 opacity-0" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="49" fill="none" stroke="#9a563a" strokeWidth="0.6" pathLength={1} strokeDasharray="1" strokeDashoffset="1" />
            </svg>
          </div>
          <div data-depth="24" className="hero-photo absolute inset-x-0 bottom-0 h-[92%] lg:left-[calc(var(--cx)-var(--d)*0.53)] lg:h-[calc(var(--d)*1.1)] lg:w-[calc(var(--d)*1.066)]">
            {heroSlides.map((s, i) => (
              <Image
                key={s.image}
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 45vh, 84vw"
                className={`object-contain object-bottom transition-opacity duration-1000 motion-reduce:transition-none ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>

        {/* Badge: lower right, overlapping the circle, with space below it. */}
        <div data-depth="18" className="absolute right-[max(48px,4vw)] bottom-[max(48px,4vw)] z-10 hidden w-[var(--bw)] lg:block">
          <div className="hero-badge relative bg-theme px-6 pt-7 pb-6 [@media(max-height:820px)]:px-5 [@media(max-height:820px)]:pt-5 [@media(max-height:820px)]:pb-4 text-white shadow-[0_20px_40px_rgb(154_86_58/0.35)]">
            <Image src="/assets/img/wordmark-white.svg" alt="Rebornurself" width={156} height={44} className="hb-icon mx-auto h-auto w-[78%] [@media(max-height:820px)]:w-[64%]" />
            <span className="hb-txt mx-auto mt-4 block h-px w-16 [@media(max-height:820px)]:mt-3 bg-white/40" aria-hidden="true" />

            <ul className="mt-4 space-y-2 text-[13px] font-semibold [@media(max-height:820px)]:mt-3 [@media(max-height:820px)]:space-y-1 [@media(max-height:820px)]:text-xs">
              {[
                { Icon: LuAward, text: "Certified PMU Artist" },
                { Icon: LuHourglass, text: "Results last up to 2–3 years" },
                { Icon: LuUsers, text: "Women & Men welcome" },
              ].map(({ Icon, text }) => (
                <li key={text} className="hb-txt flex items-center gap-2.5">
                  <Icon className="shrink-0 text-base text-white/80" aria-hidden="true" /> {text}
                </li>
              ))}
            </ul>

            <p className="hb-txt mt-5 [@media(max-height:820px)]:mt-3 text-[11px] font-bold tracking-[0.2em] text-white uppercase">How to book</p>
            <ol className="mt-2 space-y-1.5 text-[13px] [@media(max-height:820px)]:space-y-1 [@media(max-height:820px)]:text-xs">
              {["Send a photo on WhatsApp", "Get honest advice", "Book your slot"].map((step, i) => (
                <li key={step} className="hb-txt flex items-center gap-2.5">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-theme">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>

            <a href={whatsappLink("Hi Rebornurself, I would like to book an appointment.")} target="_blank" rel="noopener" className="hb-txt btn-shine btn-pulse group mt-5 flex items-center justify-center gap-2 rounded-full bg-white py-2.5 [@media(max-height:820px)]:mt-3 [@media(max-height:820px)]:py-2 text-sm font-semibold text-theme transition-[translate,background-color,color] duration-300 hover:-translate-y-0.5 hover:bg-title hover:text-white">
              <FaWhatsapp className="text-base group-hover:animate-[wiggle_0.6s_ease-in-out]" /> Book on WhatsApp
            </a>
          </div>
        </div>

        <div className="relative z-10 flex justify-center gap-2 py-5 md:absolute md:bottom-6 md:left-10 md:py-0 lg:bottom-8 lg:left-[var(--cx)] lg:-translate-x-1/2 lg:mt-0 lg:py-0">
          {heroSlides.map((s, i) => (
            <button
              key={s.line1}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === active}
              className="flex h-11 min-w-6 items-center justify-center px-1"
            >
              <span className={`block h-2 rounded-full transition-all ${i === active ? "w-8 bg-theme" : "w-2 bg-theme/30"}`} />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
