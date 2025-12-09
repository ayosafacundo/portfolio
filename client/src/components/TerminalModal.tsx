import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, Minus, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    longDesc: string;
    tech: string[];
    ascii: string;
    color: string;
  } | null;
}

const BOOT_SEQUENCE = [
  "Loading kernel modules...",
  "Mounting root filesystem...",
  "Starting systemd-udevd...",
  "Found device /dev/nvme0n1...",
  "Checking filesystems...",
  "Starting network manager...",
  "Connecting to interface eth0...",
  "IP address assigned: 192.168.1.42",
  "Starting display manager...",
  "Reached target Graphical Interface.",
  "Welcome to DevEvolution OS v2.0"
];

export default function TerminalModal({ isOpen, onClose, project }: TerminalModalProps) {
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootComplete, setBootComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && project) {
      setBootLines([]);
      setBootComplete(false);
      setShowContent(false);

      let lineIndex = 0;
      const interval = setInterval(() => {
        if (lineIndex < BOOT_SEQUENCE.length) {
          setBootLines(prev => [...prev, `[ OK ] ${BOOT_SEQUENCE[lineIndex]}`]);
          lineIndex++;
          
          if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
          }
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setBootComplete(true);
            setTimeout(() => setShowContent(true), 500);
          }, 800);
        }
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-3xl bg-[#0c0c0c] border border-white/20 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Terminal Header */}
          <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-white/10 select-none">
            <div className="flex items-center gap-2 text-white/60 text-xs font-mono">
              <Terminal size={14} />
              <span>root@devevolution:~/{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 hover:bg-white/10 rounded cursor-pointer"><Minus size={14} className="text-white/60" /></div>
              <div className="p-1 hover:bg-white/10 rounded cursor-pointer"><Square size={12} className="text-white/60" /></div>
              <div className="p-1 hover:bg-red-500/80 rounded cursor-pointer" onClick={onClose}><X size={14} className="text-white/60" /></div>
            </div>
          </div>

          {/* Terminal Body */}
          <div 
            ref={terminalBodyRef}
            className="p-6 font-mono text-sm md:text-base text-white/80 overflow-y-auto custom-scrollbar flex-1 bg-black/90"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            {/* Boot Sequence */}
            {!showContent && (
              <div className="space-y-1 text-green-500/80">
                {bootLines.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
                {bootLines.length === BOOT_SEQUENCE.length && !bootComplete && (
                  <div className="animate-pulse">_</div>
                )}
              </div>
            )}

            {/* Project Content */}
            {showContent && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  {/* ASCII Art */}
                  <div className="text-xs md:text-sm leading-none whitespace-pre text-center md:text-left select-none" style={{ color: project.color }}>
                    {project.ascii}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1" style={{ textShadow: `0 0 10px ${project.color}` }}>
                        {project.title}
                      </h2>
                      <div className="h-px w-full bg-gradient-to-r from-white/30 to-transparent" />
                    </div>

                    <p className="leading-relaxed text-lg">
                      {project.longDesc}
                    </p>

                    <div>
                      <div className="text-xs text-white/40 mb-2 uppercase tracking-widest">Technologies</div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t: string) => (
                          <span key={t} className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded border border-white/5">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated Command Input */}
                <div className="mt-8 pt-4 border-t border-white/10 text-white/60">
                  <span className="text-green-500">root@devevolution</span>:<span className="text-blue-500">~</span>$ <span className="animate-pulse">_</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
