import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import TopNav from "@/components/top-nav.jsx";
import Hero from "@/components/hero.jsx";
import About from "@/components/about.jsx";
import CoreSkills from "@/components/core-skills.jsx";
import Projects from "@/components/projects.jsx";
import Contact from "@/components/contact.jsx";
import BackToTop from "@/components/back-to-top.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { motion, useScroll, useSpring, AnimatePresence, useMotionValue } from "motion/react";
import InteractiveGrid from "@/components/interactive-grid.jsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 400, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 400, mass: 0.5 });
  const outerSpringX = useSpring(mouseX, { damping: 20, stiffness: 200, mass: 1 });
  const outerSpringY = useSpring(mouseY, { damping: 20, stiffness: 200, mass: 1 });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === "BUTTON" || 
        target.tagName === "A" || 
        target.closest("button") || 
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary mix-blend-difference pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: isHovering ? 45 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-primary/30 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: outerSpringX,
          y: outerSpringY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: isHovering ? -45 : 0,
          padding: isHovering ? "20px" : "0px",
        }}
      />
    </>
  );
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const Layout = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground lg:cursor-none">
      <InteractiveGrid />
      <CustomCursor />
      <BackToTop />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
        style={{ scaleX }}
      />

      <TopNav />
      {children}
      <Footer />
    </div>
  );
}

const Footer = () => (
  <footer className="relative py-20 border-t border-white/5 bg-black/40 overflow-hidden">
    {/* Decorative Background Elements */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#8b5cf610_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Brand Column */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col"
          >
            <span className="text-2xl font-black tracking-tighter text-gradient leading-none">
              UZMA.S
            </span>
            <span className="text-[10px] font-mono text-primary tracking-[0.3em] uppercase mt-1">
              Architecting Intelligence
            </span>
          </motion.div>
          <p className="text-sm text-muted-foreground/60 max-w-xs text-center md:text-left leading-relaxed">
            Crafting the next generation of digital experiences through the intersection of Java, React, and Artificial Intelligence.
          </p>
        </div>
        
        {/* Navigation Column */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-all hover:tracking-widest uppercase text-[11px] tracking-wider">Home</Link>
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-all hover:tracking-widest uppercase text-[11px] tracking-wider">About</Link>
            <Link to="/projects" className="text-sm font-medium text-muted-foreground hover:text-primary transition-all hover:tracking-widest uppercase text-[11px] tracking-wider">Projects</Link>
            <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-all hover:tracking-widest uppercase text-[11px] tracking-wider">Contact</Link>
          </div>
          
          <div className="flex items-center gap-3">
            {[
              { icon: <motion.div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[10px] uppercase tracking-wider font-bold hover:bg-primary/10 hover:border-primary/30 transition-all cursor-pointer"><span className="text-primary text-xs">LinkedIn</span></motion.div> },
              { icon: <motion.div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[10px] uppercase tracking-wider font-bold hover:bg-primary/10 hover:border-primary/30 transition-all cursor-pointer"><span className="text-primary text-xs">GitHub</span></motion.div> }
            ].map((social, i) => (
              <motion.div key={i} whileHover={{ y: -2 }}>
                {social.icon}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
          <div className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em] mb-2">System Status</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            <span className="text-xs font-mono text-green-500/70">ALL_SYSTEMS_OPERATIONAL</span>
          </div>
          <p className="text-[11px] text-muted-foreground/60 mt-4">
            © {new Date().getFullYear()} • Uzma Sulthana.S
          </p>
        </div>
      </div>
      
      <Separator className="my-12 bg-white/5" />
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.25em]">
          Designed & Developed in the Webscape v4.0
        </p>
        <div className="flex items-center gap-4">
          <span className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.2em]">React</span>
          <span className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.2em]">•</span>
          <span className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.2em]">Tailwind</span>
          <span className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.2em]">•</span>
          <span className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.2em]">Framer Motion</span>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<PageTransition><Hero /></PageTransition>} />
            <Route path="/about" element={<PageTransition><><About /><CoreSkills /></></PageTransition>} />
            <Route path="/skills" element={<PageTransition><CoreSkills /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </BrowserRouter>
  );
}
