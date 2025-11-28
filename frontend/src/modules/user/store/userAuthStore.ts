import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, LoginData, SignupData, AuthResponse } from '../../../types/auth.types';
import axiosInstance from '../../../utils/axios';
import { API_ENDPOINTS } from '../../../config/api.config';

interface UserAuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (data: Omit<LoginData, 'role'>) => Promise<AuthResponse>;
  signup: (data: Omit<SignupData, 'role'>) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useUserAuthStore = create<UserAuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (data: Omit<LoginData, 'role'>) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post<AuthResponse>(
            API_ENDPOINTS.USER.LOGIN,
            { ...data, role: 'User' }
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

      signup: async (data: Omit<SignupData, 'role'>) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post<AuthResponse>(
            API_ENDPOINTS.USER.SIGNUP,
            { ...data, role: 'User' }
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
          await axiosInstance.post(API_ENDPOINTS.USER.LOGOUT);
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
      name: 'user-auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

