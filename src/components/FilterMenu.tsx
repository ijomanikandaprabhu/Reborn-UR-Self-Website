"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LuCheck, LuChevronDown } from "react-icons/lu";

type Option = { id: string; label: string; count: number };

/** Phones: a brand-styled dropdown for the gallery filter, in place of the browser's plain list. */
export default function FilterMenu({ options, value, onChange }: { options: Option[]; value: string; onChange: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const listId = useId();
  const current = options.find((o) => o.id === value) ?? options[0];

  // Close on a tap outside or Escape.
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", key);
    };
  }, [open]);

  return (
    <div ref={wrap} className="relative mx-auto w-full max-w-[300px]">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-full items-center justify-between gap-3 rounded-full border border-theme bg-white pr-4 pl-5 text-[15px] text-title shadow-sm"
      >
        <span>
          <span className="text-body">Show: </span>
          <span className="font-semibold text-theme">{current.label}</span>
          <span className="text-body"> ({current.count})</span>
        </span>
        <LuChevronDown className={`shrink-0 text-lg text-theme transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      <ul
        id={listId}
        role="listbox"
        aria-label="Filter photos"
        className={`absolute inset-x-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-line bg-white py-2 shadow-card-hover transition duration-200 ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
      >
        {options.map((o) => {
          const selected = o.id === value;
          return (
            <li key={o.id} role="option" aria-selected={selected}>
              <button
                type="button"
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  onChange(o.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 px-5 py-3 text-left text-[15px] transition-colors ${selected ? "bg-peach/60 font-semibold text-theme" : "text-title hover:bg-cream"}`}
              >
                <span>{o.label}</span>
                <span className="flex items-center gap-2">
                  <span className={`min-w-7 rounded-full px-2 py-0.5 text-center text-xs ${selected ? "bg-theme text-white" : "bg-smoke text-body"}`}>{o.count}</span>
                  <LuCheck className={`text-theme ${selected ? "" : "invisible"}`} aria-hidden="true" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
