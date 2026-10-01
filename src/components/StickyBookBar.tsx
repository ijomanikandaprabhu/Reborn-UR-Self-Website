"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";
import { site } from "@/lib/site";

/** Phones: a booking bar pinned to the bottom once the visitor scrolls into the page. */
export default function StickyBookBar({ whatsappHref }: { whatsappHref: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const update = () => setShown(window.scrollY > 500);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      aria-hidden={!shown}
      inert={!shown}
      className={`fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_auto] gap-2 border-t border-line bg-white/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgb(18_31_56/0.08)] backdrop-blur transition-transform duration-300 md:hidden ${shown ? "translate-y-0" : "translate-y-full"}`}
    >
      <a href={whatsappHref} target="_blank" rel="noopener" className="btn-wa py-3 text-[15px]">
        <FaWhatsapp className="text-lg" /> Enquire on WhatsApp
      </a>
      <a href={`tel:${site.phone}`} aria-label={`Call ${site.phoneDisplay}`} className="btn border border-theme px-5 py-3 text-theme">
        <LuPhone /> Call
      </a>
    </div>
  );
}
