import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot, BriefcaseBusiness, Code2, ExternalLink, FileText,
  Github, GraduationCap, Linkedin, MessageCircle, Minus, Monitor,
  MoveUpRight, Send, Sparkles, Terminal, X, FolderGit2, Cpu,
  ChevronRight, Command, PanelTop
} from "lucide-react";

type WindowKey = "about" | "projects" | "resume" | "chat" | "stack";
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\\/$/, "");
type ChatMessage = { role: "user" | "assistant"; content: string };
type Project = { name: string; eyebrow: string; description: string; stack: string[]; href: string; accent: string };

const projects: Project[] = [
  {
    name: "FrHelp",
    eyebrow: "AI-POWERED EDTECH",
    description: "A learning platform with course enrollment, progress tracking, role-based access, Razorpay payments, and an intent-aware AI assistant.",
    stack: ["React", "Node.js", "MongoDB", "Groq AI"],
    href: "https://github.com/Kartiksahu03/Frhelp-Hosting",
    accent: "violet"
  },
  {
    name: "Paisa",
    eyebrow: "AI FINANCE",
    description: "An expense tracker with natural-language and voice transaction entry, grounded finance assistance, budget alerts, and interactive analytics.",
    stack: ["React", "Redux Toolkit", "Recharts", "Groq AI"],
    href: "https://github.com/Kartiksahu03/paisa-expense-tracker",
    accent: "mint"
  },
  {
    name: "AI Portfolio",
    eyebrow: "THIS EXPERIENCE",
    description: "A portfolio designed as a desktop environment, with a resume-grounded HireMe assistant and a retrieval-augmented chat API.",
    stack: ["TypeScript", "React", "Express", "RAG"],
    href: "https://github.com/Kartiksahu03/Kartik-s-portfolio",
    accent: "blue"
  }
];

const skills = [
  { label: "Frontend", values: "React · TypeScript · JavaScript ES6+ · Redux Toolkit · Tailwind CSS · Framer Motion" },
  { label: "Backend", values: "Node.js · Express.js · REST APIs · JWT · Role-based access control" },
  { label: "Data & cloud", values: "MongoDB · Mongoose · MongoDB Atlas · Cloudinary · Vercel · Render" },
  { label: "AI engineering", values: "Groq API · Prompt engineering · Structured JSON · Intent classification · RAG" },
  { label: "Integrations", values: "Razorpay · Web Speech API · Git · GitHub · Postman" }
];

const suggestions = [
  "Give me a quick introduction",
  "Tell me about FrHelp",
  "What AI features have I built?",
  "What are my technical skills?"
];

function WindowShell({ title, subtitle, icon, onClose, children, className = "" }: {
  title: string; subtitle?: string; icon: React.ReactNode; onClose: () => void;
  children: React.ReactNode; className?: string;
}) {
  return (
    <motion.section
      className={`app-window ${className}`}
      initial={{ opacity: 0, y: 12, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.99 }}
      transition={{ duration: 0.2 }}
    >
      <header className="window-bar">
        <div className="traffic-lights">
          <button aria-label="Close window" onClick={onClose}><X size={10} /></button>
          <span><Minus size={10} /></span><span className="green-dot" />
        </div>
        <div className="window-title">{icon}<span>{title}</span></div>
        <div className="window-subtitle">{subtitle}</div>
      </header>
      <div className="window-content">{children}</div>
    </motion.section>
  );
}

