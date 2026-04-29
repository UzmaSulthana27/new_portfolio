import { motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { useEffect, useState, useMemo } from "react";
import { Box, useTheme } from "@mui/material";

const Particle = ({ i }) => {
  const x = useMemo(() => Math.random() * 100, []);
  const y = useMemo(() => Math.random() * 100, []);
  const size = useMemo(() => Math.random() * 2 + 1, []);
  const duration = useMemo(() => Math.random() * 10 + 10, []);
  const delay = useMemo(() => Math.random() * 5, []);

  return (
    <motion.div
      className="absolute bg-primary/20 rounded-full blur-[1px]"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
      }}
      animate={{
        y: ["0%", "10%", "0%"],
        x: ["0%", "5%", "0%"],
        opacity: [0.1, 0.5, 0.1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    />
  );
};

export default function InteractiveGrid() {
  const theme = useTheme();
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 500);

  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  const nebulaX = useTransform(springX, [0, 2000], ["-2%", "2%"]);
  const nebulaY = useTransform(springY, [0, 2000], ["-2%", "2%"]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <Box 
      sx={{ 
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none', 
        zIndex: -1, 
        overflow: 'hidden', 
        bgcolor: '#010204', 
      }}
    >
      {/* Background Grid - CSS Optimized */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${theme.palette.primary.main} 1px, transparent 1px),
            linear-gradient(to bottom, ${theme.palette.primary.main} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 80%)"
        }}
      />

      {/* Dynamic Atmosphere */}
      <motion.div 
        className="absolute inset-[-5%] opacity-15"
        style={{
          x: nebulaX,
          y: nebulaY,
          background: `
            radial-gradient(circle at 30% 40%, ${theme.palette.primary.main}11 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, ${theme.palette.accent?.main || '#06b6d4'}08 0%, transparent 50%)
          `,
          filter: "blur(40px)",
        }}
      />

      {/* Minimal Particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <Particle key={i} i={i} />
        ))}
      </div>
      
      {/* Dynamic Cursor Light - Smaller and more localized */}
      <Box
        component={motion.div}
        sx={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}08 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </Box>
  );
}
