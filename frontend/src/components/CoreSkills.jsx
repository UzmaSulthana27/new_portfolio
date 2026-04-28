import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  Tooltip as RechartsTooltip
} from "recharts";
import { 
  Typography, 
  Box, 
  Card, 
  CardContent,
  ThemeProvider,
  createTheme,
  Chip
} from "@mui/material";
import { 
  Database, 
  Layout, 
  Server, 
  Terminal,
  Code,
  Globe,
  Cpu,
  Palette,
  Zap,
  Atom,
  Wind,
  Layers,
  Coffee,
  Leaf,
  Activity,
  Box as BoxIcon,
  Bot,
  Sparkles,
  GitBranch,
  Send,
  Cloud
} from "lucide-react";

// Create a dark theme to match the portfolio
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6',
    },
    background: {
      default: 'transparent',
      paper: '#111827',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  shape: {
    borderRadius: 16,
  },
});

const chartData = [
  { subject: 'Frontend', A: 95, fullMark: 100 },
  { subject: 'Backend', A: 85, fullMark: 100 },
  { subject: 'Database', A: 80, fullMark: 100 },
  { subject: 'Fullstack', A: 90, fullMark: 100 },
  { subject: 'AI Integration', A: 75, fullMark: 100 },
  { subject: 'Tools/Git', A: 90, fullMark: 100 },
];

const allSkills = [
  { name: "HTML5", icon: <Code size={24} />, color: "#E34F26" },
  { name: "CSS3", icon: <Palette size={24} />, color: "#1572B6" },
  { name: "JavaScript", icon: <Zap size={24} />, color: "#F7DF1E" },
  { name: "React", icon: <Atom size={24} />, color: "#61DAFB" },
  { name: "Tailwind CSS", icon: <Wind size={24} />, color: "#06B6D4" },
  { name: "Material UI", icon: <Layers size={24} />, color: "#007FFF" },
  { name: "Java", icon: <Coffee size={24} />, color: "#ED8B00" },
  { name: "SpringBoot", icon: <Leaf size={24} />, color: "#6DB33F" },
  { name: "Node.js", icon: <Activity size={24} />, color: "#339933" },
  { name: "Express", icon: <Zap size={24} />, color: "#FFFFFF" },
  { name: "REST APIs", icon: <Globe size={24} />, color: "#06B6D4" },
  { name: "MySQL", icon: <Database size={24} />, color: "#4479A1" },
  { name: "PostgreSQL", icon: <Database size={24} />, color: "#4169E1" },
  { name: "MongoDB", icon: <BoxIcon size={24} />, color: "#47A248" },
  { name: "GPT-4", icon: <Bot size={24} />, color: "#10A37F" },
  { name: "Gemini", icon: <Sparkles size={24} />, color: "#8B5CF6" },
  { name: "Git", icon: <GitBranch size={24} />, color: "#F05032" },
  { name: "Postman", icon: <Send size={24} />, color: "#FF6C37" },
  { name: "Vercel", icon: <Cloud size={24} />, color: "#FFFFFF" },
  { name: "Python", icon: <Terminal size={24} />, color: "#3776AB" },
  { name: "JDBC", icon: <Database size={24} />, color: "#F0DB4F" },
  { name: "Servlets", icon: <Server size={24} />, color: "#007396" }
];

const SkillNode = ({ name, icon, isCenter, delay = 0, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ 
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay 
    }}
    whileHover={{ scale: 1.1, rotate: isCenter ? 0 : 5 }}
    className={`relative group cursor-pointer ${isCenter ? 'z-20' : 'z-10'}`}
  >
    {/* Inner glow and shape */}
    <div className={`
      relative rounded-full flex items-center justify-center border-2 transition-all duration-500
      ${isCenter ? 'w-16 h-16 md:w-28 md:h-28 border-primary bg-primary/10 shadow-[0_0_40px_rgba(139,92,246,0.3)]' : 'w-10 h-10 md:w-16 md:h-16 border-white/10 bg-slate-900/40 backdrop-blur-sm group-hover:bg-primary/10'}
    `} style={!isCenter && color ? { borderColor: `${color}44` } : {}}>
      <div className={`flex items-center justify-center transition-transform group-hover:scale-110 ${isCenter ? 'px-6' : ''}`} style={!isCenter && color ? { color: color } : {}}>
        {isCenter ? (
          <Typography variant="caption" sx={{ 
            fontWeight: 800, 
            lineHeight: 1.1, 
            letterSpacing: '0.02em',
            fontSize: { xs: '9px', md: '12px' },
            textAlign: 'center',
            display: 'block',
            color: 'white',
            textShadow: '0 0 10px rgba(255,255,255,0.4)',
          }} className="uppercase">
            Full Stack<br/>Developer
          </Typography>
        ) : (
          <div className="flex items-center justify-center w-full h-full p-1">
            {icon && (typeof icon === 'string' ? <span className="text-[14px] font-bold">{icon}</span> : icon)}
          </div>
        )}
      </div>
      
      {/* HUD decoration for center */}
      {isCenter && (
        <div className="absolute inset-0">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-20px] border border-dashed border-primary/20 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-40px] border border-dotted border-primary/10 rounded-full"
          />
        </div>
      )}
    </div>
  </motion.div>
);

