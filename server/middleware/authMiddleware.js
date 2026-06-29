// ============================================
// Auth Middleware
// Verifies the JWT sent by the admin panel and attaches admin info to req
// ============================================

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const verifyAdminToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized — no token provided',
      });
    }

    const token = authHeader.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      const message =
        err.name === 'TokenExpiredError'
          ? 'Session expired — please log in again'
          : 'Invalid token';
      return res.status(401).json({ success: false, message });
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin account no longer exists',
      });
    }

    req.admin = { id: admin._id, email: admin.email, name: admin.name };
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during authentication',
    });
  }
};

module.exports = { verifyAdminToken };
