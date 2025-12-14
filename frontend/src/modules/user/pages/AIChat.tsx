import React, { useState, useRef, useEffect } from 'react';
import { API_BASE_URL, API_ENDPOINTS } from '../../../config/api.config';
import './AIChat.css';

interface Message {
  role: 'user' | 'assistant';
  message: string;
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      message: "Hello! I'm Soulace AI, your compassionate mental health support companion. I'm here to listen and support you. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCrisisMode, setIsCrisisMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || isCrisisMode) return;

    const userMessage: Message = {
      role: 'user',
      message: inputMessage.trim(),
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      // Prepare chat history for API (excluding timestamps and initial welcome message)
      // Filter out the first message if it's from the assistant (welcome message)
      const historyToSend = messages
        .filter((msg, index) => {
          // Exclude the first message if it's the initial assistant greeting
          if (index === 0 && msg.role === 'assistant') {
            return false;
          }
          return true;
        })
        .map((msg) => ({
          role: msg.role,
          message: msg.message,
        }));

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AI_CHAT.GEMINI}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          message: userMessage.message,
          history: historyToSend,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();

      // Check for crisis state
      if (data.crisisState === true) {
        setIsCrisisMode(true);
      }

      // Handle response format - it could be a string or an object
      let messageText = '';
      if (typeof data.reply === 'string') {
        messageText = data.reply;
      } else if (typeof data.reply === 'object' && data.reply !== null) {
        // If it's an object with greeting and invitation fields
        if (data.reply.greeting && data.reply.invitation) {
          messageText = `${data.reply.greeting}\n\n${data.reply.invitation}`;
        } else {
          // Fallback: stringify the object
          messageText = JSON.stringify(data.reply);
        }
      }

      const assistantMessage: Message = {
        role: 'assistant',
        message: messageText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('AI Chat Error:', err);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
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

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        message: "Hello! I'm Soulace AI, your compassionate mental health support companion. I'm here to listen and support you. How are you feeling today?",
        timestamp: new Date(),
      },
    ]);
    setError(null);
    setIsCrisisMode(false);
  };

  return (
    <div className="ai-chat-container">
      {/* Crisis Modal */}
      {isCrisisMode && (
        <div className="crisis-modal-overlay">
          <div className="crisis-modal">
            <div className="crisis-modal-header">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#ef4444"/>
              </svg>
              <h2>Immediate Support Needed</h2>
            </div>
            <div className="crisis-modal-content">
              <p className="crisis-message">
                We've detected that you may be experiencing a crisis situation. Your safety and well-being are our top priority. 
                Please reach out to professional crisis support immediately.
              </p>
              
              <div className="crisis-contacts">
                <h3>Crisis Support Resources:</h3>
                <div className="crisis-contact-item">
                  <strong>National Suicide Prevention Lifeline (US)</strong>
                  <a href="tel:988">988</a>
                  <span>Available 24/7</span>
                </div>
                <div className="crisis-contact-item">
                  <strong>Crisis Text Line</strong>
                  <span>Text HOME to <a href="sms:741741">741741</a></span>
                  <span>Available 24/7</span>
                </div>
                <div className="crisis-contact-item">
                  <strong>International Association for Suicide Prevention</strong>
                  <a href="https://www.iasp.info/resources/Crisis_Centres/" target="_blank" rel="noopener noreferrer">
                    Find help in your country
                  </a>
                </div>
                <div className="crisis-contact-item">
                  <strong>Emergency Services</strong>
                  <a href="tel:911">Call 911</a>
                  <span>For immediate emergency</span>
                </div>
              </div>

              <p className="crisis-note">
                If you're in immediate danger, please call emergency services right away. 
                You deserve support, and there are people who want to help you through this.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="ai-chat-header">
        <div className="ai-chat-header-content">
          <div className="ai-avatar">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="ai-chat-title">
            <h2>Soulace AI</h2>
            <p className="ai-status">
              <span className="status-dot"></span>
              Always here for you
            </p>
          </div>
        </div>
        <button className="clear-chat-btn" onClick={clearChat} title="Clear chat">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <div className="ai-chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.role}`}>
            <div className="message-bubble">
              <div className="message-content">{msg.message}</div>
              <div className="message-time">{formatTime(msg.timestamp)}</div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message-wrapper assistant">
            <div className="message-bubble loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
            </svg>
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="ai-chat-input-container">
        {isCrisisMode ? (
          <div className="crisis-input-message">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
            </svg>
            <span>Chat is disabled. Please contact crisis support for immediate help.</span>
          </div>
        ) : (
          <>
            <div className="ai-chat-disclaimer">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
              </svg>
              <span>I'm an AI assistant, not a replacement for professional therapy</span>
            </div>
            <div className="ai-chat-input-wrapper">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share what's on your mind..."
                disabled={isLoading}
                rows={1}
                className="ai-chat-input"
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="send-button"
                title="Send message"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIChat;

