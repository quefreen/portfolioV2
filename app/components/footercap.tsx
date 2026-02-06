// src/components/footer_corner_cap.tsx
import type { CSSProperties } from "react";

// Mesmo clamp e SVGs do TitleCaseHeader (cantos TOP)
const TOP_CORNERS_MASK_STYLE: CSSProperties = {
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

export default function FooterCornerCap() {
  return (
    // Importante: NÃO colocar bg no <section> para os "furos" mostrarem o que está acima
    <section className="w-full">
      {/* Bloco full-width preto (mesmo do footer) com recorte no topo */}
      <div
        className="w-full bg-[#131415]"
        style={TOP_CORNERS_MASK_STYLE}
        aria-hidden="true"
      >
        {/* Altura do “cap” (pode ajustar se quiser mais/menos presença) */}
        <div className="h-[96px] sm:h-[128px]" />
      </div>
    </section>
  );
}
