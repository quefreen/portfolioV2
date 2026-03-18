// src/components/image_assets_grid.tsx
"use client";

import * as React from "react";
import Image from "next/image";

// ==============================
// Grid e containers (obrigatório)
// ==============================
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

// ==============================
// Bleed controlado (obrigatório)
// ==============================
const SHAPE_INNER_PAD = "px-4 sm:px-4 md:px-8 lg:px-12 xl:px-0";

// ==============================
// Espaçamento vertical padrão (obrigatório)
// ==============================
const SECTION_Y = "py-16 sm:py-20 lg:py-24";

// ==============================
// Spacing tokens (obrigatório)
// ==============================
const STACK_24 = "gap-6"; // base 24px
const STACK_32 = "gap-8"; // 32px

// ==============================
// Helpers
// ==============================
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// ==============================
// UI: Image Compare (slider)
// - recorte via clip-path
// - imagens em FIT (object-contain)
// ==============================
function ImageCompare({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  className = "",
  heightClass = "h-[520px] sm:h-[720px] lg:h-[1211px]",
  initial = 50,
}: {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
  className?: string;
  heightClass?: string;
  initial?: number; // 0-100
}) {
  const [value, setValue] = React.useState<number>(clamp(initial, 0, 100));
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const draggingRef = React.useRef(false);

  function setFromClientX(clientX: number) {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clamp(clientX - rect.left, 0, rect.width);
    const next = rect.width === 0 ? 50 : (x / rect.width) * 100;
    setValue(clamp(next, 0, 100));
  }

  function onPointerDown(e: React.PointerEvent) {
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    setFromClientX(e.clientX);
  }

  function onPointerUp() {
    draggingRef.current = false;
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setValue((v) => clamp(v - step, 0, 100));
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setValue((v) => clamp(v + step, 0, 100));
    }
    if (e.key === "Home") {
      e.preventDefault();
      setValue(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      setValue(100);
    }
  }

  const clip = `inset(0 ${100 - value}% 0 0)`;

  return (
    <div
      ref={rootRef}
      className={[
        "relative w-full overflow-hidden select-none touch-none bg-white",
        heightClass,
        className,
      ].join(" ")}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="group"
      aria-label="Before/after comparison"
    >
      {/* AFTER (base) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        className="object-contain"
        sizes="(max-width: 1024px) 100vw, 1400px"
        priority={false}
        draggable={false}
      />

      {/* BEFORE (overlay recortado) */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: clip,
          WebkitClipPath: clip as any,
        }}
        aria-hidden="true"
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 1400px"
          priority={false}
          draggable={false}
        />
      </div>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 z-20"
        style={{ left: `${value}%` }}
        aria-hidden="true"
      >
        <div className="absolute inset-y-0 w-[2px] -translate-x-1/2 bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" />
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.18)] ring-1 ring-black/10">
            <div className="flex items-center gap-1">
              <span className="h-4 w-[2px] rounded-full bg-black/30" />
              <span className="h-4 w-[2px] rounded-full bg-black/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard accessibility */}
      <div
        className="absolute inset-0 z-30 cursor-ew-resize"
        tabIndex={0}
        role="slider"
        aria-label="Drag to compare before/after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

// ==============================
// UI: Two images (2/3 + 1/3)
// - padding 24px (p-6)
// - FIT (object-contain)
// - alinhado ao topo (object-top)
// ==============================
function ImageBlock({
  src,
  alt,
  className = "",
  heightClass = "h-[360px] sm:h-[520px] lg:h-[717px]",
}: {
  src: string;
  alt: string;
  className?: string;
  heightClass?: string;
}) {
  return (
    <div
      className={[
        "relative w-full overflow-hidden p-6 bg-white",
        heightClass,
        className,
      ].join(" ")}
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-top"
          sizes="(max-width: 1024px) 100vw, 1400px"
          priority={false}
          draggable={false}
        />
      </div>
    </div>
  );
}

// ==============================
// Componente final
// ==============================
export function ImageAssetsGrid({
  before = "/beforecormedixC.jpg",
  after = "/cormedix-home.jpg",
  leftImage = "/leftcormedixC.jpg",
  rightImage = "/rightcormedixB.jpg",
  className = "",
}: {
  before?: string;
  after?: string;
  leftImage?: string;
  rightImage?: string;
  className?: string;
}) {
  return (
    <section className={["w-full", SECTION_Y, className].join(" ")}>
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          {/* mesma largura do FeatureAssetsGrid */}
          <div className={TEXT_10}>
            <div className={["flex w-full flex-col", STACK_32].join(" ")}>
              {/* 1) Compare (contido) */}
              <ImageCompare
                beforeSrc={before}
                beforeAlt="Before"
                afterSrc={after}
                afterAlt="After"
                heightClass="h-[520px] sm:h-[720px] lg:h-[1211px]"
              />

              {/* 2) Two images: 2/3 + 1/3 */}
              <div className={SHAPE_INNER_PAD}>
                <div className={GRID_12}>
                  <div className="col-span-4 lg:col-span-8">
                    <ImageBlock src={leftImage} alt="Design detail — wide view" />
                  </div>
                  <div className="col-span-4 lg:col-span-4">
                    <ImageBlock src={rightImage} alt="Design detail — close up" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* tokens disponíveis */}
          <div className="hidden">
            <div className={STACK_24} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImageAssetsGrid;
