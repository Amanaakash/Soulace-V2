# 🧠 SoulAce - Mental Health Support Platform

<div align="center">

![SoulAce Banner](https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200)

**A comprehensive mental wellness platform connecting users with peer support, professional help, and AI-powered assistance**

[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Real--time-Socket.io-black?logo=socket.io)](https://socket.io/)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Core Modules](#core-modules)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 About

**SoulAce** is a modern, full-stack mental health support platform designed to provide comprehensive emotional wellness support through multiple channels:

- 🤝 **Peer-to-Peer Support** - Connect with others who understand your journey
- 🤖 **AI-Powered Chat** - 24/7 intelligent conversational support using Google Gemini
- 👨‍⚕️ **Professional Help** - Book sessions with licensed mental health professionals
- 📊 **Mood Tracking** - Monitor your emotional wellness journey with the RULER Mood Meter
- 🧘 **Mindfulness Tools** - Guided meditation and breathing exercises
- 👥 **Community Forums** - Share experiences in a safe, supportive environment
- 🎧 **Listener Connect** - Get support from trained peer listeners
- 🚨 **Emergency Support** - Quick access to crisis hotlines and resources

---

## ✨ Key Features

### For Users
- **Intelligent Mood Assessment**: RULER-based mood evaluation system with 100+ emotional states
- **Smart Peer Matching**: Algorithm-based matching with similar or complementary emotional states
- **Real-time Chat**: Secure, anonymous peer-to-peer messaging
- **AI Companion**: Context-aware AI chatbot for instant support
- **Professional Booking**: Schedule and manage therapy sessions with certified professionals
- **Mood Analytics**: Track emotional patterns over time with visual insights
- **Guided Mindfulness**: Access curated meditation and relaxation exercises
- **Anonymous Support**: Privacy-first approach with optional anonymity

### For Professionals
- **Dedicated Dashboard**: Manage appointments, client interactions, and availability
- **Calendar Integration**: Sync schedules and manage booking slots
- **Secure Communication**: HIPAA-compliant messaging and video calls
- **Client Management**: Track sessions and maintain professional notes

### For Administrators
- **User Management**: Oversee platform users and handle reports
- **Professional Verification**: Approve and manage mental health professional accounts
- **Platform Analytics**: Monitor usage, engagement, and system health
- **Content Moderation**: Ensure community guidelines are maintained

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Routing**: React Router DOM 7.7.0
- **State Management**: Zustand 5.0.8
- **UI Components**: Radix UI
- **Animations**: Framer Motion 12.23.9
- **Icons**: Lucide React 0.344.0
- **HTTP Client**: Axios 1.13.2
- **Date Handling**: date-fns 4.1.0

### Backend
- **Runtime**: Node.js with Express.js 4.21.2
- **Database**: MongoDB with Mongoose 8.10.2
- **Authentication**: JWT & Firebase Admin
- **Real-time**: Socket.io 4.8.1 + WebSocket
- **AI Integration**: Google Generative AI (Gemini) 0.24.1
- **File Storage**: Cloudinary 1.41.3
- **Communication**: Twilio 5.4.5 (SMS/Voice), Nodemailer 6.10.0
- **Security**: Helmet 8.0.0, bcryptjs 3.0.2, express-rate-limit 7.5.0
- **API Documentation**: Morgan 1.10.0 (logging)
- **Cloud Services**: Google APIs, Firebase

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                         │
│  (React + TypeScript + Tailwind + Zustand)             │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ REST API + WebSocket
                       │
┌──────────────────────▼──────────────────────────────────┐
│                  API Gateway Layer                      │
│         (Express.js + Authentication Middleware)        │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼─────┐ ┌─────▼──────┐ ┌────▼─────────┐
│   Business  │ │  Real-time │ │ AI Services  │
│    Logic    │ │   Socket   │ │   (Gemini)   │
│ Controllers │ │   Server   │ │              │
└───────┬─────┘ └─────┬──────┘ └────┬─────────┘
        │              │              │
        └──────────────┼──────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                   Data Layer                            │
│  MongoDB + Firebase + Cloudinary + External APIs        │
└─────────────────────────────────────────────────────────┘
```

### Module-Based Architecture

The application follows a **modular monolithic architecture** with clear separation of concerns:

- **User Module**: User authentication, profiles, and user-specific features
- **Professional Module**: Professional registration, verification, and dashboard
- **Admin Module**: Platform administration and moderation
- **Shared Services**: Common utilities, middleware, and configurations

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/soulace-v2.git
   cd soulace-v2
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**
   
   Create `.env` files in both `backend` and `frontend` directories (see [Environment Setup](#environment-setup))

5. **Start Development Servers**
   
   **Backend** (from `backend` directory):
   ```bash
   npm run dev
   ```
   
   **Frontend** (from `frontend` directory):
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000` (or your configured port)

---

## ⚙️ Environment Setup

### Backend `.env`

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/soulace
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/soulace

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_CLIENT_EMAIL=your-firebase-client-email

# Cloudinary (Image/File Storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Google Gemini AI
GEMINI_API_KEY=your_google_gemini_api_key

# Twilio (SMS/Voice)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Email Service (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000

# Firebase (if using client-side Firebase)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
```

---

## 📁 Project Structure

```
Soulace-V2/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration files (DB, Firebase, Cloudinary, etc.)
│   │   ├── controllers/      # Request handlers
│   │   ├── middleware/       # Authentication, validation, rate limiting
│   │   ├── models/           # MongoDB schemas (User, Professional, Booking, etc.)
│   │   ├── routes/           # API route definitions
│   │   ├── services/         # Business logic and external service integrations
│   │   └── utils/            # Helper functions and utilities
│   ├── index.js              # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Shared React components
│   │   ├── config/           # API configuration
│   │   ├── hooks/            # Custom React hooks
│   │   ├── modules/          # Feature modules
│   │   │   ├── admin/        # Admin module
│   │   │   ├── professional/ # Professional module
│   │   │   └── user/         # User module
│   │   │       ├── components/  # User-specific components (Layout, etc.)
│   │   │       ├── pages/       # User pages (Dashboard, Chat, etc.)
│   │   │       └── store/       # User state management
│   │   ├── pages/            # Public pages (Homepage)
│   │   ├── store/            # Global state management
│   │   ├── types/            # TypeScript type definitions
│   │   ├── utils/            # Helper functions
│   │   ├── App.tsx           # Main App component with routing
│   │   └── main.tsx          # Application entry point
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── docs/                     # Additional documentation
└── readme.md
```

---

## 👥 User Roles

### 1. **End Users** (Primary Users)
- Register and create profiles
- Access all mental health support features
- Participate in peer support and community
- Book professional therapy sessions
- Track mood and access mindfulness resources

### 2. **Mental Health Professionals**
- Separate registration and verification process
- Manage availability and booking calendar
- Conduct therapy sessions
- Access professional dashboard
- Communicate with clients securely

### 3. **System Administrators**
- Full platform access
- User and professional management
- Content moderation
- Platform analytics and monitoring
- System configuration

---

## 🎯 Core Modules

### 1. Peer Support (Mood-Based Matching)

**User Journey:**
1. User accesses **Peer Support** from dashboard
2. Completes **RULER Mood Meter Assessment**:
   - Energy level (High/Low)
   - Pleasantness (Positive/Negative)
   - Select specific emotion from 100+ options
3. Receives **zone classification** (Red/Blue/Yellow/Green)
4. Chooses matching preference:
   - **Similar Headspace**: Same or adjacent emotional zones
   - **Different Headspace**: Contrasting emotional states
5. Matched with anonymous peer
6. **Real-time chat** begins at `/peer-chat`

**Technical Implementation:**
- RULER framework integration (10×10 mood matrix)
- Smart matching algorithm
- WebSocket-based real-time communication
- Anonymous chat with optional identity reveal

### 2. AI Chat (Google Gemini)

- 24/7 conversational AI support
- Context-aware responses
- Mental health-focused training
- Crisis detection and escalation
- Session history and continuity

### 3. Professional Help

- Browse verified mental health professionals
- Filter by specialty, availability, rating
- Book therapy sessions
- Video/voice call integration
- Secure messaging
- Session management

### 4. Mood Tracker

- Daily mood logging
- RULER-based emotion tracking
- Visual analytics (charts, trends)
- Mood history and patterns
- Export data for professionals

### 5. Mindfulness & Wellness

- Guided meditation sessions
- Breathing exercises
- Progressive muscle relaxation
- Mindfulness timer
- Daily wellness tips

### 6. Listener Connect

- Connect with trained peer listeners
- Voice call support
- Anonymous conversations
- Rating and feedback system

### 7. Community Forums

- Topic-based discussion boards
- Moderated safe spaces
- Anonymous posting option
- Report and flag system
- Upvote/downvote functionality

### 8. Emergency Support

- Quick access to crisis hotlines
- Location-based emergency contacts
- Self-harm prevention resources
- Immediate professional escalation

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login |
| POST | `/auth/logout` | User logout |
| POST | `/auth/verify-email` | Verify email address |
| POST | `/auth/verify-phone` | Verify phone number |
| POST | `/auth/forgot-password` | Request password reset |

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/profile` | Get user profile |
| PUT | `/users/profile` | Update user profile |
| GET | `/users/mood-history` | Get mood tracking data |
| POST | `/users/mood` | Log mood entry |

### Professional Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/professionals/register` | Register as professional |
| GET | `/professionals` | List all professionals |
| GET | `/professionals/:id` | Get professional details |
| POST | `/professionals/availability` | Set availability |

### Booking Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/bookings` | Create booking |
| GET | `/bookings` | Get user bookings |
| PUT | `/bookings/:id` | Update booking |
| DELETE | `/bookings/:id` | Cancel booking |

### Chat Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/chat/request` | Request peer chat |
| GET | `/chat/history` | Get chat history |
| POST | `/messages` | Send message |

### AI Chat Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ai-chat` | Send message to AI |
| GET | `/ai-chat/history` | Get AI chat history |

### Match Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/match/find` | Find peer match |
| POST | `/match/end` | End current match |

---

## 🔐 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevent abuse and DDoS
- **CORS Protection**: Configured allowed origins
- **Helmet.js**: Security headers
- **Input Validation**: Sanitize and validate all inputs
- **Role-Based Access Control**: Granular permissions
- **Encrypted Communications**: HTTPS in production
- **Anonymous Mode**: Privacy-first design
- **Data Encryption**: Sensitive data encrypted at rest

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

---

## 🚢 Deployment

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
# Build output in frontend/dist
```

**Backend:**
```bash
cd backend
npm start
```

### Deployment Platforms

- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: Heroku, AWS EC2, DigitalOcean, Railway
- **Database**: MongoDB Atlas
- **Media Storage**: Cloudinary

### Environment Variables
Ensure all production environment variables are set securely using your deployment platform's configuration.

---

## 📊 Performance Optimizations

- **Code Splitting**: Dynamic imports for route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Cloudinary transformations
- **Caching**: Redis for session management (optional)
- **CDN**: Static assets served via CDN
- **WebSocket Pooling**: Efficient real-time connections
- **Database Indexing**: Optimized MongoDB queries

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 📝 License

This project is licensed under the **ISC License**.

---

## 🆘 Support

- **Documentation**: [Link to detailed docs]
- **Issues**: [GitHub Issues](https://github.com/yourusername/soulace-v2/issues)
- **Email**: support@soulace.com
- **Community**: [Discord Server Link]

---

## 🙏 Acknowledgments

- **RULER Framework**: Yale Center for Emotional Intelligence
- **Icons**: Lucide React
- **UI Components**: Radix UI
- **AI**: Google Gemini
- **Community**: All contributors and supporters

---

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core platform features
- ✅ Peer support matching
- ✅ AI chat integration
- ✅ Professional booking system

### Phase 2 (In Progress)
- 🔄 Video call integration
- 🔄 Mobile app (React Native)
- 🔄 Advanced mood analytics
- 🔄 Group therapy sessions

### Phase 3 (Planned)
- 📋 Crisis intervention AI
- 📋 Wearable device integration
- 📋 Insurance billing system
- 📋 Multi-language support

---

## 📞 Contact

**Project Maintainer**: [Your Name]
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

---

<div align="center">

**Made with ❤️ for mental health and wellness**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/yourusername/soulace-v2/issues) · [Request Feature](https://github.com/yourusername/soulace-v2/issues) · [Documentation](https://docs.soulace.com)

</div>
