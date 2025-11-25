import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Heart, Users, Send, Smile, Volume2, Video, Clock } from 'lucide-react';

const PeerSupport: React.FC = () => {
  const [currentMood, setCurrentMood] = useState('');
  const [matchingMode, setMatchingMode] = useState<'similar' | 'opposite' | null>(null);
  const [isMatching, setIsMatching] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [chatDuration, setChatDuration] = useState(0);

  const moods = [
    { emoji: '😢', label: 'Sad', value: 'sad' },
    { emoji: '😰', label: 'Anxious', value: 'anxious' },
    { emoji: '😔', label: 'Lonely', value: 'lonely' },
    { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
    { emoji: '🙂', label: 'Okay', value: 'okay' },
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '😌', label: 'Peaceful', value: 'peaceful' }
  ];

  const handleStartMatching = () => {
    if (!currentMood || !matchingMode) return;
    setIsMatching(true);
    // Simulate matching process
    setTimeout(() => {
      setIsMatching(false);
      setIsConnected(true);
      // Start timer simulation
      const timer = setInterval(() => {
        setChatDuration(prev => prev + 1);
      }, 60000); // Update every minute
    }, 3000);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (isMatching) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Finding Your Perfect Match</h2>
          <p className="text-gray-600 mb-4">
            We're connecting you with someone who {matchingMode === 'similar' ? 'understands' : 'can help balance'} how you're feeling right now...
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              <strong>Your mood:</strong> {moods.find(m => m.value === currentMood)?.emoji} {moods.find(m => m.value === currentMood)?.label}
            </p>
            <p className="text-sm text-blue-700">
              <strong>Matching type:</strong> {matchingMode === 'similar' ? 'Similar mood (empathy)' : 'Opposite mood (balance)'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Chat Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Connected with Anonymous Peer</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatTime(chatDuration)}
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                    Online
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              {chatDuration >= 10 && (
                <button className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                  <Volume2 className="w-5 h-5" />
                </button>
              )}
              {chatDuration >= 30 && (
                <button className="p-3 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 transition-colors">
                  <Video className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          
          {/* Unlock notifications */}
          {chatDuration === 10 && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">🎉 Voice chat unlocked! You can now talk using voice messages.</p>
            </div>
          )}
          {chatDuration === 30 && (
            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-purple-700">🎉 Video chat unlocked! You can now start a video call if both parties agree.</p>
            </div>
          )}
        </div>

        {/* Chat Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-96 flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {/* System message */}
            <div className="text-center">
              <div className="bg-gray-100 rounded-full px-4 py-2 inline-block text-sm text-gray-600">
                You're now connected. Remember to be kind and supportive. 💙
              </div>
            </div>
            
            {/* Sample messages */}
            <div className="flex">
              <div className="bg-gray-100 rounded-2xl rounded-bl-md p-3 max-w-xs">
                <p className="text-sm text-gray-800">Hey there! I saw you're feeling similar to how I am right now. How has your day been?</p>
                <span className="text-xs text-gray-500 mt-1 block">Anonymous Friend • 2 min ago</span>
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white rounded-2xl rounded-br-md p-3 max-w-xs">
                <p className="text-sm">Hi! Thanks for connecting with me. It's been a tough day, but I'm grateful to have someone to talk to.</p>
                <span className="text-xs text-blue-100 mt-1 block">You • 1 min ago</span>
              </div>
            </div>
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <Smile className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Support Guidelines */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Remember</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>• Be kind and non-judgmental</div>
            <div>• Listen actively and empathetically</div>
            <div>• Share your experiences if it helps</div>
            <div>• Respect boundaries and privacy</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Anonymous Peer Support</h1>
        <p className="text-lg text-gray-600">
          Connect with someone who understands. Share, listen, and heal together.
        </p>
      </div>

      {/* Mood Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">How are you feeling right now?</h2>
        <div className="grid grid-cols-4 gap-3">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setCurrentMood(mood.value)}
              className={`p-4 rounded-xl text-center transition-all duration-200 ${
                currentMood === mood.value
                  ? 'bg-blue-50 border-2 border-blue-500 transform scale-105'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <div className="text-sm font-medium text-gray-700">{mood.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Matching Preference */}
      {currentMood && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Who would you like to talk to?</h2>
          <div className="space-y-3">
            <button
              onClick={() => setMatchingMode('similar')}
              className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                matchingMode === 'similar'
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Someone feeling similar</h3>
                  <p className="text-sm text-gray-600">Connect with someone who understands your current emotions</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => setMatchingMode('opposite')}
              className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                matchingMode === 'opposite'
                  ? 'bg-green-50 border-2 border-green-500'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Someone in a different headspace</h3>
                  <p className="text-sm text-gray-600">Get a fresh perspective from someone in a balanced mood</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Start Matching Button */}
      {currentMood && matchingMode && (
        <div className="text-center">
          <button
            onClick={handleStartMatching}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Find Someone to Talk To
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Your identity remains completely anonymous. We'll find you the perfect match.
          </p>
        </div>
      )}
      <div className='text-center'>
        <Link to="/mood-assessment" className="inline-block bg-blue-500/80 backdrop-blur-sm text-white py-3 px-6 rounded-full font-medium hover:bg-blue-600/80 transition-all duration-200 border border-white/30">
          Know your mood 😊
        </Link>
      </div>
      {/* Safety Guidelines */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Safety Guidelines</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Never share personal information (name, location, contact details)</li>
          <li>• Report any inappropriate behavior immediately</li>
          <li>• If you feel unsafe, end the conversation at any time</li>
          <li>• Remember: this is peer support, not professional therapy</li>
        </ul>
      </div>
    </div>
  );
};

export default PeerSupport;