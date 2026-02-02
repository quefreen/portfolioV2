// src/components/material_carousel.tsx
import Image from "next/image";

type CarouselItem = {
  src: string;
  alt: string;
  w: number; // px
  h: number; // px
};

const items: CarouselItem[] = [
  { src: "/prints/p1.png", alt: "Print 1", w: 330, h: 220 },
  { src: "/prints/p2.png", alt: "Print 2", w: 280, h: 240 },
  { src: "/prints/p3.png", alt: "Print 3", w: 210, h: 200 },
  { src: "/prints/p4.png", alt: "Print 4", w: 300, h: 260 },
  { src: "/prints/p5.png", alt: "Print 5", w: 260, h: 210 },
  { src: "/prints/p6.png", alt: "Print 6", w: 240, h: 260 },
  { src: "/prints/p7.png", alt: "Print 7", w: 310, h: 230 },
  { src: "/prints/p8.png", alt: "Print 8", w: 220, h: 190 },
  { src: "/prints/p9.png", alt: "Print 9", w: 290, h: 240 },
  { src: "/prints/p10.png", alt: "Print 10", w: 250, h: 210 },
];

export default function MaterialCarousel() {
  // duplica para loop perfeito
  const loop = [...items, ...items];

  return (
    
    <div
      className="marquee relative w-full overflow-hidden"
      style={
        {
          // velocidade “lenta”
          ["--marquee-duration" as any]: "90s",
        } as React.CSSProperties
      }
    >
      {/* fade nas laterais (opcional, dá vibe Material) */}
      <div className="mt-24"></div>
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#F7F7F7] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#F7F7F7] to-transparent" />

      <div className="marquee-track flex w-max items-center gap-6 py-6">
        {loop.map((it, idx) => (
          <div
            key={`${it.src}-${idx}`}
            className="relative shrink-0 overflow-hidden bg-white"
            style={{
              width: it.w,
              height: it.h,
            }}
          >
            <Image
              src={it.src}
              alt={it.alt}
              fill
              className="object-cover"
              sizes={`${it.w}px`}
              priority={idx < 6} // opcional: prioriza os primeiros
            />
          </div>
        ))}
      </div><div className="mb-24"></div>
    </div>
  );
}
