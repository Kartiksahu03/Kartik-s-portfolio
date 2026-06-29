// ============================================
// Admin Model
// Represents the single admin account that manages the portfolio content
// ============================================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[\w.-]+@[\w.-]+\.\w+$/, 'Please enter a valid email address'],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      select: false, // never return this field by default in queries
    },
    name: {
      type: String,
      default: 'Kartik Sahu',
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Instance method to compare a plaintext password against the stored hash
adminSchema.methods.comparePassword = async function (plainPassword) {
  return bcrypt.compare(plainPassword, this.passwordHash);
};

// Static helper to hash a plaintext password (used when creating/updating an admin)
adminSchema.statics.hashPassword = async function (plainPassword) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
};

module.exports = mongoose.model('Admin', adminSchema);
