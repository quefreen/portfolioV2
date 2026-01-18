export default function Title_case_header() {
  return (
    <div className="flex items-end gap-6 min-w-screen min-h-screen">
      <div className="flex flex-col justify-center items-start gap-12 w-fit">
        <div className="flex flex-col items-start gap-12 w-full">
          <div className="flex flex-col items-start gap-12 w-full">
            <div className="flex flex-col items-start gap-4 w-full">
              <div className="flex flex-col items-start gap-8 w-fit">
                <p className="text-[#A3A3A3] font-schibstedGrotesk text-base font-semibold leading-none w-fit">
                  CORMEDIX
                </p>
              </div>
              <div className="flex items-start gap-6 w-fit">
                <button className="cursor-pointer text-nowrap flex py-3 px-6 justify-center items-center gap-2.5 rounded-[100px] bg-[#FFF] w-fit">
                  <p className="text-[#000] font-schibstedGrotesk text-sm leading-none w-fit">
                    B2B
                  </p>
                </button>
                <button className="cursor-pointer text-nowrap flex py-3 px-6 justify-center items-center gap-2.5 rounded-[100px] bg-[#FFF] w-fit">
                  <p className="text-[#000] font-schibstedGrotesk text-sm leading-none w-fit">
                    Regulated Industry
                  </p>
                </button>
                <button className="cursor-pointer text-nowrap flex py-3 px-6 justify-center items-center gap-2.5 rounded-[100px] bg-[#FFF] w-fit">
                  <p className="text-[#000] font-schibstedGrotesk text-sm leading-none w-fit">
                    Investor Relations
                  </p>
                </button>
              </div>
              <p className="text-[#000] font-bricolageGrotesque text-[56px] font-semibold leading-[1.3em] w-full">
                Prescrevendo dados para decisões.
              </p>
              <p className="text-[#0731BA] font-schibstedGrotesk text-xl font-semibold leading-[1.3em] w-full">
                Uma nova arquitetura para reduzir a incerteza de investidores e
                jornalistas durante a re-submissão à FDA.
              </p>
            </div>
            <div className="flex justify-between items-start w-full">
              <p className="text-[#000] font-schibstedGrotesk text-lg leading-[1.3em] w-fit">
                ROLE Product Designer
              </p>
              <p className="text-[#000] font-schibstedGrotesk text-lg leading-[1.3em] w-fit">
                TIMELINE 3 months
              </p>
              <p className="text-[#000] font-schibstedGrotesk text-lg leading-[1.3em] w-fit">
                TECHNOLOGY Wordpress, Spline, CMS
              </p>
              <p className="text-[#000] font-schibstedGrotesk text-lg leading-[1.3em] w-fit">
                OUTCOME Revamp website
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}