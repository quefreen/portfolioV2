// page.tsx
import dynamic from "next/dynamic";
import { Hero2026 } from "./components/hero2026";

const BentoHome2026   = dynamic(() => import("./components/bento2026"),  { ssr: false });
const FooterCornerCap = dynamic(() => import("./components/footercap"),  { ssr: false });
const FooterBase      = dynamic(() => import("./components/footer2026").then(m => ({ default: m.FooterBase })), { ssr: false });

export default function Home() {
  return (
    <main>
      <Hero2026 />
      <BentoHome2026 />
      <FooterCornerCap />
      <FooterBase />
    </main>
  );
}
