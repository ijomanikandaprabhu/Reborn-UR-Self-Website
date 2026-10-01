import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { LuMail, LuPhone } from "react-icons/lu";
import { servicesFor, servicePath, type Gender } from "@/data/services";
import { site, whatsappLink } from "@/lib/site";
import SocialLinks from "./SocialLinks";

const menu = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
];

const groups: { gender: Gender; title: string }[] = [
  { gender: "women", title: "For Women" },
  { gender: "men", title: "For Men" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1d2429] pt-16 pb-24 text-white/75">
      <div data-reveal="fade" className="container-site">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-10">
          {/* Brand, contact and booking */}
          <div className="col-span-full flex flex-col items-center text-center lg:col-span-1 lg:items-start lg:text-left">
            <Link href="/" className="inline-block" aria-label="Rebornurself home">
              <Image src="/assets/img/footlogo.svg" alt="Rebornurself" width={261} height={80} className="h-[70px] w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed">
              Permanent makeup studio for natural-looking brows and lips, for women and men.
            </p>
            <ul className="mt-5 text-sm lg:space-y-1">
              <li>
                <a href={`tel:${site.phone}`} className="inline-flex items-center gap-2 py-2.5 text-white hover:text-theme lg:py-1">
                  <LuPhone className="text-theme" aria-hidden="true" /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 py-2.5 text-white hover:text-theme lg:py-1">
                  <LuMail className="text-theme" aria-hidden="true" /> {site.email}
                </a>
              </li>
            </ul>
            <a
              href={whatsappLink("Hi Rebornurself, I would like to book an appointment.")}
              target="_blank"
              rel="noopener"
              className="btn-wa mt-6 px-6 py-3 text-sm"
            >
              <FaWhatsapp className="text-base" /> Book on WhatsApp
            </a>
            <SocialLinks className="mt-6 justify-center lg:justify-start" itemClassName="size-11 border-white/25 lg:size-10 !text-white visited:!text-white [&_svg]:!fill-white [&_svg]:!text-white transition hover:-translate-y-1 hover:border-theme hover:bg-theme" />
          </div>

          {/* Treatments for women and men */}
          {groups.map(({ gender, title }) => (
            <nav key={gender} aria-label={`Treatments ${title.toLowerCase()}`}>
              <p className="mb-4 font-title text-xl text-white">{title}</p>
              <ul className="text-[15px] lg:space-y-1">
                {servicesFor(gender).map((s) => (
                  <li key={s.slug}>
                    <Link href={servicePath(s)} className="link-slide inline-block py-2.5 hover:text-theme lg:py-1.5">{s.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Studio pages */}
          <nav aria-label="Footer" className="col-span-2 sm:col-span-1">
            <p className="mb-4 font-title text-xl text-white">Studio</p>
            <ul className="flex flex-wrap gap-x-6 text-[15px] sm:block lg:space-y-1">
              {menu.map((m) => (
                <li key={m.href}><Link href={m.href} className="link-slide inline-block py-2.5 hover:text-theme lg:py-1.5">{m.label}</Link></li>
              ))}
              <li><Link href="/privacy" className="link-slide inline-block py-2.5 hover:text-theme lg:py-1.5">Privacy Policy</Link></li>
            </ul>
          </nav>
        </div>

        <p className="mt-12 flex flex-col items-center gap-1 border-t border-white/10 pt-7 text-center text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Rebornurself. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Website by
            <a href="https://ijocreations.com/" target="_blank" rel="noopener" className="link-slide inline-flex min-h-11 items-center text-white/80 hover:text-theme">Ijocreations</a>
          </span>
        </p>
      </div>
    </footer>
  );
}
