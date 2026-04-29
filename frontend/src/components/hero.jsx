import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button.jsx";
import { ArrowRight, Code2, Cpu, Globe, MapPin, Terminal as TerminalIcon, Sparkles, User, Database, Cpu as ChipIcon } from "lucide-react";
import { useState, useEffect } from "react";

const HolographicCard = ({ children, className, delay = 0, title = "SYSTEM_WINDOW" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, rotateY: 15, rotateX: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay, ease: "easeOut" }}
    whileHover={{ y: -10, rotateY: 20, rotateX: 5, translateZ: 50 }}
    className={`relative group ${className}`}
    style={{ transformStyle: 'preserve-3d' }}
  >
    {/* Glass Effect Container */}
    <div className="absolute inset-0 bg-primary/10 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-primary/40 group-hover:bg-primary/20" />
    
    {/* Header Bar */}
    <div className="relative z-10 px-3 py-2 border-b border-white/5 bg-black/40 flex items-center justify-between">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-500/50" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <div className="w-2 h-2 rounded-full bg-green-500/50" />
      </div>
      <span className="text-[8px] font-mono tracking-widest text-white/30 uppercase">{title}</span>
    </div>

    {/* Content */}
    <div className="relative z-10 p-4">
      {children}
    </div>

    {/* Decorative corner glow */}
    <div className="absolute bottom-0 right-0 w-12 h-12 bg-primary/20 blur-2xl pointer-events-none group-hover:bg-primary/40 transition-colors" />
  </motion.div>
);

const ScrambleText = ({ text, delay = 0, duration = 1 }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text.split("").map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / (duration * 10);
      }, 30);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [text, delay, duration]);

  return <span>{displayText || text.replace(/./g, "_")}</span>;
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#02040a]">
      {/* Background Energy Lines (SVG) */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <defs>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 0,200 L 1000,800 M 0,800 L 1000,200 M 500,0 L 500,1000 M 0,500 L 1000,500"
            stroke="url(#line-grad)"
            strokeWidth="0.5"
            strokeDasharray="10 20"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, strokeDashoffset: [0, -100] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          {/* Detailed Circuitry-like lines */}
          {[...Array(12)].map((_, i) => (
            <motion.path
              key={i}
              d={`M ${Math.random() * 1000},0 L ${Math.random() * 1000},1000`}
              stroke="var(--primary)"
              strokeWidth="0.2"
              strokeOpacity="0.1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 + Math.random() * 2, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </svg>
      </div>

      {/* Radiant Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
          {/* Left Text Content */}
          <div className="text-center lg:text-left max-w-3xl flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-8"
            >
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Innovating the Digital Frontier</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.85] select-none"
            >
              <span className="block opacity-80">Building the</span>
              <span className="text-gradient drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                <ScrambleText text="Future" delay={0.6} duration={0.6} />
              </span> <br />
              <span className="text-4xl md:text-6xl lg:text-7xl block mt-2 opacity-90">
                of Web with <span className="text-primary italic">AI</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              Hi, I'm <span className="text-white font-medium underline decoration-primary/40 decoration-2 underline-offset-4">Uzma Sulthana.S</span>. 
              Architecting intelligent full-stack solutions with Java, React, and cutting-edge Neural models.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
            >
              <Button size="lg" className="rounded-full px-10 h-14 text-lg group bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                <a href="#projects" className="flex items-center">
                  Launch Projects
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg glass border-white/10 hover:border-primary/50 text-white shadow-xl hover:shadow-primary/10">
                <a href="#contact">Contact Core</a>
              </Button>
            </motion.div>

          </div>          

          {/* Right Side: 3D Isometric Holographic Command Center */}
          <div className="relative flex-1 h-[600px] w-full hidden lg:flex items-center justify-center -mt-20" style={{ perspective: '2000px' }}>
            
            {/* The Main Digital Command Center */}
            <HolographicCard 
              className="w-full max-w-xl aspect-[16/10] z-20" 
              delay={0.2} 
              title="SYSTEM_COMMAND_CENTER_v4.0"
            >
              <div className="flex flex-col h-full gap-8 p-4">
                {/* Unified Information Grid */}
                <div className="grid grid-cols-12 gap-6 h-full">
                  {/* Left Section: User Bio & Status */}
                  <div className="col-span-5 flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center relative overflow-hidden group">
                        <User className="w-8 h-8 text-primary" />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                      </div>
                      <div>
                        <h3 className="font-mono text-xl text-white font-bold leading-tight">Uzma Sulthana.S</h3>
                        <p className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">Fullstack_Architect</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                        <span>CPU_LOAD</span>
                        <span className="text-primary">42%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div animate={{ width: "42%" }} className="h-full bg-primary/40" />
                      </div>
                      
                      <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                        <span>NEURAL_SYNK</span>
                        <span className="text-accent">98%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div animate={{ width: "98%" }} className="h-full bg-accent/40" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[9px] font-mono text-green-500/80 uppercase">System_Stable</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-accent" />
                        <span className="text-[9px] font-mono text-white/50 lowercase">bangalore.in</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Section: Code & Logic Display */}
                  <div className="col-span-7 bg-black/40 rounded-xl border border-white/5 p-6 relative overflow-hidden group">
                    <div className="flex items-center gap-2 mb-4">
                      <TerminalIcon className="w-4 h-4 text-primary" />
                      <span className="font-mono text-xs text-white/40">CORE_ARCHITECTURE</span>
                    </div>
                    
                    <div className="font-mono text-[11px] text-primary/90 leading-relaxed whitespace-pre">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                      >
{`@Component
public class Portfolio {
  
  @Autowired
  private Intelligence ai;

  public void deploy() {
    Stack s = Stack.builder()
      .backend("Java/Spring")
      .frontend("React/Tailwind")
      .logic("AI_INTEGRATED")
      .build();
      
    ai.optimize(s);
    System.out.println("LAUNCHED");
  }
}`}
                      </motion.div>
                    </div>

                    <div className="absolute bottom-4 right-4 flex items-center gap-4">
                      <Globe className="w-4 h-4 text-white/10 group-hover:text-primary transition-colors" />
                      <Cpu className="w-4 h-4 text-white/10 group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </HolographicCard>

            {/* Floating Detail Accents */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-12 -right-12 w-24 h-24 p-4 bg-black/60 border border-white/10 rounded-2xl backdrop-blur-2xl z-30 flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-primary shadow-[0_0_20px_var(--primary)]" />
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-12 -left-12 w-24 h-24 p-4 bg-black/60 border border-white/10 rounded-2xl backdrop-blur-2xl z-30 flex items-center justify-center"
            >
              <Code2 className="w-8 h-8 text-accent shadow-[0_0_20px_var(--accent)]" />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
        >
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gradient-to-b from-primary to-transparent rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
