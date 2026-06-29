// ============================================
// Blog Controller
// CRUD operations for devlog / blog posts
// ============================================

const Blog = require('../models/Blog');

// @route   GET /api/blogs
// @access  Public (only returns published posts unless ?all=true is used by admin)
const getAllBlogs = async (req, res) => {
  try {
    const { all } = req.query;

    const filter = all === 'true' ? {} : { published: true };

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs',
      error: error.message,
    });
  }
};

// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post',
      error: error.message,
    });
  }
};

// @route   POST /api/blogs
// @access  Admin
const createBlog = async (req, res) => {
  try {
    const { title, body, tags, coverImage, published } = req.body;

    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: 'Title and body are required',
      });
    }

    const blog = await Blog.create({
      title,
      body,
      tags: Array.isArray(tags) ? tags : [],
      coverImage,
      published: Boolean(published),
    });

    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create blog post',
      error: error.message,
    });
  }
};

// @route   PUT /api/blogs/:id
// @access  Admin
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    Object.assign(blog, req.body);
    await blog.save(); // triggers pre('validate') so slug/readTime stay in sync

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update blog post',
      error: error.message,
    });
  }
};

// @route   DELETE /api/blogs/:id
// @access  Admin
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }

    res.status(200).json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog post',
      error: error.message,
    });
  }
};

module.exports = { getAllBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog };
