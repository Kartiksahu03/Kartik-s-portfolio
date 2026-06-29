import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Youtube, ArrowRight, Download } from 'lucide-react';
import { useTypewriter } from '../../hooks/useTypewriter';
import { SOCIAL_LINKS } from '../../utils/constants';

const ROLES = ['Full Stack Developer', 'MERN Stack Developer', 'React Developer', 'Open to Jobs & Internships'];

const DevAvatar = () => (
  <svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ maxHeight: '520px' }}>
    <defs>
      <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9"/>
      </linearGradient>
      <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0f1117"/>
        <stop offset="100%" stopColor="#1e2230"/>
      </linearGradient>
      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3"/>
      </linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <ellipse cx="200" cy="350" rx="160" ry="30" fill="url(#glowGrad)">
      <animate attributeName="ry" values="25;35;25" dur="4s" repeatCount="indefinite"/>
    </ellipse>
    <path d="M90 480 L90 300 Q90 260 130 250 L165 240 Q200 280 235 240 L270 250 Q310 260 310 300 L310 480 Z" fill="url(#bodyGrad)" opacity="0.95"/>
    <rect x="160" y="360" width="80" height="60" rx="8" fill="#0f1117" opacity="0.4"/>
    <path d="M90 300 Q60 330 55 380 L80 385 Q85 345 110 320 Z" fill="url(#bodyGrad)" opacity="0.9"/>
    <path d="M310 300 Q340 330 345 380 L320 385 Q315 345 290 320 Z" fill="url(#bodyGrad)" opacity="0.9"/>
    <circle cx="200" cy="110" r="82" fill="url(#bodyGrad)" opacity="0.15"/>
    <circle cx="200" cy="110" r="75" fill="#f0c5a0"/>
    <path d="M130 80 Q140 30 200 28 Q260 30 270 80 Q250 55 200 58 Q150 55 130 80 Z" fill="#2d1a06"/>
    <path d="M128 90 Q120 70 130 55 Q145 38 200 35 Q255 38 270 55 Q280 70 272 90 Q265 65 200 63 Q135 65 128 90 Z" fill="#3d2409"/>
    <ellipse cx="178" cy="105" rx="10" ry="11" fill="#1a0a00"/>
    <ellipse cx="222" cy="105" rx="10" ry="11" fill="#1a0a00"/>
    <circle cx="181" cy="103" r="3" fill="white"/>
    <circle cx="225" cy="103" r="3" fill="white"/>
    <path d="M166 90 Q178 84 190 88" stroke="#2d1a06" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <path d="M210 88 Q222 84 234 90" stroke="#2d1a06" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <path d="M198 115 Q200 122 202 115" stroke="#c8956a" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M182 135 Q200 148 218 135" stroke="#b07040" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M175 185 Q200 200 225 185 L230 210 Q200 230 170 210 Z" fill="url(#bodyGrad)" opacity="0.95"/>
    <rect x="55" y="385" width="290" height="12" rx="6" fill="#374151"/>
    <rect x="70" y="330" width="260" height="58" rx="8" fill="#1f2937"/>
    {[0,1,2,3,4,5,6,7,8,9].map(i => <rect key={i} x={80 + i*24} y="345" width="18" height="10" rx="2" fill="#374151"/>)}
    {[0,1,2,3,4,5,6,7,8].map(i => <rect key={`k${i}`} x={88 + i*24} y="362" width="18" height="10" rx="2" fill="#374151"/>)}
    <rect x="70" y="220" width="260" height="115" rx="10" fill="#111827"/>
    <rect x="76" y="226" width="248" height="103" rx="6" fill="url(#screenGrad)"/>
    <text x="88" y="248" fontFamily="monospace" fontSize="9" fill="#22d3ee" filter="url(#glow)">
      <tspan x="88" dy="0">const kartik = {'{'}</tspan>
      <tspan x="96" dy="13" fill="#a78bfa">  role: </tspan><tspan fill="#86efac">"Full Stack Dev"</tspan><tspan fill="#e5e7eb">,</tspan>
      <tspan x="96" dy="13" fill="#a78bfa">  stack: </tspan><tspan fill="#86efac">["MERN", "AI"]</tspan><tspan fill="#e5e7eb">,</tspan>
      <tspan x="96" dy="13" fill="#a78bfa">  status: </tspan><tspan fill="#22d3ee">"open_to_hire"</tspan>
      <tspan x="88" dy="13" fill="#22d3ee">{'}'}</tspan>
    </text>
    <rect x="150" y="305" width="6" height="12" rx="1" fill="#22d3ee" opacity="0.9">
      <animate attributeName="opacity" values="0.9;0;0.9" dur="1s" repeatCount="indefinite"/>
    </rect>
    <g><rect width="68" height="28" rx="14" fill="#0f1117" stroke="#22d3ee" strokeWidth="1.5">
      <animateTransform attributeName="transform" type="translate" values="18,220;14,215;18,220" dur="4s" repeatCount="indefinite"/>
    </rect>
    <circle cx="18" cy="14" r="7" fill="none" stroke="#61DAFB" strokeWidth="1.5"><animateTransform attributeName="transform" type="translate" values="18,220;14,215;18,220" dur="4s" repeatCount="indefinite"/></circle>
    <ellipse cx="18" cy="14" rx="7" ry="3.5" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 18 14)"><animateTransform attributeName="transform" type="translate" values="18,220;14,215;18,220" dur="4s" repeatCount="indefinite"/></ellipse>
    <circle cx="18" cy="14" r="2" fill="#61DAFB"><animateTransform attributeName="transform" type="translate" values="18,220;14,215;18,220" dur="4s" repeatCount="indefinite"/></circle>
    <text x="30" y="19" fontFamily="monospace" fontSize="9" fill="#61DAFB"><animateTransform attributeName="transform" type="translate" values="18,220;14,215;18,220" dur="4s" repeatCount="indefinite"/>React</text></g>
    <g transform="translate(310,240)">
      <rect width="68" height="28" rx="14" fill="#0f1117" stroke="#339933" strokeWidth="1.5"/>
      <text x="10" y="19" fontFamily="monospace" fontSize="9" fill="#339933">{"<Node/>"}</text>
      <animateTransform attributeName="transform" type="translate" values="310,240;314,236;310,240" dur="3.5s" repeatCount="indefinite"/>
    </g>
    <g transform="translate(318,180)">
      <rect width="58" height="28" rx="14" fill="#0f1117" stroke="#8b5cf6" strokeWidth="1.5"/>
      <text x="11" y="19" fontFamily="monospace" fontSize="9" fill="#8b5cf6">AI ✦</text>
      <animateTransform attributeName="transform" type="translate" values="318,180;322,175;318,180" dur="5s" repeatCount="indefinite"/>
    </g>
  </svg>
);

