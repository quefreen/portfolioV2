"use client";

import * as React from "react";
import type { CSSProperties } from "react";

// --- CONSTANTES DO LAYOUT (MESMAS DO BENTO) ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

// --- Fonte (seu padrão: Sora via variável) ---
const FONT_SORA: CSSProperties = {
  fontFamily: "var(--font-sora), ui-sans-serif, system-ui, sans-serif",
};

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

// ---------- Tipos ----------
type TaskPublic = {
  id: string;
  tag: string; // "Tarefa 1 — Investor"
  title: string;

  highlightLabel: string; // ex: "Tempo" / "Sucesso" / "SEQ (1–7)"
  why: string;
};

type Metric = {
  highlightValue: string;  // ex: "−61%"
  highlightDetail: string; // ex: "102s → 39s"
};

type MetricsMap = Record<string, Metric>;

// ---------- Conteúdo público (sem números!) ----------
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

// ---------- Placeholders (visualmente “criptografado”) ----------
function maskedMetric(label: string): Metric {
  if (label.toLowerCase().includes("seq")) {
    return { highlightValue: "^!#%", highlightDetail: "•,• → •,•" };
  }
  if (label.toLowerCase().includes("sucesso")) {
    return { highlightValue: "&*AS%", highlightDetail: "••% → ••%" };
  }
  // Tempo (default)
  return { highlightValue: "&*AS%", highlightDetail: "•••s → ••s" };
}

// ---------- UI: Card ----------
function TaskCardUI({
  t,
  metric,
  locked,
}: {
  t: TaskPublic;
  metric?: Metric;
  locked: boolean;
}) {
  const m = locked ? maskedMetric(t.highlightLabel) : metric;

  return (
    <div className="bg-white p-8 sm:p-10" style={{ ...CARD_MASK_STYLE, ...FONT_SORA }}>
      <div className="flex w-full flex-col gap-6">
        {/* Tag */}
        <p className="text-[14px] font-semibold leading-none text-[#FF4C2C]">
          {t.tag}
        </p>

        {/* Título */}
        <p className="text-[20px] font-medium leading-[1.35] text-black">
          {t.title}
        </p>

        {/* Highlight */}
        <div className="flex flex-col gap-2">
          <p className="text-[14px] font-semibold leading-none text-[#6B6B6B]">
            {t.highlightLabel}
          </p>

          <div className="flex items-end justify-between gap-6">
            <p className="text-[44px] font-semibold leading-none text-[#131415] sm:text-[52px]">
              {m?.highlightValue ?? maskedMetric(t.highlightLabel).highlightValue}
            </p>
            <p className="text-[14px] font-semibold leading-none text-black">
              {m?.highlightDetail ?? maskedMetric(t.highlightLabel).highlightDetail}
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-black/10" />

        {/* Por que melhorou */}
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

// ---------- UI: Painel NDA ----------
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
      className="bg-white p-6 sm:p-7"
      style={{
        ...FONT_SORA,
        borderRadius: 24,
        boxShadow: "0px 6px 22px rgba(0,0,0,0.06)",
        outline: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex flex-col gap-4">
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

        <div className="flex flex-col gap-3">
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
            <p className="text-[14px] font-medium text-[#FF4C2C]">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function TaskResultsGrid() {
  const [unlocked, setUnlocked] = React.useState(false);
  const [metrics, setMetrics] = React.useState<MetricsMap>({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // tenta recuperar automaticamente (cookie HttpOnly)
  React.useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetch("/api/task-results/metrics", { cache: "no-store" });
        if (!alive) return;

        if (res.ok) {
          const data = (await res.json()) as { metrics: MetricsMap };
          setMetrics(data.metrics ?? {});
          setUnlocked(true);
        }
      } catch {
        // silencioso (fica travado mesmo)
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  async function handleUnlock(password: string) {
    setError(null);
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
    <section className="w-full mt-24 sm:mt-32 lg:mt-48">
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          <div className={TEXT_10}>
            <div className="flex w-full flex-col gap-10">
              {/* Header: título + texto apoio + NDA panel */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-8">
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

                    {/* ✅ Texto de apoio (curto) */}
                    <p
                      className="text-[18px] leading-[1.45] text-black/70"
                      style={FONT_SORA}
                    >
                      Seis tarefas representativas comparando a experiência do legado vs. a nova arquitetura
                      — medindo eficiência e previsibilidade em jornadas reais.
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
