import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Video, TrendingUp, Users, Calendar, Zap,
  BarChart3, Clock, ArrowUpRight, Play, MoreVertical
} from 'lucide-react';
import { useProjectStore, useUserStore } from '@/stores';

const stats = [
  { label: 'Total Videos', value: '24', change: '+12%', icon: Video, color: 'blue' },
  { label: 'Viral Score Avg', value: '8.4', change: '+5%', icon: BarChart3, color: 'green' },
  { label: 'Scheduled', value: '8', change: '+2', icon: Calendar, color: 'purple' },
  { label: 'Views Generated', value: '1.2M', change: '+24%', icon: TrendingUp, color: 'orange' },
];

const quickActions = [
  { label: 'New Video', icon: Plus, color: 'bg-blue-500', href: '/video-editor' },
  { label: 'AI Script', icon: Zap, color: 'bg-yellow-500', href: '/script-lab' },
  { label: 'Trends', icon: TrendingUp, color: 'bg-green-500', href: '/trends' },
  { label: 'Calendar', icon: Calendar, color: 'bg-purple-500', href: '/calendar' },
];

const recentProjects = [
  { id: 1, title: 'Viral Cooking Hack #12', platform: 'TikTok', status: 'published', views: '452K', date: '2h ago' },
  { id: 2, title: 'Morning Routine 2024', platform: 'Instagram', status: 'processing', progress: 65, date: '4h ago' },
  { id: 3, title: 'Tech Review Short', platform: 'YouTube', status: 'draft', date: '1d ago' },
  { id: 4, title: 'Fitness Motivation', platform: 'TikTok', status: 'scheduled', date: 'Tomorrow 9:00' },
];

export function DashboardScreen() {
  const { projects, loadProjects, isLoading } = useProjectStore();
  const { user } = useUserStore();

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome back, <span className="gradient-text">{user?.username || 'Creator'}</span> 👋
          </h1>
          <p className="text-gray-400 mt-1">Here's what's happening with your content</p>
        </div>
        <button className="btn-primary flex items-center gap-2 self-start">
          <Plus className="w-5 h-5" />
          <span>Create New</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-4 sm:p-5 card-hover"
            >
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg bg-${stat.color}-500/20`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
                <span className="text-xs font-medium text-green-400 flex items-center gap-1">
                  {stat.change}
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.a
              key={action.label}
              href={action.href}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-center gap-2 p-4 glass-panel hover:bg-dark-700/50 
                       transition-colors cursor-pointer"
            >
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-white">{action.label}</span>
            </motion.a>
          );
        })}
      </div>

      {/* Recent Projects */}
      <div className="glass-panel overflow-hidden">
        <div className="p-4 border-b border-dark-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Projects</h2>
          <a href="/projects" className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            View all <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <div className="divide-y divide-dark-700">
          {recentProjects.map((project) => (
            <div 
              key={project.id}
              className="p-4 flex items-center gap-4 hover:bg-dark-800/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-dark-700 flex items-center justify-center flex-shrink-0">
                <Video className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{project.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="capitalize">{project.platform}</span>
                  <span>•</span>
                  <span>{project.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {project.status === 'processing' && (
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-dark-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">{project.progress}%</span>
                  </div>
                )}
                {project.views && (
                  <span className="text-sm font-medium text-white">{project.views}</span>
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                  ${project.status === 'published' ? 'bg-green-500/20 text-green-400' : ''}
                  ${project.status === 'processing' ? 'bg-blue-500/20 text-blue-400' : ''}
                  ${project.status === 'draft' ? 'bg-gray-500/20 text-gray-400' : ''}
                  ${project.status === 'scheduled' ? 'bg-purple-500/20 text-purple-400' : ''}
                `}>
                  {project.status}
                </span>
                <button className="p-2 hover:bg-dark-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Now Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Trending Hashtags
            </h2>
            <a href="/trends" className="text-sm text-cyan-400">Explore</a>
          </div>
          <div className="space-y-3">
            {['#viral', '#fyp', '#trending', '#shorts'].map((tag, i) => (
              <div key={tag} className="flex items-center justify-between">
                <span className="text-white font-medium">{tag}</span>
                <span className="text-sm text-gray-400">{1.2 + i * 0.3}M posts</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Upcoming Schedule
            </h2>
            <a href="/calendar" className="text-sm text-cyan-400">View all</a>
          </div>
          <div className="space-y-3">
            {[
              { time: '09:00', title: 'Morning Routine Post', platform: 'TikTok' },
              { time: '14:00', title: 'Tech Review', platform: 'YouTube' },
              { time: '18:00', title: 'Fitness Tips', platform: 'Instagram' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-gray-400 w-12">{item.time}</span>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.platform}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
