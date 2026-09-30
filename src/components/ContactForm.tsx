"use client";

import { FaWhatsapp } from "react-icons/fa6";
import { LuChevronDown } from "react-icons/lu";
import { whatsappLink } from "@/lib/site";

const serviceOptions = [
  "Microblading",
  "Ombre Powder Brows",
  "Combination Brows",
  "Lip Neutralization",
  "Lip Blushing",
  "Beauty Spot",
  "Others",
];

const field =
  "h-14 w-full rounded-md border border-line bg-white px-5 text-title placeholder:text-body transition hover:border-theme/40 focus:border-theme focus:outline-none";

/** Turns the enquiry into a WhatsApp message the visitor just has to send. */
export default function ContactForm() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const lines = ["Hi Rebornurself, I have an enquiry.", ""];
    for (const [label, key] of [["Name", "name"], ["Email", "email"], ["Phone", "phone"], ["Gender", "gender"], ["Service", "service"]]) {
      if (get(key)) lines.push(`${label}: ${get(key)}`);
    }
    if (get("message")) lines.push("", get("message"));
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="sm:col-span-2">
        <span className="sr-only">Your name</span>
        <input name="name" required autoComplete="name" placeholder="Your Name*" className={field} />
      </label>
      <label>
        <span className="sr-only">Phone number</span>
        <input name="phone" type="tel" required autoComplete="tel" placeholder="Phone Number*" className={field} />
      </label>
      <label>
        <span className="sr-only">Email</span>
        <input name="email" type="email" autoComplete="email" placeholder="Your Email" className={field} />
      </label>
      <label className="relative">
        <span className="sr-only">Gender</span>
        <select name="gender" required defaultValue="" className={`${field} appearance-none invalid:text-body`}>
          <option value="" disabled>Gender*</option>
          <option>Female</option>
          <option>Male</option>
        </select>
        <LuChevronDown className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-theme" aria-hidden="true" />
      </label>
      <label className="relative">
        <span className="sr-only">Service</span>
        <select name="service" required defaultValue="" className={`${field} appearance-none invalid:text-body`}>
          <option value="" disabled>Service*</option>
          {serviceOptions.map((s) => <option key={s}>{s}</option>)}
        </select>
        <LuChevronDown className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-theme" aria-hidden="true" />
      </label>
      <label className="sm:col-span-2">
        <span className="sr-only">Message</span>
        <textarea name="message" rows={5} placeholder="Message" className={`${field} h-auto py-4`} />
      </label>
      <div className="sm:col-span-2">
        <button type="submit" className="btn-wa w-full sm:w-auto">
          <FaWhatsapp className="text-lg" /> Send on WhatsApp
        </button>
        <p className="mt-3 text-[13px]">WhatsApp will open with your details ready — just press send.</p>
      </div>
    </form>
  );
}
