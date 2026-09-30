import type { Metadata } from "next";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "This page could not be found. Head back to Rebornurself, the permanent makeup studio in New Perungalathur, Chennai.",
  robots: { index: false },
};

const popular = [
  { href: "/microblading", label: "Microblading" },
  { href: "/ombre-powder-brows", label: "Ombre Powder Brows" },
  { href: "/lip-blushing", label: "Lip Blushing" },
  { href: "/beauty-spot", label: "Beauty Spot" },
  { href: "/contact", label: "Book or Contact" },
];

export default function NotFound() {
  return (
    <section className="section bg-cream text-center">
      <div className="container-site max-w-xl">
        <p className="font-title text-[120px] leading-none text-theme sm:text-[160px]" aria-hidden="true">404</p>
        <h1 className="mt-2 text-4xl">This page went missing</h1>
        <p className="mt-4">
          We looked twice — the page you are after is not here. It may have moved, or the link may be out of date. Let us
          point you somewhere better.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-theme">Back to home</Link>
          <a href={whatsappLink("Hi Rebornurself, I would like to get in touch.")} target="_blank" rel="noopener" className="btn-wa"><FaWhatsapp /> WhatsApp us</a>
          <a href={`tel:${site.phone}`} className="btn border border-theme text-theme hover:bg-theme hover:text-white">{site.phoneDisplay}</a>
        </div>
        <p className="mt-10 text-sm">
          Popular pages:{" "}
          {popular.map((p, i) => (
            <span key={p.href}>
              {i > 0 && " · "}
              <Link href={p.href} className="text-theme hover:underline">{p.label}</Link>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
