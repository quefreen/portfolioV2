// src/components/cormedix_case_intro.tsx
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
  initials: string;
  name: string;
  role: string;
};

const TEAM: TeamMember[] = [
  { initials: "RB", name: "Ricardo Brandão", role: "Project Manager" },
  { initials: "AM", name: "Ana Mahfuz", role: "Account Manager" },
  { initials: "DM", name: "Diego Muniz", role: "Full Stack" },
  { initials: "IA", name: "Igor Alvarez", role: "Tech Lead" },
  { initials: "LO", name: "Leticia Oliveira", role: "QA" },
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

// ✅ SPACING TOKENS
const SECTION_Y = "py-16 sm:py-20 lg:py-24"; // 64 / 80 / 96
const STACK_24 = "gap-6"; // 24px
const STACK_48 = "gap-12"; // 48px
const REL_P_TO_P = "gap-3"; // 12px (related paragraphs)
const REL_H_TO_BODY = "gap-6"; // 24px

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
      className={`h-full flex flex-col gap-2.5 bg-white p-8 sm:p-10 ${className}`}
      style={cardMask4Corners(size)}
    >
      {children}
    </div>
  );
}

// --- ANIMATED COUNTER ---
function AnimatedCounter({
  prefix = "",
  value,
  suffix = "",
  className = "",
}: {
  prefix?: string;
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    gsap.set(el, { autoAlpha: 0 });

    const obj = { val: 0 };
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, { autoAlpha: 1, duration: 0.3 });
        gsap.to(obj, {
          val: Math.abs(value),
          duration: 1.6,
          ease: "power2.out",
          onUpdate() {
            el.textContent = prefix + Math.round(obj.val) + suffix;
          },
        });
      },
    });

    return () => trigger.kill();
  }, [prefix, value, suffix]);

  return (
    <p ref={ref} className={className}>
      {prefix}0{suffix}
    </p>
  );
}

