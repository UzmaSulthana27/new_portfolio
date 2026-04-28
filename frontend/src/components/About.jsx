import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { GraduationCap, MapPin, Sparkles, User, Code2, Cpu, Database, Terminal, ShieldCheck } from "lucide-react";

const InfoModule = ({ title, subtitle, detail, icon: Icon, delay = 0, accent = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
  >
    <Card className={`relative overflow-hidden border-white/5 transition-all duration-500 hover:border-primary/40 group ${accent ? 'bg-primary/5' : 'bg-black/20 backdrop-blur-xl'}`}>
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2 rounded-lg ${accent ? 'bg-primary/20 text-primary' : 'bg-white/5 text-white/40 group-hover:text-primary transition-colors'}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex gap-1 group-hover:opacity-100 opacity-20 transition-opacity">
            <div className="w-1 h-3 bg-primary/40 rounded-full" />
            <div className="w-1 h-2 bg-primary/20 rounded-full" />
          </div>
        </div>
        
        <div className="space-y-1">
          <h4 className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">{title}</h4>
          <h3 className="text-sm font-bold text-white/90 leading-tight">{subtitle}</h3>
          <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">{detail}</p>
        </div>

        {/* Decorative scanline */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
      </CardContent>
    </Card>
  </motion.div>
);

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#02040a]">
      {/* Background HUD elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none font-mono text-[8px] leading-none overflow-hidden flex flex-wrap gap-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="whitespace-pre">
            {`SYSTEM_BOOT_LOG_${i}\nKERNEL_STABLE\nDATA_SYNC_OK\nUZMA_CORE_INIT`}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center relative"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 whitespace-nowrap">
              <Terminal className="w-3 h-3 text-primary" />
              <span className="text-[9px] font-mono text-primary/80 uppercase tracking-widest">Profile_Intelligence_v1.0</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
              The <span className="text-gradient">Architect</span> Behind
            </h2>
            <div className="flex items-center justify-center gap-2 text-muted-foreground font-mono text-xs uppercase tracking-[0.4em]">
              <div className="w-12 h-[1px] bg-white/10" />
              Uzma Sulthana S
              <div className="w-12 h-[1px] bg-white/10" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Core Identity Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-12 xl:col-span-8 group"
          >
            <Card className="h-full bg-black/40 border-white/5 backdrop-blur-3xl relative overflow-hidden group-hover:border-primary/30 transition-all duration-700">
              {/* Animated HUD corner */}
              <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none">
                 <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary/40" />
                 <div className="absolute top-6 left-6 w-1 h-1 bg-primary/20 rounded-full animate-ping" />
              </div>

              <CardContent className="p-8 md:p-12 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                  <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-primary opacity-60">
                         <div className="h-[1px] w-8 bg-current" />
                         <span className="text-xs font-mono uppercase tracking-widest">MISSION_STATEMENT</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
                        Bridging <span className="italic text-primary underline decoration-primary/20 underline-offset-8">Neural Logic</span> with <br />
                        Production-Grade Systems.
                      </h3>
                    </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          Driven Full Stack Developer with hands-on experience in 
                          <span className="text-white font-medium"> Java Ecosystems </span> 
                          and modern frontend architectures. I specialize in building 
                          <span className="text-primary italic"> scalable, user-centric </span> 
                          applications that bridge complex neural logic with production-ready systems.
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          Graduating with a cumulative <span className="text-white font-bold tracking-tight">8.9 / 10.0 CGPA</span> from 
                          Sri Aurobindo College, I've mastered reactive UI patterns and robust 
                          backend pipelines through rigorous academic and professional training.
                        </p>
                      </div>
                  </div>
                </div>
              </CardContent>

              {/* Grid Background Effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--primary)_0%,transparent_100%)] opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700" />
            </Card>
          </motion.div>

          {/* Sidebar Modules */}
          <div className="lg:col-span-12 xl:col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
            <InfoModule 
              title="Education_Nodes"
              subtitle="Bachelor of Computer Applications"
              detail="Sri Aurobindo College · Bangalore University (2022 — 2025). Top-tier academic performance."
              icon={GraduationCap}
              delay={0.1}
            />
            <InfoModule 
              title="Career_Path"
              subtitle="Frontend Developer Intern"
              detail="JSpiders (Feb 2025 — May 2025). Developed fully responsive e-commerce web systems using the MERN stack and consistent mobile-first architectures."
              icon={Code2}
              delay={0.2}
            />
            <InfoModule 
              title="Certifications"
              subtitle="AI Fluency & Java Specialist"
              detail="Accredited by Anthropic (2026) and JSpiders (2025). Validating proficiency in Core Java, Spring Boot, and responsible AI implementation."
              icon={Sparkles}
              delay={0.3}
              accent
            />
          </div>
        </div>
      </div>
    </section>
  );
}
