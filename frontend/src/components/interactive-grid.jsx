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

  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  const rotateX = useTransform(springY, (v) => {
    const halfH = typeof window !== 'undefined' ? window.innerHeight / 2 : 500;
    return 65 - ((v - halfH) / halfH) * 8; 
  });
  const rotateY = useTransform(springX, (v) => {
    const halfW = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
    return ((v - halfW) / halfW) * 8;
  });

  const nebulaX = useTransform(springX, [0, 2000], ["-5%", "5%"]);
  const nebulaY = useTransform(springY, [0, 2000], ["-5%", "5%"]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
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
        bgcolor: '#02040a', // Even deeper black
        perspective: '1500px'
      }}
    >
      {/* Dynamic Nebula / Atmosphere */}
      <motion.div 
        className="absolute inset-[-10%] opacity-30"
        style={{
          x: nebulaX,
          y: nebulaY,
          background: `
            radial-gradient(circle at 20% 30%, ${theme.palette.primary.main}33 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, ${theme.palette.accent?.main || '#06b6d4'}22 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, #000 0%, transparent 100%)
          `,
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Floating Data Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <Particle key={i} i={i} />
        ))}
      </div>

      {/* 3D Perspective Plane */}
      <Box
        component={motion.div}
        sx={{
          position: 'absolute',
          bottom: '-60%',
          left: '-50%',
          width: '200%',
          height: '240%',
          opacity: 0.5,
          transformStyle: "preserve-3d",
          backgroundImage: `
            linear-gradient(to right, ${theme.palette.primary.main}22 1px, transparent 1px),
            linear-gradient(to bottom, ${theme.palette.primary.main}22 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, transparent 100%)",
        }}
        style={{
          rotateX,
          rotateY,
        }}
      >
        {/* Rapid Flowing Scan Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(139,92,246,0.1)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan" style={{ backgroundSize: '100% 200px' }} />
      </Box>
      
      {/* Laser pulses on the grid - created with small divs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div 
          className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{
            top: ["0%", "100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ position: 'absolute', left: 0 }}
        />
      </div>

      {/* Dynamic Cursor Light */}
      <Box
        component={motion.div}
        sx={{
          position: 'absolute',
          width: '1200px',
          height: '1200px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}20 0%, transparent 60%)`,
          filter: 'blur(120px)',
        }}
        style={{
          x: springX - 600,
          y: springY - 600,
        }}
      />
      
      {/* Top Atmosphere Falloff Enhancement */}
      <Box sx={{ 
        position: 'absolute', 
        inset: 0, 
        background: 'radial-gradient(circle at center, transparent 0%, #02040a 90%)',
        opacity: 0.7
      }} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          from { background-position: 0 0; }
          to { background-position: 0 100%; }
        }
        .animate-scan {
          animation: scan 15s linear infinite;
        }
      `}} />
    </Box>
  );
}
