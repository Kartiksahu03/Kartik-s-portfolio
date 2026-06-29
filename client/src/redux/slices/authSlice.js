// ============================================
// Auth Slice
// Handles admin login state
// ============================================

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const loginAdmin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/auth/login', { email, password });
      // Save token to localStorage so axiosInstance can attach it automatically
      localStorage.setItem('adminToken', res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const verifyToken = createAsyncThunk(
  'auth/verify',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/auth/me');
      return res.data.admin;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Session expired');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    adminToken: localStorage.getItem('adminToken') || null,
    adminInfo: null,
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
    logoutAdmin: (state) => {
      state.adminToken = null;
      state.adminInfo = null;
      state.isAuthenticated = false;
      localStorage.removeItem('adminToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminToken = action.payload.token;
        state.adminInfo = action.payload.admin;
        state.isAuthenticated = true;
      })
      .addCase(loginAdmin.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.adminInfo = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.adminToken = null;
        state.adminInfo = null;
        localStorage.removeItem('adminToken');
      });
  },
});

export const { logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
