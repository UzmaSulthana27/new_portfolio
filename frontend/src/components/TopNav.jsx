import { motion } from "motion/react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button.jsx";
import { cn } from "@/lib/utils.js";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "glass border-b py-2" : "bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <span className="text-2xl font-bold tracking-tighter text-gradient cursor-pointer">
              UZMA.S
            </span>
          </motion.div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover="hover"
                  transition={{ 
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="relative text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer group flex flex-col items-center"
                >
                  <motion.span
                    variants={{
                      hover: { scale: 1.05 }
                    }}
                  >
                    {link.name}
                  </motion.span>
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full"
                    variants={{
                      initial: { width: 0 },
                      hover: { width: "100%" }
                    }}
                    initial="initial"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://github.com/UzmaSulthana27" 
              target="_blank" 
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "cursor-pointer")}
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/uzma-sulthana-s-176a21323/" 
              target="_blank" 
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "cursor-pointer")}
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" download>
              <Button variant="default" size="sm" className="rounded-full cursor-pointer px-6">
                Resume
              </Button>
            </a>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass border-b"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                whileHover={{ x: 10, color: "var(--primary)" }}
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground transition-all"
              >
                {link.name}
              </motion.a>
            ))}
            <div className="flex space-x-2 px-3 py-2">
              <a 
                href="https://github.com/UzmaSulthana27" 
                target="_blank" 
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/uzma-sulthana-s-176a21323/" 
                target="_blank" 
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
