import React, { useState } from 'react';
import { TrendingUp, Calendar, Plus, Smile, Book, BarChart3 } from 'lucide-react';
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [currentView, setCurrentView] = useState<'track' | 'history' | 'insights'>('track');

  const moods = [
    { value: 1, emoji: '😢', label: 'Very Sad', color: 'bg-red-500' },
    { value: 2, emoji: '😔', label: 'Sad', color: 'bg-orange-400' },
    { value: 3, emoji: '😐', label: 'Neutral', color: 'bg-yellow-400' },
    { value: 4, emoji: '🙂', label: 'Good', color: 'bg-green-400' },
    { value: 5, emoji: '😊', label: 'Great', color: 'bg-green-500' }
  ];

  // Mock data for demonstration
  const weekDays = eachDayOfInterval({
    start: startOfWeek(subDays(new Date(), 7)),
    end: endOfWeek(subDays(new Date(), 7))
  });

  const mockMoodData = [
    { date: weekDays[0], mood: 3, note: 'Feeling okay today' },
    { date: weekDays[1], mood: 4, note: 'Had a good therapy session' },
    { date: weekDays[2], mood: 2, note: 'Difficult day at work' },
    { date: weekDays[3], mood: 4, note: 'Meditation helped' },
    { date: weekDays[4], mood: 5, note: 'Great day with friends' },
    { date: weekDays[5], mood: 3, note: 'Neutral mood' },
    { date: weekDays[6], mood: 4, note: 'Peaceful Sunday' }
  ];

  const journalPrompts = [
    "What made you smile today?",
    "What challenged you today and how did you handle it?",
    "What are you grateful for right now?",
    "How did you practice self-care today?",
    "What emotions did you experience today?",
    "What would you tell a friend having the same day as you?",
    "What small win can you celebrate today?"
  ];

  const getRandomPrompt = () => {
    return journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
  };

  const handleMoodSubmit = () => {
    if (selectedMood) {
      // Here you would typically save to database
      alert('Mood logged successfully!');
      setSelectedMood(null);
      setJournalEntry('');
    }
  };

  if (currentView === 'history') {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mood History</h1>
            <p className="text-gray-600">Track your emotional journey over time</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentView('track')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Track Mood
            </button>
            <button
              onClick={() => setCurrentView('insights')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              View Insights
            </button>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">This Week's Mood</h3>
          <div className="space-y-4">
            {mockMoodData.map((entry, index) => {
              const mood = moods.find(m => m.value === entry.mood);
              return (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-600 w-20">
                    {format(entry.date, 'EEE')}
                  </div>
                  <div className="text-sm text-gray-500 w-16">
                    {format(entry.date, 'MMM d')}
                  </div>
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="text-2xl">{mood?.emoji}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{mood?.label}</div>
                      <div className="text-xs text-gray-600">{entry.note}</div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${mood?.color}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Monthly Mood Trends</h3>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => {
              const moodValue = Math.floor(Math.random() * 5) + 1;
              const mood = moods.find(m => m.value === moodValue);
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-lg ${mood?.color} opacity-70 hover:opacity-100 transition-opacity cursor-pointer`}
                  title={`${mood?.label} - Day ${i + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'insights') {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mood Insights</h1>
            <p className="text-gray-600">Discover patterns in your emotional wellness</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentView('track')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Track Mood
            </button>
            <button
              onClick={() => setCurrentView('history')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              View History
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
            <div className="text-2xl font-bold text-blue-700 mb-2">7.2</div>
            <div className="text-sm text-blue-600">Average Mood Score</div>
            <div className="text-xs text-blue-500 mt-1">↑ 0.3 from last week</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6">
            <div className="text-2xl font-bold text-green-700 mb-2">28</div>
            <div className="text-sm text-green-600">Days Tracked</div>
            <div className="text-xs text-green-500 mt-1">Keep it up!</div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6">
            <div className="text-2xl font-bold text-purple-700 mb-2">😊</div>
            <div className="text-sm text-purple-600">Most Common Mood</div>
            <div className="text-xs text-purple-500 mt-1">Good days ahead</div>
          </div>
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-6">
            <div className="text-2xl font-bold text-orange-700 mb-2">5</div>
            <div className="text-sm text-orange-600">Streak Days</div>
            <div className="text-xs text-orange-500 mt-1">Above average mood</div>
          </div>
        </div>

        {/* Patterns & Recommendations */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Patterns Discovered</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-900 mb-1">Weekend Boost</div>
                <div className="text-sm text-blue-700">Your mood tends to improve on weekends. Consider planning more relaxing activities.</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="font-medium text-green-900 mb-1">Morning Advantage</div>
                <div className="text-sm text-green-700">You log higher moods in the morning. Try maintaining morning routines.</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="font-medium text-purple-900 mb-1">Mindfulness Impact</div>
                <div className="text-sm text-purple-700">Days with meditation show 15% higher mood scores.</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalized Recommendations</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div className="text-xl">🧘</div>
                <div>
                  <div className="font-medium text-gray-900">Try Morning Meditation</div>
                  <div className="text-sm text-gray-600">Based on your patterns, 10 minutes of morning meditation could boost your mood.</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-pink-50 rounded-lg">
                <div className="text-xl">🚶</div>
                <div>
                  <div className="font-medium text-gray-900">Midweek Walks</div>
                  <div className="text-sm text-gray-600">Your midweek dips could benefit from short nature walks.</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="text-xl">📱</div>
                <div>
                  <div className="font-medium text-gray-900">Connect with Others</div>
                  <div className="text-sm text-gray-600">Social connections seem to positively impact your mood tracking.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mood Tracker</h1>
          <p className="text-gray-600">How are you feeling today? Track your emotional wellness journey.</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentView('history')}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            View History
          </button>
          <button
            onClick={() => setCurrentView('insights')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            View Insights
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Mood Selection */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Rate Your Current Mood</h2>
          <div className="space-y-4">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                  selectedMood === mood.value
                    ? 'bg-blue-50 border-2 border-blue-500 transform scale-[1.02]'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{mood.emoji}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{mood.label}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`${mood.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${(mood.value / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-600">{mood.value}/5</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Journal Entry */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Reflection Journal</h2>
            <Book className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="text-sm font-medium text-gray-800 mb-1">Today's Prompt:</div>
            <div className="text-sm text-gray-600">"{getRandomPrompt()}"</div>
          </div>

          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="Write about your day, feelings, or anything on your mind..."
            className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <div className="mt-4 text-xs text-gray-500">
            Your entries are private and secure. They help you track patterns and growth.
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">14</div>
            <div className="text-sm text-gray-600">Days Tracked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">4.2</div>
            <div className="text-sm text-gray-600">Avg Mood Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">7</div>
            <div className="text-sm text-gray-600">Streak Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">85%</div>
            <div className="text-sm text-gray-600">Positive Days</div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      {selectedMood && (
        <div className="text-center">
          <button
            onClick={handleMoodSubmit}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Log My Mood
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;