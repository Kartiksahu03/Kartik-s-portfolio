// ============================================
// useVisitorCount Hook
// Fires a "page view" hit to the backend once when a page mounts
// ============================================

import { useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

export const useVisitorCount = (page) => {
  useEffect(() => {
    // Fire and forget — we don't want analytics failures to break the page
    axiosInstance.post('/analytics/hit', { page }).catch(() => {
      // Silently ignore — analytics tracking should never disturb the user
    });
  }, [page]);
};
