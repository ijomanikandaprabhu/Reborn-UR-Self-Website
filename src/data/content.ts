export const testimonials = [
  {
    name: "Priya S",
    role: "Business Woman",
    image: "/assets/img/testi/testi-auth-3-1.png",
    text: "Amazing experience! My brows have never looked so flawless. The attention to detail is amazing. I really suggest this.",
  },
  {
    name: "Riya K",
    role: "Customer",
    image: "/assets/img/testi/testi-auth-3-2.png",
    text: "I love my new lip colour! The lip blushing procedure was really professional and produced wonderful results. Thank you.",
  },
  {
    name: "Rahul M",
    role: "Manager",
    image: "/assets/img/testi/testi-auth-3-4.png",
    text: "As a guy, I was worried about trying microblading, but the results are very natural. My brows appear bigger and better-shaped.",
  },
  {
    name: "Arjun R",
    role: "Film Actor",
    image: "/assets/img/testi/testi-auth-3-3.png",
    text: "I desired a modest lip augmentation, and the results exceeded my expectations. The team was extremely professional.",
  },
];

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "microblading", label: "Microblading" },
  { id: "ombre", label: "Ombre Powder Brows" },
  { id: "combination", label: "Combination Brows" },
  { id: "neutralization", label: "Lip Neutralization" },
  { id: "blushing", label: "Lip Blushing" },
  { id: "beauty-spot", label: "Beauty Spot" },
  { id: "events", label: "Events" },
] as const;

export type GalleryCategory = (typeof galleryCategories)[number]["id"];

const g = (file: string) => `/assets/img/gallery/${file}`;

export const galleryItems: { src: string; w: number; h: number; tag: string; alt: string; cat: GalleryCategory }[] = [
  { src: g("combination-1.jpg"), w: 720, h: 1280, tag: "Before / After", alt: "Combination brows before, during and healed result", cat: "combination" },
  { src: g("combination-2.jpg"), w: 760, h: 1351, tag: "Before / After", alt: "Combination brows before and after", cat: "combination" },
  { src: g("ombre-1.jpg"), w: 720, h: 1280, tag: "Before / After", alt: "Ombre powder brows result with before inset", cat: "ombre" },
  { src: g("ombre-2.jpg"), w: 760, h: 760, tag: "Before / After", alt: "Soft ombre powder brows before and after", cat: "ombre" },
  { src: g("neutralization-1.jpg"), w: 720, h: 1280, tag: "Before / After", alt: "Lip neutralization for men, before and after", cat: "neutralization" },
  { src: g("beauty-spot-1.jpg"), w: 760, h: 760, tag: "Before / After", alt: "Beauty spot placed beside the lips, before and after", cat: "beauty-spot" },
  { src: g("event-1.jpg"), w: 719, h: 1280, tag: "", alt: "Sandhiya Srinivasan at a beauty industry event", cat: "events" },
  { src: g("event-2.jpg"), w: 760, h: 1013, tag: "", alt: "Sandhiya Srinivasan at a beauty industry event", cat: "events" },
  { src: g("event-3.jpg"), w: 760, h: 1013, tag: "", alt: "Sandhiya Srinivasan at a beauty industry event", cat: "events" },
  { src: g("client-at-studio.jpg"), w: 1600, h: 1280, tag: "", alt: "Client at the Rebornurself studio", cat: "events" },
  { src: g("certificate-presentation-1.jpg"), w: 1600, h: 1280, tag: "", alt: "Certificate presentation at Rebornurself", cat: "events" },
  { src: g("microblading-training-group.jpg"), w: 1600, h: 1280, tag: "", alt: "Microblading training session group photo", cat: "events" },
  { src: g("certificate-presentation-2.jpg"), w: 1600, h: 1280, tag: "", alt: "Certificate presentation at Rebornurself", cat: "events" },
  { src: g("rebornurself-training-group.jpg"), w: 1600, h: 900, tag: "", alt: "Rebornurself training group", cat: "events" },
];

export const heroSlides = [
  { image: "/assets/img/hero/spa-girl-1.png", line1: "Beauty,", line2: "Redefined." },
  { image: "/assets/img/hero/handsome-man.png", line1: "Brows & Lips,", line2: "Perfected." },
  { image: "/assets/img/hero/spa-girl-4.png", line1: "Flawless,", line2: "Every Day." },
];
