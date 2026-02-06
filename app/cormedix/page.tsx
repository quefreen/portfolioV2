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

export default function Home() {
  return (
    <main>
      <TitleCaseHeader />
      <OneMinute />
      <Impact />
      <ProblemCormedix />
      <Discovery />
      <InsightsCormedix />
      
      <ValidationCormedix />
      <TaskResultsGrid />
      
      
    </main>
  );
}
