import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import { site, whatsappLink } from "@/lib/site";

type Links = { facebook?: string; instagram?: string; linkedin?: string; youtube?: string };

export default function SocialLinks({
  links = site.social,
  whatsapp = true,
  className = "",
  itemClassName = "",
}: {
  links?: Links;
  whatsapp?: boolean;
  className?: string;
  itemClassName?: string;
}) {
  const items = [
    links.facebook && { href: links.facebook, label: "Facebook", Icon: FaFacebookF },
    links.instagram && { href: links.instagram, label: "Instagram", Icon: FaInstagram },
    links.linkedin && { href: links.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
    links.youtube && { href: links.youtube, label: "YouTube", Icon: FaYoutube },
    whatsapp && { href: whatsappLink(), label: "WhatsApp", Icon: FaWhatsapp },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof FaWhatsapp }[];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener"
          aria-label={`Rebornurself on ${label}`}
          className={`flex size-11 items-center sm:size-9 justify-center rounded-full border text-[13px] ${itemClassName}`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
