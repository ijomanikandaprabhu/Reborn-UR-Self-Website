import type { Metadata } from "next";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { LuHouse, LuPhone } from "react-icons/lu";
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

/** An open eye with lashes, standing in for the 0 of 404. */
function Eye() {
  return (
    <svg viewBox="0 0 120 80" className="h-[0.8em] w-[1.2em]" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden="true">
      <path d="M8 48 C30 16, 90 16, 112 48 C90 76, 30 76, 8 48 Z" />
      <circle cx="60" cy="47" r="17" fill="rgb(154 86 58 / 0.18)" />
      <circle cx="60" cy="47" r="7" fill="#121f38" stroke="none" />
      <path d="M60 4 v10 M34 10 l5 9 M86 10 l-5 9 M14 22 l8 7 M106 22 l-8 7" strokeWidth="3.5" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <section className="section bg-[radial-gradient(ellipse_at_top,#fdeee6,#fff_60%)] text-center">
      <div className="container-site max-w-3xl">
        <p className="flex items-center justify-center gap-2 font-title text-[110px] leading-none text-title sm:text-[140px]" aria-hidden="true">
          4<span className="text-theme"><Eye /></span>4
        </p>
        <h1 className="mt-4 text-4xl uppercase">This page went missing</h1>
        <p className="mt-4">
          We looked twice: the page you are after is not here. It may have moved, or the link may be out of date. Let us
          point you somewhere better.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-theme"><LuHouse /> Back to home</Link>
          <a href={whatsappLink("Hi Rebornurself, I would like to get in touch.")} target="_blank" rel="noopener" className="btn-wa"><FaWhatsapp /> WhatsApp us</a>
          <a href={`tel:${site.phone}`} className="btn-theme"><LuPhone /> {site.phoneDisplay}</a>
        </div>
        <p className="mt-10 border-t border-line pt-6 text-sm">
          Popular pages:{" "}
          {popular.map((p) => (
            <Link key={p.href} href={p.href} className="ml-3 text-theme hover:underline">{p.label}</Link>
          ))}
        </p>
      </div>
    </section>
  );
}
