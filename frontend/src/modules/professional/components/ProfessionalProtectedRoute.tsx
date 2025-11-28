import React from 'react';
import { Navigate } from 'react-router-dom';
import { useProfessionalAuthStore } from '../store/professionalAuthStore';

interface ProfessionalProtectedRouteProps {
  children: React.ReactNode;
}

const ProfessionalProtectedRoute: React.FC<ProfessionalProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useProfessionalAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/professional/login" replace />;
  }

  return <>{children}</>;
};

export default ProfessionalProtectedRoute;

