import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore.js';
import { logoutLiveMovie } from '../livemovie.js';
import Card from '../components/Card.js';
import { Button, Alert } from '../components/FormComponents.js';

export default function ProfilePage() {
  const { user, clearState } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutLiveMovie();
    clearState();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-4">
        <Card>
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-textPrimary">Please log in</h1>
            <Button
              onClick={() => navigate('/')}
              variant="primary"
            >
              Back to Login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* User Profile */}
      <Card title="User Profile">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {user.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-textPrimary">{user.username}</h2>
              <p className="text-textSecondary">Active user</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card title="Account Settings">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">Username</label>
            <p className="px-4 py-2 bg-dark-900 border border-dark-700 rounded-lg text-textPrimary">
              {user.username}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-2">Member Since</label>
            <p className="text-textSecondary">Account created</p>
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <Card title="Preferences">
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-dark-800/50 transition-colors">
            <input type="checkbox" className="w-4 h-4" defaultChecked />
            <span className="text-textPrimary">Email notifications</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-dark-800/50 transition-colors">
            <input type="checkbox" className="w-4 h-4" defaultChecked />
            <span className="text-textPrimary">Public profile</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-dark-800/50 transition-colors">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-textPrimary">Show watch history</span>
          </label>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card variant="outlined" className="border-danger-500/30 bg-danger-500/5">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-danger-400 mb-2">Danger Zone</h3>
            <p className="text-sm text-textSecondary mb-4">
              Irreversible actions. Please proceed with caution.
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="danger"
            fullWidth
          >
            Logout
          </Button>
        </div>
      </Card>
    </div>
  );
}
