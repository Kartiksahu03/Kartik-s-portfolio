// ============================================
// Auth Routes
// ============================================

const express = require('express');
const router = express.Router();

const { login, getMe } = require('../controllers/authController');
const { verifyAdminToken } = require('../middleware/authMiddleware');

router.post('/login', login);
router.get('/me', verifyAdminToken, getMe);

module.exports = router;
