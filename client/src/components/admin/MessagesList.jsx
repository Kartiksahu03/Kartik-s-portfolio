// ============================================
// MessagesList Component
// Shows contact form submissions in the admin dashboard
// ============================================

import { useEffect, useState } from 'react';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import Loader from '../common/Loader';

const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/contact');
      setMessages(res.data.messages);
    } catch (err) {
      console.error('Failed to load messages', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await axiosInstance.delete(`/contact/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error('Failed to delete message', err);
    }
  };

  if (loading) return <Loader />;

  if (messages.length === 0) {
    return <p className="text-white/40 text-center py-10">No messages yet.</p>;
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div
          key={msg._id}
          className="bg-bg-card border border-white/10 rounded-xl p-5 flex items-start justify-between gap-4"
        >
          <div className="flex gap-3">
            {msg.read ? (
              <MailOpen size={18} className="text-white/30 mt-1" />
            ) : (
              <Mail size={18} className="text-cyan-glow mt-1" />
            )}
            <div>
              <p className="text-white font-medium">
                {msg.name} <span className="text-white/40 font-normal">({msg.email})</span>
              </p>
              <p className="text-white/50 text-sm mt-1">{msg.subject}</p>
              <p className="text-white/70 text-sm mt-2">{msg.message}</p>
              <p className="text-white/30 text-xs mt-2">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <button
            onClick={() => handleDelete(msg._id)}
            className="text-white/30 hover:text-red-400 transition-colors flex-shrink-0"
            aria-label="Delete message"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MessagesList;
