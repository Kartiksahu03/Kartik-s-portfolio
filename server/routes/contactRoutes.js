// ============================================
// Contact Routes
// ============================================

const express = require('express');
const router = express.Router();

const { submitMessage, getAllMessages, deleteMessage } = require('../controllers/contactController');
const { verifyAdminToken } = require('../middleware/authMiddleware');

router.post('/', submitMessage);
router.get('/', verifyAdminToken, getAllMessages);
router.delete('/:id', verifyAdminToken, deleteMessage);

module.exports = router;
