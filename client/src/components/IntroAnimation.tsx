import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"console" | "finished">("console");
  const [consoleText, setConsoleText] = useState("");

  // Phase 1: Console Typing
  useEffect(() => {
    if (phase === "console") {
      const text = "log in";
      let i = 0;
      const interval = setInterval(() => {
        setConsoleText(text.slice(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(interval);
          setTimeout(() => {
            // Simulate "Enter" press
            setPhase("finished");
          }, 1200);
        }
      }, 150);
      return () => clearInterval(interval);
    }
    if (phase === "finished") {
      onComplete();
    }
  }, [phase]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <AnimatePresence mode="wait">
        {/* Phase 1: Console */}
        {phase === "console" && (
          <motion.div 
            key="console"
            className="font-mono text-green-500 text-4xl md:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <span className="mr-2">&gt;</span>
            {consoleText}
            <motion.span 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-3 h-8 md:h-12 bg-green-500 ml-1 align-middle"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
