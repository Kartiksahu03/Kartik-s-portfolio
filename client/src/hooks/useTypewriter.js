// ============================================
// useTypewriter Hook
// Cycles through an array of words with a typing + deleting animation
// Used in the Hero section for "Full Stack Developer / MERN Developer / ..."
// ============================================

import { useState, useEffect } from 'react';

export const useTypewriter = (words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 1500) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    let timeout;

    if (!isDeleting && text === currentWord) {
      // Finished typing the word — pause, then start deleting
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      // Finished deleting — move to the next word
      setIsDeleting(false);
      setWordIndex((prev) => prev + 1);
    } else {
      // Either typing forward or deleting backward
      const nextText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      timeout = setTimeout(
        () => setText(nextText),
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
};
