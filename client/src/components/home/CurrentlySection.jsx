// "Currently" section — open to work badge, learning, fun facts
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Zap, BookOpen, Coffee, Music, MapPin } from 'lucide-react';

const FUN_FACTS = [
  { icon: Coffee, text: '500+ cups of coffee consumed while coding' },
  { icon: Music, text: 'Codes best with lo-fi beats in the background' },
  { icon: MapPin, text: 'Based in India, open to remote roles worldwide' },
  { icon: Zap, text: 'Can go from idea to deployed app in a weekend' },
];

const LEARNING = [
  { name: 'TypeScript', progress: 40, color: 'bg-blue-500' },
  { name: 'Docker', progress: 30, color: 'bg-cyan-500' },
  { name: 'AWS', progress: 20, color: 'bg-yellow-500' },
  { name: 'Next.js', progress: 55, color: 'bg-white' },
];

const CurrentlySection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        {/* Open to Work banner */}
        <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-transparent border border-emerald-500/30 rounded-2xl p-5 mb-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 open-pulse flex-shrink-0" />
            <div>
              <p className="text-emerald-400 font-bold text-lg">Open to Work</p>
              <p className="text-white/60 text-sm">Actively looking for Full Stack / React / Node.js roles & internships in India or remote</p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-5 py-2 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-400 transition-colors flex-shrink-0"
          >
            Hire Me →
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Currently Learning */}
          <div className="bg-bg-card border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen size={20} className="text-cyan-glow" />
              <h3 className="text-white font-bold text-lg">Currently Learning</h3>
            </div>
            <div className="space-y-4">
              {LEARNING.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex justify-between mb-1.5">
                    <span className="text-white/80 text-sm">{item.name}</span>
                    <span className="text-white/40 text-xs">{item.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${item.color} rounded-full opacity-80`}
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: `${item.progress}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fun Facts */}
          <div className="bg-bg-card border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Zap size={20} className="text-violet-glow" />
              <h3 className="text-white font-bold text-lg">Fun Facts</h3>
            </div>
            <div className="space-y-3">
              {FUN_FACTS.map((fact, i) => {
                const Icon = fact.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <Icon size={16} className="text-cyan-glow flex-shrink-0 mt-0.5" />
                    <p className="text-white/60 text-sm">{fact.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CurrentlySection;
