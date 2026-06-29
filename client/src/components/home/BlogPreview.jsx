// ============================================
// BlogPreview Component
// Shows the 3 latest published blog posts on the homepage
// ============================================

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchBlogs } from '../../redux/slices/blogSlice';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const BlogPreview = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blogs);
  const [ref, isVisible] = useScrollReveal();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Don't show this section at all if there are no published posts yet
  if (blogs.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center mb-14"
      >
        <p className="section-label mb-3">From the devlog</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">Latest Posts</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {blogs.slice(0, 3).map((blog, i) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              to={`/blog/${blog.slug}`}
              className="block h-full bg-bg-card border border-white/10 rounded-2xl p-6 hover:border-cyan-glow/50 hover:shadow-glow-soft transition-all"
            >
              <p className="text-cyan-glow text-xs mb-3">{blog.readTime} min read</p>
              <h3 className="text-white text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-white/50 text-sm line-clamp-3">
                {blog.body?.slice(0, 120)}...
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BlogPreview;
