// ============================================
// BlogDetail Page
// Shows a single blog post by its slug
// ============================================

import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { fetchBlogBySlug } from '../redux/slices/blogSlice';
import { useVisitorCount } from '../hooks/useVisitorCount';
import BlogPost from '../components/blog/BlogPost';
import Loader from '../components/common/Loader';

const BlogDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { currentBlog, loading, error } = useSelector((state) => state.blogs);

  useVisitorCount(`/blog/${slug}`);

  useEffect(() => {
    dispatch(fetchBlogBySlug(slug));
  }, [dispatch, slug]);

  if (loading) return <Loader fullScreen />;

  if (error || !currentBlog) {
    return (
      <section className="pt-40 pb-24 px-6 text-center">
        <p className="text-white/50 mb-4">This post couldn't be found.</p>
        <Link to="/blog" className="text-cyan-glow hover:underline">
          Back to Blog
        </Link>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{currentBlog.title} | Kartik Sahu</title>
        <meta name="description" content={currentBlog.body?.slice(0, 150)} />
      </Helmet>

      <section className="pt-32 pb-24 px-6 md:px-12 max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-glow mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <BlogPost blog={currentBlog} />
      </section>
    </>
  );
};

export default BlogDetail;
