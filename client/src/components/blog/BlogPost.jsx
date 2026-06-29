// ============================================
// BlogPost Component
// Renders the markdown body of a single blog post with our dark theme styling
// ============================================

import ReactMarkdown from 'react-markdown';

const BlogPost = ({ blog }) => {
  return (
    <article>
      <header className="mb-10">
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-72 object-cover rounded-2xl mb-8 border border-white/10"
          />
        )}
        <p className="text-cyan-glow text-sm mb-3">
          {new Date(blog.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}{' '}
          · {blog.readTime} min read
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{blog.title}</h1>

        <div className="flex flex-wrap gap-2">
          {blog.tags?.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-white/50 text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/70 prose-a:text-cyan-glow prose-strong:text-white prose-code:text-violet-glow">
        <ReactMarkdown>{blog.body}</ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPost;
