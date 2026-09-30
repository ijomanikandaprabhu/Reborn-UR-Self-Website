import { LuPlus } from "react-icons/lu";
import { faqSchema } from "@/lib/schema";
import JsonLd from "./JsonLd";
import SectionTitle from "./SectionTitle";

export default function Faq({ faqs, title = "Frequently Asked Questions" }: { faqs: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="section bg-cream">
      <JsonLd data={faqSchema(faqs)} />
      <div className="container-site max-w-3xl">
        <SectionTitle eyebrow="Good to know" title={title} />
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <details key={f.q} className="group card hover:translate-y-0" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-title text-lg text-title sm:px-7 [&::-webkit-details-marker]:hidden">
                {f.q}
                <LuPlus className="shrink-0 text-theme transition group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="px-5 pb-6 text-[15px] sm:px-7">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
