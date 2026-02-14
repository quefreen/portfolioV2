// src/components/problem_discovery_cormedix.tsx
import type { CSSProperties } from "react";
import Image from "next/image";

// ==============================
// Grid e containers (obrigatório)
// ==============================
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";
const CONTENT_12 = "col-span-4 lg:col-span-12";

// ==============================
// Bleed controlado (obrigatório)
// ==============================
const SHAPE_BLEED = "-mx-4 md:-mx-8 lg:-mx-12 xl:mx-0";
const SHAPE_INNER_PAD = "px-4 sm:px-4 md:px-8 lg:px-12 xl:px-0";

// ==============================
// Espaçamento vertical padrão (obrigatório)
// Section Y: 64/80/96
// ==============================
const SECTION_Y = "py-16 sm:py-20 lg:py-24";

// ==============================
// Spacing tokens (obrigatório)
// ==============================
const STACK_12 = "gap-3"; // 12px (Relacionados: P -> P)
const STACK_24 = "gap-6"; // 24px (base)
const STACK_32 = "gap-8"; // 32px
const STACK_40 = "gap-10"; // 40px
const STACK_48 = "gap-12"; // 48px
const STACK_64 = "gap-16"; // 64px

// ==============================
// Masks / corners helpers (obrigatório)
// Variações por tamanho/largura do card
// ==============================
type CornerSize = "sm" | "md" | "lg";

function cornerClamp(size: CornerSize) {
  if (size === "sm") return "clamp(24px, 4.5vw, 56px)";
  if (size === "md") return "clamp(32px, 6vw, 80px)";
  return "clamp(56px, 9vw, 140px)";
}

function maskFourCorners(
  corner: CornerSize,
  extra?: CSSProperties
): CSSProperties {
  const c = cornerClamp(corner);

  const MASK_IMAGE = `
    url(/esqtb.svg),
    url(/dirtb.svg),
    url(/esqbb.svg),
    url(/dirbb.svg),
    linear-gradient(#000, #000)
  `;
  const MASK_POSITION = `
    left top,
    right top,
    left bottom,
    right bottom,
    center
  `;
  const MASK_SIZE = `
    ${c} auto,
    ${c} auto,
    ${c} auto,
    ${c} auto,
    100% 100%
  `;

  return {
    maskImage: MASK_IMAGE,
    maskPosition: MASK_POSITION,
    maskRepeat: "no-repeat",
    maskSize: MASK_SIZE,
    // 5 layers => 4 operadores
    maskComposite: "exclude, exclude, exclude, exclude" as any,

    // WebKit (Chrome/Safari/iOS)
    WebkitMaskImage: MASK_IMAGE as any,
    WebkitMaskPosition: MASK_POSITION as any,
    WebkitMaskRepeat: "no-repeat" as any,
    WebkitMaskSize: MASK_SIZE as any,
    WebkitMaskComposite: "xor, xor, xor, xor" as any,

    ...extra,
  };
}

function maskTopOnly(corner: CornerSize, extra?: CSSProperties): CSSProperties {
  const c = cornerClamp(corner);

  const MASK_IMAGE = `
    url(/esqtb.svg),
    url(/dirtb.svg),
    linear-gradient(#000, #000)
  `;
  const MASK_POSITION = `
    left top,
    right top,
    center
  `;
  const MASK_SIZE = `
    ${c} auto,
    ${c} auto,
    100% 100%
  `;

  return {
    maskImage: MASK_IMAGE,
    maskPosition: MASK_POSITION,
    maskRepeat: "no-repeat",
    maskSize: MASK_SIZE,
    maskComposite: "exclude" as any,

    WebkitMaskImage: MASK_IMAGE as any,
    WebkitMaskPosition: MASK_POSITION as any,
    WebkitMaskRepeat: "no-repeat" as any,
    WebkitMaskSize: MASK_SIZE as any,
    WebkitMaskComposite: "xor" as any,

    ...extra,
  };
}

