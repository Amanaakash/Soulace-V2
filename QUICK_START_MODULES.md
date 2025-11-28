# Quick Start Guide - Authentication Modules

This guide will help you quickly set up and run the three separate authentication modules.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB running locally or cloud instance
- npm or yarn package manager

---

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/soulace
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
```

Start the backend server:
```bash
npm start
```

Backend should now be running at `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in frontend folder:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

Frontend should now be running at `http://localhost:5173`

---

## Testing the Modules

### Option 1: Access from Homepage

1. Open browser to `http://localhost:5173`
2. Scroll to "Choose Your Path" section
3. Click on the portal you want to test:
   - **User Portal** (Blue card)
   - **Professional Portal** (Teal card)
   - **Admin Portal** (Gray card)

### Option 2: Direct URLs

#### Test User Module
```
Login:    http://localhost:5173/user/login
Signup:   http://localhost:5173/user/signup
Dashboard: http://localhost:5173/user/dashboard (requires login)
```

**Test Account:**
- Create a new account at `/user/signup`
- Fill in all required fields
- Login with your credentials

#### Test Professional Module
```
Login:    http://localhost:5173/professional/login
Signup:   http://localhost:5173/professional/signup
Dashboard: http://localhost:5173/professional/dashboard (requires login)
```

**Test Account:**
- Create a new professional account at `/professional/signup`
- Include specialization and license number (optional)
- Login with your credentials
- Notice the verification status in dashboard

#### Test Admin Module
```
Login:    http://localhost:5173/admin/login
Dashboard: http://localhost:5173/admin/dashboard (requires login)
```

**Test Account:**
- You'll need to create an admin account manually in the database
- Or use the backend API endpoint `/api/admin/insert` (requires existing admin auth)

---

## Module Features Overview

### User Module (Blue Theme)
✅ Registration with personal information
✅ Email and phone verification tracking
✅ Mood tracking integration
✅ Dashboard with account stats
✅ Quick access to support features

### Professional Module (Teal Theme)
✅ Professional registration with credentials
✅ Document upload capability
✅ Verification status tracking
✅ Client and session management
✅ Professional dashboard

### Admin Module (Dark Theme)
✅ Secure admin authentication
✅ System statistics overview
✅ User and professional management
✅ Verification approval system
✅ Real-time system monitoring

---

## Quick Testing Checklist

### User Module
- [ ] Can register new user account
- [ ] Can login with credentials
- [ ] Dashboard displays user information
- [ ] Can logout successfully
- [ ] Protected routes redirect when not authenticated

### Professional Module
- [ ] Can register new professional account
- [ ] Can login with credentials
- [ ] Dashboard shows verification status
- [ ] Can view professional information
- [ ] Can logout successfully

### Admin Module
- [ ] Can login with admin credentials
- [ ] Dashboard displays system statistics
- [ ] Can view management actions
- [ ] Can logout successfully
- [ ] Protected routes work correctly

---

## API Endpoints Reference

### User Endpoints
```bash
# Register
POST http://localhost:5000/api/users/signup
Content-Type: application/json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "password": "password123",
  "confirmPassword": "password123",
  "gender": "Male",
  "dateOfBirth": "1990-01-01"
}

# Login
POST http://localhost:5000/api/users/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "password123"
}

# Logout
POST http://localhost:5000/api/users/logout

# Check Auth
GET http://localhost:5000/api/users/checkAuth
```

### Professional Endpoints
```bash
# Register
POST http://localhost:5000/api/professional/signup
Content-Type: application/json
{
  "firstName": "Dr. Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phoneNumber": "1234567890",
  "password": "password123",
  "confirmPassword": "password123",
  "gender": "Female",
  "dateOfBirth": "1985-01-01",
  "specialization": "Clinical Psychology",
  "licenseNumber": "LIC123456"
}

# Login
POST http://localhost:5000/api/professional/login
Content-Type: application/json
{
  "email": "jane@example.com",
  "password": "password123"
}

# Logout
POST http://localhost:5000/api/professional/logout

# Upload Document
POST http://localhost:5000/api/professional/upload-doc
Content-Type: multipart/form-data
FormData: document (file)
```

### Admin Endpoints
```bash
# Login
POST http://localhost:5000/api/admin/login
Content-Type: application/json
{
  "email": "admin@example.com",
  "password": "adminpassword"
}

# Logout
POST http://localhost:5000/api/admin/logout

# Get Dashboard
GET http://localhost:5000/api/admin/dashboard
```

---

## Common Commands

### Start Development Environment
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Build for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build  # if you have build script
```

### View Logs
```bash
# Backend logs
cd backend
npm start  # Will show console logs

# Frontend dev server logs
cd frontend
npm run dev  # Will show Vite logs
```

---

## Troubleshooting

### Backend won't start
```bash
# Check if MongoDB is running
mongosh  # or mongo

# Check if port 5000 is available
# Windows
netstat -ano | findstr :5000

# Kill process if needed (Windows)
taskkill /PID <process_id> /F

# Restart backend
cd backend
npm start
```

### Frontend won't start
```bash
# Check if port 5173 is available
# Windows
netstat -ano | findstr :5173

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### CORS Errors
- Ensure backend `.env` has `FRONTEND_URL=http://localhost:5173`
- Check CORS configuration in `backend/index.js`
- Restart backend server

### Authentication not persisting
- Clear browser localStorage
- Check browser console for errors
- Verify cookies are being set
- Check network tab for API responses

---

## Next Steps

1. **Customize Dashboards**: Add more features to each dashboard
2. **Add Pages**: Create additional pages for each module
3. **Implement Verification**: Build the professional verification workflow
4. **Add Admin Features**: Implement user/professional management
5. **Setup Email**: Configure email verification system
6. **Add Analytics**: Implement tracking and analytics

---

## Support

If you encounter issues:

1. Check console logs (both browser and terminal)
2. Verify all environment variables are set
3. Ensure MongoDB is running
4. Check API endpoints match between frontend and backend
5. Review the detailed documentation in `AUTHENTICATION_MODULES.md`

---

## Module File Locations

```
User Module:
  Frontend: frontend/src/modules/user/
  Backend:  backend/src/routes/user.routes.js
           backend/src/controllers/user.controller.js

Professional Module:
  Frontend: frontend/src/modules/professional/
  Backend:  backend/src/routes/professional.route.js
           backend/src/controllers/professional.controller.js

Admin Module:
  Frontend: frontend/src/modules/admin/
  Backend:  backend/src/routes/admin.route.js
           backend/src/controllers/admin.controller.js
```

---

**Happy Coding! 🚀**

