// ============================================
// AboutSection Component — Kartik Sahu
// ============================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const AboutSection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="section-label mb-3">Who I am</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">About Me</h2>

        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-2">
            <p className="text-white/60 text-lg leading-relaxed mb-5">
              I'm <span className="text-white font-semibold">Kartik Sahu</span>, a B.Tech
              graduate passionate about building full-stack web applications that make a real
              impact. My core focus is the <span className="text-cyan-glow font-medium">MERN stack</span> — React on the
              front, Node and Express on the back, MongoDB for storage — and I love integrating
              AI and LLMs to make products genuinely smarter.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              I've built 5+ projects end-to-end, including a full-scale healthcare and
              edtech platform (FrHelp) with JWT authentication, OTP verification, role-based
              access control, and AI integration. I've also taken on freelance work, delivering
              real client solutions independently. I'm actively looking for my first full-time
              role or internship as a{' '}
              <span className="text-cyan-glow font-medium">Full Stack Developer</span> where
              I can build fast, ship often, and keep learning.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-aurora-gradient text-bg font-semibold hover:scale-105 transition-transform"
              >
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:border-cyan-glow hover:text-cyan-glow transition-colors"
              >
                <Mail size={18} /> Get In Touch
              </a>
            </div>
          </div>

          <div className="bg-bg-card border border-white/10 rounded-2xl p-6 space-y-5">
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Education</p>
              <p className="text-white font-medium">B.Tech — Electronics & Telecom</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Specialisation</p>
              <p className="text-white font-medium">Full Stack MERN + AI Integration</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Experience</p>
              <p className="text-white font-medium">Freelance + 5 Shipped Projects</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Currently</p>
              <p className="text-cyan-glow font-medium">Open to Jobs & Internships ✅</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
