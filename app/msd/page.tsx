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

export default async function Hepatite({
  searchParams,
}: {
  searchParams?: { pw?: string }
}) {
  return (
    <main>
      <MSDTitleCase />
      <MSDOneMinute />
      <MSDImpact />

      <CasePaywall
        caseKey="hepatite"
        wrongPassword={searchParams?.pw === "1"}
        passwordEnvKey="CASE_HEPATITE_PASSWORD"
        linkedinUrl="https://www.linkedin.com/in/quefreen/"
        contactEmail="quefreen.almeida@gmail.com"
        nextHref="/"
      >
        <ProblemCormedix />
        <Discovery />
        <InsightsCormedix />
        <MaterialCarousel />
        <ValidationCormedix />
        <Gallery />
      </CasePaywall>
    </main>
  )
}
