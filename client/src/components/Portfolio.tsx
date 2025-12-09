import { motion, useScroll, useTransform } from "framer-motion";
import { PORTFOLIO_DATA } from "@/lib/constants";
import { Terminal, Cpu, Award, Book, Briefcase, User, Code, Mail, Download, ExternalLink, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card as UiCard, CardContent } from "@/components/ui/card";
import { useState } from "react";
import TerminalModal from "./TerminalModal";

const Section = ({ title, children, color, icon: Icon, id }: any) => {
  return (
    <motion.section 
      id={id}
      className="min-h-screen flex flex-col justify-center px-6 py-24 relative border-l border-white/10 ml-4 md:ml-20 scroll-mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2, once: false }}
    >
      {/* Explosion Effect */}
      <motion.div 
        className="absolute left-[-1px] top-20 w-1 h-0 bg-current blur-[2px]"
        style={{ color }}
        variants={{
          hidden: { height: 0, opacity: 0 },
          visible: { 
            height: "80%", 
            opacity: 1,
            boxShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
            transition: { duration: 0.8, ease: "circOut" } 
          }
        }}
      />
      
      <motion.div 
        className="absolute -left-3 top-24"
        variants={{
          hidden: { scale: 0, opacity: 0 },
          visible: { scale: 1, opacity: 1, transition: { delay: 0.2 } }
        }}
      >
        <div className="p-2 rounded-full bg-background border border-white/20" style={{ borderColor: color }}>
          <Icon size={24} style={{ color }} />
        </div>
      </motion.div>

      <motion.h2 
        className="text-5xl md:text-7xl font-display font-bold mb-12 tracking-tight"
        variants={{
          hidden: { x: -50, opacity: 0 },
          visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
        }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
          {title}
        </span>
      </motion.h2>

      <div className="grid gap-8 max-w-6xl w-full">
        {children}
      </div>
    </motion.section>
  );
};

const ProjectCard = ({ title, subtitle, desc, tech, color, onClick }: any) => (
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
      style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }}
    />
    
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-2xl font-bold text-white font-display">{title}</h3>
      <ExternalLink className="text-white/40 group-hover:text-white transition-colors" size={20} />
    </div>
    
    {subtitle && <div className="text-sm font-mono text-white/60 mb-4">{subtitle}</div>}
    <p className="text-white/80 mb-6 leading-relaxed font-light">{desc}</p>
    
    {tech && (
      <div className="flex flex-wrap gap-2 mt-auto">
        {tech.map((t: string) => (
          <span key={t} className="px-3 py-1 text-xs font-mono border border-white/20 rounded-full text-white/70 group-hover:border-white/40 transition-colors">
            {t}
          </span>
        ))}
      </div>
    )}
  </motion.div>
);

