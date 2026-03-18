// src/components/problem_discovery_cormedix.tsx
"use client"

import type { CSSProperties } from "react";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
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
const CONTENT_12 = "col-span-4 lg:col-span-12";

// ==============================
// Bleed
// ==============================
const SHAPE_BLEED = "-mx-4 md:-mx-8 lg:-mx-12 xl:mx-0";
const SHAPE_INNER_PAD = "px-4 sm:px-4 md:px-8 lg:px-12 xl:px-0";

// ==============================
// Spacing — Section Y: 64/80/96
// ==============================
const SECTION_Y = "py-16 sm:py-20 lg:py-24";

// ==============================
// Spacing tokens
// ==============================
const STACK_12 = "gap-3";  // 12px — tightly related
const STACK_24 = "gap-6";  // 24px — base
const STACK_32 = "gap-8";  // 32px
const STACK_40 = "gap-10"; // 40px
const STACK_48 = "gap-12"; // 48px
const STACK_64 = "gap-16"; // 64px — between major sub-sections

// ==============================
// Masks / corners helpers
// ==============================
type CornerSize = "sm" | "md" | "lg";

function cornerClamp(size: CornerSize) {
  if (size === "sm") return "clamp(24px, 4.5vw, 56px)";
  if (size === "md") return "clamp(32px, 6vw, 80px)";
  return "clamp(56px, 9vw, 140px)";
}

