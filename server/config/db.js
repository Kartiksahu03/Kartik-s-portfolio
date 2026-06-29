// ============================================
// MongoDB Atlas Connection Helper
// ============================================

const mongoose = require('mongoose');

// ANSI color codes for terminal logging (no extra dependency needed)
const COLORS = {
  green: '\x1b[32m%s\x1b[0m',
  red: '\x1b[31m%s\x1b[0m',
  yellow: '\x1b[33m%s\x1b[0m',
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      COLORS.green,
      `✅ MongoDB Connected: ${conn.connection.host} (db: ${conn.connection.name})`
    );

    // Log future connection issues without crashing the whole app
    mongoose.connection.on('error', (err) => {
      console.error(COLORS.red, `MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn(COLORS.yellow, '⚠️  MongoDB disconnected. Attempting to reconnect...');
    });

    return conn;
  } catch (error) {
    console.error(COLORS.red, `❌ MongoDB Connection Failed: ${error.message}`);
    // Exit process with failure — no point running the API without a DB
    process.exit(1);
  }
};

module.exports = connectDB;
