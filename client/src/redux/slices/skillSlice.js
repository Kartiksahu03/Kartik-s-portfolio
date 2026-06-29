// ============================================
// Skill Slice
// Handles fetching and managing portfolio skills
// ============================================

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const fetchSkills = createAsyncThunk('skills/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get('/skills');
    return res.data.skills;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch skills');
  }
});

export const addSkill = createAsyncThunk('skills/add', async (skillData, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post('/skills', skillData);
    return res.data.skill;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to add skill');
  }
});

export const updateSkill = createAsyncThunk(
  'skills/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/skills/${id}`, data);
      return res.data.skill;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update skill');
    }
  }
);

export const deleteSkill = createAsyncThunk('skills/delete', async (id, { rejectWithValue }) => {
  try {
    await axiosInstance.delete(`/skills/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete skill');
  }
});

const skillSlice = createSlice({
  name: 'skills',
  initialState: {
    skills: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        const index = state.skills.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) state.skills[index] = action.payload;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter((s) => s._id !== action.payload);
      });
  },
});

export default skillSlice.reducer;
