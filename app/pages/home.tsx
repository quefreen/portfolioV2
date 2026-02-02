// pages/home.tsx

type WireCardProps = {
  label: string;
  className?: string;
};

function WireCard({ label, className = "" }: WireCardProps) {
  return (
    <div
      className={[
        "relative w-full rounded-[48px] border border-black/15 bg-white/70",
        "flex items-center justify-center",
        "text-sm font-semibold text-black/60",
        "min-h-[160px]",
        className,
      ].join(" ")}
    >
      <span className="px-4 text-center">{label}</span>
    </div>
  );
}

const CONTAINER = "mx-auto w-full max-w-screen-xl px-6";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const CONTENT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";
const CONTENT_12 = "col-span-4 lg:col-span-12";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F7F7] overflow-x-hidden">
      {/* =========================
          HERO (3x3)
         ========================= */}
      <section className="w-full pt-16 sm:pt-20 lg:pt-24">
        <div className={CONTAINER}>
          <div className={GRID_12}>
            <div className={CONTENT_10}>
              {/* grid 3x3 no desktop, stack no mobile */}
              <div
                className={[
                  "grid grid-cols-1 gap-6",
                  "lg:grid-cols-12",
                  // 3 linhas no desktop: topo (curta) / meio (alta) / base (curta)
                  "lg:[grid-template-rows:180px_520px_180px]",
                ].join(" ")}
              >
                {/* Bloco 1 (topo esquerdo) */}
                <div className="lg:col-span-4 lg:col-start-1 lg:row-start-1">
                  <WireCard label="Hero • Title (orange entry text)" className="h-full" />
                </div>

                {/* Bloco 5 (centro) — mais alto */}
                <div className="lg:col-span-4 lg:col-start-5 lg:row-start-2">
                  <WireCard
                    label="Hero • Center (Spline / portrait placeholder) ~500px"
                    className="h-full min-h-[460px]"
                  />
                </div>

                {/* Bloco 9 (bottom right) */}
                <div className="lg:col-span-4 lg:col-start-9 lg:row-start-3">
                  <WireCard label="Hero • Support text (bottom-right)" className="h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          BENTO (7 cards)
         ========================= */}
      <section className="w-full pt-14 sm:pt-16 lg:pt-20">
        <div className={CONTAINER}>
          <div className={GRID_12}>
            <div className={CONTENT_10}>
              <div className="flex items-end justify-between">
                <p className="text-xl font-semibold leading-none text-[#141618]">
                  Close projects
                </p>
                <p className="text-sm font-semibold leading-none text-black/40">
                  (wireframe)
                </p>
              </div>
            </div>

            {/* bento pode usar 12 col pra “respirar” mais */}
            <div className={CONTENT_12}>
              <div className="mt-6">
                <div
                  className={[
                    "grid grid-cols-1 gap-6",
                    "md:grid-cols-2",
                    "lg:grid-cols-12 lg:auto-rows-[120px]",
                  ].join(" ")}
                >
                  {/* A (left tall) */}
                  <div className="lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:row-span-5">
                    <WireCard label="Bento • Card A (tall)" className="h-full" />
                  </div>

                  {/* B (center taller) */}
                  <div className="lg:col-span-4 lg:col-start-5 lg:row-start-1 lg:row-span-6">
                    <WireCard label="Bento • Card B (taller)" className="h-full" />
                  </div>

                  {/* C (right top) */}
                  <div className="lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:row-span-3">
                    <WireCard label="Bento • Card C" className="h-full" />
                  </div>

                  {/* D (right mid thin) */}
                  <div className="lg:col-span-4 lg:col-start-9 lg:row-start-4 lg:row-span-2">
                    <WireCard label="Bento • Card D (thin)" className="h-full" />
                  </div>

                  {/* E (left small) */}
                  <div className="lg:col-span-4 lg:col-start-1 lg:row-start-6 lg:row-span-2">
                    <WireCard label="Bento • Card E (small)" className="h-full" />
                  </div>

                  {/* F (center small) */}
                  <div className="lg:col-span-4 lg:col-start-5 lg:row-start-7 lg:row-span-2">
                    <WireCard label="Bento • Card F (small)" className="h-full" />
                  </div>

                  {/* G (bottom wide) */}
                  <div className="lg:col-span-12 lg:col-start-1 lg:row-start-9 lg:row-span-4">
                    <WireCard
                      label="Bento • Card G (wide / full width)"
                      className="h-full min-h-[220px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CONTACT BAND (wireframe)
         ========================= */}
      <section className="w-full pt-14 sm:pt-16 lg:pt-20 pb-24">
        <div className={CONTAINER}>
          <div className={GRID_12}>
            <div className={CONTENT_12}>
              <div className="rounded-[56px] bg-[#141618] p-8 sm:p-12 lg:p-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-8">
                    <div className="rounded-[48px] border border-white/15 bg-white/5 p-8">
                      <p className="text-white/80 text-sm font-semibold">
                        Contact band • headline placeholder
                      </p>
                      <div className="mt-4 h-10 w-full rounded-xl bg-white/10" />
                      <div className="mt-3 h-10 w-[70%] rounded-xl bg-white/10" />
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <div className="rounded-[48px] border border-white/15 bg-white/5 p-8">
                      <p className="text-white/80 text-sm font-semibold">
                        Contact band • links placeholder
                      </p>
                      <div className="mt-4 h-10 w-full rounded-xl bg-white/10" />
                      <div className="mt-3 h-10 w-full rounded-xl bg-white/10" />
                      <div className="mt-3 h-10 w-full rounded-xl bg-white/10" />
                    </div>
                  </div>

                  <div className="lg:col-span-12">
                    <div className="rounded-[48px] border border-white/15 bg-white/5 p-8">
                      <p className="text-white/80 text-sm font-semibold">
                        Footer row placeholder
                      </p>
                      <div className="mt-4 h-10 w-full rounded-xl bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
