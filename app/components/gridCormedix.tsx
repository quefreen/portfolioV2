"use client";

import * as React from "react";
import Image from "next/image";
import type { CSSProperties } from "react";

// ==============================
// Grid e containers (obrigatório)
// ==============================
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

// ==============================
// Espaçamento vertical padrão (64/80/96)
// ==============================
const SECTION_Y = "py-16 sm:py-20 lg:py-24";

// ==============================
// Spacing tokens
// ==============================
const STACK_12 = "gap-3"; // 12px
const STACK_24 = "gap-6"; // 24px
const STACK_32 = "gap-8"; // 32px
const STACK_40 = "gap-10"; // 40px
const STACK_48 = "gap-12"; // 48px

// ==============================
// Fonte (seu padrão: Sora via variável)
// ==============================
const FONT_SORA: CSSProperties = {
  fontFamily: "var(--font-sora), ui-sans-serif, system-ui, sans-serif",
};

// ==============================
// Masks / corners helpers
// ==============================
type CornerSize = "sm" | "md" | "lg";

function cornerClamp(size: CornerSize) {
  if (size === "sm") return "clamp(24px, 4.5vw, 56px)";
  if (size === "md") return "clamp(32px, 6vw, 80px)";
  return "clamp(56px, 9vw, 140px)";
}

