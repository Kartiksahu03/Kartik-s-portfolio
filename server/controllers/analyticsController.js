// ============================================
// Analytics Controller
// Lightweight page-view tracking + trending projects
// ============================================

const crypto = require('crypto');
const Visitor = require('../models/Visitor');
const Project = require('../models/Project');

// Helper: hash an IP address so we never store raw IPs (privacy-friendly analytics)
const hashIp = (ip) => {
  if (!ip) return '';
  return crypto.createHash('sha256').update(ip).digest('hex');
};

// @route   POST /api/analytics/hit
// @access  Public
const trackHit = async (req, res) => {
  try {
    const { page } = req.body;

    if (!page) {
      return res.status(400).json({ success: false, message: 'page is required' });
    }

    const rawIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || '';

    await Visitor.create({
      page,
      ip: hashIp(rawIp),
      userAgent: req.headers['user-agent'] || '',
    });

    // If the hit is on a specific project detail view, bump its viewCount too
    if (page.startsWith('/projects/')) {
      const projectId = page.split('/projects/')[1];
      if (projectId) {
        await Project.findByIdAndUpdate(projectId, { $inc: { viewCount: 1 } }).catch(() => {});
      }
    }

    res.status(201).json({ success: true, message: 'Hit recorded' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to record analytics hit',
      error: error.message,
    });
  }
};

// @route   GET /api/analytics/views
// @access  Public
const getViews = async (req, res) => {
  try {
    const totalViews = await Visitor.countDocuments();

    const trendingProjects = await Project.find().sort({ viewCount: -1 }).limit(5).select(
      'title viewCount thumbnail'
    );

    res.status(200).json({
      success: true,
      totalViews,
      trendingProjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics',
      error: error.message,
    });
  }
};

module.exports = { trackHit, getViews };
