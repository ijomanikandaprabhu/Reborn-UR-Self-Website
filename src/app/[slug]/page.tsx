import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { LuArrowRight, LuClock, LuMapPin, LuPhone } from "react-icons/lu";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Journey from "@/components/Journey";
import PageBanner from "@/components/PageBanner";
import {
  counterpart, faqsFor, genderLabel, getService, iconPath, servicePath, services, servicesFor,
  serviceFullName, type ContentBlock,
} from "@/data/services";
import { serviceSchema } from "@/lib/schema";
import { enquiryMessage, mapsDirectionsUrl, site, whatsappLink } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return pageMeta({
    title: `${s.title} | ${site.name}`,
    description: s.description,
    path: servicePath(s),
    image: s.heroImage,
    imageAlt: `${serviceFullName(s)} at Rebornurself, Chennai`,
  });
}

function Blocks({ blocks }: { blocks: ContentBlock[] }) {
  return blocks.map((b, i) => {
    if (b.type === "h2") return <h2 key={i} className="mt-12 mb-4 text-[32px] uppercase first:mt-0">{b.text}</h2>;
    if (b.type === "h3") return <h3 key={i} className="mt-8 mb-3 text-2xl">{b.text}</h3>;
    if (b.type === "p") return <p key={i} className="mb-4">{b.text}</p>;
    return (
      <ul key={i} className="my-5 space-y-3">
        {b.items.map((item) => (
          <li key={item.text} className="relative pl-7 before:absolute before:top-[0.7em] before:left-0 before:size-2 before:rounded-full before:bg-theme">
            {item.label && <strong className="font-medium text-title">{item.label}: </strong>}
            {item.text}
          </li>
        ))}
      </ul>
    );
  });
}

export default async function ServicePage({ params }: PageProps<"/[slug]">) {
  const s = getService((await params).slug);
  if (!s) notFound();

  const name = serviceFullName(s);
  const enquire = whatsappLink(enquiryMessage(name));
  const other = counterpart(s);
  const related = servicesFor(s.gender).filter((o) => o.slug !== s.slug);
  const [titleStart, titleEnd] = [`${s.name} for`, genderLabel(s.gender)];

  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <PageBanner
        title={titleStart}
        highlight={titleEnd}
        crumbs={[{ name, path: servicePath(s) }]}
        current={`${name} Service Details`}
      />

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[300px_1fr] xl:gap-14">
          <article className="lg:col-start-2 lg:row-start-1">
            <Image data-reveal="zoom" src={s.heroImage} alt={`${name} at Rebornurself, New Perungalathur, Chennai`} width={895} height={499} priority sizes="(min-width: 1200px) 800px, 100vw" className="mb-10 w-full rounded-lg" />
            <Blocks blocks={s.intro} />
            {s.pairImages.length > 0 && (
              <div data-reveal="stagger" className="my-10 grid grid-cols-2 gap-4">
                {s.pairImages.map((src, i) => (
                  <Image key={src} src={src} alt={`${name} ${i === 0 ? "procedure" : "result"} at Rebornurself`} width={437} height={419} sizes="(min-width: 1200px) 400px, 50vw" className="w-full rounded-lg" />
                ))}
              </div>
            )}
            <Blocks blocks={s.body} />
          </article>

          <aside data-reveal="left" className="space-y-6 lg:col-start-1 lg:row-start-1">
            <div className="relative mx-auto hidden max-w-[260px] lg:block">
              <Image src="/assets/img/shape/leaf-1-7.png" alt="" width={265} height={186} data-parallax="0.8" className="absolute -top-10 -right-16 w-32" />
              <div className="flex justify-center rounded-full bg-peach px-10 py-24">
                <Image src="/assets/img/about/price-2-1-1.png" alt="" width={187} height={349} className="w-[120px]" />
              </div>
            </div>
            <div className="rounded-lg bg-peach p-7">
              <p className="font-title text-2xl text-title">Book {s.name}</p>
              <ul className="mt-5 space-y-3 text-[15px]">
                <li className="flex gap-3"><LuMapPin className="mt-1 shrink-0 text-theme" /><a href={mapsDirectionsUrl} target="_blank" rel="noopener" className="hover:text-theme">{site.address.street}, {site.address.locality}, Chennai</a></li>
                <li className="flex gap-3"><LuClock className="mt-1 shrink-0 text-theme" />Open daily, {site.hours.display}</li>
                <li className="flex gap-3"><LuPhone className="mt-1 shrink-0 text-theme" /><a href={`tel:${site.phone}`} className="hover:text-theme">{site.phoneDisplay}</a></li>
              </ul>
              <a href={enquire} target="_blank" rel="noopener" className="btn-wa mt-6 w-full"><FaWhatsapp className="text-lg" /> Enquire on WhatsApp</a>
            </div>

            <nav aria-label={`Other treatments for ${genderLabel(s.gender).toLowerCase()}`} className="card p-7 hover:translate-y-0">
              <p className="mb-4 font-title text-xl text-title">More for {genderLabel(s.gender)}</p>
              <ul className="divide-y divide-line">
                {related.map((o) => (
                  <li key={o.slug}>
                    <Link href={servicePath(o)} className="flex items-center gap-3 py-3 text-[15px] text-title hover:text-theme">
                      <Image src={iconPath(o)} alt="" width={28} height={28} />
                      <span className="flex-1">{o.name}</span>
                      <LuArrowRight className="text-theme" />
                    </Link>
                  </li>
                ))}
              </ul>
              {other && (
                <Link href={servicePath(other)} className="mt-4 block rounded-md bg-smoke px-4 py-3 text-sm text-title hover:text-theme">
                  Looking for {serviceFullName(other).toLowerCase()}? →
                </Link>
              )}
            </nav>
          </aside>
        </div>
      </section>

      <Journey steps={s.journey} whatsappHref={enquire} />
      <Faq faqs={faqsFor(s)} title={`${s.name}: Your Questions`} />
      <CtaBand title={s.cta.title} text={s.cta.text} message={enquiryMessage(name)} />
    </>
  );
}
