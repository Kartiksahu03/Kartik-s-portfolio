// ============================================
// Skill Controller
// CRUD operations for portfolio skills
// ============================================

const Skill = require('../models/Skill');

// @route   GET /api/skills
// @access  Public
const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });

    res.status(200).json({
      success: true,
      count: skills.length,
      skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch skills',
      error: error.message,
    });
  }
};

// @route   POST /api/skills
// @access  Admin
const addSkill = async (req, res) => {
  try {
    const { category, name, icon, level, order } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Skill name is required' });
    }

    const skill = await Skill.create({ category, name, icon, level, order });

    res.status(201).json({ success: true, skill });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add skill',
      error: error.message,
    });
  }
};

// @route   PUT /api/skills/:id
// @access  Admin
const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    res.status(200).json({ success: true, skill });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update skill',
      error: error.message,
    });
  }
};

// @route   DELETE /api/skills/:id
// @access  Admin
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    res.status(200).json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete skill',
      error: error.message,
    });
  }
};

module.exports = { getAllSkills, addSkill, updateSkill, deleteSkill };
