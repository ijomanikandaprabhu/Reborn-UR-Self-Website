import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import PageBanner from "@/components/PageBanner";
import { emailLink, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy | Rebornurself",
  description: "How Rebornurself uses the details you share when you enquire or book a permanent makeup appointment.",
  path: "/privacy",
});

const updated = "October 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageBanner title="Privacy" highlight="Policy" crumbs={[{ name: "Privacy Policy", path: "/privacy" }]} />
      <section className="section">
        <div className="container-site max-w-3xl space-y-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1">
          <p className="text-sm">Last updated: {updated}</p>

          <div>
            <h2>What we collect</h2>
            <p>
              When you enquire through our contact form, WhatsApp, phone or email, we receive only what you choose to share:
              usually your name, phone number, email, the treatment you are interested in, your message, and any photos you
              send of your brows or lips.
            </p>
          </div>

          <div>
            <h2>How we use it</h2>
            <ul>
              <li>To reply to your enquiry and recommend a suitable treatment.</li>
              <li>To book, confirm or change your appointment.</li>
              <li>To give you aftercare guidance and arrange your touch-up session.</li>
            </ul>
            <p className="mt-3">We do not sell or share your details with anyone for marketing.</p>
          </div>

          <div>
            <h2>Our contact form</h2>
            <p>
              The form on our Contact page does not store your details on this website. It opens WhatsApp with your message
              ready, and nothing is sent until you press send in WhatsApp. WhatsApp’s own privacy policy then applies to that
              conversation.
            </p>
          </div>

          <div>
            <h2>Photos</h2>
            <p>
              Photos you send are used only to advise you. We never publish photos of you, including before and after
              results, without your permission.
            </p>
          </div>

          <div>
            <h2>Your choices</h2>
            <p>
              You can ask us at any time to see, correct or delete the details and photos you have shared with us. Just
              message us on{" "}
              <a href={whatsappLink("Hi Rebornurself, I have a question about my personal details.")} target="_blank" rel="noopener" className="text-theme underline">WhatsApp</a>,
              call <a href={`tel:${site.phone}`} className="text-theme underline">{site.phoneDisplay}</a> or email{" "}
              <a href={emailLink()} className="text-theme underline">{site.email}</a>.
            </p>
          </div>

          <div>
            <h2>This website</h2>
            <p>
              This website does not use advertising or tracking cookies. Your browser may remember small preferences, such as
              whether you have already seen the opening animation during a visit.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
