// ============================================
// Blog Slice
// Handles fetching and managing blog posts
// ============================================

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchAll',
  async (showAll = false, { rejectWithValue }) => {
    try {
      const query = showAll ? '?all=true' : '';
      const res = await axiosInstance.get(`/blogs${query}`);
      return res.data.blogs;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch blogs');
    }
  }
);

export const fetchBlogBySlug = createAsyncThunk(
  'blogs/fetchBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/blogs/${slug}`);
      return res.data.blog;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch blog post');
    }
  }
);

export const createBlog = createAsyncThunk(
  'blogs/create',
  async (blogData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/blogs', blogData);
      return res.data.blog;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create blog post');
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/blogs/${id}`, data);
      return res.data.blog;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update blog post');
    }
  }
);

export const deleteBlog = createAsyncThunk('blogs/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/blogs/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete blog post');
  }
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    currentBlog: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) state.blogs[index] = action.payload;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
