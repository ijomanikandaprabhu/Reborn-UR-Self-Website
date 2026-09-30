import Image from "next/image";

export default function SectionTitle({
  eyebrow,
  title,
  as: Tag = "h2",
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  as?: "h1" | "h2";
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-reveal className={`mx-auto mb-12 max-w-2xl text-center lg:mb-14 ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag className="text-4xl lg:text-5xl">{title}</Tag>
      <Image src="/assets/img/shape/sec-shape-1.png" alt="" width={320} height={24} className="mx-auto mt-4 h-auto w-40" />
      {children && <p className="mt-5">{children}</p>}
    </div>
  );
}
