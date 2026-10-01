"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { getService, serviceFullName } from "@/data/services";
import { enquiryMessage, whatsappLink } from "@/lib/site";

export default function WhatsAppFloat() {
  const pathname = usePathname();
  const service = getService(pathname.slice(1));
  const href = whatsappLink(service ? enquiryMessage(serviceFullName(service)) : undefined);

  // On the home page (desktop) the hero box has its own WhatsApp button,
  // so this one waits until the hero has been scrolled past.
  const [overHero, setOverHero] = useState(false);
  // The footer has its own Book on WhatsApp button, so step aside there too.
  const [overFooter, setOverFooter] = useState(false);
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setOverFooter(e.isIntersecting), { rootMargin: "0px 0px -15% 0px" });
    io.observe(footer);
    return () => io.disconnect();
  }, [pathname]);
  const hidden = (pathname === "/" && overHero) || overFooter;
  useEffect(() => {
    if (pathname !== "/") return;
    const update = () => {
      const hero = document.querySelector("main section");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
      setOverHero(window.innerWidth >= 1024 && heroBottom > window.innerHeight * 0.4);
    };
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Enquire on WhatsApp"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className={`fixed bottom-5 left-4 z-30 ${service ? "max-md:hidden" : ""} flex h-[54px] w-[54px] items-center justify-center gap-2.5 rounded-full bg-wa text-[15px] font-medium text-white shadow-[0_8px_24px_rgb(17_128_63/0.35)] transition duration-500 hover:bg-wa-dark md:bottom-8 md:left-6 md:w-auto md:px-5 ${hidden ? "pointer-events-none translate-y-24 opacity-0" : "translate-y-0 opacity-100 hover:-translate-y-0.5"}`}
    >
      <FaWhatsapp className="text-[26px]" />
      <span className="hidden md:inline">Enquire on WhatsApp</span>
    </a>
  );
}
