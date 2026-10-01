// Plain-language guides shown on the service pages: a side-by-side comparison
// and aftercare steps. Written so people (and AI answer engines) get a direct answer.

import type { Service } from "./services";

export type CompareRow = { slug: string; name: string; look: string; bestFor: string; lasts: string };

export const browCompare: CompareRow[] = [
  { slug: "microblading", name: "Microblading", look: "Fine hair-like strokes", bestFor: "Normal to dry skin and a very natural look", lasts: "2–3 years" },
  { slug: "ombre-powder-brows", name: "Ombre Powder Brows", look: "Soft, powdered shading", bestFor: "Oily skin and a soft, made-up look", lasts: "1–3 years" },
  { slug: "combination-brows", name: "Combination Brows", look: "Hair strokes in front, shading behind", bestFor: "Sparse brows that need fuller definition", lasts: "12–18 months" },
];

export const lipCompare: CompareRow[] = [
  { slug: "lip-blushing", name: "Lip Blushing", look: "A soft tint of colour and a defined lip line", bestFor: "Pale or uneven lip colour", lasts: "1–3 years" },
  { slug: "lip-neutralization", name: "Lip Neutralization", look: "Evens out dark or patchy lips", bestFor: "Dark or pigmented lips, often from smoking or sun", lasts: "1–3 years" },
];

export function compareFor(s: Service) {
  const rows = s.group === "brows" ? browCompare : s.group === "lips" ? lipCompare : null;
  if (!rows) return null;
  const suffix = s.gender === "men" ? "-for-men" : "";
  return {
    title: s.group === "brows" ? "Microblading vs Ombre vs Combination Brows" : "Lip Blushing vs Lip Neutralization",
    rows: rows.map((r) => ({ ...r, slug: r.slug + suffix })),
  };
}

export type AftercareStep = { title: string; text: string };

const common: AftercareStep[] = [
  { title: "Keep the area clean", text: "Gently wipe away any fluid with clean cotton and water during the first day, as we show you after the procedure." },
  { title: "Apply the aftercare balm", text: "Use a thin layer of the balm we give you, only as often as advised. Too much can blur the result." },
  { title: "Do not pick or scratch", text: "Light flaking is normal for about a week. Let it fall away by itself so the colour heals evenly." },
  { title: "Avoid sweat, water and steam", text: "Skip the gym, swimming, sauna and long hot showers for about 10 days." },
  { title: "Stay out of strong sun", text: "Protect the area from direct sun while it heals, then use sunscreen afterwards to keep the colour fresh." },
];

const forBrows: AftercareStep[] = [
  { title: "No makeup on the brows", text: "Keep makeup, creams and facial treatments away from the brows until they have healed." },
];

const forLips: AftercareStep[] = [
  { title: "Be gentle when eating and drinking", text: "Drink through a straw and avoid very spicy, salty or hot food for the first few days." },
];

const touchUp: AftercareStep = {
  title: "Book your touch-up",
  text: "Skin takes about a month to heal fully. Come back for your touch-up between 30 and 90 days to perfect shape and depth.",
};

export function aftercareFor(s: Service): AftercareStep[] {
  const extra = s.group === "brows" ? forBrows : s.group === "lips" ? forLips : [];
  return [...common, ...extra, touchUp];
}
