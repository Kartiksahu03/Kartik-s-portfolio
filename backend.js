require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("node:fs/promises");
const path = require("node:path");
const pdf = require("pdf-parse");
const Groq = require("groq-sdk");
const { z } = require("zod");

const app = express();
const PORT = Number(process.env.PORT || 5000);
const MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
const client = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "32kb" }));

const profileDocuments = [
  {
    source: "professional summary",
    text: "Kartik Sahu is a full-stack developer specializing in the MERN stack: MongoDB, Express.js, React.js, and Node.js. He has hands-on experience integrating LLMs using the Groq API, prompt engineering, structured JSON outputs, and Razorpay payments. He has built and deployed six production-grade web applications, including freelance client projects and an AI-powered EdTech platform, and has worked across requirements, development, deployment, and support."
  },
  {
    source: "technical skills",
    text: "Languages: JavaScript ES6+, HTML5, CSS3, SQL. Frontend: React.js, Redux Toolkit, Tailwind CSS, Framer Motion, Recharts, responsive design, REST API integration. Backend: Node.js, Express.js, RESTful API design, JWT authentication, role-based access control. Data and cloud: MongoDB, MongoDB Atlas, Mongoose, schema design, data modeling, Cloudinary, Vercel, Render. AI and LLM: Groq API integration, prompt engineering, structured JSON output, intent classification, LLM-based document evaluation, AI chatbots. Integrations and tools: Razorpay, Web Speech API, Git, GitHub, Postman, debugging. TypeScript and RAG are technologies used to implement this portfolio, not claimed as prior professional experience."
  },
  {
    source: "freelance experience",
    text: "Full Stack Web Developer, freelance, self-employed, Mumbai, India, March 2024 to October 2025. Delivered two production client web applications end-to-end, owning requirements gathering, MERN development with React, Node, Express, and MongoDB, deployment, and post-launch support. Kept both applications live through the engagement using Vercel, Render, and MongoDB Atlas, handling environment configuration, debugging, and client feedback."
  },
  {
    source: "FrHelp project",
    text: "FrHelp is an AI-powered EdTech platform built with React, Node.js, Express.js, MongoDB Atlas, Redux Toolkit, JWT, Razorpay, Groq AI, Cloudinary, Vercel, and Render. It includes more than 100 courses, enrollment, progress tracking, and three roles: Student, Instructor, and Admin. It uses MongoDB data models for users, courses, and enrollments, protects 15+ routes with JWT authentication and authorization middleware, integrates Razorpay order creation and payment verification with automated enrollment, and includes a Groq-powered assistant using prompt-designed intent classification across 10+ user intent categories. Source: https://github.com/Kartiksahu03/Frhelp-Hosting"
  },
  {
    source: "Paisa project",
    text: "Paisa is an AI-powered expense tracker using React, Redux Toolkit, Framer Motion, Recharts, Node.js, Express.js, MongoDB Atlas, JWT, Groq AI, and Web Speech API. It supports natural-language and voice-driven transaction entry, with Groq returning structured JSON fields for transaction type, amount, and category, distinguishing inflows from outflows. Its context-aware finance assistant grounds answers in live user data such as monthly totals, category breakdowns, and budget limits. It also provides analytics charts, budget-limit alerts, CSV export, and a responsive dashboard. Source: https://github.com/Kartiksahu03/paisa-expense-tracker"
  },
  {
    source: "portfolio project",
    text: "Kartik's portfolio is a deployed developer portfolio featuring an LLM-powered chatbot for visitor questions and an ATS resume scorer that evaluates resumes against job descriptions using prompt-engineered LLM analysis. The current codebase adds a TypeScript React interface and a retrieval-augmented HireMe assistant."
  },
  {
    source: "education",
    text: "Kartik Sahu studied B.E. in Electronics and Telecommunication Engineering at Bharati Vidyapeeth College of Engineering, Navi Mumbai, University of Mumbai, from November 2022 to June 2026. He ranked second out of more than 60 students."
  }
];

