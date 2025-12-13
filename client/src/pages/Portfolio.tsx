import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, Cpu, Award, Book, Briefcase, User, Code, Mail, Github, Linkedin } from "lucide-react";
import { Card as UiCard, CardContent } from "@/components/ui/card";
import { useState } from "react";
import TerminalModal from "@/components/portfolio/TerminalModal";
import Section from "@/components/portfolio/Section";
import ProjectCard from "@/components/portfolio/Cards/ProjectCards";
import Nav from "@/components/portfolio/Nav";
import { About, Certificate, Education, Experience, Project, Skill, sqlResponse } from "@/types/datatypes";
import ExperienceCards from "@/components/portfolio/Cards/ExperienceCards";
import CertificationCards from "@/components/portfolio/Cards/CertificationCards";
import EducationCards from "@/components/portfolio/Cards/EducationCards";
import { Button } from "@/components/ui/button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { sendContactForm } from "@/lib/Datafetcher";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export const locale = navigator.languages[0];

interface FormData {
   name: string;
   email: string;
   message: string;
}

export default function Portfolio({PORTFOLIO_DATA}:{ PORTFOLIO_DATA: sqlResponse }) {
   const { scrollYProgress } = useScroll();
   const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
   const [selectedProject, setSelectedProject] = useState<[Project | Experience | Education | Certificate | null, string]>([null, ""]);
   const [firstOpen, setFirstOpen] = useState<boolean>(true);
   const methods = useForm<FormData>();
   const [sentStatus, setSentStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
   const [error, setError] = useState<Error | null>(null);
   
   const onSubmit: SubmitHandler<FormData> = async (data) => {
        // Use the validated data object from React Hook Form
        const { name, email, message } = data; 
        
        setSentStatus('sending');
        setError(null);

        console.log({ name, email, message });

        try {
            // Await the API call
            await sendContactForm(name, email, message);
            
            // Update UI on success
            setSentStatus('success');
            // Optionally reset the form fields on success
            methods.reset(); 
            
        } catch (e: any) {
            // Catch and set error state
            console.error("Could not fetch data:", e.message);
            setSentStatus('error');
            setError(e);
        }
    };



   const [ skills, projects, experiences, education, certificates, about ]:
   [ Skill[], Project[], Experience[], Education[], Certificate[], About ] = [
      PORTFOLIO_DATA.skills,
      PORTFOLIO_DATA.projects,
      PORTFOLIO_DATA.experiences,
      PORTFOLIO_DATA.education,
      PORTFOLIO_DATA.certificates,
      PORTFOLIO_DATA.about[0]
   ]

   return (
   <div className="min-h-screen text-foreground selection:bg-white selection:text-black overflow-x-hidden">
      <Nav />
      <TerminalModal 
        isOpen={!!selectedProject[0]} 
        onClose={() => {setSelectedProject([null, "Opened"]); setFirstOpen(false)}}
        firstOpen={firstOpen}
        project={selectedProject[0]}
        type={selectedProject[1]} 
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
             <span className="font-mono text-white/50">SOFTWARE.DEV // SYS.ADMIN // DEV.OPS // FULL_STACK_WEB.DEV</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter text-white mb-6 relative">
            AYOSA FACUNDO
            <span className="absolute -top-4 -right-4 text-neon-green text-4xl animate-bounce">*</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-white/60 max-w-2xl mx-auto mb-8">
            Bridging the gap between retro foundations and future infrastructure.
          </p>
          
          <div className="flex gap-4 justify-center">
             <Button className=" cursor-pointer rounded-full h-12 px-8 text-lg bg-white text-black hover:bg-gray-200" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
               Get in Touch
             </Button>
             <Button variant="outline" className=" cursor-pointer rounded-full h-12 px-8 text-lg border-white/20 text-white hover:bg-white/10" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
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
                 {about.about_me}
              </div>
              <div className="grid gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex justify-between items-center">
                     <span className="font-mono text-white/60">Final grade point average</span>
                     <span className="font-display text-2xl font-bold text-white">7.90/10</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex justify-between items-center">
                     <span className="font-mono text-white/60">Times I broke Linux</span>
                     <span className="font-display text-2xl font-bold text-white">12</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex justify-between items-center">
                     <span className="font-mono text-white/60">LXCs currently in use in Proxmox</span>
                     <span className="font-display text-2xl font-bold text-white">10</span>
                  </div>
              </div>
           </div>
        </Section>

        <Section title="SKILLS" color="hsl(150, 100%, 50%)" icon={Code}>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill: {category: string, tags_array: string[]}, i: number) => (
                 <div key={i} className="space-y-4">
                    <h3 className="text-xl font-bold text-white font-mono border-b border-white/20 pb-2">{skill.category}</h3>
                    <ul className="space-y-2">
                       {skill.tags_array.map((item, j) => (
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p: any, i: number) => (
              <ProjectCard 
                key={i}
                project={p} 
                onClick={() => setSelectedProject([p, "project"])} 
              />
            ))}
          </div>
        </Section>

        <Section title="EXPERIENCE" color="hsl(280, 100%, 60%)" icon={Briefcase}>
          <div className="space-y-6">
            {experiences.map((e:any, i:number) => (
              <ExperienceCards 
                key={i} 
                experience={e}
                base_color="hsl(280, 100%, 60%)"
                onClick={() => setSelectedProject([e, "experience"])}
              />
            ))}
          </div>
        </Section>

        <Section title="CERTIFICATES" color="hsl(320, 100%, 60%)" icon={Award}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((c:any, i:number) => (
              <CertificationCards 
                key={i} 
                certification={c}
                base_color="hsl(320, 100%, 60%)"
                onClick={() => setSelectedProject([c, "certification"])}
              />
            ))}
          </div>
        </Section>

        <Section title="EDUCATION" color="hsl(120, 100%, 50%)" icon={Book}>
          {
            education.map((e:any, i:number) => (
               <EducationCards 
                 education={e}
                 base_color="hsl(120, 100%, 50%)"
                 onClick={() => setSelectedProject([e, "education"])}
                 key={i}
                 />
                 //subtitle={`${e.university} - ${new Date(e.graduation_date).toLocaleDateString(locale, {year: 'numeric', month: 'long'})}`}
            ))
          }
        </Section>

        <Section title="CONTACT" color="hsl(10, 100%, 60%)" icon={Mail} id="contact">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                 <p className="text-xl text-white/80 font-light">
                    Ready to build the future? Drop me a line and let's discuss how we can architect resilient systems together.
                 </p>
                 
                 <div className="flex gap-4">
                    <Button variant="outline" className="cursor-pointer w-full md:w-auto gap-2 h-12 border-white/20 text-white hover:bg-white/10"
                    onClick={() => window.open(about.Github_URL, "_blank")}>
                       <Github /> GitHub
                    </Button>
                    <Button variant="outline" className="cursor-pointer w-full md:w-auto gap-2 h-12 border-white/20 text-white hover:bg-white/10"
                    onClick={() => window.open(about.LinkedIn_URL, "_blank")}>
                       <Linkedin /> LinkedIn
                    </Button>
                 </div>

                 <div className="pt-8 border-t border-white/10">
                    <h4 className="font-mono text-white/50 mb-2">EMAIL</h4>
                    <a href="mailto:ayosafacundo@gmail.com" className="text-2xl font-display font-bold text-white hover:text-neon-blue transition-colors">
                       ayosafacundo@gmail.com
                    </a>
                 </div>
              </div>

              <UiCard className="bg-white/5 border-white/10 text-white">
                 <CardContent className="p-6 space-y-4">
                     <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-white/60">NAME</label>
                        <Input 
                            {...methods.register("name", { required: "Name is required" })} 
                            className="bg-black/40 border-white/10 focus:border-white/30 text-white" 
                            placeholder="John Doe" 
                        />
                         {methods.formState.errors.name && <p className="text-red-400 text-xs">{methods.formState.errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-white/60">EMAIL</label>
                        <Input 
                            {...methods.register("email", { 
                                required: "Email is required", 
                                pattern: /^\S+@\S+$/i // Basic email pattern
                            })} 
                            className="bg-black/40 border-white/10 focus:border-white/30 text-white" 
                            placeholder="john@example.com" 
                        />
                        {methods.formState.errors.email && <p className="text-red-400 text-xs">{methods.formState.errors.email.message}</p>}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-mono text-white/60">MESSAGE</label>
                    <Textarea 
                        {...methods.register("message", { required: "Message is required" })} 
                        className="bg-black/40 border-white/10 focus:border-white/30 text-white min-h-[120px]" 
                        placeholder="Tell me about your project..." 
                    />
                    {methods.formState.errors.message && <p className="text-red-400 text-xs">{methods.formState.errors.message.message}</p>}
                </div>
                
                <Button 
                    type="submit" 
                    className="cursor-pointer w-full bg-white text-black hover:bg-gray-200 font-bold mt-4"
                    disabled={sentStatus === 'sending'} // Disable button during submission
                >
                    {sentStatus === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                </Button>
                
                {/* Submission Feedback */}
                {sentStatus === 'success' && <p className="text-green-400 mt-2">✅ Message sent successfully!</p>}
                {sentStatus === 'error' && <p className="text-red-400 mt-2">❌ Submission failed: {error?.message}</p>}

            </form>
        </FormProvider>
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
