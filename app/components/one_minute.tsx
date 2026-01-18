// src/components/one_minute.tsx

export default function OneMinute() {
  return (
    <section
      className="w-full"
      style={{
        background:
          "linear-gradient(0deg, rgba(255,255,255,0.20) 0%, rgba(7,49,186,0.20) 100%), #F7F7F7",
      }}
    >
      {/* Container do site */}
      <div className="mx-auto w-full max-w-screen-xl px-6 py-0">

        {/* GRID 12 do site */}
        <div className="grid grid-cols-4 gap-6 lg:grid-cols-12">
          {/* BLOCO BRANCO: 12 col + full-bleed no mobile */}
          <div className="col-span-4 lg:col-span-12 -mx-6 lg:mx-0">
            <div className="w-full bg-white">
              {/* Conteúdo SEMPRE 10 col (mesmo dentro do 12 col) */}
              <div className="mx-auto w-full px-6 py-12">
                <div className="mx-auto w-full max-w-screen-xl">
                  <div className="grid grid-cols-4 gap-6 lg:grid-cols-12">
                    <div className="col-span-4 lg:col-span-10 lg:col-start-2">
                      {/* ESQUELETO: mantenho tudo visível no mobile */}
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
                                  Em 2023, na re-submissão do DefenCath à FDA, o
                                  site legado (+10 anos) virou um risco:
                                  investidores tinham dificuldade para encontrar
                                  filings/relatórios com confiança e Mídia &
                                  Comunidade científica precisavam “caçar PDFs”
                                  para validar evidências clínicas.
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
                                      Investors-first
                                    </p>
                                    <p className="text-lg leading-[1.4] text-[#131415]">
                                      Acesso a informações críticas (SEC Filings,
                                      resultados, stock e apresentações)
                                      reorganizado por “hubs de tarefa”,
                                      reduzindo atrito e aumentando
                                      previsibilidade.
                                    </p>
                                    <p className="text-lg leading-[1.4] text-[#131415]">
                                      −62% no tempo médio (74,9s → 28,2s), +30pp
                                      de sucesso (58% → 88%) e SEQ +0,79 (1–7).
                                    </p>
                                  </div>

                                  {/* Item 2 */}
                                  <div className="flex flex-col gap-3">
                                    <p className="text-lg font-semibold leading-[1.4] text-[#F54900]">
                                      Credibilidade e governança
                                    </p>
                                    <p className="text-lg leading-[1.4] text-[#131415]">
                                      Diferenciação clara entre conteúdo
                                      regulatório vs. notícias, com melhor scent
                                      e menor erro de navegação (misclicks
                                      médios −82%, 0,56 → 0,10).
                                    </p>
                                  </div>

                                  {/* Item 3 */}
                                  <div className="flex flex-col gap-3">
                                    <p className="text-lg font-semibold leading-[1.4] text-[#F54900]">
                                      Escalabilidade
                                    </p>
                                    <p className="text-lg leading-[1.4] text-[#131415]">
                                      Estrutura entregue em WordPress com handoff
                                      e treinamento para autonomia do time
                                      interno com regras de conteúdo e bases para
                                      evolução sem degradação do hub.
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
                                  CorMedix (NASDAQ: CRMD)A biopharmaceutical
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
                                  Negotiation (Legal/IR) • Information
                                  Architecture • 3D Modeling &amp; Optimization
                                  • Frontend Design QA • Handoff &amp; Internal
                                  Training
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* /layout principal */}
                      </div>
                      {/* /esqueleto */}
                    </div>
                  </div>
                </div>
              </div>
              {/* /conteúdo 10 col */}
            </div>
          </div>
          {/* /bloco branco 12 col */}
        </div>
      </div>
    </section>
  );
}
