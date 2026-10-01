import Link from "next/link";
import { aftercareFor, compareFor } from "@/data/guides";
import { serviceFullName, type Service } from "@/data/services";
import { site } from "@/lib/site";
import JsonLd from "./JsonLd";
import SectionTitle from "./SectionTitle";

/** Side-by-side table of similar treatments, with the current one highlighted. */
export function Compare({ service }: { service: Service }) {
  const data = compareFor(service);
  if (!data) return null;
  return (
    <section className="section bg-cream" aria-labelledby="compare-title">
      <div className="container-site max-w-5xl">
        <SectionTitle eyebrow="Which one suits you?" title={data.title} />
        <div data-reveal="up" className="hidden overflow-hidden rounded-lg bg-white shadow-[0_10px_30px_rgb(18_31_56/0.06)] md:block">
          <table className="w-full text-left text-[15px]">
            <caption id="compare-title" className="sr-only">{data.title}</caption>
            <thead className="bg-theme text-white">
              <tr>
                <th scope="col" className="px-5 py-4 font-semibold">Treatment</th>
                <th scope="col" className="px-5 py-4 font-semibold">Look</th>
                <th scope="col" className="px-5 py-4 font-semibold">Best for</th>
                <th scope="col" className="px-5 py-4 font-semibold">Lasts</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((r) => {
                const current = r.slug === service.slug;
                return (
                  <tr key={r.slug} className={`border-t border-line ${current ? "bg-peach/50" : ""}`}>
                    <th scope="row" className="px-5 py-4 font-semibold text-title">
                      {current ? r.name : <Link href={`/${r.slug}`} className="text-theme hover:underline">{r.name}</Link>}
                      {current && <span className="ml-2 inline-block rounded-full whitespace-nowrap bg-theme px-2 py-0.5 text-xs font-medium text-white">This page</span>}
                    </th>
                    <td className="px-5 py-4">{r.look}</td>
                    <td className="px-5 py-4">{r.bestFor}</td>
                    <td className="px-5 py-4 whitespace-nowrap">{r.lasts}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Phones: one card per treatment instead of a wide table. */}
        <ul data-reveal="stagger" className="space-y-4 md:hidden" aria-label={data.title}>
          {data.rows.map((r) => {
            const current = r.slug === service.slug;
            return (
              <li key={r.slug} className={`rounded-lg bg-white p-5 shadow-[0_10px_30px_rgb(18_31_56/0.06)] ${current ? "ring-2 ring-theme" : ""}`}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  {current ? <span className="font-semibold text-title">{r.name}</span> : <Link href={`/${r.slug}`} className="py-1 font-semibold text-theme">{r.name}</Link>}
                  <span className="shrink-0 rounded-full bg-peach px-3 py-1 text-xs font-medium text-theme">{r.lasts}</span>
                </div>
                <dl className="space-y-1 text-[15px]">
                  <div><dt className="inline font-medium text-title">Look: </dt><dd className="inline">{r.look}</dd></div>
                  <div><dt className="inline font-medium text-title">Best for: </dt><dd className="inline">{r.bestFor}</dd></div>
                </dl>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-center text-sm">
          Not sure? Send us a photo on WhatsApp and we will tell you honestly which one suits you.
        </p>
      </div>
    </section>
  );
}

/** Aftercare as numbered steps, also described for search engines as a how-to. */
export function Aftercare({ service }: { service: Service }) {
  const steps = aftercareFor(service);
  const title = `${service.name} Aftercare: Step by Step`;
  return (
    <section className="section" aria-label={title}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `How to care for ${serviceFullName(service).toLowerCase()} after your appointment`,
          step: steps.map((st, i) => ({ "@type": "HowToStep", position: i + 1, name: st.title, text: st.text })),
        }}
      />
      <div className="container-site max-w-4xl">
        <SectionTitle eyebrow="After your visit" title={title}>
          Follow these steps for the best healed result. We also give you written aftercare on the day.
        </SectionTitle>
        <ol data-reveal="stagger" className="grid gap-4 sm:grid-cols-2">
          {steps.map((st, i) => (
            <li key={st.title} className="card flex gap-4 p-5 hover:translate-y-0">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-theme font-bold text-white">{i + 1}</span>
              <div>
                <h3 className="mb-1 text-lg">{st.title}</h3>
                <p className="text-[15px]">{st.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Neighbourhoods clients come from, for local searches. */
export function AreasServed({ className = "" }: { className?: string }) {
  const areas = site.areasServed.filter((a) => a !== "Chennai");
  return (
    <section className={`section ${className}`} aria-labelledby="areas-title">
      <div data-reveal="up" className="container-site max-w-3xl text-center">
        <span className="eyebrow">Easy to reach</span>
        <h2 id="areas-title" className="text-3xl lg:text-4xl">Areas We Serve in Chennai</h2>
        <p className="mt-4">
          Our permanent makeup studio is in New Perungalathur, a short drive for clients across south Chennai.
          People visit us for microblading, powder brows and lip treatments from:
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {areas.map((a) => (
            <li key={a} className="rounded-full border border-theme/30 bg-white px-4 py-2 text-sm text-title">{a}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
