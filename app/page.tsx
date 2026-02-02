import Title_case_header from "./components/title_header_case";
import OneMinute from "./components/one_minute";
import Impact from "./components/impact";
import ProblemCormedix from "./components/problemCormedix";
import DiscoveryCormedix from "./components/discovery";
import InsightsCormedix from "./components/insights_cormedix";
import MaterialCarousel from "./components/material_carousel";
import ValidationCormedix from "./components/validation_cormedix";
import Gallery from "./components/cormedicGallery";

export default function Home() {
  return (
    <main>
      <Title_case_header />
      <OneMinute />
      <Impact />
      <ProblemCormedix />
      <DiscoveryCormedix />
      <InsightsCormedix />
      <MaterialCarousel />
      <ValidationCormedix />
      <Gallery />
      
    </main>
  );
}
