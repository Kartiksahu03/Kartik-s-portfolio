import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import GreetingIntro from './components/common/GreetingIntro';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import ProtectedRoute from './components/common/ProtectedRoute';
import AIChatWidget from './components/ai/AIChatWidget';
import Toast from './components/common/Toast';
import CursorGlow from './components/common/CursorGlow';
import AnimatedBackground from './components/common/AnimatedBackground';
import ScrollProgress from './components/common/ScrollProgress';
import MouseTrail from './components/common/MouseTrail';
import FloatingNav from './components/common/FloatingNav';

import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Resume from './pages/Resume';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

function AppInner() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="bg-bg min-h-screen relative">
      {!isAdminPage && <ScrollProgress />}
      {!isAdminPage && showIntro && <GreetingIntro onComplete={() => setShowIntro(false)} />}

      <AnimatedBackground />
      <CursorGlow />
      <MouseTrail />
      <ScrollToTop />

      {!isAdminPage && <Navbar />}
      {!isAdminPage && <FloatingNav />}

      <main className="relative z-[2]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAdminPage && (
        <div className="relative z-[2]">
          <Footer />
        </div>
      )}
      {!isAdminPage && <AIChatWidget />}
      <Toast />
    </div>
  );
}

function App() {
  return <AppInner />;
}

export default App;
