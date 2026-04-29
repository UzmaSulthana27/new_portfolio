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
  <footer className="py-12 border-t bg-muted/20">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-bold tracking-tighter text-gradient">
            UZMA.S
          </span>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Uzma Sulthana.S. All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center gap-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
          <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
          <Link to="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">Projects</Link>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <span className="sr-only">LinkedIn</span>
            in
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <span className="sr-only">GitHub</span>
            gh
          </motion.div>
        </div>
      </div>
      
      <Separator className="my-8 opacity-50" />
      
      <div className="text-center">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
          Built with React • Tailwind • Framer Motion • Shadcn UI
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
