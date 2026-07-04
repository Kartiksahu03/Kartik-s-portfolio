// ============================================
// Resume Page — Kartik Sahu
// ============================================

import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Download, Github, ExternalLink, AlertCircle } from 'lucide-react';
import { useVisitorCount } from '../hooks/useVisitorCount';
import ResumeAnalyzer from '../components/ai/ResumeAnalyzer';

const Resume = () => {
  useVisitorCount('/resume');

  // Check if running locally — resume PDF must be placed in /public/resume.pdf
  const resumePath = '/resume.pdf';

  return (
    <>
      <Helmet>
        <title>Resume | Kartik Sahu — Full Stack Developer</title>
      </Helmet>

      <section className="pt-32 pb-10 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">Take a look</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">My Resume</h1>
          <p className="text-white/50 max-w-xl mx-auto mb-8">
            B.Tech graduate in Electronics Engineering with hands-on full-stack development
            experience. Download my resume or use the AI tools below.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a
              href={resumePath}
              download="Kartik_Sahu_Resume.pdf"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-aurora-gradient text-bg font-semibold hover:scale-105 transition-transform"
              onClick={(e) => {
                // Verify file exists before triggering download
                fetch(resumePath).then(r => {
                  if (!r.ok) {
                    e.preventDefault();
                    alert('Resume PDF not found. Please add your resume.pdf to the /public folder.');
                  }
                }).catch(() => {
                  e.preventDefault();
                  alert('Resume PDF not found. Please add your resume.pdf to the /public folder.');
                });
              }}
            >
              <Download size={18} /> Download Resume (PDF)
            </a>
            <a
              href="https://github.com/Kartiksahu03"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:border-cyan-glow hover:text-cyan-glow transition-colors"
            >
              <Github size={18} /> GitHub Profile
            </a>
          </div>

          {/* Setup notice */}
          {/* <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 max-w-xl mx-auto mb-8 flex items-start gap-3 text-left">
            <AlertCircle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-300 text-sm font-medium">To enable resume download:</p>
              <p className="text-white/50 text-xs mt-1">
                Copy your <strong>Kartik_Sahu_Resume.pdf</strong> into{' '}
                <code className="bg-white/10 px-1 rounded">client/public/resume.pdf</code>
                {' '}and it will appear here automatically.
              </p>
            </div>
          </div> */}

          {/* Quick skills summary */}
          <div className="bg-bg-card border border-white/10 rounded-2xl p-6 text-left max-w-2xl mx-auto">
            <p className="text-cyan-glow text-sm font-semibold mb-3">Quick Summary for Recruiters</p>
            <ul className="space-y-1.5 text-white/60 text-sm">
              <li>✅ Full Stack MERN Developer (React · Node.js · Express · MongoDB)</li>
              <li>✅ JWT Auth, OTP Verification, Role-Based Access Control</li>
              <li>✅ Redux Toolkit, REST APIs, Tailwind CSS</li>
              <li>✅ AI & LLM Integration — Groq API in production apps</li>
              <li>✅ Razorpay payment integration</li>
              <li>✅ 6 real GitHub projects + freelance client work</li>
              <li>✅ Deployed on Vercel & Render — ~99% uptime during testing</li>
              <li>✅ Open to Full Stack / React / Node.js roles and internships</li>
            </ul>
          </div>
        </motion.div>
      </section>

      <ResumeAnalyzer />
    </>
  );
};

export default Resume;