const tokenize = (text) => (text.toLowerCase().match(/[a-z0-9+#.-]+/g) || [])
  .filter(token => token.length > 1);
const STOP_WORDS = new Set(["the", "and", "for", "with", "what", "how", "about", "does", "did", "have", "has", "his", "him", "can", "tell", "give", "from", "that", "this", "are", "was", "were", "you", "your", "into", "built", "project"]);

function retrieveContext(question, limit = 4) {
  const queryTokens = [...new Set(tokenize(question).filter(token => !STOP_WORDS.has(token)))];
  const docs = profileDocuments.map(doc => {
    const tokens = tokenize(doc.text);
    const frequencies = new Map();
    for (const token of tokens) frequencies.set(token, (frequencies.get(token) || 0) + 1);
    const score = queryTokens.reduce((sum, token) => {
      const frequency = frequencies.get(token) || 0;
      if (!frequency) return sum;
      const tf = frequency / Math.max(tokens.length, 1);
      const lengthBoost = token.length >= 5 ? 1.25 : 1;
      return sum + tf * lengthBoost * (Math.log(1 + tokens.length / (frequency + 0.5)));
    }, 0);
    return { ...doc, score };
  });
  const selected = docs.sort((a, b) => b.score - a.score).slice(0, limit);
  return selected.filter(doc => doc.score > 0).map(doc => `[Source: ${doc.source}]\n${doc.text}`).join("\n\n");
}

async function loadResumeContext() {
  const configuredPath = process.env.RESUME_PDF_PATH || "./resume.pdf";
  const absolutePath = path.resolve(process.cwd(), configuredPath);
  try {
    const buffer = await fs.readFile(absolutePath);
    const parsed = await pdf(buffer);
    if (parsed.text && parsed.text.trim().length > 200) {
      return { source: path.basename(configuredPath), text: parsed.text.trim().slice(0, 24000) };
    }
  } catch (error) {
    if (error.code !== "ENOENT") console.warn("Resume PDF could not be parsed:", error.message);
  }
  return null;
}

let resumeDocument = null;
async function getRetrievedContext(question) {
  const baseContext = retrieveContext(question);
  const resume = resumeDocument;
  if (!resume) return baseContext;
  // The attached resume is parsed locally at startup; relevant snippets are ranked with the same lightweight retrieval.
  const resumeChunks = resume.text.match(/[^\n]{1,900}(?:\n|$)/g) || [];
  const qTokens = new Set(tokenize(question));
  const rankedChunks = resumeChunks.map(text => {
    const tokens = tokenize(text);
    const score = tokens.reduce((sum, token) => sum + (qTokens.has(token) ? 1 : 0), 0) / Math.sqrt(tokens.length + 1);
    return { text: text.trim(), score };
  }).filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);
  const resumeContext = rankedChunks.length
    ? `[Source: local resume PDF]\n${rankedChunks.map(item => item.text).join("\n")}`
    : "";
  return [baseContext, resumeContext].filter(Boolean).join("\n\n");
}

const chatSchema = z.object({
  message: z.string().trim().min(1).max(1200),
  history: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().max(2000)
  })).max(8).optional().default([])
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, aiConfigured: Boolean(client), resumeLoaded: Boolean(resumeDocument), retrieval: "local lexical retrieval + Groq generation" });
});

app.post("/api/chat", async (req, res) => {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Please send a message under 1,200 characters." });
  if (!client) return res.status(503).json({ error: "AI service is not configured. Add GROQ_API_KEY to your local .env file and restart the backend." });

  try {
    const { message, history } = parsed.data;
    const context = await getRetrievedContext(message);
    if (!context) return res.json({ answer: "I couldn’t find relevant information about that in Kartik’s professional profile. Try asking about his skills, projects, experience, or education." });
    const completion = await client.chat.completions.create({
      model: MODEL,
      temperature: 0.2,
      max_tokens: 650,
      messages: [
        {
          role: "system",
          content: `You are HireMe AI, a helpful, professional portfolio assistant representing developer Kartik Sahu. Answer recruiters and visitors using only the retrieved context below. Do not invent employers, dates, qualifications, metrics, responsibilities, links, or technologies. If the context does not support a detail, say you don't have that information. Keep answers concise, clear, and recruiter-friendly. You may explain the implementation of this portfolio as shown in context, but do not claim its TypeScript/RAG implementation was prior work experience. Do not expose private contact details. If asked something unrelated to Kartik's professional profile, politely steer the conversation back.\n\nRETRIEVED CONTEXT:\n${context}`
        },
        ...history.slice(-6).map(item => ({ role: item.role, content: item.content })),
        { role: "user", content: message }
      ]
    });
    const answer = completion.choices?.[0]?.message?.content?.trim();
    if (!answer) throw new Error("The model returned an empty response.");
    res.json({ answer, sources: context.split("\n").filter(line => line.startsWith("[Source:")).map(line => line.replace(/^\[Source: |\]$/g, "")) });
  } catch (error) {
    console.error("Chat request failed:", error.message);
    res.status(502).json({ error: "The AI request failed. Check your Groq API key, model access, and network connection." });
  }
});

async function start() {
  resumeDocument = await loadResumeContext();
  if (resumeDocument) console.log(`Loaded local resume PDF: ${resumeDocument.source}`);
  else console.log("No local resume.pdf found; using the professional profile embedded in backend.js.");
  app.listen(PORT, () => console.log(`HireMe API listening on http://localhost:${PORT}`));
}
start();