import React, { useState } from 'react';
import { AlertTriangle, Phone, MessageCircle, Heart, Play, Volume2, Pause } from 'lucide-react';

const Emergency: React.FC = () => {
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [emergencyContacted, setEmergencyContacted] = useState(false);

  const emergencyContacts = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support and suicide prevention",
      type: "crisis"
    },
    {
      name: "Crisis Text Line",
      number: "741741",
      description: "Text HOME to connect with a crisis counselor",
      type: "text"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Mental health and substance abuse support",
      type: "support"
    },
    {
      name: "Emergency Services",
      number: "911",
      description: "Immediate emergency response",
      type: "emergency"
    }
  ];

  const groundingTechniques = [
    {
      title: "5-4-3-2-1 Grounding",
      description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
      icon: "👁️"
    },
    {
      title: "Box Breathing",
      description: "Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat.",
      icon: "🫁"
    },
    {
      title: "Cold Water",
      description: "Splash cold water on your face or hold ice cubes to reset your nervous system",
      icon: "💧"
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Tense and release each muscle group from toes to head",
      icon: "💪"
    }
  ];

  const startBreathingExercise = () => {
    setIsBreathingActive(true);
    cycleBreathing();
  };

  const cycleBreathing = () => {
    const cycle = () => {
      setBreathingPhase('inhale');
      setTimeout(() => {
        setBreathingPhase('exhale');
        setTimeout(() => {
          if (isBreathingActive) cycle();
        }, 4000);
      }, 4000);
    };
    cycle();
  };

  const handleEmergencyCall = (number: string) => {
    setEmergencyContacted(true);
    // In a real app, this would initiate the call
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header - Crisis Mode */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Crisis Support</h1>
        <p className="text-xl opacity-90 mb-6">
          You're not alone. Immediate help and support are available right now.
        </p>
        <div className="text-lg font-medium">
          If you're having thoughts of self-harm, please reach out immediately.
        </div>
      </div>

      {/* Immediate Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Emergency Contacts */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Phone className="w-6 h-6 mr-3 text-red-600" />
            Get Help Now
          </h2>
          <div className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-xl hover:border-red-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    contact.type === 'crisis' ? 'bg-red-100 text-red-700' :
                    contact.type === 'emergency' ? 'bg-orange-100 text-orange-700' :
                    contact.type === 'text' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {contact.type}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{contact.description}</p>
                <button
                  onClick={() => handleEmergencyCall(contact.number)}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-red-600 hover:to-orange-600 transition-all duration-200 flex items-center justify-center"
                >
                  {contact.type === 'text' ? <MessageCircle className="w-5 h-5 mr-2" /> : <Phone className="w-5 h-5 mr-2" />}
                  {contact.type === 'text' ? 'Text' : 'Call'} {contact.number}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Immediate Grounding */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Heart className="w-6 h-6 mr-3 text-blue-600" />
            Ground Yourself
          </h2>
          
          {/* Breathing Exercise */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl">
            <h3 className="font-semibold text-gray-900 mb-3">Emergency Breathing</h3>
            <div className="text-center mb-4">
              <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center text-white font-bold text-lg transition-all duration-2000 ${
                isBreathingActive 
                  ? (breathingPhase === 'inhale' ? 'bg-blue-500 scale-110' : 'bg-green-500 scale-90')
                  : 'bg-gray-400'
              }`}>
                {isBreathingActive ? breathingPhase.toUpperCase() : 'START'}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {isBreathingActive 
                  ? (breathingPhase === 'inhale' ? 'Breathe In Slowly' : 'Breathe Out Slowly')
                  : 'Click to start guided breathing'
                }
              </p>
            </div>
            <button
              onClick={isBreathingActive ? () => setIsBreathingActive(false) : startBreathingExercise}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              {isBreathingActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isBreathingActive ? 'Stop' : 'Start'} Breathing Exercise
            </button>
          </div>

          {/* Grounding Techniques */}
          <div className="space-y-3">
            {groundingTechniques.map((technique, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="text-xl">{technique.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">{technique.title}</h4>
                    <p className="text-sm text-gray-600">{technique.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trusted Contacts */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Reach Out to Someone You Trust</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors text-center">
            <div className="text-3xl mb-2">👤</div>
            <div className="font-medium text-gray-700">Add Trusted Contact</div>
            <div className="text-sm text-gray-500">Family, friend, or support person</div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-400 hover:bg-green-50 transition-colors text-center">
            <div className="text-3xl mb-2">🏥</div>
            <div className="font-medium text-gray-700">Add Healthcare Provider</div>
            <div className="text-sm text-gray-500">Therapist, doctor, or counselor</div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-colors text-center">
            <div className="text-3xl mb-2">🆘</div>
            <div className="font-medium text-gray-700">Add Crisis Contact</div>
            <div className="text-sm text-gray-500">Backup emergency support</div>
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Your trusted contacts can be notified during crisis situations if you choose to share your status.
        </p>
      </div>

      {/* Safety Planning */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Safety Planning</h2>
        <p className="text-gray-700 mb-6">
          Create a personalized safety plan for when you're feeling overwhelmed or in crisis. 
          Having a plan in place can help you stay safe and connected to support.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-xl">
            <h3 className="font-medium text-gray-900 mb-2">Warning Signs</h3>
            <p className="text-sm text-gray-600">Identify your personal triggers and early warning signs</p>
          </div>
          <div className="p-4 bg-white rounded-xl">
            <h3 className="font-medium text-gray-900 mb-2">Coping Strategies</h3>
            <p className="text-sm text-gray-600">List activities that help you feel better and stay safe</p>
          </div>
          <div className="p-4 bg-white rounded-xl">
            <h3 className="font-medium text-gray-900 mb-2">Support Network</h3>
            <p className="text-sm text-gray-600">People you can reach out to for help and support</p>
          </div>
          <div className="p-4 bg-white rounded-xl">
            <h3 className="font-medium text-gray-900 mb-2">Professional Contacts</h3>
            <p className="text-sm text-gray-600">Healthcare providers and crisis resources</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-600 transition-colors">
          Create My Safety Plan
        </button>
      </div>

      {/* Reminder */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 border border-green-200 text-center">
        <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">You Matter</h3>
        <p className="text-gray-700 mb-4">
          Your life has value and meaning. Crisis feelings are temporary, but your life is precious. 
          There are people who want to help you through this difficult time.
        </p>
        <p className="text-sm text-gray-600">
          Remember: Seeking help is a sign of strength, not weakness. You deserve support and care.
        </p>
      </div>
    </div>
  );
};

export default Emergency;