import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MessageCircle, 
  Stethoscope, 
  Shield, 
  TrendingUp,
  ArrowRight,
  Star
} from 'lucide-react';

const Homepage: React.FC = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'Anonymous Peer Support',
      description: 'Connect with someone who understands, without revealing your identity.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Stethoscope,
      title: 'Professional Help',
      description: 'Chat with verified doctors and therapists when you need professional guidance.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Mood Tracking',
      description: 'Track your emotional journey and discover patterns in your mental wellness.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Heart,
      title: 'Mindfulness Library',
      description: 'Access guided meditations, breathing exercises, and healing resources.',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const testimonials = [
    {
      text: "SoulAce helped me find someone who truly understood my struggles. The anonymity made me feel safe to open up.",
      author: "Anonymous User",
      rating: 5
    },
    {
      text: "Being able to talk to a professional instantly when I was having a panic attack was life-changing.",
      author: "Anonymous User", 
      rating: 5
    },
    {
      text: "The mood tracker helped me identify triggers I never noticed. It's become an essential part of my healing journey.",
      author: "Anonymous User",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SoulAce
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/user/login" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                Start Healing
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Your Safe Space for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Emotional Healing
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect anonymously with peers and professionals. Track your mood, practice mindfulness, 
              and build a stronger, healthier you in a judgment-free environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/user/login"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-medium rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Start Healing Anonymously
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg font-medium rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                <Link 
                to="/professional/login"
                >
                Start as a Professional
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Heal
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and support designed with your mental wellness in mind
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Crisis Support Available 24/7</h2>
            <p className="text-lg text-gray-600 mb-6">
              If you're in crisis, immediate help is available. Our emergency features connect you 
              to professional crisis counselors and emergency resources instantly.
            </p>
            <Link 
              to="/emergency"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-full hover:from-red-600 hover:to-orange-600 transition-all duration-200"
            >
              Access Emergency Support
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Stories of Healing
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from our anonymous community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <p className="text-sm text-gray-500">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Begin Your Healing Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands who have found support, healing, and hope through SoulAce
          </p>
          <Link 
            to="/user/login"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 text-lg font-medium rounded-full hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Start Your Journey Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">SoulAce</span>
              </div>
              <p className="text-gray-400">
                Your safe space for emotional healing and mental wellness.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/emergency" className="hover:text-white">Crisis Support</Link></li>
                <li><Link to="/professional-help" className="hover:text-white">Professional Help</Link></li>
                <li><Link to="/community" className="hover:text-white">Community</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/mindfulness" className="hover:text-white">Mindfulness</Link></li>
                <li><Link to="/mood-tracker" className="hover:text-white">Mood Tracker</Link></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Ethics Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SoulAce. All rights reserved. Your privacy and safety are our priority.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;