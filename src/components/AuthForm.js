import React from 'react';

export default function AuthForm({ authForm, setAuthForm, onSubmit, error }) {
  const isRegister = authForm.mode === 'register';

  return React.createElement(
    'div',
    { className: 'auth-shell' },
    React.createElement(
      'div',
      { className: 'auth-card' },
      React.createElement('p', { className: 'eyebrow' }, 'Movie Watchlist'),
      React.createElement('h1', null, isRegister ? 'Create account' : 'Login'),
      error && React.createElement('p', { className: 'error-message' }, error),
      React.createElement(
        'form',
        { className: 'auth-form', onSubmit },
        React.createElement('input', {
          type: 'text',
          value: authForm.username,
          onChange: (event) => setAuthForm({ ...authForm, username: event.target.value }),
          placeholder: 'Username',
          required: true,
        }),
        React.createElement('input', {
          type: 'password',
          value: authForm.password,
          onChange: (event) => setAuthForm({ ...authForm, password: event.target.value }),
          placeholder: 'Password',
          required: true,
        }),
        React.createElement('button', { type: 'submit' }, isRegister ? 'Create account' : 'Login'),
        React.createElement(
          'button',
          {
            type: 'button',
            className: 'secondary-btn',
            onClick: () => setAuthForm({ ...authForm, mode: isRegister ? 'login' : 'register' }),
          },
          isRegister ? 'Already have an account? Login' : 'Need an account? Register'
        )
      )
    )
  );
}
