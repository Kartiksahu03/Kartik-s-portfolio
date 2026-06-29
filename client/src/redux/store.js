// ============================================
// Redux Store
// Combines all slices. The admin token is persisted manually to localStorage
// (kept simple on purpose instead of pulling in the redux-persist package).
// ============================================

import { configureStore, combineReducers } from '@reduxjs/toolkit';

import projectReducer from './slices/projectSlice';
import skillReducer from './slices/skillSlice';
import blogReducer from './slices/blogSlice';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
  projects: projectReducer,
  skills: skillReducer,
  blogs: blogReducer,
  auth: authReducer,
  ui: uiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Keep the admin logged in across page refreshes by saving the token
// to localStorage every time the auth slice changes. authSlice.js already
// reads the initial value back out of localStorage when the app starts.
store.subscribe(() => {
  const { adminToken } = store.getState().auth;
  if (adminToken) {
    localStorage.setItem('adminToken', adminToken);
  } else {
    localStorage.removeItem('adminToken');
  }
});