const HeroSection = () => {
  const typedText = useTypewriter(ROLES, 90, 50, 1400);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-bg">
      <div className="absolute inset-0 bg-aurora-radial pointer-events-none"/>
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-cyan-glow/20 rounded-full blur-3xl pointer-events-none"/>
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-violet-glow/20 rounded-full blur-3xl pointer-events-none"/>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-4 items-center w-full pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Open to Work badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 open-pulse"/>
            <span className="text-emerald-400 text-sm font-medium">Open to Work — Available Now</span>
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-semibold text-white/80 h-10">
            {typedText}
            <span className="inline-block w-[2px] h-6 bg-cyan-glow ml-1 animate-pulse align-middle"/>
          </h2>

          <h1 className="text-5xl md:text-7xl font-extrabold mt-2 mb-4 leading-tight">
            Hi, I'm <span className="gradient-text">Kartik</span>
            <br/><span className="gradient-text">Sahu</span>
          </h1>

          <p className="text-white/60 text-lg max-w-md mb-6">
            Passionate Full Stack Developer who builds scalable MERN applications and integrates
            AI to create products that actually solve real problems.
          </p>

          {/* Quick info chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['📍 India', '🎓 B.Tech ECE', '💼 Fresher', '🤖 AI Enthusiast'].map(chip => (
              <span key={chip} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs">
                {chip}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="#projects"
              className="group flex items-center gap-2 px-6 py-3 rounded-full bg-aurora-gradient text-bg font-semibold shadow-glow-cyan hover:scale-105 transition-transform"
            >
              View My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </a>
            <a
              href="/resume"
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 hover:border-cyan-glow transition-colors"
            >
              <Download size={16}/> Resume
            </a>
          </div>

          <div className="flex gap-5">
            {[
              { Icon: Github, href: SOCIAL_LINKS.github },
              { Icon: Linkedin, href: SOCIAL_LINKS.linkedin },
              { Icon: Instagram, href: SOCIAL_LINKS.instagram },
              { Icon: Youtube, href: SOCIAL_LINKS.youtube },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                className="text-white/50 hover:text-cyan-glow hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-300"
              >
                <Icon size={22}/>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hidden md:flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        >
          <DevAvatar/>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-white/30 text-xs">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-1 h-2 bg-cyan-glow rounded-full"/>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
