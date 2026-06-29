// ============================================
// ProjectsSection
// Fetches projects from DB (seeded via npm run seed:projects)
// Falls back to hardcoded list only if DB is empty
// ============================================

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchAllProjects, setSelectedProject, clearSelectedProject } from '../../redux/slices/projectSlice';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import StackedProjects from '../projects/StackedProjects';
import ProjectModal from '../projects/ProjectModal';

// Hardcoded fallback — only used if database has zero projects
export const KARTIK_PROJECTS = [
  {
    _id: 'frhelp',
    title: 'FrHelp',
    description: 'Production-grade AI-powered EdTech & healthcare platform with JWT auth, OTP, role-based access, Razorpay payments, and Groq AI assistant.',
    longDesc: '## FrHelp\n\nFull-scale MERN app with JWT auth, role-based access, Razorpay, and Groq AI assistant.',
    category: 'MERN Stack',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Razorpay', 'Groq AI', 'JWT'],
    githubUrl: 'https://github.com/Kartiksahu03',
    liveUrl: '',
    featured: true,
  },
  {
    _id: 'shopping-cart',
    title: 'Ecomzy — Shopping Cart',
    description: 'Reusable MERN shopping cart SDK. Plug-and-play cart integration, modular pricing APIs, persistent Redux state.',
    longDesc: '## Ecomzy\n\nReusable shopping cart SDK with Redux Toolkit state management.',
    category: 'MERN Stack',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Kartiksahu03/Shopping-cart',
    liveUrl: '',
    featured: false,
  },
  {
    _id: 'devdetective',
    title: 'DevDetective — GitHub Finder',
    description: 'Real-time GitHub profile search using the GitHub REST API with dark/light mode.',
    longDesc: '## DevDetective\n\nGitHub profile finder using REST API.',
    category: 'Full Stack',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'GitHub REST API'],
    githubUrl: 'https://github.com/Kartiksahu03/github-profile-finder',
    liveUrl: '',
    featured: false,
  },
  {
    _id: 'random-gif',
    title: 'Random GIF Finder',
    description: 'React + Giphy API app for random GIF generation and tag-based search with custom hooks.',
    longDesc: '## Random GIF Finder\n\nReact app with Giphy API and custom hooks.',
    category: 'Full Stack',
    techStack: ['React', 'Giphy API', 'Custom Hooks', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Kartiksahu03/Random-gif-finder',
    liveUrl: '',
    featured: false,
  },
  {
    _id: 'react-auth',
    title: 'Auth System — Protected Routes',
    description: 'Complete React authentication with Login, Signup, JWT authorization, and protected routes.',
    longDesc: '## Auth System\n\nJWT auth with protected routes in React.',
    category: 'Full Stack',
    techStack: ['React', 'React Router', 'JWT', 'JavaScript'],
    githubUrl: 'https://github.com/Kartiksahu03/react-router',
    liveUrl: '',
    featured: false,
  },
  {
    _id: 'portfolio',
    title: 'This Portfolio',
    description: 'Full-stack MERN portfolio with admin dashboard, AI chatbot, resume analyzer, and ATS scorer.',
    longDesc: '## Portfolio\n\nFull MERN stack portfolio with Groq AI features.',
    category: 'MERN Stack',
    techStack: ['React', 'Node.js', 'MongoDB', 'Groq AI', 'Redux', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Kartiksahu03',
    liveUrl: '',
    featured: false,
  },
];

const ProjectsSection = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projects);
  const [selectedProject, setSelected] = useState(null);
  const [ref, isVisible] = useScrollReveal();

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  // Use DB projects if available, otherwise fall back to hardcoded
  const displayProjects = !loading && projects.length > 0
    ? projects.slice(0, 3)
    : KARTIK_PROJECTS.slice(0, 3);

  return (
    <section id="projects">
      <div ref={ref} className="text-center pt-24 pb-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-3">What I've shipped</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">My Work</h2>
          <p className="text-white/40 mt-3">
            {(projects.length > 0 ? projects.length : KARTIK_PROJECTS.length)} projects · Click any card for details
          </p>
        </motion.div>
      </div>

      <StackedProjects
        projects={displayProjects}
        onViewDetails={(p) => setSelected(p)}
      />

      <div className="text-center py-16 bg-bg">
        <Link
          to="/projects"
          className="inline-block px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:border-cyan-glow hover:text-cyan-glow transition-colors"
        >
          View All Projects →
        </Link>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelected(null)} />
    </section>
  );
};

export default ProjectsSection;
