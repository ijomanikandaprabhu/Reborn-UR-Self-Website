"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";

/**
 * The winking-eyes intro, every time the home page opens: on a fresh load (handled by
 * the inline script) and when the visitor comes back to Home from another page.
 */
export default function HomeIntro() {
  const pathname = usePathname();
  const [run, setRun] = useState(0);
  const first = useRef(true);
  const wrap = useRef<HTMLDivElement>(null);

  // On each move between pages: Home shows the intro again, other pages keep it hidden.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (pathname === "/") setRun((r) => r + 1);
  }

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const html = document.documentElement;
    if (pathname === "/") {
      html.removeAttribute("data-seen");
      // Start the blink from the beginning on the freshly drawn eyes.
      wrap.current?.querySelector("svg")?.setCurrentTime(0);
    } else {
      html.setAttribute("data-seen", "");
    }
  }, [pathname, run]);

  return (
    <div ref={wrap}>
      <Loader key={run} />
    </div>
  );
}
