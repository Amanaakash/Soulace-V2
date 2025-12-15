import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Users, Send, Smile, Volume2, Video, Clock, X } from 'lucide-react';

const PeerSupport: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [chatDuration, setChatDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; sender: 'user' | 'peer'; time: string }>>([]);
  const navigate = useNavigate();

  // Auto-start connecting when component mounts
  useEffect(() => {
    const connectingTimer = setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      // Add initial message
      setChatMessages([
        {
          text: "Hey there! I'm here to listen and support you. How has your day been?",
          sender: 'peer',
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      // Start chat duration timer
      const durationTimer = setInterval(() => {
        setChatDuration(prev => prev + 1);
      }, 60000); // Update every minute
      
      return () => clearInterval(durationTimer);
    }, 3000);

    return () => clearTimeout(connectingTimer);
  }, []);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      text: message,
      sender: 'user' as const,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate peer response
    setTimeout(() => {
      const responses = [
        "I understand how you're feeling. That sounds really challenging.",
        "Thank you for sharing that with me. I'm here for you.",
        "It takes courage to open up like this. How can I support you?",
        "I hear you. Would you like to talk more about that?",
        "That must be difficult. I'm listening and I care.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setChatMessages(prev => [...prev, {
        text: randomResponse,
        sender: 'peer',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const endChat = () => {
    if (window.confirm('Are you sure you want to end this chat session?')) {
      navigate('/user/dashboard');
    }
  };

  // Connecting Screen
  if (isConnecting) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connecting to Peer Support</h2>
          <p className="text-gray-600 mb-4">
            We're finding you a compassionate peer who's ready to listen and support you...
          </p>
          <div className="bg-blue-50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-blue-700 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span>Anonymous & Confidential</span>
            </p>
            <p className="text-sm text-blue-700 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
              <span>Peer-to-Peer Support</span>
            </p>
            <p className="text-sm text-blue-700 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
              <span>Safe Space</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Chat Interface
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
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                    Online
                  </div>
                </div>
              </div>
            </div>
            <button 
              onClick={endChat}
              className="p-3 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors"
              title="End chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-[500px] flex flex-col">
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {/* System message */}
            <div className="text-center">
              <div className="bg-gray-100 rounded-full px-4 py-2 inline-block text-sm text-gray-600">
                You're now connected. Remember to be kind and supportive. 💙
              </div>
            </div>
            
            {/* Chat messages */}
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${
                  msg.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-2xl rounded-br-md'
                    : 'bg-gray-100 rounded-2xl rounded-bl-md'
                } p-3 max-w-xs`}>
                  <p className="text-sm">{msg.text}</p>
                  <span className={`text-xs ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'} mt-1 block`}>
                    {msg.sender === 'user' ? 'You' : 'Anonymous Peer'} • {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex space-x-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                onClick={sendMessage}
                disabled={!message.trim()}
                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
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

  return null;
};

export default PeerSupport;