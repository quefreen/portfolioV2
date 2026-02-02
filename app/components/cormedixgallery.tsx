import Image from "next/image";

type Highlight = {
  title: string;
  description: string;
  imageSrc?: string;
  tag?: string;
};

const highlights: Highlight[] = [
  {
    tag: "Website",
    title: "Inovação 3D Interativa",
    description:
      "Protótipo da molécula do DefenCath em Spline para comunicar a ciência complexa do produto.",
    imageSrc: "/Rectangle47.png", // troque pelo teu screenshot certo
  },
  {
    tag: "Investors",
    title: "Hub de investidores com clareza",
    description:
      "Um hub focado em transparência e acesso fácil aos relatórios (SEC Filings) e materiais.",
    imageSrc: "/Rectangle52.png", // troque pelo teu screenshot certo
  },
  {
    tag: "Governance",
    title: "Press Releases + conteúdo educativo",
    description:
      "Arquitetura clara para atualizações corporativas, governança e páginas de apoio ao paciente.",
    imageSrc: "/Rectangle3.png", // troque pelo teu screenshot certo
  },
];

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-10 md:col-start-2">
        {eyebrow ? (
          <p className="text-[12px] tracking-[0.14em] uppercase text-[#0E1D61]/70">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-[28px] leading-tight font-semibold text-[#131415]">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-[16px] leading-relaxed text-[#131415]/75">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function HighlightCard({ item }: { item: Highlight }) {
  return (
    <div className="rounded-[28px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="p-6">
        {item.tag ? (
          <span className="inline-flex items-center rounded-full border border-[#168FBE]/30 bg-[#E8F9FF] px-3 py-1 text-[12px] font-medium text-[#0E1D61]">
            {item.tag}
          </span>
        ) : null}

        <p className="mt-4 text-[18px] font-semibold leading-snug text-[#131415]">
          {item.title}
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-[#131415]/75">
          {item.description}
        </p>
      </div>

      {item.imageSrc ? (
        <div className="relative w-full aspect-[16/10]">
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>
      ) : null}
    </div>
  );
}

function FullBleedShot({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="col-span-12 -mx-4 md:mx-0">
      <div className="relative w-full aspect-[16/9] md:rounded-[32px] overflow-hidden bg-[#E8F9FF] md:shadow-[0_22px_60px_rgba(0,0,0,0.10)]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 px-4 md:px-0 text-[13px] text-[#131415]/70">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export default function CormedixGallery() {
  return (
    <section className="w-full">
      {/* wrapper: mantém tua lógica de “contido” no desktop e full-bleed só onde é mídia */}
      <div className="mx-auto max-w-[1120px] px-4 md:px-6 py-16 md:py-24">
       

        <div className="mt-10 grid grid-cols-12 gap-6">
          {/* HERO screenshot (mídia 12 col / full-bleed mobile) */}
          <FullBleedShot
            src="/Rectangle3.png" // ex: screenshot do topo do site ou da home
            alt="CorMedix website — hero e navegação"
            caption="Home + navegação principal (screenshot do protótipo/entrega)."
          />

          {/* Highlights em 2 colunas no desktop, 1 no mobile */}
          <div className="col-span-12 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6">
              <HighlightCard item={highlights[0]} />
            </div>
            <div className="col-span-12 md:col-span-6">
              <HighlightCard item={highlights[1]} />
            </div>
          </div>

          {/* Bloco final: 1 card grande + 2 cards pequenos (sem esconder no mobile) */}
          <div className="col-span-12 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-7">
              <HighlightCard item={highlights[2]} />
            </div>

            <div className="col-span-12 md:col-span-5 grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <div className="rounded-[28px] bg-[#E8F9FF] p-6">
                  <p className="text-[16px] font-semibold text-[#131415]">
                    Wordpress
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#131415]/75">
                    Integração/considerações para CMS e governança de conteúdo.
                  </p>
                  <div className="mt-4 relative h-[84px] w-[84px]">
                    <Image
                      src="/20336199wordpresslogotipowordpressiconetransparentepnggratisvetor1.png"
                      alt="WordPress icon"
                      fill
                      className="object-contain"
                      sizes="84px"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-12">
                <div className="rounded-[28px] bg-[#E8F9FF] p-6">
                  
                 
                </div>
              </div>
            </div>
          </div>

          {/* Segundo full-bleed shot, se quiser */}
          <FullBleedShot
            src="/Bannerinvestor1.png"
            alt="Investor banner — seção de careers/investors"
            caption="Exemplo de módulo de conteúdo para Investor/Careers."
          />
        </div>
      </div>
    </section>
  );
}