function maskBottomOnly(
  corner: CornerSize,
  extra?: CSSProperties
): CSSProperties {
  const c = cornerClamp(corner);

  const MASK_IMAGE = `
    url(/esqbb.svg),
    url(/dirbb.svg),
    linear-gradient(#000, #000)
  `;
  const MASK_POSITION = `
    left bottom,
    right bottom,
    center
  `;
  const MASK_SIZE = `
    ${c} auto,
    ${c} auto,
    100% 100%
  `;

  return {
    maskImage: MASK_IMAGE,
    maskPosition: MASK_POSITION,
    maskRepeat: "no-repeat",
    maskSize: MASK_SIZE,
    maskComposite: "exclude" as any,

    WebkitMaskImage: MASK_IMAGE as any,
    WebkitMaskPosition: MASK_POSITION as any,
    WebkitMaskRepeat: "no-repeat" as any,
    WebkitMaskSize: MASK_SIZE as any,
    WebkitMaskComposite: "xor" as any,

    ...extra,
  };
}

// ==============================
// UI pieces (internos)
// ==============================
type InfoCardProps = {
  title: string;
  body: string;
  corner?: CornerSize;
};

function InfoCard({ title, body, corner = "sm" }: InfoCardProps) {
  return (
    <div className="bg-white p-8 sm:p-10" style={maskFourCorners(corner)}>
      <div className={`flex flex-col ${STACK_12}`}>
        <p className="text-[16px] font-semibold leading-none text-[#FF4C2C]">
          {title}
        </p>
        <p className="text-xl leading-[1.45] text-black">{body}</p>
      </div>
    </div>
  );
}

function MaskedCard({
  children,
  corner = "md",
  className = "",
}: {
  children: React.ReactNode;
  corner?: CornerSize;
  className?: string;
}) {
  return (
    <div
      className={`w-full bg-white p-10 sm:p-12 ${className}`}
      style={maskFourCorners(corner)}
    >
      {children}
    </div>
  );
}

function SectionHeader({ caption, title }: { caption: string; title: string }) {
  return (
    <div className={`flex flex-col ${STACK_24}`}>
      <div className="flex">
        <span className="inline-flex items-center gap-2 rounded-[32px] bg-white px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
          <span className="text-lg font-semibold leading-none text-[#131415]">
            {caption}
          </span>
        </span>
      </div>

      <p className="text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
        {title}
      </p>
    </div>
  );
}

// ==============================
// Validation cards (do componente 2)
// ==============================
type ValidationCard = {
  title: string;
  body: string;
};

function ValidationInfoCard({ title, body }: ValidationCard) {
  return (
    <div
      className="h-full bg-white p-10 sm:p-12 lg:p-16"
      style={maskFourCorners("md")}
    >
      <div className={`flex h-full flex-col justify-center ${STACK_12}`}>
        <p className="text-xl font-medium leading-6 text-[#FF4C2C]">{title}</p>
        <p className="text-xl font-medium leading-6 text-black">{body}</p>
      </div>
    </div>
  );
}

