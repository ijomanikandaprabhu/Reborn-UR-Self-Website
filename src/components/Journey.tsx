"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  LuCalendarCheck, LuCircleCheck, LuClipboardList, LuFlower2, LuMessagesSquare,
  LuPencilRuler, LuRotateCw, LuStar, LuUsers,
} from "react-icons/lu";
import type { JourneyStep } from "@/data/services";
import SectionTitle from "./SectionTitle";

const icons: Record<string, typeof LuStar> = {
  comments: LuMessagesSquare,
  "calendar-check": LuCalendarCheck,
  "user-friends": LuUsers,
  spa: LuFlower2,
  "pencil-ruler": LuPencilRuler,
  "check-circle": LuCircleCheck,
  star: LuStar,
  "clipboard-list": LuClipboardList,
  redo: LuRotateCw,
};

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Journey({ steps, whatsappHref }: { steps: JourneyStep[]; whatsappHref: string }) {
  const list = useRef<HTMLOListElement>(null);

  // As you scroll, a brown line fills down the timeline and each number
  // lights up (with a small pop) when the line reaches it.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(".jr-fill", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: list.current, start: "top 60%", end: "bottom 60%", scrub: 0.4 } });
      gsap.utils.toArray<HTMLElement>(".jr-num").forEach((n) => {
        gsap.set(n, { backgroundColor: "#ead3c8", scale: 0.85 });
        ScrollTrigger.create({
          trigger: n,
          start: "center 60%",
          onEnter: () => gsap.to(n, { backgroundColor: "#9a563a", scale: 1, duration: 0.45, ease: "back.out(3)" }),
          onLeaveBack: () => gsap.to(n, { backgroundColor: "#ead3c8", scale: 0.85, duration: 0.3 }),
        });
      });
    },
    { scope: list },
  );

  return (
    <section className="section">
      <div className="container-site">
        <SectionTitle eyebrow="What to expect" title="Your Journey With Us" />
        <ol ref={list} className="relative mx-auto max-w-[1080px] before:absolute before:inset-y-0 before:left-[19px] before:w-0.5 before:bg-theme/20 md:before:left-1/2 md:before:-ml-px">
          <span aria-hidden="true" className="jr-fill absolute inset-y-0 left-[19px] z-[1] w-0.5 origin-top bg-theme md:left-1/2 md:-ml-px" />
          {steps.map((step, i) => {
            const Icon = icons[step.icon] ?? LuStar;
            const right = i % 2 === 1;
            return (
              <li key={step.title} data-reveal={right ? "right" : "left"} className={`relative mb-7 pl-14 last:mb-0 md:mb-0 md:w-1/2 ${i > 0 ? "md:-mt-24" : ""} ${right ? "md:ml-[50%] md:pl-14" : "md:pr-14 md:pl-0"}`}>
                <span className={`jr-num absolute top-8 left-0 z-[2] flex size-10 items-center justify-center rounded-full bg-theme font-bold text-white ring-5 ring-white ${right ? "md:-left-5" : "md:right-[-20px] md:left-auto"}`}>
                  {i + 1}
                </span>
                <div className="card p-6 sm:p-7">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-theme/10 text-xl text-theme">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 text-xl">{step.title}</h3>
                  <p className="text-[15px]">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-12 text-center">
          <a href={whatsappHref} target="_blank" rel="noopener" className="btn-wa px-9 py-4 text-base">
            <FaWhatsapp className="text-xl" /> Start Your Journey on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
