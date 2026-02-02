import MaterialCarousel from "./material_carousel";

export default function DiscoveryCarouselSection() {
  return (
    <section className="w-full bg-[#F7F7F7]">
      <div className="mx-auto w-full max-w-screen-xl px-6">
        <div className="grid grid-cols-4 gap-6 lg:grid-cols-12">
          {/* Texto = 10 col */}
          <div className="col-span-4 lg:col-span-10 lg:col-start-2">
            <p className="text-xl font-semibold leading-none text-[#FF4C2C]">
              Discovery &amp; Insights
            </p>
            <p className="mt-3 text-[32px] font-medium leading-[1.2] text-black sm:text-[40px]">
              Prints e evidências (carrossel)
            </p>
          </div>

          {/* Media = 12 col (full-bleed mobile) */}
          <div className="col-span-4 -mx-6 lg:col-span-12 lg:mx-0">
            {/* para “media shapes” a gente deixa assim mesmo */}
            <MaterialCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
