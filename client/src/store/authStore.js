import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/axiosInstance.js';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,

      setToken: (token) => set({ accessToken: token, isAuthenticated: !!token }),
      setUser: (user) => set({ user }),
      
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/login', { email, password });
          const { accessToken, user } = response.data;
          set({ accessToken, user, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, message: error.response?.data?.message || 'Login failed' };
        }
      },

      loginWithGoogle: async (credential, role) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/google', { credential, role });
          const { accessToken, user } = response.data;
          set({ accessToken, user, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { success: false, message: error.response?.data?.message || 'Google Login failed' };
        }
      },


      logout: async () => {
        try {
          await api.post('/auth/logout');
        } catch (error) {
          console.error('Logout failed on server', error);
        } finally {
          set({ user: null, accessToken: null, isAuthenticated: false });
          window.location.href = '/login';
        }
      },

      loadUser: async () => {
        const { accessToken } = get();
        if (!accessToken) {
          set({ isLoading: false });
          return;
        }

        try {
          const response = await api.get('/auth/me');
          set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          console.error('Failed to load user', error);
          set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
        }
      },

      completeUserProfile: (isComplete) => {
        set((state) => ({ user: { ...state.user, isProfileComplete: isComplete } }));
      }
    }),
    {
      name: 'auth-storage', // unique name
      partialize: (state) => ({ accessToken: state.accessToken, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export default useAuthStore;
