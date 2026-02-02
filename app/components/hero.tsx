// components/hero.tsx
import BentoHome from "./bentohome";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F7F7F7]">
      {/* Spline cobrindo TODA a seção (Hero + Bento) */}
      <div className="absolute inset-0 z-0" style={{ minHeight: "100%" }}>
        <iframe
          title="Spline hero"
          src="https://my.spline.design/untitled-fa0734516d17533ee2ab2c80d320ece2/"
          width="100%"
          height="100%"
          frameBorder={0}
          style={{ minHeight: "100vh" }}
        />
      </div>

      {/* Conteúdo por cima do Spline */}
      <div className="relative z-10">
        {/* Hero original com altura fixa */}
        <div style={{ height: 800 }} className="pointer-events-none">
          <div className="mx-auto h-full w-full max-w-screen-xl px-6">
            <div className="relative h-full">
              {/* Top-left */}
              <p
                className="absolute left-0 top-0 font-bricolageGrotesque font-semibold leading-[1.2] text-[#FF4C2C]"
                style={{ fontSize: "clamp(24px, 2.6vw, 44px)", maxWidth: "16ch" }}
              >
                Product Designer exploring AI and programming.
              </p>

              {/* Bottom-right */}
              <p
                className="absolute bottom-0 right-0 text-right font-bricolageGrotesque font-semibold leading-[1.2] text-[#131415]"
                style={{ fontSize: "clamp(18px, 2vw, 24px)", maxWidth: "26ch" }}
              >
                A creative generalist and problem-solver skilled in designing
                seamless workflows and structuring complex information.
              </p>
            </div>
          </div>
        </div>

        {/* BentoHome agora dentro do Hero */}
        <BentoHome />
      </div>
    </section>
  );
}