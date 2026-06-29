// ============================================
// AI Controller (Groq)
// Powers the portfolio chatbot and the JD-vs-resume analyzer
// ============================================

const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

// ------------------------------------------------------------------
// KARTIK SAHU'S REAL RESUME — used by the AI chatbot and resume analyzer
// ------------------------------------------------------------------
const RESUME_TEXT = `
Name: Kartik Sahu
GitHub: https://github.com/Kartiksahu03
Email: kartiksahu3114@gmail.com
Location: India
Status: B.Tech Graduate (Electronics & Telecom Engineering), actively looking for Full Stack Developer roles and internships

Education:
- B.Tech in Electronics & Telecommunication Engineering — recently graduated (2025)

Experience:
- Freelance Web Developer — independently delivered a real-world web project for a client end-to-end, without supervision
- No formal full-time employment yet (fresher), but 5+ real production projects shipped

Key Projects:
1. FrHelp (Major Project) — Full Stack MERN healthcare and edtech platform. Features: JWT Authentication, OTP Verification, Role-Based Access Control (Student/Instructor/Admin), Course Management, Payment Integration, AI Learning Assistant powered by LLMs. Deployed on Vercel (frontend) and Render (backend) with MongoDB Atlas. GitHub: https://github.com/Kartiksahu03
2. Ecomzy (Shopping Cart) — React + Redux Toolkit e-commerce cart app. Real product data from FakeStore API, add/remove cart, live cart summary. GitHub: https://github.com/Kartiksahu03/Shopping-cart
3. Random GIF Finder — React + Giphy API, custom hooks for async API calls, category-based GIF search. GitHub: https://github.com/Kartiksahu03/Random-gif-finder
4. DevDetective (GitHub Profile Finder) — HTML/CSS/JavaScript + GitHub REST API, search any GitHub user and see their stats, dark/light mode. GitHub: https://github.com/Kartiksahu03/github-profile-finder
5. Auth System (Protected Routes) — React + React Router + JWT, login/signup, protected routes, persistent auth state. GitHub: https://github.com/Kartiksahu03/react-router

Tech Stack:
Frontend: React.js, Redux Toolkit, React Router, Tailwind CSS, JavaScript (ES6+), HTML5, CSS3
Backend: Node.js, Express.js, JWT, REST APIs, Mongoose
Database: MongoDB Atlas
AI: Groq API, LLM Integration
Tools: Git, GitHub, Vite
Deployment: Vercel, Render

Looking for:
Full Stack Developer roles, React Developer roles, MERN Stack internships, any software development opportunity in India or remote.
`;

const PORTFOLIO_SYSTEM_PROMPT = `You are a friendly, concise AI assistant embedded in Kartik Sahu's portfolio website.
Answer visitor questions ONLY using the information below. If asked something you don't know, say you're not sure and suggest they use the contact form.
Keep answers short (2-4 sentences) and conversational. Do not invent facts not present below.

--- KARTIK'S INFO ---
${RESUME_TEXT}
--- END INFO ---

If the visitor's message implies they want to see something on the page (e.g. "show me your projects", "I want to see your skills"), include this exact JSON on its own line at the end of your reply:
{"action": "NAVIGATE", "path": "/projects"}
Valid paths: "/projects", "/blog", "/#skills", "/#contact", "/resume"
Only include the action JSON when navigation is clearly relevant — most replies should NOT include it.`;

// @route   POST /api/ai/chat
// @access  Public
const portfolioChat = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'messages array is required',
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'GROQ_API_KEY is not configured on the server',
      });
    }

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [{ role: 'system', content: PORTFOLIO_SYSTEM_PROMPT }, ...messages],
      temperature: 0.6,
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content || '';

    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error('🔥 Groq chat error:', error.message);
    res.status(500).json({
      success: false,
      message: 'AI chat request failed',
      error: error.message,
    });
  }
};

