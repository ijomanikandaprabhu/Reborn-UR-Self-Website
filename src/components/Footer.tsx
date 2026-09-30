import Image from "next/image";
import Link from "next/link";
import { LuMail, LuPhone } from "react-icons/lu";
import { servicesFor, servicePath } from "@/data/services";
import { site } from "@/lib/site";
import SocialLinks from "./SocialLinks";

const menu = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1d2429] pt-16 pb-28 text-center lg:pb-9">
      <div data-reveal="fade" className="container-site">
        <Link href="/" className="inline-block" aria-label="Rebornurself home">
          <Image src="/assets/img/footlogo.svg" alt="Rebornurself" width={261} height={80} className="h-[76px] w-auto" />
        </Link>

        <address className="mt-12 flex flex-col items-center gap-3 text-sm font-medium not-italic text-white sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8">
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-theme">
            <LuMail className="text-theme" /> {site.email}
          </a>
          <a href={`tel:${site.phone}`} className="flex items-center gap-2 hover:text-theme">
            <LuPhone className="text-theme" /> {site.phoneDisplay}
          </a>
        </address>

        <SocialLinks className="mt-6 justify-center" itemClassName="size-10 border-white/25 text-white transition hover:-translate-y-1 hover:border-theme hover:bg-theme" />

        <nav aria-label="Footer" className="mt-8">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold tracking-wider sm:gap-x-16 sm:text-[15px] sm:tracking-widest text-white uppercase">
            {menu.map((m) => (
              <li key={m.href}><Link href={m.href} className="link-slide inline-block py-2 hover:text-theme sm:py-0">{m.label}</Link></li>
            ))}
          </ul>
          <ul className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-x-7 gap-y-1 text-[15px] sm:gap-y-3 font-medium text-white/75">
            {servicesFor("women").map((s) => (
              <li key={s.slug}><Link href={servicePath(s)} className="link-slide inline-block py-2 hover:text-theme sm:py-0">{s.name}</Link></li>
            ))}
          </ul>
        </nav>

        <p className="mx-auto mt-10 max-w-lg border-t border-white/10 pt-7 text-sm text-white/50 sm:text-[15px]">
          Copyright © {new Date().getFullYear()}{" "}
          <Link href="/" className="link-slide hover:text-theme">Rebornurself</Link>. All Rights Reserved By{" "}
          <a href="https://ijocreations.com/" target="_blank" rel="noopener" className="link-slide hover:text-theme">Ijocreations</a>
        </p>
      </div>
    </footer>
  );
}
