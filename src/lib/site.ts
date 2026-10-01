// Business details used across the site, in metadata and in structured data.
// Change a value here and every page picks it up.

export const site = {
  name: "Rebornurself",
  url: "https://www.rebornurself.com",
  // When the page content was last reviewed. Shown on pages and given to search engines.
  updated: "2026-10-01",
  tagline: "Permanent Makeup & Microblading in Chennai",
  description:
    "Permanent makeup studio in New Perungalathur, Chennai. Microblading, ombre powder brows, combination brows, lip blushing and beauty spot for women and men.",
  phone: "+918090111911",
  phoneDisplay: "+91 80901 11911",
  email: "hello@rebornurself.com",
  whatsappNumber: "918090111911",
  hours: { opens: "10:00", closes: "19:00", display: "10:00 AM – 07:00 PM" },
  address: {
    street: "A 5, NGO Nagar Main Rd, Alapakkam",
    locality: "New Perungalathur",
    city: "Chennai",
    region: "Tamil Nadu",
    postalCode: "600063",
    country: "IN",
  },
  geo: { latitude: 12.8899944, longitude: 80.1156151 },
  // Where clients come from. Kept general: Chennai as a whole.
  areasServed: ["Chennai"],
  founder: {
    name: "Sandhiya Srinivasan",
    role: "Founder & Lead Artist",
    email: "sandhiyasrinivasan@rebornurself.com",
    image: "/assets/img/sandhiya-srinivasan.png",
    social: {
      facebook: "https://www.facebook.com/people/Sandhiya-Srinivasan/61573776896636/",
      instagram: "https://www.instagram.com/sandhiyasrinivasan_pmu/",
      linkedin: "https://www.linkedin.com/in/sandhiya-srinivasan-036739353/",
    },
  },
  social: {
    facebook: "https://www.facebook.com/people/Reborn-UR-Self/61573241531067/",
    instagram: "https://www.instagram.com/rebornurselfpmu/",
    linkedin: "https://www.linkedin.com/company/reborn-ur-self/about/",
    youtube: "https://www.youtube.com/@RebornURself",
  },
  ogImage: "/assets/img/og-home.jpg",
} as const;

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&z=16&output=embed`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

/** A wa.me link, optionally with a message already typed in. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const enquiryMessage = (topic: string) =>
  `Hi Rebornurself, I would like to enquire about ${topic}.`;

/** "October 2026" */
export const formatUpdated = () =>
  new Date(site.updated).toLocaleDateString("en-IN", { month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
