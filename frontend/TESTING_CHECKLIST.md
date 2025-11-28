# Testing Checklist for Authentication System

## Pre-Testing Setup

- [ ] Backend server is running on `http://localhost:5000`
- [ ] MongoDB is connected and running
- [ ] Frontend dev server is running on `http://localhost:5173`
- [ ] Browser developer tools are open for debugging
- [ ] Network tab is monitoring requests

## 1. Homepage Testing

### Navigation
- [ ] Homepage loads correctly at `/`
- [ ] When not logged in, shows "Login" and "Get Started" buttons
- [ ] When logged in, shows "Dashboard" button
- [ ] Hero section CTA changes based on auth status
- [ ] All navigation links work properly

## 2. Signup Flow Testing

### Page Access
- [ ] Can access signup page at `/signup`
- [ ] Signup page displays correctly
- [ ] All form fields are visible

### Form Validation
- [ ] Cannot submit with empty fields
- [ ] Email validation works (shows error for invalid email)
- [ ] Phone validation works
- [ ] Password must be at least 6 characters
- [ ] Passwords must match
- [ ] Age validation (must be 13+)
- [ ] All required fields show asterisk (*)

### User Registration
- [ ] Can register as "User" role
  - Fill all fields correctly
  - Submit form
  - Check for success (redirect to dashboard)
  - Verify user info in sidebar

- [ ] Can register as "Professional" role
  - Fill all fields correctly
  - Select "Professional" role
  - Submit form
  - Check for success
  - Verify role displays as "Professional"

- [ ] Can register as "Admin" role
  - Fill all fields correctly
  - Select "Admin" role
  - Submit form
  - Check for success
  - Verify role displays as "Admin"

### Error Handling
- [ ] Shows error for duplicate email
- [ ] Shows error for duplicate phone number
- [ ] Shows error for network issues
- [ ] Error messages are clear and readable
- [ ] Can clear errors and retry

### UI/UX
- [ ] Password visibility toggle works
- [ ] Loading spinner shows during submission
- [ ] Form is disabled during loading
- [ ] Responsive on mobile devices
- [ ] All fields have proper labels

## 3. Login Flow Testing

### Page Access
- [ ] Can access login page at `/login`
- [ ] Login page displays correctly
- [ ] All form fields are visible

### Form Validation
- [ ] Cannot submit with empty fields
- [ ] Email validation works
- [ ] Password field works

### User Login
- [ ] Can login as User
  - Enter correct email and password
  - Select "User" role
  - Submit form
  - Verify redirect to dashboard
  - Check user info in sidebar

- [ ] Can login as Professional
  - Enter correct email and password
  - Select "Professional" role
  - Submit form
  - Verify redirect to dashboard

- [ ] Can login as Admin
  - Enter correct email and password
  - Select "Admin" role
  - Submit form
  - Verify redirect to dashboard

### Error Handling
- [ ] Shows error for wrong email
- [ ] Shows error for wrong password
- [ ] Shows error for wrong role selection
- [ ] Error messages are clear
- [ ] Can clear errors and retry

### UI/UX
- [ ] Password visibility toggle works
- [ ] Remember me checkbox works
- [ ] Loading spinner shows during submission
- [ ] Form is disabled during loading
- [ ] Link to signup page works
- [ ] Forgot password link is present

## 4. Protected Routes Testing

### Access Without Login
- [ ] Cannot access `/dashboard` without login (redirects to `/login`)
- [ ] Cannot access `/peer-support` without login
- [ ] Cannot access `/professional-help` without login
- [ ] Cannot access `/mood-tracker` without login
- [ ] Cannot access `/mood-assessment` without login
- [ ] Cannot access `/mindfulness` without login
- [ ] Cannot access `/community` without login
- [ ] Cannot access `/emergency` without login
- [ ] Cannot access `/profile` without login

### Access With Login
- [ ] Can access `/dashboard` after login
- [ ] Can access all protected routes after login
- [ ] Navigation between protected routes works
- [ ] Layout sidebar shows on all protected pages

## 5. Authentication Persistence Testing

### Page Refresh
- [ ] Auth persists after refreshing dashboard
- [ ] Auth persists after refreshing any protected page
- [ ] User info still displays after refresh
- [ ] Can still navigate after refresh

### Browser Tab
- [ ] Auth persists across new tabs
- [ ] Can open multiple tabs with same session

### Cookie Management
- [ ] Cookie is set after login (check browser DevTools)
- [ ] Cookie has correct attributes (httpOnly, sameSite)
- [ ] Cookie persists until logout

## 6. Logout Testing

### Logout Functionality
- [ ] Can logout from dashboard
- [ ] Logout button is visible in sidebar
- [ ] Clicking logout clears session
- [ ] Redirects to login page after logout
- [ ] Cannot access protected routes after logout
- [ ] User info is cleared from UI

### Multiple Logouts
- [ ] Can logout and login again
- [ ] Can logout from any protected page
- [ ] Logout works consistently

## 7. Layout Component Testing

### User Information Display
- [ ] User's full name displays correctly
- [ ] User's role displays correctly
- [ ] User initials/avatar shows correctly
- [ ] Settings link is visible

### Navigation
- [ ] All sidebar links work
- [ ] Active page is highlighted
- [ ] Mobile menu works properly
- [ ] Can close mobile menu

## 8. Role-Based Access Testing

### User Role
- [ ] User can access all standard features
- [ ] User sees user-specific content

