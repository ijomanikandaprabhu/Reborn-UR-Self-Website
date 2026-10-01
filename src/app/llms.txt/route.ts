import { faqsFor, serviceFullName, servicePath, services } from "@/data/services";
import { fullAddress, site } from "@/lib/site";

export const dynamic = "force-static";

/** A plain summary of the studio for AI assistants and answer engines (llmstxt.org). */
export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `- Address: ${fullAddress}`,
    `- Phone and WhatsApp: ${site.phoneDisplay}`,
    `- Email: ${site.email}`,
    `- Hours: open daily, ${site.hours.display}, by appointment`,
    `- Founder and lead artist: ${site.founder.name}, Master's Advanced Level in Permanent Makeup`,
    "- Clients from: all over Chennai",
    `- Last updated: ${site.updated}`,
    "",
    "## Treatments",
    "",
    ...services.map((s) => `- [${serviceFullName(s)}](${site.url}${servicePath(s)}): ${s.description}${s.lasts ? ` Lasts ${s.lasts}.` : ""}`),
    "",
    "## Pages",
    "",
    `- [Home](${site.url}/): overview, results and frequently asked questions`,
    `- [About](${site.url}/about): the artist, training and certifications`,
    `- [Gallery](${site.url}/gallery): before and after photos`,
    `- [Contact](${site.url}/contact): address, map, directions and booking`,
    "",
    "## Common questions",
    "",
    ...faqsFor(services[0]).map((f) => `- **${f.q}** ${f.a}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
