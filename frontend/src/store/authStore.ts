import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginData, SignupData, AuthResponse } from '../types/auth.types';
import axiosInstance from '../utils/axios';
import { API_ENDPOINTS } from '../config/api.config';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (data: LoginData) => Promise<AuthResponse>;
  signup: (data: SignupData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (data: LoginData) => {
        set({ isLoading: true, error: null });
        try {
          // Determine endpoint based on role
          let endpoint = API_ENDPOINTS.USER.LOGIN;
          if (data.role === 'Professional') {
            endpoint = API_ENDPOINTS.PROFESSIONAL.LOGIN;
          } else if (data.role === 'Admin') {
            endpoint = API_ENDPOINTS.ADMIN.LOGIN;
          }
          
          const response = await axiosInstance.post<AuthResponse>(
            endpoint,
            data
          );
          
          if (response.data.success && response.data.user) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return response.data;
          }
          
          throw new Error(response.data.message || 'Login failed');
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Login failed';
          set({ isLoading: false, error: errorMessage });
          throw error;
        }
      },

      signup: async (data: SignupData) => {
        set({ isLoading: true, error: null });
        try {
          // Determine endpoint based on role
          let endpoint = API_ENDPOINTS.USER.SIGNUP;
          if (data.role === 'Professional') {
            endpoint = API_ENDPOINTS.PROFESSIONAL.SIGNUP;
          }
          // Note: Admin signup typically doesn't exist
          
          const response = await axiosInstance.post<AuthResponse>(
            endpoint,
            data
          );
          
          if (response.data.success && response.data.user) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return response.data;
          }
          
          throw new Error(response.data.message || 'Signup failed');
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || error.message || 'Signup failed';
          set({ isLoading: false, error: errorMessage });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          // Try to logout from all possible endpoints
          // In a real scenario, you'd know which role the user has
          const user = (set as any).getState?.()?.user;
          let endpoint = API_ENDPOINTS.USER.LOGOUT;
          
          if (user?.role === 'Professional') {
            endpoint = API_ENDPOINTS.PROFESSIONAL.LOGOUT;
          } else if (user?.role === 'Admin') {
            endpoint = API_ENDPOINTS.ADMIN.LOGOUT;
          }
          
          await axiosInstance.post(endpoint);
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Logout failed';
          set({ isLoading: false, error: errorMessage });
          throw error;
        }
      },

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          // Default to user check auth
          // Note: This generic store should ideally not be used in favor of role-specific stores
          const response = await axiosInstance.get<User>(
            API_ENDPOINTS.USER.CHECK_AUTH
          );
          set({
            user: response.data,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

