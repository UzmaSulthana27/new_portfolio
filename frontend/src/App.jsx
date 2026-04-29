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
  <footer className="relative py-24 border-t border-white/5 bg-[#02040a] overflow-hidden">
    {/* Decorative Background Elements */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#8b5cf608_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-2 flex flex-col items-center md:items-start gap-6">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col group cursor-default"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-3xl font-black tracking-tighter text-gradient leading-none">
                UZMA.S
              </span>
            </div>
            <span className="text-[9px] font-mono text-primary/40 tracking-[0.4em] uppercase mt-2 group-hover:text-primary transition-colors">
              Core Architecture v4.0.2
            </span>
          </motion.div>
          <p className="text-sm text-muted-foreground/50 max-w-sm text-center md:text-left leading-relaxed font-light">
            An intersection of logic and creativity. Specializing in high-performance Java backends and immersive React frontends powered by neural intelligence.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#02040a] bg-primary/10 flex items-center justify-center text-[10px] text-primary font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-[10px] font-mono text-muted-foreground/30 uppercase tracking-widest">Active_Contributors</span>
          </div>
        </div>
        
        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <h4 className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] mb-2 px-2 py-1 border border-primary/20 rounded bg-primary/5">Navigation</h4>
          <nav className="flex flex-col items-center md:items-start gap-3">
            {[
              { label: 'Deployment', path: '/' },
              { label: 'Intelligence', path: '/about' },
              { label: 'Repositories', path: '/projects' },
              { label: 'Uplink', path: '/contact' }
            ].map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className="text-xs text-muted-foreground/60 hover:text-primary transition-all hover:translate-x-1 flex items-center gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-primary/20" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Connect */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <h4 className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] mb-2 px-2 py-1 border border-primary/20 rounded bg-primary/5">Social_Uplink</h4>
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <a href="#" className="flex items-center justify-center gap-2 px-4 py-2 rounded border border-white/5 bg-white/5 text-[10px] uppercase font-mono text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all">
              LinkedIn
            </a>
            <a href="#" className="flex items-center justify-center gap-2 px-4 py-2 rounded border border-white/5 bg-white/5 text-[10px] uppercase font-mono text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all">
              GitHub
            </a>
          </div>
          <div className="mt-4 flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-green-500/50 uppercase tracking-tighter">Server_Status: 100%_Uptime</span>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground/20 uppercase">Last_Sync: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6 overflow-hidden">
          <motion.div 
            animate={{ x: [0, -100] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 whitespace-nowrap"
          >
            {[...Array(3)].map((_, i) => (
              <span key={i} className="text-[8px] font-mono text-muted-foreground/20 uppercase tracking-[0.5em]">
                System_Encrypted • Secure_Link • Java_Run_Time • Neural_Engine_v4 • React_Fiber_Enabled • 
              </span>
            ))}
          </motion.div>
        </div>
        <p className="text-[9px] font-mono text-muted-foreground/30 uppercase tracking-widest whitespace-nowrap">
          © {new Date().getFullYear()} UZMA_S // ALL_RIGHTS_RESERVED
        </p>
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
            <Route path="/" element={
              <PageTransition>
                <main>
                  <Hero />
                  <About />
                  <CoreSkills />
                  <Projects />
                  <Contact />
                </main>
              </PageTransition>
            } />
            {/* Keeping routes available for potential deep pages */}
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
