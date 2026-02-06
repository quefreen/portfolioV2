// src/components/problem_cormedix.tsx

export default function ProblemCormedix() {
  // --- CONSTANTES DO LAYOUT (MESMAS DO BENTO) ---
  const SITE_CONTAINER =
    "mx-auto w-full max-w-[1400px] px-4 sm:px-4 md:px-8 lg:px-12";
  const GRID_12 = "grid grid-cols-4 gap-6 lg:grid-cols-12";
  const TEXT_10 = "col-span-4 lg:col-span-10 lg:col-start-2";

  return (
    <section className="w-full mt-24 sm:mt-32 lg:mt-48">
      <div className={SITE_CONTAINER}>
        <div className={GRID_12}>
          {/* BLOCO TEXTO: 10 col, centralizado */}
          <div className={TEXT_10}>
            <div className="flex w-full flex-col gap-12">
              {/* Header */}
              <div className="flex flex-col gap-4">
                <div className="flex">
                  <span className="inline-flex items-center gap-2 rounded-[32px] bg-white px-3 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF4C2C]" />
                    <span className="text-lg font-semibold leading-none text-[#404040]">
                      Problema
                    </span>
                  </span>
                </div>

                <p className="text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
                  Um site legado em um momento de alta pressão.
                </p>
              </div>

              {/* Seções */}
              <div className="flex flex-col gap-12">
                {/* Ótica do negócio */}
                <div className="flex flex-col gap-4">
                  <p className="text-xl leading-[1.4] text-black">
                Pouco antes da re-submissão do DefenCath à FDA (2023), o site institucional começou a virar um risco: para quem estava de fora, ele não passava a clareza e a organização que a empresa precisava mostrar e tarefas importantes viravam um caminho de tentativa e erro.                </p>
                  <p className="text-xl font-semibold leading-[1.4] text-[#FF4C2C]">
                    Investidores
                  </p>
                  
                  <p className="text-xl leading-[1.4] text-black">
                Achar relatórios e materiais de apoio (apresentações e projeções) exigia navegar demais e “ir testando” até dar certo.                  </p>
                </div>

                {/* Ótica dos usuários */}
                <div className="flex flex-col gap-4">
                  <p className="text-xl font-semibold leading-[1.4] text-[#FF4C2C]">
                    Mídia & comunidade científica
                  </p>
                  <p className="text-xl leading-[1.4] text-black">
                Validar evidências clínicas e baixar assets de mídia muitas vezes dependia de “caça ao PDF” (ou do Google), com mais esforço e mais dúvida sobre qual era a fonte certa.                  </p>
                 
                </div>

                {/* Conflito central */}
                <div className="flex flex-col gap-4">
                  <p className="text-xl font-semibold leading-[1.4] text-[#FF4C2C]">
                    Conflito central:
                  </p>
                  <p className="text-xl leading-[1.4] text-black">
                  Melhorar acesso e transparência sem extrapolar compliance e sem comprometer a manutenção do conteúdo pelo time interno (governança).
                  </p>
                </div>
              </div>
              {/* /Seções */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
