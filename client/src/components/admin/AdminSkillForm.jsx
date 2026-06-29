// ============================================
// AdminSkillForm Component
// Simple form to add/edit a skill
// ============================================

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { addSkill, updateSkill } from '../../redux/slices/skillSlice';

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'AI/ML', 'Other'];

const AdminSkillForm = ({ skill, onClose }) => {
  const dispatch = useDispatch();
  const isEditing = Boolean(skill);

  const [name, setName] = useState(skill?.name || '');
  const [category, setCategory] = useState(skill?.category || 'Frontend');
  const [level, setLevel] = useState(skill?.level || 70);
  const [icon, setIcon] = useState(skill?.icon || '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const payload = { name, category, level: Number(level), icon };

    try {
      if (isEditing) {
        await dispatch(updateSkill({ id: skill._id, data: payload })).unwrap();
      } else {
        await dispatch(addSkill(payload)).unwrap();
      }
      onClose();
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to save skill');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-bg-card border border-white/10 rounded-2xl p-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {isEditing ? 'Edit Skill' : 'Add Skill'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Skill name (e.g. React)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-bg border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-bg border border-white/10 text-white focus:border-cyan-glow focus:outline-none"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Icon URL or devicon class (optional)"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-bg border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none"
          />

          <div>
            <label className="flex justify-between text-white/60 text-sm mb-2">
              <span>Proficiency Level</span>
              <span className="text-cyan-glow">{level}%</span>
            </label>
            <input
              type="range"
              min="1"
              max="100"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full accent-cyan-500"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-aurora-gradient text-bg font-semibold hover:scale-[1.01] transition-transform disabled:opacity-60"
          >
            {submitting ? 'Saving...' : isEditing ? 'Update Skill' : 'Add Skill'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSkillForm;
