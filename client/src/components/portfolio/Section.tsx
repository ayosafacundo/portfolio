import { motion } from "framer-motion";

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
        className="text-5xl md:text-7xl font-display font-bold ml-3 mb-12 tracking-tight"
        variants={{
          hidden: { x: -50, opacity: 0 },
          visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
        }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
          {title}
        </span>
      </motion.h2>

      <div className="grid gap-8 w-full p-4">
        {children}
      </div>
    </motion.section>
  );
};

export default Section;