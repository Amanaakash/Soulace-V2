# Quick Start Guide - Authentication System

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Backend server running on `http://localhost:5000`
- MongoDB connected

### Installation

1. **Install Dependencies** (if not already done):
```bash
cd frontend
npm install
```

2. **Environment Setup**:
Create a `.env` file in the frontend directory (if it doesn't exist):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

3. **Start the Development Server**:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📱 Using the Authentication System

### 1. Registration (Sign Up)

1. Navigate to: `http://localhost:5173/signup`
2. Fill in all required fields:
   - Select user role (User/Professional/Admin)
   - Enter first name and last name
   - Enter email and phone number
   - Select gender and date of birth
   - Create a password (minimum 6 characters)
   - Confirm password
   - Accept terms and conditions
3. Click "Create Account"
4. You'll be automatically logged in and redirected to the dashboard

### 2. Login

1. Navigate to: `http://localhost:5173/login`
2. Enter your credentials:
   - Select your user role
   - Enter email
   - Enter password
3. Click "Sign in"
4. You'll be redirected to the dashboard

### 3. Accessing Protected Routes

All routes except `/`, `/login`, and `/signup` require authentication:
- `/dashboard`
- `/peer-support`
- `/professional-help`
- `/mood-tracker`
- `/mood-assessment`
- `/mindfulness`
- `/community`
- `/emergency`
- `/profile`

If you try to access any of these without being logged in, you'll be redirected to the login page.

### 4. Logout

Click the logout button (red icon) in the sidebar to log out. You'll be redirected to the login page.

## 🧪 Testing Different User Roles

### Create Test Users for Each Role

1. **Regular User**:
   - Sign up with role "User"
   - Access all standard features

2. **Professional**:
   - Sign up with role "Professional"
   - Get access to professional features
   - See professional-specific content

3. **Admin**:
   - Sign up with role "Admin"
   - Get full access to all features
   - See admin-specific content

## 🔧 Using Authentication in Your Components

### Basic Usage

```typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <h1>Hello, {user?.firstName}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Role-Based Rendering

```typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { isUser, isProfessional, isAdmin } = useAuth();

  return (
    <div>
      {isUser() && <UserFeatures />}
      {isProfessional() && <ProfessionalFeatures />}
      {isAdmin() && <AdminFeatures />}
    </div>
  );
}
```

### Protecting Routes

```typescript
import ProtectedRoute from './components/ProtectedRoute';

// Protect a route for all authenticated users
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>

// Protect a route for specific roles only
<Route 
  path="/admin" 
  element={
    <ProtectedRoute allowedRoles={['Admin']}>
      <AdminPanel />
    </ProtectedRoute>
  } 
/>
```

## 🐛 Common Issues & Solutions

### Issue: CORS Error
**Solution**: Make sure the backend CORS is configured properly:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
```

### Issue: Authentication Not Persisting
**Solution**: 
- Clear browser cookies and cache
- Check if backend is setting cookies properly
- Verify `withCredentials: true` in axios config

### Issue: "Cannot read property 'firstName' of null"
**Solution**: Always check if user exists before accessing properties:
```typescript
const { user } = useAuth();
return <div>{user?.firstName || 'Guest'}</div>;
```

### Issue: Redirected to Login After Refresh
**Solution**: The `checkAuth()` function should be called automatically. If not:
```typescript
useEffect(() => {
  checkAuth();
}, []);
```

## 📝 API Endpoints Used

- `POST /api/users/signup` - Register new user
- `POST /api/users/login` - Login user
- `POST /api/users/logout` - Logout user
- `GET /api/users/checkAuth` - Check authentication status

## 🎨 Customization Tips

### Change Theme Colors
Edit the Tailwind classes in `Login.tsx` and `Signup.tsx`:
```typescript
// From blue/indigo theme
className="bg-indigo-600 hover:bg-indigo-700"

// To another color (e.g., purple)
className="bg-purple-600 hover:bg-purple-700"
```

### Add Additional User Fields
1. Update `auth.types.ts` to add new fields
2. Update signup form in `Signup.tsx`
3. Update backend User model
4. Update signup API handler

### Customize Error Messages
Edit the error messages in `authStore.ts`:
```typescript
const errorMessage = error.response?.data?.message || 'Custom error message';
```

## 📚 Learn More

- See `AUTH_IMPLEMENTATION.md` for detailed documentation
- Check `src/components/RoleBasedContent.tsx` for examples
- Review `src/hooks/useAuth.ts` for available utility functions

## 🆘 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Check the backend server logs
3. Verify all environment variables are set
4. Ensure MongoDB is running and connected
5. Clear cookies and try again

## ✅ Checklist

- [ ] Backend server is running
- [ ] MongoDB is connected
- [ ] Frontend dependencies installed
- [ ] Environment variables set
- [ ] Can access signup page
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Can access protected routes
- [ ] Can logout successfully
- [ ] User info displays correctly in sidebar

---

Happy coding! 🎉

