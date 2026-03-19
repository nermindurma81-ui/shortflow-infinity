import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Search, Filter, ArrowUpRight, 
  Hash, Music, Video, Clock, Globe
} from 'lucide-react';
import { useTrendsStore } from '@/stores';

const platforms = [
  { id: 'tiktok', label: 'TikTok', color: 'bg-black', icon: Video },
  { id: 'instagram', label: 'Instagram', color: 'bg-pink-500', icon: Video },
  { id: 'youtube', label: 'YouTube', color: 'bg-red-600', icon: Video },
];

const trends = [
  { 
    id: 1, 
    hashtag: '#viral', 
    volume: '2.4M', 
    growth: '+124%', 
    category: 'General',
    related: ['#fyp', '#foryou', '#trending'],
    platform: 'tiktok'
  },
  { 
    id: 2, 
    hashtag: '#cookinghacks', 
    volume: '856K', 
    growth: '+89%', 
    category: 'Food',
    related: ['#kitchen', '#recipe', '#food'],
    platform: 'tiktok'
  },
  { 
    id: 3, 
    hashtag: '#morningroutine', 
    volume: '1.2M', 
    growth: '+67%', 
    category: 'Lifestyle',
    related: ['#productive', '#selfcare', '#routine'],
    platform: 'instagram'
  },
  { 
    id: 4, 
    hashtag: '#techreview', 
    volume: '543K', 
    growth: '+45%', 
    category: 'Technology',
    related: ['#unboxing', '#gadgets', '#review'],
    platform: 'youtube'
  },
  { 
    id: 5, 
    hashtag: '#fitnessmotivation', 
    volume: '3.1M', 
    growth: '+34%', 
    category: 'Fitness',
    related: ['#gym', '#workout', '#fitness'],
    platform: 'instagram'
  },
];

const sounds = [
  { id: 1, title: 'Original Sound - Creator', uses: '2.4M', trending: true },
  { id: 2, title: 'Viral Beat 2024', uses: '1.8M', trending: true },
  { id: 3, title: 'Popular Remix', uses: '956K', trending: false },
];

export function TrendDiscoveryScreen() {
  const [activePlatform, setActivePlatform] = useState('tiktok');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTrends = trends.filter(t => 
    t.platform === activePlatform &&
    (selectedCategory === 'all' || t.category.toLowerCase() === selectedCategory) &&
    (searchQuery === '' || t.hashtag.includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-green-400" />
            Trend Discovery
          </h1>
          <p className="text-gray-400 mt-1">Discover what's trending across platforms</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search trends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-64"
            />
          </div>
          <button className="btn-secondary">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <button
              key={platform.id}
              onClick={() => setActivePlatform(platform.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all
                ${activePlatform === platform.id 
                  ? 'bg-white text-black' 
                  : 'bg-dark-800 text-gray-400 hover:bg-dark-700'
                }`}
            >
              <div className={`w-2 h-2 rounded-full ${platform.color}`} />
              {platform.label}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Trends List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Trending Hashtags</h2>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-dark-800 border border-dark-600 rounded-lg px-3 py-1.5 text-sm text-white"
            >
              <option value="all">All Categories</option>
              <option value="general">General</option>
              <option value="food">Food</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="technology">Technology</option>
              <option value="fitness">Fitness</option>
            </select>
          </div>

          <div className="space-y-3">
            {filteredTrends.map((trend, index) => (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-4 card-hover cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center">
                      <Hash className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{trend.hashtag}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span>{trend.category}</span>
                        <span>•</span>
                        <span className="text-green-400 flex items-center gap-1">
                          <ArrowUpRight className="w-3 h-3" />
                          {trend.growth}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{trend.volume}</p>
                    <p className="text-xs text-gray-500">posts today</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-500">Related:</span>
                  {trend.related.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 rounded-full bg-dark-700 text-xs text-gray-300 
                               hover:bg-dark-600 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar - Sounds & Stats */}
        <div className="space-y-6">
          {/* Trending Sounds */}
          <div className="glass-panel p-5">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Music className="w-5 h-5 text-pink-400" />
              Trending Sounds
            </h3>
            <div className="space-y-3">
              {sounds.map((sound) => (
                <div 
                  key={sound.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-dark-800/50 
                           hover:bg-dark-800 transition-colors group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center">
                    <Music className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{sound.title}</p>
                    <p className="text-xs text-gray-500">{sound.uses} uses</p>
                  </div>
                  {sound.trending && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs">
                      Hot
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Niche Finder */}
          <div className="glass-panel p-5">
            <h3 className="text-lg font-semibold text-white mb-4">Niche Finder</h3>
            <div className="space-y-3">
              <input 
                type="text"
                placeholder="Enter keyword..."
                className="input-field"
              />
              <button className="w-full btn-primary">
                <Search className="w-4 h-4 inline mr-2" />
                Analyze Niche
              </button>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-dark-800/50 border border-dark-600">
              <p className="text-sm text-gray-400">Enter a keyword to discover:</p>
              <ul className="mt-2 space-y-1 text-xs text-gray-500">
                <li>• Competition level</li>
                <li>• Audience size</li>
                <li>• Growth potential</li>
                <li>• Related hashtags</li>
              </ul>
            </div>
          </div>

          {/* Global Stats */}
          <div className="glass-panel p-5">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              Global Trends
            </h3>
            <div className="space-y-3">
              {[
                { region: 'US', trend: '#usa', posts: '5.2M' },
                { region: 'UK', trend: '#uk', posts: '2.1M' },
                { region: 'Global', trend: '#worldwide', posts: '12.4M' },
              ].map((item) => (
                <div key={item.region} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">{item.region}</span>
                    <span className="text-sm text-cyan-400">{item.trend}</span>
                  </div>
                  <span className="text-sm text-gray-500">{item.posts}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
