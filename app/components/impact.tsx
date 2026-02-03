// src/components/impact.tsx
import React from "react"

// --- CONSTANTES DO LAYOUT (MESMAS DO BENTO) ---
const SITE_CONTAINER = "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12"
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12"
const CONTENT_12 = "col-span-4 lg:col-span-12"
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2"

// bleed que “anula” o padding do container em cada breakpoint
const SHAPE_BLEED = "-mx-4 md:-mx-8 lg:-mx-12"

// fundo azul (sem padding aqui — o padding vai no container interno)
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
export default function Impact() {
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
                {/* Conteúdo volta a alinhar no MESMO container do site */}
                <div className={`${SITE_CONTAINER} py-12 sm:py-14 lg:py-16`}>
                  <div className={GRID_12}>
                    {/* TEXTO/CONTEÚDO: 10 col centralizado (regra do projeto) */}
                    <div className={TEXT_10}>
                      {/* Parte 1 */}
                      <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-4">
                          <p className="text-lg font-semibold leading-none text-[#131415]">
                            Impact
                          </p>
                          <p className="text-[32px] font-medium leading-[1.2] text-[#131415] sm:text-[40px]">
                            Melhoria mensurável nas jornadas críticas.
                          </p>
                        </div>

                        {/* Cards (3) */}
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                          <ImpactCard className="border-2 border-white">
                            <p className="text-[56px] font-semibold leading-[1.1] text-[#131415] sm:text-[64px]">
                              −61%
                            </p>
                            <p className="text-lg font-semibold leading-[1.4] text-[#131415] sm:text-xl">
                              no tempo médio para concluir em 6 tarefas (64s → 24,2s).
                            </p>
                          </ImpactCard>

                          <ImpactCard>
                            <p className="text-[56px] font-semibold leading-[1.1] text-[#131415] sm:text-[64px]">
                              +30pp
                            </p>
                            <p className="text-lg font-semibold leading-[1.4] text-[#131415] sm:text-xl">
                              de sucesso na conclusão das tarefas (63% → 93%).
                            </p>
                          </ImpactCard>

                          <ImpactCard>
                            <p className="text-[56px] font-semibold leading-[1.1] text-[#131415] sm:text-[64px]">
                              −82%
                            </p>
                            <p className="text-lg font-semibold leading-[1.4] text-[#131415] sm:text-xl">
                              de misclicks (0,56 → 0,10), reduzindo tentativa-e-erro.
                            </p>
                          </ImpactCard>
                        </div>

                        <div className="h-2 sm:h-6" />

                        {/* Parte 2 */}
                        <div className="flex flex-col gap-12">
                          <div className="flex flex-col gap-4">
                            <p className="text-[32px] font-medium leading-[1.2] text-[#131415] sm:text-[40px]">
                              Entrega sustentável para o time interno.
                            </p>
                          </div>

                          {/* Cards (2) */}
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <ImpactCard>
                              <p className="text-[28px] font-semibold leading-[1.2] text-[#131415] sm:text-[32px]">
                                WordPress + documentação
                              </p>
                              <p className="text-lg font-medium leading-[1.4] text-[#131415] sm:text-xl">
                                permitindo que o time publique/atualize conteúdo e escale páginas
                                sem depender de design/dev a cada ajuste.
                              </p>
                            </ImpactCard>

                            <ImpactCard>
                              <p className="whitespace-pre-line text-[28px] font-semibold leading-[1.2] text-[#131415] sm:text-[32px]">
                                Roadmap{"\n"}pós-lançamento
                              </p>
                              <p className="text-lg font-medium leading-[1.4] text-[#131415] sm:text-xl">
                                Entregamos um backlog priorizado para a fase pós-DefenCath e expansão
                                do hub científico.
                              </p>
                            </ImpactCard>
                          </div>
                        </div>
                      </div>
                      {/* /partes */}
                    </div>
                    {/* /10 col */}
                  </div>
                  {/* /grid */}
                </div>
                {/* /container interno */}
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
