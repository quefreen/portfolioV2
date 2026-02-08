import TitleCaseHeader from "../components/title_header_case";
import OneMinute from "../components/one_minute";
import Impact from "../components/impact";
import ProblemCormedix from "../components/problemCormedix";
import Discovery from "../components/discovery";
import InsightsCormedix from "../components/insights_cormedix";
import MaterialCarousel from "../components/material_carousel";
import ValidationCormedix from "../components/validation_cormedix";
import Gallery from "../components/cormedicGallery";
import AbordagemCormedix from "../components/abordagemcormedix";
import TaskResultsGrid from "../components/gridCormedix";
import { ArchitectureTabs } from "../components/tabcormedix";
import Innovation3D from "../components/extrascormedix";
import Retrospect from "../components/retrospectoCormedix";

import CaseIntroCormedix from "../components/CaseItroCormedix";

export default function Home() {
  return (
    <main>
      <CaseIntroCormedix />
      <TitleCaseHeader />
      <OneMinute />
      <Impact />
      <ProblemCormedix />
      <Discovery />
      <InsightsCormedix />
      
      <ValidationCormedix />
      <ArchitectureTabs />
      <TaskResultsGrid />
      <Innovation3D />
      <Gallery />
      <Retrospect />
      
    </main>
  );
}
