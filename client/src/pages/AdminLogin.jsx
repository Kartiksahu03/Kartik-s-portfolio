// ============================================
// AdminLogin Page
// ============================================

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Loader2 } from 'lucide-react';
import { loginAdmin } from '../redux/slices/authSlice';

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await dispatch(loginAdmin({ email, password }));

    if (loginAdmin.fulfilled.match(result)) {
      navigate('/admin/dashboard');
    } else {
      setError(result.payload || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-bg-card border border-white/10 rounded-2xl p-8"
      >
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-aurora-gradient mx-auto mb-6">
          <Lock size={24} className="text-bg" />
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Login</h1>
        <p className="text-white/40 text-sm text-center mb-8">
          Sign in to manage your portfolio content
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-xl bg-bg border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-xl bg-bg border border-white/10 text-white placeholder-white/30 focus:border-cyan-glow focus:outline-none transition-colors"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-aurora-gradient text-bg font-semibold hover:scale-[1.02] transition-transform disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default AdminLogin;
