// src/components/cormedix_case_intro.tsx

import type { CSSProperties } from "react";
import React from "react";

type MetaItemProps = {
  label: string;
  value: string;
  align?: "left" | "right";
};

type TeamMember = {
  initials: string; // ex: "RB"
  name: string; // ex: "Ricardo Brandão"
  role: string; // ex: "Product Manager"
};

const TEAM = [
  {
    id: "jaqueline-assis",
    initials: "JA",
    name: "Jaqueline Assis",
    role: "Gerente de Contas",
  },
  {
    id: "franciele-souza",
    initials: "FS",
    name: "Franciele Souza",
    role: "Gerente de Projetos",
  },
];


function MetaItem({ label, value, align = "left" }: MetaItemProps) {
  const alignCls =
    align === "right"
      ? "lg:items-end lg:text-right"
      : "lg:items-start lg:text-left";

  return (
    <div className={`flex w-full flex-col ${alignCls}`}>
      <p className="text-xs font-semibold tracking-wide text-neutral-500">
        {label}
      </p>
      <p className="mt-2 text-[16px] leading-[1.3] text-black">{value}</p>
    </div>
  );
}

// --- CONSTANTES DO LAYOUT (MESMAS DO BENTO) ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";
const CONTENT_12 = "col-span-4 lg:col-span-12";

// Bleed até iPad (lg). No desktop (xl+) NÃO encosta no viewport.
const SHAPE_BLEED = "-mx-4 md:-mx-8 lg:-mx-12 xl:mx-0";
// padding interno: reaplica enquanto bleed está ativo; no xl+ vira 0 para não duplicar
const SHAPE_INNER_PAD = "px-4 sm:px-4 md:px-8 lg:px-12 xl:px-0";

// ✅ SISTEMA DE ESPAÇAMENTO (tokens)
const SECTION_Y = "py-16 sm:py-20 lg:py-24"; // 64 / 80 / 96 (top e bottom)
const STACK_24 = "gap-6"; // 24
const STACK_48 = "gap-12"; // 48
const REL_P_TO_P = "gap-3"; // 12 (metade)
const REL_H_TO_BODY = "gap-6"; // 24

// ✅ Overlap para matar 1px seam
const OVERLAP_PX = 12;

// --- MÁSCARAS (variações por “largura”/peso visual) ---
function cornerClamp(size: "sm" | "md" | "lg") {
  if (size === "sm") return "clamp(24px, 4.5vw, 56px)";
  if (size === "md") return "clamp(32px, 6vw, 80px)";
  return "clamp(56px, 9vw, 140px)";
}

function cardMask4Corners(size: "sm" | "md" | "lg"): CSSProperties {
  const c = cornerClamp(size);
  return {
    maskImage: `
      url(/esqtb.svg),
      url(/dirtb.svg),
      url(/esqbb.svg),
      url(/dirbb.svg),
      linear-gradient(#000, #000)
    `,
    maskPosition: `
      left top,
      right top,
      left bottom,
      right bottom,
      center
    `,
    maskRepeat: "no-repeat",
    maskSize: `
      ${c} auto,
      ${c} auto,
      ${c} auto,
      ${c} auto,
      100% 100%
    `,
    maskComposite: "exclude",
    WebkitMaskComposite: "xor",
  };
}

// Apenas cantos de baixo (para shapes que “encaixam” com o bloco de cima)
function edgeMaskBottom(size: "sm" | "md" | "lg"): CSSProperties {
  const c = cornerClamp(size);
  return {
    maskImage: `url(/esqbb.svg), url(/dirbb.svg), linear-gradient(#000, #000)`,
    maskPosition: "left bottom, right bottom, center",
    maskRepeat: "no-repeat",
    maskSize: `${c} auto, ${c} auto, 100% 100%`,
    maskComposite: "exclude",
    WebkitMaskComposite: "xor",
  };
}

// Apenas cantos de cima (para base branca de encaixe)
function edgeMaskTop(size: "sm" | "md" | "lg"): CSSProperties {
  const c = cornerClamp(size);
  return {
    maskImage: `url(/esqtb.svg), url(/dirtb.svg), linear-gradient(#000, #000)`,
    maskPosition: "left top, right top, center",
    maskRepeat: "no-repeat",
    maskSize: `${c} auto, ${c} auto, 100% 100%`,
    maskComposite: "exclude",
    WebkitMaskComposite: "xor",
  };
}

