// ============================================
// ProjectCard Component
// Full-width immersive project card used in ProjectsSection
// Each project gets its own large colorful slide with a hover glow effect
// ============================================

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

// A small rotating set of background gradients so each card feels distinct,
// the same way the reference site colors each project slide differently
const CARD_GRADIENTS = [
  'from-violet-glow/30 via-bg-card to-bg-card',
  'from-cyan-glow/30 via-bg-card to-bg-card',
  'from-fuchsia-500/20 via-bg-card to-bg-card',
  'from-emerald-500/20 via-bg-card to-bg-card',
];

const ProjectCard = ({ project, index, onViewDetails }) => {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`group relative w-full min-h-[70vh] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br ${gradient} mb-10 p-8 md:p-14 flex flex-col justify-between hover:border-cyan-glow/50 hover:shadow-glow-soft transition-all duration-500 cursor-pointer`}
      onClick={() => onViewDetails && onViewDetails(project)}
    >
      {/* Featured badge */}
      {project.featured && (
        <span className="absolute top-6 right-6 z-10 px-3 py-1 rounded-full bg-aurora-gradient text-bg text-xs font-bold">
          Featured
        </span>
      )}

      <div className="pt-6">
        <p className="text-cyan-glow text-sm font-medium tracking-wide mb-3">
          {project.category}
        </p>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4 group-hover:gradient-text transition-all duration-500">
          {project.title}
        </h3>
        <p className="text-white/60 text-lg max-w-2xl">{project.description}</p>
      </div>

      <div className="mt-10">
        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack?.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-aurora-gradient text-bg text-sm font-semibold hover:scale-105 transition-transform"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              <Github size={16} /> Source Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
