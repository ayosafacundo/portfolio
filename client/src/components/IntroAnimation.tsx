import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TIMELINE_ERAS } from "@/lib/constants";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"console" | "timeline" | "star" | "finished">("console");
  const [consoleText, setConsoleText] = useState("");
  const [currentEraIndex, setCurrentEraIndex] = useState(0);

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
            setPhase("timeline");
          }, 800);
        }
      }, 150);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Phase 2: Timeline
  useEffect(() => {
    if (phase === "timeline") {
      if (currentEraIndex < TIMELINE_ERAS.length) {
        const timeout = setTimeout(() => {
          setCurrentEraIndex((prev) => prev + 1);
        }, 1200); // Duration per era
        return () => clearTimeout(timeout);
      } else {
        setPhase("star");
      }
    }
  }, [phase, currentEraIndex]);

  // Phase 3: Star
  useEffect(() => {
    if (phase === "star") {
      const timeout = setTimeout(() => {
        onComplete();
      }, 5000); // Show star for 5 seconds
      return () => clearTimeout(timeout);
    }
  }, [phase, onComplete]);

  const currentEra = TIMELINE_ERAS[currentEraIndex] || TIMELINE_ERAS[TIMELINE_ERAS.length - 1];

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

        {/* Phase 2: Timeline */}
        {phase === "timeline" && currentEra && (
          <motion.div
            key="timeline-container"
            className="absolute inset-0 flex flex-col items-center justify-center transition-colors duration-500"
            style={{ backgroundColor: currentEra.bg }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
             <motion.div
                key={currentEra.id}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center gap-8"
             >
                {/* Icon Rendering */}
                <div className="relative">
                   {currentEra.customIcon === 'pong' ? (
                     <div className="w-32 h-32 border-2 border-white relative bg-black">
                        <div className="absolute left-2 top-10 w-2 h-8 bg-white" />
                        <div className="absolute right-2 top-16 w-2 h-8 bg-white" />
                        <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-white animate-ping" />
                     </div>
                   ) : currentEra.customIcon === 'windows' ? (
                     <div className="grid grid-cols-2 gap-1 w-32 h-32">
                       <div className="bg-[#f25022]" />
                       <div className="bg-[#7fba00]" />
                       <div className="bg-[#00a4ef]" />
                       <div className="bg-[#ffb900]" />
                     </div>
                   ) : currentEra.icon ? (
                     <currentEra.icon 
                       size={120} 
                       color={currentEra.color}
                       strokeWidth={1.5}
                     />
                   ) : null}
                </div>

                <h2 
                  className={cn("text-4xl md:text-6xl font-bold text-center", currentEra.font)}
                  style={{ color: currentEra.color }}
                >
                  {currentEra.label}
                </h2>
             </motion.div>
          </motion.div>
        )}

        {/* Phase 3: Star */}
        {phase === "star" && (
           <motion.div
             key="star"
             className="relative flex items-center justify-center w-full h-full"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
             transition={{ duration: 1 }}
           >
             <motion.div
               initial={{ scale: 0, rotate: -180 }}
               animate={{ scale: 20, rotate: 0 }} // Massive scale for screen-filling effect
               transition={{ duration: 2, type: "spring", bounce: 0.3 }}
               className="text-yellow-400 filter drop-shadow-[0_0_50px_rgba(250,204,21,0.8)] absolute z-10"
             >
               <Star fill="currentColor" strokeWidth={0} className="w-[10vw] h-[10vw]" />
             </motion.div>
             
             {/* Exploding particles effect (simulated with multiple stars) */}
             {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute z-0 text-yellow-200/30"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 1, 0], 
                    x: Math.cos(i * 30 * (Math.PI / 180)) * 400, 
                    y: Math.sin(i * 30 * (Math.PI / 180)) * 400 
                  }}
                  transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
                >
                  <Star size={40} fill="currentColor" />
                </motion.div>
             ))}

             <motion.div
               className="z-20 text-center px-4 relative"
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 1, duration: 0.8 }}
             >
               <h1 className="text-4xl md:text-6xl font-display font-bold text-black drop-shadow-lg leading-tight max-w-4xl mx-auto">
                 "I want to build our future <br/> by your side"
               </h1>
             </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
