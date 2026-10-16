<div align="center">

# Kartik Sahu — Developer Portfolio

**A desktop-inspired portfolio with a resume-grounded HireMe AI assistant.**

React · TypeScript · Vite · Node.js · Express · Groq · RAG

[Live portfolio](https://kartik-s-portfolio-tau.vercel.app) · [GitHub profile](https://github.com/Kartiksahu03) · [LinkedIn](https://linkedin.com/in/kartik-sahu03)

</div>

## ✨ What’s inside

- **Interactive desktop UI:** glassmorphism windows, dock navigation, animated project cards, and responsive layout.
- **HireMe AI:** ask questions about projects, technical skills, freelance experience, and education.
- **Retrieval-augmented generation:** retrieves relevant professional-profile passages before asking Groq to generate an answer.
- **TypeScript React:** typed UI, state, and chat message models.
- **Express API:** request validation with Zod, CORS configuration, API health endpoint, and server-side secrets.
- **Optional local resume PDF:** if you provide a local `resume.pdf`, the server extracts its text at startup and retrieves relevant snippets. The PDF is ignored by Git.

## 🧰 Stack

| Area | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite, Framer Motion, Lucide |
| Backend | Node.js, Express, JavaScript, Zod |
| AI | Groq Chat Completions, grounded prompts |
| Retrieval | Local lexical scoring over professional-profile chunks |
| PDF | pdf-parse (optional local resume file) |

**RAG note:** this version uses lightweight local lexical retrieval rather than a hosted vector database or embedding model. Retrieved text is supplied to the LLM as context. This keeps the demo quick to install and makes the retrieval pipeline easy to understand; an embedding-based vector index can be added later.

## 🚀 Run locally

Requires a current Node.js LTS release and npm.

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/Kartiksahu03/Kartik-s-portfolio.git
   cd Kartik-s-portfolio
   npm install
   ```

2. Create your local environment file:

   ```bash
   cp .env.example .env
   ```

3. Add a Groq API key to `.env`. Keep it private. Optionally place your resume PDF at `./resume.pdf`; this file is excluded from Git.

   ```dotenv
   GROQ_API_KEY=your_real_groq_api_key
   GROQ_MODEL=openai/gpt-oss-120b
   PORT=5000
   CLIENT_ORIGIN=http://localhost:5173
   RESUME_PDF_PATH=./resume.pdf
   ```

4. Start both frontend and backend:

   ```bash
   npm run dev
   ```

5. Open http://localhost:5173. The frontend proxies `/api` requests to Express on port 5000.

If you do not provide `resume.pdf`, the chatbot still works with the curated professional profile in `backend.js`. Do not commit the original resume if it contains personal contact information.

## 🔐 Security basics

- Never put `GROQ_API_KEY` in frontend code or a `VITE_*` environment variable.
- `.env` and `resume.pdf` are excluded from version control.
- The API validates request shape and caps message/history sizes. For a public deployment, add rate limiting and stricter production CORS rules.

## 🌐 Deployment

The frontend uses Vite's development proxy for local API calls. Production hosting needs a separately deployed Express API or a serverless API adapter, plus a production API URL configured in the frontend. Set `CLIENT_ORIGIN` to the exact frontend origin and add `GROQ_API_KEY` through the backend host's secret settings. Do not commit the real key.

## 📌 Profile accuracy

Project details and experience are based on the resume supplied for this project. TypeScript and retrieval are implementation technologies in this portfolio; this code does not claim they were prior professional experience.
