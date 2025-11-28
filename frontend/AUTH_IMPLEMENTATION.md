# Authentication Implementation Guide

## Overview
This project implements a complete authentication system for three types of users:
- **User**: Regular users seeking mental health support
- **Professional**: Mental health professionals providing services
- **Admin**: System administrators

## Features Implemented

### 1. Authentication Pages
- **Login Page** (`/login`): User authentication with role selection
- **Signup Page** (`/signup`): User registration with comprehensive form validation

### 2. State Management (Zustand)
The authentication state is managed using Zustand store located at `src/store/authStore.ts`

**Available Actions:**
```typescript
- login(data: LoginData): Promise<AuthResponse>
- signup(data: SignupData): Promise<AuthResponse>
- logout(): Promise<void>
- checkAuth(): Promise<void>
- clearError(): void
```

**State Properties:**
```typescript
- user: User | null
- isAuthenticated: boolean
- isLoading: boolean
- error: string | null
```

### 3. Protected Routes
All authenticated routes are wrapped with the `ProtectedRoute` component that:
- Checks if the user is authenticated
- Redirects to login if not authenticated
- Supports role-based access control
- Shows loading state during authentication check

### 4. Type Definitions
Complete TypeScript types are defined in `src/types/auth.types.ts`:
- `User`: User data interface
- `UserRole`: Type for user roles (User | Professional | Admin)
- `SignupData`: Signup form data
- `LoginData`: Login form data
- `AuthResponse`: API response format

## Usage Examples

### Using Auth Store in Components

```typescript
import { useAuthStore } from '../store/authStore';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      <p>Role: {user?.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Creating Role-Specific Routes

```typescript
<Route 
  path="/admin-panel" 
  element={
    <ProtectedRoute allowedRoles={['Admin']}>
      <AdminPanel />
    </ProtectedRoute>
  } 
/>

<Route 
  path="/professional-dashboard" 
  element={
    <ProtectedRoute allowedRoles={['Professional', 'Admin']}>
      <ProfessionalDashboard />
    </ProtectedRoute>
  } 
/>
```

### Checking User Role

```typescript
import { useAuthStore } from '../store/authStore';

function MyComponent() {
  const { user } = useAuthStore();

  const isProfessional = user?.role === 'Professional';
  const isAdmin = user?.role === 'Admin';

  return (
    <div>
      {isProfessional && <ProfessionalFeatures />}
      {isAdmin && <AdminFeatures />}
    </div>
  );
}
```

## File Structure

```
frontend/src/
├── types/
│   └── auth.types.ts           # TypeScript type definitions
├── store/
│   └── authStore.ts            # Zustand authentication store
├── config/
│   └── api.config.ts           # API configuration and endpoints
├── utils/
│   └── axios.ts                # Axios instance with interceptors
├── components/
│   ├── Layout.tsx              # Main layout with user info and logout
│   └── ProtectedRoute.tsx      # Route protection component
└── pages/
    ├── Login.tsx               # Login page
    └── Signup.tsx              # Signup page
```

## API Endpoints

The frontend communicates with the following backend endpoints:

- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users/checkAuth` - Verify authentication status

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Security Features

1. **HTTP-Only Cookies**: Authentication tokens are stored in HTTP-only cookies
2. **CORS Configuration**: Proper CORS setup with credentials support
3. **Password Validation**: Minimum 6 characters, matching confirmation
4. **Email Validation**: Proper email format validation
5. **Age Verification**: Must be at least 13 years old
6. **Protected Routes**: Automatic redirect to login for unauthenticated users
7. **Role-Based Access**: Routes can be restricted by user role

## Form Validations

### Signup Form
- ✅ First Name (required)
- ✅ Last Name (required)
- ✅ Email (required, valid format)
- ✅ Phone Number (required, valid format)
- ✅ Gender (required: Male/Female/Other)
- ✅ Date of Birth (required, must be 13+)
- ✅ Password (required, min 6 characters)
- ✅ Confirm Password (required, must match)
- ✅ User Role (User/Professional/Admin)
- ✅ Terms & Conditions acceptance

### Login Form
- ✅ Email (required, valid format)
- ✅ Password (required)
- ✅ User Role (User/Professional/Admin)
- ✅ Remember Me option

## UI Features

### Login Page
- Modern gradient background
- Role selection dropdown
- Password visibility toggle
- Remember me checkbox
- Forgot password link
- Link to signup page
- Loading state with spinner
- Error message display

### Signup Page
- Responsive two-column layout
- All required field validations
- Real-time error feedback
- Password visibility toggles
- Date picker for DOB
- Terms & conditions checkbox
- Link to login page
- Loading state with spinner
- Error message display

### Layout Component
- User information display (name and role)
- Logout functionality
- Responsive sidebar
- Role-based navigation

## Testing the Implementation

1. **Start the Backend Server**:
```bash
cd backend
npm start
```

2. **Start the Frontend Development Server**:
```bash
cd frontend
npm run dev
```

3. **Test User Registration**:
   - Navigate to `/signup`
   - Fill in all required fields
   - Select a user role (User/Professional/Admin)
   - Submit the form
   - Should redirect to dashboard on success

4. **Test User Login**:
   - Navigate to `/login`
   - Enter email and password
   - Select the correct user role
   - Submit the form
   - Should redirect to dashboard on success

5. **Test Protected Routes**:
   - Try accessing `/dashboard` without logging in
   - Should redirect to `/login`
   - After logging in, should access the dashboard

6. **Test Logout**:
   - Click logout button in the sidebar
   - Should redirect to login page
   - Trying to access protected routes should redirect to login

## Troubleshooting

### CORS Errors
- Ensure backend has proper CORS configuration with `credentials: true`
- Frontend axios instance has `withCredentials: true`

### Authentication Not Persisting
- Check if cookies are being set properly
- Verify `httpOnly` and `sameSite` cookie settings
- Check browser cookie settings

### Role-Based Access Not Working
- Verify user object has correct `role` property
- Check `allowedRoles` array in ProtectedRoute
- Ensure role is being sent from backend

## Next Steps

To extend the authentication system:

1. **Password Reset**: Implement forgot password functionality
2. **Email Verification**: Add email verification before login
3. **Phone Verification**: Add OTP-based phone verification
4. **Social Login**: Add Google/Facebook authentication
5. **Two-Factor Authentication**: Add 2FA for enhanced security
6. **Session Management**: Add ability to view/manage active sessions
7. **Profile Completion**: Add profile completion prompts for new users
8. **Remember Me**: Implement proper remember me functionality

## Support

For issues or questions, please refer to the main project documentation or contact the development team.

