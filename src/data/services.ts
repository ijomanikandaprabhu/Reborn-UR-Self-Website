import data from "./services.generated.json";
import { site } from "@/lib/site";

// Each service page's words live in services.generated.json.
// To add a service, add an entry there with the same shape.

export type Gender = "women" | "men";

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: { label: string; text: string }[] };

export type JourneyStep = { icon: string; title: string; text: string };

export type Service = {
  slug: string;
  gender: Gender;
  name: string;
  group: "brows" | "lips" | "spot";
  icon: string;
  lasts: string | null;
  card: string;
  title: string;
  description: string;
  heroImage: string;
  pairImages: string[];
  intro: ContentBlock[];
  body: ContentBlock[];
  journey: JourneyStep[];
  cta: { title: string; text: string };
};

export const services = data as Service[];

export const genderLabel = (g: Gender) => (g === "women" ? "Women" : "Men");

export const servicePath = (s: Pick<Service, "slug">) => `/${s.slug}`;

/** "Microblading for Women" */
export const serviceFullName = (s: Service) => `${s.name} for ${genderLabel(s.gender)}`;

export const iconPath = (s: Pick<Service, "icon">) => `/assets/img/icon/${s.icon}.png`;

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const servicesFor = (g: Gender) => services.filter((s) => s.gender === g);

/** The same treatment for the other gender, if we offer it. */
export function counterpart(s: Service) {
  return services.find((o) => o.name === s.name && o.gender !== s.gender);
}

const areaText = "New Perungalathur, Chennai";

/**
 * Questions answered on every service page. The answers only use facts
 * the studio already publishes (timings, touch-up window, deposit).
 */
export function faqsFor(s: Service): { q: string; a: string }[] {
  const part = s.group === "lips" ? "lips" : s.group === "brows" ? "brows" : "skin";
  const faqs = [
    {
      q: `Does ${s.name.toLowerCase()} hurt?`,
      a: `Most clients feel very little. We apply a topical numbing cream and leave it on for about 20 minutes before any work begins, so the procedure stays comfortable throughout.`,
    },
  ];
  if (s.lasts) {
    faqs.push({
      q: `How long does ${s.name.toLowerCase()} last?`,
      a: `With proper aftercare, ${s.name.toLowerCase()} typically lasts ${s.lasts}. How long it lasts depends on your skin type, lifestyle and sun exposure.`,
    });
  }
  faqs.push(
    {
      q: "How long does healing take, and is a touch-up needed?",
      a: `Skin needs about a month to heal fully. A follow-up touch-up can be taken any time between 30 and 90 days, where definition and depth can be adjusted to suit how your ${part} healed.`,
    },
    {
      q: `How do I know if ${s.name.toLowerCase()} is right for me?`,
      a: `Send us a photo of your bare ${part} in natural light on WhatsApp. We will tell you honestly which procedure suits your features before you book anything.`,
    },
    {
      q: "How do I book an appointment?",
      a: `Message us on WhatsApp or call ${site.phoneDisplay}. Once we agree on the right procedure, a booking deposit holds your slot and is deducted from the total cost on the day of your visit.`,
    },
    {
      q: `Where is the studio?`,
      a: `Our studio is in ${areaText}. We are open ${site.hours.display}, by appointment. You will find the address, a map and directions on our Contact page.`,
    },
  );
  return faqs;
}