// ==============================
// Componente único final (merge real dos 2)
// ==============================
export default function ProblemDiscoveryCormedix() {
  const validationCards: ValidationCard[] = [
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
    <>
      {/* ==============================
          BLOCO 1 (Problem + Discovery + Insights) — igual ao seu componente 1
         ============================== */}
      <section className={`w-full ${SECTION_Y}`}>
        <div className="h-20 sm:h-10 lg:h-24"></div>
        <div className={SITE_CONTAINER}>
          <div className={GRID_12}>
            <div className={TEXT_10}>
              <div className={`flex w-full flex-col ${STACK_64}`}>
                {/* ======================
                    PROBLEMA
                   ====================== */}
                <div className={`flex flex-col ${STACK_24}`}>
                  <SectionHeader
                    caption="Problema"
                    title="Um site legado em um momento de alta pressão."
                  />

                  <p className="text-xl leading-[1.45] text-black">
                    Em 2023, durante a aplicação do seu primeiro produto (DefenCath)
                    ao orgão regulatório Norte Americano (FDA) o site (legado mais de
                    10 anos) passou a representar um risco: para quem estava de fora,
                    ele não passava a clareza e a organização que a empresa precisava
                    mostrar e tarefas importantes viravam um caminho de tentativa e erro.
                  </p>

                  {/* 3 cards (mobile: 1 col | desktop: 3 col) */}
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <InfoCard
                      corner="sm"
                      title="Investidores"
                      body="Relatórios, apresentações e projeções exigiam cliques demais — difícil encontrar rápido e com confiança."
                    />

                    <InfoCard
                      corner="sm"
                      title="Mídia & comunidade científica"
                      body="Evidências clínicas e press kit viraram “caça ao PDF” (muitas vezes via Google), aumentando a dúvida sobre a fonte oficial."
                    />

                    <InfoCard
                      corner="sm"
                      title="Conflito central"
                      body="Aumentar acesso e transparência sem violar compliance — e sem criar um conteúdo impossível de manter pelo time interno (governança)."
                    />
                  </div>
                </div>

                {/* ======================
                    DISCOVERY & INSIGHTS
                   ====================== */}
                   <div className="h-20 sm:h-8 lg:h-20"></div>
                <div className={`flex flex-col ${STACK_24}`}>
                  <SectionHeader
                    caption="Discovery & Insights"
                    title="Aprendendo com o mercado."
                  />

                  <div className={`flex flex-col ${STACK_48}`}>
                    {/* Setor 1: texto (P -> P: 12px) */}
                    <div className={`flex flex-col ${STACK_12}`}>
                      <p className="text-xl font-medium leading-[1.3] text-[#131415]">
                        <b>
                          Para reduzir achismos, analisei 8 sites de empresas listadas
                          na Nasdaq
                        </b>{" "}
                        (onde a CorMedix também está listada).
                      </p>

                      <p className="text-xl font-medium leading-[1.3] text-[#131415]">
                        O objetivo foi identificar padrões recorrentes nas áreas de
                        relacionamento com investidores e transformar esses padrões em
                        decisões práticas de arquitetura.
                      </p>
                    </div>

                    {/* Setor 2: Critérios */}
                    <div className={`flex flex-col ${STACK_24}`}>
                      <p className="text-xl font-semibold leading-none text-[#FF4C2C]">
                        Critérios
                      </p>

                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
                        <div
                          className="bg-white p-10 sm:p-12 lg:p-14"
                          style={maskFourCorners("md")}
                        >
                          <div className={`flex flex-col ${STACK_12}`}>
                            <p className="text-xl leading-[1.4] text-black">
                              Referências amplamente reconhecidas por investidores
                              (padrões “base” de IR)
                            </p>
                          </div>
                        </div>

                        <div
                          className="bg-white p-10 sm:p-12 lg:p-14"
                          style={maskFourCorners("md")}
                        >
                          <div className={`flex flex-col ${STACK_12}`}>
                            <p className="text-xl leading-[1.4] text-black">
                              Empresas do ecossistema health/pharma (padrões específicos
                              do setor)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ======================
                    INSIGHTS (Componente 5 integrado)
                   ====================== */}
                <div className={`flex flex-col ${STACK_24}`}>
                  <div className={`flex flex-col ${STACK_24}`}>
                    {/* Logos / retângulos (8) */}
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                      {[
                        { src: "/amazon.jpg", alt: "Rectangle 53" },
                        { src: "/apple.jpg", alt: "Rectangle 54" },
                        { src: "/nvidia.jpg", alt: "Rectangle 55" },
                        { src: "/microsoft.jpg", alt: "Rectangle 56" },
                        { src: "/amgen.jpg", alt: "Rectangle 53 (1)" },
                        { src: "/gilead.jpg", alt: "Rectangle 54 (1)" },
                        { src: "/regeneron.jpg", alt: "Rectangle 55 (1)" },
                        { src: "/cormedix.jpg", alt: "Rectangle 56 (1)" },
                      ].map((item) => (
                        <div
                          key={item.src}
                          className="relative h-[89px] w-full overflow-hidden bg-white"
                          
                        >
                          <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            className="object-contain"
                            sizes="(min-width: 1024px) 25vw, 50vw"
                            priority={false}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Imagem grande */}
                    <div
                      className="relative h-[360px] w-full overflow-hidden bg-white sm:h-[480px] lg:h-[603px]"
                      style={maskFourCorners("md")}
                    >
                      <Image
                        src="/analise.jpg"
                        alt="image 37"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 1022px, 100vw"
                        priority={false}
                      />
                    </div>

                    {/* Cards com máscara */}
                    <MaskedCard corner="md">
                      <p className="text-xl font-semibold leading-[1.4] text-black">
                        Boas práticas absorvidas
                      </p>

                      <div className={`mt-6 flex flex-col ${STACK_12}`}>
                        {[
                          "Todos as empresas tem um hub separado para investidores.",
                          "SEC Filings não é “lista” é base consultável com filtros e grupos.",
                          "“Quick Links” para tarefas repetidas é estratégico.",
                          "Atividades dentro de notícias prova que a empresa está ativa e é previsível.",
                        ].map((text) => (
                          <button
                            key={text}
                            type="button"
                            className="w-full bg-[#F1F9E8] px-6 py-3 text-left"
                          >
                            <span className="block text-base leading-[1.4] text-black">
                              {text}
                            </span>
                          </button>
                        ))}
                      </div>
                    </MaskedCard>

                    <MaskedCard corner="md">
                      <p className="text-xl font-semibold leading-[1.4] text-black">
                        Aprendizados que não foram seguidos
                      </p>

                      <div className={`mt-6 flex flex-col ${STACK_12}`}>
                        <button
                          type="button"
                          className="w-full bg-[#F9F1E8] px-6 py-3 text-left"
                        >
                          <span className="block text-base leading-[1.4] text-black">
                            Muitos sites pharma/medtech organizam tudo por portfólio e pipeline. Para a CorMedix, com um primeiro produto em fase crítica, faria mais sentido reduzir escolhas e guiar por tarefas.
                          </span>
                        </button>

                        <button
                          type="button"
                          className="w-full bg-[#F9F1E8] px-6 py-3 text-left"
                        >
                          <span className="block text-base leading-[1.4] text-black">
                            Alguns hubs de Investor Relations “expulsam” o usuário para sites de terceiros. Preferimos manter o fluxo no hub para preservar contexto, consistência e confiança.
                          </span>
                        </button>

                        <button
                          type="button"
                          className="w-full bg-[#F9F1E8] px-6 py-3 text-left"
                        >
                          <span className="block text-base leading-[1.4] text-black">
Ideias como calculadora de investimento e webcasts/presentations em áudio ficaram fora do MVP por exigirem mais tempo, conteúdo e testes e poderiam comprometer o prazo de entrega.                          </span>
                        </button>
                      </div>
                    </MaskedCard>
                  </div>
                </div>

                {/* Helpers/tokens (mantidos) */}
                <div className="hidden">
                  <div className={CONTENT_12} />
                  <div className={SHAPE_BLEED} />
                  <div className={SHAPE_INNER_PAD} />
                  <div className={STACK_32} />
                  <div className={STACK_40} />
                  <div style={maskTopOnly("lg")} />
                  <div style={maskBottomOnly("lg")} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          BLOCO 2 (Validation & Evidence) — igual ao seu componente 2
          (mesmo arquivo / mesmo componente)
         ============================== */}
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
                  {validationCards.map((c) => (
                    <ValidationInfoCard key={c.title} title={c.title} body={c.body} />
                  ))}
                </div>
              </div>
            </div>
            {/* /TEXT_10 */}
          </div>
        </div>
      </section>
    </>
  );
}
