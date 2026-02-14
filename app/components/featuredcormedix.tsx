// src/components/feature_assets_grid.tsx
"use client";

import * as React from "react";
import type { CSSProperties } from "react";
import Image from "next/image";

// ==============================
// Grid e containers (obrigatório)
// ==============================
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

// ==============================
// Espaçamento vertical padrão (obrigatório)
// ==============================
const SECTION_Y = "py-16 sm:py-20 lg:py-24";

// ==============================
// Spacing tokens (obrigatório)
// ==============================
const STACK_12 = "gap-3"; // 12px
const STACK_24 = "gap-6"; // 24px
const STACK_32 = "gap-8"; // 32px

// ==============================
// Masks / corners helpers (SVG corners)
// ==============================
type CornerSize = "sm" | "md" | "lg";

function cornerClamp(size: CornerSize) {
  if (size === "sm") return "clamp(24px, 4.5vw, 56px)";
  if (size === "md") return "clamp(32px, 6vw, 80px)";
  return "clamp(56px, 9vw, 140px)";
}

function maskFourCorners(corner: CornerSize, extra?: CSSProperties): CSSProperties {
  const c = cornerClamp(corner);

  const MASK_IMAGE = `
    url(/esqtb.svg),
    url(/dirtb.svg),
    url(/esqbb.svg),
    url(/dirbb.svg),
    linear-gradient(#000, #000)
  `;
  const MASK_POSITION = `
    left top,
    right top,
    left bottom,
    right bottom,
    center
  `;
  const MASK_SIZE = `
    ${c} auto,
    ${c} auto,
    ${c} auto,
    ${c} auto,
    100% 100%
  `;

  return {
    maskImage: MASK_IMAGE,
    maskPosition: MASK_POSITION,
    maskRepeat: "no-repeat",
    maskSize: MASK_SIZE,
    maskComposite: "exclude, exclude, exclude, exclude" as any,

    WebkitMaskImage: MASK_IMAGE as any,
    WebkitMaskPosition: MASK_POSITION as any,
    WebkitMaskRepeat: "no-repeat" as any,
    WebkitMaskSize: MASK_SIZE as any,
    WebkitMaskComposite: "xor, xor, xor, xor" as any,

    ...extra,
  };
}

function MaskedSurface({
  corner = "md",
  className = "",
  innerClassName = "",
  children,
}: {
  corner?: CornerSize;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  // ✅ Sem “contorno cinza”: apenas um surface branco mascarado
  return (
    <div
      className={["w-full bg-white", className].join(" ")}
      style={maskFourCorners(corner)}
    >
      <div className={["w-full h-full", innerClassName].join(" ")}>
        {children}
      </div>
    </div>
  );
}

function ImageFill({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={["relative w-full h-full overflow-hidden", className].join(" ")}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 1024px"
        priority={priority}
        draggable={false}
      />
    </div>
  );
}

// ==============================
// Componente final
// ==============================
export function FeatureAssetsGrid({
  investorImage = "/crmdd.jpg",
  splineImage = "/mol.jpg",
  thumbA = "/wpp.jpg",
  thumbB = "/handd.jpg",
  fullWidthImage = "/dscrmd.jpg",
  className = "",
}: {
  investorImage?: string;
  splineImage?: string;
  thumbA?: string;
  thumbB?: string;
  fullWidthImage?: string;
  className?: string;
}) {
  return (
    <section className={["w-full", SECTION_Y, className].join(" ")}>
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          {/* ✅ Mesma largura da sessão acima (contida em TEXT_10) */}
          <div className={TEXT_10}>
            <div className={["flex w-full flex-col", STACK_24].join(" ")}>
              {/* ROW 1 */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* LEFT */}
                <div className="lg:col-span-6">
                  <MaskedSurface corner="md" className="h-full">
                    <div className="flex h-full w-full flex-col">
                      <div className="h-80 sm:h-96">
                        <ImageFill src={investorImage} alt="Investidores" />
                      </div>

                      <div className="p-12">
                        <div className={["flex flex-col", STACK_12].join(" ")}>
                          <p className="text-base font-semibold leading-6 text-neutral-900">
                            Investidores
                          </p>
                          <p className="text-base font-medium leading-6 text-neutral-900">
                            Um hub focado em clareza, transparência e acesso fácil aos relatórios
                            (SEC Filings).
                          </p>
                        </div>
                      </div>
                    </div>
                  </MaskedSurface>
                </div>

                {/* RIGHT */}
                <div className="lg:col-span-6">
                  <div className={["flex w-full flex-col", STACK_32].join(" ")}>
                    <MaskedSurface corner="md">
                      <div className="relative h-72 sm:h-80 w-full">
                        <ImageFill src={splineImage} alt="Inovação 3D Interativa" />
                        <div className="absolute inset-0 flex flex-col justify-end p-12">
                          <div className={["flex flex-col", STACK_12].join(" ")}>
                            <p className="text-base font-semibold leading-6 text-white">
                              Inovação 3D Interativa
                            </p>
                            <p className="text-base font-medium leading-6 text-white">
                              Protótipo da molécula do DefenCath em Spline para comunicar a ciência
                              complexa do produto.
                            </p>
                          </div>
                        </div>
                      </div>
                    </MaskedSurface>

                    <div className="grid grid-cols-2 gap-6">
                      <MaskedSurface corner="sm">
                        <div className="aspect-square">
                          <ImageFill src={thumbA} alt="Thumb A" />
                        </div>
                      </MaskedSurface>

                      <MaskedSurface corner="sm">
                        <div className="aspect-square">
                          <ImageFill src={thumbB} alt="Thumb B" />
                        </div>
                      </MaskedSurface>
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 2 (agora contido em TEXT_10 também) */}
              <MaskedSurface corner="md" className="w-full">
                <div className="h-[320px] sm:h-[420px] lg:h-[560px] p-8 w-full">
                  <ImageFill src={fullWidthImage} alt="Imagem full width" />
                </div>
              </MaskedSurface>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureAssetsGrid;
