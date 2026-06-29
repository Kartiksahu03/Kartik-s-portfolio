// ============================================
// Toast Component
// Small notification popup driven by uiSlice's toast state
// ============================================

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { hideToast } from '../../redux/slices/uiSlice';

const Toast = () => {
  const dispatch = useDispatch();
  const { message, type, show } = useSelector((state) => state.ui.toast);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => dispatch(hideToast()), 3500);
      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -20, x: '-50%' }}
          className="fixed top-24 left-1/2 z-[100] flex items-center gap-2 px-5 py-3 rounded-xl bg-bg-card border border-white/10 shadow-2xl"
        >
          {type === 'success' ? (
            <CheckCircle2 size={18} className="text-emerald-400" />
          ) : (
            <XCircle size={18} className="text-red-400" />
          )}
          <span className="text-white text-sm">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
