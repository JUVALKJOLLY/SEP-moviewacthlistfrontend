import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore.js';

export default function Sidebar() {
  const { user } = useAppStore();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', path: '/watchlist' },
    { id: 'watchlist', icon: '🎬', label: 'Watchlist', path: '/watchlist' },
    { id: 'profile', icon: '👤', label: 'Profile', path: '/profile' },
  ];

  const isActive = (path) => location.pathname === path;

  if (!user) return null;

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-dark-900 border-r border-dark-700 transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo/Brand */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-dark-700">
        <div className={`flex items-center gap-2 ${isCollapsed && 'justify-center w-full'}`}>
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
            🎬
          </div>
          {!isCollapsed && <span className="font-bold text-lg text-textPrimary">MovieList</span>}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-primary-600 text-white'
                : 'text-textSecondary hover:bg-dark-800 hover:text-textPrimary'
            } ${isCollapsed && 'justify-center'}`}
            title={isCollapsed ? item.label : ''}
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Collapse Button */}
      <div className="border-t border-dark-700 p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-textSecondary hover:text-textPrimary hover:bg-dark-800 rounded-lg transition-colors"
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          <span className="text-lg">{isCollapsed ? '→' : '←'}</span>
          {!isCollapsed && <span className="text-sm">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
