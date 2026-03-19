import { create } from 'zustand';
import type { TrendData, Competitor } from '@/types';
import { base44 } from '@/services/base44';

interface TrendsState {
  trends: TrendData[];
  competitors: Competitor[];
  selectedNiche: string | null;
  isLoading: boolean;
  error: string | null;

  loadTrends: (platform: string) => Promise<void>;
  loadCompetitors: () => Promise<void>;
  analyzeCompetitor: (url: string) => Promise<void>;
  discoverNiches: (keyword: string) => Promise<any[]>;
  setSelectedNiche: (niche: string | null) => void;
}

export const useTrendsStore = create<TrendsState>((set, get) => ({
  trends: [],
  competitors: [],
  selectedNiche: null,
  isLoading: false,
  error: null,

  loadTrends: async (platform) => {
    set({ isLoading: true });
    try {
      const trends = await base44.getTrends(platform);
      set({ trends, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  loadCompetitors: async () => {
    set({ isLoading: true });
    try {
      const competitors = await base44.getCompetitors();
      set({ competitors, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  analyzeCompetitor: async (url) => {
    set({ isLoading: true });
    try {
      const competitor = await base44.analyzeCompetitor(url);
      set(state => ({
        competitors: [...state.competitors, competitor],
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  discoverNiches: async (keyword) => {
    set({ isLoading: true });
    try {
      const niches = await base44.discoverNiches(keyword);
      set({ isLoading: false });
      return niches;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      return [];
    }
  },

  setSelectedNiche: (niche) => set({ selectedNiche: niche })
}));