export default function App() {
  const [activeWindow, setActiveWindow] = useState<WindowKey | null>("about");
  const [openWindows, setOpenWindows] = useState<WindowKey[]>(["about"]);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hey! 👋 I’m Kartik’s HireMe AI. Ask me about projects, full-stack experience, technical skills, or the AI features he has built. I’ll stick to information available in his professional profile." }
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">("checking");
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    fetch(`${API_BASE}/api/health`).then(r => r.ok ? r.json() : Promise.reject()).then(() => setApiStatus("online")).catch(() => setApiStatus("offline"));
  }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, chatLoading]);

  const openWindow = (key: WindowKey) => {
    setOpenWindows(previous => previous.includes(key) ? previous : [...previous, key]);
    setActiveWindow(key);
  };
  const closeWindow = (key: WindowKey) => {
    setOpenWindows(previous => previous.filter(item => item !== key));
    setActiveWindow(previous => previous === key ? null : previous);
  };

  async function sendMessage(text = chatInput) {
    const message = text.trim();
    if (!message || chatLoading) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: message }];
    setMessages(nextMessages);
    setChatInput("");
    setChatLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: nextMessages.slice(-9, -1) })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The assistant could not answer right now.");
      setMessages(current => [...current, { role: "assistant", content: data.answer }]);
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown network error";
      setMessages(current => [...current, { role: "assistant", content: `I couldn't reach the AI service. ${detail} Check that the backend is running and GROQ_API_KEY is configured.` }]);
    } finally {
      setChatLoading(false);
    }
  }

  const renderWindow = (key: WindowKey) => {
    if (key === "about") return (
      <WindowShell title="About Me" subtitle="~/profile/overview.md" icon={<PanelTop size={14} />} onClose={() => closeWindow(key)} className="about-window">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-pulse" /> AVAILABLE FOR OPPORTUNITIES</div>
          <h1>Building things<br />that <span className="gradient-text">feel useful.</span></h1>
          <p className="hero-lede">Hey, I’m Kartik — a full-stack developer who likes turning complex ideas into fast, thoughtful web experiences.</p>
          <div className="hero-tags"><span>MERN Stack</span><span>AI Integrations</span><span>Product-minded</span></div>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => openWindow("projects")}>Explore projects <MoveUpRight size={15} /></button>
            <button className="secondary-button" onClick={() => openWindow("chat")}><MessageCircle size={15} /> Ask my AI</button>
          </div>
        </div>
        <div className="profile-strip">
          <div className="avatar-mark">KS<span>.</span></div>
          <div><strong>Kartik Sahu</strong><p>Full Stack Developer · Mumbai, India</p></div>
          <span className="profile-chip">MERN + AI</span>
        </div>
        <div className="stats-grid">
          <div><strong>6</strong><span>web apps built</span></div>
          <div><strong>3</strong><span>featured projects</span></div>
          <div><strong>10+</strong><span>AI intent categories</span></div>
        </div>
        <p className="small-note">From API design and data modeling to deployment and post-launch support — I enjoy owning the whole product journey.</p>
      </WindowShell>
    );
    if (key === "projects") return (
      <WindowShell title="Projects" subtitle="~/work/selected" icon={<FolderGit2 size={14} />} onClose={() => closeWindow(key)} className="projects-window">
        <div className="section-intro"><span className="eyebrow">SELECTED WORK</span><h2>Things I’ve shipped<span className="period">.</span></h2><p>A few projects where full-stack engineering meets real-world utility.</p></div>
        <div className="project-list">
          {projects.map((project, index) => <motion.article key={project.name} className={`project-card ${project.accent}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}>
            <div className="project-card-top"><span className="project-index">0{index + 1}</span><span className="project-eyebrow">{project.eyebrow}</span><a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} source code`}><ExternalLink size={15} /></a></div>
            <h3>{project.name}</h3><p>{project.description}</p>
            <div className="project-tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
            <a className="project-link" href={project.href} target="_blank" rel="noreferrer">View source <ChevronRight size={14} /></a>
          </motion.article>)}
        </div>
      </WindowShell>
    );
    if (key === "resume") return (
      <WindowShell title="Resume" subtitle="~/documents/kartik-sahu" icon={<FileText size={14} />} onClose={() => closeWindow(key)} className="resume-window">
        <div className="resume-heading"><div><span className="eyebrow">PROFESSIONAL PROFILE</span><h2>Kartik Sahu</h2><p>Full Stack Developer · Mumbai, India</p></div><a className="icon-action" href="https://github.com/Kartiksahu03" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a></div>
        <div className="resume-section"><h3><BriefcaseBusiness size={15} /> Experience</h3><div className="timeline-item"><div className="timeline-dot" /><div><strong>Full Stack Web Developer (Freelance)</strong><span>Self-employed · Mar 2024 — Oct 2025</span><p>Delivered two client web applications end-to-end, from requirements and MERN development to deployment and post-launch support.</p></div></div></div>
        <div className="resume-section"><h3><FolderGit2 size={15} /> Selected projects</h3>{projects.slice(0,2).map(p => <div className="resume-project" key={p.name}><strong>{p.name}</strong><p>{p.description}</p></div>)}</div>
        <div className="resume-section"><h3><GraduationCap size={15} /> Education</h3><div className="timeline-item"><div className="timeline-dot" /><div><strong>B.E. — Electronics & Telecommunication Engineering</strong><span>Bharati Vidyapeeth College of Engineering · 2022–2026</span><p>University of Mumbai · Ranked 2nd out of 60+ students.</p></div></div></div>
        <div className="resume-download"><div><FileText size={18} /><span><strong>Resume highlights</strong><small>Professional summary based on the supplied resume.</small></span></div><button className="secondary-button" onClick={() => openWindow("chat")}>Ask about my experience <ChevronRight size={14} /></button></div>
      </WindowShell>
    );
    if (key === "stack") return (
      <WindowShell title="Tech Stack" subtitle="~/system/toolbox" icon={<Terminal size={14} />} onClose={() => closeWindow(key)} className="stack-window">
        <div className="section-intro"><span className="eyebrow">TOOLS OF THE TRADE</span><h2>Built with intention<span className="period">.</span></h2><p>Practical technologies used across shipped projects.</p></div>
        <div className="skills-list">{skills.map((skill, i) => <div className="skill-row" key={skill.label}><span className="skill-number">0{i + 1}</span><div><h3>{skill.label}</h3><p>{skill.values}</p></div></div>)}</div>
        <div className="stack-callout"><Cpu size={18} /><div><strong>Currently leaning into AI engineering</strong><p>Retrieval-augmented generation, grounded LLM responses, structured output, and reliable API design.</p></div></div>
      </WindowShell>
    );
    return (
      <WindowShell title="HireMe AI" subtitle="groq · retrieval augmented generation" icon={<Bot size={14} />} onClose={() => closeWindow(key)} className="chat-window">
        <div className="chat-welcome"><div className="ai-orb"><Sparkles size={18} /></div><div><h2>Ask away<span className="period">.</span></h2><p>Answers grounded in Kartik’s resume and project profile.</p></div><span className={`api-pill ${apiStatus}`}><i />{apiStatus === "online" ? "API online" : apiStatus === "checking" ? "Connecting" : "API offline"}</span></div>
        <div className="chat-suggestions">{suggestions.map(item => <button key={item} onClick={() => sendMessage(item)} disabled={chatLoading}>{item}<ChevronRight size={12} /></button>)}</div>
        <div className="messages" aria-live="polite">
          {messages.map((item, i) => <div className={`message-row ${item.role}`} key={i}><div className="message-avatar">{item.role === "assistant" ? <Sparkles size={13} /> : "KS"}</div><div className="message-bubble">{item.content}</div></div>)}
          {chatLoading && <div className="message-row assistant"><div className="message-avatar"><Sparkles size={13} /></div><div className="message-bubble typing"><i /><i /><i /></div></div>}
          <div ref={chatEndRef} />
        </div>
        <form className="chat-form" onSubmit={event => { event.preventDefault(); void sendMessage(); }}>
          <input value={chatInput} onChange={event => setChatInput(event.target.value)} placeholder="Ask about skills, projects, experience…" aria-label="Message the HireMe assistant" maxLength={1200} />
          <button type="submit" disabled={!chatInput.trim() || chatLoading} aria-label="Send message"><Send size={16} /></button>
        </form>
        <p className="chat-footnote"><Sparkles size={11} /> RAG retrieves relevant profile details before the model responds.</p>
      </WindowShell>
    );
  };

  const dockItems: { key: WindowKey; label: string; icon: React.ReactNode; tint: string }[] = [
    { key: "about", label: "About", icon: <Monitor />, tint: "lavender" },
    { key: "projects", label: "Projects", icon: <FolderGit2 />, tint: "orange" },
    { key: "resume", label: "Resume", icon: <FileText />, tint: "blue" },
    { key: "chat", label: "HireMe AI", icon: <Bot />, tint: "pink" },
    { key: "stack", label: "Stack", icon: <Code2 />, tint: "green" }
  ];

  return (
    <main className="desktop">
      <div className="wallpaper-glow glow-one" /><div className="wallpaper-glow glow-two" /><div className="wallpaper-grid" />
      <header className="system-bar"><div className="system-brand"><span className="brand-symbol">k<span>.</span></span><strong>Kartik Sahu</strong><span className="system-divider" />Portfolio OS</div><div className="system-center"><span className="online-indicator" /> Personal workspace</div><div className="system-right"><span>⌘ K</span><span>{new Intl.DateTimeFormat("en", { weekday: "short", month: "short", day: "numeric" }).format(new Date())}</span></div></header>
      <section className="desktop-content">
        <div className="desktop-copy"><span className="desktop-kicker"><Command size={12} /> PERSONAL PORTFOLIO / 2026</span><h1>Hey there.<br /><span>Make yourself</span><br />at home.</h1><p>A little workspace for the things I build, the problems I solve, and the AI assistant that knows my work.</p><button onClick={() => openWindow("chat")} className="desktop-cta"><Sparkles size={15} /> Meet HireMe AI <MoveUpRight size={14} /></button></div>
        <div className="desktop-icons">{dockItems.map(item => <button key={item.key} className="desktop-icon" onDoubleClick={() => openWindow(item.key)} onClick={() => setActiveWindow(item.key)}><span className={`desktop-icon-art ${item.tint}`}>{item.icon}</span><span>{item.label}</span></button>)}</div>
        <div className="desktop-hint"><span className="hint-dot" /> DOUBLE-CLICK AN ICON OR USE THE DOCK</div>
      </section>
      <AnimatePresence mode="sync">
        {activeWindow && openWindows.includes(activeWindow) && <div className={`window-position window-${activeWindow}`} key={activeWindow}>{renderWindow(activeWindow)}</div>}
      </AnimatePresence>
      <nav className="dock" aria-label="Portfolio apps">
        {dockItems.map(item => <button key={item.key} onClick={() => activeWindow === item.key ? closeWindow(item.key) : openWindow(item.key)} className={`dock-item ${activeWindow === item.key ? "selected" : ""}`} title={item.label} aria-label={item.label}><span className={`dock-art ${item.tint}`}>{item.icon}</span><span className="dock-tooltip">{item.label}</span>{openWindows.includes(item.key) && <i className="dock-indicator" />}</button>)}
        <span className="dock-separator" />
        <a className="dock-item" href="https://github.com/Kartiksahu03" target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub"><span className="dock-art neutral"><Github /></span><span className="dock-tooltip">GitHub</span></a>
        <a className="dock-item" href="https://linkedin.com/in/kartik-sahu03" target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn"><span className="dock-art linkedin"><Linkedin /></span><span className="dock-tooltip">LinkedIn</span></a>
      </nav>
      <footer className="desktop-footer"><span>Designed to be explored <span className="footer-heart">✳</span></span><span>React · TypeScript · Node · RAG</span></footer>
    </main>
  );
}
