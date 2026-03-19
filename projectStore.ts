import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { VideoProject, Script, VoiceOver, ViralMetrics } from '@/types';
import { base44 } from '@/services/base44';

interface ProjectState {
  projects: VideoProject[];
  currentProject: VideoProject | null;
  scripts: Record<string, Script>;
  voiceOvers: Record<string, VoiceOver>;
  viralMetrics: Record<string, ViralMetrics>;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadProjects: () => Promise<void>;
  createProject: (data: Partial<VideoProject>) => Promise<VideoProject>;
  setCurrentProject: (project: VideoProject | null) => void;
  updateProject: (id: string, data: Partial<VideoProject>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  generateScript: (projectId: string, params: any) => Promise<Script>;
  analyzeViralScore: (projectId: string) => Promise<ViralMetrics>;
  clearError: () => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProject: null,
      scripts: {},
      voiceOvers: {},
      viralMetrics: {},
      isLoading: false,
      error: null,

      loadProjects: async () => {
        set({ isLoading: true, error: null });
        try {
          const projects = await base44.getProjects();
          set({ projects, isLoading: false });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      createProject: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const project = await base44.createProject({
            ...data,
            status: 'draft',
            createdAt: new Date(),
            updatedAt: new Date()
          });
          set(state => ({ 
            projects: [project, ...state.projects],
            isLoading: false 
          }));
          return project;
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },

      setCurrentProject: (project) => set({ currentProject: project }),

      updateProject: async (id, data) => {
        try {
          const updated = await base44.updateProject(id, data);
          set(state => ({
            projects: state.projects.map(p => p.id === id ? updated : p),
            currentProject: state.currentProject?.id === id ? updated : state.currentProject
          }));
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },

      deleteProject: async (id) => {
        try {
          await base44.deleteProject(id);
          set(state => ({
            projects: state.projects.filter(p => p.id !== id),
            currentProject: state.currentProject?.id === id ? null : state.currentProject
          }));
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },

      generateScript: async (projectId, params) => {
        set({ isLoading: true });
        try {
          const script = await base44.generateScript(params);
          set(state => ({
            scripts: { ...state.scripts, [projectId]: script },
            isLoading: false
          }));
          return script;
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
          throw error;
        }
      },

      analyzeViralScore: async (projectId) => {
        try {
          const metrics = await base44.analyzeViralPotential(projectId);
          set(state => ({
            viralMetrics: { ...state.viralMetrics, [projectId]: metrics }
          }));
          return metrics;
        } catch (error) {
          set({ error: (error as Error).message });
          throw error;
        }
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'shortflow-projects',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        projects: state.projects,
        scripts: state.scripts 
      })
    }
  )
);
