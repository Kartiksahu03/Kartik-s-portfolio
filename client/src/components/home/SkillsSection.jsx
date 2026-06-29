// ============================================
// SkillsSection — Kartik's Real Skills with Progress Bars
// ============================================

import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// Kartik's real tech stack with honest proficiency levels
const SKILLS = [
  { _id: 's1', name: 'React.js', category: 'Frontend', level: 88 },
  { _id: 's2', name: 'Node.js + Express', category: 'Backend', level: 82 },
  { _id: 's3', name: 'MongoDB + Mongoose', category: 'Database', level: 80 },
  { _id: 's4', name: 'JavaScript (ES6+)', category: 'Language', level: 85 },
  { _id: 's5', name: 'Tailwind CSS', category: 'Frontend', level: 88 },
  { _id: 's6', name: 'Redux Toolkit', category: 'Frontend', level: 78 },
  { _id: 's7', name: 'REST API Design', category: 'Backend', level: 80 },
  { _id: 's8', name: 'JWT + Auth', category: 'Backend', level: 82 },
  { _id: 's9', name: 'React Router', category: 'Frontend', level: 85 },
  { _id: 's10', name: 'Git + GitHub', category: 'Tools', level: 80 },
  { _id: 's11', name: 'AI / LLM Integration', category: 'AI', level: 70 },
  { _id: 's12', name: 'Vercel + Render Deploy', category: 'DevOps', level: 75 },
];

const SkillsSection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-bg-card/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">What I work with</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">My Skills</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-4xl mx-auto">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-white font-medium">{skill.name}</span>
                <span className="text-cyan-glow text-sm">{skill.level}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-aurora-gradient rounded-full"
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: i * 0.06 + 0.2, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
