import type { Metadata } from "next";
import { Bricolage_Grotesque, Schibsted_Grotesk, Sora } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";

const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quefreen Almeida — Product Designer",
  description: "Quéfreen — Portfolio v2",
  icons: {
    icon: "/fav.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${schibsted.variable} ${bricolage.variable} ${sora.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        <CustomCursor />
        <Navbar />
        <SmoothScrollProvider>
          <div className="pt-16">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
