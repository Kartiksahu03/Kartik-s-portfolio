// ============================================
// Skill Model
// Represents a single skill shown in the "My Skills" section
// ============================================

const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'AI/ML', 'Other'],
      default: 'Frontend',
    },
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    icon: {
      type: String, // either a devicon class name (e.g. "devicon-react-original") or a full URL
      default: '',
    },
    level: {
      type: Number, // proficiency 1-100, used for the animated progress bar
      min: [1, 'Level must be at least 1'],
      max: [100, 'Level cannot exceed 100'],
      default: 70,
    },
    order: {
      type: Number, // controls display order within a category
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

skillSchema.index({ category: 1, order: 1 });

module.exports = mongoose.model('Skill', skillSchema);