// --- Impact card helper ---
function ImpactCard({
  children,
  size = "sm",
  className = "",
}: {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-2.5 bg-white p-10 ${className}`}
      style={cardMask4Corners(size)}
    >
      {children}
    </div>
  );
}

export default function MSDCaseIntro() {
  return (
    <section className="w-full">
      {/* =========================
          1) HERO / TITLE HEADER
         ========================= */}
      <div
        className="relative z-20 w-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(225, 225, 225, 0) 50%, rgba(0, 164, 101, 0.2) 100%), #F7F7F7",
        }}
      >
        <div className={SITE_CONTAINER}>
          <div className={GRID_12}>
            {/* TEXTO (10 col) */}
            <div className={TEXT_10}>
              <div className={`${SECTION_Y} flex w-full items-start`}>
                <div className="flex w-full flex-col gap-12">
                  <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold tracking-wide text-neutral-400">
                      MSD
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm leading-none text-black">
                        Content + Product
                      </span>
                      <span className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm leading-none text-black">
                        0→1 Discovery
                      </span>
                      <span className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm leading-none text-black">
                        Saúde Pública
                      </span>
                    </div>

                    <h1 className="font-display text-[44px] font-semibold leading-[1.15] text-black sm:text-[52px] lg:text-[56px] lg:leading-[1.2]">
                      Estabilizando
a jornadade exames.
                    </h1>

                    {/* ✅ azul só aqui */}
                    <p className="text-lg font-semibold leading-[1.35] text-black sm:text-xl">
                      Reduzi risco operacional e retrabalho em um fluxo crítico de exames clínicos{" "}
                      <span className="text-[#00A465]">
                      sem tocar no backend.
                      </span>
                    </p>
                  </div>
                  
                  {/* meta */}
                  <div className="grid w-full grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
                    <MetaItem label="FUNÇÃO" value="Designer de Produto" />
                    <MetaItem label="DURAÇÃO" value="6 meses" />
                    <MetaItem label="TECNOLOGIAS" value="Sistema Legado" />
                    <MetaItem label="ENTREGAS" value="Fluxos de tarefas otimizados" />
                  </div>
                </div>
              </div>
            </div>

            {/* MÍDIA (col-12) */}
            <div className={CONTENT_12}>
              <div className="relative -mt-6 h-[620px] w-full sm:mt-0">
                {/* BASE BRANCA com MÁSCARA TOP (encaixe) */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10">
                  <div
                    className={`relative h-[128px] bg-white ${SHAPE_BLEED}`}
                    style={edgeMaskTop("lg")}
                  />
                </div>

                {/* THUMB (10 col) */}
                <div className="relative z-20 grid h-full grid-cols-4 gap-6 lg:grid-cols-12">
                  <div className="col-span-4 h-full lg:col-span-10 lg:col-start-2">
                    <div className="relative h-full w-full overflow-hidden bg-black">
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/msd_hero.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />

                      {/* SVGs nos cantos do Vídeo (top) */}
                      <img
                        src="/esqtb.svg"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 top-0 z-30 h-auto"
                        style={{ width: cornerClamp("lg") }}
                      />
                      <img
                        src="/dirtb.svg"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute right-0 top-0 z-30 h-auto"
                        style={{ width: cornerClamp("lg") }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* /thumb */}
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          2) ONE MINUTE / RESUMO
          - grudado no hero
          - gradient invertido
          - overlap 12px pra eliminar seam
         ========================= */}
      <div
        className="relative z-10 w-full"
        style={{
          background:
            "linear-gradient(0deg, rgba(225, 225, 225, 0) 0%, rgba(0, 164, 101, 0.2) 100%), #F7F7F7",
          marginTop: `-${OVERLAP_PX}px`, // ✅ overlap real
          paddingTop: `${OVERLAP_PX}px`, // ✅ compensa pra não “subir” conteúdo
        }}
      >
        <div className={`${SITE_CONTAINER} py-0`}>
          <div className={GRID_12}>
            <div className={CONTENT_12}>
              <div className={SHAPE_BLEED}>
                <div className="w-full bg-white">
                  <div className={SHAPE_INNER_PAD}>
                    <div className={GRID_12}>
                      <div className={TEXT_10}>
                        <div className={`${SECTION_Y} flex flex-col gap-12`}>
                          <div className="flex flex-col gap-6">
                            <p className="text-2xl font-semibold leading-[1.2] text-[#131415]">
                              Resumo do projeto
                            </p>
                          </div>

                          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                            {/* Conteúdo */}
                            <div className="lg:col-span-8">
                              {/* ✅ Setores separados (48px) */}
                              <div className={`flex flex-col ${STACK_48}`}>
                                {/* Contexto */}
                                <div className={`flex flex-col ${REL_H_TO_BODY}`}>
                                  <p className="text-xl font-semibold leading-none text-[#131415]">
                                    Contexto
                                  </p>

                                  {/* ✅ Relacionados (P->P = 12px) */}
                                  <div className={`flex flex-col ${REL_P_TO_P}`}>
                                    <p className="text-lg leading-[1.45] text-[#131415]">
Transformação de um sistema legado de solicitação e operação de exames críticos e sensível usado por médicos, laboratórios e logística.                                    </p>

                                    <p className="text-lg leading-[1.45] text-[#131415]">
O produto antigo era desktop-only, tinha jornadas longas com telas superdensas (até 40 decisões), pouca tolerância a erro (ex.: sem “voltar”) e retomada difícil, gerando atrito, chamadas no SAC e risco operacional.                                    </p>

                                    
                                  </div>
                                </div>

                                {/* Resultados */}
                                <div className={`flex flex-col ${REL_H_TO_BODY}`}>
                                  <p className="text-xl font-semibold leading-none text-[#131415]">
                                    Resultados
                                  </p>

                                  <div className="flex flex-col gap-8">
                                    {/* Item 1 */}
                                    <div className={`flex flex-col ${REL_P_TO_P}`}>
                                      
                                      <p className="text-lg leading-[1.45] text-[#131415]">
<b>3 fluxos críticos simplificados</b> (médico, laboratório, logística)                                      </p>
<p className="text-lg leading-[1.45] text-[#131415]">
Voltar/retomar/estados para<b> evitar perda de trabalho</b>                                     </p>
<p className="text-lg leading-[1.45] text-[#131415]">
Autorizações via PDF com status (menos ambiguidade e retrabalho)                                  </p>
<p className="text-lg leading-[1.45] text-[#131415]">
Design system + regras + docs (consistência e escala)                                    </p>
<p className="text-lg leading-[1.45] text-[#131415]">
HTML pronto pro legado (viabilidade e menos risco)                              </p>
                                    </div>

                                    {/* Item 2 */}
                                    <div className={`flex flex-col ${REL_P_TO_P}`}>
                                      
                                      <p className="text-lg leading-[1.45] text-[#131415]">
                                 </p>
                                    </div>

                                    {/* Item 3 */}
                                    <div className={`flex flex-col ${REL_P_TO_P}`}>
                                     
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-4">
                              <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-3">
                                  <div>
  <p className="text-base font-semibold leading-none text-[#747474]">Time</p>

<div className="mt-3 flex items-center -space-x-2">
  {TEAM.map((m) => (
    <div key={m.id} className="relative">
      {/* Trigger */}
      <div
        className={[
          "group",
          "relative flex h-12 w-12 items-center justify-center",
          "rounded-full border-2 border-white bg-[#D9D9D9]",
          "text-[14px] font-semibold leading-none text-[#131415]",
          "select-none",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4C2C]/30",
        ].join(" ")}
        tabIndex={0}
        aria-label={`${m.name} - ${m.role}`}
      >
        {/* ✅ Iniciais */}
        <span aria-hidden="true">{m.initials}</span>

        {/* Tooltip (centralizado + preto) */}
        <div
          className={[
            "pointer-events-none absolute left-1/2 top-0 z-50",
            "-translate-x-1/2 -translate-y-[calc(100%+10px)]",
            "opacity-0 scale-95",
            "group-hover:opacity-100 group-hover:scale-100",
            "group-focus-visible:opacity-100 group-focus-visible:scale-100",
            "transition-all duration-150",
          ].join(" ")}
          role="tooltip"
          aria-hidden="true"
        >
          <div
            className={[
              "w-[240px] bg-[#131415] px-4 py-3",
              "shadow-[0_12px_30px_rgba(0,0,0,0.25)]",
            ].join(" ")}
          >
            <div className="flex flex-col gap-1">
              <p className="text-[14px] font-semibold leading-[1.2] text-white">
                {m.name}
              </p>
              <p className="text-[13px] font-medium leading-[1.2] text-white/75">
                {m.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

</div>
                                  <div className="h-1 w-full bg-black/10" />
                                </div>

                                <div className="flex flex-col gap-3">
                                  <p className="text-base font-semibold leading-none text-[#747474]">
                                    Cliente
                                  </p>
                                  <p className="text-base leading-[1.45] text-[#131415]">
                                    MSD
                                  </p>
                                  <div className="h-1 w-full bg-black/10" />
                                </div>

                                <div className="flex flex-col gap-3">
                                  <p className="text-base font-semibold leading-none text-[#747474]">
                                    Responsabilidades
                                  </p>
                                  <p className="text-base leading-[1.45] text-[#131415]">
                                    Pesquisa & síntese • Estratégia de UX/Conteúdo • Arquitetura de informação • Health literacy (tom/clareza) • Instrumentação (eventos + funis)
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* /layout */}
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /inner pad */}
                </div>
              </div>
              {/* /bleed */}
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          3) IMPACTO
          - SECTION_Y simétrico
          - fill azul mantido
          - máscara bottom para encaixe do shape
         ========================= */}
      <div className="w-full">
        <div className={SITE_CONTAINER}>
          <div className={GRID_12}>
            <div className={CONTENT_12}>
              <div className={SHAPE_BLEED}>
                <div
                  className="w-full bg-[#D1F9EB]"
                  style={edgeMaskBottom("lg")}
                >
                  <div className={SHAPE_INNER_PAD}>
                    <div className={GRID_12}>
                      <div className={TEXT_10}>
                        <div className={`${SECTION_Y} flex flex-col ${STACK_24}`}>
                          {/* Header */}
                          <div className="h-2"></div>
                          <div className="flex flex-col gap-4">
                            <p className="text-lg font-semibold leading-none text-[#131415]">
                              Impacto
                            </p>
                            <p className="text-[32px] font-semibold leading-[1.2] text-[#131415] sm:text-[40px]">
                              Mitigação de Risco (sem tocar no backend)
                            </p>
                          </div>

                          {/* Cards (3) */}
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <ImpactCard size="sm" className="border-2 border-white">
                              <p className="text-[40px] font-semibold leading-[1.1] text-[#131415]">
                                Menos erro em decisões críticas (Error-proofing)
                              </p>
                              <p className="text-lg font-semibold leading-[1.4] text-[#131415]">
Aumentei a tolerância a erro com padrões de recuperação e estados claros.                           </p>
                            </ImpactCard>

                            <ImpactCard size="sm">
                              <p className="text-[40px] font-semibold leading-[1.1] text-[#131415]">
                                Redução de carga cognitiva 
                              </p>
                              <p className="text-lg font-semibold leading-[1.4] text-[#131415]">
Reduzi densidade de decisão e reorganizei a informação para decisões mais seguras.                              </p>
                            </ImpactCard>

                            
                          </div>

                          {/* Espaço “controlado” */}
                         

                          {/* Parte 2 */}
                          

                          {/* Cards (2) */}
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <ImpactCard size="md">
                              <p className="text-[40px] font-semibold leading-[1.1] text-[#131415]">
                                Mobile onde não existia produto
                              </p>
                              <p className="text-lg font-medium leading-[1.4] text-[#131415] sm:text-xl">
                                Criei a base mobile-first para um produto que não tinha versão mobile.
                              </p>
                            </ImpactCard>

                            <ImpactCard size="md">
                              <p className="text-[40px] font-semibold leading-[1.1] text-[#131415]">
                                Escalabilidade por consistência 
                              </p>
                              <p className="text-lg font-medium leading-[1.4] text-[#131415] sm:text-xl">
                               Para evitar que melhorias virassem “páginas soltas”, estruturei um foundation.
                              </p>
                            </ImpactCard>
                          </div>
                          <div className="h-2"></div>
                        </div>
                        {/* /SECTION_Y */}
                      </div>
                    </div>
                  </div>
                  {/* /inner pad */}
                </div>
                {/* /shape */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
