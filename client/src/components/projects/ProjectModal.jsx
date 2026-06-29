// ============================================
// ProjectModal Component
// Detail popup shown when a project card is clicked — shows the longDesc markdown
// ============================================

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import TechBadge from './TechBadge';

const ProjectModal = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-bg-card border border-white/10 rounded-3xl p-8"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <p className="text-cyan-glow text-sm font-medium mb-2">{project.category}</p>
            <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>

            {project.thumbnail && (
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-56 object-cover rounded-xl mb-6 border border-white/10"
              />
            )}

            <div className="prose prose-invert prose-sm max-w-none text-white/70 mb-6">
              <ReactMarkdown>{project.longDesc || project.description}</ReactMarkdown>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack?.map((tech) => (
                <TechBadge key={tech} label={tech} />
              ))}
            </div>

            <div className="flex gap-4">
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
