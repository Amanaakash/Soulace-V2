import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '../../../utils/axios';
import { API_ENDPOINTS } from '../../../config/api.config';

export interface Admin {
  _id: string;
  username: string;
  email: string;
  role: 'Admin';
  createdAt: string;
  updatedAt: string;
}

interface AdminLoginData {
  email: string;
  password: string;
}

interface AdminAuthResponse {
  success: boolean;
  message?: string;
  admin?: Admin;
}

interface AdminAuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (data: AdminLoginData) => Promise<AdminAuthResponse>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      admin: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (data: AdminLoginData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post<AdminAuthResponse>(
            API_ENDPOINTS.ADMIN.LOGIN,
            data
          );
          
          if (response.data.success && response.data.admin) {
            set({
              admin: response.data.admin,
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

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await axiosInstance.post(API_ENDPOINTS.ADMIN.LOGOUT);
          set({
            admin: null,
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

      clearError: () => set({ error: null }),
    }),
    {
      name: 'admin-auth-storage',
      partialize: (state) => ({
        admin: state.admin,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

