"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import * as React from "react";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import lottie30Data from "../../public/graph.json";

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

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
    return <Link href={href} className={base} style={style}>{children}</Link>;
  }
  return <div className={base} style={style}>{children}</div>;
}

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
      <Link href="/cormedix" className="block h-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="corner-mask corner-mask-sm relative h-full w-full overflow-hidden bg-white shadow-sm">
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
          <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
            <div className="flex items-center gap-4">
              <div className="relative h-6 w-6 shrink-0">
                <img src="/down_arrow.svg" alt="" className="absolute inset-0 h-full w-full transition-opacity duration-300" style={{ opacity: isHovered ? 0 : 1 }} />
                <img src="/up_arrow.svg" alt="" className="absolute inset-0 h-full w-full transition-opacity duration-300" style={{ opacity: isHovered ? 1 : 0 }} />
              </div>
              <span className="shrink-0 text-[3.5rem] font-semibold leading-none tracking-tighter text-[#131415] lg:text-[4rem] tabular-nums" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                {displayValue}%
              </span>
              <p className="text-[0.75rem] font-semibold uppercase leading-snug tracking-wide text-[#131415] [word-spacing:9999px]" style={{ fontFamily: "var(--font-sora), sans-serif" }}>
                Task success rate
              </p>
            </div>
          </div>
        </div>
      </Link>
    </BentoCard>
  );
}

