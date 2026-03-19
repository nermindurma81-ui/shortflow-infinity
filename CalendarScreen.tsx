import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Plus, Clock, Video, 
  Instagram, Youtube, Music2, MoreHorizontal, CalendarDays
} from 'lucide-react';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];

const scheduledPosts = [
  { id: 1, day: 15, title: 'Morning Routine', platform: 'tiktok', time: '09:00', status: 'scheduled' },
  { id: 2, day: 15, title: 'Tech Review', platform: 'youtube', time: '14:00', status: 'scheduled' },
  { id: 3, day: 18, title: 'Fitness Tips', platform: 'instagram', time: '18:00', status: 'draft' },
  { id: 4, day: 20, title: 'Cooking Hack', platform: 'tiktok', time: '12:00', status: 'scheduled' },
  { id: 5, day: 22, title: 'Q&A Session', platform: 'instagram', time: '20:00', status: 'scheduled' },
];

const platformIcons = {
  tiktok: Music2,
  instagram: Instagram,
  youtube: Youtube,
};

const platformColors = {
  tiktok: 'bg-black border-gray-700',
  instagram: 'bg-pink-500/20 border-pink-500 text-pink-400',
  youtube: 'bg-red-500/20 border-red-500 text-red-400',
};

export function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date().getDate();
  const isCurrentMonth = new Date().getMonth() === month;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1));

  const getPostsForDay = (day: number) => {
    return scheduledPosts.filter(post => post.day === day);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <CalendarDays className="w-8 h-8 text-purple-400" />
            Content Calendar
          </h1>
          <p className="text-gray-400 mt-1">Schedule and manage your content</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            New Post
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 glass-panel p-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              {months[month]} {year}
            </h2>
            <div className="flex items-center gap-2">
              <button 
                onClick={prevMonth}
                className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button 
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1.5 text-sm text-cyan-400 hover:bg-dark-800 rounded-lg transition-colors"
              >
                Today
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {days.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells */}
            {[...Array(firstDay)].map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days */}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const posts = getPostsForDay(day);
              const isToday = isCurrentMonth && day === today;
              const isSelected = selectedDate === day;

              return (
                <motion.button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`aspect-square p-2 rounded-xl border transition-all relative
                    ${isSelected 
                      ? 'bg-cyan-500/20 border-cyan-500' 
                      : isToday 
                        ? 'bg-dark-700 border-cyan-500/50' 
                        : 'bg-dark-800 border-dark-600 hover:border-dark-500'
                    }`}
                >
                  <span className={`text-sm font-medium 
                    ${isToday ? 'text-cyan-400' : 'text-white'}
                  `}>
                    {day}
                  </span>

                  {/* Post indicators */}
                  {posts.length > 0 && (
                    <div className="absolute bottom-1 left-1 right-1 flex justify-center gap-0.5">
                      {posts.slice(0, 3).map((post, idx) => (
                        <div 
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full 
                            ${post.platform === 'tiktok' ? 'bg-white' : ''}
                            ${post.platform === 'instagram' ? 'bg-pink-500' : ''}
                            ${post.platform === 'youtube' ? 'bg-red-500' : ''}
                          `}
                        />
                      ))}
                      {posts.length > 3 && (
                        <span className="text-[8px] text-gray-400">+</span>
                      )}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Sidebar - Selected Day Details */}
        <div className="space-y-6">
          <div className="glass-panel p-5">
            <h3 className="text-lg font-semibold text-white mb-4">
              {selectedDate ? `${months[month]} ${selectedDate}` : 'Select a date'}
            </h3>

            {selectedDate ? (
              <div className="space-y-3">
                {getPostsForDay(selectedDate).length > 0 ? (
                  getPostsForDay(selectedDate).map((post) => {
                    const Icon = platformIcons[post.platform as keyof typeof platformIcons];
                    return (
                      <div 
                        key={post.id}
                        className="p-3 rounded-xl bg-dark-800 border border-dark-600"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                              ${platformColors[post.platform as keyof typeof platformColors]}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-white font-medium text-sm">{post.title}</p>
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.time}
                              </p>
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full
                            ${post.status === 'scheduled' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}
                          `}>
                            {post.status}
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm">No posts scheduled</p>
                    <button className="mt-3 text-cyan-400 text-sm hover:underline">
                      + Add post
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Select a date to view details</p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="glass-panel p-5">
            <h3 className="text-lg font-semibold text-white mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Scheduled</span>
                <span className="text-white font-medium">12 posts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Published</span>
                <span className="text-white font-medium">8 posts</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Drafts</span>
                <span className="text-white font-medium">4 posts</span>
              </div>
              <div className="pt-3 border-t border-dark-700">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Best day</span>
                  <span className="text-cyan-400 font-medium">Tuesday</span>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Distribution */}
          <div className="glass-panel p-5">
            <h3 className="text-lg font-semibold text-white mb-4">Platforms</h3>
            <div className="space-y-3">
              {[
                { platform: 'TikTok', count: 5, color: 'bg-white' },
                { platform: 'Instagram', count: 4, color: 'bg-pink-500' },
                { platform: 'YouTube', count: 3, color: 'bg-red-500' },
              ].map((item) => (
                <div key={item.platform} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="text-gray-300 text-sm flex-1">{item.platform}</span>
                  <span className="text-white font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
