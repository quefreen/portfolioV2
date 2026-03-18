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
    <div className="w-full pt-10 pb-10 md:pb-10 lg:pb-0">
      <section className="relative w-full overflow-hidden bg-[#F7F7F7] pt-10 h-[500px] sm:h-[620px] md:h-[700px] lg:h-[800px]">
        {/* Spline background */}
        <div className="absolute inset-0 z-0">
          <Spline scene="https://prod.spline.design/AIfe4jRcveYWT6HX/scene.splinecode" />
        </div>

        {/* Text overlay */}
        <div className="pointer-events-none relative z-10 mx-auto h-full w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12">
          <div className="grid h-full grid-cols-4 gap-6 lg:grid-cols-12">

            {/* Orange title — TEXT_10 (col-start-2) */}
            <div className="col-span-4 lg:col-span-10 lg:col-start-2 relative h-full pointer-events-none">
              <p
                ref={leftRef}
                className="absolute left-0 font-display font-semibold leading-[1.2] text-[#FF4C2C] -top-7 md:-top-6 lg:top-[clamp(48px,8vh,80px)] text-[32px] md:text-[40px]"
                style={{ maxWidth: "20ch" }}
              >
                Building trust in regulated environments through strategic design.
              </p>
            </div>

            {/* Support text — col 9-12, matching bento right card */}
            <div className="hidden lg:block lg:col-span-4 lg:col-start-9 relative h-full pointer-events-none">
              <p
                ref={rightRef}
                className="absolute left-6 text-left bottom-[clamp(24px,4vh,48px)] text-[16px] font-medium leading-[1.35] text-[#131415]"
              >
                Rooted in communication. {" "}<br />
                I bring executive clarity and strategic framing to products where trust is non-negotiable.
              </p>
            </div>

            {/* Support text — sm/md only */}
            <div className="col-span-4 lg:hidden relative h-full pointer-events-none">
              <p
                className="absolute left-0 text-left bottom-2 md:bottom-3 text-[16px] md:text-[18px] font-medium leading-[1.35] text-[#131415]"
              >
                Rooted in communication. {" "}<br />
                I bring executive clarity and strategic framing to products where trust is non-negotiable.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