export default function BentoHome2026() {
  return (
    <section className="w-full bg-[#F7F7F7] pb-24 sm:pb-28 lg:pb-32">
      <style dangerouslySetInnerHTML={{ __html: `
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
        .corner-mask-sm { --corner: clamp(44px, 5.2vw, 64px); }
      `}} />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-4 gap-6 lg:grid-cols-12 mb-8">
          <h4 className="col-span-4 lg:col-span-10 lg:col-start-2 text-[1rem] font-semibold leading-[100%] text-[#999]" style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}>
            WORK
          </h4>
        </div>

        <div className="lg:pl-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

            {/* ========== COLUMN 1 ========== */}
            <div className="flex flex-col gap-6 lg:col-span-4">

              {/* Card 1 — Cormedix */}
              <div className="h-[300px] sm:h-[360px] lg:h-[480px]">
                <Link href="/cormedix" className="block h-full">
                  <div
                    className="corner-mask group relative h-full w-full overflow-hidden bg-[#0B1220]"
                    onMouseEnter={() => playVideo("video-cormedix")}
                    onMouseLeave={() => pauseVideo("video-cormedix")}
                    onFocus={() => playVideo("video-cormedix")}
                    onBlur={() => pauseVideo("video-cormedix")}
                  >
                    <video id="video-cormedix" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04]" muted playsInline preload="metadata" aria-hidden="true">
                      <source src="/CormedixHero.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 opacity-70 transition-opacity duration-500 ease-out group-hover:opacity-45 group-focus-within:opacity-45" aria-hidden="true" />
                    <div className="relative z-10 flex h-full flex-col justify-center p-8 sm:p-10 md:p-12 lg:justify-start lg:p-12 xl:p-16">
                      <div className="flex items-center justify-between gap-6">
                        <p className="font-bricolageGrotesque text-sm font-semibold text-white">CORMEDIX</p>
                        <div className="relative h-[22px] w-[22px] transition-transform duration-300 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:rotate-45 group-focus-within:translate-x-[2px] group-focus-within:-translate-y-[2px] group-focus-within:rotate-45">
                          <Image src="/arrow.svg" alt="" fill className="object-contain" draggable={false} />
                        </div>
                      </div>
                      <p className="font-bricolageGrotesque mt-2 text-3xl font-semibold leading-[1.15] text-white text-left">
                        Prescribing data for confident decisions.
                      </p>
                      <div className="hidden lg:block relative mt-auto flex-1 lg:min-h-[240px]">
                        <div className="absolute left-1/2 bottom-[-110px] h-full w-[170%] -translate-x-1/2 transition-transform duration-500 ease-out group-hover:-translate-y-[2px] group-focus-within:-translate-y-[2px]">
                          <div className="relative h-full w-full">
                            <Image src="/aftercormedixF.png" alt="Preview" fill className="object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.26] group-focus-within:scale-[1.06]" draggable={false} />
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
                      <p className="text-[1.25rem] font-medium leading-tight text-[#131415] lg:text-[1.5rem]" style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}>about</p>
                    </div>
                  </div>
                </Link>
              </BentoCard>

              {/* Card 7 — Hepatite thumbnail */}
              <BentoCard className="group h-[240px] lg:h-[240px]">
                <Link href="/hepatite" className="block h-full">
                  <div className="corner-mask relative h-full w-full overflow-hidden bg-white shadow-sm">
                    <img src="/hepatite_thumb.jpg" alt="Hepatite C case study" className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.14] group-hover:translate-y-[2px]" />
                  </div>
                </Link>
              </BentoCard>
            </div>

            {/* ========== COLUMN 2 ========== */}
            <div className="flex flex-col gap-6 lg:col-span-4">
              <div className="hidden lg:block lg:min-h-[120px] lg:flex-1" />

              {/* Card 2 — Hepatite */}
              <div className="h-[300px] sm:h-[360px] lg:h-[480px]">
                <Link href="/hepatite" className="block h-full">
                  <div
                    className="corner-mask group relative h-full w-full overflow-hidden bg-[#0B1220]"
                    onMouseEnter={() => playVideo("video-hepatite")}
                    onMouseLeave={() => pauseVideo("video-hepatite")}
                    onFocus={() => playVideo("video-hepatite")}
                    onBlur={() => pauseVideo("video-hepatite")}
                  >
                    <video id="video-hepatite" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04]" muted playsInline preload="metadata" aria-hidden="true">
                      <source src="/CormedixHero.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 opacity-70 transition-opacity duration-500 ease-out group-hover:opacity-45 group-focus-within:opacity-45" aria-hidden="true" />
                    <div className="relative z-10 flex h-full flex-col justify-center p-8 sm:p-10 md:p-12 lg:justify-start lg:p-12 xl:p-16 bg-[#FFF8BD]">
                      <div className="flex items-center justify-between gap-6">
                        <p className="font-bricolageGrotesque text-sm font-semibold text-[#131415]">GILEAD</p>
                        <div className="relative h-[22px] w-[22px] transition-transform duration-300 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:rotate-45 group-focus-within:translate-x-[2px] group-focus-within:-translate-y-[2px] group-focus-within:rotate-45">
                          <Image src="/blackarrow.svg" alt="" fill className="object-contain" draggable={false} />
                        </div>
                      </div>
                      <p className="font-bricolageGrotesque mt-2 text-3xl font-semibold leading-[1.15] text-[#131415] text-left">
                        Fighting the epidemic of myths about Hepatitis C.
                      </p>
                      <div className="hidden lg:block relative mt-auto flex-1 lg:min-h-[240px]">
                        <div className="absolute left-1/2 bottom-[-110px] h-full w-[170%] -translate-x-1/2 transition-transform duration-500 ease-out group-hover:-translate-y-[2px] group-focus-within:-translate-y-[2px]">
                          <div className="relative h-full w-full">
                            <Image src="/hepatite.png" alt="Preview" fill className="object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.16] group-focus-within:scale-[1.06]" draggable={false} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Card 5 — Wave */}
              <BentoCard className="h-[240px] lg:h-[240px]">
                <Link href="/msd" className="block h-full">
                  <div className="corner-mask group relative h-full w-full overflow-hidden bg-white shadow-sm">
                    <div className="absolute inset-0 bg-gradient-to-b from-white to-[#F7F7F7]" />
                    <img src="/wave.svg" alt="" aria-hidden="true" className="pointer-events-none absolute left-1/2 bottom-0 w-[880%] max-w-none -translate-x-1/2 translate-y-[80%] transition-transform duration-700 ease-out will-change-transform group-hover:translate-x-[-45%] group-focus-within:translate-x-[-45%]" />
                    <img src="/sad.svg" alt="" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[64px] h-[64px] sm:w-[96px] sm:h-[96px] transition-all duration-500 ease-out will-change-transform group-hover:translate-y-[120px] group-hover:opacity-0 group-hover:rotate-[10deg] group-focus-within:translate-y-[120px] group-focus-within:opacity-0 group-focus-within:rotate-[10deg]" />
                    <img src="/happy.svg" alt="" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[140px] opacity-0 w-[64px] h-[64px] sm:w-[96px] sm:h-[96px] transition-all duration-500 ease-out delay-75 will-change-transform group-hover:-translate-y-1/2 group-hover:opacity-100 group-focus-within:-translate-y-1/2 group-focus-within:opacity-100" />
                  </div>
                </Link>
              </BentoCard>
            </div>

            {/* ========== COLUMN 3 ========== */}
            <div className="flex flex-col gap-6 lg:col-span-4">

              {/* Card 3 — Stats */}
              <StatCard30pp />

              {/* Card 6 — Hepatite label */}
              <BentoCard className="h-[200px] lg:h-[120px]">
                <Link href="/hepatite" className="block h-full">
                  <div className="corner-mask corner-mask-sm relative flex h-full flex-col justify-center overflow-hidden bg-white shadow-sm">
                    <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                      <p className="text-[1.25rem] font-medium leading-tight lg:text-[1.5rem] text-[#131415]" style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}>0→1 discovery</p>
                    </div>
                  </div>
                </Link>
              </BentoCard>

              {/* Card 9 — MSD */}
              <div className="h-[300px] sm:h-[360px] lg:h-[480px]">
                <Link href="/msd" className="block h-full">
                  <div
                    className="corner-mask group relative h-full w-full overflow-hidden bg-[#0B1220]"
                    onMouseEnter={() => playVideo("video-msd")}
                    onMouseLeave={() => pauseVideo("video-msd")}
                    onFocus={() => playVideo("video-msd")}
                    onBlur={() => pauseVideo("video-msd")}
                  >
                    <video id="video-msd" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-within:scale-[1.04]" muted playsInline preload="metadata" aria-hidden="true">
                      <source src="/CormedixHero.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 opacity-70 transition-opacity duration-500 ease-out group-hover:opacity-45 group-focus-within:opacity-45" aria-hidden="true" />
                    <div className="relative z-10 flex h-full flex-col justify-center p-8 sm:p-10 md:p-12 lg:justify-start lg:p-12 xl:p-16 bg-[#E2FFBD]">
                      <div className="flex items-center justify-between gap-6">
                        <p className="font-bricolageGrotesque text-sm font-semibold text-[#131415]">MSD</p>
                        <div className="relative h-[22px] w-[22px] transition-transform duration-300 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:rotate-45 group-focus-within:translate-x-[2px] group-focus-within:-translate-y-[2px] group-focus-within:rotate-45">
                          <Image src="/blackarrow.svg" alt="" fill className="object-contain" draggable={false} />
                        </div>
                      </div>
                      <p className="font-bricolageGrotesque mt-2 text-3xl font-semibold leading-[1.15] text-[#131415] text-left">
                        Stabilizing the clinical exam journey.
                      </p>
                      <div className="hidden lg:block relative mt-auto flex-1 lg:min-h-[240px]">
                        <div className="absolute left-1/2 bottom-[-110px] h-full w-[170%] -translate-x-1/2 transition-transform duration-500 ease-out group-hover:-translate-y-[2px] group-focus-within:-translate-y-[2px]">
                          <div className="relative h-full w-full">
                            <Image src="/msd.png" alt="Preview" fill className="object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.16] group-focus-within:scale-[1.06]" draggable={false} />
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
