import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroAnimation from "@/components/IntroAnimation";
import Portfolio from "@/components/Portfolio";
import StarfieldBackground from "@/components/StarfieldBackground";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <StarfieldBackground />
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroAnimation key="intro" onComplete={() => setShowIntro(false)} />
        ) : (
          <Portfolio key="portfolio" />
        )}
      </AnimatePresence>
    </>
  );
}
