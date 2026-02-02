// src/components/impact.tsx
import React from "react";

// --- CONSTANTES DE ESTILO ---
const CONTENT_12 = "col-span-4 lg:col-span-12";
const SHAPE_BLEED = "-mx-6 lg:-mx-12";
const SHAPE_BLUE = "w-full bg-[#C7E3EC] p-8 sm:p-12 lg:p-38";

// Estilo da máscara para os CARDS BRANCOS (4 cantos)
// Ajustei o tamanho do clamp para ser um pouco menor que o dos containers grandes,
// para não invadir muito o conteúdo dos cards.
const CARD_MASK_STYLE: React.CSSProperties = {
  maskImage: `
    url(/esqtb.svg),   /* Top Left */
    url(/dirtb.svg),   /* Top Right */
    url(/esqbb.svg),   /* Bottom Left */
    url(/dirbb.svg),   /* Bottom Right */
    linear-gradient(#000, #000) /* Preenchimento central */
  `,
  maskPosition: `
    left top,
    right top,
    left bottom,
    right bottom,
    center
  `,
  maskRepeat: "no-repeat",
  // Tamanho ajustado para cards: clamp(32px, 6vw, 80px)
  maskSize: `
    clamp(32px, 6vw, 80px) auto, 
    clamp(32px, 6vw, 80px) auto, 
    clamp(32px, 6vw, 80px) auto, 
    clamp(32px, 6vw, 80px) auto, 
    100% 100%
  `,
  maskComposite: "exclude",
  WebkitMaskComposite: "xor",
};

// --- COMPONENTE INTERNO PARA OS CARDS ---
// Isso evita repetir o estilo da máscara 5 vezes no código principal
type ImpactCardProps = {
  children: React.ReactNode;
  className?: string; // Para aceitar classes extras (como a borda do primeiro card)
};

function ImpactCard({ children, className = "" }: ImpactCardProps) {
  // Classes base do card (SEM o rounded-[48px])
  const baseClasses = `flex flex-col gap-2.5 bg-white p-10 sm:p-14 ${className}`;

  return (
    <div className={baseClasses} style={CARD_MASK_STYLE}>
      {children}
    </div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function Impact() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-screen-xl px-6">
        <div className="grid grid-cols-4 gap-6 lg:grid-cols-12">
          <div className={CONTENT_12}>
            <div className={SHAPE_BLEED}>
              {/* Container Azul com máscara inferior (mantido do passo anterior) */}
              <div
                className={SHAPE_BLUE}
                style={{
                  maskImage: `url(/esqbb.svg), url(/dirbb.svg), linear-gradient(#000, #000)`,
                  maskPosition: "left bottom, right bottom, center",
                  maskRepeat: "no-repeat",
                  maskSize: "clamp(56px, 9vw, 140px) auto, clamp(56px, 9vw, 140px) auto, 100% 100%",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                }}
              >
                {/* Parte 1 */}
                <div className="">
                  <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-4">
                      <p className="text-lg font-semibold leading-none text-[#131415]">
                        Impact
                      </p>
                      <p className="text-[32px] font-medium leading-[1.2] text-[#131415] sm:text-[40px]">
                        Melhoria mensurável nas jornadas críticas.
                      </p>
                    </div>

                    {/* Cards (3) - Usando o novo componente ImpactCard */}
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                      {/* Card 1 (tem borda extra) */}
                      <ImpactCard className="border-2 border-white">
                        <p className="text-[56px] font-semibold leading-[1.1] text-[#131415] sm:text-[64px]">
                          −61%
                        </p>
                        <p className="text-lg font-semibold leading-[1.4] text-[#131415] sm:text-xl">
                          no tempo médio para concluir em 6 tarefas (64s → 24,2s).
                        </p>
                      </ImpactCard>

                      {/* Card 2 */}
                      <ImpactCard>
                        <p className="text-[56px] font-semibold leading-[1.1] text-[#131415] sm:text-[64px]">
                          +30pp
                        </p>
                        <p className="text-lg font-semibold leading-[1.4] text-[#131415] sm:text-xl">
                          de sucesso na conclusão das tarefas (63% → 93%).
                        </p>
                      </ImpactCard>

                      {/* Card 3 */}
                      <ImpactCard>
                        <p className="text-[56px] font-semibold leading-[1.1] text-[#131415] sm:text-[64px]">
                          −82%
                        </p>
                        <p className="text-lg font-semibold leading-[1.4] text-[#131415] sm:text-xl">
                          de misclicks (0,56 → 0,10), reduzindo tentativa-e-erro.
                        </p>
                      </ImpactCard>
                    </div>
                  </div>
                </div>

                <div className="h-12" />

                {/* Parte 2 */}
                <div>
                  <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-4">
                      <p className="text-[32px] font-medium leading-[1.2] text-[#131415] sm:text-[40px]">
                        Entrega sustentável para o time interno.
                      </p>
                    </div>

                    {/* Cards (2) - Usando o novo componente ImpactCard */}
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      {/* Card 4 */}
                      <ImpactCard>
                        <p className="text-[28px] font-semibold leading-[1.2] text-[#131415] sm:text-[32px]">
                          WordPress + documentação
                        </p>
                        <p className="text-lg font-medium leading-[1.4] text-[#131415] sm:text-xl">
                          permitindo que o time publique/atualize conteúdo e
                          escale páginas sem depender de design/dev a cada ajuste.
                        </p>
                      </ImpactCard>

                      {/* Card 5 */}
                      <ImpactCard>
                        <p className="whitespace-pre-line text-[28px] font-semibold leading-[1.2] text-[#131415] sm:text-[32px]">
                          Roadmap{"\n"}pós-lançamento
                        </p>
                        <p className="text-lg font-medium leading-[1.4] text-[#131415] sm:text-xl">
                          Entregamos um backlog priorizado para a fase
                          pós-DefenCath e expansão do hub científico.
                        </p>
                      </ImpactCard>
                    </div>
                  </div>
                </div>

                <div className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}