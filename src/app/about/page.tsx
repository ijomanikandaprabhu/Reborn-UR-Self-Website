import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { LuArrowRight, LuAward, LuSparkles, LuUsers } from "react-icons/lu";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import SocialLinks from "@/components/SocialLinks";
import Testimonials from "@/components/Testimonials";
import { galleryItems } from "@/data/content";
import { servicesFor } from "@/data/services";
import { founderSchema } from "@/lib/schema";
import { site, whatsappLink } from "@/lib/site";

const description =
  "Meet Sandhiya Srinivasan, the permanent makeup artist behind Rebornurself in Chennai. Brow and lip artistry built on trust, comfort, hygiene and care.";

export const metadata: Metadata = pageMeta({
  title: "About Rebornurself | PMU Artist Sandhiya Srinivasan, Chennai",
  description,
  path: "/about",
  image: "/assets/img/about/about-9-1.jpg",
  imageAlt: "Brow treatment at the Rebornurself studio in Chennai",
});

const training = ["certificate-presentation-1", "microblading-training-group", "certificate-presentation-2", "rebornurself-training-group"].map(
  (n) => galleryItems.find((g) => g.src.endsWith(`/${n}.jpg`))!,
);

// Quick facts shown as pills under her name.
const quickFacts = [
  { Icon: LuAward, text: "Certified Master Artist" },
  { Icon: LuUsers, text: "Women & Men" },
  { Icon: LuSparkles, text: `${servicesFor("women").length} Treatments` },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={founderSchema()} />
      <PageBanner title="Meet the" highlight="Artist" crumbs={[{ name: "About Us", path: "/about" }]} image="/assets/img/breadcumb/breadcumb-bg-2.webp" />

      <section className="bg-cream bg-cover bg-center" style={{ backgroundImage: "url(/assets/img/bg/body-bg-1.webp)" }}>
        <div className="relative mx-auto max-w-[1140px] bg-white px-4 py-16 lg:py-28">
          <Image src="/assets/img/hero/hero-leaf-5.png" alt="" width={246} height={251} data-parallax="0.6" className="absolute top-4 right-[15%] hidden w-40 xl:block" />
          <div className="grid items-start gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
            {/* Portrait in a pill; stays in view on large screens while the story scrolls. */}
            <div className="lg:sticky lg:top-28">
              <div data-wipe className="mx-auto w-full max-w-[230px] rounded-full border border-theme/30 p-1.5 sm:max-w-[290px] lg:max-w-[310px]">
                <div className="flex aspect-[300/400] items-end justify-center overflow-hidden rounded-full bg-[#e7d3cc]">
                  <Image
                    src={site.founder.image}
                    alt="Sandhiya Srinivasan, permanent makeup artist and founder of Rebornurself"
                    width={296}
                    height={353}
                    priority
                    sizes="(min-width: 1024px) 480px, 300px"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>

            <div data-reveal="right" className="text-center lg:text-left">
              <span className="eyebrow text-base">{site.founder.role}</span>
              <h2 className="text-4xl sm:text-5xl">{site.founder.name}</h2>
              <ul className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                {quickFacts.map(({ Icon, text }) => (
                  <li key={text} className="flex items-center gap-2 rounded-full bg-peach/70 px-4 py-2 text-sm font-medium text-title">
                    <Icon className="text-theme" aria-hidden="true" /> {text}
                  </li>
                ))}
              </ul>
              <div className="mx-auto mt-6 max-w-2xl space-y-5 lg:mx-0 lg:max-w-none">
                <p>
                  Sandhiya Srinivasan is the heart and hands behind Rebornurself. A certified artist with a Master’s Advanced
                  Level in Permanent Makeup, she brings together a love of beauty, art and precision, with advanced training
                  in microblading, lip blushing and beauty spots.
                </p>
                <p>
                  For Sandhiya, permanent makeup is more than a service. It is an experience built on trust, comfort and care,
                  with results that are subtle, seamless and tailored to you, so you leave feeling confident in your own skin.
                </p>
              </div>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <a href={whatsappLink("Hi Sandhiya, I would like to book a consultation.")} target="_blank" rel="noopener" className="btn-wa">
                  <FaWhatsapp className="text-lg" /> Book with Sandhiya
                </a>
                <Link href="/gallery" className="btn border border-theme text-theme hover:bg-theme hover:text-white">
                  See Her Work <LuArrowRight />
                </Link>
              </div>
              <SocialLinks links={site.founder.social} className="mt-7 justify-center lg:justify-start" itemClassName="border-line text-title transition hover:-translate-y-1 hover:border-theme hover:bg-theme hover:text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Her words, given room of their own. */}
      <section className="bg-peach/60 py-16 lg:py-24">
        <figure data-reveal="up" className="container-site max-w-3xl text-center">
          <span aria-hidden="true" className="block h-14 font-title text-[120px] leading-[1] text-theme/40 lg:h-16 lg:text-[140px]">“</span>
          <blockquote className="font-title text-3xl leading-snug text-title sm:text-4xl lg:text-5xl">
            Not just looking renewed, but feeling reborn.
          </blockquote>
          <figcaption className="mt-6 text-sm tracking-[0.15em] text-theme uppercase">
            {site.founder.name}, {site.founder.role}
          </figcaption>
        </figure>
      </section>

      {/* Training & certifications: proof of expertise. */}
      <section className="section">
        <div className="container-site">
          <SectionTitle eyebrow="Expertise" title="Training & Certifications">
            Sandhiya trains and certifies new permanent makeup artists, and takes part in beauty industry events.
          </SectionTitle>
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {training.map((g) => (
              <li key={g.src} data-wipe className="mega-hover relative aspect-[4/5] overflow-hidden rounded-lg bg-smoke">
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover" />
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10 text-center">
            <Link href="/gallery" className="btn border border-theme text-theme hover:bg-theme hover:text-white">View All Photos <LuArrowRight /></Link>
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBand title="Meet Sandhiya" text="Send a photo of your brows or lips on WhatsApp and Sandhiya will tell you honestly what will suit you, or call and talk it through first." message="Hi Rebornurself, I would like to book a consultation with Sandhiya." />
    </>
  );
}
