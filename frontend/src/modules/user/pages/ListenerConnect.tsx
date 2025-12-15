import React, { useState, useRef, useEffect } from 'react';
import './ListenerConnect.css';

interface Message {
  role: 'user' | 'listener';
  message: string;
  timestamp: Date;
}

interface ListenerProfile {
  name: string;
  avatar: string;
  status: string;
  interests: string[];
}

const ListenerConnect: React.FC = () => {
  const [isSearching, setIsSearching] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [listener, setListener] = useState<ListenerProfile | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Demo listeners pool
  const demoListeners: ListenerProfile[] = [
    {
      name: 'Sarah Johnson',
      avatar: '👩‍💼',
      status: 'Active listener for 2 years',
      interests: ['Anxiety', 'Stress Management', 'Life Transitions'],
    },
    {
      name: 'Michael Chen',
      avatar: '👨‍🎓',
      status: 'Active listener for 1 year',
      interests: ['Depression', 'Self-esteem', 'Relationships'],
    },
    {
      name: 'Emma Williams',
      avatar: '👩‍⚕️',
      status: 'Active listener for 3 years',
      interests: ['Work Stress', 'Family Issues', 'Emotional Support'],
    },
    {
      name: 'David Martinez',
      avatar: '👨‍💻',
      status: 'Active listener for 1.5 years',
      interests: ['Social Anxiety', 'Academic Stress', 'Career Guidance'],
    },
  ];

  // Simulate finding a listener
  useEffect(() => {
    if (isSearching) {
      const searchTimer = setTimeout(() => {
        // Randomly select a listener
        const randomListener = demoListeners[Math.floor(Math.random() * demoListeners.length)];
        setListener(randomListener);
        setIsSearching(false);
        
        // Wait a bit then connect
        setTimeout(() => {
          setIsConnected(true);
          setMessages([
            {
              role: 'listener',
              message: `Hi! I'm ${randomListener.name}. I'm here to listen and support you. Feel free to share what's on your mind. This is a safe space.`,
              timestamp: new Date(),
            },
          ]);
        }, 1000);
      }, 3000); // 3 seconds searching

      return () => clearTimeout(searchTimer);
    }
  }, [isSearching]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-focus input when connected
  useEffect(() => {
    if (isConnected) {
      inputRef.current?.focus();
    }
  }, [isConnected]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      role: 'user',
      message: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    // Simulate listener response (demo only)
    setTimeout(() => {
      const demoResponses = [
        "I hear you. That sounds really challenging. Can you tell me more about how you've been feeling?",
        "Thank you for sharing that with me. It takes courage to open up. I'm here for you.",
        "I understand. Those feelings are valid. What do you think would help you feel better right now?",
        "That must be difficult to deal with. How long have you been experiencing these feelings?",
        "I'm listening. You're not alone in this. Have you tried any coping strategies?",
      ];

      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];

      const listenerMessage: Message = {
        role: 'listener',
        message: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, listenerMessage]);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const endChat = () => {
    if (window.confirm('Are you sure you want to end this session?')) {
      setIsSearching(true);
      setIsConnected(false);
      setMessages([]);
      setListener(null);
    }
  };

  const searchAgain = () => {
    setIsSearching(true);
    setIsConnected(false);
    setMessages([]);
    setListener(null);
  };

  // Searching Screen
  if (isSearching) {
    return (
      <div className="listener-connect-container">
        <div className="searching-screen">
          <div className="searching-content">
            <div className="searching-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2>Finding a Listener for You</h2>
            <p>We're connecting you with a compassionate listener who's ready to support you...</p>
            <div className="searching-loader">
              <div className="loader-bar"></div>
            </div>
            <div className="searching-info">
              <div className="info-item">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="currentColor"
                  />
                </svg>
                <span>All conversations are confidential</span>
              </div>
              <div className="info-item">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="currentColor"
                  />
                </svg>
                <span>Non-judgmental support</span>
              </div>
              <div className="info-item">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="currentColor"
                  />
                </svg>
                <span>Trained peer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Connected to Listener Screen
  return (
    <div className="listener-connect-container">
      <div className="listener-chat-container">
        <div className="listener-chat-header">
          <div className="listener-info">
            <div className="listener-avatar">{listener?.avatar}</div>
            <div className="listener-details">
              <h3>{listener?.name}</h3>
              <p className="listener-status">
                <span className="status-dot"></span>
                {isConnected ? 'Connected' : 'Connecting...'}
              </p>
            </div>
          </div>
          <button className="end-chat-btn" onClick={endChat} title="End chat">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        {listener && (
          <div className="listener-profile-banner">
            <div className="profile-interests">
              <strong>Areas of support:</strong>
              {listener.interests.map((interest, index) => (
                <span key={index} className="interest-tag">
                  {interest}
                </span>
              ))}
            </div>
            <span className="listener-experience">{listener.status}</span>
          </div>
        )}

        <div className="listener-chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message-wrapper ${msg.role}`}>
              <div className="message-bubble">
                <div className="message-content">{msg.message}</div>
                <div className="message-time">{formatTime(msg.timestamp)}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="listener-chat-input-container">
          <div className="listener-chat-disclaimer">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                fill="currentColor"
              />
            </svg>
            <span>This is a demo. In production, you'll be connected to real trained listeners.</span>
          </div>
          <div className="listener-chat-input-wrapper">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows={1}
              className="listener-chat-input"
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim()}
              className="send-button"
              title="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor" />
              </svg>
            </button>
          </div>
          <button className="search-again-btn" onClick={searchAgain}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                fill="currentColor"
              />
            </svg>
            Connect with another listener
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListenerConnect;