### Professional Role
- [ ] Professional can access all features
- [ ] Professional sees professional-specific content

### Admin Role
- [ ] Admin can access all features
- [ ] Admin sees admin-specific content

## 9. API Integration Testing

### Network Requests
- [ ] Signup request goes to `/api/users/signup`
- [ ] Login request goes to `/api/users/login`
- [ ] Logout request goes to `/api/users/logout`
- [ ] CheckAuth request goes to `/api/users/checkAuth`
- [ ] All requests include credentials
- [ ] CORS headers are correct

### Response Handling
- [ ] Success responses are handled correctly
- [ ] Error responses show appropriate messages
- [ ] 401 errors redirect to login
- [ ] Network errors are caught gracefully

## 10. Error Handling Testing

### Network Errors
- [ ] Handles server offline gracefully
- [ ] Shows appropriate error message
- [ ] Allows retry

### Validation Errors
- [ ] Shows validation errors inline
- [ ] Validation errors are clear
- [ ] Can correct and resubmit

### Backend Errors
- [ ] Shows backend error messages
- [ ] Handles 400 errors
- [ ] Handles 401 errors
- [ ] Handles 500 errors

## 11. Security Testing

### Password Security
- [ ] Password is not visible by default
- [ ] Password toggle works correctly
- [ ] Password is masked in form
- [ ] Password is not shown in console logs

### Cookie Security
- [ ] Cookie is httpOnly (check DevTools)
- [ ] Cookie has secure flag in production
- [ ] Cookie has correct sameSite attribute

### Route Protection
- [ ] Cannot bypass login by URL manipulation
- [ ] Protected routes always check auth
- [ ] Expired sessions redirect to login

## 12. UI/UX Testing

### Responsive Design
- [ ] Works on desktop (1920x1080)
- [ ] Works on laptop (1366x768)
- [ ] Works on tablet (768x1024)
- [ ] Works on mobile (375x667)
- [ ] Forms are usable on mobile
- [ ] Buttons are touch-friendly

### Accessibility
- [ ] All inputs have labels
- [ ] Required fields are marked
- [ ] Error messages are associated with inputs
- [ ] Can navigate with keyboard
- [ ] Focus states are visible

### Loading States
- [ ] Loading spinner shows during async operations
- [ ] Form is disabled during loading
- [ ] Cannot submit multiple times
- [ ] Loading text is clear

### Visual Design
- [ ] Colors are consistent
- [ ] Fonts are readable
- [ ] Spacing is appropriate
- [ ] Gradients render correctly
- [ ] Icons display properly

## 13. Edge Cases Testing

### Form Edge Cases
- [ ] Very long names (50+ characters)
- [ ] Special characters in name
- [ ] Different email formats
- [ ] International phone numbers
- [ ] Past dates for DOB
- [ ] Future dates for DOB (should fail)

### Session Edge Cases
- [ ] Login in one tab, logout in another
- [ ] Multiple concurrent logins
- [ ] Login with expired token
- [ ] Rapid login/logout cycles

## 14. Browser Compatibility Testing

- [ ] Works in Chrome (latest)
- [ ] Works in Firefox (latest)
- [ ] Works in Safari (latest)
- [ ] Works in Edge (latest)
- [ ] Cookies work in all browsers
- [ ] CORS works in all browsers

## 15. Performance Testing

### Load Times
- [ ] Login page loads quickly
- [ ] Signup page loads quickly
- [ ] Dashboard loads quickly after login
- [ ] No unnecessary re-renders

### API Performance
- [ ] Login completes in < 2 seconds
- [ ] Signup completes in < 2 seconds
- [ ] CheckAuth completes quickly
- [ ] No redundant API calls

## Bug Tracking

### Bugs Found:
1. Bug: ________________________
   Severity: [ ] Critical [ ] High [ ] Medium [ ] Low
   Steps to reproduce: ________________________
   Expected: ________________________
   Actual: ________________________

2. Bug: ________________________
   Severity: [ ] Critical [ ] High [ ] Medium [ ] Low
   Steps to reproduce: ________________________
   Expected: ________________________
   Actual: ________________________

## Final Checks

- [ ] All critical issues resolved
- [ ] All high priority issues resolved
- [ ] Medium/low issues documented
- [ ] Code is clean and formatted
- [ ] No console errors
- [ ] No console warnings
- [ ] No linter errors
- [ ] Documentation is complete

## Sign-Off

**Tested By:** ____________________
**Date:** ____________________
**Status:** [ ] Passed [ ] Failed [ ] Needs Review
**Notes:** ________________________________

---

## Quick Test Script

For rapid testing, follow this sequence:

1. **Quick Signup Test** (2 min)
   - Go to `/signup`
   - Fill form as User
   - Submit
   - Verify dashboard access

2. **Quick Logout Test** (30 sec)
   - Click logout
   - Verify redirect to login

3. **Quick Login Test** (1 min)
   - Go to `/login`
   - Enter credentials
   - Verify dashboard access

4. **Quick Protected Route Test** (1 min)
   - Try accessing `/dashboard` without login
   - Verify redirect
   - Login and retry
   - Verify access

5. **Quick Persistence Test** (30 sec)
   - Refresh page
   - Verify still logged in

**Total Quick Test Time: ~5 minutes**

---

## Automated Testing (Future)

Consider adding:
- [ ] Unit tests for auth store
- [ ] Integration tests for login flow
- [ ] E2E tests with Playwright/Cypress
- [ ] API tests with Jest
- [ ] Component tests with React Testing Library

