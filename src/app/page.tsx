import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { LuArrowRight, LuChevronUp } from "react-icons/lu";
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

const highlights = [
  { slug: "microblading", name: "Microblading", text: "Creates natural, hair-like strokes to enhance and shape brows, offering fuller, defined results that last 2-3 years.", icon: "4" },
  { slug: "lip-blushing", name: "Lip Blushing", text: "Enhances natural lip color and shape with a semi-permanent flush, making lips appear fuller, more defined, and vibrant.", icon: "3" },
  { slug: "ombre-powder-brows", name: "Ombre Brows", text: "Provides a soft, gradient effect for fuller, defined brows with a makeup-like finish, perfect for long-lasting beauty.", icon: "6" },
  { slug: "beauty-spot", name: "Beauty Spot", text: "Creates realistic beauty marks using semi-permanent pigment, enhancing your natural features with subtle, defined elegance.", icon: "1" },
  { slug: "combination-brows", name: "Combination Brows", text: "Combines microblading and powder shading for a balanced, natural look with defined brows and soft, fuller results.", icon: "2" },
  { slug: "lip-neutralization", name: "Lip Neutralization", text: "Corrects uneven lip tones, offering a smooth, natural finish by balancing pigmentation and enhancing lip shape.", icon: "5" },
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
        <p className="mt-2">{h.text}</p>
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
                <li key={h.slug} className="relative w-[85%] shrink-0 snap-center rounded-md bg-white p-3 sm:w-auto shadow-[0_10px_30px_rgb(154_86_58/0.08)]">
                  <div className="flex h-full flex-col items-center border border-dashed border-theme/35 px-8 pt-24 pb-10 text-center">
                    <div className="absolute -top-12 left-1/2 flex size-[140px] -translate-x-1/2 items-center justify-center rounded-full border-[6px] border-white bg-peach">
                      <Image src={iconPath(s)} alt="" width={67} height={67} />
                    </div>
                    <h2 className="text-[28px]"><Link href={servicePath(s)} className="hover:text-theme">{h.name}</Link></h2>
                    <span className="mt-3 mb-4 flex gap-1 text-theme/45" aria-hidden="true">{[0, 1, 2, 3].map((i) => <LuChevronUp key={i} strokeWidth={3} />)}</span>
                    <p>{h.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
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
