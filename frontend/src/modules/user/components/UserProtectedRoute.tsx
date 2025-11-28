import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuthStore } from '../store/userAuthStore';

interface UserProtectedRouteProps {
  children: React.ReactNode;
}

const UserProtectedRoute: React.FC<UserProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useUserAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/user/login" replace />;
  }

  return <>{children}</>;
};

export default UserProtectedRoute;