// @route   POST /api/ai/analyze
// @access  Public
const analyzeResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || jobDescription.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid job description (at least 20 characters)',
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'GROQ_API_KEY is not configured on the server',
      });
    }

    const analyzerSystemPrompt = `You are an expert technical recruiter. Compare the candidate's resume below against the job description the user provides.
Respond with ONLY valid JSON, no markdown fences, no extra text, in exactly this shape:
{"score": <number 0-100>, "matchingSkills": [<strings>], "missingSkills": [<strings>], "tips": [<strings, 2-5 actionable tips>]}

--- CANDIDATE RESUME ---
${RESUME_TEXT}
--- END RESUME ---`;

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: analyzerSystemPrompt },
        { role: 'user', content: `Job Description:\n${jobDescription}` },
      ],
      temperature: 0.3,
      max_tokens: 700,
      response_format: { type: 'json_object' },
    });

    const rawContent = completion.choices[0]?.message?.content || '{}';

    let parsed;
    try {
      parsed = JSON.parse(rawContent);
    } catch (parseError) {
      return res.status(502).json({
        success: false,
        message: 'AI returned an unparseable response. Please try again.',
      });
    }

    res.status(200).json({
      success: true,
      score: parsed.score ?? 0,
      matchingSkills: parsed.matchingSkills ?? [],
      missingSkills: parsed.missingSkills ?? [],
      tips: parsed.tips ?? [],
    });
  } catch (error) {
    console.error('🔥 Groq analyze error:', error.message);
    res.status(500).json({
      success: false,
      message: 'AI resume analysis failed',
      error: error.message,
    });
  }
};

module.exports = { portfolioChat, analyzeResume, atsScore };

// @route   POST /api/ai/ats-score
// @access  Public
// Accepts a base64-encoded PDF resume + job description
// Extracts text from PDF and scores ATS compatibility
async function atsScore(req, res) {
  try {
    const { resumeBase64, jobDescription } = req.body;

    if (!resumeBase64) {
      return res.status(400).json({ success: false, message: 'Resume PDF is required' });
    }
    if (!jobDescription || jobDescription.trim().length < 20) {
      return res.status(400).json({ success: false, message: 'Please provide a valid job description' });
    }

    // Decode base64 to buffer and extract text using a simple approach
    // We'll send the PDF content to Groq as text context (base64 inline)
    // For simplicity: extract readable ASCII text from base64-decoded PDF
    const pdfBuffer = Buffer.from(resumeBase64, 'base64');
    // Extract printable ASCII text from the PDF buffer (catches most text-layer PDFs)
    const rawText = pdfBuffer.toString('latin1').replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ').slice(0, 4000);

    const atsSystemPrompt = `You are an expert ATS (Applicant Tracking System) analyst and recruiter.
You will receive:
1. A candidate's resume (extracted text may be imperfect due to PDF parsing)
2. A job description

Analyze how well the resume matches the job description for ATS compatibility.
Respond with ONLY valid JSON in exactly this shape:
{"score": <number 0-100>, "matchingSkills": [<matched keywords>], "missingSkills": [<important missing keywords>], "tips": [<3-5 specific ATS improvement tips>]}

Score meaning: 0-40 = poor, 41-70 = moderate, 71-100 = strong ATS match.`;

    const completion = await groq.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: atsSystemPrompt },
        { role: 'user', content: `RESUME TEXT:\n${rawText}\n\nJOB DESCRIPTION:\n${jobDescription}` },
      ],
      temperature: 0.3,
      max_tokens: 800,
      response_format: { type: 'json_object' },
    });

    const rawContent = completion.choices[0]?.message?.content || '{}';

    let parsed;
    try {
      parsed = JSON.parse(rawContent);
    } catch {
      return res.status(502).json({ success: false, message: 'AI returned an unparseable response. Please try again.' });
    }

    res.status(200).json({
      success: true,
      score: parsed.score ?? 0,
      matchingSkills: parsed.matchingSkills ?? [],
      missingSkills: parsed.missingSkills ?? [],
      tips: parsed.tips ?? [],
    });
  } catch (error) {
    console.error('🔥 Groq ATS score error:', error.message);
    res.status(500).json({ success: false, message: 'ATS scoring failed', error: error.message });
  }
}
