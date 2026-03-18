"use client"

import Image from "next/image"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#F7F7F7]" />,
})

export function Hero2026() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024)
  }, [])

  return (
    <div className="w-full bg-[#F7F7F7] pb-10 md:pb-10 lg:pb-0 lg:-mt-12">
      <section className="relative w-full overflow-hidden bg-[#F7F7F7] pt-10 h-[500px] sm:h-[620px] md:h-[700px] lg:h-[800px]">

        {/* Background — static image on sm/md, Spline only rendered on desktop */}
        <div className="absolute inset-0 z-0">
          {isDesktop ? (
            <Spline scene="https://prod.spline.design/AIfe4jRcveYWT6HX/scene.splinecode" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="relative h-2/3 w-2/3">
                <Image
                  src="/quef3d.png"
                  alt=""
                  fill
                  priority
                  className="object-contain"
                  aria-hidden="true"
                />
              </div>
            </div>
          )}
        </div>

        {/* Text overlay */}
        <div className="pointer-events-none relative z-10 mx-auto h-full w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12">
          <div className="grid h-full grid-cols-4 gap-6 lg:grid-cols-12">

            {/* Orange title — TEXT_10 (col-start-2) */}
            <div className="col-span-4 lg:col-span-10 lg:col-start-2 relative h-full">
              <p
                className="absolute left-0 font-display font-semibold leading-[1.2] text-[#FF4C2C] -top-7 md:-top-6 lg:top-[clamp(48px,8vh,80px)] text-[32px] md:text-[40px]"
                style={{ maxWidth: "20ch" }}
              >
                Building trust in regulated environments through strategic design.
              </p>
            </div>

            {/* Support text — col 9-12 (lg only) */}
            <div className="hidden lg:block lg:col-span-4 lg:col-start-9 relative h-full">
              <p className="absolute left-6 text-left bottom-[clamp(24px,4vh,48px)] text-[16px] font-medium leading-[1.35] text-[#131415]">
                Rooted in communication.{" "}<br />
                I bring executive clarity and strategic framing to products where trust is non-negotiable.
              </p>
            </div>

            {/* Support text — sm/md only */}
            <div className="col-span-4 lg:hidden relative h-full">
              <p className="absolute left-0 text-left bottom-2 md:bottom-3 text-[16px] md:text-[18px] font-medium leading-[1.35] text-[#131415]">
                Rooted in communication.{" "}<br />
                I bring executive clarity and strategic framing to products where trust is non-negotiable.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
