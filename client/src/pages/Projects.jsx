// ============================================
// Projects Page — fetches from DB, falls back to hardcoded
// ============================================

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useVisitorCount } from '../hooks/useVisitorCount';
import { PROJECT_CATEGORIES } from '../utils/constants';
import { fetchAllProjects } from '../redux/slices/projectSlice';
import { KARTIK_PROJECTS } from '../components/home/ProjectsSection';
import StackedProjects from '../components/projects/StackedProjects';
import ProjectModal from '../components/projects/ProjectModal';
import Loader from '../components/common/Loader';

const Projects = () => {
  useVisitorCount('/projects');
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projects);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelected] = useState(null);

  useEffect(() => {
    dispatch(fetchAllProjects(activeCategory));
  }, [dispatch, activeCategory]);

  // Use DB projects if available, otherwise fall back to hardcoded
  const allProjects = !loading && projects.length > 0 ? projects : KARTIK_PROJECTS;

  const displayProjects = activeCategory === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Projects | Kartik Sahu</title>
      </Helmet>

      <div className="pt-32 pb-10 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="section-label mb-3">Everything I've built</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">All Projects</h1>
          <p className="text-white/40 mt-3">
            {allProjects.length} projects — click any card for details + GitHub link
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-aurora-gradient text-bg'
                  : 'bg-bg-card border border-white/10 text-white/60 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : displayProjects.length === 0 ? (
        <p className="text-center text-white/40 py-20">No projects in this category.</p>
      ) : (
        <StackedProjects
          projects={displayProjects}
          onViewDetails={(p) => setSelected(p)}
        />
      )}

      <ProjectModal project={selectedProject} onClose={() => setSelected(null)} />
    </>
  );
};

export default Projects;
