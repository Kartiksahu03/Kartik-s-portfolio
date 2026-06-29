// ============================================
// Skill Routes
// ============================================

const express = require('express');
const router = express.Router();

const { getAllSkills, addSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const { verifyAdminToken } = require('../middleware/authMiddleware');

router.get('/', getAllSkills);
router.post('/', verifyAdminToken, addSkill);
router.put('/:id', verifyAdminToken, updateSkill);
router.delete('/:id', verifyAdminToken, deleteSkill);

module.exports = router;
