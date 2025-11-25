# 💜 SoulAce - Your Safe Space for Emotional Healing

<div align="center">
  
![SoulAce Banner](https://img.shields.io/badge/Mental%20Health-Platform-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

**A comprehensive mental health platform that provides anonymous peer support, professional help, mood tracking, and mindfulness resources in a safe, judgment-free environment.**

[Live Demo](https://soulace.vercel.app/) • [Report Bug](https://github.com/Amanaakash/soulace/issues) • [Request Feature](https://github.com/Amanaakash/soulace/issues)

</div>

---

## 🌟 Features

### 🤝 Anonymous Peer Support
- Connect with others who understand your struggles
- Complete anonymity for safe, judgment-free conversations
- Smart matching algorithm based on mood and preferences
- Real-time chat functionality

### 🩺 Professional Help
- Verified doctors and mental health professionals
- Instant booking and consultation scheduling
- Featured mentor carousel with ratings and availability
- Secure, confidential consultations

### 📊 Mood Tracking
- Daily mood logging and tracking
- Visual analytics and pattern recognition
- Mood history and trend analysis
- Personalized insights and recommendations

### 🧘 Mindfulness & Wellness
- Guided meditation sessions
- Breathing exercises
- Healing resources library
- Personalized mindfulness recommendations

### 👥 Community Support
- Anonymous community forums
- Share experiences and healing stories
- Group support sessions
- Safe space for vulnerable conversations

### 🚨 Emergency Resources
- 24/7 crisis support access
- Emergency hotline numbers
- Immediate professional intervention
- Safety planning tools

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Amanaakash/soulace.git
   cd soulace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript 5.5.3** - Type safety
- **Vite 5.4.2** - Build tool and dev server
- **React Router 7.7.0** - Navigation and routing
- **TailwindCSS 3.4.1** - Styling

### UI Components & Animation
- **Radix UI** - Accessible component primitives
  - Dialog, Navigation Menu, Select, Slider, Tabs
- **Framer Motion 12.23.9** - Animations
- **Lucide React 0.344.0** - Icons

### Utilities
- **date-fns 4.1.0** - Date manipulation
- **PostCSS** - CSS processing
- **ESLint** - Code linting

---

## 📁 Project Structure

```
soulace/
├── src/
│   ├── components/
│   │   └── Layout.tsx           # Main layout wrapper
│   ├── pages/
│   │   ├── Homepage.tsx         # Landing page
│   │   ├── Dashboard.tsx        # Main dashboard
│   │   ├── PeerSupport.tsx      # Peer matching & chat
│   │   ├── ProfessionalHelp.tsx # Professional consultation
│   │   ├── MoodTracker.tsx      # Mood logging & analytics
│   │   ├── MoodAssesment.tsx    # Mood assessment form
│   │   ├── Mindfulness.tsx      # Meditation & exercises
│   │   ├── Community.tsx        # Community forums
│   │   ├── Emergency.tsx        # Crisis support
│   │   └── Profile.tsx          # User profile
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── moodAssesment/
│   └── Mood Quantification and Matchmaking Algorithm.md
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🎨 Key Pages

### 🏠 Homepage
- Hero section with compelling messaging
- Feature showcase
- Emergency support callout
- User testimonials
- Call-to-action sections

### 📱 Dashboard
- Circular navigation widget with quick access to all features
- Featured mentor carousel
- Recent activity timeline
- Quick stats (mood, streak, sessions, connections)
- Quick action shortcuts

### 💬 Peer Support
- Anonymous peer matching
- Real-time chat interface
- Mood-based matching algorithm
- Safe space guidelines

### 🧠 Mood Tracker
- Daily mood logging
- Visual mood history
- Pattern recognition
- Export and insights

---

## 🎯 Features in Detail

### Dashboard Circular Widget
The main dashboard features an innovative circular navigation system:
- **Center**: Heart icon representing wellness
- **Top**: Peer Support (Blue)
- **Right**: Professional Help (Purple)
- **Bottom**: Mood Tracker (Green)
- **Left**: Mindfulness (Pink)
- **Top-Right**: Community (Orange)
- **Top-Left**: Emergency (Red)

### Mood Assessment Algorithm
SoulAce implements a sophisticated mood quantification system that:
- Analyzes user responses to emotional state questions
- Matches users with peers experiencing similar emotions
- Provides personalized recommendations
- Tracks mood patterns over time

---

## 🔒 Privacy & Security

- **100% Anonymous**: No personal information required
- **Secure Communications**: All conversations are encrypted
- **Data Protection**: User privacy is our top priority
- **No Judgment Zone**: Safe space for vulnerable conversations
- **Professional Ethics**: All professionals are verified and bound by ethical guidelines

---

## 🤝 Contributing

We welcome contributions to make SoulAce better! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🐛 Known Issues & Roadmap

### Current Limitations
- Backend integration pending
- User authentication system in development
- Real-time chat functionality needs backend support

### Planned Features
- [ ] User authentication and profiles
- [ ] Real-time WebSocket chat
- [ ] AI-powered mood insights
- [ ] Mobile app (React Native)
- [ ] Video consultation support
- [ ] Group therapy sessions
- [ ] Advanced analytics dashboard
- [ ] Integration with wearable devices
- [ ] Multi-language support
- [ ] Dark mode

---

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Mental Health Professionals** for their guidance on platform features
- **Open Source Community** for the amazing tools and libraries
- **Users** who trust us with their mental health journey
- **Contributors** who help make this platform better

---

## 📞 Support & Crisis Resources

If you or someone you know is in crisis, please reach out:

### International Crisis Hotlines
- **USA**: National Suicide Prevention Lifeline - 988
- **UK**: Samaritans - 116 123
- **Canada**: Crisis Services Canada - 1-833-456-4566
- **Australia**: Lifeline - 13 11 14
- **India**: AASRA - +91-22-27546669

### Within the App
Access our Emergency page for immediate support and resources.

---

## 👨‍💻 Author

**TEAM 8848**
- GitHub: [@Amanaakash](https://github.com/Amanaakash)
- Project: [SoulAce](https://github.com/Amanaakash/soulace)

---

## ⭐ Star Us!

If you find SoulAce helpful, please consider giving it a star! It helps others discover this project and motivates us to keep improving it.

---

<div align="center">

**Made with 💜 for mental health and wellness**

*Your privacy and safety are our priority*

</div>

