// ============================================
// AI API Helper
// Wraps the /api/ai/* backend calls used by AIChatWidget and ResumeAnalyzer
// ============================================

import axiosInstance from '../../utils/axiosInstance';

export const sendChatMessage = async (messages) => {
  const res = await axiosInstance.post('/ai/chat', { messages });
  return res.data.reply;
};

export const analyzeResumeAgainstJD = async (jobDescription) => {
  const res = await axiosInstance.post('/ai/analyze', { jobDescription });
  return res.data;
};
