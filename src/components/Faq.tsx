"use client";

import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { faqSchema } from "@/lib/schema";
import JsonLd from "./JsonLd";
import SectionTitle from "./SectionTitle";

export default function Faq({ faqs, title = "Frequently Asked Questions" }: { faqs: { q: string; a: string }[]; title?: string }) {
  // Several answers can be open at once; the first starts open.
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(i)) next.add(i);
      return next;
    });

  return (
    <section className="section bg-cream">
      <JsonLd data={faqSchema(faqs)} />
      <div className="container-site max-w-3xl">
        <SectionTitle eyebrow="Good to know" title={title} />
        <div data-reveal="stagger" className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open.has(i);
            return (
              <div key={f.q} className="card hover:translate-y-0">
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => toggle(i)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left font-title text-lg text-title sm:px-7"
                  >
                    {f.q}
                    <LuPlus className={`shrink-0 text-theme transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} aria-hidden="true" />
                  </button>
                </h3>
                {/* Height eases open and closed; the answer stays in the page for search engines. */}
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-6 text-[15px] sm:px-7">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
