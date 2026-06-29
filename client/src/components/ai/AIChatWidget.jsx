// ============================================
// AIChatWidget Component
// Floating chat button (bottom-right) that opens a panel powered by Groq AI
// Visitors can ask questions about Kartik and get answered from his resume context
// ============================================

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { sendChatMessage } from '../../redux/apis/aiAPI';

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: "Hey! 👋 I'm Kartik's AI assistant. Ask me anything about his projects, skills, or background — I'm happy to help! 🚀",
};

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  // Auto-scroll to the latest message whenever the conversation updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const newMessages = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      // Only send role/content pairs to the backend (strip out any extra UI fields)
      const apiMessages = newMessages.map(({ role, content }) => ({ role, content }));
      const reply = await sendChatMessage(apiMessages);

      // Check if the AI included a navigation action at the end of its reply
      let displayReply = reply;
      const actionMatch = reply.match(/\{"action":\s*"NAVIGATE",\s*"path":\s*"([^"]+)"\}/);

      if (actionMatch) {
        displayReply = reply.replace(actionMatch[0], '').trim();
        const path = actionMatch[1];

        setTimeout(() => {
          if (path.startsWith('/#')) {
            navigate('/');
            setTimeout(() => {
              document.getElementById(path.slice(2))?.scrollIntoView({ behavior: 'smooth' });
            }, 300);
          } else {
            navigate(path);
          }
        }, 600);
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: displayReply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I'm having trouble responding right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-aurora-gradient flex items-center justify-center shadow-glow-cyan hover:scale-110 transition-transform"
        aria-label="Toggle AI chat"
      >
        {isOpen ? <X size={24} className="text-bg" /> : <MessageCircle size={24} className="text-bg" />}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-sm h-[28rem] bg-bg-card border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-aurora-gradient">
              <Sparkles size={18} className="text-bg" />
              <p className="text-bg font-semibold text-sm">Ask Kartik's AI</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-violet-glow/20 text-white rounded-br-sm'
                        : 'bg-cyan-glow/10 text-white/90 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-cyan-glow/10 px-4 py-2.5 rounded-2xl rounded-bl-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-cyan-glow rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-glow rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-cyan-glow rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="flex gap-2 p-3 border-t border-white/10">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-2 rounded-full bg-bg border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:border-cyan-glow"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-aurora-gradient text-bg disabled:opacity-50"
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
