import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/useAppStore.js';
import Layout from './components/Layout.js';
import LoginPage from './pages/LoginPage.js';
import WatchlistPage from './pages/WatchlistPage.js';
import ProfilePage from './pages/ProfilePage.js';
import NotFoundPage from './pages/NotFoundPage.js';

export default function App() {
  const { user } = useAppStore();

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/" replace />;
  };

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Layout>
        <Routes>
          {/* Login/Home page - accessible to all */}
          <Route path="/" element={<LoginPage />} />

          {/* Protected routes - require login */}
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <WatchlistPage />
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

          {/* 404 - catch all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
