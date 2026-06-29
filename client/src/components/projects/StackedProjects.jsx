// ============================================
// StackedProjects Component
// Clean scroll-reveal cards — removed GSAP pin stacking which caused
// laggy transparency/performance issues. Now uses a smooth staggered
// reveal as you scroll, one project per full-width section.
// ============================================

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const CARD_COLORS = [
  { bg: 'bg-[#0d1b2e]', border: 'border-blue-500/30', accent: 'text-cyan-400', glow: 'hover:shadow-[0_0_60px_rgba(34,211,238,0.15)]' },
  { bg: 'bg-[#1a0d2e]', border: 'border-violet-500/30', accent: 'text-violet-400', glow: 'hover:shadow-[0_0_60px_rgba(139,92,246,0.15)]' },
  { bg: 'bg-[#0d2e1a]', border: 'border-emerald-500/30', accent: 'text-emerald-400', glow: 'hover:shadow-[0_0_60px_rgba(52,211,153,0.15)]' },
  { bg: 'bg-[#2e1a0d]', border: 'border-orange-500/30', accent: 'text-orange-400', glow: 'hover:shadow-[0_0_60px_rgba(251,146,60,0.15)]' },
  { bg: 'bg-[#2e0d1a]', border: 'border-rose-500/30', accent: 'text-rose-400', glow: 'hover:shadow-[0_0_60px_rgba(251,113,133,0.15)]' },
  { bg: 'bg-[#0d2e2a]', border: 'border-teal-500/30', accent: 'text-teal-400', glow: 'hover:shadow-[0_0_60px_rgba(45,212,191,0.15)]' },
];

const ProjectSlide = ({ project, index, onViewDetails }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const colors = CARD_COLORS[index % CARD_COLORS.length];
  const viewUrl = project.liveUrl || project.githubUrl;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`w-full min-h-[85vh] flex items-center border-b border-white/5 ${colors.bg}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 w-full">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${isEven ? '' : 'md:grid-flow-dense'}`}>

          {/* Text content */}
          <div className={isEven ? '' : 'md:col-start-2'}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-semibold tracking-widest uppercase ${colors.accent}`}>
                {String(index + 1).padStart(2, '0')} — {project.category}
              </span>
              {project.featured && (
                <span className="px-2 py-0.5 rounded-full bg-aurora-gradient text-bg text-[10px] font-bold">
                  Featured
                </span>
              )}
            </div>

            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              {project.title}
            </h3>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6 max-w-lg">
              {project.description}
            </p>

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack?.map((tech) => (
                <span key={tech} className={`px-3 py-1 rounded-full border ${colors.border} text-white/70 text-xs bg-white/5`}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              {viewUrl && (
                <a
                  href={viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-aurora-gradient text-bg text-sm font-semibold hover:scale-105 transition-transform"
                >
                  {project.liveUrl ? <><ExternalLink size={15} /> View Live</> : <><Github size={15} /> GitHub</>}
                </a>
              )}
              {project.liveUrl && project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/5 transition-colors"
                >
                  <Github size={15} /> Source
                </a>
              )}
              <button
                onClick={() => onViewDetails && onViewDetails(project)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border ${colors.border} ${colors.accent} text-sm font-semibold hover:bg-white/5 transition-colors`}
              >
                Details
              </button>
            </div>
          </div>

          {/* Visual card */}
          <div className={`${isEven ? '' : 'md:col-start-1 md:row-start-1'} flex justify-center`}>
            <div
              className={`w-full max-w-md aspect-video rounded-2xl border ${colors.border} ${colors.bg} ${colors.glow} transition-all duration-500 cursor-pointer flex flex-col items-center justify-center gap-4 p-8 relative overflow-hidden`}
              onClick={() => onViewDetails && onViewDetails(project)}
            >
              {/* Decorative gradient blob */}
              <div className={`absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-transparent to-current`} />
              <span className={`text-6xl font-black ${colors.accent} opacity-20 absolute top-4 right-6 select-none`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-5xl relative z-10">
                {['🚀', '🛒', '🔍', '🎬', '🔐', '🌐'][index % 6]}
              </span>
              <p className={`text-sm font-semibold ${colors.accent} relative z-10 text-center`}>
                {project.title}
              </p>
              <p className="text-white/40 text-xs text-center relative z-10">
                Click to view details
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StackedProjects = ({ projects, onViewDetails }) => {
  if (!projects || projects.length === 0) return null;

  return (
    <div>
      {projects.map((project, i) => (
        <ProjectSlide
          key={project._id}
          project={project}
          index={i}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default StackedProjects;
