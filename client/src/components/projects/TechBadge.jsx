// ============================================
// TechBadge Component
// Small pill used to display a single technology name
// ============================================

const TechBadge = ({ label }) => {
  return (
    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs">
      {label}
    </span>
  );
};

export default TechBadge;
