// src/components/one_minute.tsx

const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12"
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12"
const CONTENT_12 = "col-span-4 lg:col-span-12"
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2"

// bleed até iPad (lg). No desktop (xl+) NÃO encosta no viewport.
const SHAPE_BLEED = "-mx-4 md:-mx-8 lg:-mx-12 xl:mx-0"

// padding interno: reaplica enquanto bleed está ativo; no xl+ vira 0 para não duplicar
const SHAPE_INNER_PAD = "px-4 sm:px-4 md:px-8 lg:px-12 xl:px-0"

export default function HepatiteOneMinute() {
  return (
    <section
      className="w-full"
      style={{
        background:
          "linear-gradient(0deg, rgba(225, 225, 225, 0) 0%, rgba(0, 143, 190 , 0.2) 100%), #F7F7F7",
      }}
    >
      <div className={`${SITE_CONTAINER} py-0`}>
        <div className={GRID_12}>
          <div className={CONTENT_12}>
            {/* Shape com bleed (só o fundo pode sangrar) */}
            <div className={SHAPE_BLEED}>
              <div className="w-full bg-white">
                {/* Conteúdo: padding condicional pra não duplicar no desktop */}
                <div className={SHAPE_INNER_PAD}>
                  <div className={GRID_12}>
                    <div className={`${TEXT_10} py-12 sm:py-14 lg:py-16`}>
                      <div className="flex flex-col gap-12">
                        {/* Header */}
                        <div className="flex flex-col gap-6">
                          <p className="text-2xl font-semibold leading-[1.2] text-[#131415]">
                            Resumo do projeto
                          </p>
                        </div>

                        {/* Layout principal: conteúdo + sidebar */}
                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                          {/* Conteúdo (esquerda) */}
                          <div className="lg:col-span-8">
                            <div className="flex flex-col gap-12">
                              {/* Contexto */}
                              <div className="flex flex-col gap-6">
                                <p className="text-xl font-semibold leading-none text-[#131415]">
                                  Contexto
                                </p>
                                <p className="text-lg leading-[1.4] text-[#131415]">
                                Hepatite C é tratável. O problema é chegar até o primeiro passo.
                                A jornada trava cedo por desinformação, medo e estigma e por fricções estruturais do SUS (fila, acesso, burocracia, disponibilidade de especialistas).
                                </p>
                              </div>

                              {/* Resultados */}
                              <div className="flex flex-col gap-6">
                                <p className="text-xl font-semibold leading-none text-[#131415]">
                                  Resultados
                                </p>

                                <div className="flex flex-col gap-8">
                                  {/* Item 1 */}
                                  <div className="flex flex-col gap-3">
                                    <p className="text-lg font-semibold leading-none text-[#F54900]">
                                      Entreguei um framework que transformou pesquisa em produto: 
                                    </p>
                                    <p className="text-lg mt-2 leading-[1.4] text-[#131415]">
                                      5 entradas/funcionalidades mapeadas por estados emocionais (negação, medo, incerteza, mitos e apoio familiar).
                                    </p>
                                    <p className="text-lg leading-[1.4] text-[#131415]">
                                      Este projeto com a Gilead mapeou onde as pessoas desistem antes mesmo do agendamento e definiu uma direção de experiência que transforma “não sei o que fazer” em próximo passo claro: WhatsApp/0800/locais de testagem.
                                    </p>
                                  </div>

                                  {/* Item 2 */}
                                  <div className="flex flex-col gap-3">
                                    <p className="text-lg font-semibold leading-[1.4] text-[#F54900]">
                                      
                                    </p>
                                    <p className="text-lg leading-[1.4] text-[#131415]">
                                      
                                    </p>
                                  </div>

                                  {/* Item 3 */}
                                  <div className="flex flex-col gap-3">
                                    <p className="text-lg font-semibold leading-[1.4] text-[#F54900]">
                                      
                                    </p>
                                    <p className="text-lg leading-[1.4] text-[#131415]">
                                      
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Sidebar (direita) */}
                          <div className="lg:col-span-4">
                            <div className="flex flex-col gap-8">
                              {/* Team */}
                              <div className="flex flex-col gap-3">
                                <p className="text-base font-semibold leading-none text-[#747474]">
                                  Team
                                </p>
                                <div className="flex items-center -space-x-2">
                                  {Array.from({ length: 6 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className="h-12 w-12 rounded-full border-2 border-white bg-[#D9D9D9]"
                                    />
                                  ))}
                                </div>
                                <div className="h-px w-full bg-black/80" />
                              </div>

                              {/* Client */}
                              <div className="flex flex-col gap-3">
                                <p className="text-base font-semibold leading-none text-[#747474]">
                                  Client
                                </p>
                                <p className="text-base leading-[1.4] text-[#131415]">
                                  CorMedix (NASDAQ: CRMD) A biopharmaceutical
                                  company transitioning to commercial-stage,
                                  focused on reducing life-threatening infections
                                  in high-risk patients.
                                </p>
                                <div className="h-px w-full bg-black/80" />
                              </div>

                              {/* Responsibilities */}
                              <div className="flex flex-col gap-3">
                                <p className="text-base font-semibold leading-none text-[#747474]">
                                  Responsibilities
                                </p>
                                <p className="text-base leading-[1.4] text-[#131415]">
                                  UX Strategy &amp; Governance • Stakeholder
                                  Negotiation (Legal/IR) • Information Architecture
                                  • 3D Modeling &amp; Optimization • Frontend Design
                                  QA • Handoff &amp; Internal Training
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /layout principal */}
                      </div>
                    </div>
                    {/* /texto 10 col */}
                  </div>
                </div>
                {/* /inner pad */}
              </div>
            </div>
            {/* /bleed */}
          </div>
        </div>
      </div>
    </section>
  )
}
