// src/components/footer_base.tsx
import Image from "next/image";
import Link from "next/link";
import { CopyEmailButton } from "./copymail";

// --- CONSTANTES DO LAYOUT (MESMAS DO HERO/BENTO) ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

export function FooterBase() {
  return (
    <footer className="w-full bg-[#131415]">
      <div className="h-12 sm:h-16" />

      {/* Conteúdo principal */}
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          <div className={TEXT_10}>
            {/* ✅ trava alinhamento */}
            <div className="flex w-full flex-col items-start gap-8 text-left">
              <h2 className="m-0 w-full text-[28px] font-semibold leading-[1.15] text-white sm:text-[32px] lg:text-[36px]">
                Para novos projetos, jogar RPG <br />
                ou conversar sobre design, entre em contato.
              </h2>

              <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
                <p
                  className="m-0 text-[20px] font-semibold leading-none text-[#838383] sm:text-[22px]"
                  style={{
                    fontFamily: "var(--font-schibstedGrotesk), sans-serif",
                  }}
                >
                  Chega mais, uai.
                </p>

                <div className="flex flex-wrap items-center justify-start gap-4">
                  <a
                    href="https://www.linkedin.com/in/quefreen/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[16px] font-medium text-white hover:text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "var(--font-schibstedGrotesk), sans-serif",
                    }}
                  >
                    LinkedIn
                  </a>

                  <a
                    href="mailto:quefreen.almeida@gmail.com"
                    className="text-[16px] font-medium text-white hover:text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "var(--font-schibstedGrotesk), sans-serif",
                    }}
                  >
                    Email
                  </a>

                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-14 sm:h-16" />

      {/* Barra inferior */}
      <div className="border-t border-white/10">
        <div className={SITE_CONTAINER}>
          <div className={GRID_12}>
            <div className={TEXT_10}>
              {/* ✅ trava alinhamento */}
              <div className="flex h-20 w-full flex-col items-start justify-center gap-4 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex items-center gap-4">
                  <Link
                    href="/"
                    className="text-[16px] font-medium text-white hover:text-[#FF6B00] transition-colors"
                    style={{
                      fontFamily: "var(--font-schibstedGrotesk), sans-serif",
                    }}
                  >
                    quefreen
                  </Link>

                  <p
                    className="m-0 text-[16px] font-medium text-[#999]"
                    style={{
                      fontFamily: "var(--font-schibstedGrotesk), sans-serif",
                    }}
                  >
                    designer de produto
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <p
                    className="m-0 text-[16px] font-medium text-white"
                    style={{
                      fontFamily: "var(--font-schibstedGrotesk), sans-serif",
                    }}
                  >
                    Feito com
                  </p>

                  <Image
                    src="/dayse.svg"
                    alt="Dayse"
                    width={24}
                    height={24}
                    className="inline-block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-10 sm:h-12" />
    </footer>
  );
}
