// ============================================
// AI Routes (Groq)
// ============================================

const express = require('express');
const router = express.Router();

const { portfolioChat, analyzeResume, atsScore } = require('../controllers/aiController');

router.post('/chat', portfolioChat);
router.post('/analyze', analyzeResume);
router.post('/ats-score', atsScore);

module.exports = router;
