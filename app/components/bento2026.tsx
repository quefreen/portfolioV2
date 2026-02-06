"use client";

import Link from "next/link";
import type { ReactNode } from "react";

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
  return (
    <section className="w-full bg-[#F7F7F7]">
      {/* CSS global da máscara (1x só) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .corner-mask {
              --corner: clamp(56px, 6vw, 96px);

              /* Safari/Chrome (webkit) */
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
              /* aplica "xor" entre as camadas (repete para todas) */
              -webkit-mask-composite: xor;

              /* Spec (Firefox/others) */
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
              /* "exclude" = recorte negativo das formas no fill total */
              mask-composite: exclude;
            }

            /* versão menor (se quiser em cards pequenos) */
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
    {/* overflow-hidden é essencial para a imagem 1.5x não vazar */}
    <div className="corner-mask relative h-full w-full overflow-hidden bg-[#B0EAFF] shadow-sm">
      
      {/* Imagem de BG: Sempre visível, estática e colada no bottom */}
      <img
        src="/cormedix_thumb.png"
        alt="Cormedix Background"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom"
      />

      {/* Conteúdo: z-10 para ficar acima da imagem */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10 md:p-12 lg:p-12 xl:p-16">
        <div>
          <p className="font-bricolageGrotesque text-sm font-semibold text-[#131415] transition-colors duration-300">
            Cormedix
          </p>

          <p className="font-bricolageGrotesque mt-2 text-3xl font-semibold leading-[1.15] text-[#131415] transition-colors duration-300">
            Prescrevendo dados para decisões.
          </p>
        </div>
      </div>

    </div>
  </Link>
</BentoCard>

            {/* Card 4 */}
            <BentoCard className="h-[240px] lg:h-[120px]">
  <Link href="/highpoint" className="block h-full">
    {/* IMPORTANTE: Usei 'corner-mask' E 'corner-mask-sm' juntas */}
    <div className="corner-mask corner-mask-sm relative flex h-full flex-col justify-center overflow-hidden bg-white shadow-sm">
      
      {/* Background Image Fixa */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Conteúdo: Padding reduzido (p-6) para caber na altura de 120px */}
     {/* O segredo é o h-full + items-center + text-center */}
<div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
  <p
    className="text-[1.25rem] font-medium leading-tight text-[#131415] lg:text-[1.5rem]"
    style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}
  >
    sobre mim
  </p>
</div>

    </div>
  </Link>
</BentoCard>

            {/* Card 7 */}
            <BentoCard className="h-[240px] lg:h-[240px]">
  <Link href="#" className="block h-full">
    <div className="corner-mask relative h-full w-full overflow-hidden bg-white shadow-sm">
      
      {/* Imagem Full - Sempre visível e sem efeitos de hover */}
      <img
        src="/mobile.png"
        alt="Background"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

    </div>
  </Link>
</BentoCard>
          </div>

          {/* ========== COLUNA 2 ========== */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            {/* Spacer (como você já tinha) */}
            <div className="hidden lg:block lg:min-h-[120px] lg:flex-1" />

            {/* Card 2 */}
                   <BentoCard className="h-[240px] lg:h-[480px]">
  <Link href="/cormedix" className="block h-full">
    {/* overflow-hidden é essencial para a imagem 1.5x não vazar */}
    <div className="corner-mask relative h-full w-full overflow-hidden bg-[#FFF8BD] shadow-sm">
      
      {/* Imagem de BG: Sempre visível, estática e colada no bottom */}
      <img
        src="/cormedix_thumb.png"
        alt="Cormedix Background"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom"
      />

      {/* Conteúdo: z-10 para ficar acima da imagem */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10 md:p-12 lg:p-12 xl:p-16">
        <div>
          <p className="font-bricolageGrotesque text-sm font-semibold text-[#131415] transition-colors duration-300">
            Gillead
          </p>

          <p className="font-bricolageGrotesque mt-2 text-3xl font-semibold leading-[1.15] text-[#131415] transition-colors duration-300">
            A epidemia
de mitos sobre a Hepatite C.
          </p>
        </div>
      </div>

    </div>
  </Link>
</BentoCard>

            {/* Card 5 */}
           <BentoCard className="h-[240px] lg:h-[240px]">
  <Link href="#" className="block h-full">
    <div className="corner-mask relative h-full w-full overflow-hidden bg-white shadow-sm">
      
      {/* Imagem Full - Sempre visível e sem efeitos de hover */}
      <img
        src="/smile.png"
        alt="Background"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

    </div>
  </Link>
</BentoCard>
          </div>

          {/* ========== COLUNA 3 ========== */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            {/* Card 3 (corner menor opcional) */}
          <BentoCard className="group h-[240px] lg:h-[240px]">
  <Link href="/pdpoint" className="block h-full">
    {/* overflow-hidden é essencial aqui para cortar o excesso dos 110% */}
    <div className="corner-mask corner-mask-sm relative h-full w-full overflow-hidden bg-white shadow-sm transition-colors duration-300">
      
      {/* 1 - Texture BG (dash.png) - Z-0 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: "url(/dash.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 2 - O SVG do gráfico (AUMENTADO em 10%) - Z-1 */}
      <img 
        src="/graaph.svg" 
        alt="" 
        // MUDANÇAS AQUI: w-[110%], left-[-5%] e max-w-none
        className="pointer-events-none absolute bottom-0 left-[-5%] z-[1] w-[110%] max-w-none object-contain object-bottom mix-blend-multiply opacity-30" 
      />

      {/* 3 - Conteúdo Centralizado - Z-10 */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <span 
          className="text-[3.5rem] font-semibold leading-none tracking-tighter text-[#131415] lg:text-[4rem]"
          style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}
        >
          +30pp
        </span>
        <p 
          className="max-w-[220px] text-[1.2rem] font-medium leading-tight text-[#131415] mt-2"
          style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}
        >
          de sucesso na conclusão das tarefas
        </p>
      </div>

      {/* Header discreto */}
      <div className="absolute top-8 left-8 z-20">
        <h3 className="text-[0.75rem] font-bold uppercase tracking-widest text-[#999]">
          {/* Texto opcional */}
        </h3>
      </div>
      
    </div>
  </Link>
</BentoCard>
            {/* Card 6 */}
           <BentoCard className="h-[240px] lg:h-[120px]">
  <Link href="/highpoint" className="block h-full">
    {/* IMPORTANTE: Usei 'corner-mask' E 'corner-mask-sm' juntas */}
    <div className="corner-mask corner-mask-sm relative flex h-full flex-col justify-center overflow-hidden bg-white shadow-sm">
      
      {/* Background Image Fixa */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url(/.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Conteúdo: Padding reduzido (p-6) para caber na altura de 120px */}
     {/* O segredo é o h-full + items-center + text-center */}
<div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center">
  <p
    className="text-[1.25rem] font-medium leading-tight text-[#131415] lg:text-[1.5rem]"
    style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}
  >
    copiar e-mail
  </p>
</div>

    </div>
  </Link>
</BentoCard>

            {/* Card 9 */}
                <BentoCard className="h-[240px] lg:h-[480px]">
  <Link href="/cormedix" className="block h-full">
    {/* overflow-hidden é essencial para a imagem 1.5x não vazar */}
    <div className="corner-mask relative h-full w-full overflow-hidden bg-[#E2FFBD] shadow-sm">
      
      {/* Imagem de BG: Sempre visível, estática e colada no bottom */}
      <img
        src="/cormedix_thumb.png"
        alt="Cormedix Background"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom"
      />

      {/* Conteúdo: z-10 para ficar acima da imagem */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8 sm:p-10 md:p-12 lg:p-12 xl:p-16">
        <div>
          <p className="font-bricolageGrotesque text-sm font-semibold text-[#131415] transition-colors duration-300">
            MSD
          </p>

          <p className="font-bricolageGrotesque mt-2 text-3xl font-semibold leading-[1.15] text-[#131415] transition-colors duration-300">
            Estabilizando a jornada de exames.
          </p>
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
