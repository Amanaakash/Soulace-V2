import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Sparkles, 
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

// Mood Assessment Algorithm Implementation
interface MoodQuestion {
  id: 'energy' | 'emotion' | 'social';
  question: string;
  options: Array<{
    value: number;
    text: string;
    icon: string;
  }>;
}

interface MoodProfile {
  mood: string;
  crisis: number;
  need: number;
  capacity: number;
  stability: number;
}

interface AssessmentResult {
  totalScore: number;
  category: string;
  categoryName: string;
  mood: string;
  scores: {
    crisis: number;
    supportNeed: number;
    supportCapacity: number;
    stability: number;
  };
  isCrisis: boolean;
  needsImmediateHelp: boolean;
  canHelpOthers: boolean;
}

const MoodAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{
    energy?: number;
    emotion?: number;
    social?: number;
  }>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const questions: MoodQuestion[] = [
    {
      id: 'energy',
      question: 'How would you describe your energy today?',
      options: [
        { value: 10, text: 'High energy, motivated and ready to take on challenges', icon: '🚀' },
        { value: 8, text: 'Good energy, feeling positive and active', icon: '😊' },
        { value: 6, text: 'Moderate energy, neither high nor low', icon: '😐' },
        { value: 4, text: 'Low energy, feeling tired or unmotivated', icon: '😔' },
        { value: 2, text: 'Very low energy, struggling to do basic tasks', icon: '😓' }
      ]
    },
    {
      id: 'emotion',
      question: 'How are you feeling emotionally right now?',
      options: [
        { value: 10, text: 'Great! Happy, content, or excited', icon: '🌟' },
        { value: 8, text: 'Pretty good, calm and stable', icon: '😌' },
        { value: 6, text: 'Okay, neither good nor bad', icon: '😶' },
        { value: 4, text: 'Not great, sad, anxious, or frustrated', icon: '😟' },
        { value: 2, text: 'Really struggling, depressed, angry, or overwhelmed', icon: '😞' }
      ]
    },
    {
      id: 'social',
      question: 'How do you feel about connecting with others today?',
      options: [
        { value: 10, text: 'Want to help others and share positivity', icon: '🤝' },
        { value: 8, text: 'Open to chatting and supporting someone', icon: '💬' },
        { value: 6, text: 'Neutral about social interaction', icon: '🤷' },
        { value: 4, text: 'Need someone to talk to, seeking support', icon: '🫂' },
        { value: 2, text: 'Really need help, feeling isolated or desperate', icon: '😢' }
      ]
    }
  ];

  // Mood profiles database
  const moodProfiles: Record<number, MoodProfile> = {
    6: { mood: "Severely Depressed", crisis: 90, need: 95, capacity: 10, stability: 20 },
    7: { mood: "Scared/Terrified", crisis: 85, need: 95, capacity: 10, stability: 20 },
    8: { mood: "Angry/Furious", crisis: 70, need: 85, capacity: 25, stability: 35 },
    9: { mood: "Depressed/Hopeless", crisis: 80, need: 90, capacity: 15, stability: 25 },
    10: { mood: "Overwhelmed", crisis: 75, need: 85, capacity: 20, stability: 30 },
    11: { mood: "Lonely/Isolated", crisis: 60, need: 80, capacity: 30, stability: 40 },
    12: { mood: "Frustrated/Annoyed", crisis: 30, need: 55, capacity: 55, stability: 65 },
    13: { mood: "Anxious/Worried", crisis: 40, need: 65, capacity: 45, stability: 55 },
    14: { mood: "Sad/Disappointed", crisis: 35, need: 60, capacity: 50, stability: 60 },
    15: { mood: "Confused/Uncertain", crisis: 25, need: 60, capacity: 50, stability: 50 },
    16: { mood: "Mildly Anxious", crisis: 30, need: 55, capacity: 55, stability: 65 },
    17: { mood: "Disappointed", crisis: 25, need: 50, capacity: 60, stability: 70 },
    18: { mood: "Surprised/Alert", crisis: 25, need: 45, capacity: 60, stability: 70 },
    19: { mood: "Curious/Interested", crisis: 20, need: 40, capacity: 65, stability: 75 },
    20: { mood: "Calm/Neutral", crisis: 15, need: 35, capacity: 70, stability: 80 },
    21: { mood: "Focused/Engaged", crisis: 15, need: 30, capacity: 75, stability: 85 },
    22: { mood: "Pleasant/Good", crisis: 10, need: 25, capacity: 75, stability: 85 },
    23: { mood: "Optimistic", crisis: 10, need: 20, capacity: 80, stability: 90 },
    24: { mood: "Confident/Proud", crisis: 5, need: 25, capacity: 80, stability: 85 },
    25: { mood: "Happy/Content", crisis: 5, need: 20, capacity: 85, stability: 90 },
    26: { mood: "Peaceful/Blessed", crisis: 0, need: 20, capacity: 85, stability: 95 },
    27: { mood: "Enthusiastic", crisis: 5, need: 15, capacity: 90, stability: 90 },
    28: { mood: "Joyful/Excited", crisis: 5, need: 15, capacity: 90, stability: 90 },
    29: { mood: "Inspired/Motivated", crisis: 0, need: 10, capacity: 95, stability: 95 },
    30: { mood: "Euphoric/Elated", crisis: 5, need: 10, capacity: 95, stability: 90 }
  };

  const calculateMoodAssessment = (): AssessmentResult => {
    const totalScore = (answers.energy || 0) + (answers.emotion || 0) + (answers.social || 0);
    
    let category = '';
    let categoryName = '';
    
    if (totalScore >= 24 && totalScore <= 30) {
      category = 'HELPER';
      categoryName = 'Helper/Supporter';
    } else if (totalScore >= 18 && totalScore <= 23) {
      category = 'STABLE';
      categoryName = 'Stable/Balanced';
    } else if (totalScore >= 12 && totalScore <= 17) {
      category = 'MODERATE';
      categoryName = 'Needs Moderate Support';
    } else {
      category = 'CRISIS';
      categoryName = 'High Support/Crisis';
    }
    
    const profile = moodProfiles[totalScore] || moodProfiles[Math.min(30, Math.max(6, totalScore))];
    
    return {
      totalScore,
      category,
      categoryName,
      mood: profile.mood,
      scores: {
        crisis: profile.crisis,
        supportNeed: profile.need,
        supportCapacity: profile.capacity,
        stability: profile.stability
      },
      isCrisis: category === 'CRISIS',
      needsImmediateHelp: profile.crisis >= 70,
      canHelpOthers: profile.capacity >= 70
    };
  };

  const handleAnswer = (value: number) => {
    const questionId = questions[currentQuestion].id;
    setAnswers({ ...answers, [questionId]: value });
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // Calculate results
      setTimeout(() => {
        const assessment = calculateMoodAssessment();
        setResult(assessment);
        setShowResults(true);
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResult(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'HELPER':
        return { bg: 'from-green-500 to-emerald-600', text: 'text-green-600', border: 'border-green-500' };
      case 'STABLE':
        return { bg: 'from-blue-500 to-cyan-600', text: 'text-blue-600', border: 'border-blue-500' };
      case 'MODERATE':
        return { bg: 'from-orange-500 to-yellow-600', text: 'text-orange-600', border: 'border-orange-500' };
      case 'CRISIS':
        return { bg: 'from-red-500 to-pink-600', text: 'text-red-600', border: 'border-red-500' };
      default:
        return { bg: 'from-gray-500 to-gray-600', text: 'text-gray-600', border: 'border-gray-500' };
    }
  };

  if (showResults && result) {
    const colors = getCategoryColor(result.category);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Mood Assessment</h1>
            <p className="text-gray-600">Here's what we learned about your current state</p>
          </div>

          {/* Main Result Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border-2 border-gray-100">
            <div className="text-center mb-8">
              <div className={`inline-block px-6 py-3 bg-gradient-to-r ${colors.bg} rounded-full text-white font-semibold text-lg mb-4`}>
                {result.categoryName}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">You're feeling: {result.mood}</h2>
              <p className="text-gray-600">Total Score: {result.totalScore}/30</p>
            </div>

            {/* Score Breakdown */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-medium">Crisis Level</span>
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex items-end">
                  <span className="text-4xl font-bold text-red-600">{result.scores.crisis}</span>
                  <span className="text-gray-500 ml-2 mb-1">/100</span>
                </div>
                <div className="mt-3 h-2 bg-red-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
                    style={{ width: `${result.scores.crisis}%` }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-medium">Support Need</span>
                  <Heart className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex items-end">
                  <span className="text-4xl font-bold text-blue-600">{result.scores.supportNeed}</span>
                  <span className="text-gray-500 ml-2 mb-1">/100</span>
                </div>
                <div className="mt-3 h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                    style={{ width: `${result.scores.supportNeed}%` }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-medium">Support Capacity</span>
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-end">
                  <span className="text-4xl font-bold text-green-600">{result.scores.supportCapacity}</span>
                  <span className="text-gray-500 ml-2 mb-1">/100</span>
                </div>
                <div className="mt-3 h-2 bg-green-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                    style={{ width: `${result.scores.supportCapacity}%` }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-medium">Stability</span>
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex items-end">
                  <span className="text-4xl font-bold text-purple-600">{result.scores.stability}</span>
                  <span className="text-gray-500 ml-2 mb-1">/100</span>
                </div>
                <div className="mt-3 h-2 bg-purple-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                    style={{ width: `${result.scores.stability}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Crisis Alert */}
            {result.needsImmediateHelp && (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-500 rounded-2xl p-6 mb-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-red-500 rounded-full p-2">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-red-900 mb-2">Immediate Support Available</h3>
                    <p className="text-red-800 mb-4">
                      Your assessment indicates you may benefit from immediate professional support. 
                      You're not alone, and help is available 24/7.
                    </p>
                    <button 
                      onClick={() => navigate('/emergency')}
                      className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
                    >
                      Access Emergency Resources
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Actions</h3>
              <div className="space-y-3">
                {result.canHelpOthers && (
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <Sparkles className="w-6 h-6 text-green-600 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900">You can help others today!</p>
                      <p className="text-sm text-gray-600">Consider connecting with someone who needs support</p>
                    </div>
                  </div>
                )}
                {result.isCrisis || result.scores.supportNeed > 50 ? (
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <Heart className="w-6 h-6 text-blue-600 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900">Connect with a supporter</p>
                      <p className="text-sm text-gray-600">Find someone who can listen and provide comfort</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <Users className="w-6 h-6 text-purple-600 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-900">Join the community</p>
                      <p className="text-sm text-gray-600">Share experiences and connect with peers</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/peer-support')}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Find Your Match
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto bg-white text-gray-700 py-4 px-8 rounded-full font-semibold text-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mood Assessment</h1>
          <p className="text-gray-600">Help us understand how you're feeling today</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border-2 border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = answers[question.id] === option.value;
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-lg scale-[1.02]'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-4xl flex-shrink-0">{option.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900">{option.text}</span>
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                          isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {option.value} pts
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentQuestion === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
              currentQuestion === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="flex space-x-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentQuestion
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 w-8'
                    : index < currentQuestion
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="w-24" /> {/* Spacer for alignment */}
        </div>
      </div>
    </div>
  );
};

export default MoodAssessment;