const Branch = ({ start, end, delay = 0, blueprintMode, activeCategory, categoryId }) => {
  const isActive = activeCategory === categoryId;
  return (
    <g className="pointer-events-none">
      <motion.path
        d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
        fill="none"
        stroke={blueprintMode ? "#8b5cf6" : (isActive ? "url(#activeGradient)" : "url(#energyGradient)")}
        strokeWidth={blueprintMode ? "1" : (isActive ? "3" : "1.5")}
        strokeDasharray={blueprintMode ? "" : (isActive ? "" : "4 4")}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: blueprintMode ? 0.4 : (isActive ? 1 : 0.5) }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay }}
      />
      {!blueprintMode && isActive && (
        <motion.path
          d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
          fill="none"
          stroke="#8b5cf6"
          strokeWidth="6"
          className="blur-xl opacity-20"
        />
      )}
      {!blueprintMode && (
        <motion.circle
          r="3"
          fill={isActive ? "#8b5cf6" : "#444"}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: isActive ? 1.5 : 3, 
            repeat: Infinity, 
            delay: delay + 1,
            ease: "linear"
          }}
        >
          <animateMotion
            path={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
            dur={isActive ? "1.5s" : "3s"}
            repeatCount="indefinite"
          />
        </motion.circle>
      )}
      
      {blueprintMode && (
        <g opacity="0.4">
          <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="2 2" />
          <text x={(start.x + end.x) / 2 + 10} y={(start.y + end.y) / 2 - 10} fill="#8b5cf6" fontSize="8" fontFamily="monospace">
            DIST: {Math.round(Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)))}px
          </text>
        </g>
      )}
    </g>
  );
};

