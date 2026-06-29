// ============================================
// CursorGlow Component
// A soft glowing blob that follows the mouse cursor around the page,
// matching the cyan/violet aurora theme. Disabled on touch devices since
// there's no cursor to follow there.
// ============================================

import { useEffect, useRef, useState } from 'react';

const CursorGlow = () => {
  const glowRef = useRef(null);
  const [isTouchDevice] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );

  useEffect(() => {
    if (isTouchDevice) return;

    // We move the glow with plain DOM updates (not React state) so it stays
    // perfectly smooth at 60fps instead of re-rendering React on every pixel.
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Smooth lerp/easing toward the cursor so it gently trails behind
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none z-[1] mix-blend-screen"
      style={{
        background:
          'radial-gradient(circle, rgba(34,211,238,0.18) 0%, rgba(139,92,246,0.12) 40%, transparent 70%)',
      }}
    />
  );
};

export default CursorGlow;
