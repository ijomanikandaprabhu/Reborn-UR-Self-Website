"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LuCheck, LuChevronDown } from "react-icons/lu";

/**
 * A brand-styled dropdown for the contact form, in place of the browser's plain list.
 * The chosen value is sent with the form through a hidden input of the same name.
 */
export default function FormSelect({
  name,
  label,
  options,
  placeholder,
  required = false,
  hint,
}: {
  name: string;
  label: React.ReactNode;
  options: string[];
  placeholder: string;
  required?: boolean;
  hint?: React.ReactNode;
}) {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", key);
    };
  }, [open]);

  const pick = (v: string) => {
    setValue(v);
    setOpen(false);
    button.current?.focus();
  };

  return (
    <div ref={wrap} className="relative">
      <span id={`${id}-label`} className="mb-1.5 block text-sm font-medium text-title">
        {label} {hint}
      </span>
      <button
        ref={button}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-[55px] w-full items-center justify-between border bg-white px-7 text-left transition hover:border-theme/40 focus:border-theme focus:shadow-[0_0_0_4px_rgb(154_86_58/0.12)] focus:outline-none ${open ? "border-theme" : "border-line"}`}
      >
        <span id={`${id}-value`} className={value ? "text-title" : "text-body"}>{value || placeholder}</span>
        <LuChevronDown className={`text-theme transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      {/* Carries the value with the form; also lets the browser say "please choose" when it is required. */}
      <input
        name={name}
        value={value}
        required={required}
        onChange={() => {}}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-px opacity-0"
        onInvalid={(e) => e.currentTarget.setCustomValidity(value ? "" : "Please choose an option")}
      />

      <ul
        role="listbox"
        aria-labelledby={`${id}-label`}
        className={`absolute inset-x-0 top-[calc(100%+6px)] z-20 border border-line bg-white py-2 shadow-card-hover transition duration-200 ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
      >
        {options.map((o) => {
          const selected = o === value;
          return (
            <li key={o} role="option" aria-selected={selected}>
              <button
                type="button"
                tabIndex={open ? 0 : -1}
                onClick={() => pick(o)}
                className={`flex w-full items-center justify-between px-7 py-3 text-left transition-colors ${selected ? "bg-peach/60 font-semibold text-theme" : "text-title hover:bg-cream"}`}
              >
                {o}
                <LuCheck className={`text-theme ${selected ? "" : "invisible"}`} aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
