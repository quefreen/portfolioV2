"use client";

// src/components/bento_home.tsx
const GAP_CLASS = "gap-6"; 
const CARD = "bg-white p-8 sm:p-12";

const HEIGHT = {
  small: "120px",
  medium: "240px",
  large: "480px",
  full: "clamp(280px, 26vw, 420px)",
};

function BentoCard({
  n,
  height,
  interactive = false,
}: {
  n: number;
  height: keyof typeof HEIGHT;
  interactive?: boolean;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (max-width: 1023px) {
            .bento-card-wrapper-${n} {
              height: 240px !important;
            }
          }
        `
      }} />
      <div 
        className={`${CARD} bento-card-wrapper-${n}`} 
        style={{ height: HEIGHT[height] }}
      >
        <div className="flex h-full flex-col justify-between">
          <p className="text-sm font-semibold text-black/60">Card {n}</p>
          <div className="h-24 w-full bg-black/5" />
          
          {interactive && (
            <button 
              className="mt-4 rounded bg-black px-4 py-2 text-white hover:bg-black/80"
              onClick={() => console.log(`Card ${n} clicked`)}
            >
              Click me
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default function BentoHome() {
  return (
    <section className="w-full bg-[#F7F7F7] py-12">
      <div className="mx-auto w-full max-w-screen-xl px-6">
        <div className={`grid grid-cols-1 ${GAP_CLASS} lg:grid-cols-12`}>
          {/* Coluna 1 */}
          <div className={`flex flex-col ${GAP_CLASS} lg:col-span-4`}>
            <BentoCard n={1} height="large" />
            <BentoCard n={4} height="small" interactive={true} />
            <BentoCard n={7} height="medium" />
          </div>

          {/* Coluna 2 */}
          <div className={`flex flex-col ${GAP_CLASS} lg:col-span-4`}>
            <style dangerouslySetInnerHTML={{
              __html: `
                .spacer-col2 {
                  display: none;
                }
                @media (min-width: 1024px) {
                  .spacer-col2 {
                    display: block !important;
                    min-height: 120px;
                  }
                }
              `
            }} />
            <div className="spacer-col2" />
            <BentoCard n={2} height="large" interactive={true} />
            <BentoCard n={5} height="medium" />
          </div>

          {/* Coluna 3 */}
          <div className={`flex flex-col ${GAP_CLASS} lg:col-span-4`}>
            <BentoCard n={3} height="medium" />
            <BentoCard n={6} height="small" />
            <BentoCard n={9} height="large" interactive={true} />
          </div>

          {/* Full Width */}
          <div className="lg:col-span-12">
            <BentoCard n={10} height="full" />
          </div>
        </div>
      </div>
    </section>
  );
}