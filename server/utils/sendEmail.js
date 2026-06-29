// ============================================
// Email Utility (Nodemailer)
// Used by contactController.js to notify Kartik when someone submits the contact form
// ============================================

const nodemailer = require('nodemailer');

// Build a reusable transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // must be a Gmail "App Password"
  },
});

/**
 * Send an email
 * @param {Object} options
 * @param {string} options.to
 * @param {string} options.subject
 * @param {string} options.html
 */
const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials are not configured in .env');
  }

  const info = await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });

  return info;
};

/**
 * Builds a styled dark-theme HTML email template for new contact form submissions
 */
const buildContactEmailHTML = (name, email, subject, message) => {
  return `
  <div style="background-color:#0f1117; padding:40px 20px; font-family: 'Segoe UI', Arial, sans-serif;">
    <table style="max-width:560px; margin:0 auto; background-color:#171a23; border-radius:12px; overflow:hidden; border:1px solid #2a2e3a;">
      <tr>
        <td style="background: linear-gradient(90deg, #22d3ee, #8b5cf6); padding:24px 32px;">
          <h2 style="margin:0; color:#0f1117; font-size:20px;">New Portfolio Message 📩</h2>
        </td>
      </tr>
      <tr>
        <td style="padding:32px;">
          <p style="color:#9ca3af; font-size:13px; margin:0 0 4px;">From</p>
          <p style="color:#ffffff; font-size:16px; margin:0 0 16px;">${name} (${email})</p>

          <p style="color:#9ca3af; font-size:13px; margin:0 0 4px;">Subject</p>
          <p style="color:#ffffff; font-size:16px; margin:0 0 16px;">${subject}</p>

          <p style="color:#9ca3af; font-size:13px; margin:0 0 4px;">Message</p>
          <p style="color:#e5e7eb; font-size:15px; line-height:1.6; margin:0; white-space:pre-wrap;">${message}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px; border-top:1px solid #2a2e3a;">
          <p style="color:#6b7280; font-size:12px; margin:0;">Sent automatically from your portfolio contact form.</p>
        </td>
      </tr>
    </table>
  </div>
  `;
};

module.exports = { sendEmail, buildContactEmailHTML };
