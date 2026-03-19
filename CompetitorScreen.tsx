import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Search, Plus, BarChart3, Eye, Heart, 
  MessageCircle, Share2, TrendingUp, AlertCircle,
  ChevronRight, ExternalLink, MoreVertical
} from 'lucide-react';

const competitors = [
  {
    id: 1,
    name: 'Creator One',
    handle: '@creator_one',
    platform: 'TikTok',
    avatar: null,
    subscribers: '2.4M',
    avgViews: '450K',
    engagement: '8.5%',
    topVideos: [
      { title: 'Viral Hack #1', views: '12M', likes: '1.2M' },
      { title: 'Tutorial Fast', views: '8M', likes: '800K' },
    ]
  },
  {
    id: 2,
    name: 'Tech Reviewer',
    handle: '@tech_guru',
    platform: 'YouTube',
    avatar: null,
    subscribers: '1.8M',
    avgViews: '320K',
    engagement: '6.2%',
    topVideos: [
      { title: 'iPhone 15 Review', views: '5M', likes: '200K' },
      { title: 'Android vs iOS', views: '3M', likes: '150K' },
    ]
  },
];

const insights = [
  { type: 'opportunity', title: 'Posting Gap', desc: 'Competitors post less on weekends - opportunity for you!', icon: AlertCircle },
  { type: 'trend', title: 'Content Trend', desc: 'Tutorial content is up 45% this week', icon: TrendingUp },
  { type: 'warning', title: 'High Competition', desc: 'Tech niche is saturated, consider sub-niches', icon: AlertCircle },
];

export function CompetitorScreen() {
  const [newCompetitorUrl, setNewCompetitorUrl] = useState('');
  const [selectedCompetitor, setSelectedCompetitor] = useState<typeof competitors[0] | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Users className="w-8 h-8 text-cyan-400" />
            Competitor Analysis
          </h1>
          <p className="text-gray-400 mt-1">Track and analyze your competition</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Add competitor URL..."
              value={newCompetitorUrl}
              onChange={(e) => setNewCompetitorUrl(e.target.value)}
              className="input-field pl-10 w-72"
            />
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {/* Insights Banner */}
      <div className="grid md:grid-cols-3 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const colors = {
            opportunity: 'border-green-500/50 bg-green-500/10',
            trend: 'border-blue-500/50 bg-blue-500/10',
            warning: 'border-yellow-500/50 bg-yellow-500/10',
          };
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border ${colors[insight.type as keyof typeof colors]}`}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 text-white flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold">{insight.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{insight.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Competitors List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-white">Tracked Competitors</h2>

          <div className="space-y-4">
            {competitors.map((competitor) => (
              <motion.div
                key={competitor.id}
                layoutId={`competitor-${competitor.id}`}
                onClick={() => setSelectedCompetitor(competitor)}
                className="glass-panel p-5 cursor-pointer card-hover"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 
                                  flex items-center justify-center text-xl font-bold">
                      {competitor.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{competitor.name}</h3>
                      <p className="text-sm text-gray-400">{competitor.handle}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-dark-700 text-xs text-gray-400">
                        {competitor.platform}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-dark-700 rounded-lg">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-dark-700">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{competitor.subscribers}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{competitor.avgViews}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-400">{competitor.engagement}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Engagement</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Top Performing Videos</h4>
                  <div className="space-y-2">
                    {competitor.topVideos.map((video, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-dark-800/50">
                        <span className="text-sm text-white truncate flex-1">{video.title}</span>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {video.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {video.likes}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Analysis Sidebar */}
        <div className="space-y-6">
          {/* Comparison Chart */}
          <div className="glass-panel p-5">
            <h3 className="text-lg font-semibold text-white mb-4">Your vs Competitors</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Avg Views</span>
                  <span className="text-white">You: 380K</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full w-[75%] bg-cyan-500 rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Competitor avg: 450K</span>
                  <span>-15%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Engagement</span>
                  <span className="text-white">You: 9.2%</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-green-500 rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Competitor avg: 7.3%</span>
                  <span className="text-green-400">+26%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Post Frequency</span>
                  <span className="text-white">You: 5/week</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div className="h-full w-[83%] bg-purple-500 rounded-full" />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Competitor avg: 6/week</span>
                  <span>-17%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Gap Analysis */}
          <div className="glass-panel p-5">
            <h3 className="text-lg font-semibold text-white mb-4">Content Gaps</h3>
            <div className="space-y-2">
              {[
                { topic: 'Tutorials', competitor: 'High', you: 'Medium', opportunity: 'High' },
                { topic: 'Behind Scenes', competitor: 'Low', you: 'None', opportunity: 'High' },
                { topic: 'Reviews', competitor: 'High', you: 'High', opportunity: 'Low' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-dark-800/50 border border-dark-600">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{item.topic}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full
                      ${item.opportunity === 'High' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}
                    `}>
                      {item.opportunity} Opportunity
                    </span>
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>Competitors: {item.competitor}</span>
                    <span>You: {item.you}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div className="glass-panel p-5">
            <h3 className="text-lg font-semibold text-white mb-4">Recommended Actions</h3>
            <div className="space-y-2">
              {[
                'Post more tutorial content',
                'Add behind-the-scenes videos',
                'Increase posting frequency',
                'Engage with competitor audiences',
              ].map((action, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 hover:bg-dark-800 rounded-lg cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span className="text-sm text-gray-300">{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
