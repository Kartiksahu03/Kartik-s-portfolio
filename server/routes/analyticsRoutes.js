// ============================================
// Analytics Routes
// ============================================

const express = require('express');
const router = express.Router();

const { trackHit, getViews } = require('../controllers/analyticsController');

router.post('/hit', trackHit);
router.get('/views', getViews);

module.exports = router;
