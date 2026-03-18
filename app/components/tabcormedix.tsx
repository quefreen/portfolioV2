// src/components/architecture_tabs.tsx
"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    label: "Legacy Architecture",
    badge: 3,
    tone: "danger",
    imageSrc: "/sitemap_legadoB.jpg",
    imageAlt: "Legacy sitemap",
    cards: [
      {
        title: "Competing taxonomy across sections",
        highlight: "Duplicated menu items increase uncertainty.",
        body:
          "Similar content appears in multiple places, making the 'right destination' ambiguous. This weakens information scent and increases trial-and-error.",
      },
      {
        title: "Investors section is too flat",
        highlight: "Inside Investors, everything sits at the same level.",
        body:
          "Without intent-based grouping, users must scan the list and guess. Paths lose predictability and wrong clicks increase.",
      },
      {
        title: "No task-based orientation",
        highlight: "Organized by sector, not by user journeys.",
        body:
          "Navigation prioritizes broad areas (Company, Partnering, etc.) over recurring user needs. Result: more backtracking and external search dependency.",
      },
    ],
  },
  {
    key: "new",
    label: "New Architecture",
    badge: 3,
    tone: "success",
    imageSrc: "/sitemap_novoA.jpg",
    imageAlt: "New sitemap",
    cards: [
      {
        title: "Canonical destinations",
        highlight: "Specific labels reduce ambiguity.",
        body:
          "Generic terms became clear destinations (e.g., separating Press Releases from SEC Filings, naming Quarterly Results). Reduces trial-and-error and increases predictability.",
      },
      {
        title: "Dedicated Investor Hub",
        highlight: "From dropdown to standalone environment.",
        body:
          "The investors area got its own URL and menu, grouped by intent (Financials, Stock, Governance, Resources). On the main site, access becomes an explicit entry point.",
      },
      {
        title: "Segmented by user profile & need",
        highlight: "Entry points by audience, not by department.",
        body:
          "The main site focuses on product and science; the Investor Hub concentrates investor tasks (financial and governance). Each audience gets a natural path — less backtracking, more predictability.",
      },
    ],
  },
];

// --- LAYOUT CONSTANTS ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";
const CONTENT_12 = "col-span-4 lg:col-span-12";

// --- COLORS ---
const RED_ACCENT = "#F10000";
const GREEN_ACCENT = "#00A83A";
const TAB_ACTIVE_ACCENT = "#FF4C2C";

// --- MASKS ---
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
        {/* Colored header */}
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

        {/* Neutral body */}
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

  const CARDS_OVERLAP: CSSProperties = {
    marginTop: "calc(-1 * clamp(64px, 7vw, 120px))",
  };

  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          const items = group.querySelectorAll<HTMLElement>("[data-stagger-item]");
          if (!items.length) return;
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: { trigger: group, start: "top 85%", once: true },
            }
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={["w-full py-16 sm:py-20 lg:py-24", className].join(" ")}>
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          <div className={CONTENT_12}>
            <div data-fade className="relative">
              {/* Floating tabs */}
              <div className="absolute left-1/2 top-0 z-30 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="p-3"
                  style={{
                    background: "#F7F7F7",
                    ...mask4CornersHalfHeight("sm"),
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  }}
                >
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
                              aria-label={`Total items: ${t.badge}`}
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

              {/* Image area */}
              <div
                className="relative z-10 bg-white px-6 pt-8 pb-10 md:px-10"
                style={{
                  ...mask4Corners("lg"),
                  boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
                }}
              >
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

              {/* Cards (overlap) */}
              <div className="relative z-20" style={CARDS_OVERLAP}>
                <div className={GRID_12}>
                  <div className={TEXT_10}>
                    <div data-stagger className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      {activeTab.cards.map((c, idx) => (
                        <div key={idx} data-stagger-item>
                          <InsightCard tone={activeTab.tone} data={c} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
