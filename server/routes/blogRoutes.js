// ============================================
// Blog Routes
// ============================================

const express = require('express');
const router = express.Router();

const {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

const { verifyAdminToken } = require('../middleware/authMiddleware');

router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', verifyAdminToken, createBlog);
router.put('/:id', verifyAdminToken, updateBlog);
router.delete('/:id', verifyAdminToken, deleteBlog);

module.exports = router;
