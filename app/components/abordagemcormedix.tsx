// src/components/validation_cormedix.tsx

export default function AbordagemCormedix() {
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
                      Consequências
                    </span>
                  </span>
                </div>

                <p className="text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
                  Criando e testando a nova arquitetura.
                </p>
              </div>

              {/* Parágrafos */}
              <p className="text-xl font-medium leading-[1.3] text-[#131415]">
                Eu parti de uma hipótese inicial de arquitetura (baseada nos padrões de mercado) e validei isso com tree testing (Treejack). Mantive o teste bem controlado para usar o feedback como ajuste — não como recomeço do zero.
              </p>

              <p className="text-xl font-medium leading-[1.3] text-[#131415]">
                A maior parte das mudanças aconteceu no menu “Stock Info”: revisamos agrupamentos e rótulos e reorganizamos a seção por completo. Nesse processo, também houve um direcionamento do cliente para remover uma sugestão que eu tinha colocado na hipótese inicial: uma calculadora de investimentos.
              </p>

              

              <p className="whitespace-pre-line text-xl font-medium leading-[1.3] text-[#131415]">
                Para fechar a validação, rodei 6 testes de usabilidade: 2 conduzidos com participação do cliente (top-down) e 4 com participantes que eu selecionei.
              </p>
            </div>
          </div>
          {/* /TEXT_10 */}
        </div>
      </div>
    </section>
  );
}
