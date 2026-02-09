// src/components/problem_cormedix.tsx
import type { CSSProperties } from "react";

// --- CONSTANTES DO LAYOUT (MESMAS DO BENTO) ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

// --- MÁSCARA (4 cantos) ---
const CARD_MASK_STYLE: CSSProperties = {
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
    clamp(28px, 5vw, 72px) auto,
    clamp(28px, 5vw, 72px) auto,
    clamp(28px, 5vw, 72px) auto,
    clamp(28px, 5vw, 72px) auto,
    100% 100%
  `,
  maskComposite: "exclude",
  WebkitMaskComposite: "xor",
};

type ProblemCardProps = {
  title: string;
  body: string;
};

function ProblemCard({ title, body }: ProblemCardProps) {
  return (
    <div
      className="bg-white p-8 sm:p-10"
      style={CARD_MASK_STYLE}
    >
      <div className="flex flex-col gap-4">
        <p className="text-[16px] font-semibold leading-none text-[#FF4C2C]">
          {title}
        </p>
        <p className="text-xl leading-[1.45] text-black">
          {body}
        </p>
      </div>
    </div>
  );
}

export default function ProblemCormedix() {
  return (
    <section className="w-full mt-24 sm:mt-32 lg:mt-48">
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          {/* BLOCO TEXTO: 10 col, centralizado */}
          <div className={TEXT_10}>
            <div className="flex w-full flex-col gap-12">
              {/* Header */}
              <div className="flex flex-col gap-4">
                <div className="flex">
                  <span className="inline-flex items-center gap-2 rounded-[32px] bg-white px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
                    <span className="text-lg font-semibold leading-none text-[#404040]">
                      Problema
                    </span>
                  </span>
                </div>

                <p className="text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
                  Um site legado em um momento de alta pressão.
                </p>
              </div>

              {/* Contexto (texto geral) */}
              <p className="text-xl leading-[1.45] text-black">
                Em 2023, durante a aplicação do seu primeiro produto (DefenCath) ao orgão
                regulatório Norte Americano (FDA) o site (legado mais de 10 anos) passou
                a representar um risco: para quem estava de fora, ele não passava a clareza
                e a organização que a empresa precisava mostrar e tarefas importantes viravam
                um caminho de tentativa e erro.
              </p>

              {/* ✅ 3 cards lado a lado */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <ProblemCard
                  title="Investidores"
                  body="Relatórios, apresentações e projeções exigiam cliques demais — difícil encontrar rápido e com confiança."
                />

                <ProblemCard
                  title="Mídia & comunidade científica"
                  body="Evidências clínicas e press kit viraram “caça ao PDF” (muitas vezes via Google), aumentando a dúvida sobre a fonte oficial."
                />

                
              </div>
              
              <div className="text-[16px] font-semibold leading-none text-[#FF4C2C]">
                  Conflito central
              
                </div><div className="text-xl leading-[1.45] text-black">
                  Aumentar acesso e transparência sem violar compliance — e sem criar um conteúdo impossível de manter pelo time interno (governança).
                </div>
            </div>
          </div>
          {/* /TEXT_10 */}
        </div>
      </div>
    </section>
  );
}
