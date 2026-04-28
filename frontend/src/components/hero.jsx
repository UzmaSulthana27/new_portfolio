import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button.jsx";
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

const StatusLog = () => {
  const [logs, setLogs] = useState([]);
  const statuses = [
    "INITIALIZING SYSTEM...",
    "AI_CORE: ONLINE",
    "LOADING JAVA_ENV...",
    "REACT_FRAMEWORK: READY",
    "CONNECTING TO VOID...",
    "UZMA_PROFILE: LOADED",
    "NEURAL_LINK: ESTABLISHED"
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-4), statuses[index]]);
      index = (index + 1) % statuses.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex flex-col gap-2 font-mono text-[10px] text-primary/60 border-l border-primary/20 pl-4 py-2 opacity-0 lg:opacity-100 transition-opacity">
      {logs.map((log, i) => (
        <motion.div
          key={`${log}-${i}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1 - (logs.length - 1 - i) * 0.2, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="w-1 h-1 bg-primary pulse" />
          {log}
        </motion.div>
      ))}
    </div>
  );
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[110vh] flex items-center justify-center pt-20 overflow-hidden bg-[#02040a]">
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

            <div className="mt-16 flex justify-center lg:justify-start">
              <StatusLog />
            </div>
          </div>

          {/* Right Side: 3D Isometric Holographic Workspace */}
          <div className="relative flex-1 h-[600px] w-full hidden lg:flex items-center justify-center" style={{ perspective: '2000px' }}>
            
            {/* The Main Laptop/Coder Window */}
            <HolographicCard 
              className="w-80 h-96 z-20" 
              delay={0.2} 
              title="CODER_ENV"
            >
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="w-24 h-24 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center relative overflow-hidden group">
                  <User className="w-12 h-12 text-primary" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                  {/* Digital scan effect */}
                  <motion.div 
                    animate={{ top: ['-100%', '100%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute h-[2px] w-full bg-primary shadow-[0_0_10px_var(--primary)] z-10"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-mono text-sm text-white/90">Uzma.S</h3>
                  <p className="text-[10px] font-mono text-primary/60">Full Stack Engineer</p>
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.6)]" />
                  <span className="text-[8px] font-mono text-green-500/80 uppercase">Active_Session</span>
                </div>
              </div>
            </HolographicCard>

            {/* Floating Map Window */}
            <HolographicCard 
              className="absolute -top-10 -right-10 w-64 h-56 z-30" 
              delay={0.4} 
              title="GEOLOCATION"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="font-mono text-xs text-white/80">Bangalore, India</span>
                </div>
                <div className="flex-1 bg-black/40 rounded border border-white/5 overflow-hidden relative grayscale opacity-60">
                   {/* Abstract Map Lines */}
                   <svg className="absolute inset-0 w-full h-full">
                     <path d="M0,50 Q100,20 200,80 T300,40" stroke="var(--primary)" strokeWidth="0.5" fill="none" opacity="0.3" />
                     <path d="M50,0 Q20,100 80,200 T40,300" stroke="var(--primary)" strokeWidth="0.5" fill="none" opacity="0.3" />
                     <circle cx="120" cy="180" r="4" fill="var(--accent)" />
                   </svg>
                   <div className="absolute bottom-2 right-2 text-[8px] font-mono text-white/20 uppercase tracking-widest">Map_Static_01</div>
                </div>
              </div>
            </HolographicCard>

            {/* Floating Code Snippet */}
            <HolographicCard 
              className="absolute -bottom-10 -left-10 w-72 h-48 z-10" 
              delay={0.6} 
              title="MAIN.JAVA"
            >
              <pre className="font-mono text-[10px] text-primary leading-tight overflow-hidden">
                {`public class Uzma {
  String status = "BUILDING";
  
  void setup() {
    AI.init();
    Stack.deploy();
  }
}`}
              </pre>
            </HolographicCard>

            {/* Micro Floating Tech Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 -left-20 p-2 bg-black/40 border border-white/10 rounded-lg backdrop-blur-xl z-40"
            >
              <Database className="w-6 h-6 text-primary" />
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 -right-16 p-2 bg-black/40 border border-white/10 rounded-lg backdrop-blur-xl z-40"
            >
              <ChipIcon className="w-6 h-6 text-accent" />
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
