// src/components/material_carousel.tsx
import type { CSSProperties } from "react";
import Image from "next/image";

type CardImage = {
  src: string;
  alt: string;
  h: number; // altura do bloco de imagem dentro do card
};

type CarouselCard = {
  id: string;
  title: string;
  body?: string;
  images?: CardImage[];
  w: number; // largura do card no marquee
  // h removido (altura agora é definida pelo conteúdo)
};

const FONT_SORA: CSSProperties = {
  fontFamily: "var(--font-sora), ui-sans-serif, system-ui, sans-serif",
};

// ✅ largura ajustada
const CARD_W = 280;

const cards: CarouselCard[] = [
  {
    id: "amgen-text",
    title: "Amgen",
    body:
      "Existe um menu fixo na lateral da página: Investors, News & Events, Financials, Pipeline, Stock, Corporate Sustainability and Resources.",
    w: CARD_W,
  },
  {
    id: "amazon-breadcrumbs",
    title: "Amazon",
    body:
      "Estrutura de breadcrumbs clara e menu lateral persistente nas páginas internas para rápida alternância entre seções.",
    w: CARD_W,
  },
  {
    id: "nvidia-image",
    title: "NVIDIA",
    images: [{ src: "/nvidia.png", alt: "NVIDIA reference", h: 170 }],
    w: CARD_W,
  },
  {
    id: "amazon-image",
    title: "Amazon",
    images: [{ src: "/amazon.png", alt: "Amazon reference", h: 170 }],
    w: CARD_W,
  },
  {
    id: "microsoft-stack",
    title: "Microsoft",
    images: [
      { src: "/microsoft01.png", alt: "Microsoft ref 1", h: 64 },
      { src: "/microsoft02.png", alt: "Microsoft ref 2", h: 52 },
      { src: "/microsoft03.png", alt: "Microsoft ref 3", h: 64 },
    ],
    w: CARD_W,
  },
  {
    id: "gilead-image",
    title: "Gilead",
    images: [{ src: "/gillead.png", alt: "Gilead reference", h: 170 }],
    w: CARD_W,
  },
  {
    id: "download-files",
    title: "Download files",
    images: [{ src: "/download.png", alt: "Download files reference", h: 170 }],
    w: CARD_W,
  },
  {
    id: "amazon-landing",
    title: "Amazon",
    body:
      "Landing do Investor Relations tem apenas um menu lateral, poucos cards de News e Stock Price.",
    w: CARD_W,
  },
  {
    id: "gilead-events",
    title: "Gilead",
    body: "A página de Events tem um visualizador de documentos para prévias.",
    w: CARD_W,
  },
  {
    id: "nvidia-reports",
    title: "NVIDIA",
    body:
      "Annual Reports and Proxies: lista por ano e oferece downloads em PDF (ex.: “Annual Report PDF Format Download”).",
    w: CARD_W,
  },
];

// --- CONSTANTES DO LAYOUT (MESMAS DO BENTO) ---
const SITE_CONTAINER =
  "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

function CarouselInsightCard({
  title,
  body,
  images,
  style,
}: {
  title: string;
  body?: string;
  images?: CardImage[];
  style: CSSProperties;
}) {
  return (
    <div
      className="shrink-0 bg-[#FFF7D3] p-6"
      style={{ ...style, ...FONT_SORA }}
    >
      <div className="flex w-full flex-col gap-5">
        {/* chip */}
        <div className="inline-flex w-fit items-center rounded-[2px] bg-white px-4 py-2">
          <p className="text-[14px] font-medium leading-none text-black/80">
            {title}
          </p>
        </div>

        {/* texto */}
        {body ? (
          <p className="text-[20px] font-medium leading-[1.35] text-black/80">
            {body}
          </p>
        ) : null}

        {/* imagens: bloco controla a altura do card */}
        {images?.length ? (
          <div className="flex w-full flex-col gap-3">
            {images.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="relative w-full overflow-hidden rounded"
                style={{ height: img.h }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  // ✅ não corta nunca (fica sempre inteiro dentro do box)
                  className="object-contain"
                  sizes="280px"
                  priority={false}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function MaterialCarousel() {
  const loop = [...cards, ...cards];

  return (
    <section className="w-full mt-24 sm:mt-32 lg:mt-48">
      {/* Header alinhado na regra do projeto */}
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          <div className={TEXT_10}>
            <div className="flex flex-col gap-4">
              <div className="flex">
                <span className="inline-flex items-center gap-4 rounded-[32px] bg-white px-3 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
                  <span className="text-lg font-semibold leading-none text-[#404040]">
                    Outros Insights
                  </span>
                </span>
              </div>

              <p className="text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
                Aprendendo com o mercado.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Carrossel full-bleed */}
      <div
        className="marquee relative mt-6 w-screen overflow-hidden"
        style={
          {
            ["--marquee-duration" as any]: "90s",
            left: "50%",
            transform: "translateX(-50%)",
          } as CSSProperties
        }
      >
        {/* ✅ importante: items-start (não estica altura dos cards) */}
        <div className="marquee-track flex w-max items-start gap-4 py-4 sm:gap-6 sm:py-6 px-4 sm:px-4 md:px-8 lg:px-12">
          {loop.map((c, idx) => (
            <CarouselInsightCard
              key={`${c.id}-${idx}`}
              title={c.title}
              body={c.body}
              images={c.images}
              // ✅ largura fixa, altura automática (influenciada pelas imagens/texto)
              style={{ width: c.w }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
