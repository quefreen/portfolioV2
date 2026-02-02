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
  // Tamanho do recorte (clamp para responsividade)
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
  // Removi a borda (border-[#F1F9E8]) pois a máscara cortaria ela de forma reta,
  // e geralmente shapes recortados funcionam melhor sem border ou com drop-shadow aplicado num wrapper.
  // Mantive o padding e bg-white.
  return (
    <div
      className="w-full bg-white p-10 sm:p-12"
      style={CARD_MASK_STYLE}
    >
      {children}
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function InsightsCormedix() {
  return (
    <section className="w-full">
      <div className="mt-48"></div>
      {/* Container GLOBAL */}
      <div className="mx-auto w-full max-w-screen-xl px-6">
        <div className="grid grid-cols-4 gap-6 lg:grid-cols-12">
          {/* 10 col centralizado */}
          <div className="col-span-4 lg:col-span-10 lg:col-start-2">
            <div className="flex w-full flex-col gap-6">
              <p className="text-xl font-semibold leading-none text-[#FF4C2C]">
                Entendendo os padrões de mercado
              </p>

              <p className="text-xl font-medium leading-[1.3] text-[#131415]">
                Com o objetivo de reconhecer e transformar padrões recorrentes em
                decisões de arquitetura (hubs, filtros e quick links).
              </p>

              <p className="text-xl font-medium leading-[1.3] text-[#131415]">
                Para reduzir achismos, eu analisei 8 sites de empresas listadas na
                Nasdaq.
              </p>

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

              <p className="text-xl font-semibold leading-none text-[#FF4C2C]">
                Critérios
              </p>

              <p className="text-xl font-medium leading-[1.3] text-[#131415]">
                Referências amplamente conhecidas por investidores para encontrar
                padrões de Investor Relations e também empresas do ecossistema
                health/pharma para encontrar padrões específicos do setor.
              </p>

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

              {/* --- APLICAÇÃO DOS CARDS COM MÁSCARA --- */}

              {/* Card 1 */}
              <InsightCard>
                <p className="text-xl font-semibold leading-[1.4] text-black">
                  Aprendizados absorvidos na solução
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

              {/* Card 2 */}
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
                      Todos os sites relacionados a pharma/medtech tinham mais de um
                      produto e sua navegação de produtos era como uma biblioteca
                      de produtos e fases de aprovação/desenvolvimento. O que não
                      se aplica para CorMedix no lançamento do seu primeiro produto
                      e foi rejeitado esse padrão de navegação.
                    </span>
                  </button>
                </div>
              </InsightCard>
              {/* /Card 2 */}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}