export default function CorMedixCaseIntro() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Fade-up individual elements
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

        // Stagger groups
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
          1) HERO / TITLE HEADER
         ========================= */}
      <div
        className="relative z-20 w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(225, 225, 225, 0) 50%, rgba(0, 143, 190 , 0.2) 100%), #F7F7F7",
        }}
      >
        <div className={SITE_CONTAINER}>
          <div className={GRID_12}>
            <div className={TEXT_10}>
              <div className={`${SECTION_Y} flex w-full items-start`}>
                <div className="flex w-full flex-col gap-12">
                  <div data-fade className="flex flex-col gap-4">
                    <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                      CORMEDIX
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm leading-none text-black">
                        Healthcare
                      </span>
                      <span className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm leading-none text-black">
                        B2B
                      </span>
                      <span className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm leading-none text-black">
                        Investors & Media
                      </span>
                    </div>

                    <h1 className="font-display text-[44px] font-semibold leading-[1.15] text-black sm:text-[52px] lg:text-[56px] lg:leading-[1.2]">
                      Prescribing data for confident decisions.
                    </h1>

                    <p className="text-lg font-semibold leading-[1.35] text-black sm:text-xl">
                      A new architecture to{" "}
                      <span className="text-[#028FBE]">
                        reduce uncertainty for investors and journalists.
                      </span>
                    </p>
                  </div>

                  {/* meta */}
                  <div
                    data-fade
                    className="grid w-full grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0"
                  >
                    <MetaItem label="ROLE" value="Product Designer" />
                    <MetaItem label="DURATION" value="3 months" />
                    <MetaItem label="TECHNOLOGIES" value="WordPress, Spline, CMS" />
                    <MetaItem label="DELIVERABLES" value="Information Architecture" />
                  </div>
                </div>
              </div>
            </div>

            {/* MEDIA (col-12) */}
            <div className={CONTENT_12}>
              <div className="relative -mt-6 h-[620px] w-full sm:mt-0">
                {/* WHITE BASE with TOP MASK (connector) */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10">
                  <div
                    className={`relative h-[128px] bg-white ${SHAPE_BLEED}`}
                    style={edgeMaskTop("lg")}
                  />
                </div>

                {/* THUMB (10 col) */}
                <div className="relative z-20 grid h-full grid-cols-4 gap-6 lg:grid-cols-12">
                  <div className="col-span-4 h-full lg:col-span-10 lg:col-start-2">
                    <div className="relative h-full w-full overflow-hidden bg-black">
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/cormedix_hero.mp4"
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
            "linear-gradient(0deg, rgba(225, 225, 225, 0) 0%, rgba(0, 143, 190 , 0.2) 100%), #F7F7F7",
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
                                      In 2023, during CorMedix's FDA application for its
                                      first product (DefenCath), the legacy site — over
                                      10 years old — became a liability:
                                    </p>

                                    <p className="text-lg leading-[1.45] text-[#131415]">
                                      <b>Investors</b> struggled to find official
                                      documents and reports with confidence.
                                    </p>

                                    <p className="text-lg leading-[1.45] text-[#131415]">
                                      <b>Media and the scientific community</b> had to
                                      dig through PDFs to validate clinical evidence.
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
                                        Investors-first — New Architecture
                                      </p>
                                      <p className="text-lg leading-[1.45] text-[#131415]">
                                        <b>Restructured and tested</b> access to critical
                                        information (SEC filings, financials, stock and
                                        presentations) into task-based hubs — reducing
                                        friction and{" "}
                                        <b>increasing navigation predictability</b>.
                                      </p>
                                    </div>

                                    <div className={`flex flex-col ${REL_P_TO_P}`}>
                                      <p className="text-lg font-semibold leading-none text-[#F54900]">
                                        Credibility & Governance
                                      </p>
                                      <p className="text-lg leading-[1.45] text-[#131415]">
                                        <b>Separated and measured</b> regulatory content
                                        vs. news — improving information scent and{" "}
                                        <b>reducing navigation errors</b>.
                                      </p>
                                    </div>

                                    <div className={`flex flex-col ${REL_P_TO_P}`}>
                                      <p className="text-lg font-semibold leading-none text-[#F54900]">
                                        Scalability
                                      </p>
                                      <p className="text-lg leading-[1.45] text-[#131415]">
                                        Delivered in WordPress with a full handoff and
                                        training — ensuring internal team autonomy,
                                        content governance rules, and a foundation for
                                        hub evolution without losing consistency.
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
                                        <div key={m.initials} className="relative">
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
                                            {m.initials}

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
                                    CorMedix (NASDAQ: CRMD)
                                  </p>
                                  <div className="h-px w-full bg-black/10" />
                                </div>

                                <div className="flex flex-col gap-3">
                                  <p className="text-base font-semibold leading-none text-[#747474]">
                                    Responsibilities
                                  </p>
                                  <p className="text-base leading-[1.45] text-[#131415]">
                                    UX Strategy • Information Architecture •
                                    Stakeholder Alignment (Legal/IR) •
                                    Implementation Support (QA + handoff)
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
                  className="w-full bg-[#C7E3EC]"
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
                              Measurable gains across critical journeys.
                            </p>
                          </div>

                          {/* Cards (3) */}
                          <div data-stagger className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            <div data-stagger-item>
                              <ImpactCard size="sm" className="border-2 border-white">
                                <AnimatedCounter
                                  prefix="−"
                                  value={61}
                                  suffix="%"
                                  className="text-[56px] font-semibold leading-[1.1] text-[#131415]"
                                />
                                <p className="text-lg font-semibold leading-[1.4] text-[#131415]">
                                  avg. completion time across 6 tasks (64s → 24s).
                                </p>
                              </ImpactCard>
                            </div>

                            <div data-stagger-item>
                              <ImpactCard size="sm">
                                <AnimatedCounter
                                  prefix="+"
                                  value={30}
                                  suffix="pp"
                                  className="text-[56px] font-semibold leading-[1.1] text-[#131415]"
                                />
                                <p className="text-lg font-semibold leading-[1.4] text-[#131415]">
                                  task success rate (63% → 93%).
                                </p>
                              </ImpactCard>
                            </div>

                            <div data-stagger-item>
                              <ImpactCard size="sm">
                                <AnimatedCounter
                                  prefix="−"
                                  value={82}
                                  suffix="%"
                                  className="text-[56px] font-semibold leading-[1.1] text-[#131415]"
                                />
                                <p className="text-lg font-semibold leading-[1.4] text-[#131415]">
                                  misclick rate (0.56 → 0.10) — reducing trial and error.
                                </p>
                              </ImpactCard>
                            </div>
                          </div>

                          {/* Divider group */}
                          <div data-fade className="pt-8">
                            <div className="flex flex-col gap-4">
                              <p className="text-[32px] font-semibold leading-[1.2] text-[#131415] sm:text-[40px]">
                                Sustainable delivery for the internal team.
                              </p>
                            </div>
                          </div>

                          {/* Cards (2) */}
                          <div data-stagger className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <div data-stagger-item>
                              <ImpactCard size="md">
                                <p className="text-[28px] font-semibold leading-[1.2] text-[#131415] sm:text-[32px]">
                                  WordPress + documentation
                                </p>
                                <p className="text-lg font-medium leading-[1.4] text-[#131415] sm:text-xl">
                                  enabling the team to publish, update, and scale pages
                                  independently — no design or dev dependency per update.
                                </p>
                              </ImpactCard>
                            </div>

                            <div data-stagger-item>
                              <ImpactCard size="md">
                                <p className="whitespace-pre-line text-[28px] font-semibold leading-[1.2] text-[#131415] sm:text-[32px]">
                                  Post-launch{"\n"}Roadmap
                                </p>
                                <p className="text-lg font-medium leading-[1.4] text-[#131415] sm:text-xl">
                                  A prioritized backlog for the post-DefenCath phase and
                                  scientific hub expansion.
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
