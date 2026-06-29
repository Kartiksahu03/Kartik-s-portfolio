// ============================================
// SkillsMarquee Component — Kartik's Real Tech Stack
// ============================================

// Kartik's actual tech stack from GitHub profile
const SKILLS_LOOP = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Express.js', icon: 'https://cdn.simpleicons.org/express/ffffff' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { name: 'Redux Toolkit', icon: 'https://cdn.simpleicons.org/redux/764ABC' },
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'React Router', icon: 'https://cdn.simpleicons.org/reactrouter/CA4245' },
  { name: 'JWT', icon: 'https://cdn.simpleicons.org/jsonwebtokens/ffffff' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
  { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/ffffff' },
  { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite/646CFF' },
  { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'CSS3', icon: 'https://cdn.simpleicons.org/css3/1572B6' },
  { name: 'Vercel', icon: 'https://cdn.simpleicons.org/vercel/ffffff' },
  { name: 'Render', icon: 'https://cdn.simpleicons.org/render/46E3B7' },
];

const LOOPED_SKILLS = [...SKILLS_LOOP, ...SKILLS_LOOP];

const SkillsMarquee = () => {
  return (
    <div className="relative py-10 overflow-hidden border-y border-white/5 bg-bg-card/20">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-10" />

      <div className="flex w-max animate-logo-scroll">
        {LOOPED_SKILLS.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="flex items-center gap-3 px-10 flex-shrink-0"
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-9 h-9 object-contain opacity-80"
              loading="lazy"
            />
            <span className="text-white/60 font-medium whitespace-nowrap">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsMarquee;
