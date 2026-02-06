// src/components/insights_cormedix.tsx
import React from "react";
import Image from "next/image";

// --- ESTILO DA MÁSCARA (Reutilizável) ---
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
};

// --- COMPONENTE INTERNO DO CARD ---
function InsightCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full bg-white p-10 sm:p-12" style={CARD_MASK_STYLE}>
      {children}
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function InsightsCormedix() {
  // --- PADRÃO DO SITE (IGUAL AO BENTO) ---
  const SITE_CONTAINER =
    "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
  const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
  const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

  return (
    <section className="w-full mt-6 sm:mt-8 lg:mt-12">
      {/* Container GLOBAL (PADRONIZADO) */}
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          {/* 10 col centralizado */}
          <div className={TEXT_10}>
            <div className="flex w-full flex-col gap-6">

              {/* Logos / retângulos (8) */}
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  { src: "/amazon.jpg", alt: "Rectangle 53" },
                  { src: "/apple.jpg", alt: "Rectangle 54" },
                  { src: "/nvidia.jpg", alt: "Rectangle 55" },
                  { src: "/microsoft.jpg", alt: "Rectangle 56" },
                  { src: "/amgen.jpg", alt: "Rectangle 53 (1)" },
                  { src: "/gilead.jpg", alt: "Rectangle 54 (1)" },
                  { src: "/regeneron.jpg", alt: "Rectangle 55 (1)" },
                  { src: "/cormedix.jpg", alt: "Rectangle 56 (1)" },
                ].map((item) => (
                  <div
                    key={item.src}
                    className="relative h-[89px] w-full overflow-hidden bg-white"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-contain"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      priority={false}
                    />
                  </div>
                ))}
              </div>

              


              {/* Imagem grande */}
              <div className="relative h-[360px] w-full overflow-hidden bg-white sm:h-[480px] lg:h-[603px]">
                <Image
                  src="/analise.jpg"
                  alt="image 37"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 1022px, 100vw"
                  priority={false}
                />
              </div>

              {/* Cards com máscara */}
              <InsightCard>
                <p className="text-xl font-semibold leading-[1.4] text-black">
                  Boas práticas absorvidas
                </p>

                <div className="mt-6 flex flex-col gap-2.5">
                  {[
                    "Todos as empresas tem um hub separado para investidores.",
                    "SEC Filings não é “lista” é base consultável com filtros e grupos.",
                    "“Quick Links” recorrentes para tarefas repetidas é estratégico.",
                    "Atividades dentro do hub prova que a empresa está ativa e é previsível.",
                  ].map((text) => (
                    <button
                      key={text}
                      type="button"
                      className="w-full bg-[#F1F9E8] px-6 py-3 text-left"
                    >
                      <span className="block text-base leading-[1.4] text-black">
                        {text}
                      </span>
                    </button>
                  ))}
                </div>
              </InsightCard>

              <InsightCard>
                <p className="text-xl font-semibold leading-[1.4] text-black">
                  Aprendizados que não foram seguidos
                </p>

                <div className="mt-6 flex flex-col gap-2.5">
                  <button
                    type="button"
                    className="w-full bg-[#F9F1E8] px-6 py-3 text-left"
                  >
                    <span className="block text-base leading-[1.4] text-black">
                      A maioria dos sites pharma/medtech tratava produtos como uma biblioteca (portfólio + fases regulatórias). Para a CorMedix, no lançamento do primeiro produto, esse padrão não se aplicava então não adotamos essa navegação.
                    </span>
                  </button>
                </div>
              </InsightCard>
            </div>
          </div>
          {/* /TEXT_10 */}
        </div>
      </div>
    </section>
  );
}
