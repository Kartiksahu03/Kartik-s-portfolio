// ============================================
// Project Controller
// CRUD operations for portfolio projects
// ============================================

const Project = require('../models/Project');
const cloudinary = require('../config/cloudinary');

// Helper: extract the Cloudinary public_id from a stored secure_url
const getPublicIdFromUrl = (url) => {
  try {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    const folder = parts[parts.length - 2];
    const publicId = fileName.split('.')[0];
    return `${folder}/${publicId}`;
  } catch {
    return null;
  }
};

// @route   GET /api/projects
// @access  Public
const getAllProjects = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};
    if (category && category !== 'All') {
      filter.category = category;
    }

    const projects = await Project.find(filter).sort({ featured: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
      error: error.message,
    });
  }
};

// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project',
      error: error.message,
    });
  }
};

// @route   POST /api/projects
// @access  Admin
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      longDesc,
      category,
      techStack,
      thumbnail,
      images,
      liveUrl,
      githubUrl,
      featured,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
      });
    }

    const project = await Project.create({
      title,
      description,
      longDesc,
      category,
      techStack: Array.isArray(techStack) ? techStack : [],
      thumbnail,
      images: Array.isArray(images) ? images : [],
      liveUrl,
      githubUrl,
      featured: Boolean(featured),
    });

    res.status(201).json({ success: true, project });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: error.message,
    });
  }
};

// @route   PUT /api/projects/:id
// @access  Admin
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error: error.message,
    });
  }
};

// @route   DELETE /api/projects/:id
// @access  Admin
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // Best-effort cleanup of Cloudinary images — do not block deletion if this fails
    const urlsToDelete = [project.thumbnail, ...(project.images || [])].filter(Boolean);

    await Promise.all(
      urlsToDelete.map(async (url) => {
        const publicId = getPublicIdFromUrl(url);
        if (publicId) {
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.warn(`⚠️  Could not delete Cloudinary asset ${publicId}: ${err.message}`);
          }
        }
      })
    );

    await project.deleteOne();

    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: error.message,
    });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
