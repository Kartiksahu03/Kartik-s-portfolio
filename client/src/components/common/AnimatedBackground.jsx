// ============================================
// AnimatedBackground Component
// Slow-moving glowing aurora blobs that sit behind the entire site,
// giving a subtle "always alive" GIF-like background effect without
// using an actual image file (keeps the site fast and crisp at any size).
// ============================================

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-glow/10 rounded-full blur-[120px] animate-aurora-drift-1" />
      <div className="absolute top-[40%] right-[-15%] w-[700px] h-[700px] bg-violet-glow/10 rounded-full blur-[130px] animate-aurora-drift-2" />
      <div className="absolute bottom-[-15%] left-[20%] w-[500px] h-[500px] bg-cyan-glow/5 rounded-full blur-[110px] animate-aurora-drift-3" />
    </div>
  );
};

export default AnimatedBackground;
