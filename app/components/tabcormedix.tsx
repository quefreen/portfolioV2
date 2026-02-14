// src/components/architecture_tabs.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import type { CSSProperties } from "react";

type CardTone = "danger" | "success";

type InsightCardData = {
  title: string;
  highlight: string;
  body: string;
};

type TabData = {
  key: "legacy" | "new";
  label: string;
  badge: number;
  tone: CardTone;
  imageSrc: string;
  imageAlt: string;
  cards: InsightCardData[];
};

const DEFAULT_TABS: TabData[] = [
  {
    key: "legacy",
    label: "Arquitetura legado",
    badge: 3,
    tone: "danger",
    imageSrc: "/sitemap_legado.jpg",
    imageAlt: "",
    cards: [
      {
        title: "Taxonomia competindo entre seções",
        highlight: "Itens duplicados no menu criam mais incerteza.",
        body:
          'Conteúdos similares aparecem em mais de um lugar, deixando o “destino certo” ambíguo. Isso enfraquece o information scent e aumenta tentativa-e-erro.',
      },
      {
        title: "Investors é “flat” demais",
        highlight: "Dentro de Investors, tudo fica no mesmo nível.",
        body:
          'Sem agrupamento por intenção, o usuário precisa escanear a lista e “chutar” o item. O caminho perde previsibilidade e aumenta a chance de cliques errados.',
      },
      {
        title: "Falta de orientação por tarefas",
        highlight: "Divisão por setores e não por jornadas do usuário.",
        body:
          "A navegação prioriza áreas amplas (Company, Partnering, etc.) em vez de necessidades recorrentes de cada público. Resultado: mais backtracking e maior dependência de busca externa para concluir tarefas.",
      },
    ],
  },
  {
    key: "new",
    label: "Nova arquitetura",
    badge: 3,
    tone: "success",
    imageSrc: "/sitemap_novoA.jpg",
    imageAlt: "",
    cards: [
      {
        title: "Destinos canônicos",
        highlight: "Rótulos específicos reduzem ambiguidade.",
        body:
          "Termos genéricos viraram destinos claros (ex.: separar Press Releases de SEC Filings e explicitar Quarterly Results). Isso reduz “tentativa e erro” e aumenta previsibilidade.",
      },
      {
        title: "Investor Hub dedicado",
        highlight: "De dropdown a ambiente próprio.",
        body:
          "A área de investidores ganhou URL e menu próprios, com agrupamentos por intenção (Financials, Stock, Governance, Resources). No site institucional, o acesso vira um entry point explícito.",
      },
      {
        title: "Divisão por perfil e necessidade do usuário",
        highlight: "Pontos de entrada por público, não por departamento.",
        body:
          "O site principal foca em produto e ciência; o Investor Hub concentra tarefas de investidores (financeiro e governança). Cada público ganha um caminho natural, com menos backtracking e mais previsibilidade.",
      },
    ],
  },
];

// --- PADRÃO DO SITE (OBRIGATÓRIO) ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";
const CONTENT_12 = "col-span-4 lg:col-span-12";

// --- CORES (não alterar) ---
// ✅ Cards
const RED_ACCENT = "#F10000";
const GREEN_ACCENT = "#00A83A";
// ✅ Tabs (sempre laranja no active)
const TAB_ACTIVE_ACCENT = "#FF4C2C";

// --- HELPERS: MASKS / CORNERS ---
type CornerSize = "sm" | "md" | "lg";

function cornerClamp(size: CornerSize) {
  if (size === "sm") return "clamp(28px, 5vw, 72px)";
  if (size === "lg") return "clamp(56px, 9vw, 140px)";
  return "clamp(32px, 6vw, 80px)";
}

