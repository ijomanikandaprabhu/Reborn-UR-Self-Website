import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { LuArrowRight } from "react-icons/lu";
import CtaBand from "@/components/CtaBand";
import Gallery from "@/components/Gallery";
import HeroSlider from "@/components/HeroSlider";
import SectionTitle from "@/components/SectionTitle";
import ServiceTabs from "@/components/ServiceTabs";
import Testimonials from "@/components/Testimonials";
import { getService, iconPath, servicePath } from "@/data/services";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({ title: `${site.tagline} | ${site.name}`, path: "/" });

// card: short summary for the cards. panel: a different angle for the peach panel,
// so the two sections never repeat each other.
const highlights = [
  { slug: "microblading", name: "Microblading", icon: "4",
    card: "Fine, hair-like strokes that fill sparse brows naturally, with results lasting 2–3 years.",
    panel: "Best for sparse or over-plucked brows. Each stroke follows the direction your own hair grows." },
  { slug: "lip-blushing", name: "Lip Blushing", icon: "3",
    card: "A soft semi-permanent flush that makes lips look fuller, more defined and more vibrant.",
    panel: "Lasts 1–3 years. Colour and definition every day, without reapplying lipstick." },
  { slug: "ombre-powder-brows", name: "Ombre Brows", icon: "6",
    card: "A soft powder gradient for fuller, defined brows with a lasting, makeup-like finish.",
    panel: "Lighter at the front and deeper towards the tail, like a lightly pencilled brow." },
  { slug: "beauty-spot", name: "Beauty Spot", icon: "1",
    card: "Realistic semi-permanent beauty marks that add subtle, defined elegance to your features.",
    panel: "Sized and positioned with you before any pigment goes in, so it looks naturally yours." },
  { slug: "combination-brows", name: "Combination Brows", icon: "2",
    card: "Microblading strokes blended with powder shading for balanced, natural and fuller brows.",
    panel: "Lasts 12–18 months. Strokes at the front, shading behind, for definition and density." },
  { slug: "lip-neutralization", name: "Lip Neutralization", icon: "5",
    card: "Corrects dark or uneven lip tone for a smooth, balanced and natural-looking finish.",
    panel: "Lasts 1–3 years. Evens out darkness from sun or smoking before any colour is added." },
];

// Left and right columns of the feature panel, in the old layout's order.
const panelLeft = ["lip-blushing", "beauty-spot", "lip-neutralization"];
const panelRight = ["microblading", "ombre-powder-brows", "combination-brows"];
const byslug = (slug: string) => highlights.find((h) => h.slug === slug)!;

function PanelItem({ slug, side }: { slug: string; side: "left" | "right" }) {
  const h = byslug(slug);
  return (
    <li className={`flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:gap-6 md:text-left ${side === "left" ? "lg:flex-row-reverse lg:text-right" : ""}`}>
      <span className="flex size-[60px] shrink-0 items-center justify-center rounded-full bg-white">
        <Image src={`/assets/img/icon/${h.icon}.png`} alt="" width={30} height={30} />
      </span>
      <div>
        <h3 className="text-2xl"><Link href={`/${h.slug}`} className="hover:text-theme">{h.name}</Link></h3>
        <p className="mt-2">{h.panel}</p>
      </div>
    </li>
  );
}

