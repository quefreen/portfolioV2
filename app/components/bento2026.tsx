"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import * as React from "react";

const EMAIL = "quefreen.almeida@gmail.com";

// Small utility to merge class names
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// Generic Bento card wrapper (IMPORTANTE: sem bg aqui)
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

export default function BentoHome2026() {
  // ✅ Feedback do botão "copiar e-mail"
  const [emailCopied, setEmailCopied] = React.useState(false);
  const copyTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current);
    };
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
    <section className="w-full bg-[#F7F7F7]">
      {/* CSS global da máscara (1x só) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .corner-mask {
              --corner: clamp(56px, 6vw, 96px);

              -webkit-mask-image:
                url(/esqtb.svg),
                url(/dirtb.svg),
                url(/esqbb.svg),
                url(/dirbb.svg),
                linear-gradient(#000, #000);
              -webkit-mask-position:
                left top,
                right top,
                left bottom,
                right bottom,
                center;
              -webkit-mask-repeat: no-repeat;
              -webkit-mask-size:
                var(--corner) var(--corner),
                var(--corner) var(--corner),
                var(--corner) var(--corner),
                var(--corner) var(--corner),
                100% 100%;
              -webkit-mask-composite: xor;

              mask-image:
                url(/esqtb.svg),
                url(/dirtb.svg),
                url(/esqbb.svg),
                url(/dirbb.svg),
                linear-gradient(#000, #000);
              mask-position:
                left top,
                right top,
                left bottom,
                right bottom,
                center;
              mask-repeat: no-repeat;
              mask-size:
                var(--corner) var(--corner),
                var(--corner) var(--corner),
                var(--corner) var(--corner),
                var(--corner) var(--corner),
                100% 100%;
              mask-composite: exclude;
            }

            .corner-mask-sm {
              --corner: clamp(44px, 5.2vw, 64px);
            }
          `,
        }}
      />

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12">
        <h4
          className="px-4 text-[1rem] font-semibold leading-[100%] text-[#999] sm:px-4 md:px-4 lg:px-16"
          style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}
        >
          PROJETOS
        </h4>

        <div className="h-8" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* ========== COLUNA 1 ========== */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            {/* Card 1 */}
            <BentoCard className="h-[240px] lg:h-[480px]">
              <Link href="/cormedix" className="block h-full">
                <div
                  className={[
                    "corner-mask group relative h-full w-full overflow-hidden",
                    "bg-[#0B1220]",
                    "transition-transform duration-300 ease-out",
                  ].join(" ")}
                  onMouseEnter={() => {
                    const v = document.getElementById(
                      "cormedix-card-video"
                    ) as HTMLVideoElement | null;
                    if (!v) return;
                    v.currentTime = 0;
                    v.play().catch(() => {});
                  }}
                  onMouseLeave={() => {
                    const v = document.getElementById(
                      "cormedix-card-video"
                    ) as HTMLVideoElement | null;
                    if (!v) return;
                    v.pause();
                    v.currentTime = 0;
                  }}
                  onFocus={() => {
                    const v = document.getElementById(
                      "cormedix-card-video"
                    ) as HTMLVideoElement | null;
                    if (!v) return;
                    v.currentTime = 0;
                    v.play().catch(() => {});
                  }}
                  onBlur={() => {
                    const v = document.getElementById(
                      "cormedix-card-video"
                    ) as HTMLVideoElement | null;
                    if (!v) return;
                    v.pause();
                    v.currentTime = 0;
                  }}
                >
                  {/* BG VIDEO */}
                  <video
                    id="cormedix-card-video"
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

                  {/* Overlay (sutil, aparece no hover pra dar “polish”) */}
                  <div
                    className={[
                      "absolute inset-0",
                      "bg-gradient-to-b from-black/0",
                      "opacity-70 transition-opacity duration-500 ease-out",
                      "group-hover:opacity-45 group-focus-within:opacity-45",
                    ].join(" ")}
                    aria-hidden="true"
                  />

                  {/* Conteúdo: texto, texto, imagem */}
                  <div className="relative z-10 flex h-full flex-col p-8 sm:p-10 md:p-12 lg:p-12 xl:p-16">
                    {/* Topo */}
                    <div className="flex items-center justify-between gap-6">
                      <p
                        className={[
                          "font-bricolageGrotesque text-sm font-semibold text-white",
                          "transition-transform duration-300 ease-out",
                          "group-hover:-translate-y-[1px] group-focus-within:-translate-y-[1px]",
                        ].join(" ")}
                      >
                        CORMEDIX
                      </p>

                      <div
                        className={[
                          "relative h-[22px] w-[22px]",
                          "transition-transform duration-300 ease-out",
                          "group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:rotate-45",
                          "group-focus-within:translate-x-[2px] group-focus-within:-translate-y-[2px] group-focus-within:rotate-45",
                        ].join(" ")}
                      >
                        <Image
                          src="/arrow.svg"
                          alt=""
                          fill
                          className="object-contain"
                          draggable={false}
                          priority={false}
                        />
                      </div>
                    </div>

                    {/* Título */}
                    <p
                      className={[
                        "font-bricolageGrotesque mt-2 text-3xl font-semibold leading-[1.15] text-white",
                        "transition-transform duration-300 ease-out",
                        "group-hover:-translate-y-[1px] group-focus-within:-translate-y-[1px]",
                      ].join(" ")}
                    >
                      Prescrevendo dados para decisões.
                    </p>

                    <div
                      className={["group-focus-within:w-16 group-focus-within:bg-[#FF4C2C]"].join(
                        " "
                      )}
                      aria-hidden="true"
                    />

                    {/* IMAGEM abaixo */}
                    <div className="relative mt-auto flex-1 min-h-[140px] sm:min-h-[180px] lg:min-h-[240px]">
                      <div
                        className={[
                          "absolute left-1/2",
                          "bottom-[-110px]",
                          "h-full w-[170%] -translate-x-1/2",
                          "transition-transform duration-500 ease-out",
                          "group-hover:-translate-y-[2px] group-focus-within:-translate-y-[2px]",
                        ].join(" ")}
                      >
                        <div className="relative h-full w-full">
                          <Image
                            src="/aftercormedixF.png"
                            alt="Preview"
                            fill
                            className={[
                              "object-contain object-bottom",
                              "transition-transform duration-700 ease-out",
                              "group-hover:scale-[1.26] group-focus-within:scale-[1.06]",
                            ].join(" ")}
                            draggable={false}
                            priority={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </BentoCard>

            {/* Card 4 */}
            <BentoCard className="h-[240px] lg:h-[120px]">
              <Link href="/highpoint" className="block h-full">
                <div className="corner-mask corner-mask-sm relative flex h-full flex-col justify-center overflow-hidden bg-white shadow-sm">
                  <div
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                      backgroundImage: "url(/.jpg)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                    <p
                      className="text-[1.25rem] font-medium leading-tight text-[#131415] lg:text-[1.5rem]"
                      style={{
                        fontFamily:
                          "var(--font-schibstedGrotesk), sans-serif",
                      }}
                    >
                      sobre mim
                    </p>
                  </div>
                </div>
              </Link>
            </BentoCard>

            {/* Card 7 */}
            <BentoCard className="group h-[240px] lg:h-[240px]">
              <Link href="#" className="block h-full">
                <div className="corner-mask relative h-full w-full overflow-hidden bg-white shadow-sm">
                  <img
                    src="/hepatite_thumb.jpg"
                    alt="Background"
                    className={[
                      "pointer-events-none absolute inset-0 h-full w-full object-cover",
                      "transition-transform duration-700 ease-out will-change-transform",
                      "group-hover:scale-[1.14] group-hover:translate-y-[2px]",
                    ].join(" ")}
                  />

                  <div
                    className={[
                      "pointer-events-none absolute inset-0",
                      "opacity-0 transition-opacity duration-500 ease-out",
                      "group-hover:opacity-100",
                    ].join(" ")}
                    aria-hidden="true"
                    style={{ background: "" }}
                  />
                </div>
              </Link>
            </BentoCard>
          </div>

          {/* ========== COLUNA 2 ========== */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <div className="hidden lg:block lg:min-h-[120px] lg:flex-1" />

            {/* Card 2 */}
            <BentoCard className="h-[240px] lg:h-[480px]">
              <Link href="/cormedix" className="block h-full">
                <div
                  className={[
                    "corner-mask group relative h-full w-full overflow-hidden",
                    "bg-[#0B1220]",
                    "transition-transform duration-300 ease-out",
                  ].join(" ")}
                  onMouseEnter={() => {
                    const v = document.getElementById(
                      "cormedix-card-video"
                    ) as HTMLVideoElement | null;
                    if (!v) return;
                    v.currentTime = 0;
                    v.play().catch(() => {});
                  }}
                  onMouseLeave={() => {
                    const v = document.getElementById(
                      "cormedix-card-video"
                    ) as HTMLVideoElement | null;
                    if (!v) return;
                    v.pause();
                    v.currentTime = 0;
                  }}
                  onFocus={() => {
                    const v = document.getElementById(
                      "cormedix-card-video"
                    ) as HTMLVideoElement | null;
                    if (!v) return;
                    v.currentTime = 0;
                    v.play().catch(() => {});
                  }}
                  onBlur={() => {
                    const v = document.getElementById(
                      "cormedix-card-video"
                    ) as HTMLVideoElement | null;
                    if (!v) return;
                    v.pause();
                    v.currentTime = 0;
                  }}
                >
                  <video
                    id="cormedix-card-video"
                    className={[
                      "absolute inset-0 h-full w-full object-cover",
                      "transition-transform duration-700 ease-out",
                      "group-hover:scale-[1.04] group-focus-within:scale-[1.04] bg-amber-400",
                    ].join(" ")}
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                  >
                    <source src="/" type="video/mp4" />
                  </video>

                  <div
                    className={[
                      "absolute inset-0",
                      "bg-gradient-to-b from-black/0",
                      "opacity-70 transition-opacity duration-500 ease-out",
                      "group-hover:opacity-45 group-focus-within:opacity-45",
                    ].join(" ")}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex h-full flex-col p-8 sm:p-10 md:p-12 lg:p-12 xl:p-16">
                    <div className="flex items-center justify-between gap-6">
                      <p
                        className={[
                          "font-bricolageGrotesque text-sm font-semibold text-[#131415]",
                          "transition-transform duration-300 ease-out",
                          "group-hover:-translate-y-[1px] group-focus-within:-translate-y-[1px]",
                        ].join(" ")}
                      >
                        GILEAD
                      </p>

                      <div
                        className={[
                          "relative h-[22px] w-[22px]",
                          "transition-transform duration-300 ease-out",
                          "group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:rotate-45",
                          "group-focus-within:translate-x-[2px] group-focus-within:-translate-y-[2px] group-focus-within:rotate-45",
                        ].join(" ")}
                      >
                        <Image
                          src="/blackarrow.svg"
                          alt=""
                          fill
                          className="object-contain"
                          draggable={false}
                          priority={false}
                        />
                      </div>
                    </div>

                    <p
                      className={[
                        "font-bricolageGrotesque mt-2 text-3xl font-semibold leading-[1.15] text-[#131415]",
                        "transition-transform duration-300 ease-out",
                        "group-hover:-translate-y-[1px] group-focus-within:-translate-y-[1px]",
                      ].join(" ")}
                    >
                      A epidemia
                      <br />
                      de mitos sobre a
                      <br />
                      Hepatite C.
                    </p>

                    <div
                      className={["group-focus-within:w-16 group-focus-within:bg-[#FF4C2C]"].join(
                        " "
                      )}
                      aria-hidden="true"
                    />

                    <div className="relative mt-auto flex-1 min-h-[140px] sm:min-h-[180px] lg:min-h-[240px]">
                      <div
                        className={[
                          "absolute left-1/2",
                          "bottom-[-110px]",
                          "h-full w-[170%] -translate-x-1/2",
                          "transition-transform duration-500 ease-out",
                          "group-hover:-translate-y-[2px] group-focus-within:-translate-y-[2px]",
                        ].join(" ")}
                      >
                        <div className="relative h-full w-full">
                          <Image
                            src="/hepatite_thumbB.png"
                            alt="Preview"
                            fill
                            className={[
                              "object-contain object-bottom",
                              "transition-transform duration-700 ease-out",
                              "group-hover:scale-[1.06] group-focus-within:scale-[1.06]",
                            ].join(" ")}
                            draggable={false}
                            priority={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </BentoCard>

            {/* Card 5 (wave/sad/happy) */}
            <BentoCard className="h-[240px] lg:h-[240px]">
              <Link href="#" className="block h-full">
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

          {/* ========== COLUNA 3 ========== */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            {/* Card 3 */}
            <BentoCard className="group h-[240px] lg:h-[240px]">
              <Link href="/pdpoint" className="block h-full">
                <div className="corner-mask corner-mask-sm relative h-full w-full overflow-hidden bg-white shadow-sm transition-colors duration-300">
                  <div
                    className={[
                      "pointer-events-none absolute inset-0 z-0 opacity-80",
                      "transition-transform duration-700 ease-out",
                      "group-hover:scale-[1.02]",
                    ].join(" ")}
                    style={{
                      backgroundImage: "url(/dashs.svg)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />

                  <img
                    src="/graph.svg"
                    alt=""
                    className={[
                      "pointer-events-none absolute bottom-0 left-[-5%] z-[1] w-[110%] max-w-none",
                      "object-contain object-bottom mix-blend-multiply opacity-30",
                      "transition-transform duration-700 ease-out will-change-transform",
                      "group-hover:scale-[1.08] group-hover:translate-y-[6px]",
                      "group-hover:opacity-40",
                    ].join(" ")}
                  />

                  <div
                    className={[
                      "relative z-10 flex h-full flex-col items-center justify-center px-6 text-center",
                      "transition-transform duration-300 ease-out",
                      "group-hover:-translate-y-[2px]",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "text-[3.5rem] font-semibold leading-none tracking-tighter text-[#131415] lg:text-[4rem]",
                        "transition-transform duration-300 ease-out",
                        "group-hover:scale-[1.01]",
                      ].join(" ")}
                      style={{
                        fontFamily:
                          "var(--font-schibstedGrotesk), sans-serif",
                      }}
                    >
                      +30pp
                    </span>

                    <p
                      className={[
                        "max-w-[220px] text-[1.2rem] font-medium leading-tight text-[#131415] mt-2",
                        "transition-opacity duration-300 ease-out",
                        "group-hover:opacity-95",
                      ].join(" ")}
                      style={{
                        fontFamily:
                          "var(--font-schibstedGrotesk), sans-serif",
                      }}
                    >
                      de sucesso na conclusão das tarefas
                    </p>
                  </div>

                  <div className="absolute top-8 left-8 z-20">
                    <h3 className="text-[0.75rem] font-bold uppercase tracking-widest text-[#999]"></h3>
                  </div>
                </div>
              </Link>
            </BentoCard>

            {/* ✅ Card 6 (COPIAR EMAIL) — corrigido com feedback "E-mail copiado" */}
            <BentoCard className="h-[240px] lg:h-[120px]">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="block h-full w-full text-left"
                aria-label={`Copiar e-mail ${EMAIL}`}
              >
                <div className="corner-mask corner-mask-sm relative flex h-full flex-col justify-center overflow-hidden shadow-sm transition-colors duration-300 stroke focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4C2C]/30">
                  {/* Background Image Fixa (opcional) */}
                  <div
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                      backgroundImage: "url(/SEU_BG.jpg)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: 1,
                    }}
                  />

                  {/* ✅ Pill de feedback */}
                  <div className="pointer-events-none absolute right-4 top-4 z-20">
                   
                  </div>

                  {/* Conteúdo */}
                  <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
                    <p
                      className={cn(
                        "text-[1.25rem] font-medium leading-tight lg:text-[1.5rem]",
                        "transition-colors duration-300",
                        emailCopied ? "text-[#FF4C2C]" : "text-[#131415]"
                      )}
                      style={{
                        fontFamily:
                          "var(--font-schibstedGrotesk), sans-serif",
                      }}
                    >
                      {emailCopied ? "E-mail copiado" : "copiar e-mail"}
                    </p>

                    {/* opcional: mostrar o email embaixo (bem discreto) */}
                    
                  </div>
                </div>
              </button>
            </BentoCard>

            {/* Card 9 */}
            <BentoCard className="h-[240px] lg:h-[480px]">
              <Link href="/cormedix" className="block h-full">
                <div
                  className={[
                    "corner-mask group relative h-full w-full overflow-hidden",
                    "bg-[#0B1220]",
                    "transition-transform duration-300 ease-out",
                  ].join(" ")}
                  onMouseEnter={() => {
                    const v = document.getElementById(
                      "cormedix-card-video"
                    ) as HTMLVideoElement | null;
                    if (!v) return;
                    v.currentTime = 0;
                    v.play().catch(() => {});
                  }}
                  onMouseLeave={() => {
                    const v = document.getElementById(
                      "cormedix-card-video"
                    ) as HTMLVideoElement | null;
                    if (!v) return;
                    v.pause();
                    v.currentTime = 0;
                  }}
                  onFocus={() => {
                    const v = document.getElementById(
                      "cormedix-card-video"
                    ) as HTMLVideoElement | null;
                    if (!v) return;
                    v.currentTime = 0;
                    v.play().catch(() => {});
                  }}
                  onBlur={() => {
                    const v = document.getElementById(
                      "cormedix-card-video"
                    ) as HTMLVideoElement | null;
                    if (!v) return;
                    v.pause();
                    v.currentTime = 0;
                  }}
                >
                  <video
                    id="cormedix-card-video"
                    className={[
                      "absolute inset-0 h-full w-full object-cover",
                      "transition-transform duration-700 ease-out",
                      "group-hover:scale-[1.04] group-focus-within:scale-[1.04] bg-[#10A958]",
                    ].join(" ")}
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                  >
                    <source src="/" type="video/mp4" />
                  </video>

                  <div
                    className={[
                      "absolute inset-0",
                      "bg-gradient-to-b from-black/0",
                      "opacity-70 transition-opacity duration-500 ease-out",
                      "group-hover:opacity-45 group-focus-within:opacity-45",
                    ].join(" ")}
                    aria-hidden="true"
                  />

                  <div className="relative z-10 flex h-full flex-col p-8 sm:p-10 md:p-12 lg:p-12 xl:p-16">
                    <div className="flex items-center justify-between gap-6">
                      <p
                        className={[
                          "font-bricolageGrotesque text-sm font-semibold text-white",
                          "transition-transform duration-300 ease-out",
                          "group-hover:-translate-y-[1px] group-focus-within:-translate-y-[1px]",
                        ].join(" ")}
                      >
                        MSD
                      </p>

                      <div
                        className={[
                          "relative h-[22px] w-[22px]",
                          "transition-transform duration-300 ease-out",
                          "group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:rotate-45",
                          "group-focus-within:translate-x-[2px] group-focus-within:-translate-y-[2px] group-focus-within:rotate-45",
                        ].join(" ")}
                      >
                        <Image
                          src="/arrow.svg"
                          alt=""
                          fill
                          className="object-contain"
                          draggable={false}
                          priority={false}
                        />
                      </div>
                    </div>

                    <p
                      className={[
                        "font-bricolageGrotesque mt-2 text-3xl font-semibold leading-[1.15] text-white",
                        "transition-transform duration-300 ease-out",
                        "group-hover:-translate-y-[1px] group-focus-within:-translate-y-[1px]",
                      ].join(" ")}
                    >
                      Estabilizando jornadas de exames.
                    </p>

                    <div
                      className={["group-focus-within:w-16 group-focus-within:bg-[#FF4C2C]"].join(
                        " "
                      )}
                      aria-hidden="true"
                    />

                    <div className="relative mt-auto flex-1 min-h-[140px] sm:min-h-[180px] lg:min-h-[240px]">
                      <div
                        className={[
                          "absolute left-1/2",
                          "bottom-[-50px]",
                          "h-full w-[170%] -translate-x-1/2",
                          "transition-transform duration-500 ease-out",
                          "group-hover:-translate-y-[2px] group-focus-within:-translate-y-[2px]",
                        ].join(" ")}
                      >
                        <div className="relative h-full w-full">
                          <Image
                            src="/msd_thumb.jpg"
                            alt="Preview"
                            fill
                            className={[
                              "object-contain object-bottom",
                              "transition-transform duration-700 ease-out",
                              "group-hover:scale-[1.16] group-focus-within:scale-[1.06]",
                            ].join(" ")}
                            draggable={false}
                            priority={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </BentoCard>
          </div>
        </div>
      </div>

      <div className="h-48" />
    </section>
  );
}
