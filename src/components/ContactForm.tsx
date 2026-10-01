"use client";

import { useState } from "react";
import { LuChevronDown, LuCircleCheck } from "react-icons/lu";
import { site, whatsappLink } from "@/lib/site";

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
  "h-[55px] w-full rounded-none border border-line bg-white px-7 text-title placeholder:text-body transition hover:border-theme/40 focus:border-theme focus:shadow-[0_0_0_4px_rgb(154_86_58/0.12)] focus:outline-none";

// A 10-digit Indian mobile, optionally with +91 / 0 and a space or dash.
const phonePattern = "(\\+?91[\\s\\-]?|0)?[6-9][0-9]{4}[\\s\\-]?[0-9]{5}";

/** Turns the enquiry into a WhatsApp message the visitor just has to send. */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

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
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <label>
        <span className="sr-only">Your name</span>
        <input name="name" required autoComplete="name" placeholder="Your Name*" className={field} />
      </label>
      <label>
        <span className="sr-only">Email</span>
        <input name="email" type="email" autoComplete="email" placeholder="Your Email" className={field} />
      </label>
      <label>
        <span className="sr-only">Phone number</span>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="Phone Number*"
          pattern={phonePattern}
          title="Please enter a 10-digit mobile number"
          onInvalid={(e) =>
            e.currentTarget.setCustomValidity(
              e.currentTarget.validity.valueMissing ? "Please enter your mobile number" : "Please enter a 10-digit mobile number",
            )
          }
          onInput={(e) => e.currentTarget.setCustomValidity("")}
          className={field}
        />
      </label>
      <label className="relative">
        <span className="sr-only">Gender (optional)</span>
        <select name="gender" defaultValue="" className={`${field} appearance-none`}>
          <option value="">Gender (optional)</option>
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
      <label>
        <span className="sr-only">Message</span>
        <textarea name="message" rows={5} placeholder="Message" className={`${field} h-auto py-4`} />
      </label>
      <div>
        <button type="submit" className="btn-theme w-full py-4 text-sm font-bold tracking-[0.15em] uppercase">
          Submit Details
        </button>
        {sent ? (
          <p role="status" className="mt-4 flex items-start gap-2 rounded-md bg-wa/10 p-4 text-[15px] text-title">
            <LuCircleCheck className="mt-0.5 shrink-0 text-lg text-wa" aria-hidden="true" />
            <span>
              WhatsApp should now be open with your details. Just press send. Didn’t open?{" "}
              <a href={`tel:${site.phone}`} className="font-semibold text-theme underline">Call {site.phoneDisplay}</a>
            </span>
          </p>
        ) : (
          <p className="mt-3 text-[13px]">WhatsApp will open with your details ready. Just press send.</p>
        )}
      </div>
    </form>
  );
}
