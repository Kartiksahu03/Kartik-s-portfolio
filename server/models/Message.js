// ============================================
// Message Model
// Represents a contact form submission
// ============================================

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^[\w.-]+@[\w.-]+\.\w+$/, 'Please enter a valid email address'],
    },
    subject: {
      type: String,
      trim: true,
      default: 'New Portfolio Contact',
      maxlength: [150, 'Subject cannot exceed 150 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message body is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

messageSchema.index({ read: 1, createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
