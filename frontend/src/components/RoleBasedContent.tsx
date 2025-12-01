import React from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * Example component showing how to render content based on user role
 * This can be used as a reference for implementing role-based features
 */
const RoleBasedContent: React.FC = () => {
  const { user, isUser, isProfessional, isAdmin, hasAnyRole } = useAuth();

  return (
    <div className="space-y-4">
      {/* Content visible to all authenticated users */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Welcome, {user?.firstName}!</h3>
        <p className="text-gray-600">Your role: {user?.role}</p>
      </div>

      {/* Content visible only to regular users */}
      {isUser() && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="text-blue-900 font-semibold mb-2">User Features</h4>
          <ul className="text-blue-800 space-y-1">
            <li>• Access to mood tracking</li>
            <li>• Connect with peer support</li>
            <li>• Book professional sessions</li>
          </ul>
        </div>
      )}

      {/* Content visible only to professionals */}
      {isProfessional() && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h4 className="text-green-900 font-semibold mb-2">Professional Features</h4>
          <ul className="text-green-800 space-y-1">
            <li>• Manage client sessions</li>
            <li>• View appointment calendar</li>
            <li>• Access client notes</li>
          </ul>
        </div>
      )}

      {/* Content visible only to admins */}
      {isAdmin() && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h4 className="text-purple-900 font-semibold mb-2">Admin Features</h4>
          <ul className="text-purple-800 space-y-1">
            <li>• User management</li>
            <li>• System analytics</li>
            <li>• Content moderation</li>
          </ul>
        </div>
      )}

      {/* Content visible to professionals and admins */}
      {hasAnyRole(['Professional', 'Admin']) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h4 className="text-yellow-900 font-semibold mb-2">Advanced Tools</h4>
          <p className="text-yellow-800">
            Access to advanced analytics and reporting tools
          </p>
        </div>
      )}
    </div>
  );
};

export default RoleBasedContent;

