import React, { useState, useEffect } from 'react';
import { Heart, Play, Pause, RotateCcw, Volume2, Timer, Headphones } from 'lucide-react';

const Mindfulness: React.FC = () => {
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(300); // 5 minutes default
  const [timeLeft, setTimeLeft] = useState(duration);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  const mindfulnessCategories = [
    {
      title: 'Breathing Exercises',
      icon: '🫁',
      color: 'from-blue-500 to-cyan-500',
      exercises: [
        { name: '4-7-8 Breathing', duration: '5 min', description: 'Calming breath technique for anxiety relief' },
        { name: 'Box Breathing', duration: '10 min', description: 'Structured breathing for focus and balance' },
        { name: 'Ocean Breath', duration: '8 min', description: 'Deep breathing with ocean-like sounds' }
      ]
    },
    {
      title: 'Guided Meditation',
      icon: '🧘',
      color: 'from-purple-500 to-pink-500',
      exercises: [
        { name: 'Body Scan', duration: '15 min', description: 'Progressive relaxation through body awareness' },
        { name: 'Loving Kindness', duration: '12 min', description: 'Cultivate compassion for self and others' },
        { name: 'Mindful Awareness', duration: '20 min', description: 'Present moment awareness meditation' }
      ]
    },
    {
      title: 'Sleep & Relaxation',
      icon: '🌙',
      color: 'from-indigo-500 to-purple-500',
      exercises: [
        { name: 'Sleep Stories', duration: '25 min', description: 'Calming stories to help you drift off' },
        { name: 'Progressive Muscle', duration: '18 min', description: 'Release tension throughout your body' },
        { name: 'Rain Sounds', duration: '30 min', description: 'Natural sounds for deep relaxation' }
      ]
    },
    {
      title: 'Affirmations',
      icon: '✨',
      color: 'from-green-500 to-teal-500',
      exercises: [
        { name: 'Self-Love', duration: '7 min', description: 'Positive affirmations for self-acceptance' },
        { name: 'Confidence Building', duration: '10 min', description: 'Boost your inner confidence and worth' },
        { name: 'Stress Relief', duration: '8 min', description: 'Calm your mind and release stress' }
      ]
    }
  ];

  const breathingPatterns = {
    inhale: { duration: 4000, instruction: 'Breathe In', color: 'bg-blue-500' },
    hold: { duration: 7000, instruction: 'Hold', color: 'bg-purple-500' },
    exhale: { duration: 8000, instruction: 'Breathe Out', color: 'bg-green-500' }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setCurrentSession(null);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    if (currentSession === 'breathing' && isPlaying) {
      const cycleBreathing = () => {
        const phases: Array<keyof typeof breathingPatterns> = ['inhale', 'hold', 'exhale'];
        let currentPhaseIndex = 0;

        const nextPhase = () => {
          setBreathingPhase(phases[currentPhaseIndex]);
          setTimeout(() => {
            currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
            if (isPlaying) nextPhase();
          }, breathingPatterns[phases[currentPhaseIndex]].duration);
        };

        nextPhase();
      };

      cycleBreathing();
    }
  }, [currentSession, isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = (type: string, sessionDuration: number = 300) => {
    setCurrentSession(type);
    setDuration(sessionDuration);
    setTimeLeft(sessionDuration);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSession = () => {
    setIsPlaying(false);
    setCurrentSession(null);
    setTimeLeft(duration);
  };

  if (currentSession === 'breathing') {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Breathing Exercise Interface */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">4-7-8 Breathing Exercise</h1>
          <p className="text-gray-600">Follow the circle and breathe along</p>
        </div>

        {/* Breathing Circle */}
        <div className="flex items-center justify-center">
          <div className="relative w-80 h-80">
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out ${
                breathingPatterns[breathingPhase].color
              } opacity-20`}
              style={{
                transform: breathingPhase === 'inhale' ? 'scale(1.2)' : breathingPhase === 'hold' ? 'scale(1.2)' : 'scale(0.8)'
              }}
            />
            <div
              className={`absolute inset-8 rounded-full transition-all duration-1000 ease-in-out ${
                breathingPatterns[breathingPhase].color
              } opacity-40`}
              style={{
                transform: breathingPhase === 'inhale' ? 'scale(1.1)' : breathingPhase === 'hold' ? 'scale(1.1)' : 'scale(0.9)'
              }}
            />
            <div
              className={`absolute inset-16 rounded-full transition-all duration-1000 ease-in-out ${
                breathingPatterns[breathingPhase].color
              } flex items-center justify-center`}
              style={{
                transform: breathingPhase === 'inhale' ? 'scale(1.05)' : breathingPhase === 'hold' ? 'scale(1.05)' : 'scale(0.95)'
              }}
            >
              <div className="text-center text-white">
                <div className="text-2xl font-bold mb-2">
                  {breathingPatterns[breathingPhase].instruction}
                </div>
                <div className="text-lg">{formatTime(timeLeft)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={togglePlayPause}
            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={resetSession}
            className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">How to Practice 4-7-8 Breathing</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <div>• <strong>Inhale</strong> through your nose for 4 counts</div>
            <div>• <strong>Hold</strong> your breath for 7 counts</div>
            <div>• <strong>Exhale</strong> through your mouth for 8 counts</div>
            <div>• Repeat this cycle to calm your nervous system</div>
          </div>
        </div>
      </div>
    );
  }

  if (currentSession === 'meditation') {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Meditation Interface */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Guided Meditation</h1>
          <p className="text-gray-600">Find your center and inner peace</p>
        </div>

        {/* Meditation Visual */}
        <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl p-12 text-center text-white">
          <div className="animate-pulse mb-6">
            <Heart className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Body Scan Meditation</h2>
          <p className="text-lg opacity-90 mb-6">
            Focus on your breath and let your awareness gently scan through your body...
          </p>
          <div className="text-3xl font-bold">{formatTime(timeLeft)}</div>
        </div>

        {/* Audio Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4 mb-4">
            <Volume2 className="w-5 h-5 text-gray-600" />
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '70%' }} />
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={togglePlayPause}
              className="p-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={resetSession}
              className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mindfulness & Healing</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find peace and balance through guided exercises, meditation, and relaxation techniques designed for your wellbeing.
        </p>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => startSession('breathing', 300)}
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="text-2xl mb-2">🫁</div>
            <div className="font-medium text-gray-900">5-Min Breathing</div>
            <div className="text-sm text-gray-600">Quick anxiety relief</div>
          </button>
          <button
            onClick={() => startSession('meditation', 900)}
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="text-2xl mb-2">🧘</div>
            <div className="font-medium text-gray-900">15-Min Meditation</div>
            <div className="text-sm text-gray-600">Deep relaxation</div>
          </button>
          <button
            onClick={() => startSession('sleep', 1800)}
            className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="text-2xl mb-2">🌙</div>
            <div className="font-medium text-gray-900">30-Min Sleep</div>
            <div className="text-sm text-gray-600">Better rest</div>
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-8">
        {mindfulnessCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-6">
              <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-xl mr-4`}>
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {category.exercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Timer className="w-4 h-4 mr-1" />
                      {exercise.duration}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{exercise.description}</p>
                  <button
                    onClick={() => {
                      if (category.title === 'Breathing Exercises') {
                        startSession('breathing', 300);
                      } else if (category.title === 'Guided Meditation') {
                        startSession('meditation', 900);
                      } else {
                        startSession('other', 1800);
                      }
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Session
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Daily Mindfulness Tips */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          ✨ Daily Mindfulness Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>• Start your day with 3 deep breaths</div>
          <div>• Practice gratitude before meals</div>
          <div>• Take mindful walks without devices</div>
          <div>• Set aside 10 minutes for meditation</div>
          <div>• Use breathing exercises during stress</div>
          <div>• End your day with positive affirmations</div>
        </div>
      </div>
    </div>
  );
};

export default Mindfulness;