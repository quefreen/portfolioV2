"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const EMAIL = "quefreen.almeida@gmail.com"

function useMaltaTime() {
  const [time, setTime] = useState("")

  useEffect(() => {
    function tick() {
      const now = new Date()
      const t = now.toLocaleTimeString("en-GB", {
        timeZone: "Europe/Malta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      const offset =
        new Intl.DateTimeFormat("en", {
          timeZone: "Europe/Malta",
          timeZoneName: "shortOffset",
        })
          .formatToParts(now)
          .find((p) => p.type === "timeZoneName")?.value ?? "GMT+1"
      setTime(`${t} ${offset}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const pathname = usePathname()
  const time = useMaltaTime()

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch {
      const el = document.createElement("textarea")
      el.value = EMAIL
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    }
  }

  const linkClass = (href: string) =>
    [
      "text-[16px] font-normal transition-colors duration-200",
      pathname === href ? "text-[#FF4C2C]" : "text-[#131415] hover:text-[#FF4C2C]",
    ].join(" ")

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 border-b border-black/[0.06]"
      style={{ backgroundColor: "#F7F7F7" }}
    >
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12 h-16 flex items-center justify-between">

        {/* Left: name + role */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-[16px] font-medium text-[#131415] hover:text-[#FF4C2C] transition-colors duration-200"
            style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}
          >
            quefreen
          </Link>
          <span
            className="hidden sm:block text-[16px] font-normal text-[#999]"
            style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}
          >
            product designer
          </span>
        </div>

        {/* Center: location + real-time clock (desktop only) */}
        <div
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 text-[13px] font-normal text-[#999] pointer-events-none select-none"
          style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}
          aria-label="Location and local time"
        >
          <span>Based in St. Julian's, Malta</span>
          <span className="text-black/20">—</span>
          <span suppressHydrationWarning>{time}</span>
        </div>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}
        >
          <Link href="/sobre" className={linkClass("/sobre")}>
            about
          </Link>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="group inline-flex items-center gap-2 text-[16px] font-normal text-[#131415] hover:text-[#FF4C2C] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4C2C]/40 focus-visible:ring-offset-2"
            style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}
            aria-label="Copy email to clipboard"
          >
            <span>{emailCopied ? "email copied" : "copy email"}</span>
            <Image
              src="/copy.svg"
              alt=""
              width={16}
              height={16}
              className="h-[18px] w-[18px] flex-none group-hover:hidden"
              aria-hidden="true"
            />
            <Image
              src="/copy_orange.svg"
              alt=""
              width={16}
              height={16}
              className="h-[18px] w-[18px] flex-none hidden group-hover:inline-block"
              aria-hidden="true"
            />
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#131415] hover:text-[#FF4C2C] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          className="md:hidden border-t border-black/[0.06]"
          style={{ backgroundColor: "#F7F7F7" }}
        >
          <nav
            className="flex flex-col gap-0 px-4 py-3"
            style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}
          >
            <Link
              href="/sobre"
              className="py-3 text-[16px] font-normal text-[#131415] hover:text-[#FF4C2C] transition-colors duration-200 border-b border-black/[0.06]"
              onClick={() => setIsOpen(false)}
            >
              about
            </Link>

            <button
              type="button"
              onClick={() => { handleCopyEmail(); setIsOpen(false) }}
              className="py-3 text-left text-[16px] font-normal text-[#131415] hover:text-[#FF4C2C] transition-colors duration-200"
              aria-label="Copy email to clipboard"
            >
              {emailCopied ? "email copied" : "copy email"}
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
