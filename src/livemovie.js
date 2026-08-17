import { apiFetch, parseResponse } from './api.js';

export async function getLiveMovieUser() {
  const response = await apiFetch('/api/user/');

  if (response.status === 401) {
    return null;
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(data.detail || 'Unable to load user details.');
  }

  return data;
}

export async function loginLiveMovie(credentials) {
  const payload = {
    username: credentials?.username ?? '',
    password: credentials?.password ?? '',
  };

  const response = await apiFetch('/api/login/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(data.detail || 'Authentication failed.');
  }

  return data;
}

export async function registerLiveMovie(credentials) {
  const payload = {
    username: credentials?.username ?? '',
    password: credentials?.password ?? '',
  };

  const response = await apiFetch('/api/register/', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(data.detail || 'Registration failed.');
  }

  return data;
}

export async function logoutLiveMovie() {
  try {
    const response = await apiFetch('/api/logout/', {
      method: 'POST',
    });

    if (!response.ok) {
      const data = await parseResponse(response);
      throw new Error(data.detail || 'Logout failed.');
    }

    return await parseResponse(response).catch(() => ({ detail: 'Logged out successfully.' }));
  } catch (error) {
    console.warn('Logout request failed:', error);
    return { detail: 'Logged out locally.' };
  }
}
