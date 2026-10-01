"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuArrowUp } from "react-icons/lu";
import { getService } from "@/data/services";
import { scrollToTop } from "./SmoothScroll";

/** Round "back to top" button, bottom right, once the visitor has scrolled a way down. */
export default function BackToTop() {
  const pathname = usePathname();
  // Service pages have a booking bar along the bottom on phones; sit above it.
  const raised = Boolean(getService(pathname.slice(1)));
  const [shown, setShown] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShown(window.scrollY > 700);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  // A ring around the arrow shows how far down the page you are.
  const r = 21;
  const c = 2 * Math.PI * r;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      className={`fixed right-4 z-30 flex size-12 items-center justify-center rounded-full bg-white text-lg text-theme shadow-card-hover transition duration-300 hover:-translate-y-1 hover:bg-theme hover:text-white md:right-6 md:bottom-8 ${raised ? "bottom-[84px]" : "bottom-5"} ${shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r={r} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2.5" />
        <circle cx="24" cy="24" r={r} fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray={c} strokeDashoffset={c * (1 - progress)} strokeLinecap="round" />
      </svg>
      <LuArrowUp aria-hidden="true" />
    </button>
  );
}
