// src/components/innovation_3d.tsx
"use client";

import * as React from "react";
import type { CSSProperties } from "react";
import Script from "next/script";

// --- CONSTANTES DO LAYOUT (MESMAS DO BENTO) ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const CONTENT_12 = "col-span-4 lg:col-span-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

// --- MÁSCARA (corners do projeto) ---
const CARD_MASK_STYLE: CSSProperties = {
  maskImage: `
    url(/esqtb.svg),
    url(/dirtb.svg),
    url(/esqbb.svg),
    url(/dirbb.svg),
    linear-gradient(#000, #000)
  `,
  maskPosition: `
    left top,
    right top,
    left bottom,
    right bottom,
    center
  `,
  maskRepeat: "no-repeat",
  maskSize: `
    clamp(32px, 6vw, 80px) auto,
    clamp(32px, 6vw, 80px) auto,
    clamp(32px, 6vw, 80px) auto,
    clamp(32px, 6vw, 80px) auto,
    100% 100%
  `,
  maskComposite: "exclude",
  WebkitMaskComposite: "xor",
};

export default function Innovation3D() {
  const splineUrl =
    "https://prod.spline.design/bKyh0yyGvXQK7vcB/scene.splinecode";

  return (
    <section className="w-full mt-24 sm:mt-32 lg:mt-48">
      {/* Spline viewer web component */}
      <Script
        type="module"
        strategy="afterInteractive"
        src="https://unpkg.com/@splinetool/viewer@1.9.0/build/spline-viewer.js"
      />

      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          {/* Header alinhado na regra do projeto (10 col centralizado) */}
          <div className={TEXT_10}>
            <div className="flex flex-col gap-4">
              {/* caption pill */}
              <div className="flex">
                <span className="inline-flex items-center gap-4 rounded-[32px] bg-white px-3 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
                  <span className="text-lg font-semibold leading-none text-[#404040]">
                    Inovação 3D
                  </span>
                </span>
              </div>

              {/* título */}
              <p className="text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
                Uma molécula interativa para sinalizar tecnologia.
              </p>

              {/* apoio curto */}
              <p className="text-[18px] leading-[1.45] text-black/70">
                Um asset 3D em Spline para comunicar inovação e inteligência — chamando atenção
                sem competir com o conteúdo do case.
              </p>
            </div>
          </div>

          {/* Molécula abaixo */}
          <div className={CONTENT_12}>
            <div className="mt-8 grid grid-cols-4 gap-6 lg:grid-cols-12">
              <div className={TEXT_10}>
                <div className="bg-white" style={CARD_MASK_STYLE}>
                  <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[620px]">
                    {/* ✅ sem TS error: custom element via createElement */}
                    {React.createElement("spline-viewer", {
                      url: splineUrl,
                      style: {
                        width: "100%",
                        height: "100%",
                        display: "block",
                      },
                    })}
                  </div>
                </div>

                <p className="mt-3 text-[14px] font-medium text-black/50">
                  Interativo (drag/zoom) — carregamento pode variar conforme conexão.
                </p>
              </div>
            </div>
          </div>
          {/* /media */}
        </div>
      </div>
    </section>
  );
}
