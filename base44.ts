import { Preferences } from '@capacitor/preferences';
import type { 
  User, VideoProject, Script, VoiceOver, 
  TrendData, Competitor, ViralMetrics, AIModel 
} from '@/types';

const BASE44_API_URL = import.meta.env.VITE_BASE44_API_URL || 'https://api.base44.com';
const BASE44_API_KEY = import.meta.env.VITE_BASE44_API_KEY || '';

class Base44Service {
  private apiKey: string;
  private baseUrl: string;
  private userId: string | null = null;

  constructor() {
    this.apiKey = BASE44_API_KEY;
    this.baseUrl = BASE44_API_URL;
    this.loadStoredAuth();
  }

  private async loadStoredAuth() {
    const { value } = await Preferences.get({ key: 'user_id' });
    if (value) this.userId = value;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'X-Client-Version': '1.0.0',
      'X-Platform': 'android'
    };

    if (this.userId) {
      headers['X-User-ID'] = this.userId;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: { ...headers, ...options.headers }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Base44 API Error:', error);
      throw error;
    }
  }

  // Authentication
  async authenticate(email: string, password: string): Promise<User> {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    this.userId = data.user.id;
    await Preferences.set({ key: 'user_id', value: data.user.id });
    await Preferences.set({ key: 'auth_token', value: data.token });

    return data.user;
  }

  async register(email: string, password: string, username: string): Promise<User> {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, username })
    });

    this.userId = data.user.id;
    await Preferences.set({ key: 'user_id', value: data.user.id });

    return data.user;
  }

  async logout() {
    await Preferences.remove({ key: 'user_id' });
    await Preferences.remove({ key: 'auth_token' });
    this.userId = null;
  }

  // Project Management (Base44 Entities)
  async createProject(project: Partial<VideoProject>): Promise<VideoProject> {
    return this.request('/entities/projects', {
      method: 'POST',
      body: JSON.stringify(project)
    });
  }

  async getProjects(filter?: { status?: string; platform?: string }): Promise<VideoProject[]> {
    const query = filter ? `?${new URLSearchParams(filter).toString()}` : '';
    return this.request(`/entities/projects${query}`);
  }

  async updateProject(id: string, updates: Partial<VideoProject>): Promise<VideoProject> {
    return this.request(`/entities/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  async deleteProject(id: string): Promise<void> {
    return this.request(`/entities/projects/${id}`, { method: 'DELETE' });
  }

  // AI Generation via Base44 Integrations
  async generateScript(params: {
    topic: string;
    platform: string;
    duration: number;
    tone: string;
    model?: AIModel;
  }): Promise<Script> {
    return this.request('/integrations/llm/generate-script', {
      method: 'POST',
      body: JSON.stringify({
        ...params,
        system_prompt: `You are an expert viral content scriptwriter for ${params.platform}. 
        Create engaging hooks, maintain high retention, and include strong CTAs.
        Return JSON with: hook, content, cta, wordCount, estimatedDuration`
      })
    });
  }

  async generateVoiceOver(text: string, voiceId: string, provider: string = 'kokoro'): Promise<VoiceOver> {
    return this.request('/integrations/tts/synthesize', {
      method: 'POST',
      body: JSON.stringify({ text, voice_id: voiceId, provider })
    });
  }

  async generateImage(prompt: string, style?: string): Promise<string> {
    const result = await this.request('/integrations/image/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt, style, size: '1080x1920' })
    });
    return result.url;
  }

  async analyzeViralPotential(projectId: string): Promise<ViralMetrics> {
    return this.request(`/analytics/viral-score/${projectId}`);
  }

  // Trend Discovery
  async getTrends(platform: string, category?: string): Promise<TrendData[]> {
    const query = category ? `?category=${category}` : '';
    return this.request(`/trends/${platform}${query}`);
  }

  async discoverNiches(keyword: string): Promise<{ niche: string; competition: number; potential: number }[]> {
    return this.request('/analytics/niches', {
      method: 'POST',
      body: JSON.stringify({ keyword })
    });
  }

  // Competitor Analysis
  async analyzeCompetitor(channelUrl: string): Promise<Competitor> {
    return this.request('/analytics/competitor', {
      method: 'POST',
      body: JSON.stringify({ channel_url: channelUrl })
    });
  }

  async getCompetitors(): Promise<Competitor[]> {
    return this.request('/entities/competitors');
  }

  // Content Calendar
  async getCalendar(month: number, year: number) {
    return this.request(`/calendar?month=${month}&year=${year}`);
  }

  async scheduleContent(date: string, projectId: string, platforms: string[]) {
    return this.request('/calendar/schedule', {
      method: 'POST',
      body: JSON.stringify({ date, project_id: projectId, platforms })
    });
  }

  // Bulk Operations
  async bulkGenerate(scripts: string[], template: string): Promise<VideoProject[]> {
    return this.request('/bulk/generate', {
      method: 'POST',
      body: JSON.stringify({ scripts, template })
    });
  }

  // Real-time subscriptions (WebSocket simulation via polling for mobile)
  subscribeToProjectUpdates(projectId: string, callback: (data: any) => void) {
    const interval = setInterval(async () => {
      try {
        const project = await this.request(`/entities/projects/${projectId}`);
        callback(project);
      } catch (error) {
        console.error('Subscription error:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }
}

export const base44 = new Base44Service();
export default base44;
