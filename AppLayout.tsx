import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Home, Sparkles, Video, TrendingUp, Users, 
  Calendar, Settings, Zap, BarChart3, Palette, Film,
  Scissors, Library, Layers, Clock, Send, Link2, 
  Layout, Image, Key, ChevronRight
} from 'lucide-react';
import type { User } from '@/types';

interface AppLayoutProps {
  children: React.ReactNode;
  user: User | null;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  section?: string;
}

const navigation: NavItem[] = [
  // Video Lab
  { id: 'video-editor', label: 'Video Editor', icon: Scissors, href: '/video-editor', section: 'VIDEO LAB' },
  { id: 'auto-editor', label: 'Auto Editor (AI)', icon: Zap, href: '/auto-editor', section: 'VIDEO LAB' },
  { id: 'media-library', label: 'Media Library', icon: Library, href: '/media-library', section: 'VIDEO LAB' },
  { id: 'video-assembly', label: 'Video Assembly', icon: Layers, href: '/video-assembly', section: 'VIDEO LAB' },
  { id: 'render-jobs', label: 'Render Jobs', icon: Clock, href: '/render-jobs', section: 'VIDEO LAB' },
  { id: 'scheduled', label: 'Zakazane Objave', icon: Send, href: '/scheduled', section: 'VIDEO LAB' },
  { id: 'platforms', label: 'Platform Accounts', icon: Link2, href: '/platforms', section: 'VIDEO LAB' },
  { id: 'storyboard', label: 'Storyboard', icon: Layout, href: '/storyboard', section: 'VIDEO LAB' },
  { id: 'viral-score', label: 'Viral Score', icon: BarChart3, href: '/viral-score', section: 'VIDEO LAB' },
  { id: 'thumbnail', label: 'Thumbnail AI', icon: Image, href: '/thumbnail', section: 'VIDEO LAB' },

  // Growth Lab
  { id: 'trends', label: 'Trend Discovery', icon: TrendingUp, href: '/trends', section: 'GROWTH LAB' },
  { id: 'calendar', label: 'Content Kalendar', icon: Calendar, href: '/calendar', section: 'GROWTH LAB' },
  { id: 'full-calendar', label: 'Puni Kalendar', icon: Calendar, href: '/full-calendar', section: 'GROWTH LAB' },
  { id: 'channel', label: 'Channel Creator', icon: Video, href: '/channel', section: 'GROWTH LAB' },
  { id: 'competitors', label: 'Competitor Analiza', icon: Users, href: '/competitors', section: 'GROWTH LAB' },
  { id: 'strategy', label: 'Viral Strategija', icon: Sparkles, href: '/strategy', section: 'GROWTH LAB' },

  // System
  { id: 'api-keys', label: 'API Ključevi', icon: Key, href: '/api-keys', section: 'SYSTEM' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings', section: 'SYSTEM' },
];

const groupedNav = navigation.reduce((acc, item) => {
  const section = item.section || 'OTHER';
  if (!acc[section]) acc[section] = [];
  acc[section].push(item);
  return acc;
}, {} as Record<string, NavItem[]>);

export function AppLayout({ children, user }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <motion.aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[300px] bg-dark-900 border-r border-dark-700 
                   transform transition-transform duration-300 lg:transform-none safe-area-top safe-area-bottom
                   ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-dark-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 
                          flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-white">Short</span>
              <span className="text-cyan-400">AI</span>
            </span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-dark-800 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="overflow-y-auto h-[calc(100vh-64px)] py-4">
          {Object.entries(groupedNav).map(([section, items]) => (
            <div key={section} className="mb-6">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {section}
              </h3>
              <nav className="space-y-1 px-2">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        setActiveItem(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                                transition-all duration-200 group touch-target
                                ${isActive 
                                  ? 'bg-dark-700 text-white border border-dark-600' 
                                  : 'text-gray-400 hover:text-white hover:bg-dark-800'
                                }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`} />
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400"
                        />
                      )}
                    </a>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Chat to Edit Button - Floating */}
        <div className="absolute bottom-20 left-4 right-4 lg:hidden">
          <button className="w-full bg-black border border-white/20 text-white py-3 px-4 rounded-full 
                           font-semibold flex items-center justify-center gap-2 shadow-lg">
            <span>Chat to Edit</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-dark-900/95 backdrop-blur-md border-b border-dark-700 
                         flex items-center justify-between px-4 sticky top-0 z-30 safe-area-top">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-dark-800 rounded-lg"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-dark-800 rounded-lg p-1">
              <button className="px-4 py-1.5 rounded-md bg-dark-700 text-white text-sm font-medium">
                Dashboard
              </button>
              <button className="px-4 py-1.5 rounded-md text-gray-400 text-sm font-medium hover:text-white">
                Preview
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-dark-800 rounded-lg relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 
                            flex items-center justify-center">
                <span className="text-white text-xs font-bold">💎</span>
              </div>
            </button>
            <button className="w-10 h-10 bg-dark-800 hover:bg-dark-700 rounded-xl flex items-center 
                           justify-center border border-dark-600">
              <Sparkles className="w-5 h-5 text-white" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 safe-area-bottom">
          {children}
        </main>
      </div>
    </div>
  );
}
