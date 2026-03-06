"use client"

import { useEffect, useRef } from "react"
import Spline from "@splinetool/react-spline"
import { gsap } from "gsap"

export function Hero2026() {
  const leftRef = useRef<HTMLParagraphElement>(null)
  const rightRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
        )
      }
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.55 }
        )
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <div className="w-full pt-10">
      <section className="relative w-full overflow-hidden bg-[#F7F7F7] pt-10 h-[500px] sm:h-[620px] md:h-[700px] lg:h-[800px]">
        {/* Spline background */}
        <div className="absolute inset-0 z-0">
          <Spline scene="https://prod.spline.design/asZQCydgchLhW7Tj/scene.splinecode" />
        </div>

        {/* Text overlay */}
        <div className="pointer-events-none relative z-10 mx-auto h-full w-full max-w-[1400px] px-8 md:px-12 lg:px-28">
          <div className="relative h-full">
            {/* Top-left — word-by-word reveal */}
            <p
              ref={leftRef}
              className="absolute left-0 font-display font-semibold leading-[1.2] text-[#FF4C2C]"
              style={{
                fontSize: "clamp(22px, 3vw, 40px)",
                maxWidth: "18ch",
                top: "clamp(48px, 8vh, 80px)",
              }}
            >
              Product designer exploring 3D, AI & code.
            </p>

            {/* Bottom-right */}
            <p
              ref={rightRef}
              className="absolute right-0 text-right font-medium leading-[1.35] text-[#131415]"
              style={{
                fontSize: "clamp(12px, 1.2vw, 16px)",
                maxWidth: "26ch",
                bottom: "clamp(24px, 4vh, 48px)",
              }}
            >
              Background in advertising —{" "}
              strategic framing, performance, and executive clarity.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
