import { RefObject } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/datatypes";

interface TerminalModalProps {
  project: Project | null;
}

export default function TerminalProjects({ project }: TerminalModalProps) {
  if (project == null) return null;
  return (<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="space-y-6"
  >
    <div className="flex flex-col md:flex-row gap-8">
      {/* ASCII Art */}
      <div className="text-xs md:text-sm leading-none whitespace-pre text-center md:text-left select-none" style={{ color: project.base_color }}>
        {project.ascii_art}
      </div>
      <div className="flex-1 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1" style={{ textShadow: `0 0 10px ${project.base_color}` }}>
            {project.name}
          </h2>
          <div className="h-px w-full bg-gradient-to-r from-white/30 to-transparent" />
        </div>
        <p className="leading-relaxed text-lg">
          {project.long_desc}
        </p>
        <div>
          <div className="text-xs text-white/40 mb-2 uppercase tracking-widest">Technologies</div>
          <div className="flex flex-wrap gap-2">
            {project.tags_array.map((t: string[], i: number) => (
              <span key={i} className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded border border-white/5" style={{ color: t[1] }}>
                {t[0]}
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
  )
}
