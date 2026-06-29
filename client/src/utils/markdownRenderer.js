// ============================================
// Markdown Renderer Helper
// Small shared helpers for working with markdown content across the app
// ============================================

// Strips markdown syntax down to plain text — handy for short previews/excerpts
export const stripMarkdown = (markdown = '') => {
  return markdown
    .replace(/#{1,6}\s/g, '') // headings
    .replace(/\*\*(.*?)\*\*/g, '$1') // bold
    .replace(/\*(.*?)\*/g, '$1') // italic
    .replace(/`(.*?)`/g, '$1') // inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // links
    .replace(/\n+/g, ' ') // newlines
    .trim();
};

// Builds a short excerpt from a blog body, used for cards/previews
export const getExcerpt = (markdown = '', length = 150) => {
  const plain = stripMarkdown(markdown);
  return plain.length > length ? `${plain.slice(0, length)}...` : plain;
};
