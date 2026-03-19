import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Image, Music, Search, Filter, Grid, List, 
  MoreVertical, Play, Trash2, Download, Folder, Upload
} from 'lucide-react';

const mediaItems = [
  { id: 1, name: 'Intro_Clip_01.mp4', type: 'video', size: '24MB', date: '2024-01-15', duration: '0:15' },
  { id: 2, name: 'Cooking_Hack_Final.mp4', type: 'video', size: '156MB', date: '2024-01-14', duration: '0:45' },
  { id: 3, name: 'Thumbnail_Template_1.png', type: 'image', size: '2.4MB', date: '2024-01-13' },
  { id: 4, name: 'Background_Music_1.mp3', type: 'audio', size: '8MB', date: '2024-01-12', duration: '2:30' },
  { id: 5, name: 'Outro_Animation.mp4', type: 'video', size: '45MB', date: '2024-01-11', duration: '0:08' },
  { id: 6, name: 'Logo_Animated.mp4', type: 'video', size: '12MB', date: '2024-01-10', duration: '0:03' },
];

const folders = [
  { id: 1, name: 'Intros', count: 12 },
  { id: 2, name: 'Outros', count: 8 },
  { id: 3, name: 'Backgrounds', count: 24 },
  { id: 4, name: 'Music', count: 45 },
];

export function MediaLibraryScreen() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'video' | 'image' | 'audio'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const filteredItems = mediaItems.filter(item => {
    if (filter !== 'all' && item.type !== filter) return false;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleSelection = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'image': return Image;
      case 'audio': return Music;
      default: return Folder;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Folder className="w-8 h-8 text-blue-400" />
            Media Library
          </h1>
          <p className="text-gray-400 mt-1">Manage your video assets</p>
        </div>

        <div className="flex items-center gap-3">
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <span>{selectedItems.length} selected</span>
              <button onClick={() => setSelectedItems([])} className="hover:text-white">×</button>
            </div>
          )}
          <button className="btn-secondary">
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>
      </div>

      {/* Folders */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <motion.div
            key={folder.id}
            whileHover={{ scale: 1.02 }}
            className="glass-panel p-4 cursor-pointer card-hover"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Folder className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-medium">{folder.name}</p>
                <p className="text-sm text-gray-500">{folder.count} items</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {(['all', 'video', 'image', 'audio'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${filter === f 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-dark-800 text-gray-400 hover:bg-dark-700'
                }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-9 w-48 text-sm"
            />
          </div>
          <div className="flex items-center bg-dark-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-dark-700 text-white' : 'text-gray-500'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-dark-700 text-white' : 'text-gray-500'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="flex-1 overflow-y-auto">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              const Icon = getIcon(item.type);
              const isSelected = selectedItems.includes(item.id);

              return (
                <motion.div
                  key={item.id}
                  layout
                  onClick={() => toggleSelection(item.id)}
                  className={`glass-panel p-4 cursor-pointer transition-all relative
                    ${isSelected ? 'ring-2 ring-cyan-500 bg-cyan-500/10' : 'card-hover'}
                  `}
                >
                  <div className="aspect-video rounded-lg bg-dark-800 flex items-center justify-center mb-3">
                    <Icon className="w-12 h-12 text-gray-600" />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center">
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-white text-sm font-medium truncate">{item.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{item.size}</span>
                    {item.duration && (
                      <span className="text-xs text-gray-500">{item.duration}</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredItems.map((item) => {
              const Icon = getIcon(item.type);
              const isSelected = selectedItems.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => toggleSelection(item.id)}
                  className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all
                    ${isSelected ? 'bg-cyan-500/10 border border-cyan-500' : 'hover:bg-dark-800 border border-transparent'}
                  `}
                >
                  <div className="w-12 h-12 rounded-lg bg-dark-700 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {item.duration && (
                      <span className="text-sm text-gray-400">{item.duration}</span>
                    )}
                    <span className="text-sm text-gray-500">{item.size}</span>
                    <button className="p-2 hover:bg-dark-700 rounded-lg opacity-0 group-hover:opacity-100">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
