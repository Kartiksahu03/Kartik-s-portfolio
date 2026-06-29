// ============================================
// ProtectedRoute Component
// Wraps admin-only pages — redirects to /admin/login if not authenticated
// ============================================

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from '../../redux/slices/authSlice';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { adminToken, isAuthenticated } = useSelector((state) => state.auth);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const check = async () => {
      if (adminToken) {
        await dispatch(verifyToken());
      }
      setChecking(false);
    };
    check();
  }, [dispatch, adminToken]);

  if (checking) return <Loader fullScreen />;

  if (!adminToken || !isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
