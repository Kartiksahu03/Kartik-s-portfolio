// ============================================
// Contact Controller
// Handles contact form submissions: save to DB + send notification email
// ============================================

const Message = require('../models/Message');
const { sendEmail, buildContactEmailHTML } = require('../utils/sendEmail');

// @route   POST /api/contact
// @access  Public
const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required',
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject: subject || 'New Portfolio Contact',
      message,
    });

    // Attempt to send a notification email — don't fail the whole request if email fails,
    // since the message is already safely stored in the database
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Portfolio Message: ${subject || 'No Subject'}`,
        html: buildContactEmailHTML(name, email, subject || 'No Subject', message),
      });
    } catch (emailError) {
      console.warn('⚠️  Contact email failed to send:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to submit message',
      error: error.message,
    });
  }
};

// @route   GET /api/contact
// @access  Admin
const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
      error: error.message,
    });
  }
};

// @route   DELETE /api/contact/:id
// @access  Admin
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.status(200).json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete message',
      error: error.message,
    });
  }
};

module.exports = { submitMessage, getAllMessages, deleteMessage };
