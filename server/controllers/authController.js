// ============================================
// Auth Controller
// Handles admin login + token verification
// (Account creation happens via the seedAdmin.js script, not a public route)
// ============================================

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Helper to sign a JWT for a given admin id
const generateToken = (adminId) => {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // .select('+passwordHash') because the schema hides it by default
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+passwordHash');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};

// @route   GET /api/auth/me
// @access  Admin (verifyAdminToken already ran and attached req.admin)
const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching admin profile',
      error: error.message,
    });
  }
};

module.exports = { login, getMe };
