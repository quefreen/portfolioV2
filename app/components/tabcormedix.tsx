// src/components/architecture_tabs.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import type { CSSProperties } from "react";

type CardTone = "danger" | "success";

type InsightCardData = {
  title: string; // topo do card
  highlight: string; // linha com ícone
  body: string; // texto menor
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
    imageSrc: "/cormedix/sitemap-legacy.png",
    imageAlt: "Sitemap legado (estrutura anterior)",
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
    imageSrc: "/cormedix/sitemap-new.png",
    imageAlt: "Sitemap novo (arquitetura proposta)",
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

// --- CONSTANTES DO LAYOUT (PADRÃO DO SITE) ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

// --- CORES (ajuste aqui se quiser) ---
const RED_ACCENT = "#FF4C2C";
const GREEN_ACCENT = "#00A83A"; // verde “forte” como o do print

// --- MÁSCARA (CORNERS) ---
const CORNER_MASK_MD: CSSProperties = {
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
  WebkitMaskImage: `
    url(/esqtb.svg),
    url(/dirtb.svg),
    url(/esqbb.svg),
    url(/dirbb.svg),
    linear-gradient(#000, #000)
  `,
  WebkitMaskPosition: `
    left top,
    right top,
    left bottom,
    right bottom,
    center
  `,
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskSize: `
    clamp(32px, 6vw, 80px) auto,
    clamp(32px, 6vw, 80px) auto,
    clamp(32px, 6vw, 80px) auto,
    clamp(32px, 6vw, 80px) auto,
    100% 100%
  `,
  WebkitMaskComposite: "xor",
};

// shell (corners maiores)
const CORNER_MASK_LG: CSSProperties = {
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
    clamp(56px, 9vw, 140px) auto,
    clamp(56px, 9vw, 140px) auto,
    clamp(56px, 9vw, 140px) auto,
    clamp(56px, 9vw, 140px) auto,
    100% 100%
  `,
  maskComposite: "exclude",
  WebkitMaskImage: `
    url(/esqtb.svg),
    url(/dirtb.svg),
    url(/esqbb.svg),
    url(/dirbb.svg),
    linear-gradient(#000, #000)
  `,
  WebkitMaskPosition: `
    left top,
    right top,
    left bottom,
    right bottom,
    center
  `,
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskSize: `
    clamp(56px, 9vw, 140px) auto,
    clamp(56px, 9vw, 140px) auto,
    clamp(56px, 9vw, 140px) auto,
    clamp(56px, 9vw, 140px) auto,
    100% 100%
  `,
  WebkitMaskComposite: "xor",
};

function toneStyles(tone: CardTone) {
  const isDanger = tone === "danger";
  const accent = isDanger ? RED_ACCENT : GREEN_ACCENT;

  return {
    accent,
    headerBg: isDanger ? `bg-[${RED_ACCENT}]` : `bg-[${GREEN_ACCENT}]`,
    accentText: isDanger ? `text-[${RED_ACCENT}]` : `text-[${GREEN_ACCENT}]`,
    iconBg: isDanger ? `bg-[${RED_ACCENT}]/10` : `bg-[${GREEN_ACCENT}]/10`,
    iconStroke: isDanger ? `text-[${RED_ACCENT}]` : `text-[${GREEN_ACCENT}]`,
  };
}

function ThumbsUpIcon({ color }: { color: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 11v10H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h3Zm0 0 5-8a2 2 0 0 1 3.7 1.3L14 11h6a2 2 0 0 1 2 2l-1 6a2 2 0 0 1-2 2H7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertIcon({ color }: { color: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 9v4m0 4h.01M10.3 3.5 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.5a2 2 0 0 0-3.4 0Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ✅ CARD: mesma UI de antes, só trocando o corner pra máscara
function InsightCard({
  tone,
  data,
}: {
  tone: CardTone;
  data: InsightCardData;
}) {
  const isDanger = tone === "danger";
  const accent = isDanger ? RED_ACCENT : GREEN_ACCENT;

  return (
    <div className="flex flex-col overflow-hidden" style={CORNER_MASK_MD}>
      {/* Header colorido */}
      <div
        className="h-14 px-4 py-2.5 flex items-center justify-center text-center"
        style={{ background: accent }}
      >
        <div className="text-white text-sm md:text-base font-semibold leading-5">
          {data.title}
        </div>
      </div>

      {/* Body neutro */}
      <div className="bg-neutral-100 p-6 flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: `${accent}14` }} // ~10% alpha
          >
            {isDanger ? (
              <AlertIcon color={accent} />
            ) : (
              <ThumbsUpIcon color={accent} />
            )}
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
  );
}

export function ArchitectureTabs({
  tabs = DEFAULT_TABS,
  defaultTab = "new",
  className = "",
}: {
  tabs?: TabData[];
  defaultTab?: TabData["key"];
  className?: string;
}) {
  const [active, setActive] = React.useState<TabData["key"]>(defaultTab);
  const activeTab = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <section className={["w-full mt-24 sm:mt-32 lg:mt-48", className].join(" ")}>
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          <div className={TEXT_10}>
            <div className="relative">
              {/* Tabs flutuantes */}
              <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="bg-white p-2"
                  style={{
                    ...CORNER_MASK_MD,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="flex overflow-hidden rounded-3xl bg-white">
                    {tabs.map((t, idx) => {
                      const isActive = t.key === active;
                      const accent =
                        t.tone === "danger" ? RED_ACCENT : GREEN_ACCENT;

                      return (
                        <button
                          key={t.key}
                          type="button"
                          onClick={() => setActive(t.key)}
                          className={[
                            "px-8 md:px-12 py-5 md:py-6",
                            "flex items-center gap-4",
                            "transition-colors",
                            idx === 0 ? "rounded-l-3xl" : "rounded-r-3xl",
                            isActive ? "text-white" : "bg-white text-zinc-400",
                          ].join(" ")}
                          style={{
                            background: isActive ? accent : "transparent",
                          }}
                          role="tab"
                          aria-selected={isActive}
                        >
                          <span className="text-base md:text-xl font-semibold leading-5">
                            {t.label}
                          </span>

                          <span
                            className={[
                              "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-semibold",
                            ].join(" ")}
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

              {/* Shell branco (sem roxo), com corners máscara */}
              <div
                className="bg-white px-6 pb-8 pt-20 md:px-10 md:pb-10"
                style={{
                  ...CORNER_MASK_LG,
                  boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
                }}
              >
                {/* Imagem por tab */}
                <div className="bg-white/30 p-4 sm:p-6" style={CORNER_MASK_MD}>
                  <div className="relative w-full">
                    <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
                      <Image
                        src={activeTab.imageSrc}
                        alt={activeTab.imageAlt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 1240px"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Cards */}
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                  {activeTab.cards.map((c, idx) => (
                    <InsightCard key={idx} tone={activeTab.tone} data={c} />
                  ))}
                </div>
              </div>
              {/* /shell */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
