"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { getService, serviceFullName } from "@/data/services";
import { enquiryMessage, whatsappLink } from "@/lib/site";

export default function WhatsAppFloat() {
  const service = getService(usePathname().slice(1));
  const href = whatsappLink(service ? enquiryMessage(serviceFullName(service)) : undefined);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Enquire on WhatsApp"
      className="fixed bottom-5 left-4 z-30 flex h-[54px] w-[54px] items-center justify-center gap-2.5 rounded-full bg-wa text-[15px] font-medium text-white shadow-[0_8px_24px_rgb(37_211_102/0.35)] transition hover:-translate-y-0.5 hover:bg-wa-dark md:bottom-8 md:left-6 md:w-auto md:px-5"
    >
      <FaWhatsapp className="text-[26px]" />
      <span className="hidden md:inline">Enquire on WhatsApp</span>
    </a>
  );
}
