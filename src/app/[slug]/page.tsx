import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { LuArrowRight } from "react-icons/lu";
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
import { enquiryMessage, site, whatsappLink } from "@/lib/site";

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
    if (b.type === "h2") return <h2 key={i} className="mt-10 mb-4 text-2xl uppercase first:mt-0 sm:mt-12 sm:text-[32px]">{b.text}</h2>;
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
  const firstP = Math.max(0, s.intro.findIndex((b) => b.type === "p"));
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
        current={<>{name}<span className="hidden sm:inline"> Service Details</span></>}
      />

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[300px_1fr] xl:gap-14">
          <article className="lg:col-start-2 lg:row-start-1">
            <Image data-reveal="zoom" src={s.heroImage} alt={`${name} at Rebornurself, New Perungalathur, Chennai`} width={895} height={499} priority sizes="(min-width: 1200px) 800px, 100vw" className="mb-10 w-full rounded-lg" />
            <Blocks blocks={s.intro.slice(0, firstP + 1)} />
            {/* WhatsApp enquiry, early in the article. */}
            <a href={enquire} target="_blank" rel="noopener" className="btn-wa mt-2 mb-6 w-full sm:w-auto">
              <FaWhatsapp className="text-lg" /> Enquire on WhatsApp
            </a>
            <Blocks blocks={s.intro.slice(firstP + 1)} />
            {s.pairImages.length > 0 && (
              <div data-reveal="stagger" className="my-10 grid grid-cols-2 gap-4">
                {s.pairImages.map((src, i) => (
                  <Image key={src} src={src} alt={`${name} ${i === 0 ? "procedure" : "result"} at Rebornurself`} width={437} height={419} sizes="(min-width: 1200px) 400px, 50vw" className="w-full rounded-lg" />
                ))}
              </div>
            )}
            <Blocks blocks={s.body} />
          </article>

          <aside data-reveal="left" className="space-y-6 md:max-w-md lg:sticky lg:top-28 lg:col-start-1 lg:row-start-1 lg:self-start">
            <div className="relative mx-auto hidden max-w-[215px] lg:block">
              {/* Leaf tucked behind the pill, floating up and down as on the old site. */}
              <div className="absolute top-[34%] -left-[82px] w-[130px] animate-float">
                <Image src="/assets/img/shape/leaf-1-7.png" alt="" width={265} height={186} className="w-full" />
              </div>
              <div className="relative rounded-full border border-theme/15 bg-white p-1.5">
                <div className="flex justify-center rounded-full bg-peach px-8 py-20">
                  <Image src="/assets/img/about/price-2-1-1.png" alt="" width={187} height={349} className="w-[105px]" />
                </div>
              </div>
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
