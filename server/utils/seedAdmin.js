// ============================================
// Admin Seeder Script
// Run once via `npm run seed:admin` to create your first admin login
// Reads ADMIN_EMAIL from .env and prompts for a password in the terminal
// ============================================

const readline = require('readline');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const connectDB = require('../config/db');
const Admin = require('../models/Admin');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

const run = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL;
  if (!email) {
    console.error('❌ ADMIN_EMAIL is not set in your .env file');
    process.exit(1);
  }

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`⚠️  An admin already exists for ${email}. Aborting to avoid overwriting.`);
    rl.close();
    return mongoose.disconnect();
  }

  const password = await askQuestion('Enter a password for your admin account: ');

  if (!password || password.length < 6) {
    console.error('❌ Password must be at least 6 characters');
    rl.close();
    return mongoose.disconnect();
  }

  const passwordHash = await Admin.hashPassword(password);

  await Admin.create({
    email,
    passwordHash,
    name: 'Kartik Sahu',
  });

  console.log(`✅ Admin account created for ${email}. You can now log in from /admin/login`);

  rl.close();
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error('❌ Seeder failed:', err.message);
  process.exit(1);
});
