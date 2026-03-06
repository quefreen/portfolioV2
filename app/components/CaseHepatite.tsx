// src/components/case_hepatite_intro.tsx
"use client"

import type { CSSProperties } from "react";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type MetaItemProps = {
  label: string;
  value: string;
  align?: "left" | "right";
};

type TeamMember = {
  id: string;
  initials: string;
  name: string;
  role: string;
};

const TEAM: TeamMember[] = [
  {
    id: "jaqueline-assis",
    initials: "JA",
    name: "Jaqueline Assis",
    role: "Account Manager",
  },
  {
    id: "franciele-souza",
    initials: "FS",
    name: "Franciele Souza",
    role: "Project Manager",
  },
];

function MetaItem({ label, value, align = "left" }: MetaItemProps) {
  const alignCls =
    align === "right"
      ? "lg:items-end lg:text-right"
      : "lg:items-start lg:text-left";

  return (
    <div className={`flex w-full flex-col ${alignCls}`}>
      <p className="text-xs font-semibold tracking-wide text-neutral-500">
        {label}
      </p>
      <p className="mt-2 text-[16px] leading-[1.3] text-black">{value}</p>
    </div>
  );
}

// --- LAYOUT CONSTANTS ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";
const CONTENT_12 = "col-span-4 lg:col-span-12";

const SHAPE_BLEED = "-mx-4 md:-mx-8 lg:-mx-12 xl:mx-0";
const SHAPE_INNER_PAD = "px-4 sm:px-4 md:px-8 lg:px-12 xl:px-0";

const SECTION_Y = "py-16 sm:py-20 lg:py-24";
const STACK_24 = "gap-6";
const STACK_48 = "gap-12";
const REL_P_TO_P = "gap-3";
const REL_H_TO_BODY = "gap-6";

const OVERLAP_PX = 12;

// --- MASKS ---
function cornerClamp(size: "sm" | "md" | "lg") {
  if (size === "sm") return "clamp(24px, 4.5vw, 56px)";
  if (size === "md") return "clamp(32px, 6vw, 80px)";
  return "clamp(56px, 9vw, 140px)";
}

