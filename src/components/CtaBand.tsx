import { FaWhatsapp } from "react-icons/fa6";
import { LuPhone } from "react-icons/lu";
import { site, whatsappLink } from "@/lib/site";

export default function CtaBand({
  title = "Let’s Talk",
  text = "Send us a photo on WhatsApp and we will tell you honestly what will suit you — or call and talk it through first.",
  message = "Hi Rebornurself, I would like to get in touch.",
}: {
  title?: string;
  text?: string;
  message?: string;
}) {
  return (
    <section className="relative bg-theme bg-cover bg-center py-20 text-center lg:py-24" style={{ backgroundImage: "url(/assets/img/bg/cta-bg-1-1.jpg)" }}>
      <div className="container-site max-w-2xl">
        <span className="eyebrow">Ready when you are</span>
        <h2 className="text-4xl lg:text-5xl">{title}</h2>
        <p className="mt-4 text-title/80">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={whatsappLink(message)} target="_blank" rel="noopener" className="btn-theme">
            <FaWhatsapp className="text-lg" /> WhatsApp us
          </a>
          <a href={`tel:${site.phone}`} className="btn border border-theme/40 bg-white/70 text-title hover:bg-white">
            <LuPhone /> {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
