// src/components/validation_cormedix.tsx

export default function ValidationCormedix() {
  // --- PADRÃO DO SITE (IGUAL AO BENTO) ---
  const SITE_CONTAINER =
    "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
  const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
  const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

  return (
    <section className="w-full mt-24 sm:mt-32 lg:mt-48">
      {/* Container GLOBAL (PADRONIZADO) */}
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          {/* Conteúdo: 10 col centralizado */}
          <div className={TEXT_10}>
            <div className="flex w-full flex-col gap-6">
              {/* Header: chip + título */}
              <div className="flex flex-col gap-4">
                <div className="flex">
                  <span className="inline-flex items-center gap-2 rounded-[32px] bg-white px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
                    <span className="text-lg font-semibold leading-none text-[#404040]">
                      Validation &amp; Evidence
                    </span>
                  </span>
                </div>

                <p className="text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
                  Testando os novos padrões com usuários.
                </p>
              </div>

              {/* Parágrafos */}
              <p className="text-xl font-medium leading-[1.3] text-[#131415]">
                Para validar se os novos padrões realmente melhoravam a
                experiência conduzi um teste de tarefas comparando o sitemap
                legado vs. o proposto.
              </p>

              <p className="text-xl font-medium leading-[1.3] text-[#131415]">
                Participaram 6 investidores e 8 pessoas relacionadas a Mídia
                &amp; Comunidade científica, executando 6 tarefas críticas
                incluindo 2 solicitações diretas do time de negócio.
              </p>

              <p className="text-xl font-semibold leading-none text-[#FF4C2C]">
                Metodologia
              </p>

              <p className="whitespace-pre-line text-xl font-medium leading-[1.3] text-[#131415]">
                Teste de navegação em protótipo, 6 tarefas (4 escolhidas + 2
                indicadas pelo time de negócios).{"\n"}
                Métricas: Sucesso da tarefa, Tempo de execução, Misclicks, SEQ (1–7).
              </p>
            </div>
          </div>
          {/* /TEXT_10 */}
        </div>
      </div>
    </section>
  );
}