function maskFourCorners(
  corner: CornerSize,
  extra?: CSSProperties
): CSSProperties {
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

function maskTopOnly(corner: CornerSize, extra?: CSSProperties): CSSProperties {
  const c = cornerClamp(corner);

  const MASK_IMAGE = `
    url(/esqtb.svg),
    url(/dirtb.svg),
    linear-gradient(#000, #000)
  `;
  const MASK_POSITION = `
    left top,
    right top,
    center
  `;
  const MASK_SIZE = `
    ${c} auto,
    ${c} auto,
    100% 100%
  `;

  return {
    maskImage: MASK_IMAGE,
    maskPosition: MASK_POSITION,
    maskRepeat: "no-repeat",
    maskSize: MASK_SIZE,
    maskComposite: "exclude" as any,

    WebkitMaskImage: MASK_IMAGE as any,
    WebkitMaskPosition: MASK_POSITION as any,
    WebkitMaskRepeat: "no-repeat" as any,
    WebkitMaskSize: MASK_SIZE as any,
    WebkitMaskComposite: "xor" as any,

    ...extra,
  };
}

function maskBottomOnly(
  corner: CornerSize,
  extra?: CSSProperties
): CSSProperties {
  const c = cornerClamp(corner);

  const MASK_IMAGE = `
    url(/esqbb.svg),
    url(/dirbb.svg),
    linear-gradient(#000, #000)
  `;
  const MASK_POSITION = `
    left bottom,
    right bottom,
    center
  `;
  const MASK_SIZE = `
    ${c} auto,
    ${c} auto,
    100% 100%
  `;

  return {
    maskImage: MASK_IMAGE,
    maskPosition: MASK_POSITION,
    maskRepeat: "no-repeat",
    maskSize: MASK_SIZE,
    maskComposite: "exclude" as any,

    WebkitMaskImage: MASK_IMAGE as any,
    WebkitMaskPosition: MASK_POSITION as any,
    WebkitMaskRepeat: "no-repeat" as any,
    WebkitMaskSize: MASK_SIZE as any,
    WebkitMaskComposite: "xor" as any,

    ...extra,
  };
}

// ==============================
// UI pieces
// ==============================
type InfoCardProps = {
  title: string;
  body: string;
  corner?: CornerSize;
};

function InfoCard({ title, body, corner = "sm" }: InfoCardProps) {
  return (
    <div className="h-full bg-white p-8 sm:p-10" style={maskFourCorners(corner)}>
      <div className={`flex flex-col ${STACK_12}`}>
        <p className="text-[16px] font-semibold leading-none text-[#FF4C2C]">
          {title}
        </p>
        <p className="text-xl leading-[1.45] text-black">{body}</p>
      </div>
    </div>
  );
}

function MaskedCard({
  children,
  corner = "md",
  className = "",
}: {
  children: React.ReactNode;
  corner?: CornerSize;
  className?: string;
}) {
  return (
    <div
      className={`w-full bg-white p-10 sm:p-12 ${className}`}
      style={maskFourCorners(corner)}
    >
      {children}
    </div>
  );
}

function SectionHeader({ caption, title }: { caption: string; title: string }) {
  return (
    <div className={`flex flex-col ${STACK_24}`}>
      <div className="flex">
        <span className="inline-flex items-center gap-2 rounded-[32px] bg-white px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
          <span className="text-lg font-semibold leading-none text-[#131415]">
            {caption}
          </span>
        </span>
      </div>

      <p className="text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
        {title}
      </p>
    </div>
  );
}

// ==============================
// Validation cards
// ==============================
type ValidationCard = {
  title: string;
  body: string;
};

function ValidationInfoCard({ title, body }: ValidationCard) {
  return (
    <div
      className="h-full bg-white p-10 sm:p-12 lg:p-16"
      style={maskFourCorners("md")}
    >
      <div className={`flex h-full flex-col justify-center ${STACK_12}`}>
        <p className="text-xl font-medium leading-6 text-[#FF4C2C]">{title}</p>
        <p className="text-xl font-medium leading-6 text-black">{body}</p>
      </div>
    </div>
  );
}

// ==============================
// Main component
// ==============================
export default function ProblemDiscoveryCormedix() {
  const containerRef = useRef<HTMLDivElement>(null);

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

  const validationCards: ValidationCard[] = [
    {
      title: "Participants",
      body: "6 investors + 8 media and scientific community members",
    },
    {
      title: "Format",
      body: "Prototype navigation test with 6 critical tasks",
    },
    {
      title: "Task Selection",
      body: "4 defined by me + 2 requested directly by the business team",
    },
    {
      title: "Metrics",
      body: "Task success, completion time, misclicks, and SEQ (1–7)",
    },
  ];

  return (
    <div ref={containerRef}>
      {/* ==============================
          BLOCK 1 — Problem + Discovery + Insights
         ============================== */}
      <section className={`w-full ${SECTION_Y}`}>
        <div className={SITE_CONTAINER}>
          <div className={GRID_12}>
            <div className={TEXT_10}>
              <div className={`flex w-full flex-col ${STACK_64}`}>
                {/* ======================
                    PROBLEM
                   ====================== */}
                <div className={`flex flex-col ${STACK_24}`}>
                  <div data-fade>
                    <SectionHeader
                      caption="Problem"
                      title="A legacy site under high-stakes pressure."
                    />
                  </div>

                  <p data-fade className="text-xl leading-[1.45] text-black">
                    In 2023, during CorMedix's FDA application for its first
                    product (DefenCath), the legacy site — over 10 years old —
                    became a liability: for external audiences, it failed to
                    convey the clarity and credibility the company needed, turning
                    critical tasks into trial-and-error paths.
                  </p>

                  <div data-stagger className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div data-stagger-item>
                      <InfoCard
                        corner="sm"
                        title="Investors"
                        body="Reports, filings, and projections required too many clicks — hard to find quickly or with confidence."
                      />
                    </div>

                    <div data-stagger-item>
                      <InfoCard
                        corner="sm"
                        title="Media & Scientific Community"
                        body="Clinical evidence and press kits became a PDF hunt (often via Google), raising doubts about official sources."
                      />
                    </div>

                    <div data-stagger-item>
                      <InfoCard
                        corner="sm"
                        title="Core Conflict"
                        body="Increase access and transparency without violating compliance — while keeping content manageable for the internal team."
                      />
                    </div>
                  </div>
                </div>

                {/* ======================
                    DISCOVERY & INSIGHTS
                   ====================== */}
                <div className={`flex flex-col ${STACK_24}`}>
                  <div data-fade>
                    <SectionHeader
                      caption="Discovery & Insights"
                      title="Learning from the market."
                    />
                  </div>

                  <div className={`flex flex-col ${STACK_48}`}>
                    {/* Text block */}
                    <div data-fade className={`flex flex-col ${STACK_12}`}>
                      <p className="text-xl font-medium leading-[1.3] text-[#131415]">
                        <b>
                          To reduce assumptions, I analyzed 8 Nasdaq-listed
                          companies
                        </b>{" "}
                        (CorMedix's own market).
                      </p>

                      <p className="text-xl font-medium leading-[1.3] text-[#131415]">
                        The goal: identify recurring patterns in investor
                        relations and translate them into practical architecture
                        decisions.
                      </p>
                    </div>

                    {/* Criteria */}
                    <div className={`flex flex-col ${STACK_24}`}>
                      <p data-fade className="text-xl font-semibold leading-none text-[#FF4C2C]">
                        Criteria
                      </p>

                      <div data-stagger className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
                        <div data-stagger-item>
                          <div
                            className="bg-white p-10 sm:p-12 lg:p-14"
                            style={maskFourCorners("md")}
                          >
                            <div className={`flex flex-col ${STACK_12}`}>
                              <p className="text-xl leading-[1.4] text-black">
                                Widely recognized investor references (IR baseline
                                standards)
                              </p>
                            </div>
                          </div>
                        </div>

                        <div data-stagger-item>
                          <div
                            className="bg-white p-10 sm:p-12 lg:p-14"
                            style={maskFourCorners("md")}
                          >
                            <div className={`flex flex-col ${STACK_12}`}>
                              <p className="text-xl leading-[1.4] text-black">
                                Health/pharma ecosystem companies (sector-specific
                                patterns)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ======================
                    INSIGHTS (integrated)
                   ====================== */}
                <div className={`flex flex-col ${STACK_24}`}>
                  <div className={`flex flex-col ${STACK_24}`}>
                    {/* Company logos (8) */}
                    <div data-stagger className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                      {[
                        { src: "/amazon.jpg", alt: "Amazon" },
                        { src: "/apple.jpg", alt: "Apple" },
                        { src: "/nvidia.jpg", alt: "Nvidia" },
                        { src: "/microsoft.jpg", alt: "Microsoft" },
                        { src: "/amgen.jpg", alt: "Amgen" },
                        { src: "/gilead.jpg", alt: "Gilead" },
                        { src: "/regeneron.jpg", alt: "Regeneron" },
                        { src: "/cormedix.jpg", alt: "CorMedix" },
                      ].map((item) => (
                        <div
                          key={item.src}
                          data-stagger-item
                          className="relative h-[89px] w-full overflow-hidden bg-white"
                        >
                          <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            className="object-contain"
                            sizes="(min-width: 1024px) 25vw, 50vw"
                            priority={false}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Large analysis image */}
                    <div
                      data-fade
                      className="relative h-[360px] w-full overflow-hidden bg-white sm:h-[480px] lg:h-[603px]"
                      style={maskFourCorners("md")}
                    >
                      <Image
                        src="/cor.jpg"
                        alt="Competitive analysis"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 1022px, 100vw"
                        priority={false}
                      />
                    </div>

                    {/* Insight cards */}
                    <div data-fade>
                      <MaskedCard corner="md">
                        <p className="text-xl font-semibold leading-[1.4] text-black">
                          Best practices we adopted
                        </p>

                        <div className={`mt-6 flex flex-col ${STACK_12}`}>
                          {[
                            "Every company has a dedicated investor hub.",
                            "SEC Filings isn't a list — it's a searchable database with filters and groups.",
                            "Quick Links for repeated tasks is a strategic pattern.",
                            "Activity embedded in news signals that the company is alive and predictable.",
                          ].map((text) => (
                            <button
                              key={text}
                              type="button"
                              className="w-full bg-[#F1F9E8] px-6 py-3 text-left"
                            >
                              <span className="block text-base leading-[1.4] text-black">
                                {text}
                              </span>
                            </button>
                          ))}
                        </div>
                      </MaskedCard>
                    </div>

                    <div data-fade>
                      <MaskedCard corner="md">
                        <p className="text-xl font-semibold leading-[1.4] text-black">
                          Practices we didn't follow
                        </p>

                        <div className={`mt-6 flex flex-col ${STACK_12}`}>
                          <button
                            type="button"
                            className="w-full bg-[#F9F1E8] px-6 py-3 text-left"
                          >
                            <span className="block text-base leading-[1.4] text-black">
                              Many pharma/medtech sites organize by portfolio and
                              pipeline. For CorMedix — a single-product company at a
                              critical phase — task-based guidance made more sense
                              than choice-heavy navigation.
                            </span>
                          </button>

                          <button
                            type="button"
                            className="w-full bg-[#F9F1E8] px-6 py-3 text-left"
                          >
                            <span className="block text-base leading-[1.4] text-black">
                              Some IR hubs redirect users to third-party sites. We
                              kept the entire flow within the hub to preserve context,
                              consistency, and trust.
                            </span>
                          </button>

                          <button
                            type="button"
                            className="w-full bg-[#F9F1E8] px-6 py-3 text-left"
                          >
                            <span className="block text-base leading-[1.4] text-black">
                              Features like an investment calculator and audio
                              webcasts were cut from the MVP — they required more
                              time, content, and testing, and could have compromised
                              the delivery timeline.
                            </span>
                          </button>
                        </div>
                      </MaskedCard>
                    </div>
                  </div>
                </div>

                {/* Token helpers (hidden) */}
                <div className="hidden">
                  <div className={CONTENT_12} />
                  <div className={SHAPE_BLEED} />
                  <div className={SHAPE_INNER_PAD} />
                  <div className={STACK_32} />
                  <div className={STACK_40} />
                  <div style={maskTopOnly("lg")} />
                  <div style={maskBottomOnly("lg")} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          BLOCK 2 — Validation & Evidence
         ============================== */}
      <section className={`w-full ${SECTION_Y}`}>
        <div className={SITE_CONTAINER}>
          <div className={GRID_12}>
            <div className={TEXT_10}>
              <div className={`flex w-full flex-col ${STACK_48}`}>
                {/* Header */}
                <div className="flex w-full flex-col">
                  <div data-fade className={`flex flex-col ${STACK_24}`}>
                    <div className="flex">
                      <span className="inline-flex items-center gap-2 rounded-[32px] bg-white px-3 py-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
                        <span className="text-lg font-semibold leading-4 text-[#131415]">
                          Validation &amp; Evidence
                        </span>
                      </span>
                    </div>

                    <p className="text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
                      Testing the new patterns with real users.
                    </p>
                  </div>

                  <p data-fade className="mt-6 text-xl font-medium leading-[1.5] text-black">
                    To validate that the new architecture made navigation more
                    predictable — not just "more organized" — I ran a comparative
                    task test between the legacy and proposed sitemaps.
                  </p>

                  <p data-fade className="mt-10 text-xl font-medium leading-6 text-[#FF4C2C]">
                    How was the test?
                  </p>
                </div>

                {/* Cards */}
                <div data-stagger className="grid grid-cols-1 gap-6 md:grid-cols-2 md:auto-rows-fr">
                  {validationCards.map((c) => (
                    <div key={c.title} data-stagger-item>
                      <ValidationInfoCard title={c.title} body={c.body} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
