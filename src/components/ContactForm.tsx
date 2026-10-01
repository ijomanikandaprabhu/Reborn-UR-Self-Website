"use client";

import { useState } from "react";
import { LuCircleCheck } from "react-icons/lu";
import { site, whatsappLink } from "@/lib/site";
import FormSelect from "./FormSelect";

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
        <span className="mb-1.5 block text-sm font-medium text-title">Name <span className="text-theme" aria-hidden="true">*</span></span>
        <input name="name" required autoComplete="name" placeholder="e.g. Priya" className={field} />
      </label>
      <label>
        <span className="mb-1.5 block text-sm font-medium text-title">Email <span className="font-normal text-body">(optional)</span></span>
        <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className={field} />
      </label>
      <label>
        <span className="mb-1.5 block text-sm font-medium text-title">Mobile number <span className="text-theme" aria-hidden="true">*</span></span>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="10-digit mobile number"
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
      <FormSelect name="gender" label="Gender" hint={<span className="font-normal text-body">(optional)</span>} options={["Female", "Male"]} placeholder="Prefer not to say" />
      <FormSelect name="service" label="Treatment" hint={<span className="text-theme" aria-hidden="true">*</span>} options={serviceOptions} placeholder="Choose a treatment" required />
      <label>
        <span className="mb-1.5 block text-sm font-medium text-title">Message <span className="font-normal text-body">(optional)</span></span>
        <textarea name="message" rows={5} placeholder="Anything you would like us to know" className={`${field} h-auto py-4`} />
      </label>
      <div>
        <button type="submit" className="btn-theme w-full py-4 text-sm font-bold tracking-[0.15em] uppercase max-sm:!max-w-none">
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
