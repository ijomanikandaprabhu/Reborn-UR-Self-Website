import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { whatsappLink } from "@/lib/site";
import { aftercareFor, compareFor } from "@/data/guides";
import { serviceFullName, type Service } from "@/data/services";
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
  return (
    <section className="section bg-gradient-to-b from-white to-[#fbf3ef]" aria-labelledby="aftercare-title">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `How to care for ${serviceFullName(service).toLowerCase()} after your appointment`,
          step: steps.map((st, i) => ({ "@type": "HowToStep", position: i + 1, name: st.title, text: st.text })),
        }}
      />
      <div className="container-site grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        {/* Intro and photo; stays in view on large screens while the steps scroll. */}
        <div data-reveal="up" className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow">After your visit</span>
          <h2 id="aftercare-title" className="text-4xl lg:text-5xl">{service.name} Aftercare</h2>
          <p className="mt-5">
            Healing is where great results are made. Follow these simple steps for soft, even colour that lasts.
            We also give you written aftercare on the day.
          </p>
          <div className="relative mt-8 hidden max-w-[300px] overflow-hidden rounded-t-full lg:block">
            <Image src={service.pairImages[1] ?? service.heroImage} alt={`${service.name} at Rebornurself, Chennai`} width={437} height={419} sizes="300px" className="aspect-[3/4] w-full object-cover" />
          </div>
          <a
            href={whatsappLink(`Hi Rebornurself, I have a question about my ${service.name.toLowerCase()} aftercare.`)}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex items-center gap-2 py-2 font-medium text-theme hover:underline"
          >
            <FaWhatsapp className="text-lg" aria-hidden="true" /> Questions while healing? Message us
          </a>
        </div>

        <ol data-reveal="stagger" className="divide-y divide-theme/15 border-y border-theme/15">
          {steps.map((st, i) => (
            <li key={st.title} className="group flex gap-5 py-7 sm:gap-8">
              <span aria-hidden="true" className="w-12 shrink-0 font-title text-4xl leading-none text-theme/45 transition-colors duration-300 group-hover:text-theme sm:w-16 sm:text-5xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-2 text-xl">{st.title}</h3>
                <p className="text-[15px]">{st.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Short note that clients come from all over Chennai, for local searches. */
export function AreasServed({ className = "" }: { className?: string }) {
  return (
    <section className={`section ${className}`} aria-labelledby="areas-title">
      <div data-reveal="up" className="container-site max-w-3xl text-center">
        <span className="eyebrow">Easy to reach</span>
        <h2 id="areas-title" className="text-3xl lg:text-4xl">Serving Clients Across Chennai</h2>
        <p className="mt-4">
          Our permanent makeup studio welcomes clients from all over Chennai for microblading, powder brows, lip
          treatments and more. Message us on WhatsApp and we will help you plan your visit.
        </p>
      </div>
    </section>
  );
}
