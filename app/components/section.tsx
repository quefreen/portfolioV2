export default function Section() {
  return (
    <div className="flex flex-col items-stretch gap-6 w-screen min-h-screen">
      {/* Bento */}
      <div className="flex items-start gap-[30px] w-full">
        {/* Coluna esquerda (altura igual ao bento da direita) */}
        <div className="bg-[#D9D9D9] w-[281px] h-[430px]" />

        {/* Coluna direita */}
        <div className="flex flex-col items-start gap-6 w-[304px]">
          <div className="bg-[#D9D9D9] w-full h-60" />
          <div className="flex items-center gap-6 w-full">
            <div className="bg-[#D9D9D9] flex-1 h-[166px]" />
            <div className="bg-[#D9D9D9] flex-1 h-[166px]" />
          </div>
        </div>
      </div>

      {/* Imagem 1 (col-12, h=240) */}
      <div className="bg-[#D9D9D9] w-full h-60" />

      {/* Imagem 2 (col-12, altura grande) */}
      <div className="bg-[#D9D9D9] w-full h-[655px]" />
      {/* Se quiser voltar pro teu original: troque por h-[1280px] */}
    </div>
  );
}