function cardMask4Corners(size: "sm" | "md" | "lg"): CSSProperties {
  const c = cornerClamp(size);
  return {
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
      ${c} auto,
      ${c} auto,
      ${c} auto,
      ${c} auto,
      100% 100%
    `,
    maskComposite: "exclude",
    WebkitMaskComposite: "xor",
  };
}

function edgeMaskBottom(size: "sm" | "md" | "lg"): CSSProperties {
  const c = cornerClamp(size);
  return {
    maskImage: `url(/esqbb.svg), url(/dirbb.svg), linear-gradient(#000, #000)`,
    maskPosition: "left bottom, right bottom, center",
    maskRepeat: "no-repeat",
    maskSize: `${c} auto, ${c} auto, 100% 100%`,
    maskComposite: "exclude",
    WebkitMaskComposite: "xor",
  };
}

function edgeMaskTop(size: "sm" | "md" | "lg"): CSSProperties {
  const c = cornerClamp(size);
  return {
    maskImage: `url(/esqtb.svg), url(/dirtb.svg), linear-gradient(#000, #000)`,
    maskPosition: "left top, right top, center",
    maskRepeat: "no-repeat",
    maskSize: `${c} auto, ${c} auto, 100% 100%`,
    maskComposite: "exclude",
    WebkitMaskComposite: "xor",
  };
}

function ImpactCard({
  children,
  size = "sm",
  className = "",
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <div
      className={`h-full flex flex-col gap-2.5 bg-white p-10 ${className}`}
      style={cardMask4Corners(size)}
    >
      {children}
    </div>
  );
}

export default function HepatiteCaseIntro() {
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
    <section ref={containerRef} className="w-full">
      {/* =========================
          1) HERO
         ========================= */}
      <div
        className="relative z-20 w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(225, 225, 225, 0) 50%, rgba(255, 242, 67, 0.2) 100%), #F7F7F7",
        }}
      >
        <div className={SITE_CONTAINER}>
          <div className={GRID_12}>
            <div className={TEXT_10}>
              <div className={`${SECTION_Y} flex w-full items-start`}>
                <div className="flex w-full flex-col gap-12">
                  <div data-fade className="flex flex-col gap-4">
                    <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                      GILEAD
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm leading-none text-black">
                        Content + Product
                      </span>
                      <span className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm leading-none text-black">
                        0→1 Discovery
                      </span>
                      <span className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm leading-none text-black">
                        Public Health
                      </span>
                    </div>

                    <h1 className="font-display text-[44px] font-semibold leading-[1.15] text-black sm:text-[52px] lg:text-[56px] lg:leading-[1.2]">
                      Fighting the epidemic of myths about Hepatitis C.
                    </h1>

                    <p className="text-lg font-semibold leading-[1.35] text-black sm:text-xl">
                      0→1 discovery:{" "}
                      <span className="text-[#FF9D00]">
                        5 mobile-first entry points guided by emotional states.
                      </span>
                    </p>
                  </div>

                  {/* meta */}
                  <div
                    data-fade
                    className="grid w-full grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0"
                  >
                    <MetaItem label="ROLE" value="Product Designer" />
                    <MetaItem label="DURATION" value="2 months" />
                    <MetaItem label="TECHNOLOGIES" value="Paper & Pencil, Research & Interviews" />
                    <MetaItem label="DELIVERABLES" value="Emotion-based funnel" />
                  </div>
                </div>
              </div>
            </div>

            {/* MEDIA */}
            <div className={CONTENT_12}>
              <div className="relative -mt-6 h-[620px] w-full sm:mt-0">
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10">
                  <div
                    className={`relative h-[128px] bg-white ${SHAPE_BLEED}`}
                    style={edgeMaskTop("lg")}
                  />
                </div>

                <div className="relative z-20 grid h-full grid-cols-4 gap-6 lg:grid-cols-12">
                  <div className="col-span-4 h-full lg:col-span-10 lg:col-start-2">
                    <div className="relative h-full w-full overflow-hidden bg-black">
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/hepatite_hero.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                      <img
                        src="/esqtb.svg"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 top-0 z-30 h-auto"
                        style={{ width: cornerClamp("lg") }}
                      />
                      <img
                        src="/dirtb.svg"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute right-0 top-0 z-30 h-auto"
                        style={{ width: cornerClamp("lg") }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          2) PROJECT SUMMARY
         ========================= */}
      <div
        className="relative z-10 w-full"
        style={{
          background:
            "linear-gradient(0deg, rgba(225, 225, 225, 0) 0%, rgba(255, 242, 67, 0.2) 100%), #F7F7F7",
          marginTop: `-${OVERLAP_PX}px`,
          paddingTop: `${OVERLAP_PX}px`,
        }}
      >
        <div className={`${SITE_CONTAINER} py-0`}>
          <div className={GRID_12}>
            <div className={CONTENT_12}>
              <div className={SHAPE_BLEED}>
                <div className="w-full bg-white">
                  <div className={SHAPE_INNER_PAD}>
                    <div className={GRID_12}>
                      <div className={TEXT_10}>
                        <div className={`${SECTION_Y} flex flex-col gap-12`}>
                          <div data-fade className="flex flex-col gap-4">
                            <p className="text-2xl font-semibold leading-[1.2] text-[#131415]">
                              Project Summary
                            </p>
                          </div>

                          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                            {/* Main content */}
                            <div className="lg:col-span-8">
                              <div className={`flex flex-col ${STACK_48}`}>
                                {/* Context */}
                                <div data-fade className={`flex flex-col ${REL_H_TO_BODY}`}>
                                  <p className="text-xl font-semibold leading-none text-[#131415]">
                                    Context
                                  </p>
                                  <div className={`flex flex-col ${REL_P_TO_P}`}>
                                    <p className="text-lg leading-[1.45] text-[#131415]">
                                      Brazil aims to eradicate Hepatitis C by 2030 — but the real user journey starts <b>before</b> the health system: on social media, myths, fear, and stigma.
                                    </p>
                                    <p className="text-lg leading-[1.45] text-[#131415]">
                                      Even with intent to act, <b>SUS barriers</b> (waitlists, bureaucracy, limited specialist access) make the path to treatment uncertain.
                                    </p>
                                  </div>
                                </div>

                                {/* Results */}
                                <div data-fade className={`flex flex-col ${REL_H_TO_BODY}`}>
                                  <p className="text-xl font-semibold leading-none text-[#131415]">
                                    Results
                                  </p>
                                  <div className="flex flex-col gap-8">
                                    <div className={`flex flex-col ${REL_P_TO_P}`}>
                                      <p className="text-lg font-semibold leading-none text-[#F54900]">
                                        Emotion-based entry points
                                      </p>
                                      <p className="text-lg leading-[1.45] text-[#131415]">
                                        Turned research into a product plan: designed <b>5 entry points guided by emotional states</b> (denial, fear, uncertainty, myths, and family support).
                                      </p>
                                    </div>
                                    <div className={`flex flex-col ${REL_P_TO_P}`}>
                                      <p className="text-lg font-semibold leading-none text-[#F54900]">
                                        Clear next steps + measurement
                                      </p>
                                      <p className="text-lg leading-[1.45] text-[#131415]">
                                        Each entry leads to a concrete action (WhatsApp / 0800 / testing locations) and includes an <b>Analytics Blueprint</b> — events and funnels ready for post-launch journey measurement.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-4">
                              <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-3">
                                  <div>
                                    <p className="text-base font-semibold leading-none text-[#747474]">
                                      Team
                                    </p>
                                    <div className="mt-3 flex items-center -space-x-2">
                                      {TEAM.map((m) => (
                                        <div key={m.id} className="relative">
                                          <div
                                            className={[
                                              "group",
                                              "relative flex h-12 w-12 items-center justify-center",
                                              "rounded-full border-2 border-white bg-[#D9D9D9]",
                                              "text-[14px] font-semibold leading-none text-[#131415]",
                                              "select-none",
                                              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4C2C]/30",
                                            ].join(" ")}
                                            tabIndex={0}
                                            aria-label={`${m.name} - ${m.role}`}
                                          >
                                            <span aria-hidden="true">{m.initials}</span>

                                            <div
                                              className={[
                                                "pointer-events-none absolute left-1/2 top-0 z-50",
                                                "-translate-x-1/2 -translate-y-[calc(100%+10px)]",
                                                "opacity-0 scale-95",
                                                "group-hover:opacity-100 group-hover:scale-100",
                                                "group-focus-visible:opacity-100 group-focus-visible:scale-100",
                                                "transition-all duration-150",
                                              ].join(" ")}
                                              role="tooltip"
                                              aria-hidden="true"
                                            >
                                              <div
                                                className={[
                                                  "w-[240px] bg-[#131415] px-4 py-3",
                                                  "shadow-[0_12px_30px_rgba(0,0,0,0.25)]",
                                                ].join(" ")}
                                              >
                                                <div className="flex flex-col gap-1">
                                                  <p className="text-[14px] font-semibold leading-[1.2] text-white">
                                                    {m.name}
                                                  </p>
                                                  <p className="text-[13px] font-medium leading-[1.2] text-white/75">
                                                    {m.role}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="h-px w-full bg-black/10" />
                                </div>

                                <div className="flex flex-col gap-3">
                                  <p className="text-base font-semibold leading-none text-[#747474]">
                                    Client
                                  </p>
                                  <p className="text-base leading-[1.45] text-[#131415]">
                                    Gilead
                                  </p>
                                  <div className="h-px w-full bg-black/10" />
                                </div>

                                <div className="flex flex-col gap-3">
                                  <p className="text-base font-semibold leading-none text-[#747474]">
                                    Responsibilities
                                  </p>
                                  <p className="text-base leading-[1.45] text-[#131415]">
                                    Research & synthesis • UX/Content strategy • Information architecture • Health literacy (tone/clarity) • Instrumentation (events + funnels)
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          3) IMPACT
         ========================= */}
      <div className="w-full">
        <div className={SITE_CONTAINER}>
          <div className={GRID_12}>
            <div className={CONTENT_12}>
              <div className={SHAPE_BLEED}>
                <div
                  className="w-full bg-[#FF9D00]"
                  style={edgeMaskBottom("lg")}
                >
                  <div className={SHAPE_INNER_PAD}>
                    <div className={GRID_12}>
                      <div className={TEXT_10}>
                        <div className={`${SECTION_Y} flex flex-col ${STACK_24}`}>
                          {/* Header */}
                          <div data-fade className="flex flex-col gap-4">
                            <p className="text-lg font-semibold leading-none text-[#131415]">
                              Impact
                            </p>
                            <p className="text-[32px] font-semibold leading-[1.2] text-[#131415] sm:text-[40px]">
                              Measurable progress in the SUS access funnel.
                            </p>
                          </div>

                          {/* Cards row 1 */}
                          <div data-stagger className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div data-stagger-item>
                              <ImpactCard size="sm" className="border-2 border-white">
                                <p className="text-[40px] font-semibold leading-[1.1] text-[#131415]">
                                  Lead Quality
                                </p>
                                <p className="text-lg font-semibold leading-[1.4] text-[#131415]">
                                  5 emotional-state entry points qualify demand before the scheduling channel.
                                </p>
                              </ImpactCard>
                            </div>

                            <div data-stagger-item>
                              <ImpactCard size="sm">
                                <p className="text-[40px] font-semibold leading-[1.1] text-[#131415]">
                                  Health Literacy
                                </p>
                                <p className="text-lg font-semibold leading-[1.4] text-[#131415]">
                                  Human tone + credibility heuristics to reduce anxiety and treatment barriers.
                                </p>
                              </ImpactCard>
                            </div>
                          </div>

                          {/* Cards row 2 */}
                          <div data-stagger className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div data-stagger-item>
                              <ImpactCard size="md">
                                <p className="text-[40px] font-semibold leading-[1.1] text-[#131415]">
                                  Modularity
                                </p>
                                <p className="text-lg font-medium leading-[1.4] text-[#131415] sm:text-xl">
                                  Content team can publish, update, and scale pages without design or dev dependency per update.
                                </p>
                              </ImpactCard>
                            </div>

                            <div data-stagger-item>
                              <ImpactCard size="md">
                                <p className="text-[40px] font-semibold leading-[1.1] text-[#131415]">
                                  Analytics Blueprint
                                </p>
                                <p className="text-lg font-medium leading-[1.4] text-[#131415] sm:text-xl">
                                  Event tracking + funnels ready for post-launch journey measurement.
                                </p>
                              </ImpactCard>
                            </div>
                          </div>
                        </div>
                      </div>
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
