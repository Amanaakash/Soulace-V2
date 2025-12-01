import React, { useState } from 'react';
import { Users, Heart, MessageCircle, Plus, Flag, Clock } from 'lucide-react';

const Community: React.FC = () => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "Today I realized that healing isn't linear. Some days are harder than others, but that's okay. Every small step forward counts. 💙",
      timestamp: "2 hours ago",
      reactions: { heart: 24, hug: 12, sun: 8, pray: 5 },
      userReacted: false
    },
    {
      id: 2,
      content: "To anyone struggling tonight: you are not alone. Your feelings are valid, and tomorrow is a new opportunity. Take it one breath at a time. 🌅",
      timestamp: "4 hours ago",
      reactions: { heart: 31, hug: 18, sun: 14, pray: 9 },
      userReacted: true
    },
    {
      id: 3,
      content: "Started therapy this week and it was scary but so worth it. If you're on the fence, this is your sign to take that first step. You deserve support. ✨",
      timestamp: "1 day ago",
      reactions: { heart: 45, hug: 22, sun: 16, pray: 11 },
      userReacted: false
    },
    {
      id: 4,
      content: "Meditation app helped me through a panic attack today. Sometimes the simplest tools are the most powerful. Grateful for this community. 🧘‍♀️",
      timestamp: "2 days ago",
      reactions: { heart: 38, hug: 15, sun: 12, pray: 7 },
      userReacted: true
    }
  ]);

  const reactionEmojis = {
    heart: '❤️',
    hug: '🫂',
    sun: '☀️',
    pray: '🙏'
  };

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        content: newPost,
        timestamp: "Just now",
        reactions: { heart: 0, hug: 0, sun: 0, pray: 0 },
        userReacted: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const handleReaction = (postId: number, reactionType: keyof typeof reactionEmojis) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newReactions = { ...post.reactions };
        if (post.userReacted) {
          // User already reacted, remove reaction
          Object.keys(newReactions).forEach(key => {
            if (newReactions[key as keyof typeof reactionEmojis] > 0) {
              newReactions[key as keyof typeof reactionEmojis]--;
            }
          });
          newReactions[reactionType]++;
        } else {
          // User hasn't reacted yet
          newReactions[reactionType]++;
        }
        return {
          ...post,
          reactions: newReactions,
          userReacted: true
        };
      }
      return post;
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Wall</h1>
        <p className="text-lg text-gray-600">
          Share your thoughts anonymously and connect with others on similar journeys. 
          A safe space for vulnerability and support.
        </p>
      </div>

      {/* Community Guidelines */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Community Guidelines</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <div>• Be kind, supportive, and respectful to everyone</div>
          <div>• Share your experiences to help others feel less alone</div>
          <div>• No personal information or identifying details</div>
          <div>• Report any inappropriate content immediately</div>
          <div>• Remember: this is peer support, not professional advice</div>
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Plus className="w-5 h-5 mr-2 text-blue-600" />
          Share Your Thoughts
        </h2>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share something positive, a reflection, or words of encouragement... Your voice matters and can help someone today."
          className="w-full h-24 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={280}
        />
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            {newPost.length}/280 characters
          </div>
          <button
            onClick={handleSubmitPost}
            disabled={!newPost.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Share Anonymously
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="mb-4">
              <p className="text-gray-800 leading-relaxed">{post.content}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{post.timestamp}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <button 
                  className="p-1 rounded-full hover:bg-red-50 transition-colors"
                  title="Report inappropriate content"
                >
                  <Flag className="w-4 h-4 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </div>

            {/* Reactions */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {Object.entries(reactionEmojis).map(([type, emoji]) => (
                    <button
                      key={type}
                      onClick={() => handleReaction(post.id, type as keyof typeof reactionEmojis)}
                      className="flex items-center space-x-1 px-3 py-1 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <span className="text-lg">{emoji}</span>
                      <span className="text-sm font-medium text-gray-600">
                        {post.reactions[type as keyof typeof reactionEmojis]}
                      </span>
                    </button>
                  ))}
                </div>
                
                <div className="text-sm text-gray-500">
                  React to show support
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Support Resources */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Need More Support?</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <div>
              <div className="font-medium text-gray-900">Connect with Peers</div>
              <div className="text-sm text-gray-600">Find someone to talk to in our peer support chat</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Heart className="w-5 h-5 text-red-600" />
            <div>
              <div className="font-medium text-gray-900">Professional Help</div>
              <div className="text-sm text-gray-600">Book a session with a verified mental health professional</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex space-x-3">
          <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
            Find Peer Support
          </button>
          <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors">
            Talk to Professional
          </button>
        </div>
      </div>

      {/* Moderation Notice */}
      <div className="text-center text-sm text-gray-500">
        All posts are reviewed by our community moderation team to ensure a safe, supportive environment.
        Remember: if you're in crisis, please reach out for immediate professional help.
      </div>
    </div>
  );
};

export default Community;