import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { LuClock, LuHeartHandshake, LuLayers, LuMail, LuMapPin, LuNavigation, LuPhone } from "react-icons/lu";
import ContactForm from "@/components/ContactForm";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";
import Testimonials from "@/components/Testimonials";
import { fullAddress, mapsDirectionsUrl, mapsEmbedUrl, site, whatsappLink } from "@/lib/site";

const description =
  "Book your permanent makeup appointment at Rebornurself in New Perungalathur, Chennai, or reach us on WhatsApp. Open 10 AM to 7 PM.";

export const metadata: Metadata = pageMeta({
  title: "Book or Contact Rebornurself | PMU Studio in Chennai",
  description,
  path: "/contact",
});

const bookingSteps = [
  { title: "1. Send us a photo first", text: "Before you book, message us on WhatsApp with a photo of your bare brows or lips taken in natural light, with no makeup on. We use it to tell you which procedure will actually suit you, rather than guessing on the day." },
  { title: "2. Reserve your slot", text: "Once we have agreed on the right procedure, pick a time that works for you. A booking deposit is required to hold the slot, and it is deducted from your total procedure cost on the day of your visit." },
  { title: "3. Set aside enough time", text: "On the day we start with an in-person consultation, then a topical numbing cream that sits for around 20 minutes before any work begins. Plan for a relaxed appointment rather than a rushed one." },
  { title: "Nothing is permanent until you approve it", text: "Your brow or lip shape is mapped by hand and shown to you first. We only begin the actual procedure once you are completely happy with the outline." },
  { title: "Aftercare matters", text: "Healed results depend heavily on aftercare. Before you leave, we brief you on exactly what to do and what to avoid while your skin settles and the pigment retains." },
  { title: "Your touch-up session", text: "Skin needs about a month to heal fully. A follow-up touch-up can be taken any time between 30 and 90 days, where definition and depth can be adjusted to suit how your skin healed." },
];

export default function ContactPage() {
  const details = [
    { Icon: LuMapPin, label: "Address", value: fullAddress },
    { Icon: LuClock, label: "Open", value: `${site.hours.display}, by appointment` },
    { Icon: LuPhone, label: "Phone", value: <a href={`tel:${site.phone}`} className="hover:text-theme">{site.phoneDisplay}</a> },
    { Icon: LuMail, label: "Email", value: <a href={`mailto:${site.email}`} className="hover:text-theme">{site.email}</a> },
  ];

  return (
    <>
      <PageBanner title="Contact" highlight="Us" crumbs={[{ name: "Contact Us", path: "/contact" }]} />

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal="left">
            <div className="text-center lg:text-left">
              <span className="eyebrow">Book your visit</span>
              <h2 className="text-4xl uppercase sm:text-5xl">Let’s Start <span className="text-theme">Here</span></h2>
              <p className="mt-5 mb-8">
                Fill in your details and we will carry on over WhatsApp, where you can send a photo of your bare brows or
                lips and we will tell you which procedure actually suits you — before you commit to anything. Prefer to talk?
                Call or email us instead.
              </p>
            </div>
            <ContactForm />
          </div>
          <Image data-reveal="right" src="/assets/img/about/about-9-2.jpg" alt="Permanent makeup being applied at Rebornurself, Chennai" width={380} height={380} sizes="(min-width: 1024px) 560px, 100vw" className="h-full max-h-[480px] w-full object-cover lg:max-h-none" />
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container-site">
          <div data-reveal="zoom" className="flex flex-col overflow-hidden rounded-xl border border-title/[0.08] bg-white shadow-[0_10px_40px_rgb(18_31_56/0.07)] lg:flex-row">
            <iframe
              src={mapsEmbedUrl}
              title="Map showing Rebornurself in New Perungalathur, Chennai"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[320px] w-full lg:min-h-[460px] lg:basis-[58%]"
            />
            <div className="flex flex-col justify-center p-7 sm:p-11 lg:basis-[42%]">
              <span className="eyebrow">The studio</span>
              <h2 className="mb-6 text-3xl">Rebornurself, New Perungalathur</h2>
              <ul className="mb-8 divide-y divide-title/[0.08]">
                {details.map(({ Icon, label, value }) => (
                  <li key={label} className="flex gap-4 py-4 first:pt-0">
                    <Icon className="mt-1 shrink-0 text-lg text-theme" />
                    <div>
                      <span className="block text-xs font-semibold tracking-wider uppercase opacity-75">{label}</span>
                      <span className="block text-[15px] text-title">{value}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href={mapsDirectionsUrl} target="_blank" rel="noopener" className="btn-theme px-6 py-3 text-sm"><LuNavigation /> Get directions</a>
                <a href={whatsappLink()} target="_blank" rel="noopener" className="btn-wa px-6 py-3 text-sm"><FaWhatsapp /> WhatsApp us</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-site">
          <SectionTitle eyebrow="Good to know" title="How Booking Works" />
          <ul data-reveal="stagger" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookingSteps.map((b) => (
              <li key={b.title} className="card p-7">
                <h3 className="mb-3 text-xl">{b.title}</h3>
                <p className="text-[15px]">{b.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-lg bg-smoke p-6 text-center">
            <p>Studio hours: {site.hours.display} | Call: <a href={`tel:${site.phone}`} className="font-medium text-theme">{site.phoneDisplay}</a> | Email: <a href={`mailto:${site.email}`} className="font-medium text-theme">{site.email}</a></p>
            <p className="mt-1">Prefer to ask first? <a href={whatsappLink()} target="_blank" rel="noopener" className="font-medium text-theme">Send us an enquiry on WhatsApp</a> and we will guide you to the right procedure.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <div data-reveal="stagger" className="grid overflow-hidden rounded-xl bg-peach md:grid-cols-2">
            {[
              { Icon: LuLayers, title: "What we offer", text: "Microblading, ombre powder brows, combination brows, lip neutralization, lip blushing and beauty spot — each available for both women and men." },
              { Icon: LuHeartHandshake, title: "Not sure what you need?", text: "That is normal, and it is exactly what the first consultation is for. Send us a photo and we will recommend the procedure that suits your features, your skin and the look you are after." },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="p-8 sm:p-11 md:[&+&]:border-l [&+&]:border-t md:[&+&]:border-t-0 [&+&]:border-title/[0.08]">
                <span className="mb-5 flex size-14 items-center justify-center rounded-full bg-white text-2xl text-theme"><Icon /></span>
                <h3 className="mb-3 text-2xl">{title}</h3>
                <p className="text-[15px]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
