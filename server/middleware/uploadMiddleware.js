// ============================================
// Upload Middleware
// Handles image uploads to Cloudinary via Multer
// ============================================

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'portfolio',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    transformation: [{ width: 1600, crop: 'limit', quality: 'auto' }],
  },
});

// Only allow real image files through, regardless of what the client claims
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpg, png, webp, gif)'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// Single image upload — field name "image" (used for thumbnails, avatars, blog covers)
const uploadSingle = upload.single('image');

// Multiple image upload — field name "images", up to 5 (used for project gallery)
const uploadMultiple = upload.array('images', 5);

// Wrap multer middlewares so Multer errors come back as clean JSON instead of crashing
const wrapUpload = (multerMiddleware) => (req, res, next) => {
  multerMiddleware(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`,
      });
    }
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

module.exports = {
  uploadSingle: wrapUpload(uploadSingle),
  uploadMultiple: wrapUpload(uploadMultiple),
};
