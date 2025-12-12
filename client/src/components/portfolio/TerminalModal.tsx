import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, Minus, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { Education, Project, Certificate, Experience } from "@/types/datatypes";
import TerminalProjects from "./TerminalModals/TerminalProjects";
import TerminalExperiences from "./TerminalModals/TerminalExperiences";
import TerminalCertificates from "./TerminalModals/TerminalCertificates";
import TerminalEducation from "./TerminalModals/TerminalEducation";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  firstOpen: boolean;
  project: Project | Experience | Education | Certificate | null;
  type: string;
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

export default function TerminalModal({ isOpen, onClose, firstOpen, type, project }: TerminalModalProps) {
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(!firstOpen);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootComplete, setBootComplete] = useState(false);
  useEffect(() => {
    if (firstOpen && isOpen && project) {
      setBootLines([]);
      setBootComplete(false);
      setShowContent(false);

      let lineIndex = 0;
      const interval = setInterval(() => {
        if (lineIndex < BOOT_SEQUENCE.length - 1) {
          setBootLines(prev => [...prev, `[ OK ] ${BOOT_SEQUENCE[lineIndex]}`]);
          lineIndex++;

          if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
          }
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setBootComplete(true);
            setTimeout(() => setShowContent(true), 800);
          }, 800);
        }
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isOpen, project]);
  if (!isOpen || !project) return null;

  let terminal = null;
  let name;

  switch (type) {
    case "project":
      terminal = <TerminalProjects project={project as Project} />
      name = (project as Project).name
      break;
    case "experience":
      terminal = (<TerminalExperiences project={project as Experience} />)
      name = (project as Experience).title
      break;
    case "education":
      terminal = (<TerminalEducation project={project as Education} />)
      name = (project as Education).title
      break;
    case "certification":
      terminal = (<TerminalCertificates project={project as Certificate} />)
      name = (project as Certificate).title
      break;
    default:
      return null;
  }
  project.base_color = project.base_color ? project.base_color : "hsl(190, 100%, 50%)";
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
              <span>root@devevolution:~/{name!.toLowerCase().replace(/\s+/g, '-')}</span>
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
            {showContent && (terminal)}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
