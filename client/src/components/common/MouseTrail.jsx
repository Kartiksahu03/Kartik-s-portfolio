// Mouse trail particles — tiny glowing dots that follow cursor
import { useEffect, useRef } from 'react';

const COLORS = ['#22d3ee', '#8b5cf6', '#a78bfa', '#67e8f9', '#c4b5fd'];

const MouseTrail = () => {
  const isTouchDevice =
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isTouchDevice) return;

    const particles = [];
    let animId;

    const createParticle = (x, y) => {
      const el = document.createElement('div');
      const size = Math.random() * 6 + 3;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      el.style.cssText = `
        position:fixed; width:${size}px; height:${size}px;
        border-radius:50%; pointer-events:none; z-index:9998;
        background:${color}; left:${x}px; top:${y}px;
        transform:translate(-50%,-50%);
        box-shadow:0 0 ${size * 2}px ${color};
        mix-blend-mode:screen;
      `;
      document.body.appendChild(el);
      particles.push({ el, x, y, life: 1, vx: (Math.random()-0.5)*2, vy: (Math.random()-0.5)*2 });
    };

    const animate = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.04;
        p.x += p.vx;
        p.y += p.vy;
        p.el.style.opacity = p.life;
        p.el.style.left = p.x + 'px';
        p.el.style.top = p.y + 'px';
        p.el.style.transform = `translate(-50%,-50%) scale(${p.life})`;
        if (p.life <= 0) {
          document.body.removeChild(p.el);
          particles.splice(i, 1);
        }
      }
      animId = requestAnimationFrame(animate);
    };

    const handleMove = (e) => {
      if (Math.random() > 0.4) createParticle(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMove);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(animId);
      particles.forEach(p => { try { document.body.removeChild(p.el); } catch {} });
    };
  }, [isTouchDevice]);

  return null;
};

export default MouseTrail;
