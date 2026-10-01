import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa6";
import { LuArrowRight, LuHourglass, LuRotateCw, LuSyringe, LuUsers } from "react-icons/lu";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import { Aftercare, Compare } from "@/components/Guides";
import { galleryCategoryFor, galleryItems } from "@/data/content";
import StickyBookBar from "@/components/StickyBookBar";
import JsonLd from "@/components/JsonLd";
import Journey from "@/components/Journey";
import PageBanner from "@/components/PageBanner";
import {
  counterpart, faqsFor, genderLabel, getService, iconPath, servicePath, services, servicesFor,
  serviceFullName, type ContentBlock,
} from "@/data/services";
import { serviceSchema, webPageSchema } from "@/lib/schema";
import { enquiryMessage, formatUpdated, site, whatsappLink } from "@/lib/site";

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
  const photoCat = galleryCategoryFor(s.name);
  const firstP = Math.max(0, s.intro.findIndex((b) => b.type === "p"));
  const enquire = whatsappLink(enquiryMessage(name));
  const other = counterpart(s);
  const related = servicesFor(s.gender).filter((o) => o.slug !== s.slug);
  const [titleStart, titleEnd] = [`${s.name} for`, genderLabel(s.gender)];

  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <JsonLd data={webPageSchema({ name: s.title, path: servicePath(s), description: s.description })} />
      <PageBanner
        title={titleStart}
        highlight={titleEnd}
        crumbs={[{ name, path: servicePath(s) }]}
        current={<>{name}<span className="hidden sm:inline"> Service Details</span></>}
      />

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[300px_1fr] xl:gap-14">
          <article className="lg:col-start-2 lg:row-start-1">
            {/* Women / Men switch, when the treatment is offered for both. */}
            {other && (
              <div className="mb-5 inline-grid grid-cols-2 rounded-full bg-peach p-1 text-sm font-medium" role="group" aria-label="Treatment for">
                {[s, other].sort((a, b) => (a.gender === b.gender ? 0 : a.gender === "women" ? -1 : 1)).map((v) =>
                  v.slug === s.slug ? (
                    <span key={v.slug} aria-current="page" className="rounded-full bg-theme px-6 py-2.5 text-center text-white shadow">{genderLabel(v.gender)}</span>
                  ) : (
                    <Link key={v.slug} href={servicePath(v)} className="rounded-full px-6 py-2.5 text-center text-title hover:text-theme">{genderLabel(v.gender)}</Link>
                  ),
                )}
              </div>
            )}
            {/* Quick facts, all taken from what the page already says. */}
            <ul className="mb-8 grid grid-cols-2 gap-2 text-[13px] sm:flex sm:flex-wrap sm:text-sm">
              {[
                s.lasts && { Icon: LuHourglass, text: `Lasts ${s.lasts}` },
                { Icon: LuSyringe, text: "20-min numbing first" },
                { Icon: LuRotateCw, text: "Touch-up in 30–90 days" },
                { Icon: LuUsers, text: other ? "For women & men" : `For ${genderLabel(s.gender).toLowerCase()}` },
              ]
                .filter((x): x is { Icon: typeof LuHourglass; text: string } => Boolean(x))
                .map(({ Icon, text }) => (
                  <li key={text} className="flex items-center gap-2 rounded-2xl border border-theme/20 bg-cream px-3 py-2 leading-tight text-title sm:rounded-full sm:px-4">
                    <Icon className="text-theme" aria-hidden="true" /> {text}
                  </li>
                ))}
            </ul>
            <div data-wipe className="mega-hover mb-10 rounded-lg"><Image src={s.heroImage} alt={`${name} at Rebornurself, New Perungalathur, Chennai`} width={895} height={499} priority sizes="(min-width: 1200px) 800px, 100vw" className="w-full" /></div>
            <Blocks blocks={s.intro.slice(0, firstP + 1)} />
            {/* WhatsApp enquiry, early in the article. */}
            <a href={enquire} target="_blank" rel="noopener" className="btn-wa mt-2 mb-6 w-full sm:w-auto">
              <FaWhatsapp className="text-lg" /> Enquire on WhatsApp
            </a>
            <Blocks blocks={s.intro.slice(firstP + 1)} />
            {s.pairImages.length > 0 && (
              <div className="my-10 grid grid-cols-2 gap-4">
                {s.pairImages.map((src, i) => (
                  <div key={src} data-wipe className="mega-hover rounded-lg">
                    <Image src={src} alt={`${name} ${i === 0 ? "procedure" : "result"} at Rebornurself`} width={437} height={419} sizes="(min-width: 1200px) 400px, 50vw" className="w-full" />
                  </div>
                ))}
              </div>
            )}
            <Blocks blocks={s.body} />
            {photoCat && galleryItems.some((g) => g.cat === photoCat) && (
              <Link href={`/gallery?filter=${photoCat}`} className="btn mt-8 border border-theme text-theme hover:bg-theme hover:text-white">
                See our {s.name} results <LuArrowRight />
              </Link>
            )}
            <p className="mt-8 text-sm opacity-80">
              Reviewed by {site.founder.name}, {site.founder.role.toLowerCase()} · Last updated <time dateTime={site.updated}>{formatUpdated()}</time>
            </p>
          </article>

          <aside data-reveal="left" className="hidden space-y-6 lg:block lg:sticky lg:top-28 lg:col-start-1 lg:row-start-1 lg:self-start">
            <div className="relative mx-auto hidden max-w-[270px] lg:block">
              {/* Leaf tucked behind the pill, floating up and down as on the old site. */}
              <div className="absolute top-[34%] -left-[92px] w-[150px] animate-float">
                <Image src="/assets/img/shape/leaf-1-7.png" alt="" width={265} height={186} className="w-full" />
              </div>
              <div className="relative rounded-full border border-theme/15 bg-white p-1.5">
                <div className="flex justify-center rounded-full bg-peach px-6 py-14">
                  <Image src="/assets/img/about/price-2-1-1.png" alt="" width={187} height={349} className="w-[160px]" />
                </div>
              </div>
            </div>

            <nav aria-label={`Other treatments for ${genderLabel(s.gender).toLowerCase()}`} className="card hidden p-7 hover:translate-y-0 lg:block">
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

      {/* Phones and tablets: other treatments as swipeable cards. */}
      <section className="pb-16 lg:hidden" aria-label="You may also like">
        <div className="container-site">
          <h2 className="mb-5 text-3xl">You may also like</h2>
          <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
            {related.map((o) => (
              <li key={o.slug} className="w-[70%] shrink-0 snap-start sm:w-[40%]">
                <Link href={servicePath(o)} className="card flex h-full flex-col items-center p-6 text-center hover:translate-y-0">
                  <span className="mb-3 flex size-16 items-center justify-center rounded-full bg-peach"><Image src={iconPath(o)} alt="" width={34} height={34} /></span>
                  <span className="font-title text-xl text-title">{o.name}</span>
                  <span className="mt-2 flex-1 text-sm">{o.card}</span>
                  <span className="mt-3 flex items-center gap-1 text-sm font-semibold text-theme">Learn more <LuArrowRight /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Compare service={s} />
      <Journey steps={s.journey} whatsappHref={enquire} />
      <Aftercare service={s} />
      <Faq faqs={faqsFor(s)} title={`${s.name}: Your Questions`} />
      <CtaBand title={s.cta.title} text={s.cta.text} message={enquiryMessage(name)} />
      <StickyBookBar whatsappHref={enquire} />
    </>
  );
}
