import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import PeerSupport from './pages/PeerSupport';
import ProfessionalHelp from './pages/ProfessionalHelp';
import MoodTracker from './pages/MoodTracker';
import MoodAssessment from './pages/MoodAssesment';
import Mindfulness from './pages/Mindfulness';
import Community from './pages/Community';
import Emergency from './pages/Emergency';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/peer-support" element={<Layout><PeerSupport /></Layout>} />
          <Route path="/professional-help" element={<Layout><ProfessionalHelp /></Layout>} />
          <Route path="/mood-tracker" element={<Layout><MoodTracker /></Layout>} />
          <Route path="/mood-assessment" element={<Layout><MoodAssessment /></Layout>} />
          <Route path="/mindfulness" element={<Layout><Mindfulness /></Layout>} />
          <Route path="/community" element={<Layout><Community /></Layout>} />
          <Route path="/emergency" element={<Layout><Emergency /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;