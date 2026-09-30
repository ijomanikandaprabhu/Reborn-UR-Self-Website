import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa6";
import { testimonials } from "@/data/content";

export default function Testimonials() {
  return (
    <section className="section bg-cream">
      <div className="container-site">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-4xl lg:text-5xl">What Our Clients Say</h2>
          <p className="mt-4">
            Hear from clients who have experienced the transformation of their brows and lips with our treatments. Our goal is
            to enhance your natural beauty and boost your confidence, one service at a time.
          </p>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <li key={t.name} className="card relative flex flex-col p-7">
              <FaQuoteLeft className="absolute top-6 right-6 text-3xl text-theme/15" aria-hidden="true" />
              <div className="flex gap-1 text-sm text-[#fec624]" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }, (_, i) => <FaStar key={i} aria-hidden="true" />)}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px]">“{t.text}”</blockquote>
              <div className="mt-6 flex items-center gap-3">
                <Image src={t.image} alt="" width={50} height={50} className="rounded-full" />
                <div>
                  <p className="font-title text-lg leading-tight text-title">{t.name}</p>
                  <p className="text-sm">{t.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
