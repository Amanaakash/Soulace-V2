import { useAuthStore } from '../store/authStore';
import { UserRole } from '../types/auth.types';

/**
 * Custom hook for authentication-related utilities
 */
export const useAuth = () => {
  const { user, isAuthenticated, isLoading, error, login, signup, logout, checkAuth, clearError } = useAuthStore();

  /**
   * Check if the current user has a specific role
   */
  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  /**
   * Check if the current user has any of the specified roles
   */
  const hasAnyRole = (roles: UserRole[]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  /**
   * Check if the user is a regular user
   */
  const isUser = (): boolean => hasRole('User');

  /**
   * Check if the user is a professional
   */
  const isProfessional = (): boolean => hasRole('Professional');

  /**
   * Check if the user is an admin
   */
  const isAdmin = (): boolean => hasRole('Admin');

  /**
   * Get user's full name
   */
  const getFullName = (): string => {
    if (!user) return '';
    return `${user.firstName} ${user.lastName}`;
  };

  /**
   * Get user's initials
   */
  const getInitials = (): string => {
    if (!user) return '';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    
    // Actions
    login,
    signup,
    logout,
    checkAuth,
    clearError,
    
    // Utility functions
    hasRole,
    hasAnyRole,
    isUser,
    isProfessional,
    isAdmin,
    getFullName,
    getInitials,
  };
};

