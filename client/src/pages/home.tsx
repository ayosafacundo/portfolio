import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroAnimation from "@/components/IntroAnimation";
import Portfolio from "@/pages/Portfolio";
import StarfieldBackground from "@/components/StarfieldBackground";
import { DataFetcher } from "@/lib/Datafetcher";
import { sqlResponse } from "@/types/datatypes";
import testdata from '@/data.json';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const data: {data: sqlResponse | null, error: Error | null} = DataFetcher();
  return (
    <>
      <StarfieldBackground />
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroAnimation key="intro" onComplete={() => setShowIntro(false)} />
        ) : (
          <Portfolio key="portfolio" PORTFOLIO_DATA={data.data ? data.data : testdata as sqlResponse}/>
        )}
      </AnimatePresence>
    </>
  );
}
