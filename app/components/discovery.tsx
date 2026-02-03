// src/components/discovery.tsx
import React from "react";

// --- CONSTANTES DO LAYOUT (MESMAS DO BENTO) ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

// --- ESTILO DA MÁSCARA (4 cantos + preenchimento) ---
// IMPORTANTE: para 5 camadas, o composite precisa ser uma LISTA (4 valores)
// (uma composição para cada camada depois da primeira).
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
  clamp(32px, 6vw, 80px) auto,
  clamp(32px, 6vw, 80px) auto,
  clamp(32px, 6vw, 80px) auto,
  clamp(32px, 6vw, 80px) auto,
  100% 100%
`;

const MASK_STYLE: React.CSSProperties = {
  // Standard
  maskImage: MASK_IMAGE,
  maskPosition: MASK_POSITION,
  maskRepeat: "no-repeat",
  maskSize: MASK_SIZE,

  // Para múltiplas máscaras: 4 composições (uma por layer após a 1ª)
  // Alguns browsers respeitam isso:
  maskComposite: "exclude, exclude, exclude, exclude",

  // WebKit (Chrome/Safari/iOS) — aqui é o que realmente garante consistência
  WebkitMaskImage: MASK_IMAGE as any,
  WebkitMaskPosition: MASK_POSITION as any,
  WebkitMaskRepeat: "no-repeat" as any,
  WebkitMaskSize: MASK_SIZE as any,

  // 4 composições (5 layers => 4 operadores)
  WebkitMaskComposite: "xor, xor, xor, xor" as any,
};

// --- COMPONENTE INTERNO DO CARD ---
function DiscoveryCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex h-full flex-col gap-2.5 bg-white p-12 sm:p-16 lg:p-20 overflow-hidden"
      style={MASK_STYLE}
    >
      {children}
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function Discovery() {
  return (
    <section className="w-full mt-24 sm:mt-32 lg:mt-48">
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          {/* Conteúdo: 10 col centralizado */}
          <div className={TEXT_10}>
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

              {/* Cards (ALINHADOS COM O TEXTO — SEM BLEED) */}
              <div className="mt-12 w-full">
                <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
                  <DiscoveryCard>
                    <p className="text-xl font-semibold leading-[1.4] text-black">
                      Investidores
                    </p>
                    <p className="text-xl leading-[1.4] text-black">
                      Relatórios e projeções exigiam tentativa e erro e isso
                      aumentava a incerteza do investidor.
                    </p>
                  </DiscoveryCard>

                  <DiscoveryCard>
                    <p className="text-xl font-semibold leading-[1.4] text-black">
                      Jornalistas
                    </p>
                    <p className="text-xl leading-[1.4] text-black">
                      Encontrar press releases antigos ou dados regulatórios era
                      um processo fragmentado.
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
