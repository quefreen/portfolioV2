// src/components/task_results_grid.tsx
import type { CSSProperties } from "react";

// --- CONSTANTES DO LAYOUT (MESMAS DO BENTO) ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

// --- MÁSCARA (mesma lógica dos corners do projeto) ---
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
    clamp(32px, 6vw, 80px) auto,
    clamp(32px, 6vw, 80px) auto,
    clamp(32px, 6vw, 80px) auto,
    clamp(32px, 6vw, 80px) auto,
    100% 100%
  `,
  maskComposite: "exclude",
  WebkitMaskComposite: "xor",
};

type TaskCard = {
  id: string;
  tag: string; // "Tarefa 1 — Investor"
  title: string;

  // ✅ 1 highlight por card
  highlightLabel: string; // ex: "Tempo"
  highlightValue: string; // ex: "−61%"
  highlightDetail: string; // ex: "102s → 39s"

  why: string;
};

const tasks: TaskCard[] = [
  {
    id: "t1",
    tag: "Tarefa 1 — Investor",
    title: "Encontrar Q3’22 e Q3’21 (comparar caixa).",
    highlightLabel: "Tempo",
    highlightValue: "−61%",
    highlightDetail: "102s → 39s",
    why:
      "Filtros por tipo/ano + agrupamento por “Financials/Quarterly” reduziu scroll e troca de abas.",
  },
  {
    id: "t2",
    tag: "Tarefa 2 — Researcher / Scientific community",
    title: "Validar evidência “Phase 3 / DefenCath” antes de baixar.",
    highlightLabel: "SEQ (1–7)",
    highlightValue: "+1,0",
    highlightDetail: "4,2 → 5,2",
    why:
      "Cards com resumo/abstract + filtro “Phase 3” eliminaram tentativa-e-erro de PDFs.",
  },
  {
    id: "t3",
    tag: "Tarefa 3 — Journalist",
    title: "Baixar logo oficial / Media Kit (hi-res).",
    highlightLabel: "Sucesso",
    highlightValue: "+50pp",
    highlightDetail: "35% → 85%",
    why:
      "“Media Assets Library” virou destino claro no menu/hub (sem depender de Google).",
  },
  {
    id: "t4",
    tag: "Tarefa 4 — Investor / Top-down quick check",
    title: "Ver preço da ação e variação do dia (rápido).",
    highlightLabel: "Tempo",
    highlightValue: "−67%",
    highlightDetail: "12s → 4s",
    why:
      "Preço/ticker virou informação “passiva” (widget/atalho), reduzindo cliques e navegação.",
  },
  {
    id: "t5",
    tag: "Tarefa 5 — Investor (Top-down do board)",
    title: "Assinar Email Alerts (Results/SEC/News).",
    highlightLabel: "Sucesso",
    highlightValue: "+60pp",
    highlightDetail: "35% → 95%",
    why:
      "CTA e destino previsíveis + linguagem direta (“Email Alerts”) reduziram busca por formulário escondido.",
  },
  {
    id: "t6",
    tag: "Tarefa 6 — Journalist / Media & Publications (Top-down do board)",
    title: "Encontrar press release mais recente sobre DefenCath.",
    highlightLabel: "Tempo",
    highlightValue: "−67%",
    highlightDetail: "150s → 49s",
    why:
      "Separação clara entre Press Releases vs SEC Filings + rotas de “Newsroom” evitaram confusão de taxonomia.",
  },
];

function TaskCardUI({ t }: { t: TaskCard }) {
  return (
    <div className="bg-white p-8 sm:p-10" style={CARD_MASK_STYLE}>
      <div className="flex w-full flex-col gap-6">
        {/* Tag */}
        <p className="text-[14px] font-semibold leading-none text-[#FF4C2C]">
          {t.tag}
        </p>

        {/* Título */}
        <p className="text-[20px] font-medium leading-[1.35] text-black">
          {t.title}
        </p>

        {/* ✅ Highlight único */}
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-semibold leading-none text-[#6B6B6B]">
            {t.highlightLabel}
          </p>

          <div className="flex items-end justify-between gap-6">
            <p className="text-[44px] font-semibold leading-none text-[#131415] sm:text-[52px]">
              {t.highlightValue}
            </p>
            <p className="text-[14px] font-semibold leading-none text-black">
              {t.highlightDetail}
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-black/10" />

        {/* ✅ Nova anatomia do "Por que melhorou" */}
        <div className="flex flex-col gap-2">
          <p className="text-[16px] font-semibold leading-none text-black/80">
            Por que melhorou
          </p>
          <p className="text-[16px] leading-[1.45] text-black/80">
            {t.why}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TaskResultsGrid() {
  return (
    <section className="w-full mt-24 sm:mt-32 lg:mt-48">
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          <div className={TEXT_10}>
            <div className="flex w-full flex-col gap-8">
              {/* Header */}
              <div className="flex flex-col gap-4">
                <div className="flex">
                  <span className="inline-flex items-center gap-4 rounded-[32px] bg-white px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
                    <span className="text-lg font-semibold leading-none text-[#404040]">
                      Resultados por tarefa
                    </span>
                  </span>
                </div>

                <p className="text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
                  Evidência quantitativa na prática.
                </p>
              </div>

              {/* Grid 2 col / 3 rows */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {tasks.map((t) => (
                  <TaskCardUI key={t.id} t={t} />
                ))}
              </div>
            </div>
          </div>
          {/* /TEXT_10 */}
        </div>
      </div>
    </section>
  );
}
