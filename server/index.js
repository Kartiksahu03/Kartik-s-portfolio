// ============================================
// Express Server Entry Point
// ============================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');

// Route imports
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Connect to MongoDB Atlas
connectDB();

const app = express();

// ---- Core Middleware ----
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (
        origin.includes('localhost') ||
        origin.endsWith('.vercel.app') ||
        origin === process.env.CLIENT_URL
      ) {
        return callback(null, true);
      }
      callback(new Error('CORS not allowed'));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// ---- Simple request logger (junior-dev style, no morgan dependency) ----
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// ---- Health Check ----
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Kartik Sahu Portfolio API is running 🚀',
    timestamp: new Date().toISOString(),
  });
});

// ---- API Routes ----
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/upload', uploadRoutes);

// ---- 404 Handler ----
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ---- Global Error Handler ----
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('🔥 Unhandled Error:', err.stack || err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`🔗 Local: http://localhost:${PORT}\n`);
});

// ---- Safety nets for unexpected crashes ----
process.on('unhandledRejection', (err) => {
  console.error('🔥 Unhandled Rejection:', err.message);
});

process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:', err.message);
  process.exit(1);
});
