// src/components/retrospect.tsx
"use client"

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- LAYOUT CONSTANTS ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

// --- SECTION Y (64/80/96) ---
const SECTION_Y = "py-16 sm:py-20 lg:py-24";

// --- SPACING TOKENS ---
const STACK_24 = "gap-6"; // 24px
const STACK_32 = "gap-8"; // 32px

export default function Retrospect() {
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
    <section ref={containerRef} className={`w-full bg-white ${SECTION_Y}`}>
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          <div className={TEXT_10}>
            <div className={`flex w-full flex-col ${STACK_32}`}>
              {/* Header */}
              <div data-fade className={`flex flex-col ${STACK_24}`}>
                <div className="flex">
                  <span className="inline-flex items-center gap-4 rounded-[32px] bg-[#F7F7F7] px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
                    <span className="text-lg font-semibold leading-none text-[#131415]">
                      Retrospective
                    </span>
                  </span>
                </div>

                <p className="text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
                  What I take from this project.
                </p>

                <p className="text-[18px] leading-[1.45] text-black/70 sm:text-[20px]">
                  An honest wrap-up on impact, learnings, and delivery sustainability.
                </p>
              </div>

              {/* Content */}
              <div data-stagger className={`flex flex-col ${STACK_24}`}>
                <p data-stagger-item className="text-[18px] leading-[1.55] text-black/80 sm:text-[20px]">
                  Delivering this platform meant working at the most sensitive moment
                  in CorMedix's recent history —{" "}
                  <span className="font-semibold text-black">
                    turning complex science and financial data into a trustworthy
                    experience
                  </span>{" "}
                  for investors, journalists, and the scientific community.
                </p>

                <p data-stagger-item className="text-[18px] leading-[1.55] text-black/80 sm:text-[20px]">
                  As the{" "}
                  <span className="font-semibold text-black">sole designer</span>,
                  the biggest learning was balancing audiences with nearly opposite
                  needs:{" "}
                  <span className="font-semibold text-black">
                    predictability for fast decision-makers
                  </span>{" "}
                  (IR/Press) and{" "}
                  <span className="font-semibold text-black">
                    evidence depth for those who validate before acting
                  </span>{" "}
                  (doctors/researchers) — all under legacy WordPress constraints and
                  tight deadlines.
                </p>

                <div data-stagger-item className="flex flex-col gap-6">
                  <div className="h-px w-full bg-black/10" />

                  <p className="text-[18px] leading-[1.55] text-black/80 sm:text-[20px]">
                    The final result gives me confidence:{" "}
                    <span className="font-semibold text-black">
                      we delivered on time
                    </span>{" "}
                    with a sustainable foundation. The structure is{" "}
                    <span className="font-semibold text-black">
                      scalable and governable
                    </span>
                    , and the internal team can now{" "}
                    <span className="font-semibold text-black">
                      publish, maintain, and evolve with autonomy
                    </span>
                    — no design or dev dependency per update.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
