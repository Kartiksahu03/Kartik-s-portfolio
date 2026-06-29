// ============================================
// AdminProjectForm — Add / Edit a Project
// Fields: Title, Description, Category, Tech Stack, Thumbnail, GitHub, Live URL, Featured
// ============================================

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { X, Upload, Loader2, Github, ExternalLink, Image } from 'lucide-react';
import { createProject, updateProject } from '../../redux/slices/projectSlice';
import axiosInstance from '../../utils/axiosInstance';
import { PROJECT_CATEGORIES } from '../../utils/constants';

const EMPTY = {
  title: '', description: '', longDesc: '',
  category: 'MERN Stack', liveUrl: '', githubUrl: '', featured: false, thumbnail: '',
};

const AdminProjectForm = ({ project, onClose }) => {
  const dispatch = useDispatch();
  const isEditing = Boolean(project);

  const [form, setForm] = useState(
    project
      ? { title: project.title || '', description: project.description || '', longDesc: project.longDesc || '',
          category: project.category || 'MERN Stack', liveUrl: project.liveUrl || '',
          githubUrl: project.githubUrl || '', featured: project.featured || false, thumbnail: project.thumbnail || '' }
      : EMPTY
  );
  const [techStack, setTechStack] = useState(project?.techStack || []);
  const [techInput, setTechInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleTechKey = (e) => {
    if (e.key === 'Enter' && techInput.trim()) {
      e.preventDefault();
      if (!techStack.includes(techInput.trim())) setTechStack([...techStack, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setUploadError('Only image files allowed.'); return; }
    if (file.size > 5 * 1024 * 1024) { setUploadError('Image must be under 5MB.'); return; }

    setUploadError('');
    setUploading(true);
    try {
      const data = new FormData();
      data.append('image', file);
      const res = await axiosInstance.post('/upload/image', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setForm((prev) => ({ ...prev, thumbnail: res.data.url }));
    } catch (err) {
      setUploadError(err.response?.data?.message || 'Upload failed. Check Cloudinary settings in .env.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Title is required.'); return; }
    if (!form.description.trim()) { setError('Short description is required.'); return; }

    setSubmitting(true);
    setError('');
    const payload = { ...form, techStack };

    try {
      if (isEditing) {
        await dispatch(updateProject({ id: project._id, data: payload })).unwrap();
      } else {
        await dispatch(createProject(payload)).unwrap();
      }
      onClose();
    } catch (err) {
      setError(typeof err === 'string' ? err : 'Failed to save. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-bg-card border border-white/10 rounded-2xl">

        {/* Header */}
        <div className="sticky top-0 bg-bg-card border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? `Edit: ${project.title}` : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Thumbnail upload — most important, put it first */}
          <div>
            <label className="block text-white/60 text-sm mb-2 font-medium">
              Project Thumbnail / Screenshot
            </label>
            <div className="grid md:grid-cols-2 gap-4 items-start">
              {/* Upload button */}
              <label className={`flex flex-col items-center justify-center gap-2 h-32 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
                uploading ? 'border-cyan-glow/40 bg-cyan-glow/5' : 'border-white/20 hover:border-cyan-glow/50 hover:bg-white/5'
              }`}>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                {uploading ? (
                  <>
                    <Loader2 size={24} className="text-cyan-glow animate-spin" />
                    <span className="text-white/50 text-xs">Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload size={24} className="text-white/40" />
                    <span className="text-white/50 text-xs text-center">
                      Click to upload image<br />
                      <span className="text-white/30">JPG, PNG, WebP · max 5MB</span>
                    </span>
                  </>
                )}
              </label>

              {/* Preview */}
              <div className="h-32 rounded-xl border border-white/10 overflow-hidden bg-bg flex items-center justify-center">
                {form.thumbnail ? (
                  <img src={form.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-white/20">
                    <Image size={28} />
                    <span className="text-xs">Preview</span>
                  </div>
                )}
              </div>
            </div>
            {uploadError && <p className="text-red-400 text-xs mt-2">{uploadError}</p>}
            {/* Or paste URL */}
            <div className="mt-2">
              <input
                type="url"
                placeholder="Or paste image URL directly"
                value={form.thumbnail}
                onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-bg border border-white/10 text-white text-sm placeholder-white/30 focus:border-cyan-glow focus:outline-none"
              />
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-white/60 text-sm mb-2 font-medium">Project Title *</label>
            <input
              type="text" name="title" placeholder="e.g. FrHelp — AI Learning Platform"
              value={form.title} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg bg-bg border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none"
            />
          </div>

          {/* Short description */}
          <div>
            <label className="block text-white/60 text-sm mb-2 font-medium">Short Description * <span className="text-white/30">(shown on project card)</span></label>
            <textarea
              name="description" rows={2}
              placeholder="One or two sentences describing what this project does..."
              value={form.description} onChange={handleChange} required
              className="w-full px-4 py-2.5 rounded-lg bg-bg border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none resize-none"
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label className="block text-white/60 text-sm mb-2 font-medium flex items-center gap-2">
              <Github size={15} /> GitHub Repository URL
            </label>
            <input
              type="url" name="githubUrl"
              placeholder="https://github.com/Kartiksahu03/your-repo"
              value={form.githubUrl} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-bg border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none"
            />
          </div>

          {/* Live URL */}
          <div>
            <label className="block text-white/60 text-sm mb-2 font-medium flex items-center gap-2">
              <ExternalLink size={15} /> Live Demo URL <span className="text-white/30">(optional)</span>
            </label>
            <input
              type="url" name="liveUrl"
              placeholder="https://your-project.vercel.app"
              value={form.liveUrl} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-bg border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-white/60 text-sm mb-2 font-medium">Category</label>
            <select
              name="category" value={form.category} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-bg border border-white/10 text-white focus:border-cyan-glow focus:outline-none"
            >
              {PROJECT_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Tech stack tags */}
          <div>
            <label className="block text-white/60 text-sm mb-2 font-medium">Tech Stack <span className="text-white/30">(type and press Enter)</span></label>
            <input
              type="text" placeholder="e.g. React, Node.js, MongoDB..."
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleTechKey}
              className="w-full px-4 py-2.5 rounded-lg bg-bg border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none"
            />
            {techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-glow/10 text-cyan-glow text-xs"
                  >
                    {tech}
                    <button type="button" onClick={() => setTechStack(techStack.filter((t) => t !== tech))}>
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Long description */}
          <div>
            <label className="block text-white/60 text-sm mb-2 font-medium">
              Full Description <span className="text-white/30">(markdown, shown in detail popup — optional)</span>
            </label>
            <textarea
              name="longDesc" rows={4}
              placeholder="## Project Name&#10;&#10;Describe what you built, the challenges, and key features..."
              value={form.longDesc} onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg bg-bg border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none resize-none font-mono text-sm"
            />
          </div>

          {/* Featured checkbox */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox" name="featured" checked={form.featured} onChange={handleChange}
              className="w-4 h-4 accent-cyan-500"
            />
            <span className="text-white/70 text-sm">Mark as Featured <span className="text-white/30">(shows a "Featured" badge on the card)</span></span>
          </label>

          {error && (
            <div className="bg-red-400/10 border border-red-400/30 rounded-lg px-4 py-2">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit" disabled={submitting || uploading}
              className="flex-1 py-3 rounded-xl bg-aurora-gradient text-bg font-semibold hover:scale-[1.01] transition-transform disabled:opacity-60"
            >
              {submitting ? 'Saving...' : isEditing ? 'Update Project' : 'Add Project'}
            </button>
            <button
              type="button" onClick={onClose}
              className="px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProjectForm;
