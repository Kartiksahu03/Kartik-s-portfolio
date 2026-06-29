// ============================================
// ResumeAnalyzer Component
// Two tabs:
//   1. Resume Match Analyzer — paste JD, compare against Kartik's resume
//   2. ATS Score — upload YOUR resume PDF, paste JD, get ATS score
// ============================================

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, XCircle, Lightbulb, Upload, FileText } from 'lucide-react';
import { analyzeResumeAgainstJD } from '../../redux/apis/aiAPI';
import axiosInstance from '../../utils/axiosInstance';

// Animated SVG score gauge
const ScoreGauge = ({ score }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? '#22d3ee' : score >= 50 ? '#fbbf24' : '#f87171';

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#1e2230" strokeWidth="10" />
        <motion.circle
          cx="60" cy="60" r={radius} fill="none"
          stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold" style={{ color }}>{score}</span>
        <span className="text-white/40 text-xs">/ 100</span>
      </div>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="space-y-4 animate-pulse">
    <div className="w-36 h-36 rounded-full bg-white/5 mx-auto" />
    <div className="h-4 bg-white/5 rounded w-1/3 mx-auto" />
    <div className="h-20 bg-white/5 rounded" />
  </div>
);

// ── Tab 1: Match Analyzer (Kartik's resume vs JD) ─────────────────
const MatchAnalyzer = () => {
  const [jd, setJd] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (jd.trim().length < 20) { setError('Please paste a longer job description.'); return; }
    setError(''); setLoading(true); setResult(null);
    try {
      const data = await analyzeResumeAgainstJD(jd);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div>
      <p className="text-white/50 text-sm mb-4 text-center">
        Paste any job description and AI will compare it against Kartik's resume — see exactly how well he matches.
      </p>
      <textarea
        value={jd} onChange={(e) => setJd(e.target.value)}
        placeholder="Paste the job description here..."
        rows={5}
        className="w-full px-5 py-4 rounded-2xl bg-bg-card border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none transition-colors resize-none mb-4"
      />
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      <button
        onClick={handleAnalyze} disabled={loading}
        className="w-full md:w-auto px-8 py-3 rounded-full bg-aurora-gradient text-bg font-semibold hover:scale-105 transition-transform disabled:opacity-60 disabled:hover:scale-100"
      >
        {loading ? 'Analyzing...' : 'Analyze Match'}
      </button>

      {loading && <div className="mt-10"><SkeletonLoader /></div>}

      {result && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mt-10 bg-bg-card border border-white/10 rounded-2xl p-8"
        >
          <ScoreGauge score={result.score} />
          <p className="text-center text-white/50 text-sm mt-2 mb-8">Match Score</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="flex items-center gap-2 text-white font-semibold mb-3">
                <CheckCircle2 size={18} className="text-emerald-400" /> Matching Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.matchingSkills?.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-300 text-xs">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-white font-semibold mb-3">
                <XCircle size={18} className="text-red-400" /> Missing Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills?.length > 0
                  ? result.missingSkills.map((s) => (
                      <span key={s} className="px-3 py-1 rounded-full bg-red-400/10 text-red-300 text-xs">{s}</span>
                    ))
                  : <p className="text-white/30 text-sm">Great match!</p>}
              </div>
            </div>
          </div>
          {result.tips?.length > 0 && (
            <div className="mt-8">
              <h4 className="flex items-center gap-2 text-white font-semibold mb-3">
                <Lightbulb size={18} className="text-cyan-glow" /> Tips
              </h4>
              <ul className="space-y-2">
                {result.tips.map((tip, i) => (
                  <li key={i} className="text-white/60 text-sm flex gap-2">
                    <span className="text-cyan-glow">•</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

// ── Tab 2: ATS Score (upload YOUR resume) ─────────────────────────
const ATSScorer = () => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f && f.type === 'application/pdf') { setFile(f); setError(''); }
    else setError('Please upload a PDF file.');
  };

  const handleScore = async () => {
    if (!file) { setError('Please upload your resume PDF.'); return; }
    if (jd.trim().length < 20) { setError('Please paste a job description.'); return; }
    setError(''); setLoading(true); setResult(null);

    try {
      // Read the PDF as base64 and send to backend for text extraction + AI scoring
      const reader = new FileReader();
      reader.onload = async (ev) => {
        try {
          const base64 = ev.target.result.split(',')[1];
          const res = await axiosInstance.post('/ai/ats-score', {
            resumeBase64: base64,
            jobDescription: jd,
          });
          setResult(res.data);
        } catch (err) {
          setError(err.response?.data?.message || 'ATS scoring failed. Please try again.');
        } finally { setLoading(false); }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to read the file. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-white/50 text-sm mb-6 text-center">
        Upload your own resume PDF and paste a job description — get an ATS compatibility score with actionable feedback.
      </p>

      {/* Upload zone */}
      <div
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors mb-4 ${
          file ? 'border-cyan-glow/60 bg-cyan-glow/5' : 'border-white/20 hover:border-cyan-glow/40'
        }`}
      >
        <input ref={fileRef} type="file" accept=".pdf" onChange={handleFile} className="hidden" />
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <FileText size={24} className="text-cyan-glow" />
            <span className="text-white font-medium">{file.name}</span>
          </div>
        ) : (
          <>
            <Upload size={32} className="text-white/30 mx-auto mb-2" />
            <p className="text-white/50 text-sm">Click to upload your resume PDF</p>
            <p className="text-white/30 text-xs mt-1">PDF only, max 5MB</p>
          </>
        )}
      </div>

      <textarea
        value={jd} onChange={(e) => setJd(e.target.value)}
        placeholder="Paste the job description here..."
        rows={5}
        className="w-full px-5 py-4 rounded-2xl bg-bg-card border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none transition-colors resize-none mb-4"
      />
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <button
        onClick={handleScore} disabled={loading}
        className="w-full md:w-auto px-8 py-3 rounded-full bg-aurora-gradient text-bg font-semibold hover:scale-105 transition-transform disabled:opacity-60"
      >
        {loading ? 'Scoring...' : 'Get ATS Score'}
      </button>

      {loading && <div className="mt-10"><SkeletonLoader /></div>}

      {result && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mt-10 bg-bg-card border border-white/10 rounded-2xl p-8"
        >
          <ScoreGauge score={result.score} />
          <p className="text-center text-white/50 text-sm mt-2 mb-2">ATS Compatibility Score</p>
          <p className="text-center text-xs text-white/30 mb-8">
            {result.score >= 75 ? '✅ Strong ATS match' : result.score >= 50 ? '⚠️ Moderate match — see tips below' : '❌ Needs improvement — see tips below'}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="flex items-center gap-2 text-white font-semibold mb-3">
                <CheckCircle2 size={18} className="text-emerald-400" /> Keywords Found
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.matchingSkills?.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full bg-emerald-400/10 text-emerald-300 text-xs">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-white font-semibold mb-3">
                <XCircle size={18} className="text-red-400" /> Missing Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills?.length > 0
                  ? result.missingSkills.map((s) => (
                      <span key={s} className="px-3 py-1 rounded-full bg-red-400/10 text-red-300 text-xs">{s}</span>
                    ))
                  : <p className="text-white/30 text-sm">All keywords matched!</p>}
              </div>
            </div>
          </div>
          {result.tips?.length > 0 && (
            <div className="mt-8">
              <h4 className="flex items-center gap-2 text-white font-semibold mb-3">
                <Lightbulb size={18} className="text-cyan-glow" /> ATS Improvement Tips
              </h4>
              <ul className="space-y-2">
                {result.tips.map((tip, i) => (
                  <li key={i} className="text-white/60 text-sm flex gap-2">
                    <span className="text-cyan-glow">•</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

// ── Main ResumeAnalyzer with two tabs ─────────────────────────────
const ResumeAnalyzer = () => {
  const [activeTab, setActiveTab] = useState('match');

  return (
    <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <p className="section-label mb-3">AI-Powered Tools</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center gap-3">
          <Sparkles className="text-cyan-glow" /> Resume Analyzer
        </h2>
      </div>

      {/* Tab switcher */}
      <div className="flex justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveTab('match')}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'match' ? 'bg-aurora-gradient text-bg' : 'bg-bg-card border border-white/10 text-white/60 hover:text-white'
          }`}
        >
          Match Analyzer (Kartik's Resume)
        </button>
        <button
          onClick={() => setActiveTab('ats')}
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
            activeTab === 'ats' ? 'bg-aurora-gradient text-bg' : 'bg-bg-card border border-white/10 text-white/60 hover:text-white'
          }`}
        >
          ATS Score (Your Resume)
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'match' ? <MatchAnalyzer /> : <ATSScorer />}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default ResumeAnalyzer;
