// ============================================
// Navbar Component
// "Kartik" sits on the left. A centered hamburger button opens a
// black-and-white dropdown menu that slides down with a glow-on-hover
// effect on each link — inspired by the reference portfolio's menu.
// ============================================

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, APP_NAME } from '../../utils/constants';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the menu whenever we navigate to a new page
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prevent background scroll while the full-screen menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          {/* Name — left side */}
          <Link to="/" className="text-xl font-bold text-white z-10">
            {'<'}
            <span className="gradient-text">{APP_NAME.split(' ')[0]}</span>
            {' />'}
          </Link>

          {/* Hamburger — always centered */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-white hover:border-cyan-glow transition-colors z-10"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
            <span className="text-sm font-medium hidden sm:inline">Menu</span>
          </button>

          {/* Reach Out — right side */}
          <a
            href="#contact"
            className="hidden sm:inline-block px-5 py-2 rounded-full bg-aurora-gradient text-bg text-sm font-semibold hover:shadow-glow-cyan transition-shadow z-10"
          >
            Reach Out
          </a>
        </div>
      </nav>

      {/* Full-width dropdown menu — slides down from under the navbar, black & white theme */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-[55]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 left-0 right-0 z-[58] bg-black border-b border-white/10 pt-28 pb-12 px-6"
            >
              <div className="max-w-3xl mx-auto flex flex-col items-center gap-3">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                    className="w-full"
                  >
                    <Link
                      to={link.path}
                      className="group block w-full text-center py-4 rounded-xl text-3xl md:text-4xl font-bold text-white/70 hover:text-white hover:bg-white/5 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + NAV_LINKS.length * 0.06, duration: 0.4 }}
                  className="mt-4 px-8 py-3 rounded-full border border-white/30 text-white font-semibold hover:bg-white hover:text-black transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Reach Out
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
