"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight, LuX, LuZoomIn } from "react-icons/lu";
import { galleryCategories, galleryItems, type GalleryCategory } from "@/data/content";
import { whatsappLink } from "@/lib/site";
import { setScrollLocked } from "./SmoothScroll";

/** resultsOnly: treatment photos only (no events), for the home page. */
export default function Gallery({ limit, masonry = false, resultsOnly = false }: { limit?: number; masonry?: boolean; resultsOnly?: boolean }) {
  const [filter, setFilter] = useState<GalleryCategory>("all");
  const [open, setOpen] = useState<number | null>(null);
  const scope = useRef<HTMLDivElement>(null);
  const filtered = useRef(false);

  // After a filter is picked, the matching photos rise and fade in one by one.
  useGSAP(
    () => {
      if (!filtered.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("ul > li", { y: 40, scale: 0.95, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.07, clearProps: "transform,opacity" });
    },
    { scope, dependencies: [filter] },
  );

  const pool = galleryItems.filter((g) => !resultsOnly || g.cat !== "events");
  // Only offer filters that have photos.
  const categories = galleryCategories.filter((c) => c.id === "all" || pool.some((g) => g.cat === c.id));
  const items = pool.filter((g) => filter === "all" || g.cat === filter).slice(0, limit);

  const count = items.length;
  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + count) % count)),
    [count],
  );

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

  return (
    <div ref={scope}>
      {/* Phones scroll the filters sideways in one row; larger screens wrap them. */}
      <div className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0" role="group" aria-label="Filter photos">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => { filtered.current = true; setFilter(c.id); }}
            aria-pressed={filter === c.id}
            className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2 text-sm transition ${filter === c.id ? "border-theme bg-theme text-white" : "border-line text-title hover:border-theme hover:text-theme"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="text-center">
          No photos in this category yet.{" "}
          <a href={whatsappLink()} target="_blank" rel="noopener" className="text-theme underline">Ask us on WhatsApp</a> and we will share our latest work.
        </p>
      ) : (
        <ul data-reveal="stagger" className={masonry ? "columns-2 gap-3 sm:gap-5 lg:columns-3" : "flex flex-wrap justify-center gap-5 [&>li]:w-full sm:[&>li]:w-[calc(50%-10px)] lg:[&>li]:w-[calc(33.333%-14px)]"}>
          {items.map((g, i) => (
            <li key={g.src} className={masonry ? "mb-3 break-inside-avoid sm:mb-5" : ""}>
              <button type="button" onClick={() => setOpen(i)} className={`group relative block w-full overflow-hidden rounded-lg bg-smoke ${masonry ? "" : "aspect-[4/5]"}`}>
                {masonry ? (
                  <Image src={g.src} alt={g.alt} width={g.w} height={g.h} sizes="(min-width: 768px) 420px, 50vw" className="h-auto w-full transition duration-500 group-hover:scale-105" />
                ) : (
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 420px, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-title/0 text-3xl text-white opacity-0 transition group-hover:bg-title/40 group-hover:opacity-100">
                  <LuZoomIn aria-hidden="true" />
                </span>
                <span className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap items-center gap-1.5 text-left">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-title backdrop-blur">{galleryCategories.find((c) => c.id === g.cat)?.label}</span>
                  {g.tag && <span className="rounded-full bg-theme/90 px-3 py-1 text-xs font-medium text-white backdrop-blur">{g.tag}</span>}
                </span>
                <span className="sr-only">Enlarge: {g.alt}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {current && (
        <div role="dialog" aria-modal="true" aria-label={current.alt} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setOpen(null)}>
          <div className="relative h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={current.src} alt={current.alt} fill sizes="90vw" className="object-contain" />
          </div>
          <p className="absolute bottom-5 left-1/2 w-[90%] -translate-x-1/2 text-center text-sm text-white/80">{current.alt}</p>
          <button type="button" autoFocus onClick={() => setOpen(null)} aria-label="Close" className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"><LuX /></button>
          {items.length > 1 && (
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
