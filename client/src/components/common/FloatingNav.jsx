// Floating section dots on the right side — shows which section you're on
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const FloatingNav = () => {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
            setActive(sec.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
      {SECTIONS.map((sec) => (
        <motion.button
          key={sec.id}
          onClick={() => scrollTo(sec.id)}
          className="group relative flex items-center gap-2 justify-end"
          whileHover={{ scale: 1.2 }}
        >
          {/* Label tooltip */}
          <span className="absolute right-6 bg-bg-card border border-white/10 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {sec.label}
          </span>
          {/* Dot */}
          <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            active === sec.id
              ? 'bg-cyan-glow shadow-[0_0_8px_rgba(34,211,238,0.8)] scale-125'
              : 'bg-white/20 hover:bg-white/50'
          }`} />
        </motion.button>
      ))}
    </div>
  );
};

export default FloatingNav;
