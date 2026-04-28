import { useEffect, useState } from "react";
import TopNav from "@/components/TopNav.jsx";
import Hero from "@/components/Hero.jsx";
import About from "@/components/About.jsx";
import CoreSkills from "@/components/CoreSkills.jsx";
import Projects from "@/components/Projects.jsx";
import Contact from "@/components/Contact.jsx";
import BackToTop from "@/components/BackToTop.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { motion, useScroll, useSpring } from "motion/react";
import InteractiveGrid from "@/components/InteractiveGrid.jsx";

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
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
  }, []);

  return (
    <>
      {/* Main Cursor Box */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary mix-blend-difference pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 8,
          rotate: isHovering ? 45 : 0,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.5 }}
      />
      {/* Outer Dynamic Frame */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-primary/30 pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          rotate: isHovering ? -45 : 0,
          padding: isHovering ? "20px" : "0px",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 200, mass: 1 }}
      />
    </>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground cursor-none">
      <InteractiveGrid />
      <CustomCursor />
      <BackToTop />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
        style={{ scaleX }}
      />

      <TopNav />
      
      <main>
        <Hero />
        <About />
        <CoreSkills />
        <Projects />
        <Contact />
      </main>

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
              <a href="#home" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">Projects</a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
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
    </div>
  );
}
