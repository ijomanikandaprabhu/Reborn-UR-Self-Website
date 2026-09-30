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
    <div className="bg-peach bg-cover bg-center py-24 lg:py-32" style={{ backgroundImage: `url(${image})` }}>
      <JsonLd data={breadcrumbSchema(trail)} />
      <div className="container-site">
        <h1 className="text-4xl uppercase sm:text-5xl lg:text-[56px]">
          {title} {highlight && <span className="text-theme">{highlight}</span>}
        </h1>
        <nav aria-label="Breadcrumb" className="mt-4">
          <ol className="flex flex-wrap items-center gap-2.5 text-sm font-semibold tracking-wide uppercase">
            {trail.map((c, i) => (
              <li key={c.path} className="flex items-center gap-2.5">
                {i > 0 && <LuChevronsRight className="text-body" aria-hidden="true" />}
                {i < trail.length - 1 ? (
                  <Link href={c.path} className="text-body hover:text-theme">{c.name}</Link>
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
