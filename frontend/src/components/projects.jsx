import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Github, ExternalLink, Sparkles, Terminal, Code2, Layers, Cpu, Box as BoxIcon, Database, Zap, Brain, Atom, Globe, FileCode, Layout, Server, Database as DatabaseIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";

const techIcons = {
  "Python": { icon: <Terminal className="w-3 h-3" />, color: "#3776AB" },
  "Java": { icon: <FileCode className="w-3 h-3" />, color: "#ED8B00" },
  "Spring Boot": { icon: <Server className="w-3 h-3" />, color: "#6DB33F" },
  "MERN Stack": { icon: <Layers className="w-3 h-3" />, color: "#00ED64" },
  "Flask": { icon: <Server className="w-3 h-3" />, color: "#ffffff" },
  "ML": { icon: <Cpu className="w-3 h-3" />, color: "#8B5CF6" },
  "Frontend": { icon: <Layout className="w-3 h-3" />, color: "#0ea5e9" },
  "React": { icon: <Atom className="w-3 h-3" />, color: "#61DAFB" },
  "React.js": { icon: <Atom className="w-3 h-3" />, color: "#61DAFB" },
  "Node.js": { icon: <Globe className="w-3 h-3" />, color: "#339933" },
  "Socket.io": { icon: <Zap className="w-3 h-3" />, color: "#ffffff" },
  "MySQL": { icon: <DatabaseIcon className="w-3 h-3" />, color: "#4479A1" },
  "MongoDB": { icon: <DatabaseIcon className="w-3 h-3" />, color: "#47A248" },
  "Three.js": { icon: <BoxIcon className="w-3 h-3" />, color: "#ffffff" },
  "Hugging Face": { icon: <Brain className="w-3 h-3" />, color: "#FFD21E" },
  "JavaScript": { icon: <FileCode className="w-3 h-3" />, color: "#F7DF1E" },
  "HTML5/CSS3": { icon: <Layout className="w-3 h-3" />, color: "#E34F26" },
  "State Management": { icon: <Layers className="w-3 h-3" />, color: "#764ABC" },
  "Express": { icon: <Server className="w-3 h-3" />, color: "#ffffff" },
  "Vite": { icon: <Zap className="w-3 h-3" />, color: "#646CFF" }
};

const projectData = [
  {
    id: 1,
    title: "ARCHITECT_AI.SYS",
    subtitle: "CODE_GEN_v2.0",
    description: "MERN Code Generator",
    longDescription: "A sophisticated MERN stack application that leverages AI to generate production-ready boilerplate code and architectural diagrams instantly.",
    tech: ["MongoDB", "Express", "React", "Node.js", "MERN Stack"],
    category: "AI",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    color: "#00ED64"
  },
  {
    id: 2,
    title: "TALENT_SYNC.AI",
    subtitle: "INTERVIEW_BOT_v1.5",
    description: "AI Interview Bot",
    longDescription: "Interactive interview platform featuring automated verbal feedback and coding challenges. Built with a robust Java backend and React frontend.",
    tech: ["Java", "Spring Boot", "React", "MySQL", "JavaScript"],
    category: "AI",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    color: "#ED8B00"
  },
  {
    id: 3,
    title: "BUDDY_BOT.EXE",
    subtitle: "NEURAL_COLLAB_v1.2",
    description: "AI Collaboration Platform",
    longDescription: "Real-time Slack-style platform with Hugging Face AI assistant. Features WebSocket pipelines and 3D animated components built with Three.js.",
    tech: ["React", "Node.js", "Socket.io", "MySQL", "Three.js", "Hugging Face"],
    category: "AI",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop",
    color: "#8b5cf6"
  },
  {
    id: 4,
    title: "SHOP_WAVE.DB",
    subtitle: "COMMERCE_ENGINE_v9.0",
    description: "E-Commerce Website",
    longDescription: "Fully responsive retail ecosystem with seamless product cataloging, cart management, and dynamic state synchronization across devices.",
    tech: ["React.js", "JavaScript", "HTML5/CSS3", "State Management"],
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop",
    color: "#10b981"
  }
];

