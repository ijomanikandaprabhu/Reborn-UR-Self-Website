"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Loader from "./Loader";

/**
 * The winking-eyes intro, every time the home page opens: on a fresh load (handled by
 * the inline script) and when the visitor comes back to Home from another page.
 */
export default function HomeIntro() {
  const pathname = usePathname();
  const [run, setRun] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);

  // On each move between pages: Home shows the intro again, other pages keep it hidden.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (pathname === "/") setRun((r) => r + 1);
  }

  // Before the browser paints, so the page never flashes between the two states.
  useLayoutEffect(() => {
    if (run === 0 && pathname === "/") return; // first load: the inline script already did this
    const html = document.documentElement;
    if (pathname === "/") {
      html.removeAttribute("data-seen");
    } else {
      html.setAttribute("data-seen", "");
    }
  }, [pathname, run]);

  // Coming back to Home: hold the eyes open while they fade in, then wink from the start.
  useEffect(() => {
    if (run === 0) return;
    const svg = wrap.current?.querySelector("svg");
    if (!svg) return;
    svg.pauseAnimations();
    svg.setCurrentTime(0);
    const id = setTimeout(() => svg.unpauseAnimations(), 280);
    return () => clearTimeout(id);
  }, [run]);

  return (
    <div ref={wrap}>
      <Loader key={run} replay={run > 0} />
    </div>
  );
}
