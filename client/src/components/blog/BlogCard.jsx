// ============================================
// BlogCard Component
// Used in the Blog listing page
// ============================================

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogCard = ({ blog, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
    >
      <Link
        to={`/blog/${blog.slug}`}
        className="block h-full bg-bg-card border border-white/10 rounded-2xl p-6 hover:border-cyan-glow/50 hover:shadow-glow-soft transition-all"
      >
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
        )}
        <p className="text-cyan-glow text-xs mb-3">{blog.readTime} min read</p>
        <h3 className="text-white text-xl font-bold mb-2">{blog.title}</h3>
        <p className="text-white/50 text-sm line-clamp-3 mb-4">{blog.body?.slice(0, 120)}...</p>

        <div className="flex flex-wrap gap-2">
          {blog.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full bg-white/5 text-white/50 text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
