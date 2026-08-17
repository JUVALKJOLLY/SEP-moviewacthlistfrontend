import { create } from 'zustand';

export const useAppStore = create((set) => ({
  // User state
  user: null,
  userData: null,
  setUser: (user) => set({ user }),
  setUserData: (userData) => set({ userData }),

  // Auth state
  showAuth: false,
  authForm: { username: 'user', password: 'user123', mode: 'login' },
  setShowAuth: (show) => set({ showAuth: show }),
  setAuthForm: (formUpdater) =>
    set((state) => ({
      authForm: typeof formUpdater === 'function' ? formUpdater(state.authForm) : formUpdater,
    })),

  // Media/Items state
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  updateItem: (id, updatedItem) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? updatedItem : item)),
    })),
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  // Filter state
  activeTab: 'UNWATCHED',
  search: '',
  typeFilter: 'ALL',
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearch: (search) => set({ search }),
  setTypeFilter: (type) => set({ typeFilter: type }),

  // Form state
  form: { title: '', type: 'MOVIE', status: 'UNWATCHED' },
  setForm: (formUpdater) =>
    set((state) => ({
      form: typeof formUpdater === 'function' ? formUpdater(state.form) : formUpdater,
    })),
  resetForm: () => set({ form: { title: '', type: 'MOVIE', status: 'UNWATCHED' } }),

  // Error state
  error: '',
  setError: (error) => set({ error }),
  clearError: () => set({ error: '' }),

  // Clear all state (for logout)
  clearState: () =>
    set({
      user: null,
      userData: null,
      items: [],
      showAuth: false,
      error: '',
      authForm: { username: '', password: '', mode: 'login' },
      activeTab: 'UNWATCHED',
      search: '',
      typeFilter: 'ALL',
      form: { title: '', type: 'MOVIE', status: 'UNWATCHED' },
    }),
}));
