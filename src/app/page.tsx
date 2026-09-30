import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import CtaBand from "@/components/CtaBand";
import Gallery from "@/components/Gallery";
import HeroSlider from "@/components/HeroSlider";
import SectionTitle from "@/components/SectionTitle";
import ServiceTabs from "@/components/ServiceTabs";
import Testimonials from "@/components/Testimonials";
import { iconPath, servicePath, servicesFor } from "@/data/services";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({ title: `${site.tagline} | ${site.name}`, path: "/" });

const highlights: Record<string, string> = {
  microblading: "Creates natural, hair-like strokes to enhance and shape brows, offering fuller, defined results that last 2-3 years.",
  "lip-blushing": "Enhances natural lip color and shape with a semi-permanent flush, making lips appear fuller, more defined, and vibrant.",
  "ombre-powder-brows": "Provides a soft, gradient effect for fuller, defined brows with a makeup-like finish, perfect for long-lasting beauty.",
  "beauty-spot": "Creates realistic beauty marks using semi-permanent pigment, enhancing your natural features with subtle, defined elegance.",
  "combination-brows": "Combines microblading and powder shading for a balanced, natural look with defined brows and soft, fuller results.",
  "lip-neutralization": "Corrects uneven lip tones, offering a smooth, natural finish by balancing pigmentation and enhancing lip shape.",
};

export default function Home() {
  const featured = Object.keys(highlights).map((slug) => servicesFor("women").find((s) => s.slug === slug)!);

  return (
    <>
      <HeroSlider />

      <section className="section bg-gradient-to-b from-peach/40 to-white">
        <div className="container-site">
          <SectionTitle as="h1" eyebrow="Permanent makeup in New Perungalathur, Chennai" title="Flawless Brow & Lip Solutions" />
          <ul className="grid gap-x-6 gap-y-14 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <li key={s.slug} className="card relative px-7 pt-14 pb-8 text-center">
                <div className="absolute -top-9 left-1/2 flex size-[72px] -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-peach shadow-card">
                  <Image src={iconPath(s)} alt="" width={40} height={40} />
                </div>
                <h2 className="text-2xl"><Link href={servicePath(s)} className="hover:text-theme">{s.name === "Ombre Powder Brows" ? "Ombre Brows" : s.name}</Link></h2>
                <p className="mt-3 text-[15px]">{highlights[s.slug]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-site">
          <SectionTitle eyebrow="Our services" title="Choose What Suits You" />
          <ServiceTabs />
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-site">
          <SectionTitle eyebrow="From the studio" title="Our Work" />
          <Gallery limit={8} />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/gallery" className="btn-theme">View More</Link>
            <a href={site.social.instagram} target="_blank" rel="noopener" className="btn border border-theme text-theme hover:bg-theme hover:text-white">
              <FaInstagram /> Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="section">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-[520px] pb-24 sm:pb-28">
            <Image src="/assets/img/about/about-9-1.jpg" alt="Brow treatment in progress at the Rebornurself studio in Chennai" width={450} height={480} className="w-[78%] rounded-lg" sizes="(min-width: 1024px) 400px, 78vw" />
            <Image src="/assets/img/about/about-9-2.jpg" alt="Close-up of finished permanent makeup brows" width={380} height={380} className="absolute right-0 bottom-0 w-[55%] rounded-lg border-8 border-white shadow-card-hover" sizes="(min-width: 1024px) 290px, 55vw" />
          </div>
          <div>
            <span className="eyebrow">Why Choose Us?</span>
            <h2 className="text-4xl lg:text-5xl">The Ultimate Beauty Experience</h2>
            <p className="mt-6">
              At our studio, we combine expert techniques with personalized care to provide you with flawless, natural-looking
              brows and lips. Our permanent solutions are designed to last 2-3 years, offering you long-lasting beauty and
              convenience. We customize each treatment to suit your unique features, ensuring the best results every time.
            </p>
            <p className="mt-4">
              With options for in-store, on-site, or virtual consultations, we make it easy and comfortable for you to achieve
              your desired look. Clients visit us from New Perungalathur, Alapakkam, Tambaram, Vandalur and across Chennai. Above
              all, your satisfaction is our priority, and we’re committed to helping you feel confident and beautiful.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn-theme">Meet the Artist</Link>
              <Link href="/contact" className="btn border border-theme text-theme hover:bg-theme hover:text-white">Visit the Studio</Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
