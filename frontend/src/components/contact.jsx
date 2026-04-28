import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button.jsx";
import { Card, CardContent } from "./ui/card.jsx";
import { Github, Linkedin, Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Signal, Wifi, Radio } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "ID Required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Uplink Address Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid Protocol";
    }
    
    if (!formData.subject.trim()) newErrors.subject = "Subject Required";
    
    if (!formData.message.trim()) {
      newErrors.message = "Payload Required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Insufficient Data";
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      }, 1500);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#020308]">
      {/* HUD Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Side: Uplink Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 flex flex-col justify-center space-y-12"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
                   <Radio className="w-3 h-3 text-primary animate-pulse" />
                   <span className="text-[10px] font-mono text-primary uppercase tracking-[0.2em]">Live_Uplink_Signal</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none">
                  INITIATE <br />
                  <span className="text-gradient">CONTACT_</span>
                </h2>
                <p className="text-muted-foreground text-sm max-w-sm leading-relaxed font-light">
                  Seeking high-frequency collaborations. My neural link is currently active for new 
                  full-stack deployment opportunities.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { id: 'CHANNEL_01', label: 'Email', val: 'uzmasulthana2725@gmail.com', icon: Mail },
                  { id: 'CHANNEL_02', label: 'Signal', val: '+91 8548929280', icon: Radio },
                  { id: 'NETWORK_CORE', label: 'Connect', val: 'LinkedIn / GitHub', icon: Wifi }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="p-4 rounded-xl bg-black/40 border border-white/5 backdrop-blur-xl relative overflow-hidden group border-l-2 border-l-primary/40 text-left w-full"
                  >
                    <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                         <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="text-[10px] font-mono text-primary/60 uppercase tracking-widest leading-none mb-1">{item.id}</p>
                         <p className="text-sm font-medium text-white/90">{item.val}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Status Indicator */}
              <div className="pt-8 flex items-center gap-6">
                 <div className="flex flex-col">
                   <span className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Link_Status</span>
                   <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-1 h-3 rounded-full ${i < 4 ? 'bg-primary' : 'bg-white/10'}`} />
                      ))}
                   </div>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-mono text-muted-foreground uppercase mb-1">Response_Time</span>
                   <span className="text-xs font-bold text-white tracking-widest">&lt; 24.00 SEC</span>
                 </div>
              </div>
            </motion.div>

            {/* Right Side: Deployment Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <Card className="bg-black/60 border-white/5 backdrop-blur-3xl h-full relative overflow-hidden shadow-2xl">
                {/* HUD Overlay Lines */}
                <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-primary/20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-primary/20 pointer-events-none" />
                
                <CardContent className="p-8 md:p-12 h-full">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                      >
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary relative">
                           <CheckCircle2 className="w-10 h-10" />
                           <motion.div 
                              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="absolute inset-0 rounded-full border-2 border-primary"
                           />
                        </div>
                        <div className="space-y-2">
                           <h3 className="text-3xl font-black tracking-tighter uppercase">Payload_Delivered</h3>
                           <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                             Neural transmission successful. Response protocol initiated.
                           </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form 
                        key="form"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6" 
                        onSubmit={handleSubmit}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2 group">
                            <label className="text-[10px] font-mono text-primary/60 uppercase tracking-widest ml-1">IDENTIFIER_</label>
                            <div className="relative">
                              <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="NODE_NAME"
                                className="w-full bg-[#0a0a0f] border border-white/5 rounded-lg px-4 py-3 text-sm focus:border-primary/50 focus:bg-primary/5 outline-none transition-all placeholder:text-white/10"
                              />
                              {errors.name && <p className="text-[10px] text-primary/80 font-mono mt-1 ml-1">&gt; ERROR: {errors.name}</p>}
                            </div>
                          </div>
                          <div className="space-y-2 group">
                            <label className="text-[10px] font-mono text-primary/60 uppercase tracking-widest ml-1">PROTOCOL_ADDR_</label>
                            <div className="relative">
                              <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="USER@DOMAIN.SYS"
                                className="w-full bg-[#0a0a0f] border border-white/5 rounded-lg px-4 py-3 text-sm focus:border-primary/50 focus:bg-primary/5 outline-none transition-all placeholder:text-white/10"
                              />
                              {errors.email && <p className="text-[10px] text-primary/80 font-mono mt-1 ml-1">&gt; ERROR: {errors.email}</p>}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 group">
                          <label className="text-[10px] font-mono text-primary/60 uppercase tracking-widest ml-1">SUBJECT_HEADER_</label>
                          <input 
                            type="text" 
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="TRANSMISSION_TOPIC"
                            className="w-full bg-[#0a0a0f] border border-white/5 rounded-lg px-4 py-3 text-sm focus:border-primary/50 focus:bg-primary/5 outline-none transition-all placeholder:text-white/10"
                          />
                          {errors.subject && <p className="text-[10px] text-primary/80 font-mono mt-1 ml-1">&gt; ERROR: {errors.subject}</p>}
                        </div>

                        <div className="space-y-2 group">
                          <label className="text-[10px] font-mono text-primary/60 uppercase tracking-widest ml-1">PAYLOAD_DATA_</label>
                          <textarea 
                            rows={5}
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="ENTER_MESSAGE_STREAM..."
                            className="w-full bg-[#0a0a0f] border border-white/5 rounded-lg px-4 py-3 text-sm focus:border-primary/50 focus:bg-primary/5 outline-none transition-all resize-none placeholder:text-white/10"
                          />
                          {errors.message && <p className="text-[10px] text-primary/80 font-mono mt-1 ml-1">&gt; ERROR: {errors.message}</p>}
                        </div>

                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-14 rounded-lg bg-primary hover:bg-primary/90 text-white font-black tracking-[0.2em] transform transition-transform active:scale-95 shadow-[0_0_20px_rgba(139,92,246,0.3)] relative overflow-hidden group"
                        >
                          <span className={`${isSubmitting ? "opacity-0" : "flex items-center justify-center gap-2"}`}>
                             {isSubmitting ? "UPLOADING..." : "EXECUTE_TRANSMISSION"}
                             <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </span>
                          
                          {/* Button Scan Line */}
                          <motion.div 
                            className="absolute inset-y-0 w-20 bg-white/20 skew-x-[30deg] -translate-x-[200%]"
                            animate={{ x: ['100%', '300%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                        </Button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
