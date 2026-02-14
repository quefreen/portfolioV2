// app/hepatite/page.tsx
import MSDTitleCase from "../components/MSDTitleCase"
import HepatiteOneMinute from "../components/HepatiteOneMinute"
import HepatiteImpact from "../components/HepatiteImpact"

import ProblemCormedix from "../components/problemCormedix"
import Discovery from "../components/discovery"
import InsightsCormedix from "../components/insights_cormedix"
import MaterialCarousel from "../components/material_carousel"
import ValidationCormedix from "../components/validation_cormedix"
import Gallery from "../components/cormedicGallery"

import CasePaywall from "../components/case_paywall"

import HepatiteCaseIntro from "../components/CaseHepatite"

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

      <HepatiteCaseIntro />
      <Protecao />
      <FooterCornerCap />
            <FooterBase />
    </main>
  )
}
