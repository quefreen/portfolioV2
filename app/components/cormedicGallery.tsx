export default function Gallery() {
  return (
    <div className="w-full min-h-screen"><div className="mt-48"></div>
      {/* Container centralizado (col-12) */}
      <div className="mx-auto w-full max-w-[1248px] px-6">
        {/* Grid 12 col com gutter 24px */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          {/* 1) Bento */}
          <div className="col-span-12">
            <div className="grid grid-cols-12 gap-x-6 gap-y-6">
              {/* Left = 50% do col-12 (6/12) */}
              <div className="col-span-12 md:col-span-6">
                <div className="bg-[#D9D9D9] w-full h-full min-h-[430px]" />
              </div>

              {/* Right = 50% do col-12 (6/12) */}
              <div className="col-span-12 md:col-span-6 flex flex-col gap-6 min-w-0">
                {/* Retângulo 1 */}
                <div className="bg-[#D9D9D9] w-full h-60" />

                {/* Retângulos 2 e 3: flexíveis + empilham no mobile */}
                <div className="flex flex-col md:flex-row gap-6 w-full min-w-0">
                  <div className="bg-[#D9D9D9] flex-1 h-[166px] min-w-0" />
                  <div className="bg-[#D9D9D9] flex-1 h-[166px] min-w-0" />
                </div>
              </div>
            </div>
          </div>

          {/* 2) Imagem col-12 (h=240) - full-bleed no mobile */}
          <div className="col-span-12">
            <div className="bg-[#D9D9D9] h-60 w-full -mx-6 md:mx-0" />
          </div>

          {/* 3) Imagem col-12 (h=1280) - full-bleed no mobile */}
          <div className="col-span-12">
            <div className="bg-[#D9D9D9] h-[1280px] w-full -mx-6 md:mx-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
