// src/components/impact.tsx
import React from "react"

// --- CONSTANTES DO LAYOUT (MESMAS DO BENTO) ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12"
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12"
const CONTENT_12 = "col-span-4 lg:col-span-12"
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2"

// Bleed até iPad (lg). No desktop (xl+) NÃO encosta no viewport.
const SHAPE_BLEED = "-mx-4 md:-mx-8 lg:-mx-12 xl:mx-0"

// Padding interno: reaplica padding enquanto bleed está ativo.
// No xl+ vira 0 para evitar “padding duplicado” e fixar o alinhamento do texto.
const SHAPE_INNER_PAD = "px-4 sm:px-4 md:px-8 lg:px-12 xl:px-0 py-12 sm:py-14 lg:py-16"

// fundo azul (sem padding aqui — o padding vai no wrapper interno)
const SHAPE_BLUE = "w-full bg-[#C7E3EC]"

// --- MÁSCARA DOS CARDS BRANCOS (4 cantos) ---
const CARD_MASK_STYLE: React.CSSProperties = {
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
}

// --- COMPONENTE INTERNO PARA OS CARDS ---
type ImpactCardProps = {
  children: React.ReactNode
  className?: string
}

function ImpactCard({ children, className = "" }: ImpactCardProps) {
  const baseClasses = `flex flex-col gap-2.5 bg-white p-10 sm:p-14 ${className}`
  return (
    <div className={baseClasses} style={CARD_MASK_STYLE}>
      {children}
    </div>
  )
}

// --- COMPONENTE PRINCIPAL ---
export default function MSDImpact() {
  return (
    <section className="w-full">
      {/* Container GLOBAL do site (mesmo do Bento) */}
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          <div className={CONTENT_12}>
            {/* Bleed do shape */}
            <div className={SHAPE_BLEED}>
              {/* Fundo azul com máscara inferior (corners negativos embaixo) */}
              <div
                className={SHAPE_BLUE}
                style={{
                  maskImage: `url(/esqbb.svg), url(/dirbb.svg), linear-gradient(#000, #000)`,
                  maskPosition: "left bottom, right bottom, center",
                  maskRepeat: "no-repeat",
                  maskSize:
                    "clamp(56px, 9vw, 140px) auto, clamp(56px, 9vw, 140px) auto, 100% 100%",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                }}
              >
                {/* IMPORTANTE:
                    Não use SITE_CONTAINER aqui, senão no xl+ duplica padding e desalinha.
                    Use padding condicional (SHAPE_INNER_PAD) para fixar o texto.
                */}
                <div className={SHAPE_INNER_PAD}>
                  <div className={GRID_12}>
                    {/* TEXTO/CONTEÚDO: 10 col centralizado (regra do projeto) */}
                    <div className={TEXT_10}>
                      <div className="flex flex-col gap-5">
                        {/* Parte 1 */}
                        <div className="flex flex-col gap-4">
                          <p className="text-lg font-semibold leading-none text-[#131415]">
                            Impact
                          </p>
                          <p className="text-[32px] font-medium leading-[1.2] text-[#131415] sm:text-[40px]">
                            Impacto Estratégico & Mitigação de Risco (sem tocar no backend)
                          </p>
                        </div>

                        {/* Cards (3) */}
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                          <ImpactCard>
                              <p className="text-[28px] font-semibold leading-[1.2] text-[#131415] sm:text-[32px]">
                                Menos erro em decisões críticas (Error-proofing)
                              </p>
                              <p className="text-lg font-medium leading-[1.4] text-[#131415] sm:text-xl">
                                Aumentei a tolerância a erro com padrões de recuperação e estados claros.
                              </p>
                            </ImpactCard>

                          <ImpactCard>
                              <p className="text-[28px] font-semibold leading-[1.2] text-[#131415] sm:text-[32px]">
                                Redução de carga cognitiva
                              </p>
                              <p className="text-lg font-medium leading-[1.4] text-[#131415] sm:text-xl">
                                Reduzi densidade de decisão e reorganizei a informação para decisões mais seguras.
                              </p>
                            </ImpactCard>

                          
                        </div>

                        

                        {/* Parte 2 */}
                        <div className="flex flex-col gap-4">
                          

                          {/* Cards (2) */}
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <ImpactCard>
                              <p className="text-[28px] font-semibold leading-[1.2] text-[#131415] sm:text-[32px]">
                                Mobile readiness onde não existia produto.
                              </p>
                              <p className="text-lg font-medium leading-[1.4] text-[#131415] sm:text-xl">
                                Criei a base mobile-first para um produto que não tinha versão mobile.
                              </p>
                            </ImpactCard>

                            <ImpactCard>
                              <p className="whitespace-pre-line text-[28px] font-semibold leading-[1.2] text-[#131415] sm:text-[32px]">
                                Escalabilidade por consistência
                              </p>
                              <p className="text-lg font-medium leading-[1.4] text-[#131415] sm:text-xl">
                                Para evitar que melhorias virassem “páginas soltas”, estruturei um foundation de assets.
                              </p>
                            </ImpactCard>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /10 col */}
                  </div>
                  {/* /grid */}
                </div>
                {/* /inner pad */}
              </div>
              {/* /shape azul */}
            </div>
            {/* /bleed */}
          </div>
        </div>
      </div>
    </section>
  )
}
