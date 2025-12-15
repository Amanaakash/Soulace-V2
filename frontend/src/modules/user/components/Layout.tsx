import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  User, 
  Grid3X3, 
  MessageCircle, 
  Stethoscope, 
  TrendingUp, 
  Heart, 
  Users, 
  AlertTriangle,
  Settings,
  LogOut,
  X,
  Bot,
  Headphones
} from 'lucide-react';
import { useUserAuthStore } from '../store/userAuthStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUserAuthStore();
  
  const getFullName = () => {
    if (!user) return '';
    return `${user.firstName} ${user.lastName}`;
  };

  const navigation = [
    { name: 'Dashboard', href: '/user/dashboard', icon: Grid3X3 },
    { name: 'Mood Assessment', href: '/mood-assessment', icon: TrendingUp },
    { name: 'AI Chat', href: '/ai-chat', icon: Bot },
    { name: 'Peer Support', href: '/peer-support', icon: MessageCircle },
    { name: 'Connect with Listener', href: '/listener-connect', icon: Headphones },
    { name: 'Professional Help', href: '/professional-help', icon: Stethoscope },
    { name: 'Mood Tracker', href: '/mood-tracker', icon: Heart },
    { name: 'Mindfulness', href: '/mindfulness', icon: Heart },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Emergency', href: '/emergency', icon: AlertTriangle },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/user/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-16 lg:w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center lg:justify-start h-16 px-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="hidden lg:block text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SoulAce
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className={`w-5 h-5 ${isActive(item.href) ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className="hidden lg:block ml-3">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden lg:block flex-1">
                <p className="text-sm font-medium text-gray-900">{getFullName() || 'Anonymous User'}</p>
                <p className="text-xs text-gray-500">{user?.role || 'Guest'}</p>
              </div>
            </div>
            <div className="hidden lg:flex mt-3 space-x-2">
              <Link to="/profile" className="flex-1 flex items-center justify-center px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                <Settings className="w-4 h-4 mr-1" />
                Settings
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          className="lg:hidden absolute top-4 right-4 p-2 rounded-md text-gray-600 hover:bg-gray-100"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white shadow-sm border-b border-gray-200">
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-sm text-gray-600">
              Welcome to your safe space
            </div>
            <button className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
              <AlertTriangle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

