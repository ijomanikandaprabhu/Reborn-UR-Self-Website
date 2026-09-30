import { FaWhatsapp } from "react-icons/fa6";
import {
  LuCalendarCheck, LuCircleCheck, LuClipboardList, LuFlower2, LuMessagesSquare,
  LuPencilRuler, LuRotateCw, LuStar, LuUsers,
} from "react-icons/lu";
import type { JourneyStep } from "@/data/services";
import SectionTitle from "./SectionTitle";

const icons: Record<string, typeof LuStar> = {
  comments: LuMessagesSquare,
  "calendar-check": LuCalendarCheck,
  "user-friends": LuUsers,
  spa: LuFlower2,
  "pencil-ruler": LuPencilRuler,
  "check-circle": LuCircleCheck,
  star: LuStar,
  "clipboard-list": LuClipboardList,
  redo: LuRotateCw,
};

export default function Journey({ steps, whatsappHref }: { steps: JourneyStep[]; whatsappHref: string }) {
  return (
    <section className="section">
      <div className="container-site">
        <SectionTitle eyebrow="What to expect" title="Your Journey With Us" />
        <ol className="relative mx-auto max-w-[1080px] before:absolute before:inset-y-0 before:left-[19px] before:w-0.5 before:bg-theme/20 lg:before:left-1/2 lg:before:-ml-px">
          {steps.map((step, i) => {
            const Icon = icons[step.icon] ?? LuStar;
            const right = i % 2 === 1;
            return (
              <li key={step.title} className={`relative mb-7 pl-14 last:mb-0 lg:w-1/2 ${right ? "lg:ml-[50%] lg:pl-14" : "lg:pr-14 lg:pl-0"}`}>
                <span className={`absolute top-8 left-0 flex size-10 items-center justify-center rounded-full bg-theme font-bold text-white ring-5 ring-white ${right ? "lg:-left-5" : "lg:right-[-20px] lg:left-auto"}`}>
                  {i + 1}
                </span>
                <div className="card p-6 sm:p-7">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-theme/10 text-xl text-theme">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3 className="mb-3 text-xl">{step.title}</h3>
                  <p className="text-[15px]">{step.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-12 text-center">
          <a href={whatsappHref} target="_blank" rel="noopener" className="btn-wa px-9 py-4 text-base">
            <FaWhatsapp className="text-xl" /> Start Your Journey on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
