import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '../../../utils/axios';
import { API_ENDPOINTS } from '../../../config/api.config';

export interface Professional {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  designation?: string;
  specialization?: string | string[];
  yearsOfExperience?: number;
  country?: string;
  licenseNumber?: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProfessionalLoginData {
  email: string;
  password: string;
}

interface ProfessionalSignupData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  designation: string;
  specialization: string;
  yearsOfExperience: string;
  country: string;
  licenseNumber?: string;
}

interface ProfessionalAuthResponse {
  success: boolean;
  message?: string;
  professional?: Professional;
}

interface ProfessionalAuthState {
  professional: Professional | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (data: ProfessionalLoginData) => Promise<ProfessionalAuthResponse>;
  signup: (data: ProfessionalSignupData) => Promise<ProfessionalAuthResponse>;
  logout: () => Promise<void>;
  uploadDocument: (file: File) => Promise<void>;
  clearError: () => void;
}

export const useProfessionalAuthStore = create<ProfessionalAuthState>()(
  persist(
    (set) => ({
      professional: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (data: ProfessionalLoginData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post<ProfessionalAuthResponse>(
            API_ENDPOINTS.PROFESSIONAL.LOGIN,
            data
          );
          
          if (response.data.success && response.data.professional) {
            set({
              professional: response.data.professional,
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

      signup: async (data: ProfessionalSignupData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post<ProfessionalAuthResponse>(
            API_ENDPOINTS.PROFESSIONAL.SIGNUP,
            data
          );
          
          if (response.data.success && response.data.professional) {
            set({
              professional: response.data.professional,
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
          await axiosInstance.post(API_ENDPOINTS.PROFESSIONAL.LOGOUT);
          set({
            professional: null,
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

      uploadDocument: async (file: File) => {
        set({ isLoading: true, error: null });
        try {
          const formData = new FormData();
          formData.append('document', file);
          
          await axiosInstance.post(
            API_ENDPOINTS.PROFESSIONAL.UPLOAD_DOC,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          
          set({ isLoading: false });
        } catch (error: any) {
          const errorMessage = error.response?.data?.message || 'Upload failed';
          set({ isLoading: false, error: errorMessage });
          throw error;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'professional-auth-storage',
      partialize: (state) => ({
        professional: state.professional,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

