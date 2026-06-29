// ============================================
// Upload Routes
// Handles direct image uploads to Cloudinary (used by AdminProjectForm, AdminBlogForm, etc.)
// ============================================

const express = require('express');
const router = express.Router();

const { uploadSingle } = require('../middleware/uploadMiddleware');
const { verifyAdminToken } = require('../middleware/authMiddleware');

// @route   POST /api/upload/image
// @access  Admin
router.post('/image', verifyAdminToken, uploadSingle, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file provided' });
  }

  res.status(201).json({
    success: true,
    url: req.file.path, // Cloudinary secure URL
    publicId: req.file.filename,
  });
});

module.exports = router;
