import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore.js';
import { getLiveMovieUser, loginLiveMovie, registerLiveMovie } from '../livemovie.js';
import { Button, Input, Alert } from '../components/FormComponents.js';
import Card from '../components/Card.js';

export default function LoginPage() {
  const { user, setUser, setUserData, authForm, setAuthForm, showAuth, setShowAuth, error, setError } =
    useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    const cookieName = 'sessionid';
    const hasSessionCookie = document.cookie.split(';').some((cookie) => {
      const [name = ''] = cookie.trim().split('=');
      return name === cookieName;
    });

    if (hasSessionCookie) {
      checkUserOnMount();
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/watchlist');
    }
  }, [user, navigate]);

  const checkUserOnMount = async () => {
    try {
      const data = await getLiveMovieUser();
      if (!data) {
        setUser(null);
        setUserData(null);
        return;
      }

      setUserData(data);
      const normalizedUser =
        data && typeof data === 'object' ? (data.user || { username: data.username }) : null;
      if (normalizedUser) {
        setUser(normalizedUser);
      }
    } catch (error) {
      setUser(null);
      setUserData(null);
    }
  };

  const handleLogin = async () => {
    try {
      setError('');
      const result = await loginLiveMovie({
        username: authForm.username,
        password: authForm.password,
      });
      setUserData(result);
      const normalizedUser =
        result && typeof result === 'object'
          ? result.user || { username: result.username }
          : null;
      setUser(normalizedUser);
      setShowAuth(false);
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed');
    }
  };

  const handleRegister = async () => {
    try {
      setError('');
      const result = await registerLiveMovie({
        username: authForm.username,
        password: authForm.password,
      });
      setUserData(result);
      const normalizedUser =
        result && typeof result === 'object'
          ? result.user || { username: result.username }
          : null;
      setUser(normalizedUser);
      setShowAuth(false);
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center text-4xl mx-auto mb-4">
              🎬
            </div>
            <h1 className="text-4xl font-bold text-textPrimary mb-2">Movie Watchlist</h1>
            <p className="text-textSecondary">Track and manage your favorite movies and shows</p>
          </div>

          {!showAuth ? (
            <div className="space-y-4">
              <p className="text-textSecondary mb-6">
                Sign in to get started with your watchlist
              </p>
              <Button 
                onClick={() => setShowAuth(true)}
                fullWidth
                size="lg"
              >
                Get Started
              </Button>
              <p className="text-xs text-textTertiary">
                Secure login • No credit card required
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {error && (
                <Alert variant="danger" dismissible onDismiss={() => setError('')}>
                  {error}
                </Alert>
              )}

              <Input
                label="Username"
                placeholder="Enter your username"
                value={authForm.username}
                onChange={(e) =>
                  setAuthForm((prev) => ({ ...prev, username: e.target.value }))
                }
                fullWidth
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={authForm.password}
                onChange={(e) =>
                  setAuthForm((prev) => ({ ...prev, password: e.target.value }))
                }
                fullWidth
              />

              <div className="flex gap-3 pt-4">
                <Button
                  variant="primary"
                  onClick={handleLogin}
                  fullWidth
                >
                  Login
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleRegister}
                  fullWidth
                >
                  Register
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={() => setShowAuth(false)}
                fullWidth
              >
                Back
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
