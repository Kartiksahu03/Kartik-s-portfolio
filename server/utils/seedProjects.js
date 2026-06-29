// ============================================
// Seed Projects Script
// Run once: node utils/seedProjects.js
// Inserts all Kartik's real projects into MongoDB
// so they show up in both the admin dashboard AND the portfolio
// ============================================

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Project = require('../models/Project');

const PROJECTS = [
  {
    title: 'FrHelp',
    description: 'Production-grade AI-powered EdTech & healthcare platform with JWT auth, OTP, role-based access (Student/Instructor/Admin), Razorpay payments, course management, and a contextual AI assistant built on Groq API.',
    longDesc: `## FrHelp — AI-Powered E-Learning Platform\n\nA full-scale MERN application with healthcare + edtech capabilities.\n\n### Key Features\n- JWT Authentication + OTP Verification\n- Role-Based Access Control (Student / Instructor / Admin)\n- 100+ courses with enrollment & progress tracking\n- Razorpay payment integration\n- Contextual AI assistant (Groq API)\n- Redux Toolkit state management\n- Analytics dashboard\n\n### Tech\nReact · Node.js · Express · MongoDB · Redux Toolkit · Razorpay · JWT · Tailwind CSS · Groq AI`,
    category: 'MERN Stack',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux', 'Razorpay', 'Groq AI', 'JWT', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Kartiksahu03',
    liveUrl: '',
    featured: true,
    viewCount: 0,
  },
  {
    title: 'Ecomzy — Shopping Cart',
    description: 'Reusable MERN shopping cart SDK and e-commerce platform. Plug-and-play cart integration, modular pricing APIs, persistent Redux state, and Stripe payment simulation.',
    longDesc: `## Ecomzy — Shopping Cart & Reusable SDK\n\n### Features\n- Plug-and-play cart SDK\n- Modular APIs for cart ops and pricing\n- Persistent Redux state\n- Stripe payment simulation\n- 500+ products via CRUD APIs\n\n### Tech\nReact · Node.js · Express · MongoDB · Redux Toolkit · Tailwind CSS`,
    category: 'MERN Stack',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Kartiksahu03/Shopping-cart',
    liveUrl: '',
    featured: false,
    viewCount: 0,
  },
  {
    title: 'DevDetective — GitHub Profile Finder',
    description: 'Real-time GitHub profile search using the GitHub REST API. Displays repos, followers, join date, location, and social links for any username. Features dark/light mode toggle.',
    longDesc: `## DevDetective — GitHub Profile Finder\n\n### Features\n- Search any GitHub username in real time\n- Display avatar, bio, join date, stats\n- Public repos, followers, following count\n- Dark / Light mode toggle\n\n### Tech\nHTML5 · CSS3 · JavaScript · GitHub REST API`,
    category: 'Full Stack',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'GitHub REST API'],
    githubUrl: 'https://github.com/Kartiksahu03/github-profile-finder',
    liveUrl: '',
    featured: false,
    viewCount: 0,
  },
  {
    title: 'Random GIF Finder',
    description: 'React app integrated with the Giphy API for random GIF generation and tag-based search. Built with custom hooks for async API handling.',
    longDesc: `## Random GIF Finder\n\n### Features\n- Fetch random GIF on click\n- Search by any tag\n- Custom React hooks for async calls\n\n### Tech\nReact · Giphy API · Custom Hooks · Tailwind CSS`,
    category: 'Full Stack',
    techStack: ['React', 'Giphy API', 'Custom Hooks', 'Tailwind CSS', 'JavaScript'],
    githubUrl: 'https://github.com/Kartiksahu03/Random-gif-finder',
    liveUrl: '',
    featured: false,
    viewCount: 0,
  },
  {
    title: 'Auth System — Protected Routes',
    description: 'Complete React authentication system with Login, Signup, JWT-based authorization, and protected route handling using React Router. Persistent login state via localStorage.',
    longDesc: `## Authentication & Protected Routes\n\n### Features\n- Login + Signup with validation\n- JWT auth flow\n- Protected routes\n- Persistent login via localStorage\n\n### Tech\nReact · React Router · JWT · JavaScript`,
    category: 'Full Stack',
    techStack: ['React', 'React Router', 'JWT', 'JavaScript'],
    githubUrl: 'https://github.com/Kartiksahu03/react-router',
    liveUrl: '',
    featured: false,
    viewCount: 0,
  },
  {
    title: 'This Portfolio',
    description: 'Full-stack MERN portfolio with admin dashboard, AI chatbot (Groq), resume analyzer, ATS scorer, stacked scroll animations, and cursor glow effect.',
    longDesc: `## Portfolio — Full Stack MERN\n\n### Features\n- Admin dashboard (Projects, Skills, Blogs, Messages, Analytics)\n- AI chatbot powered by Groq LLM\n- AI Resume Match Analyzer + ATS Scorer\n- Framer Motion animations\n- Contact form → email notification\n\n### Tech\nReact · Node.js · Express · MongoDB · Redux · Framer Motion · Groq AI · Tailwind CSS`,
    category: 'MERN Stack',
    techStack: ['React', 'Node.js', 'MongoDB', 'Groq AI', 'Redux', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/Kartiksahu03',
    liveUrl: '',
    featured: false,
    viewCount: 0,
  },
];

const run = async () => {
  await connectDB();

  const existing = await Project.countDocuments();
  if (existing > 0) {
    console.log(`⚠️  ${existing} projects already in database.`);
    console.log('If you want to re-seed, first clear the projects collection in MongoDB Atlas.');
    await mongoose.disconnect();
    process.exit(0);
  }

  await Project.insertMany(PROJECTS);
  console.log(`✅ Successfully seeded ${PROJECTS.length} projects into MongoDB!`);
  console.log('They now show in your admin dashboard AND on the public portfolio.');

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
