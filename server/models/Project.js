// ============================================
// Project Model
// Represents a single portfolio project shown on the "My Work" section
// ============================================

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
    },
    longDesc: {
      type: String, // markdown content for the project detail modal
      default: '',
    },
    category: {
      type: String,
      required: true,
      enum: ['MERN Stack', 'Full Stack', 'Backend System', 'AI Modern Tech', 'Other'],
      default: 'MERN Stack',
    },
    techStack: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String, // Cloudinary URL
      default: '',
    },
    images: {
      type: [String], // additional Cloudinary URLs for gallery view
      default: [],
    },
    liveUrl: {
      type: String,
      trim: true,
      default: '',
    },
    githubUrl: {
      type: String,
      trim: true,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Index to speed up the common "featured projects first" query
projectSchema.index({ featured: -1, createdAt: -1 });

module.exports = mongoose.model('Project', projectSchema);
