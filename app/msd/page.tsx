// app/hepatite/page.tsx
import HepatiteTitleCase from "../components/HepatiteTitleCase"
import HepatiteOneMinute from "../components/HepatiteOneMinute"
import HepatiteImpact from "../components/HepatiteImpact"

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
      <HepatiteTitleCase />
      <HepatiteOneMinute />
      <HepatiteImpact />

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
