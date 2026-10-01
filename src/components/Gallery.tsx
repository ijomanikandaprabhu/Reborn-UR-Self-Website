"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { LuChevronLeft, LuChevronRight, LuX, LuZoomIn } from "react-icons/lu";
import { galleryCategories, galleryItems, type GalleryCategory } from "@/data/content";
import { enquiryMessage, whatsappLink } from "@/lib/site";
import FilterMenu from "./FilterMenu";
import { setScrollLocked } from "./SmoothScroll";

type Item = (typeof galleryItems)[number];

const labelOf = (cat: GalleryCategory) => galleryCategories.find((c) => c.id === cat)?.label ?? "";
const isCategory = (v: string | null): v is GalleryCategory => galleryCategories.some((c) => c.id === v);

/**
 * resultsOnly: treatment photos only (no events), for the home page.
 * syncUrl: keep the chosen filter in the address (?filter=ombre) so it can be linked to.
 * With "All" and masonry, treatment results come first and events get their own heading.
 */
export default function Gallery({
  limit,
  masonry = false,
  resultsOnly = false,
  syncUrl = false,
}: {
  limit?: number;
  masonry?: boolean;
  resultsOnly?: boolean;
  syncUrl?: boolean;
}) {
  const [filter, setFilter] = useState<GalleryCategory>("all");
  const [open, setOpen] = useState<number | null>(null);
  const scope = useRef<HTMLDivElement>(null);
  const filtered = useRef(false);
  const touchX = useRef<number | null>(null);

  // Start from ?filter=… when the page is opened with one.
  useEffect(() => {
    if (!syncUrl) return;
    const f = new URLSearchParams(window.location.search).get("filter");
    if (isCategory(f) && f !== "all") {
      filtered.current = true;
      setFilter(f); // eslint-disable-line react-hooks/set-state-in-effect -- reading the address once on load
    }
  }, [syncUrl]);

  const choose = (f: GalleryCategory) => {
    filtered.current = true;
    setFilter(f);
    if (syncUrl) {
      const url = new URL(window.location.href);
      if (f === "all") url.searchParams.delete("filter");
      else url.searchParams.set("filter", f);
      window.history.replaceState(null, "", url);
    }
  };

  // After a filter is picked, the matching photos rise and fade in one by one.
  useGSAP(
    () => {
      if (!filtered.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Photos still waiting for their scroll reveal would stay hidden after the layout changes; show them.
      gsap.killTweensOf("ul [data-wipe], ul [data-wipe] img");
      gsap.set("ul [data-wipe]", { opacity: 1, y: 0 });
      gsap.set("ul [data-wipe] img", { scale: 1 });
      gsap.fromTo("ul > li", { y: 40, scale: 0.95, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.07, clearProps: "transform,opacity" });
    },
    { scope, dependencies: [filter] },
  );

  const pool = galleryItems.filter((g) => !resultsOnly || g.cat !== "events");
  // Only offer filters that have photos, with how many each has.
  const categories = galleryCategories
    .map((c) => ({ ...c, count: c.id === "all" ? pool.length : pool.filter((g) => g.cat === c.id).length }))
    .filter((c) => c.count > 0);

  const matching = pool.filter((g) => filter === "all" || g.cat === filter).slice(0, limit);
  const split = masonry && filter === "all";
  const groups: { title?: string; items: Item[] }[] = split
    ? [
        { items: matching.filter((g) => g.cat !== "events") },
        { title: "Training & Events", items: matching.filter((g) => g.cat === "events") },
      ].filter((g) => g.items.length)
    : [{ items: matching }];
  // The viewer steps through photos in the order they appear on the page.
  const items = groups.flatMap((g) => g.items);

  const count = items.length;
  const step = useCallback((dir: number) => setOpen((i) => (i === null ? i : (i + dir + count) % count)), [count]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    setScrollLocked(true);
    window.addEventListener("keydown", onKey);
    return () => {
      setScrollLocked(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  const current = open === null ? null : items[open];

  const sizes = masonry ? "(min-width: 1024px) 400px, (min-width: 640px) 45vw, 50vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw";

  const tile = (g: Item) => {
    const i = items.indexOf(g);
    return (
      <li key={g.src} className={masonry ? "mb-3 break-inside-avoid sm:mb-5" : ""}>
        <button type="button" data-wipe onClick={() => setOpen(i)} className={`group relative block w-full overflow-hidden rounded-lg bg-smoke ${masonry ? "" : "aspect-[4/5]"}`}>
          {masonry ? (
            <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes={sizes} className="h-auto w-full transition duration-500 group-hover:scale-105" />
          ) : (
            <Image src={g.src} alt={g.alt} fill sizes={sizes} className="object-cover transition duration-500 group-hover:scale-105" />
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-title/0 text-3xl text-white opacity-0 transition group-hover:bg-title/40 group-hover:opacity-100">
            <LuZoomIn aria-hidden="true" />
          </span>
          <span className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap items-center gap-1.5 text-left transition duration-300 group-hover:-translate-y-1">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-title backdrop-blur">{labelOf(g.cat)}</span>
            {g.tag && <span className="rounded-full bg-theme/90 px-3 py-1 text-xs font-medium text-white backdrop-blur">{g.tag}</span>}
          </span>
          {/* Touch screens have no hover, so show a small enlarge hint. */}
          <span aria-hidden="true" className="absolute top-3 right-3 hidden size-8 items-center justify-center rounded-full bg-white/85 text-sm text-title shadow [@media(hover:none)]:flex">
            <LuZoomIn />
          </span>
          <span className="sr-only">Enlarge: {g.alt}</span>
        </button>
      </li>
    );
  };

  const listClass = masonry
    ? "columns-2 gap-3 sm:gap-5 lg:columns-3"
    : "flex flex-wrap justify-center gap-5 [&>li]:w-full sm:[&>li]:w-[calc(50%-10px)] lg:[&>li]:w-[calc(33.333%-14px)]";

  return (
    <div ref={scope}>
      {/* Phones: a brand-styled dropdown. Larger screens: a row of filter buttons. */}
      <div className="mb-8 sm:hidden">
        <FilterMenu options={categories} value={filter} onChange={(id) => choose(id as GalleryCategory)} />
      </div>
      <div className="mb-10 hidden flex-wrap justify-center gap-2 sm:flex" role="group" aria-label="Filter photos">

        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => choose(c.id)}
            aria-pressed={filter === c.id}
            className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2 text-sm transition ${filter === c.id ? "border-theme bg-theme text-white" : "border-line text-title hover:border-theme hover:text-theme"}`}
          >
            {c.label} <span className={filter === c.id ? "text-white" : "text-body"}>({c.count})</span>
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="text-center">
          No photos in this category yet.{" "}
          <a href={whatsappLink()} target="_blank" rel="noopener" className="text-theme underline">Ask us on WhatsApp</a> and we will share our latest work.
        </p>
      ) : (
        groups.map((group) => (
          <div key={group.title ?? "results"} className={group.title ? "mt-14" : ""}>
            {group.title && <h2 className="mb-6 text-center text-3xl">{group.title}</h2>}
            <ul className={listClass}>{group.items.map(tile)}</ul>
          </div>
        ))
      )}

      {current && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(null)}
          // Swipe left or right to change photos on touch screens.
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const start = touchX.current;
            touchX.current = null;
            if (start === null) return;
            const dx = e.changedTouches[0].clientX - start;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
          }}
        >
          <p className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-sm text-white" aria-live="polite">
            {open + 1} / {count}
          </p>
          <div className="relative h-[70vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={current.src} alt={current.alt} fill sizes="90vw" className="object-contain" />
          </div>
          <div className="absolute bottom-5 left-1/2 flex w-[90%] -translate-x-1/2 flex-col items-center gap-3 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm text-white/80">{current.alt}</p>
            {current.cat !== "events" && (
              <a href={whatsappLink(enquiryMessage(labelOf(current.cat)))} target="_blank" rel="noopener" className="btn-wa px-6 py-2.5 text-sm">
                <FaWhatsapp className="text-base" /> Want this look? Enquire about {labelOf(current.cat)}
              </a>
            )}
          </div>
          <button type="button" autoFocus onClick={() => setOpen(null)} aria-label="Close" className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"><LuX /></button>
          {count > 1 && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-3 flex size-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"><LuChevronLeft /></button>
              <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-3 flex size-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"><LuChevronRight /></button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
