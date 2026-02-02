// src/components/title_case_header.tsx

type MetaItemProps = {
  label: string;
  value: string;
  align?: "left" | "right";
};

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

export default function TitleCaseHeader() {
  return (
    <section
      className="w-full"
      style={{
        background:
          "linear-gradient(180deg, rgba(225, 225, 225, 0) 50%, rgba(0, 143, 190 , 0.2) 100%), #F7F7F7",
      }}
    >
      <div className="mx-auto w-full max-w-screen-xl px-6">
        <div className="grid grid-cols-4 gap-6 lg:grid-cols-12">
          {/* TEXTO: 10 col centralizado (padrão do projeto) */}
          <div className="col-span-4 lg:col-span-10 lg:col-start-2">
            <div className="flex w-full items-start pt-16 sm:pt-20 lg:pt-24">
              <div className="flex w-full flex-col gap-12">
                {/* topo */}
                <div className="flex flex-col gap-4">
                  <p className="text-sm font-semibold tracking-wide text-neutral-400">
                    CORMEDIX
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm leading-none text-black">
                      B2B
                    </span>
                    <span className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm leading-none text-black">
                      Regulated Industry
                    </span>
                    <span className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm leading-none text-black">
                      Investor Relations
                    </span>
                  </div>

                  <h1 className="font-display text-[44px] font-semibold leading-[1.15] text-black sm:text-[52px] lg:text-[56px] lg:leading-[1.2]">
                    Prescrevendo dados para decisões.
                  </h1>

                  <p className="text-lg font-semibold leading-[1.35] text-black sm:text-xl">
                    Uma nova arquitetura para{" "}
                    <span className="text-[#0731BA]">
                      reduzir a incerteza de investidores e jornalistas.
                    </span>{" "}
                  </p>
                </div>

                {/* meta */}
                <div className="grid w-full grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
                  <MetaItem label="ROLE" value="Product Designer" />
                  <MetaItem label="TIMELINE" value="3 months" />
                  <MetaItem label="TECHNOLOGY" value="Wordpress, Spline, CMS" />
                  <MetaItem label="OUTCOME" value="Revamp website" align="left" />
                </div>
              </div>
            </div>
          </div>

          {/* MÍDIA (col-12) */}
          <div className="col-span-4 lg:col-span-12">
            {/* Espaço controlado entre texto e vídeo (sem empurrar grid interno) */}
            <div className="relative mt-10 h-[620px] w-full sm:mt-12">
              
              {/* --- ALTERAÇÃO AQUI --- */}
              {/* BASE BRANCA (z-10) com MÁSCARA */}
<div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10">
  <div 
    className="relative -mx-6 h-[128px] bg-white lg:-mx-12"
    style={{
      // 1. Definimos as 3 camadas: SVG Esq, SVG Dir, e o Fundo Sólido (gradiente preto serve como "tudo preenchido")
      maskImage: `
        url(/esqtb.svg), 
        url(/dirtb.svg), 
        linear-gradient(#000, #000)
      `,
      
      // 2. Posicionamos cada camada (Esq Top, Dir Top, Centro)
      maskPosition: "left top, right top, center",
      
      // 3. Dizemos para não repetir
      maskRepeat: "no-repeat",
      
      // 4. O tamanho. Note que mantivemos o seu 'clamp' aqui para responsividade
      maskSize: "clamp(56px, 9vw, 140px) auto, clamp(56px, 9vw, 140px) auto, 100% 100%",
      
      // 5. A MÁGICA: 'exclude' (ou xor) remove a interseção entre o SVG e o fundo
      maskComposite: "exclude",
      WebkitMaskComposite: "xor", // Necessário para Chrome/Safari/iOS
    }}
  />
</div>
              {/* --- FIM DA ALTERAÇÃO --- */}

              {/* THUMB (z-20): 10 col centralizado */}
              <div className="relative z-20 grid h-full grid-cols-4 gap-6 lg:grid-cols-12">
                <div className="col-span-4 h-full lg:col-span-10 lg:col-start-2">
                  <div className="relative h-full w-full overflow-hidden bg-black">
                    {/* Vídeo */}
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      src="/hero.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />

                    {/* SVGs nos cantos do Vídeo (Já existiam) */}
                    <img
                      src="/esqtb.svg"
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-0 z-30 h-auto"
                      style={{ width: "clamp(56px, 9vw, 140px)" }}
                    />

                    <img
                      src="/dirtb.svg"
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute right-0 top-0 z-30 h-auto"
                      style={{ width: "clamp(56px, 9vw, 140px)" }}
                    />
                  </div>
                </div>
              </div>
              {/* /thumb */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}