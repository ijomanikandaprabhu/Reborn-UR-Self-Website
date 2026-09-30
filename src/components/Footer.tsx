import Image from "next/image";
import Link from "next/link";
import { LuClock, LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { servicesFor, servicePath } from "@/data/services";
import { fullAddress, mapsDirectionsUrl, site } from "@/lib/site";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-[#1d2429] pt-16 pb-24 text-center text-white/70 md:pb-10">
      <div className="container-site">
        <Link href="/" className="inline-block" aria-label="Rebornurself home">
          <Image src="/assets/img/footlogo.svg" alt="Rebornurself" width={261} height={80} className="h-16 w-auto" />
        </Link>

        <address className="mx-auto mt-8 flex max-w-4xl flex-col items-center gap-3 text-sm not-italic md:flex-row md:flex-wrap md:justify-center md:gap-x-8">
          <a href={mapsDirectionsUrl} target="_blank" rel="noopener" className="flex items-center gap-2 text-white hover:text-theme">
            <LuMapPin className="shrink-0 text-theme" /> {fullAddress}
          </a>
          <a href={`tel:${site.phone}`} className="flex items-center gap-2 text-white hover:text-theme">
            <LuPhone className="text-theme" /> {site.phoneDisplay}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-white hover:text-theme">
            <LuMail className="text-theme" /> {site.email}
          </a>
          <span className="flex items-center gap-2 text-white">
            <LuClock className="text-theme" /> Open daily, {site.hours.display}
          </span>
        </address>

        <SocialLinks
          className="mt-8 justify-center"
          itemClassName="size-10 border-white/25 text-white hover:border-theme hover:bg-theme"
        />

        <nav aria-label="Footer" className="mt-10 grid gap-8 border-t border-white/10 pt-10 text-sm sm:grid-cols-3">
          <div>
            <p className="mb-3 font-title text-lg text-white">Studio</p>
            <ul className="space-y-1.5">
              <li><Link href="/" className="hover:text-theme">Home</Link></li>
              <li><Link href="/about" className="hover:text-theme">About</Link></li>
              <li><Link href="/gallery" className="hover:text-theme">Gallery</Link></li>
              <li><Link href="/contact" className="hover:text-theme">Book or Contact</Link></li>
            </ul>
          </div>
          {(["women", "men"] as const).map((g) => (
            <div key={g}>
              <p className="mb-3 font-title text-lg text-white">For {g === "women" ? "Women" : "Men"}</p>
              <ul className="space-y-1.5">
                {servicesFor(g).map((s) => (
                  <li key={s.slug}>
                    <Link href={servicePath(s)} className="hover:text-theme">
                      {s.name} {g === "men" ? "for Men" : ""}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <p className="mt-10 border-t border-white/10 pt-6 text-sm">
          © {new Date().getFullYear()} <Link href="/" className="text-white hover:text-theme">Rebornurself</Link>, permanent makeup studio in New Perungalathur, Chennai. Website by{" "}
          <a href="https://ijocreations.com/" target="_blank" rel="noopener" className="text-white hover:text-theme">ijocreations</a>
        </p>
      </div>
    </footer>
  );
}
