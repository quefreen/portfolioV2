// src/components/title_case_header.tsx
import type { CSSProperties } from "react";

type MetaItemProps = {
  label: string;
  value: string;
  align?: "left" | "right";
};

function MetaItem({ label, value, align = "left" }: MetaItemProps) {
  const alignCls =
    align === "right"
      ? "lg:items-end lg:text-right"
      : "lg:items-start lg:text-left";

  return (
    <div className={`flex w-full flex-col ${alignCls}`}>
      <p className="text-xs font-semibold tracking-wide text-neutral-500">
        {label}
      </p>
      <p className="mt-2 text-[16px] leading-[1.3] text-black">{value}</p>
    </div>
  );
}

// --- CONSTANTES DO LAYOUT (MESMAS DO BENTO) ---
const SITE_CONTAINER = "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";
const CONTENT_12 = "col-span-4 lg:col-span-12";

// Bleed até iPad (lg). No desktop (xl+) NÃO encosta no viewport.
const SHAPE_BLEED = "-mx-4 md:-mx-8 lg:-mx-12 xl:mx-0";

const BASE_WHITE_MASK_STYLE: CSSProperties = {
  maskImage: `
    url(/esqtb.svg),
    url(/dirtb.svg),
    linear-gradient(#000, #000)
  `,
  maskPosition: "left top, right top, center",
  maskRepeat: "no-repeat",
  maskSize:
    "clamp(56px, 9vw, 140px) auto, clamp(56px, 9vw, 140px) auto, 100% 100%",
  maskComposite: "exclude",

  WebkitMaskImage: `
    url(/esqtb.svg),
    url(/dirtb.svg),
    linear-gradient(#000, #000)
  `,
  WebkitMaskPosition: "left top, right top, center",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskSize:
    "clamp(56px, 9vw, 140px) auto, clamp(56px, 9vw, 140px) auto, 100% 100%",
  WebkitMaskComposite: "xor",
};

export default function MSDTitleCase() {
  return (
    <section
      className="w-full"
      style={{
        background:
          "linear-gradient(180deg, rgba(225, 225, 225, 0) 50%, rgba(0, 143, 190 , 0.2) 100%), #F7F7F7",
      }}
    >
      {/* ✅ Container padronizado com o Bento */}
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          {/* TEXTO: 10 col centralizado (regra do projeto) */}
          <div className={TEXT_10}>
            <div className="flex w-full items-start pt-16 sm:pt-20 lg:pt-24">
              <div className="flex w-full flex-col gap-12">
                {/* topo */}
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-semibold tracking-wide text-neutral-400">
                    GILLEAD
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm leading-none text-black">
                      Content + Product
                    </span>
                    <span className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm leading-none text-black">
                      0→1 Discovery
                    </span>
                    <span className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm leading-none text-black">
                      UX Strategy
                    </span>
                  </div>

                  <h1 className="font-display text-[44px] font-semibold leading-[1.15] text-black sm:text-[52px] lg:text-[56px] lg:leading-[1.2]">
                    A epidemia de mitos sobre Hepatite C.
                  </h1>

                  <p className="text-lg font-semibold leading-[1.35] text-black sm:text-xl">
                    Um {" "}
                    <span className="text-[#FF4C2C]">
                      sistema mobile-first que guia e direciona para canais de agendamento.
                    </span>{" "}
                  </p>
                </div>

                {/* meta */}
                <div className="grid w-full grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
                  <MetaItem label="ROLE" value="Product Designer" />
                  <MetaItem label="TIMELINE" value="3 months" />
                  <MetaItem label="TECHNOLOGY" value="Wordpress, Spline, CMS" />
                  <MetaItem label="OUTCOME" value="Revamp website" align="left" />
                </div>
              </div>
            </div>
          </div>

          {/* MÍDIA (col-12) */}
          <div className={CONTENT_12}>
            <div className="relative mt-10 h-[620px] w-full sm:mt-12">
              {/* BASE BRANCA (z-10) com MÁSCARA */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10">
                <div
                  className={`relative h-[128px] bg-white ${SHAPE_BLEED}`}
                  style={BASE_WHITE_MASK_STYLE}
                />
              </div>

              {/* THUMB (z-20): 10 col centralizado */}
              <div className="relative z-20 grid h-full grid-cols-4 gap-6 lg:grid-cols-12">
                <div className="col-span-4 h-full lg:col-span-10 lg:col-start-2">
                  <div className="relative h-full w-full overflow-hidden bg-black">
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      src="/hero.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />

                    {/* SVGs nos cantos do Vídeo */}
                    <img
                      src="/esqtb.svg"
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-0 z-30 h-auto"
                      style={{ width: "clamp(56px, 9vw, 140px)" }}
                    />
                    <img
                      src="/dirtb.svg"
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute right-0 top-0 z-30 h-auto"
                      style={{ width: "clamp(56px, 9vw, 140px)" }}
                    />
                  </div>
                </div>
              </div>
              {/* /thumb */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
