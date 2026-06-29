// ============================================
// Footer Component — Kartik Sahu
// Has a subtle hidden admin access button (only visible on hover)
// ============================================

import { Github, Linkedin, Instagram, Mail, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS, APP_NAME } from '../../utils/constants';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-bg py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-white/40 text-sm">
            © {year} {APP_NAME}. Built with the MERN Stack + Framer Motion.
          </p>
          <p className="text-white/25 text-xs mt-1">
            Open to Full Stack Developer roles & internships anywhere in India.
          </p>
        </div>

        <div className="flex items-center gap-5">
          {[
            { Icon: Github, href: SOCIAL_LINKS.github, label: 'GitHub' },
            { Icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
            { Icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
            { Icon: Mail, href: `mailto:${SOCIAL_LINKS.email}`, label: 'Email' },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-white/40 hover:text-cyan-glow hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)] transition-all duration-300 inline-block"
            >
              <Icon size={18} />
            </a>
          ))}

          {/* Hidden admin button — only visible on hover, no label so visitors won't notice */}
          <Link
            to="/admin/login"
            aria-label="Admin"
            title="Admin Panel"
            className="text-white/10 hover:text-white/50 transition-all duration-300 inline-block ml-2"
          >
            <Settings size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
