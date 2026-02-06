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

export default function OneMinute() {
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
              <div className="w-full bg-white py-7">
                {/* Conteúdo: padding condicional pra não duplicar no desktop */}
                <div className={SHAPE_INNER_PAD}>
                  <div className={GRID_12}>
                    <div className={`${TEXT_10} py-12 sm:py-14 lg:py-24`}>
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
                                  Em 2023, durante a re-submissão do DefenCath à FDA, o site legado (mais de 10 anos) passou a representar um risco:
                                </p>
                                <p className="text-lg leading-[1.4] text-[#131415]">
                                  <b>Investidores</b> tinham dificuldade para encontrar filings e relatórios com confiança.
                                </p>
                                <p className="text-lg leading-[1.4] text-[#131415]">
                                  <b>Mídia e comunidade científica</b> precisavam vasculhar PDFs para validar as evidências clínicas.
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
                                      Investors-first - Nova arquitetura
                                    </p>
                                    <p className="text-lg leading-[1.4] text-[#131415]">
                                    Reorganizei e testei o acesso a informações críticas (SEC filings, resultados, stock e apresentações) em hubs por tarefa, reduzindo atrito e aumentando a previsibilidade da navegação.</p>
                                    <p className="text-lg leading-[1.4] text-[#131415]">
                                    {/* <b>Impacto:</b> −62% no tempo médio, +30pp na taxa de sucesso e SEQ +0,79 (escala 1–7).  */}
                                    </p>
                                  </div>

                                  {/* Item 2 */}
                                  <div className="flex flex-col gap-3">
                                    <p className="text-lg font-semibold leading-[1.4] text-[#F54900]">
                                      Credibilidade e governança
                                    </p>
                                    <p className="text-lg leading-[1.4] text-[#131415]">
                                    Separei e medi com clareza conteúdo regulatório vs. notícias, melhorando a sinalização de conteúdo (information scent) e reduzindo erros de navegação.</p>
                                                             <p className="text-lg leading-[1.4] text-[#131415]">
                                   {/* <b>Impacto:</b> misclicks médios −82% (0,56 → 0,10).*/}</p>
                                  </div>

                                  {/* Item 3 */}
                                  <div className="flex flex-col gap-3">
                                    <p className="text-lg font-semibold leading-[1.4] text-[#F54900]">
                                      Escalabilidade
                                    </p>
                                    <p className="text-lg leading-[1.4] text-[#131415]">
                                      Entreguei a estrutura em WordPress, com handoff + treinamento para garantir autonomia do time interno incluindo regras de conteúdo e bases para evolução do hub sem perda de consistência.
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
                                  CorMedix (NASDAQ: CRMD)
                                </p>
                                <div className="h-px w-full bg-amber-300" />
                              </div>

                              {/* Responsibilities */}
                              <div className="flex flex-col gap-3">
                                <p className="text-base font-semibold leading-none text-[#747474]">
                                  Responsibilities
                                </p>
                                <p className="text-base leading-[1.4] text-[#131415]">
                                Estratégia de UX • Arquitetura da Informação • Alinhamento com stakeholders (Jurídico/RI) • Suporte à implementação (QA + handoff)                                  
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
