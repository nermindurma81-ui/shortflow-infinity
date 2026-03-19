import axios from 'axios';
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

  private get headers() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'X-Client-Version': '1.0.0',
      'X-Platform': 'android'
    };
    if (this.userId) {
      headers['X-User-ID'] = this.userId;
    }
    return headers;
  }

  // Authentication
  async authenticate(email: string, password: string): Promise<User> {
    const { data } = await axios.post(`${this.baseUrl}/auth/login`, 
      { email, password },
      { headers: this.headers }
    );

    this.userId = data.user.id;
    await Preferences.set({ key: 'user_id', value: data.user.id });
    await Preferences.set({ key: 'auth_token', value: data.token });

    return data.user;
  }

  async register(email: string, password: string, username: string): Promise<User> {
    const { data } = await axios.post(`${this.baseUrl}/auth/register`,
      { email, password, username },
      { headers: this.headers }
    );

    this.userId = data.user.id;
    await Preferences.set({ key: 'user_id', value: data.user.id });

    return data.user;
  }

  async logout() {
    await Preferences.remove({ key: 'user_id' });
    await Preferences.remove({ key: 'auth_token' });
    this.userId = null;
  }

  // Project Management
  async createProject(project: Partial<VideoProject>): Promise<VideoProject> {
    const { data } = await axios.post(`${this.baseUrl}/entities/projects`,
      project,
      { headers: this.headers }
    );
    return data;
  }

  async getProjects(filter?: { status?: string; platform?: string }): Promise<VideoProject[]> {
    const query = filter ? `?${new URLSearchParams(filter).toString()}` : '';
    const { data } = await axios.get(`${this.baseUrl}/entities/projects${query}`,
      { headers: this.headers }
    );
    return data;
  }

  async updateProject(id: string, updates: Partial<VideoProject>): Promise<VideoProject> {
    const { data } = await axios.put(`${this.baseUrl}/entities/projects/${id}`,
      updates,
      { headers: this.headers }
    );
    return data;
  }

  async deleteProject(id: string): Promise<void> {
    await axios.delete(`${this.baseUrl}/entities/projects/${id}`,
      { headers: this.headers }
    );
  }

  // AI Generation
  async generateScript(params: {
    topic: string;
    platform: string;
    duration: number;
    tone: string;
    model?: AIModel;
  }): Promise<Script> {
    const { data } = await axios.post(`${this.baseUrl}/integrations/llm/generate-script`,
      {
        ...params,
        system_prompt: `You are an expert viral content scriptwriter for ${params.platform}. 
        Create engaging hooks, maintain high retention, and include strong CTAs.
        Return JSON with: hook, content, cta, wordCount, estimatedDuration`
      },
      { headers: this.headers }
    );
    return data;
  }

  async generateVoiceOver(text: string, voiceId: string, provider: string = 'kokoro'): Promise<VoiceOver> {
    const { data } = await axios.post(`${this.baseUrl}/integrations/tts/synthesize`,
      { text, voice_id: voiceId, provider },
      { headers: this.headers }
    );
    return data;
  }

  async generateImage(prompt: string, style?: string): Promise<string> {
    const { data } = await axios.post(`${this.baseUrl}/integrations/image/generate`,
      { prompt, style, size: '1080x1920' },
      { headers: this.headers }
    );
    return data.url;
  }

  async analyzeViralPotential(projectId: string): Promise<ViralMetrics> {
    const { data } = await axios.get(`${this.baseUrl}/analytics/viral-score/${projectId}`,
      { headers: this.headers }
    );
    return data;
  }

  // Trend Discovery
  async getTrends(platform: string, category?: string): Promise<TrendData[]> {
    const query = category ? `?category=${category}` : '';
    const { data } = await axios.get(`${this.baseUrl}/trends/${platform}${query}`,
      { headers: this.headers }
    );
    return data;
  }

  async discoverNiches(keyword: string): Promise<{ niche: string; competition: number; potential: number }[]> {
    const { data } = await axios.post(`${this.baseUrl}/analytics/niches`,
      { keyword },
      { headers: this.headers }
    );
    return data;
  }

  // Competitor Analysis
  async analyzeCompetitor(channelUrl: string): Promise<Competitor> {
    const { data } = await axios.post(`${this.baseUrl}/analytics/competitor`,
      { channel_url: channelUrl },
      { headers: this.headers }
    );
    return data;
  }

  async getCompetitors(): Promise<Competitor[]> {
    const { data } = await axios.get(`${this.baseUrl}/entities/competitors`,
      { headers: this.headers }
    );
    return data;
  }

  // Content Calendar
  async getCalendar(month: number, year: number) {
    const { data } = await axios.get(`${this.baseUrl}/calendar?month=${month}&year=${year}`,
      { headers: this.headers }
    );
    return data;
  }

  async scheduleContent(date: string, projectId: string, platforms: string[]) {
    const { data } = await axios.post(`${this.baseUrl}/calendar/schedule`,
      { date, project_id: projectId, platforms },
      { headers: this.headers }
    );
    return data;
  }

  // Bulk Operations
  async bulkGenerate(scripts: string[], template: string): Promise<VideoProject[]> {
    const { data } = await axios.post(`${this.baseUrl}/bulk/generate`,
      { scripts, template },
      { headers: this.headers }
    );
    return data;
  }
}

export const base44 = new Base44Service();
export default base44;
