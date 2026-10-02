"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { LuChevronDown, LuMail, LuMenu, LuPhone, LuX } from "react-icons/lu";
import { iconPath, servicesFor, servicePath, type Gender } from "@/data/services";
import { emailLink, site, whatsappLink } from "@/lib/site";
import { setScrollLocked } from "./SmoothScroll";
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
  // Desktop Services menu: opens on hover, and also on click/tap (touch laptops, tablets in landscape).
  const [ddOpen, setDdOpen] = useState(false);
  const ddRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    if (!ddOpen) return;
    const close = (e: Event) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ddRef.current?.contains(e.target as Node)) setDdOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [ddOpen]);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the page changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setDdOpen(false);
  }

  // Share the header height so the home hero can fill the rest of the screen.
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () => {
      if (window.scrollY < 120) {
        document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
        // Height of the main bar, kept as a placeholder when it becomes fixed, so the page does not jump.
        const bar = el.children[1] as HTMLElement | undefined;
        if (bar) document.documentElement.style.setProperty("--bar-h", `${bar.offsetHeight}px`);
      }
    };
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Scrolling down hides the sticky header; scrolling up brings it back.
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const pinned = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Pin once the whole header has scrolled out of view, so the switch is never seen; unpin only when
      // the normal bar would sit exactly where the pinned one is (just below the top bar), so there is no jump.
      const el = headerRef.current;
      const topBar = (el?.children[0] as HTMLElement | undefined)?.offsetHeight ?? 0;
      const full = el?.offsetHeight ?? 150;
      const past = pinned.current ? y > topBar : y > full;
      pinned.current = past;
      setScrolled(past);
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(past && y > lastY.current);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Slide animations start a frame after pinning, so the bar never visibly slides away as it pins.
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimate(scrolled));
    return () => cancelAnimationFrame(id);
  }, [scrolled]);

  useEffect(() => {
    setScrollLocked(open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href;
  const onServicePage = groups.some((g) => servicesFor(g).some((s) => pathname === servicePath(s)));
  const navLink = (active: boolean) =>
    `relative py-8 text-[14px] font-semibold uppercase xl:text-[15px] ${active ? "text-theme" : "text-title hover:text-theme"}`;

  return (
    <header ref={headerRef} className="relative z-40">
      {/* Top bar: tablets and up only; phones get these links inside the menu. */}
      <div className="hidden md:block">
        <div className="container-site flex items-center justify-center gap-4 border-b border-line py-2.5 md:justify-between">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-body">
            <li><a href={`tel:${site.phone}`} className="flex items-center gap-2 py-3 hover:text-theme lg:py-1"><LuPhone className="text-theme" aria-hidden="true" /> {site.phoneDisplay}</a></li>
            <li><a href={emailLink()} className="flex items-center gap-2 py-3 hover:text-theme lg:py-1"><LuMail className="text-theme" aria-hidden="true" /> {site.email}</a></li>
          </ul>
          <SocialLinks itemClassName="border-line text-title hover:border-theme hover:bg-theme hover:text-white" />
        </div>
      </div>

      <div
        className={`${scrolled ? "fixed inset-x-0 top-0 shadow-md" : "relative"} bg-white will-change-transform ${animate ? "transition-[translate,box-shadow] duration-300 ease-out" : ""} ${scrolled && hidden && !open && !ddOpen ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="container-site flex items-center justify-between gap-6">
          <Link href="/" className="shrink-0 py-3" aria-label="Rebornurself home">
            <Image src="/assets/img/logos.svg" alt="Rebornurself" width={1899} height={554} priority className="h-16 w-auto" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              <li><Link href="/" className={navLink(isActive("/"))}>Home</Link></li>
              <li ref={ddRef} className="group relative" onMouseLeave={() => setDdOpen(false)}>
                <button type="button" className={`${navLink(onServicePage)} flex items-center gap-1`} aria-haspopup="true" aria-expanded={ddOpen} onClick={() => setDdOpen((v) => !v)}>
                  Service <LuChevronDown className={`transition group-hover:rotate-180 ${ddOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`invisible absolute top-full left-1/2 grid w-[500px] -translate-x-1/2 translate-y-3 grid-cols-2 gap-6 rounded-lg border-t-2 border-theme bg-white p-6 opacity-0 shadow-card-hover transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${ddOpen ? "!visible !translate-y-0 !opacity-100" : ""}`}>
                  {groups.map((g) => (
                    <div key={g}>
                      <p className="mb-2 font-title text-lg text-title">For {g === "women" ? "Women" : "Men"}</p>
                      <ul className="space-y-1">
                        {servicesFor(g).map((s) => (
                          <li key={s.slug}>
                            <Link href={servicePath(s)} className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[15px] hover:bg-cream ${isActive(servicePath(s)) ? "text-theme" : "text-body hover:text-theme"}`}>
                              <Image src={iconPath(s)} alt="" width={22} height={22} />
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
              className="btn-theme btn-shine hidden px-8 py-3 font-semibold tracking-wider uppercase lg:inline-flex"
            >
              <FaWhatsapp aria-hidden="true" /> Book
            </a>
            <a href={`tel:${site.phone}`} aria-label={`Call ${site.phoneDisplay}`} className="flex size-11 items-center justify-center rounded-full border border-theme text-lg text-theme lg:hidden">
              <LuPhone />
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
      {scrolled && <div className="h-[var(--bar-h,88px)]" aria-hidden="true" />}

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-title/60 transition-opacity lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[310px] max-w-[85vw] overflow-y-auto bg-white px-6 pt-5 pb-10 transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-hidden={!open}
        inert={!open}
        data-lenis-prevent
      >
        <div className="flex items-center justify-between">
          <Image src="/assets/img/logos.svg" alt="Rebornurself" width={1899} height={554} className="h-12 w-auto" />
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="flex size-11 items-center justify-center rounded-full bg-theme text-lg text-white">
            <LuX />
          </button>
        </div>
        <nav aria-label="Mobile" className="mt-8">
          <ul className="divide-y divide-line border-y border-line">
            <li><Link href="/" className={`block py-3.5 font-medium ${isActive("/") ? "text-theme" : "text-title"}`}>Home</Link></li>
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
              <li key={l.href}><Link href={l.href} className={`block py-3.5 font-medium ${isActive(l.href) ? "text-theme" : "text-title"}`}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <a href={whatsappLink("Hi Rebornurself, I would like to book an appointment.")} target="_blank" rel="noopener" className="btn-wa mt-8 w-full"><FaWhatsapp className="text-lg" /> Book on WhatsApp</a>
        <a href={`tel:${site.phone}`} className="btn mt-3 w-full border border-theme text-theme">Call {site.phoneDisplay}</a>
        <SocialLinks whatsapp={false} className="mt-6 justify-center" itemClassName="border-line text-title" />
      </div>
    </header>
  );
}