function mask4Corners(size: CornerSize): CSSProperties {
  const c = cornerClamp(size);

  const maskImage = `
    url(/esqtb.svg),
    url(/dirtb.svg),
    url(/esqbb.svg),
    url(/dirbb.svg),
    linear-gradient(#000, #000)
  `;

  const maskPosition = `
    left top,
    right top,
    left bottom,
    right bottom,
    center
  `;

  const maskSize = `
    ${c} auto,
    ${c} auto,
    ${c} auto,
    ${c} auto,
    100% 100%
  `;

  return {
    maskImage,
    maskPosition,
    maskRepeat: "no-repeat",
    maskSize,
    maskComposite: "exclude, exclude, exclude, exclude" as any,

    WebkitMaskImage: maskImage as any,
    WebkitMaskPosition: maskPosition as any,
    WebkitMaskRepeat: "no-repeat" as any,
    WebkitMaskSize: maskSize as any,
    WebkitMaskComposite: "xor, xor, xor, xor" as any,
  };
}

function mask4CornersHalfHeight(size: CornerSize): CSSProperties {
  const c = cornerClamp(size);
  const cHalf = `calc(${c} / 2)`;

  const maskImage = `
    url(/esqtb.svg),
    url(/dirtb.svg),
    url(/esqbb.svg),
    url(/dirbb.svg),
    linear-gradient(#000, #000)
  `;

  const maskPosition = `
    left top,
    right top,
    left bottom,
    right bottom,
    center
  `;

  const maskSize = `
    ${cHalf} auto,
    ${cHalf} auto,
    ${cHalf} auto,
    ${cHalf} auto,
    100% 100%
  `;

  return {
    maskImage,
    maskPosition,
    maskRepeat: "no-repeat",
    maskSize,
    maskComposite: "exclude, exclude, exclude, exclude" as any,

    WebkitMaskImage: maskImage as any,
    WebkitMaskPosition: maskPosition as any,
    WebkitMaskRepeat: "no-repeat" as any,
    WebkitMaskSize: maskSize as any,
    WebkitMaskComposite: "xor, xor, xor, xor" as any,
  };
}

// ✅ máscara “inset” para alinhar o corner do conteúdo ao stroke
function mask4CornersInset(size: CornerSize, insetPx: number): CSSProperties {
  const c = cornerClamp(size);
  const ci = `calc(${c} - ${insetPx}px)`;

  const maskImage = `
    url(/esqtb.svg),
    url(/dirtb.svg),
    url(/esqbb.svg),
    url(/dirbb.svg),
    linear-gradient(#000, #000)
  `;

  const maskPosition = `
    left top,
    right top,
    left bottom,
    right bottom,
    center
  `;

  const maskSize = `
    ${ci} auto,
    ${ci} auto,
    ${ci} auto,
    ${ci} auto,
    100% 100%
  `;

  return {
    maskImage,
    maskPosition,
    maskRepeat: "no-repeat",
    maskSize,
    maskComposite: "exclude, exclude, exclude, exclude" as any,

    WebkitMaskImage: maskImage as any,
    WebkitMaskPosition: maskPosition as any,
    WebkitMaskRepeat: "no-repeat" as any,
    WebkitMaskSize: maskSize as any,
    WebkitMaskComposite: "xor, xor, xor, xor" as any,
  };
}

