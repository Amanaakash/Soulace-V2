# Authentication Modules Documentation

## Overview

This application now has **three separate authentication modules**, each managing its own authentication independently:

1. **User Module** - For regular users seeking mental health support
2. **Professional Module** - For verified mental health professionals
3. **Admin Module** - For system administrators

Each module has its own:
- Authentication store (using Zustand)
- Login/Signup pages
- Dashboard
- Protected routes
- API endpoints

---

## Project Structure

```
frontend/src/
├── modules/
│   ├── user/
│   │   ├── store/
│   │   │   └── userAuthStore.ts          # User authentication state management
│   │   ├── pages/
│   │   │   ├── UserLogin.tsx             # User login page
│   │   │   ├── UserSignup.tsx            # User signup page
│   │   │   └── UserDashboard.tsx         # User dashboard
│   │   └── components/
│   │       └── UserProtectedRoute.tsx    # User route protection
│   │
│   ├── professional/
│   │   ├── store/
│   │   │   └── professionalAuthStore.ts  # Professional auth state
│   │   ├── pages/
│   │   │   ├── ProfessionalLogin.tsx
│   │   │   ├── ProfessionalSignup.tsx
│   │   │   └── ProfessionalDashboard.tsx
│   │   └── components/
│   │       └── ProfessionalProtectedRoute.tsx
│   │
│   └── admin/
│       ├── store/
│       │   └── adminAuthStore.ts         # Admin auth state
│       ├── pages/
│       │   ├── AdminLogin.tsx
│       │   └── AdminDashboard.tsx
│       └── components/
│           └── AdminProtectedRoute.tsx
│
├── config/
│   └── api.config.ts                     # Centralized API endpoints
├── App.tsx                               # Main routing configuration
└── pages/
    └── Homepage.tsx                      # Landing page with portal selection
```

---

## Routes

### User Routes
- `/user/login` - User login page
- `/user/signup` - User signup page
- `/user/dashboard` - User dashboard (protected)

### Professional Routes
- `/professional/login` - Professional login page
- `/professional/signup` - Professional signup page
- `/professional/dashboard` - Professional dashboard (protected)

### Admin Routes
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard (protected)

### Public Routes
- `/` - Homepage with portal selection
- `/login` - Legacy login (redirects to user login)
- `/signup` - Legacy signup (redirects to user signup)

---

## Backend API Endpoints

### User Endpoints (`/api/users`)
```
POST /api/users/signup       - User registration
POST /api/users/login        - User login
POST /api/users/logout       - User logout
GET  /api/users/checkAuth    - Check user authentication
```

### Professional Endpoints (`/api/professional`)
```
POST /api/professional/signup              - Professional registration
POST /api/professional/login               - Professional login
POST /api/professional/logout              - Professional logout
POST /api/professional/upload-doc          - Upload credentials
GET  /api/professional/verified            - Get verified professionals (admin only)
GET  /api/professional/unverified          - Get unverified professionals (admin only)
PUT  /api/professional/update/:id          - Update professional (admin only)
DELETE /api/professional/delete/:id        - Delete professional (admin only)
```

### Admin Endpoints (`/api/admin`)
```
POST /api/admin/login        - Admin login
POST /api/admin/logout       - Admin logout
GET  /api/admin/dashboard    - Get dashboard statistics
POST /api/admin/insert       - Create new admin (admin only)
```

---

## Authentication Stores

Each module uses Zustand for state management with local storage persistence.

### User Auth Store (`useUserAuthStore`)

```typescript
{
  user: User | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  error: string | null,
  login: (data) => Promise<AuthResponse>,
  signup: (data) => Promise<AuthResponse>,
  logout: () => Promise<void>,
  checkAuth: () => Promise<void>,
  clearError: () => void
}
```

**Storage Key:** `user-auth-storage`

### Professional Auth Store (`useProfessionalAuthStore`)

```typescript
{
  professional: Professional | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  error: string | null,
  login: (data) => Promise<ProfessionalAuthResponse>,
  signup: (data) => Promise<ProfessionalAuthResponse>,
  logout: () => Promise<void>,
  uploadDocument: (file) => Promise<void>,
  clearError: () => void
}
```

**Storage Key:** `professional-auth-storage`

### Admin Auth Store (`useAdminAuthStore`)

```typescript
{
  admin: Admin | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  error: string | null,
  login: (data) => Promise<AdminAuthResponse>,
  logout: () => Promise<void>,
  clearError: () => void
}
```

**Storage Key:** `admin-auth-storage`

---

## Features by Module

### User Module Features
✅ User registration and login
✅ Profile management
✅ Dashboard with account statistics
✅ Email verification status
✅ Online status indicator
✅ Mood tracking integration
✅ Quick actions for support features
✅ Independent authentication

**Dashboard Highlights:**
- Account status overview
- Email verification status
- Online/offline indicator
- Current mood display
- Quick access to peer support, mood tracker, and resources