export default function Home() {
  return (
    <>
      <HeroSlider />

      <section className="section bg-gradient-to-b from-[#fbf3ef] to-white">
        <div className="container-site">
          <SectionTitle as="h1" eyebrow="Enhance, Empower, Elevate" title="Flawless Brow & Lip Solutions" />
          {/* Phones swipe through the cards; larger screens show a grid. */}
          <ul data-reveal="stagger" className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pt-16 pb-6 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-20 sm:overflow-visible sm:px-0 sm:pt-10 sm:pb-0 lg:grid-cols-3">
            {highlights.map((h) => {
              const s = getService(h.slug)!;
              return (
                <li key={h.slug} className="w-[85%] shrink-0 snap-center sm:w-auto">
                  {/* The whole card is the link. On hover it lifts, the icon circle turns brown,
                      the border turns solid and "Learn more" appears. */}
                  <Link href={servicePath(s)} className="group relative block h-full rounded-md bg-white p-3 shadow-[0_10px_30px_rgb(154_86_58/0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_22px_45px_rgb(154_86_58/0.18)]">
                    <div className="flex h-full flex-col items-center border border-dashed border-theme/35 px-6 pt-20 pb-8 text-center transition-colors sm:px-8 sm:pt-24 duration-300 group-hover:border-solid group-hover:border-theme">
                      <div className="absolute -top-10 left-1/2 flex size-[110px] -translate-x-1/2 sm:-top-12 sm:size-[140px] items-center justify-center rounded-full border-[6px] border-white bg-peach transition-colors duration-300 group-hover:bg-theme">
                        <Image src={iconPath(s)} alt="" width={67} height={67} className="w-[54px] sm:w-[67px] transition duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert" />
                      </div>
                      <h2 className="text-2xl transition-colors group-hover:text-theme sm:text-[28px]">{h.name}</h2>
                      <span className="mt-4 mb-4 block h-0.5 w-10 rounded-full bg-theme/40 transition-all duration-300 group-hover:w-16 group-hover:bg-theme" aria-hidden="true" />
                      <p className="min-h-[5.25em]">{h.card}</p>
                      <span className="mt-4 inline-flex translate-y-2 items-center gap-1.5 text-sm font-semibold text-theme opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                        Learn more <LuArrowRight />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 flex items-center justify-center gap-2 text-sm text-theme sm:hidden" aria-hidden="true">Swipe to see all 6 <LuArrowRight /></p>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container-site">
          <div data-reveal className="relative grid items-end gap-10 overflow-hidden bg-peach px-6 py-14 md:grid-cols-2 md:gap-8 lg:grid-cols-[1fr_minmax(0,460px)_1fr] lg:px-2 lg:pt-28 lg:pb-0">
            <ul data-reveal="left" className="space-y-10 self-start lg:pl-0">
              {panelLeft.map((slug) => <PanelItem key={slug} slug={slug} side="left" />)}
            </ul>
            <div data-reveal="zoom" className="relative mx-auto hidden aspect-[950/980] w-full max-w-[460px] lg:block">
              <div className="absolute inset-x-[10%] top-0 aspect-square rounded-full bg-white" aria-hidden="true" />
              <Image src="/assets/img/hero/spa-girl-1.png" alt="Natural brows and lips after permanent makeup" fill sizes="460px" className="object-contain object-bottom" />
            </div>
            <ul data-reveal="right" className="space-y-10 self-start">
              {panelRight.map((slug) => <PanelItem key={slug} slug={slug} side="right" />)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-site">
          <SectionTitle eyebrow="Our services" title="Choose What Suits You" />
          <ServiceTabs />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-site">
          <SectionTitle eyebrow="From the studio" title="Our Work" />
          <Gallery limit={6} />
          <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/gallery" className="btn-theme">View More <LuArrowRight /></Link>
            <a href={site.social.instagram} target="_blank" rel="noopener" className="btn bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#c1358f] text-white hover:opacity-90">
              <FaInstagram className="text-lg" /> Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="section">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal="left" className="relative w-full max-w-[560px] pb-28">
            <Image src="/assets/img/about/about-9-1.jpg" alt="Brow treatment in progress at the Rebornurself studio in Chennai" width={450} height={480} className="w-[80%]" sizes="(min-width: 1024px) 450px, 80vw" />
            <Image src="/assets/img/about/about-9-2.jpg" alt="Close-up of finished permanent makeup brows" width={380} height={380} data-parallax="0.35" className="absolute right-0 bottom-0 w-[62%] border-[10px] border-white shadow-card-hover" sizes="(min-width: 1024px) 350px, 62vw" />
          </div>
          <div data-reveal="right">
            <span className="eyebrow">Why Choose Us?</span>
            <h2 className="text-4xl lg:text-5xl">The Ultimate Beauty Experience</h2>
            <p className="mt-6">
              At our studio, we combine expert techniques with personalized care to provide you with flawless, natural-looking
              brows and lips. Our permanent solutions are designed to last 2-3 years, offering you long-lasting beauty and
              convenience. We customize each treatment to suit your unique features, ensuring the best results every time.
              With options for in-store, on-site, or virtual consultations, we make it easy and comfortable for you to achieve
              your desired look. Above all, your satisfaction is our priority, and we’re committed to helping you feel
              confident and beautiful.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
