import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Stethoscope, 
  TrendingUp, 
  Heart, 
  Users, 
  AlertTriangle,
  Calendar,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  Star,
  BookOpen,
  Activity
} from 'lucide-react';

const UserDashboard: React.FC = () => {
  const [currentMentor, setCurrentMentor] = useState(0);

  const mentors = [
    {
      name: "Dr. Sarah Chen",
      specialty: "Anxiety & Depression",
      experience: "8+ years",
      rating: 4.9,
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400",
      available: true
    },
    {
      name: "Dr. Michael Rodriguez", 
      specialty: "Trauma Therapy",
      experience: "12+ years",
      rating: 4.8,
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400",
      available: true
    },
    {
      name: "Dr. Emily Johnson",
      specialty: "Mindfulness & CBT", 
      experience: "6+ years",
      rating: 4.9,
      image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400",
      available: false
    }
  ];

  const recentActivities = [
    { type: 'mood', text: 'Logged mood: Peaceful', time: '2 hours ago', color: 'text-green-600' },
    { type: 'chat', text: 'Connected with peer support', time: '1 day ago', color: 'text-blue-600' },
    { type: 'mindfulness', text: 'Completed breathing exercise', time: '2 days ago', color: 'text-purple-600' },
    { type: 'session', text: 'Session with Dr. Sarah', time: '3 days ago', color: 'text-orange-600' }
  ];

  const dashboardStats = [
    { label: 'Current Mood', value: 'Calm', color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Streak Days', value: '7', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Sessions', value: '12', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { label: 'Connections', value: '28', color: 'text-orange-600', bgColor: 'bg-orange-50' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back to your safe space</h1>
        <p className="text-gray-600">How are you feeling today? Let's continue your healing journey.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Dashboard Widget */}
        <div className="lg:col-span-2 relative">
          {/* Background Image */}
          <div 
            className="absolute inset-0 rounded-3xl bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200')`
            }}
          />
          
          {/* Content Overlay */}
          <div className="relative p-8 min-h-[500px] flex items-center justify-center">
            {/* Circular Dashboard Widget */}
            <div className="relative w-80 h-80">
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/30"></div>
              
              {/* Inner Sections */}
              <div className="absolute inset-6 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center">
                {/* Center Icon */}
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Heart className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Navigation Sections */}
              <div className="absolute inset-0">
                {/* Peer Support - Top */}
                <Link
                  to="/peer-support"
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-16 h-16 bg-blue-500/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-600/80 transition-all duration-200 border border-white/30 group"
                >
                  <MessageCircle className="w-8 h-8 text-white" />
                  <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Peer Support
                  </span>
                </Link>

                {/* Professional Help - Right */}
                <Link
                  to="/professional-help"
                  className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 w-16 h-16 bg-purple-500/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-purple-600/80 transition-all duration-200 border border-white/30 group"
                >
                  <Stethoscope className="w-8 h-8 text-white" />
                  <span className="absolute top-1/2 -left-32 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Professional Help
                  </span>
                </Link>

                {/* Mood Tracker - Bottom */}
                <Link
                  to="/mood-tracker"
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-16 h-16 bg-green-500/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-green-600/80 transition-all duration-200 border border-white/30 group"
                >
                  <TrendingUp className="w-8 h-8 text-white" />
                  <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Mood Tracker
                  </span>
                </Link>

                {/* Mindfulness - Left */}
                <Link
                  to="/mindfulness"
                  className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 w-16 h-16 bg-pink-500/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-pink-600/80 transition-all duration-200 border border-white/30 group"
                >
                  <Heart className="w-8 h-8 text-white" />
                  <span className="absolute top-1/2 -right-28 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Mindfulness
                  </span>
                </Link>

                {/* Community - Top Right */}
                <Link
                  to="/community"
                  className="absolute top-8 right-8 w-12 h-12 bg-orange-500/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-orange-600/80 transition-all duration-200 border border-white/30 group"
                >
                  <Users className="w-6 h-6 text-white" />
                  <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Community
                  </span>
                </Link>

                {/* Emergency - Top Left */}
                <Link
                  to="/emergency"
                  className="absolute top-8 left-8 w-12 h-12 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-600/80 transition-all duration-200 border border-white/30 group"
                >
                  <AlertTriangle className="w-6 h-6 text-white" />
                  <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Emergency
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div className="absolute bottom-6 left-6 right-6 flex gap-4">
            <Link to="/peer-support" className="flex-1 bg-blue-500/80 backdrop-blur-sm text-white py-3 px-6 rounded-full font-medium hover:bg-blue-600/80 transition-all duration-200 border border-white/30 text-center">
              Peer Support 😊
            </Link>
            <button className="flex-1 bg-purple-500/80 backdrop-blur-sm text-white py-3 px-6 rounded-full font-medium hover:bg-purple-600/80 transition-all duration-200 border border-white/30">
              Read Jokes 😂
            </button>
          </div>
        </div>

        {/* Featured Mentor Card */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Featured Mentor</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentMentor(Math.max(0, currentMentor - 1))}
                    className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentMentor(Math.min(mentors.length - 1, currentMentor + 1))}
                    className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <img
                  src={mentors[currentMentor].image}
                  alt={mentors[currentMentor].name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white/20"
                />
                <h4 className="text-xl font-bold mb-1">{mentors[currentMentor].name}</h4>
                <p className="text-white/80 text-sm mb-2">{mentors[currentMentor].specialty}</p>
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{mentors[currentMentor].rating}</span>
                  <span className="text-white/60">•</span>
                  <span className="text-sm text-white/80">{mentors[currentMentor].experience}</span>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <div className={`w-2 h-2 rounded-full mr-2 ${mentors[currentMentor].available ? 'bg-green-400' : 'bg-red-400'}`} />
                  <span className="text-sm">{mentors[currentMentor].available ? 'Available Now' : 'Busy'}</span>
                </div>
                <Link
                  to="/professional-help"
                  className="inline-block bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                  Book Session
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            {dashboardStats.map((stat, index) => (
              <div key={index} className={`${stat.bgColor} rounded-xl p-4 text-center`}>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${activity.color.replace('text-', 'bg-')}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              to="/peer-support"
              className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-blue-600 mr-3" />
              <span className="font-medium text-blue-700">Find Someone to Talk To</span>
            </Link>
            <Link
              to="/mood-tracker"
              className="flex items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <TrendingUp className="w-5 h-5 text-green-600 mr-3" />
              <span className="font-medium text-green-700">Log Today's Mood</span>
            </Link>
            <Link
              to="/mindfulness"
              className="flex items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <Heart className="w-5 h-5 text-purple-600 mr-3" />
              <span className="font-medium text-purple-700">Start Meditation</span>
            </Link>
            <Link
              to="/professional-help"
              className="flex items-center p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <Stethoscope className="w-5 h-5 text-orange-600 mr-3" />
              <span className="font-medium text-orange-700">Book Professional Help</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

