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
    <section className="w-full" style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(7,49,186,0.20) 100%), #F7F7F7",
      }}>
      <div className="mx-auto w-full max-w-screen-xl px-6">
        <div className="grid grid-cols-4 gap-6 lg:grid-cols-12">
          {/* TEXTO: 10 colunas, centralizado */}
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
                      reduzir a incerteza de investidores e jornalistas
                    </span>{" "}
                    durante a re-submissão à FDA.
                  </p>
                </div>

                {/* meta */}
                <div className="grid w-full grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
                  <MetaItem label="ROLE" value="Product Designer" />
                  <MetaItem label="TIMELINE" value="3 months" />
                  <MetaItem label="TECHNOLOGY" value="Wordpress, Spline, CMS" />
                  <MetaItem label="OUTCOME" value="Revamp website" align="right" />
                </div>
              </div>
            </div>
          </div>

          {/* MÍDIA: 12 colunas (base verde + thumb vermelho 10 col) */}
          <div className="col-span-4 lg:col-span-12">
            {/* “palco” da mídia com altura do thumb */}
            <div className="relative h-[620px] w-full">
              {/* base thumb case: 12 col, 128px, z-10, alinhada no bottom */}
              <div className="absolute bottom-0 z-10 h-[128px] bg-white left-[-24px] right-[-24px] lg:left-0 lg:right-0" />


              {/* thumb: 10 col, 620px, z-20, centralizado no grid */}
              <div className="relative z-20 grid h-full grid-cols-4 gap-6 lg:grid-cols-12">
                <div className="col-span-4 h-full bg-red-600 lg:col-span-10 lg:col-start-2" />
              </div>
            </div>
          </div>

          {/* espaçamento inferior opcional da seção (pra separar da próxima sessão) */}
          
        </div>
      </div>
    </section>
  );
}
