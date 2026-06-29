// Testimonials / social proof section
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// TODO: Replace with real testimonials from professors/clients/peers
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Prof. [Your Professor Name]',
    role: 'Faculty, University of Mumbai',
    avatar: '👨‍🏫',
    text: 'Kartik consistently demonstrated exceptional problem-solving ability and a deep passion for software development. His projects go well beyond what is expected at the undergraduate level — particularly his AI-integrated MERN platform which showed real-world engineering maturity.',
  },
  {
    id: 2,
    name: 'Freelance Client',
    role: 'Business Owner',
    avatar: '💼',
    text: 'Kartik delivered the project on time and exceeded our expectations. The web application he built was clean, fast, and exactly what we needed. His communication throughout the project was professional and clear. Would definitely hire again.',
  },
  {
    id: 3,
    name: '[Hackathon Organizer / Peer]',
    role: 'Tech Community',
    avatar: '🏆',
    text: 'One of the most focused and driven developers I\'ve worked with. Kartik secured 2nd rank in our departmental coding challenge — not just for his technical skill but for his ability to think through problems methodically under pressure.',
  },
];

const TestimonialsSection = () => {
  const [ref, isVisible] = useScrollReveal();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <p className="section-label mb-3">Kind words</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">Testimonials</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative bg-bg-card border border-white/10 rounded-3xl p-8 md:p-12 shine">
          {/* Big quote icon */}
          <Quote size={48} className="text-cyan-glow/20 absolute top-6 left-6" />

          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="text-center"
            >
              <p className="text-white/70 text-lg md:text-xl leading-relaxed italic mb-8 relative z-10">
                "{t.text}"
              </p>

              <div className="flex items-center justify-center gap-4">
                <span className="text-4xl">{t.avatar}</span>
                <div className="text-left">
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-white/40 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-cyan-glow transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'bg-cyan-glow w-6' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-cyan-glow transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <p className="text-center text-white/25 text-xs mt-4">
          * Replace placeholder names with real testimonials in <code>TestimonialsSection.jsx</code>
        </p>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
