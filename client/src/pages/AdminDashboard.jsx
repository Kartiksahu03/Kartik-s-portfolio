// ============================================
// AdminDashboard Page
// Clean sidebar with Projects, Skills, Blogs, Messages, Analytics tabs
// ============================================

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  LayoutGrid, Sparkles, FileText, Mail,
  BarChart3, LogOut, Plus, Pencil, Trash2,
} from 'lucide-react';

import { logoutAdmin } from '../redux/slices/authSlice';
import { fetchAllProjects, deleteProject } from '../redux/slices/projectSlice';
import { fetchSkills, deleteSkill } from '../redux/slices/skillSlice';
import { fetchBlogs, deleteBlog } from '../redux/slices/blogSlice';

import AdminProjectForm from '../components/admin/AdminProjectForm';
import AdminBlogForm from '../components/admin/AdminBlogForm';
import AdminSkillForm from '../components/admin/AdminSkillForm';
import MessagesList from '../components/admin/MessagesList';
import axiosInstance from '../utils/axiosInstance';

const TABS = [
  { id: 'projects', label: 'Projects', icon: LayoutGrid },
  { id: 'skills', label: 'Skills', icon: Sparkles },
  { id: 'blogs', label: 'Blogs', icon: FileText },
  { id: 'messages', label: 'Messages', icon: Mail },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);
  const { skills } = useSelector((state) => state.skills);
  const { blogs } = useSelector((state) => state.blogs);

  const [activeTab, setActiveTab] = useState('projects');
  const [editingProject, setEditingProject] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchAllProjects());
    dispatch(fetchSkills());
    dispatch(fetchBlogs(true));
  }, [dispatch]);

  useEffect(() => {
    if (activeTab === 'analytics') {
      axiosInstance.get('/analytics/views').then((res) => setAnalytics(res.data)).catch(() => {});
    }
  }, [activeTab]);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate('/admin/login');
  };

  return (
    <>
      <Helmet><title>Admin | Kartik Sahu Portfolio</title></Helmet>

      <div className="min-h-screen flex bg-bg">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-56' : 'w-16'} bg-bg-card border-r border-white/10 flex flex-col transition-all duration-300 fixed top-0 bottom-0 left-0 z-40`}>
          {/* Logo */}
          <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
            <button
              onClick={() => setSidebarOpen(p => !p)}
              className="w-8 h-8 rounded-lg bg-aurora-gradient flex items-center justify-center flex-shrink-0 text-bg font-bold text-sm"
            >
              K
            </button>
            {sidebarOpen && <span className="text-white font-semibold text-sm">Admin Panel</span>}
          </div>

          {/* Nav tabs */}
          <nav className="flex-1 py-4 space-y-1 px-2">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-aurora-gradient text-bg'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {sidebarOpen && label}
              </button>
            ))}
          </nav>

          {/* User + logout */}
          <div className="border-t border-white/10 p-3">
            {sidebarOpen && (
              <p className="text-white/30 text-xs px-1 mb-2 truncate">{adminInfo?.email}</p>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <LogOut size={18} className="flex-shrink-0" />
              {sidebarOpen && 'Log Out'}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className={`flex-1 ${sidebarOpen ? 'ml-56' : 'ml-16'} transition-all duration-300`}>
          {/* Top bar */}
          <div className="sticky top-0 bg-bg/90 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex items-center justify-between z-30">
            <div>
              <h1 className="text-white font-bold text-lg capitalize">{activeTab}</h1>
              <p className="text-white/40 text-xs">Kartik Sahu · Admin Panel</p>
            </div>
            <a
              href="/"
              className="text-white/40 hover:text-white text-sm transition-colors"
            >
              ← Back to Portfolio
            </a>
          </div>

          <div className="p-6">
          {activeTab === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Projects</h2>
                  <p className="text-white/40 text-sm mt-1">
                    Add your projects here — title, thumbnail image, GitHub link, tech stack
                  </p>
                </div>
                <button
                  onClick={() => { setEditingProject(null); setShowProjectForm(true); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-aurora-gradient text-bg text-sm font-semibold hover:scale-105 transition-transform"
                >
                  <Plus size={16} /> Add Project
                </button>
              </div>

              {projects.length === 0 ? (
                <div className="text-center py-20 bg-bg-card border border-dashed border-white/20 rounded-2xl">
                  <p className="text-white/30 mb-4">No projects added yet.</p>
                  <button
                    onClick={() => { setEditingProject(null); setShowProjectForm(true); }}
                    className="px-5 py-2 rounded-full bg-aurora-gradient text-bg text-sm font-semibold"
                  >
                    Add Your First Project
                  </button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {projects.map((p) => (
                    <div
                      key={p._id}
                      className="bg-bg-card border border-white/10 rounded-xl p-4 flex items-center gap-4 hover:border-white/20 transition-colors"
                    >
                      {/* Thumbnail */}
                      {p.thumbnail ? (
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-16 h-12 object-cover rounded-lg border border-white/10 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-12 rounded-lg bg-bg-light border border-white/10 flex items-center justify-center flex-shrink-0 text-white/20 text-xs">
                          No img
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-white font-semibold truncate">{p.title}</p>
                          {p.featured && (
                            <span className="px-2 py-0.5 rounded-full bg-aurora-gradient text-bg text-[10px] font-bold flex-shrink-0">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-white/40 text-xs mt-0.5">{p.category}</p>
                        {p.githubUrl && (
                          <a
                            href={p.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-glow text-xs hover:underline truncate block mt-0.5"
                          >
                            {p.githubUrl}
                          </a>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => { setEditingProject(p); setShowProjectForm(true); }}
                          className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-cyan-glow transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${p.title}"?`)) dispatch(deleteProject(p._id));
                          }}
                          className="p-2 rounded-lg hover:bg-red-400/10 text-white/40 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── SKILLS TAB ── */}
          {activeTab === 'skills' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Skills</h2>
                <button
                  onClick={() => { setEditingSkill(null); setShowSkillForm(true); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-aurora-gradient text-bg text-sm font-semibold"
                >
                  <Plus size={16} /> Add Skill
                </button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {skills.map((s) => (
                  <div key={s._id} className="bg-bg-card border border-white/10 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{s.name}</p>
                      <p className="text-white/40 text-xs">{s.category} · {s.level}%</p>
                      <div className="w-full h-1.5 bg-white/5 rounded-full mt-2">
                        <div className="h-full bg-aurora-gradient rounded-full" style={{ width: `${s.level}%` }} />
                      </div>
                    </div>
                    <div className="flex gap-2 ml-3">
                      <button onClick={() => { setEditingSkill(s); setShowSkillForm(true); }} className="text-white/40 hover:text-cyan-glow p-1">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => { if (window.confirm('Delete this skill?')) dispatch(deleteSkill(s._id)); }} className="text-white/40 hover:text-red-400 p-1">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
                {skills.length === 0 && <p className="text-white/30 col-span-3 text-center py-10">No skills added yet.</p>}
              </div>
            </div>
          )}

          {/* ── BLOGS TAB ── */}
          {activeTab === 'blogs' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
                <button
                  onClick={() => { setEditingBlog(null); setShowBlogForm(true); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-aurora-gradient text-bg text-sm font-semibold"
                >
                  <Plus size={16} /> New Post
                </button>
              </div>
              <div className="space-y-3">
                {blogs.map((b) => (
                  <div key={b._id} className="bg-bg-card border border-white/10 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{b.title}</p>
                      <p className="text-white/40 text-xs mt-1">
                        {b.published ? <span className="text-emerald-400">Published</span> : <span className="text-yellow-400">Draft</span>}
                        {' '}· {b.readTime} min read
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingBlog(b); setShowBlogForm(true); }} className="text-white/40 hover:text-cyan-glow p-1"><Pencil size={16} /></button>
                      <button onClick={() => { if (window.confirm('Delete this post?')) dispatch(deleteBlog(b._id)); }} className="text-white/40 hover:text-red-400 p-1"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
                {blogs.length === 0 && <p className="text-white/30 text-center py-10">No blog posts yet.</p>}
              </div>
            </div>
          )}

          {/* ── MESSAGES TAB ── */}
          {activeTab === 'messages' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Messages</h2>
              <MessagesList />
            </div>
          )}

          {/* ── ANALYTICS TAB ── */}
          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Analytics</h2>
              {analytics ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-bg-card border border-white/10 rounded-xl p-6">
                    <p className="text-white/40 text-sm mb-2">Total Page Views</p>
                    <p className="text-4xl font-extrabold gradient-text">{analytics.totalViews}</p>
                  </div>
                  <div className="bg-bg-card border border-white/10 rounded-xl p-6">
                    <p className="text-white/40 text-sm mb-4">Trending Projects</p>
                    {analytics.trendingProjects?.length > 0 ? (
                      <div className="space-y-2">
                        {analytics.trendingProjects.map((p) => (
                          <div key={p._id} className="flex justify-between text-sm">
                            <span className="text-white/80">{p.title}</span>
                            <span className="text-cyan-glow">{p.viewCount} views</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-white/30 text-sm">No project views yet.</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-white/30">Loading analytics...</p>
              )}
            </div>
          )}
          </div>{/* end p-6 */}
        </main>
      </div>

      {/* Modals */}
      {showProjectForm && (
        <AdminProjectForm
          project={editingProject}
          onClose={() => { setShowProjectForm(false); setEditingProject(null); }}
        />
      )}
      {showBlogForm && (
        <AdminBlogForm
          blog={editingBlog}
          onClose={() => { setShowBlogForm(false); setEditingBlog(null); }}
        />
      )}
      {showSkillForm && (
        <AdminSkillForm
          skill={editingSkill}
          onClose={() => { setShowSkillForm(false); setEditingSkill(null); }}
        />
      )}
    </>
  );
};

export default AdminDashboard;
