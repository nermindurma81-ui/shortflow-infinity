import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';
import { base44 } from '@/services/base44';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
  clearError: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const user = await base44.authenticate(email, password);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },

      register: async (email, password, username) => {
        set({ isLoading: true, error: null });
        try {
          const user = await base44.register(email, password, username);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        await base44.logout();
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data) => {
        set(state => ({
          user: state.user ? { ...state.user, ...data } : null
        }));
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'shortflow-user',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated })
    }
  )
);
