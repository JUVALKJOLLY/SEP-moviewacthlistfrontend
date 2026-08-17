import React, { useEffect, useMemo } from 'react';
import { useAppStore } from '../store/useAppStore.js';
import { apiFetch, parseResponse } from '../api.js';
import Card from '../components/Card.js';
import { Button, Input, Select, Badge, Alert } from '../components/FormComponents.js';
import MediaList from '../components/MediaList.js';

const tabs = [
  { key: 'UNWATCHED', label: 'To Watch', icon: '📋' },
  { key: 'WATCHED', label: 'Watched', icon: '✅' },
];

const TYPE_OPTIONS = [
  { label: 'Movie', value: 'MOVIE' },
  { label: 'Show', value: 'TV' },
];

const TV_SHOWS = [
  'Breaking Bad',
  'Game of Thrones',
  'The Crown',
  'Stranger Things',
  'The Witcher',
  'Narcos',
  'Dark',
  'The Mandalorian',
  'The Office',
  'Friends',
  'The Boys',
  'Succession',
  'Chernobyl',
  'Mindhunter',
  'Peaky Blinders',
  'Sherlock',
  'Doctor Who',
  'Black Mirror',
  'The Expanse',
  'House of Cards',
  'Westworld',
  'True Detective',
  'Dexter',
  'Brooklyn Nine-Nine',
  'The Crown',
  'The Handmaid\'s Tale',
  'Ozark',
  'Fleabag',
  'Killing Eve',
  'The Sopranos',
];

const MOVIES = [
  'Inception',
  'The Dark Knight',
  'Interstellar',
  'Pulp Fiction',
  'The Shawshank Redemption',
  'The Godfather',
  'Dune',
  'Arrival',
  'Barbie',
  'Oppenheimer',
  'Top Gun: Maverick',
  'Avengers',
  'Avatar',
  'Titanic',
  'The Matrix',
  'Forrest Gump',
  'Gladiator',
  'The Silence of the Lambs',
  'The Lion King',
  'Frozen',
  'Toy Story',
  'Joker',
  'The Irishman',
  'Parasite',
  'Once Upon a Time in Hollywood',
  'Everything Everywhere All at Once',
  'Dune: Part Two',
];

const POPULAR_TITLES = [
  ...TV_SHOWS,
  ...MOVIES,
];

const detectMediaType = (title) => {
  if (!title.trim()) return 'MOVIE';
  
  const normalizedTitle = title.trim().toLowerCase();
  
  // Check exact matches in TV shows list
  const isTVShow = TV_SHOWS.some(show => show.toLowerCase() === normalizedTitle);
  if (isTVShow) return 'TV';
  
  // Check exact matches in movies list
  const isMovie = MOVIES.some(movie => movie.toLowerCase() === normalizedTitle);
  if (isMovie) return 'MOVIE';
  
  // Check partial matches - if title contains show keywords
  const showKeywords = ['series', 'season', 'episode', 'netflix series', 'bbc', 'hbo', 'showtime'];
  const hasShowKeywords = showKeywords.some(keyword => normalizedTitle.includes(keyword));
  if (hasShowKeywords) return 'TV';
  
  // Default to MOVIE
  return 'MOVIE';
};

const normalizeMediaType = (value) => (value === 'SHOW' ? 'TV' : value || 'MOVIE');

