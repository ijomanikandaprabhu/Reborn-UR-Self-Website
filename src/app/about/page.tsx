import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuAward, LuClock, LuMapPin, LuSparkles, LuUserRound, LuUsers } from "react-icons/lu";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import SocialLinks from "@/components/SocialLinks";
import Testimonials from "@/components/Testimonials";
import { galleryItems } from "@/data/content";
import { servicePath, servicesFor } from "@/data/services";
import { founderSchema } from "@/lib/schema";
import { site } from "@/lib/site";

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

const facts = [
  { Icon: LuAward, label: "Qualification", value: "Certified artist, Master’s Advanced Level in Permanent Makeup" },
  { Icon: LuUserRound, label: "Role", value: "Founder & lead artist at Rebornurself" },
  {
    Icon: LuSparkles,
    label: "Specialisms",
    value: (
      <>
        {servicesFor("women").map((s, i, all) => (
          <span key={s.slug}>
            <Link href={servicePath(s)} className="text-theme underline-offset-2 hover:underline">{s.name}</Link>
            {i < all.length - 2 ? ", " : i === all.length - 2 ? " and " : ""}
          </span>
        ))}
      </>
    ),
  },
  { Icon: LuUsers, label: "Works with", value: "Women and men" },
  { Icon: LuMapPin, label: "Studio", value: "New Perungalathur, Chennai" },
  { Icon: LuClock, label: "Consultations", value: `By appointment, ${site.hours.display}` },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={founderSchema()} />
      <PageBanner title="Meet the" highlight="Artist" crumbs={[{ name: "About Us", path: "/about" }]} image="/assets/img/breadcumb/breadcumb-bg-2.webp" />

      <section className="bg-cream bg-cover bg-center" style={{ backgroundImage: "url(/assets/img/bg/body-bg-1.webp)" }}>
        <div className="relative mx-auto max-w-[1140px] bg-white px-4 py-20 sm:px-4 lg:py-28">
          <Image src="/assets/img/hero/hero-leaf-5.png" alt="" width={246} height={251} data-parallax="0.6" className="absolute top-4 right-[15%] hidden w-40 xl:block" />
          <div className="grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <div data-wipe className="mx-auto w-full max-w-[280px] rounded-full border border-theme/30 p-1.5 sm:max-w-[380px] lg:max-w-[400px]">
              <div className="flex aspect-[385/540] items-end justify-center overflow-hidden rounded-full bg-[#e7d3cc] px-4 pt-8">
                <Image src={site.founder.image} alt="Sandhiya Srinivasan, permanent makeup artist and founder of Rebornurself" width={296} height={421} priority sizes="420px" className="h-auto w-[92%]" />
              </div>
            </div>
            <div data-reveal="right">
              <span className="eyebrow text-base">Founder & CEO</span>
              <h2 className="text-4xl sm:text-5xl">{site.founder.name}</h2>
              <div className="mt-4 space-y-5">
                <p>
                  Meet Sandhiya Srinivasan, the heart and hands behind Rebornurself. As a certified artist with a Master’s
                  Advanced Level in Permanent Makeup, Sandhiya has combined her love for beauty, art, and precision to create
                  a brand dedicated to helping people feel their most confident selves.
                </p>
                <p>
                  Her journey began with a passion for empowering others through transformation, not just in how they look,
                  but in how they feel. With advanced training in microblading, lip blushing, and beauty mark creation,
                  Sandhiya blends technical expertise with a personalized approach for each client.
                </p>
                <blockquote className="border-l-4 border-theme bg-cream py-4 pr-4 pl-6 font-title text-2xl leading-snug text-title">
                  “Not just looking renewed, but feeling reborn.”
                </blockquote>
                <p>
                  She believes permanent makeup is more than a service. It’s an experience. Whether you’re enhancing your
                  natural features or saving time in your beauty routine, Sandhiya is committed to providing results that
                  are subtle, seamless, and tailored to you.
                </p>
                <p>
                  Through Rebornurself, Sandhiya has created a welcoming space built on trust, comfort, and care. Her mission
                  is to help you embrace your individuality and walk away not just looking renewed, but feeling reborn.
                </p>
              </div>
              <Link href="/gallery" className="btn-theme mt-7">See Her Work <LuArrowRight /></Link>
              <ul className="mt-6 divide-y divide-line border-b border-line">
                <li className="py-3"><span className="mr-4 text-sm font-semibold tracking-[0.15em] text-title uppercase">Phone:</span><a href={`tel:${site.phone}`} className="hover:text-theme">{site.phoneDisplay}</a></li>
                <li className="py-3"><span className="mr-4 text-sm font-semibold tracking-[0.15em] text-title uppercase">Email:</span><a href={`mailto:${site.founder.email}`} className="break-all hover:text-theme">{site.founder.email}</a></li>
              </ul>
              <SocialLinks links={site.founder.social} className="mt-8 justify-center lg:justify-start" itemClassName="border-line text-title transition hover:-translate-y-1 hover:border-theme hover:bg-theme hover:text-white" />
            </div>
          </div>

          <div data-reveal className="mt-16 rounded-lg border border-theme/25 bg-gradient-to-br from-cream to-peach/70 p-7 sm:p-10">
            <h3 className="mb-6 text-2xl">At a glance</h3>
            <dl data-reveal="stagger" className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {facts.map(({ Icon, label, value }) => (
                <div key={label}>
                  <dt className="flex items-center gap-2 text-sm tracking-[0.12em] text-theme uppercase"><Icon aria-hidden="true" /> {label}</dt>
                  <dd className="mt-2 text-title/80">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
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
