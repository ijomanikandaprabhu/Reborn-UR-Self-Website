import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { LuAward, LuClock, LuMail, LuMapPin, LuPhone, LuSparkles, LuUserRound, LuUsers } from "react-icons/lu";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import SocialLinks from "@/components/SocialLinks";
import Testimonials from "@/components/Testimonials";
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

const facts = [
  { Icon: LuAward, label: "Qualification", value: "Certified artist, Master’s Advanced Level in Permanent Makeup" },
  { Icon: LuUserRound, label: "Role", value: "Founder & lead artist at Rebornurself" },
  { Icon: LuSparkles, label: "Specialisms", value: "Microblading, ombre powder brows, combination brows, lip neutralization, lip blushing and beauty spot" },
  { Icon: LuUsers, label: "Works with", value: "Women and men" },
  { Icon: LuMapPin, label: "Studio", value: "New Perungalathur, Chennai" },
  { Icon: LuClock, label: "Consultations", value: `By appointment, ${site.hours.display}` },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={founderSchema()} />
      <PageBanner title="About Us" crumbs={[{ name: "About Us", path: "/about" }]} image="/assets/img/breadcumb/breadcumb-bg-2.jpg" />

      <section className="section bg-cover bg-center" style={{ backgroundImage: "url(/assets/img/bg/body-bg-1.jpg)" }}>
        <div className="container-site">
          <div className="grid items-center gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
            <div className="mx-auto w-full max-w-sm rounded-lg bg-peach p-6">
              <Image src={site.founder.image} alt="Sandhiya Srinivasan, permanent makeup artist and founder of Rebornurself" width={296} height={421} priority className="mx-auto w-full" />
            </div>
            <div>
              <span className="eyebrow">Founder & CEO</span>
              <h2 className="text-5xl">{site.founder.name}</h2>
              <div className="mt-6 space-y-4">
                <p>
                  Meet Sandhiya Srinivasan, the heart and hands behind Rebornurself. As a certified artist with a Master’s
                  Advanced Level in Permanent Makeup, Sandhiya has combined her love for beauty, art, and precision to create
                  a brand dedicated to helping people feel their most confident selves.
                </p>
                <p>
                  Her journey began with a passion for empowering others through transformation—not just in how they look,
                  but in how they feel. With advanced training in microblading, lip blushing, and beauty mark creation,
                  Sandhiya blends technical expertise with a personalized approach for each client.
                </p>
                <p>
                  She believes permanent makeup is more than a service—it’s an experience. Whether you’re enhancing your
                  natural features or saving time in your beauty routine, Sandhiya is committed to providing results that
                  are subtle, seamless, and tailored to you.
                </p>
                <p>
                  Through Rebornurself, Sandhiya has created a welcoming space built on trust, comfort, and care. Her mission
                  is to help you embrace your individuality and walk away not just looking renewed—but feeling reborn.
                </p>
              </div>
              <ul className="mt-6 space-y-2 text-title">
                <li className="flex items-center gap-3"><LuPhone className="text-theme" /><a href={`tel:${site.phone}`} className="hover:text-theme">{site.phoneDisplay}</a></li>
                <li className="flex items-center gap-3"><LuMail className="text-theme" /><a href={`mailto:${site.founder.email}`} className="break-all hover:text-theme">{site.founder.email}</a></li>
              </ul>
              <SocialLinks links={site.founder.social} className="mt-6" itemClassName="border-line text-title hover:border-theme hover:bg-theme hover:text-white" />
            </div>
          </div>

          <div className="mt-16 rounded-lg bg-white p-7 shadow-card sm:p-10">
            <h3 className="mb-6 text-2xl">At a glance</h3>
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {facts.map(({ Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-theme/10 text-lg text-theme"><Icon /></span>
                  <div>
                    <dt className="text-xs font-semibold tracking-wider uppercase opacity-75">{label}</dt>
                    <dd className="text-[15px] text-title">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBand />
    </>
  );
}