function maskFourCorners(corner: CornerSize, extra?: CSSProperties): CSSProperties {
  const c = cornerClamp(corner);

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
    ${c} auto,
    ${c} auto,
    ${c} auto,
    ${c} auto,
    100% 100%
  `;

  return {
    maskImage: MASK_IMAGE,
    maskPosition: MASK_POSITION,
    maskRepeat: "no-repeat",
    maskSize: MASK_SIZE,
    maskComposite: "exclude, exclude, exclude, exclude" as any,

    WebkitMaskImage: MASK_IMAGE as any,
    WebkitMaskPosition: MASK_POSITION as any,
    WebkitMaskRepeat: "no-repeat" as any,
    WebkitMaskSize: MASK_SIZE as any,
    WebkitMaskComposite: "xor, xor, xor, xor" as any,

    ...extra,
  };
}

// ==============================
// Tipos
// ==============================
type TaskPublic = {
  id: string;
  tag: string;
  title: string;
  highlightLabel: string; // ex: "Tempo" / "Sucesso" / "SEQ (1–7)"
  why: string;
};

type Metric = {
  highlightValue: string; // ex: "−61%"
  highlightDetail: string; // ex: "102s → 39s"
};

type MetricsMap = Record<string, Metric>;

// ==============================
// Conteúdo público
// ==============================
const tasks: TaskPublic[] = [
  {
    id: "t1",
    tag: "Tarefa 1 — Investor",
    title: "Encontrar Q3’22 e Q3’21 (comparar caixa).",
    highlightLabel: "Tempo",
    why:
      "Filtros por tipo/ano + agrupamento por “Financials/Quarterly” reduziu scroll e troca de abas.",
  },
  {
    id: "t2",
    tag: "Tarefa 2 — Researcher / Scientific community",
    title: "Validar evidência “Phase 3 / DefenCath” antes de baixar.",
    highlightLabel: "SEQ (1–7)",
    why:
      "Cards com resumo/abstract + filtro “Phase 3” eliminaram tentativa-e-erro de PDFs.",
  },
  {
    id: "t3",
    tag: "Tarefa 3 — Journalist",
    title: "Baixar logo oficial / Media Kit (hi-res).",
    highlightLabel: "Sucesso",
    why:
      "“Media Assets Library” virou destino claro no menu/hub (sem depender de Google).",
  },
  {
    id: "t4",
    tag: "Tarefa 4 — Investor / Top-down quick check",
    title: "Ver preço da ação e variação do dia (rápido).",
    highlightLabel: "Tempo",
    why:
      "Preço/ticker virou informação “passiva” (widget/atalho), reduzindo cliques e navegação.",
  },
  {
    id: "t5",
    tag: "Tarefa 5 — Investor (Top-down do board)",
    title: "Assinar Email Alerts (Results/SEC/News).",
    highlightLabel: "Sucesso",
    why:
      "CTA e destino previsíveis + linguagem direta (“Email Alerts”) reduziram busca por formulário escondido.",
  },
  {
    id: "t6",
    tag: "Tarefa 6 — Journalist / Media & Publications (Top-down do board)",
    title: "Encontrar press release mais recente sobre DefenCath.",
    highlightLabel: "Tempo",
    why:
      "Separação clara entre Press Releases vs SEC Filings + rotas de “Newsroom” evitaram confusão de taxonomia.",
  },
];

// ==============================
// Demo metrics (só para preview local)
// - Ative em dev com: NEXT_PUBLIC_TASK_RESULTS_DEV_UNLOCK=true
// ==============================
const DEMO_METRICS: MetricsMap = {
  t1: { highlightValue: "−61%", highlightDetail: "102s → 39s" },
  t2: { highlightValue: "+2.0", highlightDetail: "4.1 → 6.1" },
  t3: { highlightValue: "+34pp", highlightDetail: "50% → 84%" },
  t4: { highlightValue: "−48%", highlightDetail: "58s → 30s" },
  t5: { highlightValue: "+40pp", highlightDetail: "40% → 80%" },
  t6: { highlightValue: "−52%", highlightDetail: "96s → 46s" },
};

// ==============================
// UI: Card
// ==============================
function TaskCardUI({
  t,
  metric,
  locked,
}: {
  t: TaskPublic;
  metric?: Metric;
  locked: boolean;
}) {
  const m = metric;

  return (
    <div
      className="bg-white p-8 sm:p-10 overflow-hidden"
      style={maskFourCorners("md", FONT_SORA)}
    >
      <div className={`flex w-full flex-col ${STACK_24}`}>
        {/* Tag (laranja 16px) */}
        <p className="text-[16px] font-semibold leading-none text-[#FF4C2C]">
          {t.tag}
        </p>

        {/* Título */}
        <p className="text-[20px] font-medium leading-[1.35] text-black">
          {t.title}
        </p>

        {/* Highlight */}
        <div className={`flex flex-col ${STACK_12}`}>
          <p className="text-[14px] font-semibold leading-none text-[#6B6B6B]">
            {t.highlightLabel}
          </p>

          <div
            className={[
              "flex items-end gap-6",
              locked ? "justify-start" : "justify-between",
            ].join(" ")}
          >
            {locked ? (
              // ✅ Locked state: Ícone de cadeado (sem o texto da direita)
              <div className="flex items-center">
                <div className="relative h-[44px] w-[44px] sm:h-[52px] sm:w-[52px]">
                  <Image
                    src="/cadeado.svg"
                    alt="Dados protegidos"
                    fill
                    className="object-contain"
                    sizes="52px"
                    priority={false}
                  />
                </div>
              </div>
            ) : (
              <>
                <p className="text-[44px] font-semibold leading-none text-[#131415] sm:text-[52px]">
                  {m?.highlightValue ?? "—"}
                </p>

                {/* ✅ Só aparece quando desbloqueado */}
                <p className="text-[14px] font-semibold leading-none text-black">
                  {m?.highlightDetail ?? ""}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="h-px w-full bg-black/10" />

        {/* Por que melhorou */}
        <div className={`flex flex-col ${STACK_12}`}>
          <p className="text-[16px] font-semibold leading-none text-black/80">
            Por que melhorou
          </p>
          <p className="text-[16px] leading-[1.45] text-black/80">{t.why}</p>
        </div>
      </div>
    </div>
  );
}

// ==============================
// UI: Painel NDA (layout apenas)
// - Remove shadow
// - Aplica corners mask SVG
// ==============================
function NDAUnlockPanel({
  unlocked,
  loading,
  error,
  onUnlock,
}: {
  unlocked: boolean;
  loading: boolean;
  error: string | null;
  onUnlock: (password: string) => void;
}) {
  const [password, setPassword] = React.useState("");

  return (
    <div
      className="bg-white p-6 sm:p-7 overflow-hidden"
      style={maskFourCorners("md", {
        ...FONT_SORA,
        outline: "1px solid rgba(0,0,0,0.08)",
      })}
    >
      <div className={`flex flex-col ${STACK_24}`}>
        <p className="text-[16px] leading-[1.35] text-black/80">
          Para visualizar os números, adicione a senha ou{" "}
          <a
            href="https://www.linkedin.com/in/quefreen/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 hover:text-[#FF4C2C] transition-colors"
          >
            solicite aqui
          </a>
          .
        </p>

        <div className={`flex flex-col ${STACK_12}`}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={unlocked ? "Números liberados" : "Digite a senha"}
            disabled={unlocked || loading}
            className={[
              "w-full px-4 py-3 text-[16px] text-[#131415]",
              "rounded-[18px]",
              "bg-black/[0.04]",
              "outline-none",
              "ring-1 ring-black/10",
              "focus:ring-2 focus:ring-[#FF4C2C]/30",
              unlocked ? "opacity-60" : "",
            ].join(" ")}
            style={FONT_SORA}
          />

          <button
            type="button"
            onClick={() => onUnlock(password)}
            disabled={unlocked || loading || password.trim().length === 0}
            className={[
              "inline-flex items-center justify-center",
              "rounded-[18px] px-4 py-3",
              "text-[14px] font-semibold",
              "transition-colors",
              unlocked
                ? "bg-black/10 text-black/50 cursor-default"
                : "bg-[#131415] text-white hover:bg-black",
              loading ? "opacity-70" : "",
            ].join(" ")}
            style={FONT_SORA}
          >
            {unlocked ? "Acesso liberado" : loading ? "Validando..." : "Liberar números"}
          </button>

          {error ? (
            <p className="text-[14px] font-medium text-[#FF4C2C]">{error}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ==============================
// Componente final (layout pronto)
// ==============================
export default function TaskResultsGrid() {
  const DEV_AUTO_UNLOCK =
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_TASK_RESULTS_DEV_UNLOCK === "true";

  const [unlocked, setUnlocked] = React.useState<boolean>(DEV_AUTO_UNLOCK);
  const [metrics, setMetrics] = React.useState<MetricsMap>(
    DEV_AUTO_UNLOCK ? DEMO_METRICS : {}
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // (opcional) mantém o hook, mas silencioso (não quebra layout)
  React.useEffect(() => {
    // Se você ainda não criou as rotas, não tenta buscar nada.
    // Quando criar, pode remover este guard.
    return;
  }, []);

  async function handleUnlock(password: string) {
    setError(null);

    // ✅ Dev-only: para você conseguir visualizar sem perder tempo agora
    if (process.env.NODE_ENV === "development") {
      setLoading(true);
      setTimeout(() => {
        setMetrics(DEMO_METRICS);
        setUnlocked(true);
        setLoading(false);
      }, 350);
      return;
    }

    // Produção (quando você criar as rotas)
    setLoading(true);
    try {
      const res = await fetch("/api/task-results/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setUnlocked(false);
        setMetrics({});
        setError("Senha inválida. Se preferir, solicite via LinkedIn.");
        return;
      }

      const data = (await res.json()) as { metrics: MetricsMap };
      setMetrics(data.metrics ?? {});
      setUnlocked(true);
    } catch {
      setError("Erro ao validar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={`w-full ${SECTION_Y}`}>
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          <div className={TEXT_10}>
            <div className={`flex w-full flex-col ${STACK_40}`}>
              {/* Header: título + texto apoio + NDA panel */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-8">
                  <div className={`flex flex-col ${STACK_24}`}>
                    <div className="flex">
                      <span className="inline-flex items-center gap-4 rounded-[32px] bg-white px-3 py-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
                        <span className="text-lg font-semibold leading-none text-[#131415]">
                          Resultados por tarefa
                        </span>
                      </span>
                    </div>

                    <p className="text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
                      Evidência quantitativa na prática.
                    </p>

                    <p
                      className="text-[18px] leading-[1.45] text-black/70"
                      style={FONT_SORA}
                    >
                      Seis tarefas representativas comparando a experiência do legado vs.
                      a nova arquitetura — medindo eficiência e previsibilidade em
                      jornadas reais.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <NDAUnlockPanel
                    unlocked={unlocked}
                    loading={loading}
                    error={error}
                    onUnlock={handleUnlock}
                  />
                </div>
              </div>

              {/* Grid 2 col / 3 rows */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {tasks.map((t) => (
                  <TaskCardUI
                    key={t.id}
                    t={t}
                    locked={!unlocked}
                    metric={metrics[t.id]}
                  />
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
