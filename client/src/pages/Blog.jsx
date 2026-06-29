// ============================================
// Blog Page
// Lists all published blog posts
// ============================================

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { fetchBlogs } from '../redux/slices/blogSlice';
import { useVisitorCount } from '../hooks/useVisitorCount';
import BlogCard from '../components/blog/BlogCard';
import Loader from '../components/common/Loader';

const Blog = () => {
  useVisitorCount('/blog');
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Blog | Kartik Sahu</title>
      </Helmet>

      <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">Thoughts & devlogs</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Blog</h1>
        </motion.div>

        {loading ? (
          <Loader />
        ) : blogs.length === 0 ? (
          <p className="text-center text-white/40">
            No posts published yet — check back soon!
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((blog, i) => (
              <BlogCard key={blog._id} blog={blog} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Blog;
