"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import * as React from "react";
import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import lottie30Data from "../../public/graph.json";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "quefreen.almeida@gmail.com";

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// ============================================================
// useTilt: 3D card tilt + radial spotlight (no re-renders)
// ============================================================
function useTilt(intensity = 7) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      const spot = spotRef.current;
      if (!card) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;

      gsap.to(card, {
        rotateX: -(y - 0.5) * intensity * 2,
        rotateY: (x - 0.5) * intensity * 2,
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (spot) {
        spot.style.background = `radial-gradient(circle 320px at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.14), transparent 65%)`;
        spot.style.opacity = "1";
      }
    },
    [intensity]
  );

  const onLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.85,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
    if (spotRef.current) spotRef.current.style.opacity = "0";
  }, []);

  return { cardRef, spotRef, onMove, onLeave };
}

// ============================================================
// Generic Bento card wrapper
// ============================================================
function BentoCard({
  className,
  children,
  href,
  style,
}: {
  className?: string;
  children: ReactNode;
  href?: string;
  style?: React.CSSProperties;
}) {
  const base = cn("group relative overflow-hidden", className);
  if (href) {
    return (
      <Link href={href} className={base} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <div className={base} style={style}>
      {children}
    </div>
  );
}

// ============================================================
// Video helpers
// ============================================================
function playVideo(id: string) {
  const v = document.getElementById(id) as HTMLVideoElement | null;
  if (!v) return;
  v.currentTime = 0;
  v.play().catch(() => {});
}

function pauseVideo(id: string) {
  const v = document.getElementById(id) as HTMLVideoElement | null;
  if (!v) return;
  v.pause();
  v.currentTime = 0;
}

// ============================================================
// StatCard30pp — Lottie background card
// ============================================================
function StatCard30pp() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);
  const [isHovered, setIsHovered] = React.useState(false);
  const [displayValue, setDisplayValue] = React.useState(63);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    lottieRef.current?.goToAndStop(0, true);
  }, []);

  const animateCount = (from: number, to: number, duration: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(from + (to - from) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    lottieRef.current?.setSpeed(2.5);
    lottieRef.current?.playSegments([56, 96], true);
    animateCount(63, 93, 600);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    lottieRef.current?.goToAndStop(0, true);
    animateCount(93, 63, 400);
  };

  return (
    <BentoCard className="group h-[240px] lg:h-[240px]">
      <Link
        href="/cormedix"
        className="block h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="corner-mask corner-mask-sm relative h-full w-full overflow-hidden bg-white shadow-sm">
          {/* Lottie background */}
          <div className="pointer-events-none absolute inset-0 z-0">
            <Lottie
              lottieRef={lottieRef}
              animationData={lottie30Data}
              autoplay={false}
              loop={false}
              style={{ width: "100%", height: "100%" }}
              rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
            />
          </div>
          {/* Text content */}
          <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
              <div className="flex items-center gap-4">
                {/* Arrow icon */}
                <div className="relative h-6 w-6 shrink-0">
                  <img
                    src="/down_arrow.svg"
                    alt=""
                    className="absolute inset-0 h-full w-full transition-opacity duration-300"
                    style={{ opacity: isHovered ? 0 : 1 }}
                  />
                  <img
                    src="/up_arrow.svg"
                    alt=""
                    className="absolute inset-0 h-full w-full transition-opacity duration-300"
                    style={{ opacity: isHovered ? 1 : 0 }}
                  />
                </div>
                {/* Number */}
                <span
                  className="shrink-0 text-[3.5rem] font-semibold leading-none tracking-tighter text-[#131415] lg:text-[4rem] tabular-nums"
                  style={{ fontFamily: "var(--font-sora), sans-serif" }}
                >
                  {displayValue}%
                </span>
                {/* Label — 1 word per line */}
                <p
                  className="text-[0.75rem] font-semibold uppercase leading-snug tracking-wide text-[#131415] [word-spacing:9999px]"
                  style={{ fontFamily: "var(--font-sora), sans-serif" }}
                >
                  Task success rate
                </p>
              </div>
          </div>
        </div>
      </Link>
    </BentoCard>
  );
}

