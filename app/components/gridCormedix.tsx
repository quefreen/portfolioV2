"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ==============================
// Grid and containers
// ==============================
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

// ==============================
// Spacing
// ==============================
const SECTION_Y = "py-16 sm:py-20 lg:py-24";
const STACK_12 = "gap-3";  // 12px
const STACK_24 = "gap-6";  // 24px
const STACK_40 = "gap-10"; // 40px
const STACK_48 = "gap-12"; // 48px

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
// Types
// ==============================
type TaskPublic = {
  id: string;
  tag: string;
  title: string;
  highlightLabel: string;
  why: string;
};

type Metric = {
  highlightValue: string;
  highlightDetail: string;
};

type MetricsMap = Record<string, Metric>;

// ==============================
// Task data
// ==============================
const tasks: TaskPublic[] = [
  {
    id: "t1",
    tag: "Task 1 — Investor",
    title: "Find Q3'22 and Q3'21 (compare cash position).",
    highlightLabel: "Time",
    why:
      "Type/year filters + 'Financials/Quarterly' grouping reduced scrolling and tab-switching.",
  },
  {
    id: "t2",
    tag: "Task 2 — Researcher / Scientific Community",
    title: "Validate 'Phase 3 / DefenCath' evidence before downloading.",
    highlightLabel: "SEQ (1–7)",
    why:
      "Cards with summary/abstract + 'Phase 3' filter eliminated PDF trial-and-error.",
  },
  {
    id: "t3",
    tag: "Task 3 — Journalist",
    title: "Download the official logo / Media Kit (hi-res).",
    highlightLabel: "Success",
    why:
      "'Media Assets Library' became a clear destination in the hub menu — no Google needed.",
  },
  {
    id: "t4",
    tag: "Task 4 — Investor / Top-down quick check",
    title: "Check stock price and daily change (quick).",
    highlightLabel: "Time",
    why:
      "Price/ticker became passive information (widget/shortcut), reducing clicks and navigation.",
  },
  {
    id: "t5",
    tag: "Task 5 — Investor (Top-down from board)",
    title: "Subscribe to Email Alerts (Results/SEC/News).",
    highlightLabel: "Success",
    why:
      "Predictable CTA + direct label ('Email Alerts') eliminated the search for a hidden form.",
  },
  {
    id: "t6",
    tag: "Task 6 — Journalist / Media & Publications (Top-down from board)",
    title: "Find the most recent DefenCath press release.",
    highlightLabel: "Time",
    why:
      "Clear separation between Press Releases vs SEC Filings + 'Newsroom' paths prevented taxonomy confusion.",
  },
];

// ==============================
// Demo metrics (dev preview only)
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
// UI: Task card
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
      className="h-full bg-white p-8 sm:p-10 overflow-hidden"
      style={maskFourCorners("md")}
    >
      <div className={`flex w-full flex-col ${STACK_24}`}>
        <p className="text-[16px] font-semibold leading-none text-[#FF4C2C]">
          {t.tag}
        </p>

        <p className="text-[20px] font-medium leading-[1.35] text-black">
          {t.title}
        </p>

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
              <div className="flex items-center">
                <div className="relative h-[44px] w-[44px] sm:h-[52px] sm:w-[52px]">
                  <Image
                    src="/cadeado.svg"
                    alt="Protected data"
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
                <p className="text-[14px] font-semibold leading-none text-black">
                  {m?.highlightDetail ?? ""}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="h-px w-full bg-black/10" />

        <div className={`flex flex-col ${STACK_12}`}>
          <p className="text-[16px] font-semibold leading-none text-black/80">
            Why it improved
          </p>
          <p className="text-[16px] leading-[1.45] text-black/80">{t.why}</p>
        </div>
      </div>
    </div>
  );
}

// ==============================
// UI: NDA Unlock Panel
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
        outline: "1px solid rgba(0,0,0,0.08)",
      })}
    >
      <div className={`flex flex-col ${STACK_24}`}>
        <p className="text-[16px] leading-[1.35] text-black/80">
          To view the data, enter the password or{" "}
          <a
            href="https://www.linkedin.com/in/quefreen/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-2 hover:text-[#FF4C2C] transition-colors"
          >
            request access here
          </a>
          .
        </p>

        <div className={`flex flex-col ${STACK_12}`}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={unlocked ? "Access granted" : "Enter password"}
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
          >
            {unlocked ? "Access granted" : loading ? "Validating..." : "Unlock data"}
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
// Main component
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

  const containerRef = useRef<HTMLElement>(null);

  React.useEffect(() => {
    return;
  }, []);

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

  async function handleUnlock(password: string) {
    setError(null);

    if (process.env.NODE_ENV === "development") {
      setLoading(true);
      setTimeout(() => {
        setMetrics(DEMO_METRICS);
        setUnlocked(true);
        setLoading(false);
      }, 350);
      return;
    }

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
        setError("Invalid password. Feel free to request access via LinkedIn.");
        return;
      }

      const data = (await res.json()) as { metrics: MetricsMap };
      setMetrics(data.metrics ?? {});
      setUnlocked(true);
    } catch {
      setError("Validation error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section ref={containerRef} className={`w-full ${SECTION_Y}`}>
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          <div className={TEXT_10}>
            <div className={`flex w-full flex-col ${STACK_40}`}>
              {/* Header */}
              <div data-fade className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-8">
                  <div className={`flex flex-col ${STACK_24}`}>
                    <div className="flex">
                      <span className="inline-flex items-center gap-4 rounded-[32px] bg-white px-3 py-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
                        <span className="text-lg font-semibold leading-none text-[#131415]">
                          Results by Task
                        </span>
                      </span>
                    </div>

                    <p className="text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
                      Quantitative evidence in practice.
                    </p>

                    <p className="text-[18px] leading-[1.45] text-black/70">
                      Six representative tasks comparing the legacy experience vs.
                      the new architecture — measuring efficiency and predictability
                      across real user journeys.
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
              <div data-stagger className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {tasks.map((t) => (
                  <div key={t.id} data-stagger-item>
                    <TaskCardUI
                      t={t}
                      locked={!unlocked}
                      metric={metrics[t.id]}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
