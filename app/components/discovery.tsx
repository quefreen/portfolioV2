// src/components/discovery.tsx
import React from "react";

// --- ESTILO DA MÁSCARA (Reutilizável) ---
const MASK_STYLE: React.CSSProperties = {
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
  // Tamanho dos cantos: ajustável via clamp para mobile/desktop
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

// --- COMPONENTE INTERNO DO CARD ---
function DiscoveryCard({ children }: { children: React.ReactNode }) {
  return (
    // Apliquei p-12 no mobile e p-20 no desktop para garantir que o texto não bata no recorte
    <div
      className="flex h-full flex-col gap-2.5 bg-white p-12 sm:p-20"
      style={MASK_STYLE}
    >
      {children}
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function Discovery() {
  return (
    <section className="w-full">
      <div className="mt-48"></div>

      {/* Container GLOBAL */}
      <div className="mx-auto w-full max-w-screen-xl px-6">
        <div className="grid grid-cols-4 gap-12 lg:grid-cols-12">
          {/* Conteúdo: 10 col centralizado */}
          <div className="col-span-4 lg:col-span-10 lg:col-start-2">
            <div className="flex w-full flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col gap-4">
                <div className="flex">
                  <span className="inline-flex items-center gap-4 rounded-[32px] bg-white px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
                    <span className="text-lg font-semibold leading-none text-[#404040]">
                      Discovery &amp; Insights
                    </span>
                  </span>
                </div>

                <p className="text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
                  Arquitetura guiada por tarefas.
                </p>
              </div>

              {/* Textos */}
              <p className="text-xl font-semibold leading-none text-[#FF4C2C]">
                Validando o problema
              </p>

              <p className="text-xl font-medium leading-[1.3] text-[#131415]">
                Em um momento de alta pressão (re-submissão à FDA), o site legado
                aumentava incerteza.
              </p>

              <p className="text-xl font-medium leading-[1.3] text-[#131415]">
                As duas dores abaixo mostram como tarefas básicas exigiam esforço
                excessivo para públicos que precisam de precisão e rapidez.
              </p>

              {/* Cards: COL-10 + 32px de “bleed” em cada lado */}
              <div className="mt-12 lg:-mx-20">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
                  
                  {/* CARD 1 */}
                  <DiscoveryCard>
                    <p className="text-xl font-semibold leading-[1.4] text-black">
                      Investidores
                    </p>
                    <p className="text-xl leading-[1.4] text-black">
                      Relatórios e projeções exigiam tentativa e erro e isso
                      aumentava a incerteza do investidor.
                    </p>
                  </DiscoveryCard>

                  {/* CARD 2 */}
                  <DiscoveryCard>
                    <p className="text-xl font-semibold leading-[1.4] text-black">
                      Jornalistas
                    </p>
                    <p className="text-xl leading-[1.4] text-black">
                      Encontrar press releases antigos ou dados regulatórios
                      era um processo fragmentado.
                    </p>
                  </DiscoveryCard>

                </div>
              </div>
              {/* /cards */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}