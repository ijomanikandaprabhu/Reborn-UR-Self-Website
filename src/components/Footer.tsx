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
    <footer className="bg-[#1d2429] pt-16 pb-24 text-center md:pb-9">
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

        <SocialLinks className="mt-6 justify-center" itemClassName="size-10 border-white/25 text-white hover:border-theme hover:bg-theme" />

        <nav aria-label="Footer" className="mt-8">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px] font-semibold tracking-widest sm:gap-x-16 text-white uppercase">
            {menu.map((m) => (
              <li key={m.href}><Link href={m.href} className="hover:text-theme">{m.label}</Link></li>
            ))}
          </ul>
          <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-7 gap-y-3 text-[15px] font-medium text-white/75">
            {servicesFor("women").map((s) => (
              <li key={s.slug}><Link href={servicePath(s)} className="hover:text-theme">{s.name}</Link></li>
            ))}
          </ul>
        </nav>

        <p className="mx-auto mt-10 max-w-lg border-t border-white/10 pt-7 text-[15px] text-white/50">
          Copyright © {new Date().getFullYear()}{" "}
          <Link href="/" className="hover:text-theme">Rebornurself</Link>. All Rights Reserved By{" "}
          <a href="https://ijocreations.com/" target="_blank" rel="noopener" className="hover:text-theme">Ijocreations</a>
        </p>
      </div>
    </footer>
  );
}
