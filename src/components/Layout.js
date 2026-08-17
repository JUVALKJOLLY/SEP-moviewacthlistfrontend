import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore.js';
import { logoutLiveMovie } from '../livemovie.js';
import Sidebar from './Sidebar.js';

export default function Layout({ children }) {
  const { user, clearState } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutLiveMovie();
    clearState();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Sidebar */}
      {user && <Sidebar />}

      {/* Main Content */}
      <div className={`${user ? 'ml-64' : ''} transition-all duration-300`}>
        {/* Top Navigation Bar */}
        <nav className="bg-dark-900 border-b border-dark-700 sticky top-0 z-30">
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              {!user ? (
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary-500 hover:text-primary-400">
                  <span>🎬</span>
                  <span>Movie Watchlist</span>
                </Link>
              ) : (
                <h1 className="text-xl font-bold text-textPrimary">Movie Watchlist</h1>
              )}
            </div>

            {/* User Menu */}
            <div className="flex gap-4 items-center">
              {user && (
                <>
                  <div className="text-textSecondary text-sm">
                    {user.username}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                    {user.username?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-danger-600 hover:bg-danger-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className={`${user ? 'p-6' : 'p-0'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
