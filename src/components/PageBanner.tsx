import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "./JsonLd";

type Crumb = { name: string; path: string };

/** Page heading with breadcrumbs (visible, and as structured data for Google). */
export default function PageBanner({
  title,
  highlight,
  crumbs,
  image = "/assets/img/breadcumb/breadcumb-bg-4.jpg",
}: {
  title: string;
  highlight?: string;
  crumbs: Crumb[];
  image?: string;
}) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <div className="relative bg-peach bg-cover bg-center py-20 text-center lg:py-28" style={{ backgroundImage: `url(${image})` }}>
      <JsonLd data={breadcrumbSchema(trail)} />
      <div className="container-site">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl">
          {title} {highlight && <span className="text-theme">{highlight}</span>}
        </h1>
        <nav aria-label="Breadcrumb" className="mt-5">
          <ol className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-white/80 px-6 py-2 text-sm">
            {trail.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2">
                {i > 0 && <LuChevronRight className="text-theme" aria-hidden="true" />}
                {i < trail.length - 1 ? (
                  <Link href={c.path} className="text-title hover:text-theme">{c.name}</Link>
                ) : (
                  <span className="text-theme" aria-current="page">{c.name}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
