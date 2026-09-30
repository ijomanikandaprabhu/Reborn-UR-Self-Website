"use client";

import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { LuArrowRight } from "react-icons/lu";
import { genderLabel, iconPath, servicePath, services, serviceFullName, type Gender } from "@/data/services";
import { enquiryMessage, whatsappLink } from "@/lib/site";

export default function ServiceTabs() {
  const [gender, setGender] = useState<Gender>("women");
  const scope = useRef<HTMLDivElement>(null);
  const switched = useRef(false);

  // When the visitor switches Women/Men, the new cards rise in one by one.
  useGSAP(
    () => {
      if (!switched.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(`#panel-${gender} > li`, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.07, clearProps: "transform,opacity" });
    },
    { scope, dependencies: [gender] },
  );

  return (
    <div ref={scope}>
      <div className="relative mx-auto mb-12 grid w-fit grid-cols-2 rounded-full bg-peach p-1.5" role="tablist" aria-label="Services for">
        {/* Brown pill that slides under the selected option. */}
        <span
          aria-hidden="true"
          className={`absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-theme shadow transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)] motion-reduce:transition-none ${gender === "men" ? "translate-x-full" : "translate-x-0"}`}
        />
        {(["women", "men"] as const).map((g) => (
          <button
            key={g}
            type="button"
            role="tab"
            id={`tab-${g}`}
            aria-selected={gender === g}
            aria-controls={`panel-${g}`}
            onClick={() => { switched.current = true; setGender(g); }}
            className={`relative z-10 rounded-full px-9 py-2.5 text-sm font-medium transition-colors duration-500 ${gender === g ? "text-white" : "text-title hover:text-theme"}`}
          >
            {genderLabel(g)}
          </button>
        ))}
      </div>

      {(["women", "men"] as const).map((g) => (
        // Both panels stay in the HTML so Google can follow every service link.
        <ul key={g} id={`panel-${g}`} role="tabpanel" aria-labelledby={`tab-${g}`} hidden={gender !== g} data-reveal="stagger" className="flex flex-wrap justify-center gap-x-6 gap-y-14 pt-8 [&>li]:w-full md:[&>li]:w-[calc(50%-12px)] xl:[&>li]:w-[calc(33.333%-16px)]">
          {services.filter((s) => s.gender === g).map((s) => (
            <li key={s.slug} className="card group relative flex flex-col items-center px-7 pt-16 pb-8 text-center hover:border-theme/30">
              <div className="absolute -top-11 flex size-[88px] items-center justify-center rounded-full border-[5px] border-white bg-peach shadow-card transition-colors duration-300 group-hover:bg-theme">
                <Image src={iconPath(s)} alt="" width={46} height={46} className="transition duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert" />
              </div>
              <h3 className="text-2xl">
                <Link href={servicePath(s)} className="transition-colors group-hover:text-theme">{s.name}</Link>
              </h3>
              <span className="my-3 flex gap-1" aria-hidden="true">
                <i className="size-1.5 rounded-full bg-theme/40" /><i className="size-1.5 rounded-full bg-theme" /><i className="size-1.5 rounded-full bg-theme/40" />
              </span>
              <p className="flex-1 text-[15px]">{s.card}</p>
              <div className="mt-6 flex flex-col items-center gap-3">
                <a href={whatsappLink(enquiryMessage(serviceFullName(s)))} target="_blank" rel="noopener" className="btn-wa px-6 py-2.5 text-sm">
                  <FaWhatsapp /> Enquire Now
                </a>
                <Link href={servicePath(s)} className="flex items-center gap-1.5 text-sm font-medium text-theme hover:text-title">
                  View Details <span className="sr-only">about {serviceFullName(s)}</span> <LuArrowRight />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
