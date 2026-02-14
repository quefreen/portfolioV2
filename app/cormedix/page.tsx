

import TaskResultsGrid from "../components/gridCormedix";
import { ArchitectureTabs } from "../components/tabcormedix";

import Retrospect from "../components/retrospectoCormedix";

import CaseIntroCormedix from "../components/CaseItroCormedix";
import CaseMerge02Cormedix from "../components/CaseMerge02Cormedix";

import FooterCornerCap from "../components/footercap";
import { FooterBase } from "../components/footer2026";

import ImageAssetsGrid from "../components/grid01cormedix";
import FeatureAssetsGrid from "../components/featuredcormedix";

import FooterCornerCapBranco from "../components/footercapbrando";

export default function Home() {
  return (
    <main>
      <CaseIntroCormedix /> 
      <CaseMerge02Cormedix />

  
      <ArchitectureTabs />
      <TaskResultsGrid />
      
      <ImageAssetsGrid />
      <FeatureAssetsGrid />
      <FooterCornerCapBranco />
      <Retrospect />
      <FooterCornerCap />
      <FooterBase />
      
    </main>
  );
}