const ProjectModule = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-black/40 border border-white/5 backdrop-blur-xl group-hover:border-primary/40 transition-all duration-500 h-full flex flex-col">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
            <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{project.subtitle}</span>
          </div>
          <div className="flex gap-1">
             <div className="w-1 h-3 bg-white/5 rounded-full" />
             <div className="w-1 h-2 bg-white/5 rounded-full" />
          </div>
        </div>

        {/* Thumbnail Area */}
        <div className="relative h-56 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-100"
          />
          
          {/* Overlay Tech Specs */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md p-6 flex flex-col justify-center"
              >
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--primary) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Terminal className="w-3 h-3" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em]">Data_Extraction</span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed font-mono italic">
                    {project.longDescription}
                  </p>
                </div>
                
                {/* Scanner effect */}
                <motion.div 
                  className="absolute left-0 w-full h-0.5 bg-primary shadow-[0_0_15px_var(--primary)] z-20"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-black text-white group-hover:text-primary transition-colors tracking-tighter">{project.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 uppercase font-mono tracking-widest">{project.description}</p>
              </div>
              
              {/* Tech Tags - Now Always Visible with Brand Colors */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => {
                  const tech = techIcons[t] || { icon: <Code2 className="w-3 h-3" />, color: "#8b5cf6" };
                  return (
                    <div 
                      key={t} 
                      className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 group-hover:border-white/20 transition-all hover:bg-white/10 group/tech" 
                      title={t}
                    >
                      <div 
                        className="transition-colors duration-300" 
                        style={{ color: isHovered ? tech.color : "rgba(255,255,255,0.4)" }}
                      >
                        {tech.icon}
                      </div>
                      <span className="text-[9px] font-mono text-white/40 group-hover/tech:text-white/80 lowercase tracking-wider transition-colors">
                        {t.replace('.js', '')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            {project.category === "AI" && (
              <div className="px-2 py-0.5 bg-primary/20 border border-primary/40 rounded text-[8px] text-primary font-bold uppercase flex items-center gap-1">
                <Sparkles className="w-2 h-2" />
                <span>AI_CO_PROC</span>
              </div>
            )}
          </div>

          <div className="mt-auto pt-6 flex gap-3 border-t border-white/5">
            <Button variant="outline" size="sm" className="flex-1 rounded-lg border-white/10 glass bg-white/5 hover:bg-primary/20 hover:border-primary/50 text-[10px] uppercase font-mono group/btn">
              <Github className="w-3 h-3 mr-2 group-hover/btn:rotate-12 transition-transform" />
              Source_Code
            </Button>
            <Button size="sm" className="flex-1 rounded-lg bg-primary hover:bg-primary/90 text-white shadow-lg text-[10px] uppercase font-mono group/btn">
              <ExternalLink className="w-3 h-3 mr-2 group-hover/btn:scale-110 transition-transform" />
              Live_Deploy
            </Button>
          </div>
        </div>

        {/* Static HUD corners for personality */}
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-white/20" />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white/20" />
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const categories = ["All", "Frontend", "Backend", "AI"];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projectData 
    : projectData.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative bg-[#02040a] overflow-hidden">
      {/* Decorative Matrix Background (Subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] mask-gradient-to-b flex flex-wrap gap-1 p-2 overflow-hidden">
        {Array.from({ length: 150 }).map((_, i) => (
          <div key={i} className="text-[10px] font-mono text-primary rotate-90 w-4 h-4 overflow-hidden">
            0101
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4">
               <Layers className="w-3 h-3 text-primary" />
               <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em]">Neural_Deployment_Gallery</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">
              SELECTED <span className="text-gradient">WORKS</span>
            </h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full" />
          </motion.div>

          {/* Technical Filter Bar */}
          <div className="mt-12 p-1.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-xl flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-lg text-[10px] font-mono uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectModule key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </div>

        {/* Footer Technical Detail */}
        <div className="mt-20 flex flex-col items-center gap-4 py-8 border-t border-white/5">
          <div className="flex gap-8">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white tracking-widest">12+</span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Repos_Tracked</span>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-primary tracking-widest">3.5k</span>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Hours_Log</span>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="flex flex-col items-center">
               <span className="text-2xl font-bold text-white tracking-widest">99%</span>
               <span className="text-[10px] font-mono text-muted-foreground uppercase">Uptime_Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
