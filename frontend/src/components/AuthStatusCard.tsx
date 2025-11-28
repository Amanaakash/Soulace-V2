import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { User, Shield, CheckCircle, Mail, Phone, Calendar } from 'lucide-react';

/**
 * Component that displays the current authentication status and user information
 * Can be added to the dashboard to show that authentication is working
 */
const AuthStatusCard: React.FC = () => {
  const { user, isAuthenticated, isUser, isProfessional, isAdmin, getFullName, getInitials } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-semibold mb-2">Not Authenticated</h3>
        <p className="text-red-600">Please log in to view your information.</p>
      </div>
    );
  }

  const getRoleBadgeColor = () => {
    if (isAdmin()) return 'bg-purple-100 text-purple-800 border-purple-300';
    if (isProfessional()) return 'bg-green-100 text-green-800 border-green-300';
    return 'bg-blue-100 text-blue-800 border-blue-300';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold">
            {getInitials()}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{getFullName()}</h2>
            <p className="text-blue-100">@{user.username}</p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full border ${getRoleBadgeColor()} bg-white`}>
              <Shield className="w-4 h-4 mr-1" />
              {user.role}
            </div>
          </div>
        </div>
      </div>

      {/* User Information */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
        
        <div className="space-y-3">
          {/* Email */}
          <div className="flex items-center space-x-3 text-gray-700">
            <Mail className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            {user.emailVerified && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3 text-gray-700">
            <Phone className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{user.phoneNumber}</p>
            </div>
            {user.phoneVerified && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </div>

          {/* Gender */}
          <div className="flex items-center space-x-3 text-gray-700">
            <User className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium">{user.gender}</p>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="flex items-center space-x-3 text-gray-700">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-medium">{formatDate(user.dateOfBirth)}</p>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Account Status</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <p className="font-medium text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Active
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-1">Member Since</p>
              <p className="font-medium text-gray-700">
                {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Role-Specific Information */}
        {user.currentMood && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Current Mood:</strong> {user.currentMood}
            </p>
          </div>
        )}

        {/* Role-Based Features */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Available Features</h4>
          <div className="space-y-2">
            {isUser() && (
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                Access to peer support and professional help
              </div>
            )}
            {isProfessional() && (
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Manage client sessions and appointments
              </div>
            )}
            {isAdmin() && (
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 mr-2 text-purple-500" />
                Full system administration access
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthStatusCard;

