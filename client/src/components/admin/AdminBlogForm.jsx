// ============================================
// AdminBlogForm Component
// Form to create/edit a blog post — includes a simple markdown live preview
// ============================================

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { X, Eye, Edit3 } from 'lucide-react';
import { createBlog, updateBlog } from '../../redux/slices/blogSlice';

const AdminBlogForm = ({ blog, onClose }) => {
  const dispatch = useDispatch();
  const isEditing = Boolean(blog);

  const [title, setTitle] = useState(blog?.title || '');
  const [body, setBody] = useState(blog?.body || '');
  const [tagsInput, setTagsInput] = useState(blog?.tags?.join(', ') || '');
  const [coverImage, setCoverImage] = useState(blog?.coverImage || '');
  const [published, setPublished] = useState(blog?.published || false);
  const [showPreview, setShowPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    const payload = {
      title,
      body,
      coverImage,
      published,
      tags: tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (isEditing) {
        await dispatch(updateBlog({ id: blog._id, data: payload })).unwrap();
      } else {
        await dispatch(createBlog(payload)).unwrap();
      }
      onClose();
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to save blog post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-bg-card border border-white/10 rounded-2xl p-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {isEditing ? 'Edit Blog Post' : 'New Blog Post'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg bg-bg border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none"
          />

          <input
            type="url"
            placeholder="Cover image URL (optional)"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-bg border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none"
          />

          <input
            type="text"
            placeholder="Tags, comma separated (e.g. react, mern, ai)"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-bg border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none"
          />

          {/* Markdown editor / preview toggle */}
          <div className="flex gap-2 mb-1">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                !showPreview ? 'bg-cyan-glow/20 text-cyan-glow' : 'text-white/40'
              }`}
            >
              <Edit3 size={14} /> Write
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                showPreview ? 'bg-cyan-glow/20 text-cyan-glow' : 'text-white/40'
              }`}
            >
              <Eye size={14} /> Preview
            </button>
          </div>

          {showPreview ? (
            <div className="min-h-[220px] px-4 py-3 rounded-lg bg-bg border border-white/10 prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{body || '*Nothing to preview yet...*'}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              placeholder="Write your post in markdown..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={10}
              className="w-full px-4 py-3 rounded-lg bg-bg border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none resize-none font-mono text-sm"
            />
          )}

          <label className="flex items-center gap-2 text-white/70 text-sm">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 accent-cyan-500"
            />
            Publish immediately
          </label>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-aurora-gradient text-bg font-semibold hover:scale-[1.01] transition-transform disabled:opacity-60"
          >
            {submitting ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminBlogForm;
