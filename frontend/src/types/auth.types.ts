export type UserRole = 'User' | 'Professional' | 'Admin';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  role: UserRole;
  emailVerified: boolean;
  phoneVerified: boolean;
  isOnline: boolean;
  currentMood?: string;
  preferedMood?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  role: UserRole;
}

export interface LoginData {
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
}

