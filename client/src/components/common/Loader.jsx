// ============================================
// Loader Component
// Small reusable spinner shown while data is loading
// ============================================

const Loader = ({ fullScreen = false }) => {
  const wrapperClass = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-bg z-50'
    : 'flex items-center justify-center py-16';

  return (
    <div className={wrapperClass}>
      <div className="w-10 h-10 border-4 border-white/10 border-t-cyan-glow rounded-full animate-spin" />
    </div>
  );
};

export default Loader;