### Professional Module Features
✅ Professional registration with specialization
✅ License number tracking
✅ Document upload capability
✅ Verification status tracking
✅ Professional dashboard
✅ Client management interface
✅ Session statistics
✅ Independent authentication

**Dashboard Highlights:**
- Verification status (pending/verified)
- Active clients count
- Today's sessions
- Total sessions
- Quick actions for client management, scheduling, and document uploads

### Admin Module Features
✅ Secure admin login
✅ System statistics dashboard
✅ User management overview
✅ Professional verification management
✅ Real-time system monitoring
✅ Independent authentication

**Dashboard Highlights:**
- Total users count
- Total professionals count
- Active sessions monitoring
- Verified vs unverified professionals
- System health status
- Management actions for users, professionals, and verifications

---

## Security Features

### Separated Authentication
- Each user type has its own authentication flow
- Separate session management
- Independent token handling
- No cross-contamination between user types

### Protected Routes
- Each module has its own protected route component
- Automatic redirection to appropriate login page
- Loading states during authentication checks

### API Security
- Rate limiting on login endpoints
- Cookie-based authentication
- CORS protection
- Role-based access control

---

## Usage Examples

### User Login Flow

```typescript
// In UserLogin.tsx
import { useUserAuthStore } from '../store/userAuthStore';

const { login, isLoading, error } = useUserAuthStore();

const handleSubmit = async (formData) => {
  await login({
    email: formData.email,
    password: formData.password
  });
  navigate('/user/dashboard');
};
```

### Professional Login Flow

```typescript
// In ProfessionalLogin.tsx
import { useProfessionalAuthStore } from '../store/professionalAuthStore';

const { login, isLoading, error } = useProfessionalAuthStore();

const handleSubmit = async (formData) => {
  await login({
    email: formData.email,
    password: formData.password
  });
  navigate('/professional/dashboard');
};
```

### Admin Login Flow

```typescript
// In AdminLogin.tsx
import { useAdminAuthStore } from '../store/adminAuthStore';

const { login, isLoading, error } = useAdminAuthStore();

const handleSubmit = async (formData) => {
  await login({
    email: formData.email,
    password: formData.password
  });
  navigate('/admin/dashboard');
};
```

---

## Testing the Modules

### Testing User Module
1. Navigate to `http://localhost:5173/user/signup`
2. Create a new user account
3. Login at `http://localhost:5173/user/login`
4. Access dashboard at `http://localhost:5173/user/dashboard`

### Testing Professional Module
1. Navigate to `http://localhost:5173/professional/signup`
2. Create a professional account (include specialization)
3. Login at `http://localhost:5173/professional/login`
4. Access dashboard at `http://localhost:5173/professional/dashboard`
5. Note the verification status indicator

### Testing Admin Module
1. Navigate to `http://localhost:5173/admin/login`
2. Login with admin credentials
3. Access dashboard at `http://localhost:5173/admin/dashboard`
4. View system statistics and management options

---

## Environment Variables

Make sure to set up your `.env` file in the frontend:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Backend `.env`:
```env
PORT=5000
FRONTEND_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## Color Themes

Each module has its own color theme for visual distinction:

- **User Module**: Blue/Indigo gradient (`from-blue-500 to-indigo-600`)
- **Professional Module**: Teal/Green gradient (`from-teal-500 to-green-600`)
- **Admin Module**: Dark Gray (`from-gray-800 to-gray-900`)

---

## Future Enhancements

### Planned Features
- [ ] Email verification integration
- [ ] Two-factor authentication
- [ ] Professional document verification workflow
- [ ] Admin user management interface
- [ ] Professional approval system
- [ ] Advanced analytics dashboard
- [ ] Session scheduling for professionals
- [ ] Client management system
- [ ] Real-time notifications

---

## Troubleshooting

### Common Issues

**Issue:** User is not redirected after login
- **Solution:** Check that the authentication store is properly updating `isAuthenticated`

**Issue:** Protected routes not working
- **Solution:** Ensure the appropriate protected route component is wrapping the route in `App.tsx`

**Issue:** Authentication persists across user types
- **Solution:** Clear browser storage for each domain/user type (different storage keys are used)

**Issue:** API endpoints returning 404
- **Solution:** Verify backend routes are properly configured and server is running

---

## Support

For issues or questions:
1. Check the browser console for error messages
2. Verify API endpoints in `api.config.ts`
3. Check backend routes match the frontend configuration
4. Review authentication store state in Redux DevTools

---

## Maintenance Notes

### Adding New Features to a Module

1. Create new pages in the appropriate module's `pages/` folder
2. Add routes in `App.tsx`
3. Update the module's store if needed
4. Add API endpoints in `api.config.ts`
5. Implement backend route handlers

### Creating a New User Type Module

1. Create new folder in `modules/`
2. Set up store with Zustand
3. Create login, signup, and dashboard pages
4. Create protected route component
5. Add routes in `App.tsx`
6. Configure API endpoints
7. Update backend routes

---

**Last Updated:** November 25, 2025
**Version:** 2.0

