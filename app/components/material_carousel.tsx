// src/components/material_carousel.tsx
import React from "react";
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

  // --- CONSTANTES DO LAYOUT (MESMAS DO BENTO) ---
  const SITE_CONTAINER =
    "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
  const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
  const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

  return (
    <section className="w-full mt-24 sm:mt-32 lg:mt-48">
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          {/* Asset na MESMA largura dos blocos de texto (10 col centralizado) */}
          <div className={TEXT_10}>
            <div
              className="marquee relative w-full overflow-hidden"
              style={
                {
                  // velocidade “lenta”
                  ["--marquee-duration" as any]: "90s",
                } as React.CSSProperties
              }
            >
              {/* fades laterais (vibe Material) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-[#F7F7F7] to-transparent sm:w-16"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-[#F7F7F7] to-transparent sm:w-16"
              />

              <div className="marquee-track flex w-max items-center gap-4 py-4 sm:gap-6 sm:py-6">
                {loop.map((it, idx) => (
                  <div
                    key={`${it.src}-${idx}`}
                    className="relative shrink-0 overflow-hidden bg-white"
                    style={{ width: it.w, height: it.h }}
                  >
                    <Image
                      src={it.src}
                      alt={it.alt}
                      fill
                      className="object-cover"
                      sizes={`${it.w}px`}
                      priority={idx < 6}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* /TEXT_10 */}
        </div>
      </div>
    </section>
  );
}