export default function WatchlistPage() {
  const {
    user,
    items,
    setItems,
    activeTab,
    setActiveTab,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    form,
    setForm,
    resetForm,
    error,
    setError,
  } = useAppStore();

  useEffect(() => {
    if (user) {
      fetchItems();
    }
  }, [user]);

  const fetchItems = async () => {
    try {
      const res = await apiFetch('/api/media/');
      if (!res.ok) {
        const message = res.statusText || res.data?.detail || res.data?.message || 'Request failed';
        throw new Error(message);
      }
      const data = await parseResponse(res);
      const normalizedItems = (data.items || []).map((item) => ({
        ...item,
        type: normalizeMediaType(item.type),
      }));
      setItems(normalizedItems);
      setError('');
    } catch (err) {
      const message = (err.message || 'Failed to fetch items').replace(/^Error:\s*/i, '');
      setError(message);
    }
  };

  const searchSuggestions = useMemo(() => {
    const trimmed = search.trim().toLowerCase();
    if (!trimmed) {
      return POPULAR_TITLES.slice(0, 6);
    }

    return POPULAR_TITLES.filter((title) => title.toLowerCase().includes(trimmed)).slice(0, 6);
  }, [search]);

  const filteredItems = useMemo(() => {
    return (items || []).filter((item) => {
      const normalizedType = normalizeMediaType(item.type);
      const matchesStatus = item.status === activeTab;
      const matchesType = typeFilter === 'ALL' || normalizedType === typeFilter;
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [items, activeTab, typeFilter, search]);

  const handleAddItem = async () => {
    if (!form.title.trim()) {
      setError('Please enter a title');
      return;
    }
    
    // Auto-detect media type from title
    const detectedType = detectMediaType(form.title.trim());
    
    const payload = {
      title: form.title.trim(),
      type: detectedType,
      status: 'UNWATCHED',  // Default to "To Watch"
    };
    
    try {
      const res = await apiFetch('/api/media/', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const message = res.statusText || res.data?.detail || res.data?.message || 'Request failed';
        throw new Error(message);
      }
      const newItem = await parseResponse(res);
      setItems([...items, { ...newItem, type: normalizeMediaType(newItem.type) }]);
      resetForm();
      setError('');
    } catch (err) {
      const message = (err.message || 'Failed to add item').replace(/^Error:\s*/i, '');
      setError(message);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const res = await apiFetch(`/api/media/${id}/`, { method: 'DELETE' });
      if (!res.ok) {
        const message = res.statusText || res.data?.detail || res.data?.message || 'Request failed';
        throw new Error(message);
      }
      setItems(items.filter((item) => item.id !== id));
      setError('');
    } catch (err) {
      const message = (err.message || 'Failed to delete item').replace(/^Error:\s*/i, '');
      setError(message);
    }
  };

  const handleUpdateItem = async (id, updatedData) => {
    try {
      const res = await apiFetch(`/api/media/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ ...updatedData, type: normalizeMediaType(updatedData.type) }),
      });
      if (!res.ok) {
        const message = res.statusText || res.data?.detail || res.data?.message || 'Request failed';
        throw new Error(message);
      }
      const updated = await parseResponse(res);
      setItems(items.map((item) => (item.id === id ? { ...updated, type: normalizeMediaType(updated.type) } : item)));
      setError('');
    } catch (err) {
      const message = (err.message || 'Failed to update item').replace(/^Error:\s*/i, '');
      setError(message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card>
          <p className="text-textSecondary text-center">Please log in to view your watchlist</p>
        </Card>
      </div>
    );
  }

  const stats = useMemo(() => {
    return {
      total: items.length,
      watched: items.filter((i) => i.status === 'WATCHED').length,
      unwatched: items.filter((i) => i.status === 'UNWATCHED').length,
      movies: items.filter((i) => normalizeMediaType(i.type) === 'MOVIE').length,
      shows: items.filter((i) => normalizeMediaType(i.type) === 'TV').length,
    };
  }, [items]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card title="Total">
          <p className="text-3xl font-bold text-primary-500">{stats.total}</p>
          <p className="text-sm text-textSecondary mt-2">Items in watchlist</p>
        </Card>
        <Card title="Watched">
          <p className="text-3xl font-bold text-success-500">{stats.watched}</p>
          <p className="text-sm text-textSecondary mt-2">Completed</p>
        </Card>
        <Card title="To Watch">
          <p className="text-3xl font-bold text-warning-500">{stats.unwatched}</p>
          <p className="text-sm text-textSecondary mt-2">Pending</p>
        </Card>
        <Card title="Movies">
          <p className="text-3xl font-bold text-info-500">{stats.movies}</p>
          <p className="text-sm text-textSecondary mt-2">Movie titles</p>
        </Card>
        <Card title="Shows">
          <p className="text-3xl font-bold text-secondary-500">{stats.shows}</p>
          <p className="text-sm text-textSecondary mt-2">TV shows</p>
        </Card>
      </div>

      {/* Errors */}
      {error && (
        <Alert variant="danger" dismissible onDismiss={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Add New Item */}
      <Card title="Add Movie/Show">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleAddItem();
          }}
          className="flex gap-3"
        >
          <input
            type="text"
            placeholder="Enter movie or show name"
            value={form.title}
            onChange={(e) => {
              console.log('Input changed to:', e.target.value);
              setForm((prev) => ({ ...prev, title: e.target.value }));
            }}
            className="flex-1 px-4 py-2 bg-dark-900 border border-dark-700 text-textPrimary placeholder-textTertiary rounded-lg transition-all duration-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
          <button
            type="submit"
            onClick={(e) => {
              console.log('Button clicked, form.title:', form.title);
            }}
            className="px-8 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Add
          </button>
        </form>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-dark-700 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-all duration-200 border-b-2 ${
              activeTab === tab.key
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-textSecondary hover:text-textPrimary'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            <Badge variant="primary" size="sm">
              {activeTab === tab.key ? filteredItems.length : items.filter((i) => i.status === tab.key).length}
            </Badge>
          </button>
        ))}
      </div>

      {/* Media List */}
      <Card noPadding>
        <MediaList
          items={filteredItems}
          onDelete={handleDeleteItem}
          onUpdate={handleUpdateItem}
        />
      </Card>
    </div>
  );
}
