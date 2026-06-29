// ============================================
// Blog Model
// Represents a single devlog / blog post written from the admin panel
// ============================================

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      // not "required" at the schema level because we auto-generate it
      // in a pre-save hook below before validation completes
    },
    body: {
      type: String, // raw markdown content
      required: [true, 'Blog body is required'],
    },
    tags: {
      type: [String],
      default: [],
    },
    coverImage: {
      type: String, // Cloudinary URL
      default: '',
    },
    published: {
      type: Boolean,
      default: false,
    },
    readTime: {
      type: Number, // auto-calculated in minutes
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate slug from title + auto-calculate read time before saving
blogSchema.pre('validate', function (next) {
  const slugify = require('slugify');

  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = `${slugify(this.title, { lower: true, strict: true })}-${Date.now()
      .toString()
      .slice(-5)}`;
  }

  if (this.body) {
    // Average adult reading speed ~ 200 words per minute
    const wordCount = this.body.trim().split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(wordCount / 200));
  }

  next();
});

blogSchema.index({ published: 1, createdAt: -1 });

module.exports = mongoose.model('Blog', blogSchema);