const Nav = () => (
  <motion.nav 
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ delay: 1, duration: 0.8 }}
    className="fixed top-0 left-0 right-0 z-40 p-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none"
  >
    <div className="font-mono font-bold text-xl pointer-events-auto cursor-pointer hover:opacity-70 transition-opacity">DEV.EVOLUTION</div>
    <div className="flex gap-6 pointer-events-auto">
      <a href="#contact" className="hover:underline underline-offset-4 font-mono hidden md:block">CONTACT</a>
      <Button variant="outline" size="sm" className="rounded-full font-mono border-white/30 hover:bg-white hover:text-black transition-colors">
        <Download size={14} className="mr-2" /> CV
      </Button>
    </div>
  </motion.nav>
);

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <div className="min-h-screen text-foreground selection:bg-white selection:text-black overflow-x-hidden">
      <Nav />
      <TerminalModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50 mix-blend-difference"
        style={{ scaleX }}
      />

      {/* Hero */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 px-4"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
             <Terminal className="w-6 h-6 text-white/50 animate-pulse" />
             <span className="font-mono text-white/50">SYS.ADMIN // DEV.OPS</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter text-white mb-6 relative">
            ARCHITECT
            <span className="absolute -top-4 -right-4 text-neon-green text-4xl animate-bounce">*</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/60 max-w-2xl mx-auto mb-8">
            Bridging the gap between retro foundations and future infrastructure.
          </p>
          
          <div className="flex gap-4 justify-center">
             <Button className="rounded-full h-12 px-8 text-lg bg-white text-black hover:bg-gray-200" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
               Get in Touch
             </Button>
             <Button variant="outline" className="rounded-full h-12 px-8 text-lg border-white/20 text-white hover:bg-white/10" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
               View Work
             </Button>
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Content */}
      <div className="pb-32">
        
        <Section title="ABOUT ME" color="hsl(50, 100%, 50%)" icon={User}>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 text-lg md:text-xl text-white/80 leading-relaxed font-light">
                 {PORTFOLIO_DATA.about.desc}
              </div>
              <div className="grid gap-4">
                 {PORTFOLIO_DATA.about.stats.map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-lg flex justify-between items-center">
                       <span className="font-mono text-white/60">{stat.label}</span>
                       <span className="font-display text-2xl font-bold text-white">{stat.value}</span>
                    </div>
                 ))}
              </div>
           </div>
        </Section>

        <Section title="SKILLS" color="hsl(150, 100%, 50%)" icon={Code}>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PORTFOLIO_DATA.skills.map((skill, i) => (
                 <div key={i} className="space-y-4">
                    <h3 className="text-xl font-bold text-white font-mono border-b border-white/20 pb-2">{skill.category}</h3>
                    <ul className="space-y-2">
                       {skill.items.map((item, j) => (
                          <li key={j} className="flex items-center gap-2 text-white/70">
                             <span className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                             {item}
                          </li>
                       ))}
                    </ul>
                 </div>
              ))}
           </div>
        </Section>

        <Section title="PROJECTS" color="hsl(190, 100%, 50%)" icon={Cpu} id="projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.projects.map((p, i) => (
              <ProjectCard 
                key={i} 
                {...p} 
                onClick={() => setSelectedProject(p)} 
              />
            ))}
          </div>
        </Section>

        <Section title="EXPERIENCE" color="hsl(280, 100%, 60%)" icon={Briefcase}>
          <div className="space-y-6">
            {PORTFOLIO_DATA.experience.map((e, i) => (
              <ProjectCard 
                key={i} 
                title={e.role} 
                subtitle={`${e.company} | ${e.period}`}
                desc={e.desc}
                color="hsl(280, 100%, 60%)"
              />
            ))}
          </div>
        </Section>

        <Section title="CERTIFICATES" color="hsl(320, 100%, 60%)" icon={Award}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.certificates.map((c, i) => (
              <ProjectCard 
                key={i} 
                title={c.title} 
                subtitle={`${c.issuer} - ${c.date}`}
                color="hsl(320, 100%, 60%)"
              />
            ))}
          </div>
        </Section>

        <Section title="EDUCATION" color="hsl(120, 100%, 50%)" icon={Book}>
          <ProjectCard 
            title={PORTFOLIO_DATA.education[0].degree}
            subtitle={`${PORTFOLIO_DATA.education[0].school} - ${PORTFOLIO_DATA.education[0].year}`}
            color="hsl(120, 100%, 50%)"
          />
        </Section>

        <Section title="CONTACT" color="hsl(10, 100%, 60%)" icon={Mail} id="contact">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                 <p className="text-xl text-white/80 font-light">
                    Ready to build the future? Drop me a line and let's discuss how we can architect resilient systems together.
                 </p>
                 
                 <div className="flex gap-4">
                    <Button variant="outline" className="w-full md:w-auto gap-2 h-12 border-white/20 text-white hover:bg-white/10">
                       <Github /> GitHub
                    </Button>
                    <Button variant="outline" className="w-full md:w-auto gap-2 h-12 border-white/20 text-white hover:bg-white/10">
                       <Linkedin /> LinkedIn
                    </Button>
                 </div>

                 <div className="pt-8 border-t border-white/10">
                    <h4 className="font-mono text-white/50 mb-2">EMAIL</h4>
                    <a href="mailto:hello@devevolution.com" className="text-2xl font-display font-bold text-white hover:text-neon-blue transition-colors">
                       hello@devevolution.com
                    </a>
                 </div>
              </div>

              <UiCard className="bg-white/5 border-white/10 text-white">
                 <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-xs font-mono text-white/60">NAME</label>
                          <Input className="bg-black/40 border-white/10 focus:border-white/30 text-white" placeholder="John Doe" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-mono text-white/60">EMAIL</label>
                          <Input className="bg-black/40 border-white/10 focus:border-white/30 text-white" placeholder="john@example.com" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-mono text-white/60">MESSAGE</label>
                       <Textarea className="bg-black/40 border-white/10 focus:border-white/30 text-white min-h-[120px]" placeholder="Tell me about your project..." />
                    </div>
                    <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold">
                       SEND MESSAGE
                    </Button>
                 </CardContent>
              </UiCard>
           </div>
        </Section>
      </div>

      <footer className="py-12 text-center text-white/30 font-mono text-sm border-t border-white/5 bg-black/50 relative z-10 backdrop-blur-sm">
        <p className="mb-2">SYSTEM.SHUTDOWN_INITIATED</p>
        <p>© 2025 DESIGN ENGINEER</p>
      </footer>
    </div>
  );
}
