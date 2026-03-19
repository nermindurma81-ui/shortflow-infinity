// Base44 Entity Types
export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  subscription: 'free' | 'pro' | 'enterprise';
  credits: number;
  createdAt: Date;
  lastLogin: Date;
}

export interface VideoProject {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: 'draft' | 'processing' | 'completed' | 'failed';
  platform: 'tiktok' | 'instagram' | 'youtube' | 'all';
  duration: number;
  tags: string[];
  thumbnailUrl?: string;
  videoUrl?: string;
  viralScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Script {
  id: string;
  projectId: string;
  content: string;
  hook: string;
  cta: string;
  wordCount: number;
  estimatedDuration: number;
  tone: 'energetic' | 'calm' | 'funny' | 'professional' | 'emotional';
  language: string;
}

export interface VoiceOver {
  id: string;
  projectId: string;
  provider: 'kokoro' | 'elevenlabs' | 'groq';
  voiceId: string;
  audioUrl: string;
  duration: number;
  settings: {
    speed: number;
    pitch: number;
    stability: number;
  };
}

export interface Caption {
  id: string;
  projectId: string;
  style: 'minimal' | 'bold' | 'typewriter' | 'gradient';
  fontFamily: string;
  fontSize: number;
  color: string;
  backgroundColor: string;
  animation: 'pop' | 'slide' | 'fade' | 'bounce';
  subtitles: SubtitleSegment[];
}

export interface SubtitleSegment {
  startTime: number;
  endTime: number;
  text: string;
  words: WordSegment[];
}

export interface WordSegment {
  word: string;
  startTime: number;
  endTime: number;
  confidence: number;
}

export interface TrendData {
  id: string;
  platform: string;
  hashtag: string;
  volume: number;
  growth: number;
  category: string;
  relatedHashtags: string[];
  timestamp: Date;
}

export interface Competitor {
  id: string;
  channelName: string;
  platform: string;
  subscriberCount: number;
  avgViews: number;
  engagementRate: number;
  topVideos: CompetitorVideo[];
  analyzedAt: Date;
}

export interface CompetitorVideo {
  id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  thumbnailUrl: string;
  publishedAt: Date;
  viralScore: number;
}

export interface ContentCalendar {
  id: string;
  userId: string;
  month: number;
  year: number;
  items: CalendarItem[];
}

export interface CalendarItem {
  id: string;
  date: Date;
  projectId?: string;
  type: 'video' | 'idea' | 'reminder';
  status: 'scheduled' | 'published' | 'draft';
  platform: string[];
  time?: string;
}

export interface ViralMetrics {
  hookStrength: number;
  retentionPrediction: number;
  shareability: number;
  trendAlignment: number;
  overallScore: number;
  suggestions: string[];
}

export type AIModel = 'groq-llama' | 'claude' | 'gpt4' | 'custom';
export type VideoResolution = '1080x1920' | '720x1280' | '1080x1080';
