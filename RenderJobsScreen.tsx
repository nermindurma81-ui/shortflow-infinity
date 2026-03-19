import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Play, Pause, RotateCcw, CheckCircle2, 
  XCircle, AlertCircle, Download, MoreVertical,
  Film, TrendingUp, Calendar
} from 'lucide-react';

const jobs = [
  { 
    id: 1, 
    title: 'Morning Routine 2024', 
    status: 'rendering', 
    progress: 65, 
    platform: 'TikTok',
    estimatedTime: '2 min remaining',
    thumbnail: null
  },
  { 
    id: 2, 
    title: 'Tech Review Short', 
    status: 'completed', 
    progress: 100, 
    platform: 'YouTube',
    completedAt: '5 min ago',
    thumbnail: null
  },
  { 
    id: 3, 
    title: 'Cooking Hack #12', 
    status: 'failed', 
    progress: 45, 
    platform: 'Instagram',
    error: 'FFmpeg processing error',
    thumbnail: null
  },
  { 
    id: 4, 
    title: 'Fitness Motivation', 
    status: 'queued', 
    progress: 0, 
    platform: 'TikTok',
    position: 2,
    thumbnail: null
  },
  { 
    id: 5, 
    title: 'Q&A Session', 
    status: 'completed', 
    progress: 100, 
    platform: 'Instagram',
    completedAt: '1 hour ago',
    thumbnail: null
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'rendering': return Play;
    case 'completed': return CheckCircle2;
    case 'failed': return XCircle;
    case 'queued': return Clock;
    default: return AlertCircle;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'rendering': return 'text-blue-400 bg-blue-500/20';
    case 'completed': return 'text-green-400 bg-green-500/20';
    case 'failed': return 'text-red-400 bg-red-500/20';
    case 'queued': return 'text-yellow-400 bg-yellow-500/20';
    default: return 'text-gray-400 bg-gray-500/20';
  }
};

export function RenderJobsScreen() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'failed'>('all');

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    if (filter === 'active') return job.status === 'rendering' || job.status === 'queued';
    return job.status === filter;
  });

  const activeJobs = jobs.filter(j => j.status === 'rendering' || j.status === 'queued').length;
  const completedToday = jobs.filter(j => j.status === 'completed').length;
  const failedJobs = jobs.filter(j => j.status === 'failed').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Clock className="w-8 h-8 text-orange-400" />
            Render Jobs
          </h1>
          <p className="text-gray-400 mt-1">Monitor and manage video rendering</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Play className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{activeJobs}</p>
              <p className="text-sm text-gray-500">Active Jobs</p>
            </div>
          </div>
        </div>
        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{completedToday}</p>
              <p className="text-sm text-gray-500">Completed Today</p>
            </div>
          </div>
        </div>
        <div className="glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{failedJobs}</p>
              <p className="text-sm text-gray-500">Failed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['all', 'active', 'completed', 'failed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors
              ${filter === f 
                ? 'bg-cyan-500 text-white' 
                : 'bg-dark-800 text-gray-400 hover:bg-dark-700'
              }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="space-y-3">
        {filteredJobs.map((job, index) => {
          const StatusIcon = getStatusIcon(job.status);
          const statusColor = getStatusColor(job.status);

          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-panel p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-dark-800 flex items-center justify-center flex-shrink-0">
                  <Film className="w-8 h-8 text-gray-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="text-white font-semibold truncate">{job.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span>{job.platform}</span>
                    {job.estimatedTime && <span>• {job.estimatedTime}</span>}
                    {job.completedAt && <span>• Completed {job.completedAt}</span>}
                    {job.position && <span>• Position {job.position} in queue</span>}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {job.status === 'rendering' && (
                    <button className="p-2 hover:bg-dark-800 rounded-lg">
                      <Pause className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                  {job.status === 'failed' && (
                    <button className="p-2 hover:bg-dark-800 rounded-lg">
                      <RotateCcw className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                  {job.status === 'completed' && (
                    <button className="btn-primary text-sm py-2 px-4">
                      <Download className="w-4 h-4 inline mr-1" />
                      Download
                    </button>
                  )}
                  <button className="p-2 hover:bg-dark-800 rounded-lg">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              {job.status === 'rendering' && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Rendering...</span>
                    <span className="text-white">{job.progress}%</span>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${job.progress}%` }}
                      className="h-full bg-cyan-500 rounded-full"
                    />
                  </div>
                </div>
              )}

              {job.error && (
                <div className="mt-3 p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  Error: {job.error}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
