import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from '@/stores';
import { AppLayout } from '@/components/AppLayout';
import { AuthScreen } from '@/screens/AuthScreen';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { VideoEditorScreen } from '@/screens/VideoEditorScreen';
import { AutoEditorScreen } from '@/screens/AutoEditorScreen';
import { MediaLibraryScreen } from '@/screens/MediaLibraryScreen';
import { RenderJobsScreen } from '@/screens/RenderJobsScreen';
import { ScriptLabScreen } from '@/screens/ScriptLabScreen';
import { TrendDiscoveryScreen } from '@/screens/TrendDiscoveryScreen';
import { CompetitorScreen } from '@/screens/CompetitorScreen';
import { CalendarScreen } from '@/screens/CalendarScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { ViralScoreScreen } from '@/screens/ViralScoreScreen';
import { ThumbnailAIScreen } from '@/screens/ThumbnailAIScreen';
import { APIKeysScreen } from '@/screens/APIKeysScreen';

// Placeholder screens for remaining routes
function PlaceholderScreen({ title, icon: Icon }: { title: string; icon?: any }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="w-24 h-24 rounded-2xl bg-dark-800 flex items-center justify-center mb-4">
        {Icon ? <Icon className="w-12 h-12 text-cyan-400" /> : <span className="text-4xl">🚧</span>}
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-500">This feature is coming in the next update</p>
      <button className="mt-6 btn-secondary">Request Early Access</button>
    </div>
  );
}

function App() {
  const { isAuthenticated, user } = useUserStore();

  useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'camera' as PermissionName });
      navigator.permissions.query({ name: 'microphone' as PermissionName });
    }
  }, []);

  if (!isAuthenticated) {
    return <AuthScreen />;
  }

  return (
    <AppLayout user={user}>
      <Routes>
        <Route path="/" element={<DashboardScreen />} />

        {/* Video Lab */}
        <Route path="/video-editor" element={<VideoEditorScreen />} />
        <Route path="/auto-editor" element={<AutoEditorScreen />} />
        <Route path="/media-library" element={<MediaLibraryScreen />} />
        <Route path="/video-assembly" element={<PlaceholderScreen title="Video Assembly" />} />
        <Route path="/render-jobs" element={<RenderJobsScreen />} />
        <Route path="/scheduled" element={<PlaceholderScreen title="Zakazane Objave" />} />
        <Route path="/platforms" element={<PlaceholderScreen title="Platform Accounts" />} />
        <Route path="/storyboard" element={<PlaceholderScreen title="Storyboard" />} />
        <Route path="/viral-score" element={<ViralScoreScreen />} />
        <Route path="/thumbnail" element={<ThumbnailAIScreen />} />

        {/* Script & Content */}
        <Route path="/script-lab/:projectId?" element={<ScriptLabScreen />} />
        <Route path="/video-generator/:projectId?" element={<PlaceholderScreen title="Video Generator" />} />

        {/* Growth Lab */}
        <Route path="/trends" element={<TrendDiscoveryScreen />} />
        <Route path="/calendar" element={<CalendarScreen />} />
        <Route path="/full-calendar" element={<PlaceholderScreen title="Puni Kalendar" />} />
        <Route path="/channel" element={<PlaceholderScreen title="Channel Creator" />} />
        <Route path="/competitors" element={<CompetitorScreen />} />
        <Route path="/strategy" element={<PlaceholderScreen title="Viral Strategija" />} />

        {/* System */}
        <Route path="/api-keys" element={<APIKeysScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
