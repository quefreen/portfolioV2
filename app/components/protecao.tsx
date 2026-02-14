// src/components/protected_project_callout.tsx
import type { CSSProperties } from "react";
import Link from "next/link";

// ==============================
// Grid e containers (padrão do site)
// ==============================
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

// ==============================
// Espaçamento vertical padrão
// ==============================
const SECTION_Y = "py-16 sm:py-20 lg:py-24";

// ==============================
// Spacing tokens
// ==============================
const STACK_12 = "gap-3";
const STACK_24 = "gap-6";

// ==============================
// Fonte (Sora via variável, se disponível)
// ==============================
const FONT_SORA: CSSProperties = {
  fontFamily: "var(--font-sora), ui-sans-serif, system-ui, sans-serif",
};

// ==============================
// Mask helpers (mesmo padrão do projeto)
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
    maskComposite: "exclude, exclude, exclude, exclude",

    WebkitMaskImage: MASK_IMAGE as any,
    WebkitMaskPosition: MASK_POSITION as any,
    WebkitMaskRepeat: "no-repeat" as any,
    WebkitMaskSize: MASK_SIZE as any,
    WebkitMaskComposite: "xor, xor, xor, xor" as any,

    ...extra,
  };
}

export default function Protecao({
  linkedinHref = "https://www.linkedin.com/in/quefreen/",
  nextHref = "#",
}: {
  linkedinHref?: string;
  nextHref?: string;
}) {
  return (
    <section className={`w-full ${SECTION_Y}`}>
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          {/* ✅ mesma largura de conteúdo (TEXT_10) */}
          <div className={TEXT_10}>
            <div
              className="w-full bg-white p-8 sm:p-10 lg:p-12"
              style={{ ...maskFourCorners("md"), ...FONT_SORA }}
            >
              <div className={`flex flex-col ${STACK_24}`}>
                <div className={`flex flex-col ${STACK_12}`}>
                  <p className="text-[20px] font-semibold leading-[1.2] text-black sm:text-[22px]">
                    Projeto protegido.
                  </p>

                  <p className="text-[18px] leading-[1.45] text-black/75 sm:text-[20px]">
                    Me chama no{" "}
                    <a
                      href={linkedinHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-black underline underline-offset-2 transition-colors hover:text-[#FF4C2C]"
                    >
                      LinkedIn
                    </a>{" "}
                    para receber a senha.
                  </p>
                </div>

                <div className="h-px w-full bg-black/10" />

                <div>
                  <Link
                    href={nextHref}
                    className="inline-flex items-center gap-2 text-[18px] font-semibold leading-none text-[#747474] transition-colors hover:text-[#FF4C2C]"
                  >
                    Ver próximo projeto <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /TEXT_10 */}
        </div>
      </div>
    </section>
  );
}
