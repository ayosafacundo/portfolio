import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default Nav;