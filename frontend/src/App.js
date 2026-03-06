/**
 * LinkShort - URL Shortener SaaS Application
 * 
 * This application is built to work with a FastAPI backend.
 * 
 * Backend Integration Points:
 * - Authentication: See /src/app/contexts/AuthContext.tsx
 *   - POST /api/auth/login (email, password)
 *   - POST /api/auth/signup (name, email, password)
 *   - GET /api/auth/me (with JWT token)
 * 
 * - URL Management: See /src/app/hooks/useUrls.ts
 *   - POST /api/urls (originalUrl, customAlias?, expirationDate?)
 *   - GET /api/urls (fetch user's URLs)
 *   - PUT /api/urls/{id} (update URL)
 *   - DELETE /api/urls/{id} (delete URL)
 * 
 * - Analytics:
 *   - GET /api/analytics/overview
 *   - GET /api/analytics/url/{id}
 * 
 * Replace mock API calls with actual fetch/axios calls to your FastAPI backend.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';
import { MyUrlsPage } from './pages/MyUrlsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { replace } from 'react-router';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-urls"
            element={
              <ProtectedRoute>
                <MyUrlsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </BrowserRouter>
  );
}

