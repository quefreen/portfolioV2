// app/hepatite/page.tsx
import MSDTitleCase from "../components/MSDTitleCase"
import MSDOneMinute from "../components/MSDoneminute"
import MSDImpact from "../components/MSDImpacto"

import ProblemCormedix from "../components/problemCormedix"
import Discovery from "../components/discovery"
import InsightsCormedix from "../components/insights_cormedix"
import MaterialCarousel from "../components/material_carousel"
import ValidationCormedix from "../components/validation_cormedix"
import Gallery from "../components/cormedicGallery"

import CasePaywall from "../components/case_paywall"

import MSDCaseIntro from "../components/CaseMSD"

import Protecao from "../components/protecao"
import FooterCornerCap from "../components/footercap"
import { FooterBase } from "../components/footer2026"

export default async function Hepatite({
  searchParams,
}: {
  searchParams?: { pw?: string }
}) {
  return (
    <main>
      <MSDCaseIntro />
      <Protecao />
            <FooterCornerCap />
                  <FooterBase />
    </main>
  )
}
