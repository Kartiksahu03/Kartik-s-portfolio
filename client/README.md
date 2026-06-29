# Kartik Sahu — Portfolio Frontend

React + Vite + Tailwind CSS + Framer Motion + GSAP frontend for the MERN portfolio.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173

Make sure the backend server is also running on http://localhost:5000 (see the `server` folder) — most of this app talks to it for projects, skills, blogs, the AI chatbot, and the resume analyzer.

## Before you go live, personalize these files:

- `src/utils/constants.js` — your name, social links, greeting words
- `src/components/home/HeroSection.jsx` — replace the placeholder avatar emoji with your own photo
- `src/components/home/StatsSection.jsx` — update the stat numbers with your real ones
- `src/components/home/JourneySection.jsx` — replace the placeholder timeline with your real milestones (education, projects, skills)
- `src/components/home/SkillsMarquee.jsx` — edit the `SKILLS_LOOP` array to match your actual tech stack
- `src/pages/Resume.jsx` — add your actual resume PDF to `public/resume.pdf`
- Backend: `server/controllers/aiController.js` — fill in your real resume/bio text (powers the AI chatbot and resume analyzer)

## What's included

- Dark theme with cyan-to-violet aurora color palette
- Animated drifting aurora background behind every section
- Cursor-follow glow effect (desktop only, auto-disabled on touch devices)
- Multi-language greeting intro that slides up to reveal the page, on every load
- Centered hamburger menu with a black-and-white full-screen dropdown and glow-on-hover links
- Typewriter hero text
- Scroll-reveal animations throughout (Framer Motion)
- Infinitely looping skills logo marquee
- "My Journey" timeline (education + projects + skills milestones)
- Scroll-pinned stacking project cards (GSAP ScrollTrigger) — each project covers the previous one as you scroll, just like the reference site
- Admin dashboard (`/admin/login` → `/admin/dashboard`) to manage Projects, Skills, Blogs, Messages, and view Analytics
- AI chat widget (floating button, bottom-right) powered by Groq
- AI Resume Analyzer with animated score gauge
- Markdown-powered blog with live preview in the admin editor

## A note on the stacking project cards

`StackedProjects.jsx` uses GSAP's ScrollTrigger to pin each card in place while the next one scrolls up to cover it. This needs real DOM measurement, so:
- It only activates once there's actual scrollable height (i.e. once you have 2+ projects)
- If you heavily restyle the card heights, you may need to adjust the `start`/`end` trigger points inside the `useEffect` in that file

## Build for production

```bash
npm run build
```

Output goes to `dist/` — deploy that folder to Vercel, Netlify, or any static host. Set `VITE_API_URL` to your deployed backend URL before building.

Verified: a clean `npm install` + `npm run build` + `npm run preview` all pass with zero console errors.
