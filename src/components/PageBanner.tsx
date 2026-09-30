import Link from "next/link";
import { LuChevronsRight } from "react-icons/lu";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "./JsonLd";

type Crumb = { name: string; path: string };

/** Page heading with breadcrumbs (visible, and as structured data for Google). */
export default function PageBanner({
  title,
  highlight,
  crumbs,
  current,
  image = "/assets/img/breadcumb/breadcumb-bg-4.jpg",
}: {
  title: string;
  highlight?: string;
  crumbs: Crumb[];
  /** Visible label for the last breadcrumb, if it should differ from its name. */
  current?: React.ReactNode;
  image?: string;
}) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <div data-parallax-bg className="bg-peach bg-cover bg-center py-16 sm:py-24 lg:py-32" style={{ backgroundImage: `url(${image})` }}>
      <JsonLd data={breadcrumbSchema(trail)} />
      <div data-reveal="left" className="container-site">
        <h1 className="text-4xl uppercase sm:text-5xl lg:text-[56px]">
          {title} {highlight && <span className="text-theme">{highlight}</span>}
        </h1>
        <nav aria-label="Breadcrumb" className="mt-4">
          <ol className="text-sm leading-7 font-semibold tracking-wide uppercase">
            {trail.map((c, i) => (
              <li key={c.path} className="inline">
                {i > 0 && <LuChevronsRight className="mx-2.5 inline align-[-2px] text-body" aria-hidden="true" />}
                {i < trail.length - 1 ? (
                  <Link href={c.path} className="inline-block py-2 text-body hover:text-theme">{c.name}</Link>
                ) : (
                  <span className="text-title" aria-current="page">{current ?? c.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
