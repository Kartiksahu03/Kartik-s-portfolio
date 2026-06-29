// ============================================
// useScrollReveal Hook
// Returns a ref + boolean telling you when an element has scrolled into view
// Used alongside Framer Motion to trigger reveal animations once per element
// ============================================

import { useEffect, useRef, useState } from 'react';

export const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once revealed, we don't need to keep watching this element
          observer.unobserve(node);
        }
      },
      { threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};
