"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuChevronDown, LuMail, LuMenu, LuX } from "react-icons/lu";
import { servicesFor, servicePath, type Gender } from "@/data/services";
import { site, whatsappLink } from "@/lib/site";
import SocialLinks from "./SocialLinks";

const links = [
  { href: "/about", label: "About Us" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact Us" },
];

const groups: Gender[] = ["women", "men"];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the page changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href;
  const onServicePage = groups.some((g) => servicesFor(g).some((s) => pathname === servicePath(s)));
  const navLink = (active: boolean) =>
    `relative py-7 text-[13px] font-bold tracking-wider uppercase ${active ? "text-theme" : "text-title hover:text-theme"}`;

  return (
    <header className="relative z-40">
      <div className="border-b border-line">
        <div className="container-site flex items-center justify-center gap-4 py-2.5 md:justify-between">
          <a href={`mailto:${site.email}`} className="hidden items-center gap-2 text-sm text-body hover:text-theme md:flex">
            <LuMail className="text-theme" /> {site.email}
          </a>
          <SocialLinks itemClassName="border-line text-title hover:border-theme hover:bg-theme hover:text-white" />
        </div>
      </div>

      <div className={`${scrolled ? "fixed inset-x-0 top-0 animate-fade-in shadow-md" : "relative"} bg-white`}>
        <div className="container-site flex items-center justify-between gap-6">
          <Link href="/" className="shrink-0 py-3" aria-label="Rebornurself home">
            <Image src="/assets/img/logos.svg" alt="Rebornurself" width={1899} height={554} priority className="h-14 w-auto" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              <li><Link href="/" className={navLink(isActive("/"))}>Home</Link></li>
              <li className="group relative">
                <button type="button" className={`${navLink(onServicePage)} flex items-center gap-1`} aria-haspopup="true">
                  Services <LuChevronDown className="transition group-hover:rotate-180 group-focus-within:rotate-180" />
                </button>
                <div className="invisible absolute top-full left-1/2 grid w-[440px] -translate-x-1/2 translate-y-3 grid-cols-2 gap-6 rounded-lg border-t-2 border-theme bg-white p-6 opacity-0 shadow-card-hover transition duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {groups.map((g) => (
                    <div key={g}>
                      <p className="mb-2 font-title text-lg text-title">For {g === "women" ? "Women" : "Men"}</p>
                      <ul className="space-y-1">
                        {servicesFor(g).map((s) => (
                          <li key={s.slug}>
                            <Link href={servicePath(s)} className={`block py-1 text-[15px] ${isActive(servicePath(s)) ? "text-theme" : "text-body hover:text-theme"}`}>
                              {s.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
              {links.map((l) => (
                <li key={l.href}><Link href={l.href} className={navLink(isActive(l.href))}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsappLink("Hi Rebornurself, I would like to book an appointment.")}
              target="_blank"
              rel="noopener"
              className="btn-theme hidden px-8 py-3 xl:inline-flex"
            >
              Book
            </a>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-full bg-theme text-xl text-white lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <LuMenu />
            </button>
          </div>
        </div>
      </div>
      {scrolled && <div className="h-20" aria-hidden="true" />}

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-title/60 transition-opacity lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[310px] max-w-[85vw] overflow-y-auto bg-white px-6 pt-5 pb-10 transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex items-center justify-between">
          <Image src="/assets/img/logos.svg" alt="Rebornurself" width={1899} height={554} className="h-12 w-auto" />
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="flex size-10 items-center justify-center rounded-full bg-theme text-lg text-white">
            <LuX />
          </button>
        </div>
        <nav aria-label="Mobile" className="mt-8">
          <ul className="divide-y divide-line border-y border-line">
            <li><Link href="/" className="block py-3.5 font-medium text-title">Home</Link></li>
            <li>
              <button type="button" onClick={() => setServicesOpen((v) => !v)} aria-expanded={servicesOpen} className="flex w-full items-center justify-between py-3.5 font-medium text-title">
                Services <LuChevronDown className={`transition ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <div className="space-y-4 pb-4 pl-3">
                  {groups.map((g) => (
                    <div key={g}>
                      <p className="mb-1 text-xs font-bold tracking-wider text-theme uppercase">For {g === "women" ? "Women" : "Men"}</p>
                      <ul>
                        {servicesFor(g).map((s) => (
                          <li key={s.slug}><Link href={servicePath(s)} className="block py-1.5 text-[15px] text-body">{s.name}</Link></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
            {links.map((l) => (
              <li key={l.href}><Link href={l.href} className="block py-3.5 font-medium text-title">{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <a href={`tel:${site.phone}`} className="btn-theme mt-8 w-full">Call {site.phoneDisplay}</a>
      </div>
    </header>
  );
}
