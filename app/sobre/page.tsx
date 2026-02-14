// app/hepatite/page.tsx

import FooterCornerCap from "../components/footercap"
import { FooterBase } from "../components/footer2026"
import { HeroAbout } from "../components/sobrept"

export default async function Hepatite({
  searchParams,
}: {
  searchParams?: { pw?: string }
}) {
  return (
    <main>
      <HeroAbout />
            <FooterCornerCap />
                  <FooterBase />
    </main>
  )
}
