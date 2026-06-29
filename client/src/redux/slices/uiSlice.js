// ============================================
// UI Slice
// Handles global UI state — toasts, modals, AI chat widget open/close
// ============================================

import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    toast: { message: '', type: 'success', show: false },
    modalOpen: false,
    chatOpen: false,
  },
  reducers: {
    showToast: (state, action) => {
      state.toast = {
        message: action.payload.message,
        type: action.payload.type || 'success',
        show: true,
      };
    },
    hideToast: (state) => {
      state.toast.show = false;
    },
    openModal: (state) => {
      state.modalOpen = true;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
    toggleChat: (state) => {
      state.chatOpen = !state.chatOpen;
    },
  },
});

export const { showToast, hideToast, openModal, closeModal, toggleChat } = uiSlice.actions;
export default uiSlice.reducer;
