import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import PageBanner from "@/components/PageBanner";
import { getService, servicePath } from "@/data/services";
import { pageMeta } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

const description = "Photos of permanent makeup work and training events at Rebornurself, the PMU studio in New Perungalathur, Chennai.";

export const metadata: Metadata = pageMeta({
  title: "Gallery | Rebornurself PMU Studio, Chennai",
  description,
  path: "/gallery",
  image: "/assets/img/gallery/combination-1.jpg",
  imageAlt: "Combination brows before and after at Rebornurself",
});

const treatments = [
  { slug: "microblading", text: "Fine hair-like strokes drawn into sparse or uneven brows, following the direction your own hair already grows." },
  { slug: "ombre-powder-brows", text: "A soft shaded finish, lighter at the front and deeper towards the tail, like a lightly pencilled brow." },
  { slug: "combination-brows", text: "Strokes through the front with shading behind them, for definition and density in one set." },
  { slug: "lip-neutralization", text: "Evens out darker or uneven lip tone, creating a balanced base before any colour is added." },
  { slug: "lip-blushing", text: "A wash of soft colour that defines the lip line and gives lips a fuller, more even look." },
  { slug: "beauty-spot", text: "A single placed mark, sized and positioned with you before any pigment goes in." },
];

export default function GalleryPage() {
  return (
    <>
      <PageBanner title="Our" highlight="Work" crumbs={[{ name: "Gallery", path: "/gallery" }]} />
      <section className="section">
        <div className="container-site">
          <div className="mx-auto mb-10 max-w-[780px] space-y-4 text-center">
            <p>
              Every set of brows and lips here was mapped, pigmented and finished by{" "}
              <Link href="/about" className="text-theme underline underline-offset-2 hover:text-title">Sandhiya Srinivasan</Link> at our studio in New
              Perungalathur, Chennai. Use the filters to see a single treatment on its own, or browse everything together.
            </p>
            <p>
              Shape is drawn to suit your face rather than a template, and pigment is mixed to sit naturally against your own
              skin and hair tone, which is why no two results in this gallery look quite the same. Colour also softens as it
              heals, so freshly finished work photographs bolder than the settled result you live with.
            </p>
          </div>
          <Gallery masonry syncUrl />

          <div className="mt-16 border-t border-line pt-14">
            <h2 className="mb-8 text-center text-3xl">About the treatments in this gallery</h2>
            <dl data-reveal="stagger" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {treatments.map((t) => {
                const s = getService(t.slug)!;
                return (
                  <div key={t.slug}>
                    <dt className="text-lg font-medium"><Link href={servicePath(s)} className="text-title hover:text-theme">{s.name}</Link></dt>
                    <dd className="mt-1 text-[15px]">{t.text}</dd>
                  </div>
                );
              })}
            </dl>
            <p className="mx-auto mt-12 max-w-[560px] rounded-lg border border-theme/20 bg-cream px-6 py-5 text-center text-[15px]">
              Every treatment here is offered for <Link href="/" className="text-theme underline">women and men</Link>. Not
              sure which one suits you? Send us a photo of your brows or lips on{" "}
              <a href={whatsappLink("Hi Rebornurself, which treatment would suit me?")} target="_blank" rel="noopener" className="text-theme underline">WhatsApp</a>{" "}
              and we will tell you honestly what we would recommend, or{" "}
              <Link href="/contact" className="text-theme underline">book a consultation</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
