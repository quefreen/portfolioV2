"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    gsap.set(dot, { xPercent: -50, yPercent: -50, x: -100, y: -100 })

    const onMove = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, overwrite: "auto" })
    }

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-cursor-hover]")) {
        gsap.to(dot, { scale: 1.5, duration: 0.2, overwrite: "auto" })
      }
    }

    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, [data-cursor-hover]")) {
        gsap.to(dot, { scale: 1, duration: 0.2, overwrite: "auto" })
      }
    }

    const onLeave = () => gsap.to(dot, { autoAlpha: 0, duration: 0.2 })
    const onEnter = () => gsap.to(dot, { autoAlpha: 1, duration: 0.2 })

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseout", onOut)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseout", onOut)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 rounded-full bg-[#FF4C2C]"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  )
}
