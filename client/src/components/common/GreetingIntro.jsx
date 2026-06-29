// ============================================
// GreetingIntro Component
// Shows a quick cycling "Hello / Namaste / Bonjour..." animation
// then slides the whole curtain UP to reveal the homepage underneath.
// Runs on every page reload (by design).
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GREETING_WORDS } from '../../utils/constants';

const GreetingIntro = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    // Show each greeting word for a short moment, then move to the next
    if (index < GREETING_WORDS.length - 1) {
      const timer = setTimeout(() => setIndex((prev) => prev + 1), 280);
      return () => clearTimeout(timer);
    }

    // After the last word, trigger the slide-up reveal
    const finishTimer = setTimeout(() => {
      setIsSliding(true);
      // Let the slide-up animation finish playing before unmounting this component
      setTimeout(onComplete, 800);
    }, 450);

    return () => clearTimeout(finishTimer);
  }, [index, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg overflow-hidden"
      initial={{ y: 0 }}
      animate={isSliding ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <AnimatePresence mode="wait">
        {!isSliding && (
          <motion.h1
            key={GREETING_WORDS[index]}
            className="relative text-4xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25 }}
          >
            {GREETING_WORDS[index]}
          </motion.h1>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GreetingIntro;
