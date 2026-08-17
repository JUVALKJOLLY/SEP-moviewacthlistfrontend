import React from 'react';

export default function ProfilePanel({ user, userData, stats }) {
  const displayName = typeof user === 'string' ? user : user?.username || 'Guest';
  const addedMovies = userData?.added_movies || [];
  const userInfo = userData?.user || user || {};

  return React.createElement(
    'div',
    { className: 'profile-panel' },
    React.createElement(
      'div',
      null,
      React.createElement('p', { className: 'profile-label' }, 'Profile'),
      React.createElement('h2', null, displayName)
    ),
    React.createElement(
      'div',
      { className: 'profile-stats' },
      React.createElement(
        'div',
        null,
        React.createElement('span', null, 'Total'),
        React.createElement('strong', null, stats.total)
      ),
      React.createElement(
        'div',
        null,
        React.createElement('span', null, 'Watched'),
        React.createElement('strong', null, stats.watched)
      ),
      React.createElement(
        'div',
        null,
        React.createElement('span', null, 'To Watch'),
        React.createElement('strong', null, stats.unwatched)
      ),
      React.createElement(
        'div',
        null,
        React.createElement('span', null, 'Avg. Rating'),
        React.createElement('strong', null, `${stats.avgRating}/5`)
      )
    ),
    user && React.createElement(
      'div',
      { className: 'profile-details' },
      React.createElement('h3', null, 'User Details'),
      React.createElement('p', null, 'Username: ', userInfo.username || displayName),
      React.createElement('p', null, 'User ID: ', userInfo.id ?? 'N/A'),
      React.createElement('p', null, 'Movies Added: ', userData?.added_movies_count ?? addedMovies.length),
      userInfo.email && React.createElement('p', null, 'Email: ', userInfo.email),
      userInfo.last_login && React.createElement('p', null, 'Last Login: ', new Date(userInfo.last_login).toLocaleString())
    ),
    user && addedMovies.length > 0 && React.createElement(
      'div',
      { className: 'profile-movies' },
      React.createElement('h3', null, 'Added Movies'),
      React.createElement(
        'ul',
        null,
        addedMovies.map((movie) =>
          React.createElement(
            'li',
            { key: movie.id || movie.title },
            React.createElement('strong', null, movie.title),
            ' - ',
            movie.type,
            ' • ',
            movie.status,
            ' • ',
            movie.rating,
            '/5'
          )
        )
      )
    )
  );
}
