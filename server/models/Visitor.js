// ============================================
// Visitor Model
// Lightweight analytics record — one document per page hit
// ============================================

const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
  {
    page: {
      type: String, // route path, e.g. "/", "/projects", "/blog/my-first-post"
      required: true,
      trim: true,
    },
    ip: {
      type: String, // hashed for privacy — never store raw IP addresses
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },
    visitedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // we use the explicit visitedAt field instead
  }
);

visitorSchema.index({ page: 1, visitedAt: -1 });

module.exports = mongoose.model('Visitor', visitorSchema);
