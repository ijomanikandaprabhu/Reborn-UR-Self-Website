import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import { LuArrowRight, LuHourglass, LuMessagesSquare, LuSparkles } from "react-icons/lu";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import Gallery from "@/components/Gallery";
import HeroSlider from "@/components/HeroSlider";
import SectionTitle from "@/components/SectionTitle";
import ServiceTabs from "@/components/ServiceTabs";
import Testimonials from "@/components/Testimonials";
import { galleryItems } from "@/data/content";
import { getService, iconPath, servicePath } from "@/data/services";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({ title: `${site.tagline} | ${site.name}`, path: "/" });

// Short summaries for the six solution cards.
const highlights = [
  { slug: "microblading", name: "Microblading", icon: "4",
    card: "Fine, hair-like strokes that fill sparse brows naturally, with results lasting 2–3 years.", },
  { slug: "lip-blushing", name: "Lip Blushing", icon: "3",
    card: "A soft semi-permanent flush that makes lips look fuller, more defined and more vibrant.", },
  { slug: "ombre-powder-brows", name: "Ombre Brows", icon: "6",
    card: "A soft powder gradient for fuller, defined brows with a lasting, makeup-like finish.", },
  { slug: "beauty-spot", name: "Beauty Spot", icon: "1",
    card: "Realistic semi-permanent beauty marks that add subtle, defined elegance to your features.", },
  { slug: "combination-brows", name: "Combination Brows", icon: "2",
    card: "Microblading strokes blended with powder shading for balanced, natural and fuller brows.", },
  { slug: "lip-neutralization", name: "Lip Neutralization", icon: "5",
    card: "Corrects dark or uneven lip tone for a smooth, balanced and natural-looking finish.", },
];

// General questions, answered only with facts already published on the service pages.
const homeFaqs = [
  { q: "Does permanent makeup hurt?", a: "Most clients feel very little. A topical numbing cream is applied and left on for about 20 minutes before any work begins, so the procedure stays comfortable." },
  { q: "How long do the results last?", a: "With proper aftercare, microblading typically lasts 2–3 years, ombre powder brows, lip blushing and lip neutralization 1–3 years, and combination brows 12–18 months, depending on your skin and lifestyle." },
  { q: "How long does healing take, and is a touch-up needed?", a: "Skin needs about a month to heal fully. A follow-up touch-up can be taken any time between 30 and 90 days, where definition and depth can be adjusted." },
  { q: "Which treatment is right for me?", a: "Send us a photo of your bare brows or lips in natural light on WhatsApp. We will tell you honestly which procedure suits your features before you book anything." },
  { q: "How do I book an appointment?", a: "Message us on WhatsApp or call +91 80901 11911. Once we agree on the right procedure, a booking deposit holds your slot and is deducted from the total cost on the day of your visit." },
  { q: "Do you offer treatments for men?", a: "Yes. Microblading, ombre powder brows, combination brows, lip neutralization and lip blushing are all available for men, with subtle, natural-looking results." },
];

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

      <section className="section pt-0">
        <div className="container-site">
          <SectionTitle eyebrow="Our services" title="Choose What Suits You" />
          <ServiceTabs />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-site">
          <SectionTitle eyebrow="From the studio" title="Our Work" />
          <Gallery limit={6} resultsOnly />
          <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/gallery" className="btn-theme">View More <LuArrowRight /></Link>
            <a href={site.social.instagram} target="_blank" rel="noopener" className="btn bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#c1358f] text-white hover:opacity-90">
              <FaInstagram className="text-lg" /> Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Training & events: proof of expertise, kept apart from the treatment results. */}
      <section className="section bg-cream">
        <div className="container-site">
          <SectionTitle eyebrow="Beyond the studio" title="Training & Events">
            Sandhiya trains new artists and takes part in beauty industry events.
          </SectionTitle>
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {galleryItems.filter((g) => g.cat === "events").slice(0, 4).map((g) => (
              <li key={g.src} data-wipe className="mega-hover group relative aspect-[4/5] overflow-hidden rounded-lg bg-smoke">
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10 text-center">
            <Link href="/gallery" className="btn-theme">See all in the Gallery <LuArrowRight /></Link>
          </div>
        </div>
      </section>

      <Testimonials />
      <Faq faqs={homeFaqs} />

      <section className="section">
        <div className="container-site grid items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-14">
          <div className="relative mx-auto w-full max-w-[560px] pb-24 md:mx-0 lg:justify-self-end lg:pb-28">
            <div data-wipe className="w-[80%] overflow-hidden">
              <Image src="/assets/img/about/about-9-1.jpg" alt="Brow treatment in progress at the Rebornurself studio in Chennai" width={450} height={480} className="w-full" sizes="(min-width: 1024px) 450px, 80vw" />
            </div>
            <div data-parallax="0.35" className="absolute right-0 bottom-0 w-[62%]">
              <div data-wipe className="overflow-hidden border-[10px] border-white shadow-card-hover">
                <Image src="/assets/img/about/about-9-2.jpg" alt="Close-up of finished permanent makeup brows" width={380} height={380} className="w-full" sizes="(min-width: 1024px) 350px, 62vw" />
              </div>
            </div>
          </div>
          <div>
            <div data-reveal="right">
              <span className="eyebrow">Why Choose Us?</span>
              <h2 className="text-4xl lg:text-5xl">The Ultimate Beauty Experience</h2>
              <p className="mt-6">
                At our studio, we combine expert techniques with personalized care to provide you with flawless, natural-looking
                brows and lips. Above all, your satisfaction is our priority, and we’re committed to helping you feel confident
                and beautiful.
              </p>
            </div>
            <ul data-reveal="stagger" className="mt-7 space-y-4">
              {[
                { Icon: LuHourglass, title: "Long-lasting results", text: "Designed to last 2-3 years, so you wake up ready every day." },
                { Icon: LuSparkles, title: "Tailored to you", text: "Every treatment is customised to your unique features." },
                { Icon: LuMessagesSquare, title: "Easy consultations", text: "In-store, on-site or virtual, whatever suits you best." },
              ].map(({ Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-peach text-xl text-theme"><Icon aria-hidden="true" /></span>
                  <span>
                    <span className="block font-title text-xl text-title">{title}</span>
                    <span className="block text-[15px]">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div data-reveal className="mt-8">
              <Link href="/contact" className="btn-theme">Book a Consultation <LuArrowRight /></Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
