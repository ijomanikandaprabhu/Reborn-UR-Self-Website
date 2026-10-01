import { site, fullAddress } from "./site";
import { services, serviceFullName, servicePath, type Service } from "@/data/services";

const abs = (path: string) => `${site.url}${path === "/" ? "/" : path}`;
export const studioId = `${site.url}/#studio`;
export const founderId = `${site.url}/#founder`;
export const websiteId = `${site.url}/#website`;

/** The studio as a local business. Rendered on every page. */
export function studioSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": studioId,
    name: site.name,
    description:
      "Permanent makeup studio in New Perungalathur, Chennai specialising in microblading, ombre powder brows, combination brows, lip blushing, lip neutralization and beauty spot.",
    url: abs("/"),
    telephone: site.phone,
    email: site.email,
    image: abs("/assets/img/about/about-9-1.jpg"),
    logo: abs("/assets/img/logos.svg"),
    priceRange: "$$",
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", ...site.geo },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    areaServed: site.areasServed.map((name) => ({ "@type": "Place", name })),
    sameAs: Object.values(site.social),
    founder: { "@id": founderId },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Permanent makeup treatments",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: serviceFullName(s), url: abs(servicePath(s)) },
      })),
    },
  };
}

export function founderSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": founderId,
    name: site.founder.name,
    jobTitle: site.founder.role,
    image: abs(site.founder.image),
    email: site.founder.email,
    worksFor: { "@id": studioId },
    hasCredential: "Master’s Advanced Level in Permanent Makeup",
    knowsAbout: ["Microblading", "Ombre powder brows", "Combination brows", "Lip blushing", "Lip neutralization", "Beauty spot"],
    sameAs: Object.values(site.founder.social),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceFullName(s),
    description: s.description,
    serviceType: "Permanent makeup",
    url: abs(servicePath(s)),
    image: abs(s.heroImage),
    provider: { "@id": studioId },
    areaServed: site.areasServed.map((name) => ({ "@type": "Place", name })),
    audience: { "@type": "PeopleAudience", suggestedGender: s.gender === "women" ? "female" : "male" },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** The website itself, so search engines show the right site name. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    alternateName: ["Reborn Ur Self", "Rebornurself Permanent Makeup"],
    url: abs("/"),
    inLanguage: "en-IN",
    publisher: { "@id": studioId },
  };
}

/** A page with the date its content was last reviewed. */
export function webPageSchema({ name, path, description }: { name: string; path: string; description?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url: abs(path),
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": websiteId },
    about: { "@id": studioId },
    dateModified: site.updated,
  };
}
