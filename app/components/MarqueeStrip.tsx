const ITEMS = [
  "Product Design",
  "Interaction Design",
  "UX Research",
  "3D & Motion",
  "AI-Driven Experiences",
  "Design Systems",
  "Prototyping",
  "Strategic Framing",
]

export function MarqueeStrip() {
  const repeated = [...ITEMS, ...ITEMS]

  return (
    <div className="w-full overflow-hidden border-t border-black/[0.06] bg-[#F7F7F7] py-3">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .marquee-inner {
              animation: marquee-scroll 26s linear infinite;
              animation-play-state: running;
              width: max-content;
            }
            .marquee-outer:hover .marquee-inner {
              animation-play-state: paused;
            }
            @keyframes marquee-scroll {
              from { transform: translateX(0) }
              to   { transform: translateX(-50%) }
            }
            @media (prefers-reduced-motion: reduce) {
              .marquee-inner { animation: none; }
            }
          `,
        }}
      />
      <div className="marquee-outer">
        <div className="marquee-inner flex items-center gap-0 whitespace-nowrap">
          {repeated.map((item, i) => (
            <span
              key={i}
              className="flex items-center"
            >
              <span
                className="px-5 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/30"
                style={{ fontFamily: "var(--font-schibstedGrotesk), sans-serif" }}
              >
                {item}
              </span>
              <span
                className="inline-block h-[3px] w-[3px] rounded-full bg-[#FF4C2C] opacity-60"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
