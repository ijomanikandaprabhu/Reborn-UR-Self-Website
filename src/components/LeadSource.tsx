"use client";

import { useEffect } from "react";

/**
 * Remembers where a visitor came from (an ad, Instagram, Google…) and adds it to the
 * "(Sent from rebornurself.com)" note on their WhatsApp message or email, so the studio
 * can tell which platform brought each lead.
 *
 * Ad links should carry utm tags, e.g.
 *   https://www.rebornurself.com/?utm_source=instagram&utm_medium=ad&utm_campaign=brows-oct
 * Without tags, Google and Meta ad clicks (gclid / fbclid) and the referring site are used.
 */

const KEY = "lead-source";
const NOTE = "(Sent from rebornurself.com)";

const names: Record<string, string> = {
  facebook: "Facebook",
  fb: "Facebook",
  instagram: "Instagram",
  ig: "Instagram",
  meta: "Facebook/Instagram",
  google: "Google",
  youtube: "YouTube",
  whatsapp: "WhatsApp",
  justdial: "Justdial",
  linkedin: "LinkedIn",
};

const nice = (s: string) => names[s.toLowerCase()] ?? s.charAt(0).toUpperCase() + s.slice(1);

/** Works out the source from the address and referrer of the first page visited. */
function detect(): string | null {
  const q = new URLSearchParams(window.location.search);
  const source = q.get("utm_source");
  if (source) {
    const medium = (q.get("utm_medium") ?? "").toLowerCase();
    const paid = /cpc|ppc|paid|ad/.test(medium);
    const campaign = q.get("utm_campaign");
    return `${nice(source)}${paid ? " ad" : ""}${campaign ? `: ${campaign}` : ""}`;
  }
  if (q.has("gclid") || q.has("gbraid") || q.has("wbraid")) return "Google ad";
  if (q.has("fbclid")) return "Facebook/Instagram";

  const ref = document.referrer;
  if (!ref) return null;
  const host = new URL(ref).hostname.replace(/^www\./, "");
  if (host.endsWith("rebornurself.com")) return null; // moving around the site itself
  if (/google\./.test(host)) return "Google search";
  if (/bing\.com|duckduckgo\.com|yahoo\./.test(host)) return "Search engine";
  if (/instagram\.com/.test(host)) return "Instagram";
  if (/facebook\.com|fb\.com|fb\.me/.test(host)) return "Facebook";
  if (/youtube\.com|youtu\.be/.test(host)) return "YouTube";
  if (/linkedin\.com|lnkd\.in/.test(host)) return "LinkedIn";
  return host;
}

/** The note to put at the end of a message: with the source when we know it. */
export function sourceNote() {
  let from: string | null = null;
  try {
    from = sessionStorage.getItem(KEY);
  } catch {}
  return from ? `(Sent from rebornurself.com, via ${from})` : NOTE;
}

export default function LeadSource() {
  useEffect(() => {
    try {
      // Keep the first source of the visit; later pages inside the site do not replace it.
      if (!sessionStorage.getItem(KEY)) {
        const from = detect();
        if (from) sessionStorage.setItem(KEY, from);
      }
    } catch {}

    // Just before a WhatsApp or email link opens, swap in the note with the source.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (!href.startsWith("https://wa.me/") && !href.startsWith("mailto:")) return;
      const note = sourceNote();
      if (note === NOTE) return;
      a.setAttribute("href", href.replace(encodeURIComponent(NOTE), encodeURIComponent(note)));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
