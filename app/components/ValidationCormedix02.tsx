// src/components/validation_cormedix.tsx
import type { CSSProperties } from "react";

// --- PADRÃO DO SITE (OBRIGATÓRIO) ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

// --- SECTION Y (64/80/96) ---
const SECTION_Y = "py-16 sm:py-20 lg:py-24";

// --- SPACING TOKENS ---
const STACK_12 = "gap-3"; // 12px
const STACK_24 = "gap-6"; // 24px
const STACK_48 = "gap-12"; // 48px

// --- HELPERS: CORNERS / MASKS ---
type CornerSize = "sm" | "md" | "lg";

function cornerClamp(size: CornerSize) {
  // sm: cards menores (ex.: 4 col)
  // md: cards médios
  // lg: cards grandes (10/12 col)
  if (size === "sm") return "clamp(28px, 5vw, 72px)";
  if (size === "lg") return "clamp(56px, 9vw, 140px)";
  return "clamp(32px, 6vw, 80px)";
}

function mask4Corners(size: CornerSize): CSSProperties {
  const c = cornerClamp(size);

  // 5 layers => 4 composites
  const maskImage = `
    url(/esqtb.svg),
    url(/dirtb.svg),
    url(/esqbb.svg),
    url(/dirbb.svg),
    linear-gradient(#000, #000)
  `;
  const maskPosition = `
    left top,
    right top,
    left bottom,
    right bottom,
    center
  `;
  const maskSize = `
    ${c} auto,
    ${c} auto,
    ${c} auto,
    ${c} auto,
    100% 100%
  `;

  return {
    maskImage,
    maskPosition,
    maskRepeat: "no-repeat",
    maskSize,
    // Standard (alguns browsers)
    maskComposite: "exclude, exclude, exclude, exclude" as any,
    // WebKit (consistência real)
    WebkitMaskImage: maskImage as any,
    WebkitMaskPosition: maskPosition as any,
    WebkitMaskRepeat: "no-repeat" as any,
    WebkitMaskSize: maskSize as any,
    WebkitMaskComposite: "xor, xor, xor, xor" as any,
  };
}

type InfoCard = {
  title: string;
  body: string;
};

function ValidationInfoCard({ title, body }: InfoCard) {
  return (
    <div className="h-full bg-white p-10 sm:p-12 lg:p-16" style={mask4Corners("md")}>
      <div className={`flex h-full flex-col justify-center ${STACK_12}`}>
        <p className="text-xl font-medium leading-6 text-[#FF4C2C]">{title}</p>
        <p className="text-xl font-medium leading-6 text-black">{body}</p>
      </div>
    </div>
  );
}

export default function ValidationCormedix02() {
  const cards: InfoCard[] = [
    {
      title: "Participantes",
      body: "6 investidores + 8 pessoas de mídia e comunidade científica",
    },
    {
      title: "Formato",
      body: "Teste de navegação em protótipo, com 6 tarefas críticas",
    },
    {
      title: "Seleção das tarefas",
      body: "4 definidas por mim + 2 solicitadas diretamente pelo time de negócio",
    },
    {
      title: "Métricas",
      body: "Sucesso da tarefa, tempo de execução, misclicks e SEQ (1–7)",
    },
  ];

  return (
    <section className={`w-full ${SECTION_Y}`}>
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          <div className={TEXT_10}>
            <div className={`flex w-full flex-col ${STACK_48}`}>
              {/* Header */}
              <div className="flex w-full flex-col">
                <div className={`flex flex-col ${STACK_24}`}>
                  <div className="flex">
                    <span className="inline-flex items-center gap-2 rounded-[32px] bg-white px-3 py-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
                      {/* ✅ #404040 -> #131415 */}
                      <span className="text-lg font-semibold leading-4 text-[#131415]">
                        Validation &amp; Evidence
                      </span>
                    </span>
                  </div>

                  <p className="text-[32px] font-medium leading-[48px] text-black sm:text-[40px]">
                    Testando os novos padrões com usuários.
                  </p>
                </div>

                {/* Regra “Relacionados” */}
                <p className="mt-6 text-xl font-medium leading-6 text-black">
                  Para validar se a nova arquitetura realmente tornava a navegação mais
                  previsível (e não apenas “mais organizada”), conduzi um teste comparativo
                  de tarefas entre o sitemap legado e o proposto.
                </p>

                {/* Próximo setor com heading: 48px */}
                <p className="mt-12 text-xl font-medium leading-6 text-[#FF4C2C]">
                  Como foi o teste?
                </p>
              </div>

              {/* Cards (responsivo) */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:auto-rows-fr">
                {cards.map((c) => (
                  <ValidationInfoCard key={c.title} title={c.title} body={c.body} />
                ))}
              </div>
            </div>
          </div>
          {/* /TEXT_10 */}
        </div>
      </div>
    </section>
  );
}
