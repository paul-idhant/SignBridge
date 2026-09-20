import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import LightRays from "./components/LightRays";
import { Navbar } from "./components/Navbar";
import { ScrollExpand } from "./components/ScrollExpand";
import { Hero } from "./components/Hero";
import { Watch } from "./components/Watch";
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
  /* The full-page spotlight stays hidden during the black intro, then fades in */
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 1;
      setIntroDone(window.scrollY > vh * 1.15);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Keyboard users can jump straight past the navigation */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-bg"
      >
        Skip to main content
      </a>

      {/* Full-page volumetric spotlight — follows the cursor across the whole site */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000 ${
          introDone ? "opacity-100" : "opacity-0"
        }`}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#00e5ff"
          raysSpeed={1}
          lightSpread={0.6}
          rayLength={4}
          followMouse
          mouseInfluence={0.3}
          noiseAmount={0.02}
          distortion={0.2}
          fadeDistance={1.5}
          saturation={1.2}
          intensity={1.6}
        />
      </div>

      <Navbar />

      <main id="main">
        {/* Cinematic scroll-expansion intro — opens the landing page */}
        <ScrollExpand
          src="/hero.jpg"
          alt="Two hands mid-sign, traced with cyan light"
          title="SignBridge"
          scrollHint="Scroll to expand"
          startWidth={26}
          startHeight={38}
          startRadius={24}
          endRadius={0}
          mediaZoom={1.35}
          scrollDistance={1.2}
          holdDistance={0.35}
          smoothing={0.1}
          overlayScrim={0.45}
          useWindowScroll
          enabled
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            SignBridge — Assistive AI
          </p>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Every sign.
            <span className="mt-2 block text-accent">Every voice.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Two languages. One conversation.
          </p>
          <div className="mt-10 flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <span>Keep scrolling</span>
            <ChevronDown size={14} className="animate-bounce text-accent" aria-hidden="true" />
          </div>
        </ScrollExpand>

        <Hero />

        {/* Advertisement / demo film — degrades to a poster until published */}
        <Watch />

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
