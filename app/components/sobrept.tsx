"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// Layout constants
// ============================================================
const SITE_CONTAINER = "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12"
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12"
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2"
const SECTION_Y = "py-16 sm:py-20 lg:py-24"
const STACK_12 = "gap-3"
const STACK_24 = "gap-6"
const STACK_40 = "gap-10"
const STACK_48 = "gap-12"

// ============================================================
// SVG corner mask
// ============================================================
function cornerMask(size: "sm" | "md" | "lg" = "md"): CSSProperties {
  const c =
    size === "sm"
      ? "clamp(24px, 4.5vw, 56px)"
      : size === "md"
      ? "clamp(32px, 6vw, 80px)"
      : "clamp(56px, 9vw, 140px)"

  const img = `url(/esqtb.svg), url(/dirtb.svg), url(/esqbb.svg), url(/dirbb.svg), linear-gradient(#000,#000)`
  const pos = "left top, right top, left bottom, right bottom, center"
  const rep = "no-repeat"
  const sz  = `${c} ${c}, ${c} ${c}, ${c} ${c}, ${c} ${c}, 100% 100%`

  return {
    maskImage: img,
    maskPosition: pos,
    maskRepeat: rep,
    maskSize: sz,
    maskComposite: "exclude, exclude, exclude, exclude" as CSSProperties["maskComposite"],
    WebkitMaskImage: img as CSSProperties["WebkitMaskImage"],
    WebkitMaskPosition: pos as CSSProperties["WebkitMaskPosition"],
    WebkitMaskRepeat: rep as CSSProperties["WebkitMaskRepeat"],
    WebkitMaskSize: sz as CSSProperties["WebkitMaskSize"],
    WebkitMaskComposite: "xor, xor, xor, xor" as CSSProperties["WebkitMaskComposite"],
  }
}

// ============================================================
// Data
// ============================================================
const EXPERIENCE = [
  {
    company: "Competitive Edge",
    role: "Senior Product Designer",
    period: "2022 — Present",
    description:
      "Led design presentations to clients, cross-department collaboration across Advertising and Account Management, and internal standardization through training and documentation. Full UX/UI process: audits, journey maps, competitive analysis, and interface design.",
  },
  {
    company: "IPG Health",
    role: "Senior Product Designer",
    period: "2020 — 2022",
    description:
      "Led client presentations, developed an innovative 3D and micro-interaction library for the Veeva platform, and onboarded new team members.",
  },
  {
    company: "Tugarê",
    role: "UI Designer",
    period: "2019 — 2020",
    description:
      "Designed websites and portals including prototypes, wireframes, and sitemaps to define structure and user experience.",
  },
  {
    company: "Art Direction",
    role: "Various agencies",
    period: "2014 — 2019",
    description: null,
  },
]

const SKILLS = ["Business", "Med-tech", "Development", "UI", "UX", "Gaming"]

// ============================================================
// Main component
// ============================================================
export function HeroAbout() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
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
          )
        })

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          const items = (group as HTMLElement).querySelectorAll<HTMLElement>("[data-stagger-item]")
          if (!items.length) return
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
          )
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full">

      {/* ====================================================
          SECTION 1 — Hero: photo + headline
      ==================================================== */}
      <section className={`w-full ${SECTION_Y}`}>
        <div className={SITE_CONTAINER}>
          <div className={GRID_12}>
            <div className={TEXT_10}>

              {/* Inner grid — image left fills text height */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">

                {/* Image column — stretches to text height via grid */}
                <div
                  data-fade
                  className="relative min-h-[420px] overflow-hidden lg:col-span-5 lg:min-h-0"
                  style={cornerMask("md")}
                >
                  <Image
                    src="/quefreen.jpg"
                    alt="Quéfreen Almeida"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Text column — sets the height */}
                <div className={`flex flex-col justify-center lg:col-span-7 ${STACK_48}`}>
                  <div data-fade className={`flex flex-col ${STACK_24}`}>

                    <div className="flex">
                      <span className="inline-flex items-center gap-4 rounded-[32px] bg-white px-3 py-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
                        <span className="text-sm font-semibold leading-none text-[#131415]">
                          About
                        </span>
                      </span>
                    </div>

                    <p
                      className="font-semibold leading-[1.15] text-[#131415]"
                      style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
                    >
                      Product designer with a creative background and a passion for what's next.
                    </p>

                    <p className="text-[18px] leading-[1.55] text-black/60">
                      Based in St. Julian's, Malta. Working at the intersection of
                      strategy, interaction design, and emerging technology.
                    </p>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 2 — Bio + Skills
      ==================================================== */}
      <section className={`w-full ${SECTION_Y} !pt-0`}>
        <div className={SITE_CONTAINER}>
          <div className={GRID_12}>
            <div className={TEXT_10}>
              <div className={`flex flex-col ${STACK_40}`}>

                <div data-fade className={`flex flex-col ${STACK_24}`}>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#999]">
                    Quéfreen Almeida
                  </p>
                  <p className="text-[20px] leading-[1.55] text-black/80">
                    I'm a versatile professional with a repertoire spanning 3D to front-end.{" "}
                    <span className="font-semibold text-[#131415]">
                      I used Next.js and Tailwind CSS
                    </span>{" "}
                    to build this very portfolio you're navigating right now.
                  </p>
                </div>

                <div data-stagger className={`flex flex-wrap ${STACK_12} gap-x-3`}>
                  {SKILLS.map((skill) => (
                    <span
                      key={skill}
                      data-stagger-item
                      className="rounded-[32px] bg-white px-5 py-2.5 text-[16px] font-medium text-[#131415]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 3 — Experience
      ==================================================== */}
      <section className={`w-full ${SECTION_Y} !pt-0`}>
        <div className={SITE_CONTAINER}>
          <div className={GRID_12}>
            <div className={TEXT_10}>
              <div className={`flex flex-col ${STACK_40}`}>

                <p
                  data-fade
                  className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#999]"
                >
                  Experience
                </p>

                <div data-stagger className={`flex flex-col ${STACK_12}`}>
                  {EXPERIENCE.map((job) => (
                    <div
                      key={job.company}
                      data-stagger-item
                      className={`flex flex-col ${STACK_24} border-t border-black/[0.08] pt-6`}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-4">
                        <div className={`flex flex-col ${STACK_12}`}>
                          <p className="text-[20px] font-medium leading-none text-[#131415]">
                            {job.company}
                          </p>
                          <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#999]">
                            {job.role}
                          </p>
                        </div>
                        <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#999]">
                          {job.period}
                        </p>
                      </div>

                      {job.description && (
                        <p className="text-[17px] leading-[1.55] text-black/70">
                          {job.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
