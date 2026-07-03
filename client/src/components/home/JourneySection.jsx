// ============================================
// JourneySection Component — Kartik Sahu's Real Timeline
// ============================================

import { motion } from 'framer-motion';
import { GraduationCap, Code2, Sparkles, Rocket, Briefcase, Globe } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// Kartik's actual journey from engineering start to now
const JOURNEY = [
  {
    icon: GraduationCap,
    date: '2022',
    title: 'Started B.Tech in Electronics & Telecom',
    description:
      ' Enrolled in Electronics & Telecom Engineering at Bharati Vidyapeeth, University of Mumbai — but my real passion was always software. I had been building things with code long before college, and used every opportunity to pursue web development alongside my degree.',
  },
  {
    icon: Code2,
    date: '2022 – 2023',
    title: 'Mastered the MERN Stack',
    description:
      'Dived deep into React, Node.js, Express, and MongoDB. Built multiple practice projects to solidify concepts — authentication systems, API integrations, state management with Redux Toolkit, and responsive UI with Tailwind CSS.',
  },
  {
    icon: Globe,
    date: '2023',
    title: 'Freelance Web Development',
    description:
      'Took on freelance work and independently delivered a real-world web project for a client. This experience taught me how to own a product end-to-end — from requirements to deployment — without hand-holding.',
  },
  {
    icon: Sparkles,
    date: '2024',
    title: 'Built FrHelp — Full Stack AI-Powered Platform',
    description:
      'Developed FrHelp, a production-grade healthcare and edtech platform. Implemented JWT authentication, OTP verification, role-based access (Student / Instructor / Admin), course management, payment integration, and an AI learning assistant powered by LLMs — all from scratch, deployed on Vercel and Render.',
  },
  {
    icon: Briefcase,
    date: '2024 – 2025',
    title: 'Shipped 5+ Projects, Grew as a Developer',
    description:
      'Built a suite of real projects: an e-commerce cart (Ecomzy) with Redux, a GitHub profile finder using REST API integration, a GIF generator with custom React hooks, and an auth system with protected routing. Each project was a deliberate attempt to master a new concept.',
  },
  {
    icon: Rocket,
    date: '2025 — Now',
    title: 'B.Tech Graduate — Actively Seeking Opportunities',
    description:
      'Recently graduated and now focused on landing my first full-time role or internship as a Full Stack Developer. Building this portfolio to showcase my work, and actively applying while continuing to learn backend engineering, cloud deployment, and AI integration.',
  },
];

const JourneySection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="journey" className="py-24 px-6 md:px-12 max-w-5xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <p className="section-label mb-3">How I got here</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">My Journey</h2>
      </motion.div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-glow/50 via-violet-glow/50 to-transparent md:-translate-x-1/2" />

        <div className="space-y-12">
          {JOURNEY.map((item, i) => {
            const Icon = item.icon;
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Icon dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-bg-card border-2 border-cyan-glow flex items-center justify-center shadow-glow-soft z-10">
                  <Icon size={20} className="text-cyan-glow" />
                </div>

                {/* Content card */}
                <div
                  className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${
                    isEven ? 'md:text-right md:pr-4' : 'md:text-left md:pl-4'
                  }`}
                >
                  <div className="bg-bg-card border border-white/10 rounded-2xl p-6 hover:border-cyan-glow/40 transition-colors">
                    <p className="text-cyan-glow text-sm font-semibold mb-1">{item.date}</p>
                    <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
