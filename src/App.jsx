import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, ArrowUpRight, Zap } from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 py-4 ${isScrolled ? 'bg-accent/95 backdrop-blur-sm py-3' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#hero" className="relative z-50 group">
           <span className={`font-display text-3xl font-black uppercase tracking-wider transition-colors duration-300 ${isScrolled ? 'text-primary' : 'text-accent'}`}>
            Pixel<span className={isScrolled ? 'text-white' : 'text-accent'}>&</span>Co
           </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`font-body font-medium text-sm uppercase tracking-widest hover:text-primary transition-colors duration-300 relative group ${isScrolled ? 'text-white' : 'text-accent'}`}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-primary text-accent font-bold px-6 py-2 rounded-none uppercase tracking-wide hover:scale-105 hover:bg-[#FFCB00] active:scale-95 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-50 text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} className="text-white" /> : <Menu size={32} className={isScrolled ? 'text-white' : 'text-accent'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-accent z-40 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-4xl text-white hover:text-primary transition-colors uppercase"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-50 pt-20">
      {/* Animated Background Gradients */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/30 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360, scale: [1, 1.3, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          style={{ y: y1 }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left"
        >
          <h1 className="font-display font-black text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.9] tracking-tight text-accent mb-6">
            IGNITE YOUR <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">BRAND</span> WITH <br/>
            BOLD DIGITAL MAGIC
          </h1>
          <p className="font-body text-lg md:text-xl text-neutral-600 max-w-xl mb-10 leading-relaxed font-medium">
            We craft immersive web experiences, striking branding, and motion graphics that propel tech startups and e-commerce brands into the spotlight. Authentic, animated, and unapologetically premium.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-accent font-bold px-8 py-4 rounded-none uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Launch Your Vision Now
            </motion.a>
          </div>
        </motion.div>

        <motion.div 
          style={{ y: y2 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square">
            <div className="absolute inset-0 bg-accent transform rotate-3 translate-x-4 translate-y-4 rounded-xl"></div>
            <img 
              src="https://source.unsplash.com/800x800/?abstract,digital,3d,geometric,yellow" 
              alt="Abstract Creative Visual" 
              className="relative w-full h-full object-cover rounded-xl shadow-2xl border-4 border-white"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <section id="about" className="py-32 bg-accent text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-900 skew-x-12 translate-x-32"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <img 
              src="https://source.unsplash.com/800x1000/?team,creative,meeting,workspace,black-and-white" 
              alt="Pixel & Co Team"
              className="w-full h-auto rounded-lg grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border-2 border-neutral-700"
            />
          </motion.div>

          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-black text-[clamp(2.5rem,5vw,4rem)] mb-8 tracking-tight"
            >
              DIGITAL REBELS <span className="text-primary">WITH A CAUSE</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-body text-lg text-neutral-300 mb-12 leading-relaxed"
            >
              Pixel & Co was born from the chaos of innovation, where forward-thinking founders demanded more than static sites—they craved dynamic worlds that pulse with energy. We're a crew of digital rebels blending minimalism with bold animations to deliver experiences that captivate and convert. For tech startups and e-commerce trailblazers aged 25-40, we turn bold ideas into premium realities that stand out in a crowded digital arena.
            </motion.p>

            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { title: "Authenticity First", desc: "We strip away the fluff for genuine stories that resonate." },
                { title: "Bold Innovation", desc: "Pushing boundaries with motion graphics and immersive tech." },
                { title: "Premium Craftsmanship", desc: "Every pixel polished to elevate your dynamic presence." }
              ].map((val, idx) => (
                <motion.div key={idx} variants={item} className="flex items-start gap-4 p-4 border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-800 transition-colors rounded-lg">
                  <Zap className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-bold text-xl mb-1">{val.title}</h3>
                    <p className="font-body text-neutral-400 text-sm">{val.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Bold Branding",
      desc: "Forge an identity that's magnetic and memorable, infused with authentic vibes and premium edge.",
      benefits: ["Stand out with bold aesthetics", "Build trust through storytelling", "Boost recognition & loyalty"],
      img: "https://source.unsplash.com/600x400/?branding,design,sketch,typography",
      cta: "Claim Your Brand Power"
    },
    {
      title: "Immersive Web Design",
      desc: "Design dynamic sites that blend minimalism with subtle animations, creating seamless experiences.",
      benefits: ["Enhance engagement", "Optimize for conversions", "Scale effortlessly"],
      img: "https://source.unsplash.com/600x400/?coding,laptop,interface,web",
      cta: "Design Your Digital Empire"
    },
    {
      title: "Motion Graphics Mastery",
      desc: "Bring your vision to life with energetic animations that add depth and excitement.",
      benefits: ["Captivate audiences with motion", "Elevate brand perception", "Drive action with innovation"],
      img: "https://source.unsplash.com/600x400/?motion,neon,abstract,fluid",
      cta: "Animate Your Edge"
    }
  ];

  return (
    <section id="services" className="py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display font-black text-[clamp(3rem,6vw,5rem)] uppercase tracking-tighter text-accent">
            Our <span className="underline decoration-primary decoration-8 underline-offset-8">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white border border-neutral-200 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col"
            >
              <div className="h-48 mb-6 overflow-hidden rounded-lg">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="font-display font-bold text-2xl mb-4 text-accent">{service.title}</h3>
              <p className="font-body text-neutral-600 mb-6 flex-grow">{service.desc}</p>
              
              <ul className="space-y-2 mb-8">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-neutral-500">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    {benefit}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 border-2 border-accent text-accent font-bold uppercase tracking-wide hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-primary group-hover:border-primary group-hover:text-accent">
                {service.cta} <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    {
      name: "TechForge",
      desc: "Sleek e-commerce site with animated product flows.",
      img: "https://source.unsplash.com/800x600/?ecommerce,tech,shopping,device",
      tag: "E-Commerce"
    },
    {
      name: "NovaStart",
      desc: "Bold branding overhaul for a fintech startup.",
      img: "https://source.unsplash.com/800x600/?fintech,finance,app,money",
      tag: "Branding"
    },
    {
      name: "VibeCart",
      desc: "Minimalist web design with premium animations.",
      img: "https://source.unsplash.com/800x600/?fashion,apparel,style,clothing",
      tag: "Web Design"
    },
    {
      name: "PulseAI",
      desc: "Motion graphics campaign that turned static demos into experiences.",
      img: "https://source.unsplash.com/800x600/?ai,technology,data,futuristic",
      tag: "Motion"
    }
  ];

  return (
    <section id="portfolio" className="py-32 bg-accent text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-black text-[clamp(3rem,6vw,5rem)] uppercase tracking-tighter leading-none mb-4">
              Our Bold <br/> <span className="text-primary">Creations</span>
            </h2>
            <p className="font-body text-neutral-400 max-w-lg">
              Dive into a showcase of premium projects where we've fused motion graphics, immersive design, and authentic branding.
            </p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="hidden md:flex items-center gap-2 border-b border-primary text-primary pb-1 font-bold uppercase tracking-widest hover:text-white hover:border-white transition-colors"
          >
            View All Projects <ArrowRight size={18} />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img 
                  src={project.img} 
                  alt={project.name} 
                  className="w-full h-[400px] object-cover transform group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
                  {project.tag}
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display font-bold text-3xl mb-2 group-hover:text-primary transition-colors">{project.name}</h3>
                  <p className="font-body text-neutral-400">{project.desc}</p>
                </div>
                <div className="p-2 rounded-full border border-neutral-700 group-hover:bg-primary group-hover:text-accent group-hover:border-primary transition-all">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-display font-black text-accent text-[clamp(2.5rem,7vw,5rem)] leading-none mb-8 uppercase"
        >
          Ready to Electrify <br/> Your Brand?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-xl font-medium text-accent/80 mb-12 max-w-2xl mx-auto"
        >
          Let's collaborate on something bold and premium. Share your vision, and we'll craft the immersive digital strategy your innovative startup deserves.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
           <button className="bg-accent text-white font-black text-xl px-12 py-5 rounded-none uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(255,255,255,0.5)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95 transition-all duration-300">
            Spark the Conversation Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-neutral-900 text-white py-12 border-t border-neutral-800">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-6 md:mb-0">
        <span className="font-display text-2xl font-bold uppercase tracking-wider">
          Pixel<span className="text-primary">&</span>Co
        </span>
        <p className="text-neutral-500 text-sm mt-2">© 2024 Pixel & Co. All Rights Reserved.</p>
      </div>
      <div className="flex gap-6">
        {['Instagram', 'Twitter', 'LinkedIn', 'Dribbble'].map((social) => (
          <a key={social} href="#" className="text-neutral-400 hover:text-primary transition-colors text-sm uppercase tracking-wide font-medium">
            {social}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="font-body bg-neutral-50 selection:bg-primary selection:text-accent">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;