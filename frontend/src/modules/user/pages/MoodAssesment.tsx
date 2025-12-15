import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Sparkles, 
  TrendingUp,
  Users,
  CheckCircle,
  Zap,
  Smile
} from 'lucide-react';

// RULER Mood Meter - 10x10 Mood Matrix
const MOOD_MATRIX = [
  // Rows 0-4 (High Energy)
  ["Enraged", "Panicked", "Stressed", "Jittery", "Shocked", "Surprised", "Upbeat", "Festive", "Exhilarated", "Ecstatic"],
  ["Livid", "Furious", "Frustrated", "Tense", "Stunned", "Hyper", "Cheerful", "Motivated", "Inspired", "Elated"],
  ["Fuming", "Frightened", "Angry", "Nervous", "Restless", "Energized", "Lively", "Enthusiastic", "Optimistic", "Excited"],
  ["Anxious", "Apprehensive", "Worried", "Irritated", "Annoyed", "Pleased", "Happy", "Focused", "Proud", "Thrilled"],
  ["Repulsed", "Troubled", "Concerned", "Uneasy", "Peeved", "Pleasant", "Joyful", "Hopeful", "Playful", "Blissful"],
  // Rows 5-9 (Low Energy)
  ["Disgusted", "Glum", "Disappointed", "Down", "Apathetic", "At Ease", "Easygoing", "Content", "Loving", "Fulfilled"],
  ["Pessimistic", "Morose", "Discouraged", "Sad", "Bored", "Calm", "Secure", "Satisfied", "Grateful", "Touched"],
  ["Alienated", "Miserable", "Lonely", "Disheartened", "Tired", "Relaxed", "Chill", "Restful", "Blessed", "Balanced"],
  ["Despondent", "Depressed", "Sullen", "Exhausted", "Fatigued", "Mellow", "Thoughtful", "Peaceful", "Comfy", "Carefree"],
  ["Despair", "Hopeless", "Desolate", "Spent", "Drained", "Sleepy", "Complacent", "Tranquil", "Cozy", "Serene"]
];

// Mock User Database for matching
const USER_DB = [
  { id: 1, name: 'Alex', zone: 'Red' }, { id: 2, name: 'Sam', zone: 'Red' },
  { id: 3, name: 'Jordan', zone: 'Blue' }, { id: 4, name: 'Taylor', zone: 'Blue' },
  { id: 5, name: 'Casey', zone: 'Green' }, { id: 6, name: 'Jamie', zone: 'Green' },
  { id: 7, name: 'Morgan', zone: 'Yellow' }, { id: 8, name: 'Riley', zone: 'Yellow' }
];

interface MatchResult {
  id: number;
  name: string;
  zone: string;
}

const MoodAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Assess, 2: Select Mood, 3: Connect, 4: Result
  const [energy, setEnergy] = useState<number | null>(null); // 0 or 1
  const [pleasantness, setPleasantness] = useState<number | null>(null); // 0 or 1
  const [currentZone, setCurrentZone] = useState<string | null>(null);
  const [displayedMoods, setDisplayedMoods] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [showFullMatrix, setShowFullMatrix] = useState(false);

  // Calculate Zone based on Energy and Pleasantness
  const calculateZone = (e: number, p: number): { zone: string; moods: string[] } => {
    let zone = "";
    let rStart = 0, rEnd = 5; // Default High Energy
    let cStart = 0, cEnd = 5; // Default Low Pleasantness

    if (e === 1 && p === 0) { zone = "Red"; }
    else if (e === 1 && p === 1) { zone = "Yellow"; cStart = 5; cEnd = 10; }
    else if (e === 0 && p === 0) { zone = "Blue"; rStart = 5; rEnd = 10; }
    else if (e === 0 && p === 1) { zone = "Green"; rStart = 5; rEnd = 10; cStart = 5; cEnd = 10; }

    // Slice the matrix
    const moods: string[] = [];
    for (let r = rStart; r < rEnd; r++) {
      for (let c = cStart; c < cEnd; c++) {
        moods.push(MOOD_MATRIX[r][c]);
      }
    }
    return { zone, moods };
  };

  const handleAssessmentSubmit = () => {
    if (energy === null || pleasantness === null) return;
    const { zone, moods } = calculateZone(energy, pleasantness);
    setCurrentZone(zone);
    setDisplayedMoods(moods);
    setStep(2);
  };

  // Handle Matching Logic
  const findMatch = (type: 'similar' | 'different') => {
    let potentialMatches: typeof USER_DB = [];

    if (type === 'similar') {
      // Logic: Same zone OR Vertical Neighbor (Adjacent Up/Down)
      const verticalNeighbor: Record<string, string> = {
        'Red': 'Blue', 'Blue': 'Red',
        'Yellow': 'Green', 'Green': 'Yellow'
      };
      
      const neighbor = verticalNeighbor[currentZone || ''];
      potentialMatches = USER_DB.filter(u => u.zone === currentZone || u.zone === neighbor);
    } else {
      // Logic: Different Headspace (Any zone except current)
      potentialMatches = USER_DB.filter(u => u.zone !== currentZone);
    }

    // Pick random
    if (potentialMatches.length > 0) {
      const randomUser = potentialMatches[Math.floor(Math.random() * potentialMatches.length)];
      setMatchResult(randomUser);
    } else {
      setMatchResult({ id: 0, name: "No Match", zone: "Unknown" });
    }
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setEnergy(null);
    setPleasantness(null);
    setCurrentZone(null);
    setDisplayedMoods([]);
    setSelectedMood("");
    setMatchResult(null);
    setShowFullMatrix(false);
  };

  const getZoneColor = (zone: string) => {
    switch(zone) {
      case 'Red': 
        return { 
          bg: 'from-red-400 to-red-600', 
          light: 'bg-red-50', 
          border: 'border-red-500',
          text: 'text-red-600'
        };
      case 'Yellow': 
        return { 
          bg: 'from-yellow-400 to-yellow-600', 
          light: 'bg-yellow-50', 
          border: 'border-yellow-500',
          text: 'text-yellow-700'
        };
      case 'Blue': 
        return { 
          bg: 'from-blue-400 to-blue-600', 
          light: 'bg-blue-50', 
          border: 'border-blue-500',
          text: 'text-blue-600'
        };
      case 'Green': 
        return { 
          bg: 'from-green-400 to-green-600', 
          light: 'bg-green-50', 
          border: 'border-green-500',
          text: 'text-green-600'
        };
      default: 
        return { 
          bg: 'from-gray-400 to-gray-600', 
          light: 'bg-gray-50', 
          border: 'border-gray-500',
          text: 'text-gray-600'
        };
    }
  };

  // STEP 4: RESULT - Match Found
  if (step === 4 && matchResult) {
    const colors = getZoneColor(matchResult.zone);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">It's a Match!</h1>
            <p className="text-gray-600">You're now connected with someone</p>
          </div>

          {/* Main Result Card */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border-2 border-gray-100">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🤝</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                You are connecting with <span className="text-blue-600">{matchResult.name}</span>
              </h2>
              <div className={`inline-block px-6 py-3 bg-gradient-to-r ${colors.bg} rounded-full text-white font-semibold text-lg`}>
                They are in the {matchResult.zone} Zone
              </div>
            </div>

            {/* Your Mood Summary */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
                Your Mood
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 font-medium">Current Zone: <span className={`font-bold ${getZoneColor(currentZone || '').text}`}>{currentZone}</span></p>
                  <p className="text-gray-700 font-medium">Feeling: <span className="font-bold text-gray-900">{selectedMood}</span></p>
                </div>
                <div className={`w-20 h-20 bg-gradient-to-r ${getZoneColor(currentZone || '').bg} rounded-2xl shadow-lg`}></div>
              </div>
            </div>

            {/* Connection Info */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-blue-600" />
                What's Next?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <Users className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Start a conversation</p>
                    <p className="text-sm text-gray-600">Open up and share how you're feeling</p>
                  </div>
                </div>
                <div className="flex items-start p-4 bg-white rounded-lg shadow-sm">
                  <Heart className="w-6 h-6 text-purple-600 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Listen and support</p>
                    <p className="text-sm text-gray-600">Be present for each other</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/peer-chat')}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Start Chat
            </button>
            <button
              onClick={handleReset}
              className="sm:w-auto bg-white text-gray-700 py-4 px-8 rounded-full font-semibold text-lg border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 3: CONNECTION - Choose match type
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Connection</h1>
            <p className="text-gray-600">How would you like to connect?</p>
          </div>

          {/* Mood Summary */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6 border-2 border-gray-100">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your Mood: {selectedMood}</h3>
              <div className={`inline-block px-4 py-2 bg-gradient-to-r ${getZoneColor(currentZone || '').bg} rounded-full text-white font-semibold`}>
                {currentZone} Zone
              </div>
            </div>
          </div>

          {/* Connection Options */}
          <div className="space-y-4">
            <button
              onClick={() => findMatch('similar')}
              className="w-full bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Similar Headspace</h3>
                  <p className="text-gray-600">
                    Connect with someone in the <span className="font-semibold">{currentZone}</span> zone or adjacent zones.
                    Share experiences and understand each other's feelings.
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => findMatch('different')}
              className="w-full bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100 hover:border-purple-500 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Different Headspace</h3>
                  <p className="text-gray-600">
                    Connect with someone feeling something completely different.
                    Gain new perspectives and balanced support.
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Back Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-semibold bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Mood Selection</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: MOOD SELECTION
  if (step === 2) {
    const colors = getZoneColor(currentZone || '');
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
              <Smile className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Mood</h1>
            <p className="text-gray-600">Choose the emotion that best describes how you feel</p>
          </div>

          {/* Zone Badge */}
          <div className={`${colors.light} border-2 ${colors.border} rounded-3xl p-6 mb-6 text-center`}>
            <p className="text-lg text-gray-700 mb-2">You are in the</p>
            <div className={`inline-block px-6 py-3 bg-gradient-to-r ${colors.bg} rounded-full text-white font-bold text-2xl shadow-lg`}>
              {currentZone} Zone
            </div>
          </div>

          {/* Mood Grid */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border-2 border-gray-100">
            <p className="text-gray-700 font-medium mb-4 text-center">
              Select the specific emotion you are feeling:
            </p>
            
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
              {(showFullMatrix ? MOOD_MATRIX.flat() : displayedMoods).map((mood, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedMood(mood)}
                  className={`p-3 text-sm font-medium rounded-xl border-2 transition-all duration-200 ${
                    selectedMood === mood
                      ? `${colors.border} bg-gradient-to-r ${colors.bg} text-white shadow-lg scale-105`
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:bg-gray-100 hover:scale-102'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>

            {!showFullMatrix && (
              <div className="text-center mb-4">
                <button
                  onClick={() => setShowFullMatrix(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm underline"
                >
                  I don't see my mood here. Show all 100 options →
                </button>
              </div>
            )}

            <button
              disabled={!selectedMood}
              onClick={() => setStep(3)}
              className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                selectedMood
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg transform hover:scale-[1.02]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedMood ? `Confirm: I am feeling ${selectedMood}` : 'Select a mood to continue'}
            </button>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-semibold bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Assessment</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP 1: ASSESSMENT - Energy & Pleasantness
  const progress = step === 1 && energy !== null ? 50 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">RULER Mood Meter</h1>
          <p className="text-gray-600">Let's understand your emotional state</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              {energy === null ? 'Step 1 of 2' : pleasantness === null ? 'Step 2 of 2' : 'Complete'}
            </span>
            <span className="text-sm font-medium text-gray-600">{pleasantness !== null ? 100 : progress}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
              style={{ width: `${pleasantness !== null ? 100 : progress}%` }}
            />
          </div>
        </div>

        {/* Question Cards */}
        <div className="space-y-6">
          {/* Energy Question */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-full p-3 mr-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How is your Energy?</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setEnergy(1)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  energy === 1
                    ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-gray-50 hover:border-orange-300 hover:bg-orange-50/50 hover:scale-[1.02]'
                }`}
              >
                <div className="text-4xl mb-2">⚡</div>
                <p className="font-bold text-gray-900 text-lg">High Energy</p>
                <p className="text-sm text-gray-600 mt-1">Feeling active & energized</p>
                {energy === 1 && (
                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                      Selected
                    </span>
                  </div>
                )}
              </button>

              <button
                onClick={() => setEnergy(0)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  energy === 0
                    ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-cyan-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50 hover:scale-[1.02]'
                }`}
              >
                <div className="text-4xl mb-2">😌</div>
                <p className="font-bold text-gray-900 text-lg">Low Energy</p>
                <p className="text-sm text-gray-600 mt-1">Feeling calm & relaxed</p>
                {energy === 0 && (
                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                      Selected
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Pleasantness Question */}
          <div className={`bg-white rounded-3xl shadow-xl p-8 border-2 transition-all duration-300 ${
            energy === null ? 'opacity-50 pointer-events-none' : 'border-gray-100'
          }`}>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-full p-3 mr-3">
                <Smile className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How is your Pleasantness?</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPleasantness(1)}
                disabled={energy === null}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  pleasantness === 1
                    ? 'border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-gray-50 hover:border-green-300 hover:bg-green-50/50 hover:scale-[1.02]'
                }`}
              >
                <div className="text-4xl mb-2">😊</div>
                <p className="font-bold text-gray-900 text-lg">High Pleasantness</p>
                <p className="text-sm text-gray-600 mt-1">Feeling positive & pleasant</p>
                {pleasantness === 1 && (
                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                      Selected
                    </span>
                  </div>
                )}
              </button>

              <button
                onClick={() => setPleasantness(0)}
                disabled={energy === null}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  pleasantness === 0
                    ? 'border-red-500 bg-gradient-to-r from-red-50 to-pink-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-gray-50 hover:border-red-300 hover:bg-red-50/50 hover:scale-[1.02]'
                }`}
              >
                <div className="text-4xl mb-2">😔</div>
                <p className="font-bold text-gray-900 text-lg">Low Pleasantness</p>
                <p className="text-sm text-gray-600 mt-1">Feeling unpleasant or upset</p>
                {pleasantness === 0 && (
                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                      Selected
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            onClick={handleAssessmentSubmit}
            disabled={energy === null || pleasantness === null}
            className={`w-full py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-200 ${
              energy !== null && pleasantness !== null
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg transform hover:scale-[1.02]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {energy === null || pleasantness === null ? 'Please answer both questions' : 'Analyze My Mood →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodAssessment;

