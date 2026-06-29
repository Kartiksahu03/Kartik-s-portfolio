import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const BASE_STATS = [
  { label: 'Projects Built', value: 6 },
  { label: 'Technologies Used', value: 12 },
  { label: 'GitHub Commits', value: 200 },
  { label: 'Cups of Coffee', value: 500 },
];

const Counter = ({ target, isVisible }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let current = 0;
    const steps = 40;
    const inc = target / steps;
    const interval = setInterval(() => {
      current += inc;
      if (current >= target) { setCount(target); clearInterval(interval); }
      else setCount(Math.floor(current));
    }, 1500 / steps);
    return () => clearInterval(interval);
  }, [isVisible, target]);
  return <span>{count.toLocaleString()}+</span>;
};

const StatsSection = () => {
  const [ref, isVisible] = useScrollReveal();
  const [stats, setStats] = useState(BASE_STATS);

  useEffect(() => {
    // Try to fetch real GitHub data
    fetch('https://api.github.com/users/Kartiksahu03')
      .then(r => r.json())
      .then(data => {
        setStats([
          { label: 'Projects Built', value: 6 },
          { label: 'GitHub Repos', value: data.public_repos || 6 },
          { label: 'Technologies Used', value: 12 },
          { label: 'Cups of Coffee', value: 500 },
        ]);
      })
      .catch(() => {}); // silently fail, use defaults
  }, []);

  return (
    <section className="py-20 px-6 md:px-12 bg-bg-card/30 relative overflow-hidden" ref={ref}>
      {/* Decorative background number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[200px] font-black text-white/[0.02] select-none">KS</span>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center group"
          >
            <p className="text-4xl md:text-5xl font-extrabold gradient-text mb-2 group-hover:scale-110 transition-transform">
              <Counter target={stat.value} isVisible={isVisible}/>
            </p>
            <p className="text-white/50 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
