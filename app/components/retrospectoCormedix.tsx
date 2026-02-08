// src/components/retrospect.tsx
import type { CSSProperties } from "react";

// --- CONSTANTES DO LAYOUT (MESMAS DO BENTO) ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

// --- MÁSCARA (mesma lógica dos corners do projeto) ---
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

export default function Retrospect() {
  return (
    <section className="w-full mt-24 sm:mt-32 lg:mt-48">
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          <div className={TEXT_10}>
            <div className="flex w-full flex-col gap-8">
              {/* Header (padrão do site) */}
              <div className="flex flex-col gap-4">
                <div className="flex">
                  <span className="inline-flex items-center gap-4 rounded-[32px] bg-white px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
                    <span className="text-lg font-semibold leading-none text-[#404040]">
                      Retrospecto
                    </span>
                  </span>
                </div>

                <p className="text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
                  O que eu levo deste projeto.
                </p>

                {/* Texto de apoio curto */}
                <p className="text-[18px] leading-[1.45] text-black/70 sm:text-[20px]">
                  Um fechamento honesto sobre impacto, aprendizados e sustentabilidade da entrega.
                </p>
              </div>

              {/* Bloco principal (card branco com corners) */}
              <div className="bg-white p-8 sm:p-10" style={CARD_MASK_STYLE}>
                <div className="flex flex-col gap-6">
                  <p className="text-[18px] leading-[1.55] text-black/80 sm:text-[20px]">
                    Entregar essa plataforma significou atuar no momento mais sensível da história
                    recente da CorMedix e{" "}
                    <span className="font-semibold text-black">
                      transformar ciência complexa + dados financeiros em uma experiência que
                      transmite confiança
                    </span>{" "}
                    — para investidores, jornalistas e comunidade científica.
                  </p>

                  <p className="text-[18px] leading-[1.55] text-black/80 sm:text-[20px]">
                    Como{" "}
                    <span className="font-semibold text-black">único designer</span>, o maior
                    aprendizado foi equilibrar públicos com necessidades quase opostas:{" "}
                    <span className="font-semibold text-black">
                      previsibilidade para quem decide rápido
                    </span>{" "}
                    (IR/Imprensa) e{" "}
                    <span className="font-semibold text-black">
                      profundidade com evidência
                    </span>{" "}
                    para quem valida informação antes de agir (médicos/pesquisadores) — tudo sob
                    restrições de WordPress/legado e prazos apertados.
                  </p>

                  <div className="h-px w-full bg-black/10" />

                  <p className="text-[18px] leading-[1.55] text-black/80 sm:text-[20px]">
                    O resultado final me deixa confiante:{" "}
                    <span className="font-semibold text-black">
                      entregamos a tempo
                    </span>{" "}
                    e com uma base sustentável. A estrutura ficou{" "}
                    <span className="font-semibold text-black">
                      escalável e governável
                    </span>
                    , e o time interno hoje consegue{" "}
                    <span className="font-semibold text-black">
                      publicar, manter e evoluir com autonomia
                    </span>
                    , sem depender de design/dev a cada atualização.
                  </p>
                </div>
              </div>
              {/* /card */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
