import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import CtaBand from "@/components/CtaBand";
import Gallery from "@/components/Gallery";
import PageBanner from "@/components/PageBanner";
import SectionTitle from "@/components/SectionTitle";

const description = "Photos of permanent makeup work and training events at Rebornurself, the PMU studio in New Perungalathur, Chennai.";

export const metadata: Metadata = pageMeta({
  title: "Gallery | Rebornurself PMU Studio, Chennai",
  description,
  path: "/gallery",
  image: "/assets/img/gallery/combination-1.jpg",
  imageAlt: "Combination brows before and after at Rebornurself",
});

export default function GalleryPage() {
  return (
    <>
      <PageBanner title="Gallery" crumbs={[{ name: "Gallery", path: "/gallery" }]} />
      <section className="section">
        <div className="container-site">
          <SectionTitle eyebrow="From the studio" title="Our Work">
            Before and after results from our Chennai studio, plus moments from training and industry events.
          </SectionTitle>
          <Gallery />
        </div>
      </section>
      <CtaBand title="Like What You See?" text="Send us a photo of your brows or lips on WhatsApp and we will tell you which treatment will suit you." />
    </>
  );
}
