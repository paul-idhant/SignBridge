import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { HowItWorks } from "./components/HowItWorks";
import { Technology } from "./components/Technology";
import { Privacy } from "./components/Privacy";
import { Applications } from "./components/Applications";
import { Status } from "./components/Status";
import { TrySignBridge } from "./components/TrySignBridge";
import { Team } from "./components/Team";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";

export default function App() {
  return (
    <>
      {/* Keyboard users can jump straight past the navigation */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-bg"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <HowItWorks />
        <Technology />
        <Privacy />
        <Applications />
        <Status />
        <TrySignBridge />
        <Team />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
