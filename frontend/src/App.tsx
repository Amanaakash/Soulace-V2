import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';

// User Module
import UserLogin from './modules/user/pages/UserLogin';
import UserSignup from './modules/user/pages/UserSignup';
import UserDashboard from './modules/user/pages/UserDashboard';
import UserProtectedRoute from './modules/user/components/UserProtectedRoute';
import UserLayout from './modules/user/components/Layout';

// User Pages (moved to modules/user/pages)
import PeerSupport from './modules/user/pages/PeerSupport';
import ProfessionalHelp from './modules/user/pages/ProfessionalHelp';
import MoodTracker from './modules/user/pages/MoodTracker';
import MoodAssessment from './modules/user/pages/MoodAssesment';
import Mindfulness from './modules/user/pages/Mindfulness';
import Community from './modules/user/pages/Community';
import Emergency from './modules/user/pages/Emergency';
import Profile from './modules/user/pages/Profile';

// Professional Module
import ProfessionalLogin from './modules/professional/pages/ProfessionalLogin';
import ProfessionalSignup from './modules/professional/pages/ProfessionalSignup';
import ProfessionalDashboard from './modules/professional/pages/ProfessionalDashboard';
import ProfessionalProtectedRoute from './modules/professional/components/ProfessionalProtectedRoute';

// Admin Module
import AdminLogin from './modules/admin/pages/AdminLogin';
import AdminDashboard from './modules/admin/pages/AdminDashboard';
import AdminProtectedRoute from './modules/admin/components/AdminProtectedRoute';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Navigate to="/user/login" replace />} />
          <Route path="/signup" element={<Navigate to="/user/signup" replace />} />
          
          {/* User Routes */}
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route 
            path="/user/dashboard" 
            element={
              <UserProtectedRoute>
                <UserLayout>
                  <UserDashboard />
                </UserLayout>
              </UserProtectedRoute>
            } 
          />
          
          {/* Professional Routes */}
          <Route path="/professional/login" element={<ProfessionalLogin />} />
          <Route path="/professional/signup" element={<ProfessionalSignup />} />
          <Route 
            path="/professional/dashboard" 
            element={
              <ProfessionalProtectedRoute>
                <ProfessionalDashboard />
              </ProfessionalProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            } 
          />
          
          {/* Original Protected Routes - Now using User-specific Layout */}
          <Route 
            path="/dashboard" 
            element={
              <UserProtectedRoute>
                <UserLayout><UserDashboard /></UserLayout>
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/peer-support" 
            element={
              <UserProtectedRoute>
                <UserLayout><PeerSupport /></UserLayout>
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/professional-help" 
            element={
              <UserProtectedRoute>
                <UserLayout><ProfessionalHelp /></UserLayout>
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/mood-tracker" 
            element={
              <UserProtectedRoute>
                <UserLayout><MoodTracker /></UserLayout>
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/mood-assessment" 
            element={
              <UserProtectedRoute>
                <UserLayout><MoodAssessment /></UserLayout>
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/mindfulness" 
            element={
              <UserProtectedRoute>
                <UserLayout><Mindfulness /></UserLayout>
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/community" 
            element={
              <UserProtectedRoute>
                <UserLayout><Community /></UserLayout>
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/emergency" 
            element={
              <UserProtectedRoute>
                <UserLayout><Emergency /></UserLayout>
              </UserProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <UserProtectedRoute>
                <UserLayout><Profile /></UserLayout>
              </UserProtectedRoute>
            } 
          />
          
          {/* Catch all - redirect to homepage */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;