export default function CoreSkills() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [blueprintMode, setBlueprintMode] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive radius for single perfect circle
  const orbitRadius = isMobile ? 320 : 350;
  
  const coreNode = { x: 500, y: 400, name: "Full Stack Developer" };

  return (
    <ThemeProvider theme={darkTheme}>
      <section id="skills" className={`py-20 md:py-32 relative overflow-hidden transition-colors duration-1000 ${blueprintMode ? 'bg-[#000]' : 'bg-[#02040a]'}`}>
        {/* Dynamic Background */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${blueprintMode ? 'opacity-40' : 'opacity-20'}`}>
          {blueprintMode ? (
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px]" />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#8b5cf615_0%,transparent_70%)]" />
          )}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }} className={`text-4xl md:text-6xl tracking-tighter transition-all ${blueprintMode ? 'font-mono text-white/80' : ''}`}>
                {blueprintMode ? "SPEC_ARCH_v2.0" : "Holographic Skill Tree"}
              </Typography>
              <Typography variant="body1" color="text.secondary" className={`max-w-2xl mx-auto italic transition-all ${blueprintMode ? 'font-mono text-[10px] uppercase tracking-widest' : ''}`}>
                {blueprintMode ? "SYSTEM_ARCHITECTURE_SCHEMATIC_VIEW_MODE_ACTIVE" : "A non-linear map of technical evolution, branching from core logic to complex architectures."}
              </Typography>
            </motion.div>

            {/* Blueprint Toggle */}
            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => setBlueprintMode(!blueprintMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 group
                  ${blueprintMode 
                    ? 'border-primary bg-primary/20 text-primary' 
                    : 'border-white/10 bg-white/5 text-muted-foreground hover:border-primary/50'
                  }`}
              >
                <div className={`w-2 h-2 rounded-full ${blueprintMode ? 'bg-primary animate-pulse' : 'bg-white/40'}`} />
                <span className="text-[10px] font-bold tracking-widest uppercase">
                  {blueprintMode ? "Deactivate Blueprint" : "Activate Blueprint Mode"}
                </span>
                <Terminal className="w-3 h-3 ml-2 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>

          <div className={`relative w-full max-w-5xl mx-auto aspect-square md:aspect-[1.25/1] rounded-[32px] md:rounded-[48px] border transition-all duration-1000 backdrop-blur-xl overflow-hidden flex items-center justify-center
            ${blueprintMode ? 'bg-black border-primary/40' : 'bg-[#0f172a]/20 border-white/5'}`}
            style={{ perspective: '1200px' }}
          >
            
            {/* Starscape Unit */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* The SVG energy connections */}
              <motion.svg 
                viewBox="0 0 1000 800" 
                className={`absolute inset-0 w-full h-full transition-all duration-1000 ${blueprintMode ? 'brightness-150 grayscale-0' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              >
                <defs>
                  <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                
                {/* Solar System Orbital Path - Only visible in Blueprint Mode */}
                {blueprintMode && (
                  <circle 
                    cx="500" 
                    cy="400" 
                    r={orbitRadius} 
                    fill="none" 
                    stroke="#8b5cf6" 
                    strokeWidth="0.5" 
                    strokeDasharray="5 5" 
                  />
                )}

                {/* Direct connections from core directly to all skills */}
                {allSkills.map((skill, idx) => {
                  const angle = (idx / allSkills.length) * 2 * Math.PI - Math.PI / 2;
                  const pos = {
                    x: 500 + Math.cos(angle) * orbitRadius,
                    y: 400 + Math.sin(angle) * orbitRadius
                  };

                  return (
                    <Branch 
                      key={`branch-${skill.name}`}
                      start={coreNode} 
                      end={pos} 
                      delay={0.1 + idx * 0.05} 
                      blueprintMode={blueprintMode} 
                      activeCategory={activeSkill} 
                      categoryId={skill.name} 
                    />
                  );
                })}
                
                {/* Extra Blueprint Lines */}
                {blueprintMode && (
                  <g>
                    <line x1="0" y1="400" x2="1000" y2="400" stroke="#8b5cf6" strokeWidth="0.5" strokeOpacity="0.2" />
                    <line x1="500" y1="0" x2="500" y2="800" stroke="#8b5cf6" strokeWidth="0.5" strokeOpacity="0.2" />
                  </g>
                )}
              </motion.svg>

              {/* The Actual Interactive Nodes */}
              <motion.div 
                className={`absolute inset-0 pointer-events-none transition-all duration-700 ${blueprintMode ? 'scale-95' : ''}`} 
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              >
                {/* Main Core - Stationary */}
                <div className="absolute pointer-events-auto" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                  >
                    <SkillNode {...coreNode} isCenter />
                  </motion.div>
                </div>

                {/* Individual Skill Nodes Orbiting Core */}
                {allSkills.map((skill, idx) => {
                  const angle = (idx / allSkills.length) * 2 * Math.PI - Math.PI / 2;
                  const nodePos = {
                    x: 500 + Math.cos(angle) * orbitRadius,
                    y: 400 + Math.sin(angle) * orbitRadius
                  };
                  
                  return (
                    <div 
                      key={skill.name} 
                      className="absolute pointer-events-auto" 
                      onMouseEnter={() => setActiveSkill(skill.name)}
                      onMouseLeave={() => setActiveSkill(null)}
                      style={{ 
                        left: `${nodePos.x / 10}%`, 
                        top: `${nodePos.y / 8}%`, 
                        transform: 'translate(-50%, -50%)',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      <motion.div
                        animate={{ rotate: [0, -360] }}
                        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                      >
                        <motion.div 
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                          whileHover={{ scale: 1.3, zIndex: 100 }}
                          className={`flex items-center justify-center group relative transition-all duration-300 p-2`}
                        >
                          <div className={`flex items-center justify-center transition-all scale-100 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] ${blueprintMode ? 'opacity-80 brightness-125' : ''}`} style={{ color: skill.color }}>
                            {skill.icon}
                          </div>
                          
                          {/* Tooltip on hover */}
                          {activeSkill === skill.name && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded text-[10px] text-white whitespace-nowrap z-50 pointer-events-none"
                            >
                              {skill.name}
                            </motion.div>
                          )}
                          
                          {blueprintMode && (
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[6px] text-primary whitespace-nowrap opacity-50 uppercase tracking-tighter">
                              {skill.name.substring(0, 6)}
                            </div>
                          )}
                        </motion.div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}
