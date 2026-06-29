// ============================================
// Project Routes
// ============================================

const express = require('express');
const router = express.Router();

const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

const { verifyAdminToken } = require('../middleware/authMiddleware');

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', verifyAdminToken, createProject);
router.put('/:id', verifyAdminToken, updateProject);
router.delete('/:id', verifyAdminToken, deleteProject);

module.exports = router;