// ============================================================
// Main component
// ============================================================
export default function BentoHome2026() {
  const [emailCopied, setEmailCopied] = React.useState(false);
  const copyTimerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Three tilt instances — one per big video card
  const t1 = useTilt(7);
  const t2 = useTilt(7);
  const t9 = useTilt(7);

  React.useEffect(() => {
    return () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    };
  }, []);

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
          const items = (group as HTMLElement).querySelectorAll<HTMLElement>("[data-stagger-item]");
          if (!items.length) return;
          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: { trigger: group, start: "top 85%", once: true },
            }
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = React.useCallback(async () => {
    let ok = true;
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      try {
        const el = document.createElement("textarea");
        el.value = EMAIL;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      } catch {
        ok = false;
      }
    }
    if (!ok) return;
    setEmailCopied(true);
    if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => setEmailCopied(false), 1400);
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#F7F7F7] pb-24 sm:pb-28 lg:pb-32">
      {/* Corner mask CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .corner-mask {
              --corner: clamp(56px, 6vw, 96px);
              -webkit-mask-image: url(/esqtb.svg), url(/dirtb.svg), url(/esqbb.svg), url(/dirbb.svg), linear-gradient(#000, #000);
              -webkit-mask-position: left top, right top, left bottom, right bottom, center;
              -webkit-mask-repeat: no-repeat;
              -webkit-mask-size: var(--corner) var(--corner), var(--corner) var(--corner), var(--corner) var(--corner), var(--corner) var(--corner), 100% 100%;
              -webkit-mask-composite: xor;
              mask-image: url(/esqtb.svg), url(/dirtb.svg), url(/esqbb.svg), url(/dirbb.svg), linear-gradient(#000, #000);
              mask-position: left top, right top, left bottom, right bottom, center;
              mask-repeat: no-repeat;
              mask-size: var(--corner) var(--corner), var(--corner) var(--corner), var(--corner) var(--corner), var(--corner) var(--corner), 100% 100%;
              mask-composite: exclude;
            }
            .corner-mask-sm {
              --corner: clamp(44px, 5.2vw, 64px);
            }
          `,
        }}
      />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-4 gap-6 lg:grid-cols-12 mb-8">
          <h4
            data-fade
            className="col-span-4 lg:col-span-10 lg:col-start-2 text-[1rem] font-semibold leading-[100%] text-[#999]"
            style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}
          >
            WORK
          </h4>
        </div>

        <div className="lg:pl-12">
        <div data-stagger className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* ========== COLUMN 1 ========== */}
          <div data-stagger-item className="flex flex-col gap-6 lg:col-span-4">

            {/* Card 1 — Cormedix (tilt) */}
            <div className="h-[300px] sm:h-[360px] lg:h-[480px]" style={{ perspective: "1200px" }}>
              <Link href="/cormedix" className="block h-full">
                <div
                  ref={t1.cardRef}
                  className="corner-mask group relative h-full w-full overflow-hidden bg-[#0B1220]"
                  onMouseMove={t1.onMove}
                  onMouseEnter={() => playVideo("video-cormedix")}
                  onMouseLeave={() => { t1.onLeave(); pauseVideo("video-cormedix"); }}
                  onFocus={() => playVideo("video-cormedix")}
                  onBlur={() => pauseVideo("video-cormedix")}
                >
                  {/* Spotlight */}
                  <div
                    ref={t1.spotRef}
                    className="pointer-events-none absolute inset-0 z-[4] opacity-0 transition-opacity duration-500"
                    aria-hidden="true"
                  />

                  <video
                    id="video-cormedix"
                    className={[
                      "absolute inset-0 h-full w-full object-cover",
                      "transition-transform duration-700 ease-out",
                      "group-hover:scale-[1.04] group-focus-within:scale-[1.04]",
                    ].join(" ")}
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                  >
                    <source src="/CormedixHero.mp4" type="video/mp4" />
                  </video>

                  <div
                    className="absolute inset-0 bg-gradient-to-b from-black/0 opacity-70 transition-opacity duration-500 ease-out group-hover:opacity-45 group-focus-within:opacity-45"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex h-full flex-col justify-center p-8 sm:p-10 md:p-12 lg:justify-start lg:p-12 xl:p-16">
                    <div className="flex items-center justify-between gap-6">
                      <p className="font-bricolageGrotesque text-sm font-semibold text-white transition-transform duration-300 ease-out group-hover:-translate-y-[1px] group-focus-within:-translate-y-[1px]">
                        CORMEDIX
                      </p>
                      <div className="relative h-[22px] w-[22px] transition-transform duration-300 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:rotate-45 group-focus-within:translate-x-[2px] group-focus-within:-translate-y-[2px] group-focus-within:rotate-45">
                        <Image src="/arrow.svg" alt="" fill className="object-contain" draggable={false} priority={false} />
                      </div>
                    </div>
                    <p className="font-bricolageGrotesque mt-2 text-3xl font-semibold leading-[1.15] text-white text-left transition-transform duration-300 ease-out group-hover:-translate-y-[1px] group-focus-within:-translate-y-[1px]">
                      Prescribing data for confident decisions.
                    </p>
                    <div className="hidden lg:block relative mt-auto flex-1 lg:min-h-[240px]">
                      <div className="absolute left-1/2 bottom-[-110px] h-full w-[170%] -translate-x-1/2 transition-transform duration-500 ease-out group-hover:-translate-y-[2px] group-focus-within:-translate-y-[2px]">
                        <div className="relative h-full w-full">
                          <Image
                            src="/aftercormedixF.png"
                            alt="Preview"
                            fill
                            className="object-contain object-bottom transition-transform duration-700 ease-out lg:scale-100 group-hover:scale-[1.26] group-focus-within:scale-[1.06]"
                            draggable={false}
                            priority={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Card 4 — About */}
            <BentoCard className="h-[200px] lg:h-[120px]">
              <Link href="/about" className="block h-full">
                <div className="corner-mask corner-mask-sm relative flex h-full flex-col justify-center overflow-hidden bg-white shadow-sm">
                  <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                    <p
                      className="text-[1.25rem] font-medium leading-tight text-[#131415] lg:text-[1.5rem]"
                      style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}
                    >
                      about
                    </p>
                  </div>
                </div>
              </Link>
            </BentoCard>

            {/* Card 7 — Hepatite thumbnail */}
            <BentoCard className="group h-[240px] lg:h-[240px]">
              <Link href="/hepatite" className="block h-full">
                <div className="corner-mask relative h-full w-full overflow-hidden bg-white shadow-sm">
                  <img
                    src="/hepatite_thumb.jpg"
                    alt="Hepatite C case study"
                    className={[
                      "pointer-events-none absolute inset-0 h-full w-full object-cover",
                      "transition-transform duration-700 ease-out will-change-transform",
                      "group-hover:scale-[1.14] group-hover:translate-y-[2px]",
                    ].join(" ")}
                  />
                </div>
              </Link>
            </BentoCard>
          </div>

          {/* ========== COLUMN 2 ========== */}
          <div data-stagger-item className="flex flex-col gap-6 lg:col-span-4">
            <div className="hidden lg:block lg:min-h-[120px] lg:flex-1" />

            {/* Card 2 — Hepatite (tilt) */}
            <div className="h-[300px] sm:h-[360px] lg:h-[480px]" style={{ perspective: "1200px" }}>
              <Link href="/hepatite" className="block h-full">
                <div
                  ref={t2.cardRef}
                  className="corner-mask group relative h-full w-full overflow-hidden bg-[#0B1220]"
                  onMouseMove={t2.onMove}
                  onMouseEnter={() => playVideo("video-hepatite")}
                  onMouseLeave={() => { t2.onLeave(); pauseVideo("video-hepatite"); }}
                  onFocus={() => playVideo("video-hepatite")}
                  onBlur={() => pauseVideo("video-hepatite")}
                >
                  {/* Spotlight */}
                  <div
                    ref={t2.spotRef}
                    className="pointer-events-none absolute inset-0 z-[4] opacity-0 transition-opacity duration-500"
                    aria-hidden="true"
                  />

                  <video
                    id="video-hepatite"
                    className={[
                      "absolute inset-0 h-full w-full object-cover",
                      "transition-transform duration-700 ease-out",
                      "group-hover:scale-[1.04] group-focus-within:scale-[1.04]",
                    ].join(" ")}
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                  >
                    <source src="/CormedixHero.mp4" type="video/mp4" />
                  </video>

                  <div
                    className="absolute inset-0 bg-gradient-to-b from-black/0 opacity-70 transition-opacity duration-500 ease-out group-hover:opacity-45 group-focus-within:opacity-45"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex h-full flex-col justify-center p-8 sm:p-10 md:p-12 lg:justify-start lg:p-12 xl:p-16 bg-[#FFF8BD]">
                    <div className="flex items-center justify-between gap-6">
                      <p className="font-bricolageGrotesque text-sm font-semibold text-[#131415] transition-transform duration-300 ease-out group-hover:-translate-y-[1px] group-focus-within:-translate-y-[1px]">
                        GILEAD
                      </p>
                      <div className="relative h-[22px] w-[22px] transition-transform duration-300 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:rotate-45 group-focus-within:translate-x-[2px] group-focus-within:-translate-y-[2px] group-focus-within:rotate-45">
                        <Image src="/blackarrow.svg" alt="" fill className="object-contain" draggable={false} priority={false} />
                      </div>
                    </div>
                    <p className="font-bricolageGrotesque mt-2 text-3xl font-semibold leading-[1.15] text-[#131415] text-left transition-transform duration-300 ease-out group-hover:-translate-y-[1px] group-focus-within:-translate-y-[1px]">
                      Fighting the epidemic of myths about Hepatitis C.
                    </p>
                    <div className="hidden lg:block relative mt-auto flex-1 lg:min-h-[240px]">
                      <div className="absolute left-1/2 bottom-[-110px] h-full w-[170%] -translate-x-1/2 transition-transform duration-500 ease-out group-hover:-translate-y-[2px] group-focus-within:-translate-y-[2px]">
                        <div className="relative h-full w-full">
                          <Image
                            src="/hepatite.png"
                            alt="Preview"
                            fill
                            className="object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.16] group-focus-within:scale-[1.06]"
                            draggable={false}
                            priority={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Card 5 — About (wave/emotional) */}
            <BentoCard className="h-[240px] lg:h-[240px]">
              <Link href="/msd" className="block h-full">
                <div className="corner-mask group relative h-full w-full overflow-hidden bg-white shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-b from-white to-[#F7F7F7]" />
                  <img
                    src="/wave.svg"
                    alt=""
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute left-1/2 bottom-0",
                      "w-[880%] max-w-none",
                      "-translate-x-1/2 translate-y-[80%]",
                      "transition-transform duration-700 ease-out will-change-transform",
                      "group-hover:translate-x-[-45%] group-focus-within:translate-x-[-45%]",
                    ].join(" ")}
                  />
                  <img
                    src="/sad.svg"
                    alt=""
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute left-1/2 top-1/2",
                      "-translate-x-1/2 -translate-y-1/2",
                      "w-[64px] h-[64px] sm:w-[96px] sm:h-[96px]",
                      "transition-all duration-500 ease-out will-change-transform",
                      "group-hover:translate-y-[120px] group-hover:opacity-0 group-hover:rotate-[10deg]",
                      "group-focus-within:translate-y-[120px] group-focus-within:opacity-0 group-focus-within:rotate-[10deg]",
                    ].join(" ")}
                  />
                  <img
                    src="/happy.svg"
                    alt=""
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute left-1/2 top-1/2",
                      "-translate-x-1/2 translate-y-[140px]",
                      "opacity-0",
                      "w-[64px] h-[64px] sm:w-[96px] sm:h-[96px]",
                      "transition-all duration-550 ease-out delay-75 will-change-transform",
                      "group-hover:-translate-y-1/2 group-hover:opacity-100",
                      "group-focus-within:-translate-y-1/2 group-focus-within:opacity-100",
                    ].join(" ")}
                  />
                </div>
              </Link>
            </BentoCard>
          </div>

          {/* ========== COLUMN 3 ========== */}
          <div data-stagger-item className="flex flex-col gap-6 lg:col-span-4">

            {/* Card 3 — Stats (Cormedix) */}
            <StatCard30pp />

            {/* Card 6 — Hepatite */}
            <BentoCard className="h-[200px] lg:h-[120px]">
              <Link href="/hepatite" className="block h-full">
                <div className="corner-mask corner-mask-sm relative flex h-full flex-col justify-center overflow-hidden bg-white shadow-sm">
                  <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                    <p
                      className="text-[1.25rem] font-medium leading-tight lg:text-[1.5rem] text-[#131415]"
                      style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}
                    >
                      0→1 discovery
                    </p>
                  </div>
                </div>
              </Link>
            </BentoCard>

            {/* Card 9 — MSD (tilt) */}
            <div className="h-[300px] sm:h-[360px] lg:h-[480px]" style={{ perspective: "1200px" }}>
              <Link href="/msd" className="block h-full">
                <div
                  ref={t9.cardRef}
                  className="corner-mask group relative h-full w-full overflow-hidden bg-[#0B1220]"
                  onMouseMove={t9.onMove}
                  onMouseEnter={() => playVideo("video-msd")}
                  onMouseLeave={() => { t9.onLeave(); pauseVideo("video-msd"); }}
                  onFocus={() => playVideo("video-msd")}
                  onBlur={() => pauseVideo("video-msd")}
                >
                  {/* Spotlight */}
                  <div
                    ref={t9.spotRef}
                    className="pointer-events-none absolute inset-0 z-[4] opacity-0 transition-opacity duration-500"
                    aria-hidden="true"
                  />

                  <video
                    id="video-msd"
                    className={[
                      "absolute inset-0 h-full w-full object-cover",
                      "transition-transform duration-700 ease-out",
                      "group-hover:scale-[1.04] group-focus-within:scale-[1.04]",
                    ].join(" ")}
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                  >
                    <source src="/CormedixHero.mp4" type="video/mp4" />
                  </video>

                  <div
                    className="absolute inset-0 bg-gradient-to-b from-black/0 opacity-70 transition-opacity duration-500 ease-out group-hover:opacity-45 group-focus-within:opacity-45"
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex h-full flex-col justify-center p-8 sm:p-10 md:p-12 lg:justify-start lg:p-12 xl:p-16 bg-[#E2FFBD]">
                    <div className="flex items-center justify-between gap-6">
                      <p className="font-bricolageGrotesque text-sm font-semibold text-[#131415] transition-transform duration-300 ease-out group-hover:-translate-y-[1px] group-focus-within:-translate-y-[1px]">
                        MSD
                      </p>
                      <div className="relative h-[22px] w-[22px] transition-transform duration-300 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:rotate-45 group-focus-within:translate-x-[2px] group-focus-within:-translate-y-[2px] group-focus-within:rotate-45">
                        <Image src="/blackarrow.svg" alt="" fill className="object-contain" draggable={false} priority={false} />
                      </div>
                    </div>
                    <p className="font-bricolageGrotesque mt-2 text-3xl font-semibold leading-[1.15] text-[#131415] text-left transition-transform duration-300 ease-out group-hover:-translate-y-[1px] group-focus-within:-translate-y-[1px]">
                      Stabilizing the clinical exam journey.
                    </p>
                    <div className="hidden lg:block relative mt-auto flex-1 lg:min-h-[240px]">
                      <div className="absolute left-1/2 bottom-[-110px] h-full w-[170%] -translate-x-1/2 transition-transform duration-500 ease-out group-hover:-translate-y-[2px] group-focus-within:-translate-y-[2px]">
                        <div className="relative h-full w-full">
                          <Image
                            src="/msd.png"
                            alt="Preview"
                            fill
                            className="object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.16] group-focus-within:scale-[1.06]"
                            draggable={false}
                            priority={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}