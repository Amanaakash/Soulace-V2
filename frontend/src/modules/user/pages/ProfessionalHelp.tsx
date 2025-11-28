import React, { useState } from 'react';
import { Stethoscope, Star, Calendar, Clock, User, Video, MessageCircle, Phone } from 'lucide-react';

const ProfessionalHelp: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [sessionType, setSessionType] = useState<'chat' | 'voice' | 'video'>('chat');

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      specialty: "Anxiety & Depression",
      experience: "8+ years",
      rating: 4.9,
      reviews: 234,
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400",
      available: true,
      languages: ["English", "Mandarin"],
      gender: "Female",
      nextSlot: "Available now",
      bio: "Specialized in CBT and mindfulness-based therapy. Experienced in treating anxiety disorders, depression, and trauma recovery.",
      sessionPrice: "₹500 / 30min"
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      specialty: "Trauma & PTSD",
      experience: "12+ years",
      rating: 4.8,
      reviews: 187,
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400",
      available: true,
      languages: ["English", "Spanish"],
      gender: "Male",
      nextSlot: "Available in 15 min",
      bio: "Expert in trauma-informed therapy and EMDR. Helps clients process traumatic experiences and build resilience.",
      sessionPrice: "₹600 / 30min"
    },
    {
      id: 3,
      name: "Dr. Emily Johnson",
      specialty: "Mindfulness & CBT",
      experience: "6+ years",
      rating: 4.9,
      reviews: 156,
      image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400",
      available: false,
      languages: ["English"],
      gender: "Female",
      nextSlot: "Available at 2:00 PM",
      bio: "Integrates mindfulness practices with cognitive behavioral therapy for holistic mental health treatment.",
      sessionPrice: "₹450 / 30min"
    },
    {
      id: 4,
      name: "Dr. Raj Patel",
      specialty: "Addiction & Recovery",
      experience: "10+ years",
      rating: 4.7,
      reviews: 203,
      image: "https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=400",
      available: true,
      languages: ["English", "Hindi", "Gujarati"],
      gender: "Male",
      nextSlot: "Available now",
      bio: "Specializes in addiction counseling and recovery support. Uses evidence-based approaches for lasting recovery.",
      sessionPrice: "₹550 / 30min"
    }
  ];

  const handleBookSession = (doctorId: number) => {
    setSelectedDoctor(doctorId);
  };

  if (selectedDoctor) {
    const doctor = doctors.find(d => d.id === selectedDoctor);
    
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Booking Confirmation */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Booked Successfully!</h2>
            <p className="text-gray-600">Your anonymous session has been scheduled</p>
          </div>

          {/* Doctor Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-4">
              <img
                src={doctor?.image}
                alt={doctor?.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{doctor?.name}</h3>
                <p className="text-gray-600">{doctor?.specialty}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{doctor?.rating} • {doctor?.experience}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-gray-900">Session Type</span>
              <div className="flex items-center text-blue-700">
                {sessionType === 'chat' && <MessageCircle className="w-4 h-4 mr-1" />}
                {sessionType === 'voice' && <Phone className="w-4 h-4 mr-1" />}
                {sessionType === 'video' && <Video className="w-4 h-4 mr-1" />}
                <span className="capitalize font-medium">{sessionType} Session</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-gray-900">Duration</span>
              <span className="text-green-700 font-medium">30 minutes</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="font-medium text-gray-900">Privacy</span>
              <span className="text-purple-700 font-medium">100% Anonymous</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
              Start Session Now
            </button>
            <button 
              onClick={() => setSelectedDoctor(null)}
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Back to Doctors
            </button>
          </div>
        </div>

        {/* Pre-session Guidelines */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Before Your Session</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Find a quiet, private space where you feel comfortable</li>
            <li>• Prepare any questions or topics you'd like to discuss</li>
            <li>• Remember, everything shared remains confidential</li>
            <li>• Take notes during the session if it helps you</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Stethoscope className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Help</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with verified mental health professionals for anonymous, confidential support sessions.
        </p>
      </div>

      {/* Session Type Selection */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Session Type</h2>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => setSessionType('chat')}
            className={`p-4 rounded-xl text-center transition-all duration-200 ${
              sessionType === 'chat'
                ? 'bg-blue-50 border-2 border-blue-500'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
            }`}
          >
            <MessageCircle className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <div className="font-medium text-gray-900">Chat</div>
            <div className="text-xs text-gray-600">Text-based</div>
          </button>
          
          <button
            onClick={() => setSessionType('voice')}
            className={`p-4 rounded-xl text-center transition-all duration-200 ${
              sessionType === 'voice'
                ? 'bg-green-50 border-2 border-green-500'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
            }`}
          >
            <Phone className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <div className="font-medium text-gray-900">Voice</div>
            <div className="text-xs text-gray-600">Audio call</div>
          </button>
          
          <button
            onClick={() => setSessionType('video')}
            className={`p-4 rounded-xl text-center transition-all duration-200 ${
              sessionType === 'video'
                ? 'bg-purple-50 border-2 border-purple-500'
                : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
            }`}
          >
            <Video className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <div className="font-medium text-gray-900">Video</div>
            <div className="text-xs text-gray-600">Face-to-face</div>
          </button>
        </div>
      </div>

      {/* Available Doctors */}
      <div className="grid md:grid-cols-2 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4 mb-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                  <div className={`w-3 h-3 rounded-full ${doctor.available ? 'bg-green-400' : 'bg-gray-400'}`} />
                </div>
                <p className="text-gray-600 text-sm mb-2">{doctor.specialty}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span>{doctor.rating} ({doctor.reviews})</span>
                  </div>
                  <span>{doctor.experience}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{doctor.bio}</p>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Languages:</span>
                <span className="text-gray-900">{doctor.languages.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gender:</span>
                <span className="text-gray-900">{doctor.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Next Available:</span>
                <span className={`font-medium ${doctor.available ? 'text-green-600' : 'text-orange-600'}`}>
                  {doctor.nextSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Session Fee:</span>
                <span className="text-gray-900 font-medium">{doctor.sessionPrice}</span>
              </div>
            </div>

            <button
              onClick={() => handleBookSession(doctor.id)}
              disabled={!doctor.available}
              className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                doctor.available
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {doctor.available ? 'Book Session' : 'Currently Unavailable'}
            </button>
          </div>
        ))}
      </div>

      {/* Emergency Notice */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 border border-red-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">In Crisis? Get Immediate Help</h3>
        <p className="text-sm text-gray-700 mb-4">
          If you're having thoughts of self-harm or suicide, please reach out for immediate support. 
          You don't have to go through this alone.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="tel:9152987821"
            className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            Crisis Helpline: 91529-87821
          </a>
          <button className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600 transition-colors">
            <MessageCircle className="w-4 h-4 mr-2" />
            Emergency Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalHelp;