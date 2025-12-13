import { Project } from "@/types/datatypes";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const ProjectCard = ({ project, onClick }: {project: Project, onClick: ()=>void}) => (
  <motion.div 
    className="group relative p-6 md:p-8 bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-all hover:shadow-2xl hover:shadow-white/5 cursor-pointer"
    onClick={onClick}
    variants={{
      hidden: { y: 50, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    }}
  >
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
      style={{ background: `radial-gradient(circle at center, ${project.base_color || 'hsl(190, 100%, 50%)'}, transparent 70%)` }}
    />
    
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-2xl font-bold text-white font-display">{project.name}</h3>
      {project.url && <ExternalLink className="text-white/40 group-hover:text-white transition-colors" size={20} onClick={() => window.open(project.url, "_blank")}/>}
    </div>
    
    {project.short_desc && <div className="text-base font-mono text-white/60 mb-4">{project.status}</div>}
    <p className="text-white/80 mb-6 leading-relaxed font-light">{project.short_desc}</p>
    
    {project.tags_array && (
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tags_array.map((t: string[]) => (
          <span key={t[0]} className="px-3 py-1 text-xs font-mono border border-white/20 rounded-full text-white/70 group-hover:border-white/40 transition-colors"
            style={{ background: `${t[1]}60` }}
          >
            {t[0]}
          </span>
        ))}
      </div>
    )}
  </motion.div>
);

export default ProjectCard;