function InsightCard({ tone, data }: { tone: CardTone; data: InsightCardData }) {
  const isDanger = tone === "danger";
  const accent = isDanger ? RED_ACCENT : GREEN_ACCENT;

  const STROKE_PX = 4;
  const INSET_PX = STROKE_PX * 2;

  const iconSrc = isDanger ? "/danger.svg" : "/green.svg";

  return (
    <div
      className="h-full"
      style={{
        ...mask4Corners("md"),
        background: accent,
        padding: STROKE_PX,
      }}
    >
      <div
        className="flex h-full flex-col overflow-hidden bg-white"
        style={mask4CornersInset("md", INSET_PX)}
      >
        {/* Header colorido */}
        <div
          className="px-4 py-2.5 flex items-center justify-center text-center"
          style={{
            background: accent,
            height: "calc(var(--spacing) * 18)",
          }}
        >
          <div className="text-white text-sm md:text-base font-semibold leading-5">
            {data.title}
          </div>
        </div>

        {/* Body neutro — preenche até o final */}
        <div className="bg-white p-6 flex flex-1 flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8">
              <Image src={iconSrc} alt="" fill aria-hidden="true" />
            </div>

            <div
              className="text-sm md:text-base font-semibold leading-5"
              style={{ color: accent }}
            >
              {data.highlight}
            </div>
          </div>

          <div className="h-px w-full bg-black/80" />

          <p className="text-neutral-900 text-sm md:text-base leading-6">
            {data.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ArchitectureTabs({
  tabs = DEFAULT_TABS,
  defaultTab,
  className = "",
}: {
  tabs?: TabData[];
  defaultTab?: TabData["key"];
  className?: string;
}) {
  const [active, setActive] = React.useState<TabData["key"]>(() => {
    return defaultTab ?? tabs[0]?.key ?? "legacy";
  });

  const activeTab = tabs.find((t) => t.key === active) ?? tabs[0];

  // Cards invadem a área de cima — reduz a altura do “fundo branco/imagem”
  const CARDS_OVERLAP: CSSProperties = {
    marginTop: "calc(-1 * clamp(64px, 7vw, 120px))",
  };

  return (
    <section className={["w-full py-16 sm:py-20 lg:py-24", className].join(" ")}>
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          {/* ✅ Shell branco (largura grande) permanece em CONTENT_12 */}
          <div className={CONTENT_12}>
            <div className="relative">
              {/* Tabs flutuantes */}
              <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2">
                {/* wrapper ao redor do grupo */}
                <div
                  className="p-3"
                  style={{
                    background: "#F7F7F7",
                    ...mask4CornersHalfHeight("sm"),
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* ✅ grupo “pílula” (botões grudados) */}
                  <div className="w-full" style={mask4CornersHalfHeight("sm")}>
                    <div className="flex w-full overflow-hidden bg-white">
                      {tabs.map((t) => {
                        const isActive = t.key === active;

                        return (
                          <button
                            key={t.key}
                            type="button"
                            onClick={() => setActive(t.key)}
                            role="tab"
                            aria-selected={isActive}
                            className={[
                              "flex-1",
                              "px-10 py-5",
                              "md:px-12 md:py-6",
                              "lg:px-14",
                              "flex items-center justify-between gap-4",
                              "transition-colors",
                              "min-w-[240px] md:min-w-[280px] lg:min-w-[320px]",
                              "text-left",
                            ].join(" ")}
                            style={{
                              background: isActive ? TAB_ACTIVE_ACCENT : "#FFFFFF",
                              color: isActive ? "#FFFFFF" : "#9A9A9A",
                            }}
                          >
                            <span className="text-base md:text-lg lg:text-xl font-semibold leading-none lg:whitespace-nowrap">
                              {t.label}
                            </span>

                            <span
                              className="inline-flex h-7 w-7 shrink-0 aspect-square items-center justify-center rounded-full text-sm font-semibold leading-none"
                              style={{
                                background: isActive
                                  ? "rgba(255,255,255,0.20)"
                                  : "rgba(0,0,0,0.06)",
                                color: isActive ? "#fff" : "#9A9A9A",
                              }}
                              aria-label={`Total de itens: ${t.badge}`}
                            >
                              {t.badge}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fundo branco (vai virar imagem): largura/altura mantidas */}
              <div
                className="relative z-10 bg-white px-6 pt-8 pb-10 md:px-10"
                style={{
                  ...mask4Corners("lg"),
                  boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
                }}
              >
                {/* Área da imagem */}
                <div className="bg-white/30 p-4 sm:p-6" style={mask4Corners("md")}>
                  <div className="relative w-full">
                    <div className="relative w-full aspect-[16/9] md:aspect-[14/9]">
                      <Image
                        src={activeTab.imageSrc}
                        alt={activeTab.imageAlt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 1400px"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ Cards dentro do limite do conteúdo (TEXT_10), mantendo o overlap */}
              <div className="relative z-20" style={CARDS_OVERLAP}>
                <div className={GRID_12}>
                  <div className={TEXT_10}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      {activeTab.cards.map((c, idx) => (
                        <InsightCard key={idx} tone={activeTab.tone} data={c} />
                      ))}
                    </div>
                  </div>
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
