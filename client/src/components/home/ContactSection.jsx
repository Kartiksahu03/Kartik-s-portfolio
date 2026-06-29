// ============================================
// ContactSection Component — Kartik Sahu
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, MapPin, Mail, Github } from 'lucide-react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../utils/axiosInstance';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { showToast } from '../../redux/slices/uiSlice';

const ContactSection = () => {
  const dispatch = useDispatch();
  const [ref, isVisible] = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axiosInstance.post('/contact', formData);
      dispatch(showToast({ message: 'Message sent! I will get back to you soon 🙌', type: 'success' }));
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      dispatch(
        showToast({
          message: error.response?.data?.message || 'Something went wrong. Please try again.',
          type: 'error',
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-4xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        {/* Catchy heading above the section */}
        <div className="text-center mb-12">
          <p className="text-white/50 text-base font-medium mb-3">
            Got a project idea? Looking to hire?{' '}
            <span className="gradient-text font-bold">Kartik</span> is ready to build. ✨
          </p>
          <p className="section-label mb-3">Let's talk</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Get In Touch</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Whether it's a full-time role, internship, freelance project, or just a conversation
            about tech — my inbox is always open.
          </p>
        </div>

        {/* Info cards + form side by side */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Quick contact info */}
          <div className="space-y-4">
            <div className="bg-bg-card border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-cyan-glow/40 transition-colors">
              <Mail size={22} className="text-cyan-glow flex-shrink-0" />
              <div>
                <p className="text-white/40 text-xs">Email</p>
                <p className="text-white text-sm break-all">kartiksahu3114@gmail.com</p>
              </div>
            </div>
            <div className="bg-bg-card border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-cyan-glow/40 transition-colors">
              <Github size={22} className="text-cyan-glow flex-shrink-0" />
              <div>
                <p className="text-white/40 text-xs">GitHub</p>
                <p className="text-white text-sm">@Kartiksahu03</p>
              </div>
            </div>
            <div className="bg-bg-card border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-cyan-glow/40 transition-colors">
              <MapPin size={22} className="text-cyan-glow flex-shrink-0" />
              <div>
                <p className="text-white/40 text-xs">Location</p>
                <p className="text-white text-sm">India 🇮🇳</p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 rounded-xl bg-bg-card border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 rounded-xl bg-bg-card border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none transition-colors"
              />
            </div>

            <input
              type="text"
              name="subject"
              placeholder="Subject (e.g. Job Opportunity, Freelance Project)"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-bg-card border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none transition-colors"
            />

            <textarea
              name="message"
              placeholder="Your Message..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-5 py-3 rounded-xl bg-bg-card border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none transition-colors resize-none"
            />

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-aurora-gradient text-bg font-semibold hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
