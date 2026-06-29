import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => (
  <section className="min-h-screen flex items-center justify-center px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-lg"
    >
      <motion.div
        className="text-[120px] md:text-[160px] font-black gradient-text leading-none mb-4"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        404
      </motion.div>
      <p className="text-white/60 text-xl mb-2">Oops! Page not found.</p>
      <p className="text-white/30 text-sm mb-8">
        Looks like this page went on a coffee break and never came back. ☕
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-aurora-gradient text-bg font-semibold hover:scale-105 transition-transform"
        >
          <Home size={18}/> Go Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white hover:border-cyan-glow transition-colors"
        >
          <ArrowLeft size={18}/> Go Back
        </button>
      </div>

      {/* Floating code snippets for flavor */}
      {['<404/>', 'undefined', 'null', '{ }'].map((t, i) => (
        <motion.span
          key={t}
          className="absolute text-white/5 text-4xl font-mono font-bold pointer-events-none select-none"
          style={{ top: `${15 + i * 20}%`, left: i % 2 === 0 ? '5%' : '75%' }}
          animate={{ y: [0, -15, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
        >
          {t}
        </motion.span>
      ))}
    </motion.div>
  </section>
);

export default NotFound;
