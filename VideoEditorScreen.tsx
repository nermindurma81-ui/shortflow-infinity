import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, Wand2, Type, Music, Image, Scissors, 
  Layers, Download, Play, Pause, Settings, Sparkles
} from 'lucide-react';
import { useProjectStore } from '@/stores';

const tools = [
  { id: 'ai-edit', label: 'AI Edit', icon: Wand2, description: 'Auto-enhance with AI' },
  { id: 'captions', label: 'Captions', icon: Type, description: 'Auto-generated subtitles' },
  { id: 'audio', label: 'Audio', icon: Music, description: 'Voiceover & music' },
  { id: 'effects', label: 'Effects', icon: Sparkles, description: 'Transitions & filters' },
  { id: 'trim', label: 'Trim', icon: Scissors, description: 'Cut & splice' },
  { id: 'overlay', label: 'Overlay', icon: Layers, description: 'Images & stickers' },
];

const aspectRatios = [
  { label: '9:16', value: 'vertical', desc: 'TikTok/Reels' },
  { label: '1:1', value: 'square', desc: 'Instagram' },
  { label: '16:9', value: 'horizontal', desc: 'YouTube' },
];

export function VideoEditorScreen() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState('vertical');
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col lg:flex-row gap-4 -m-4 lg:-m-6 p-4 lg:p-6">
      {/* Left Sidebar - Tools */}
      <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
        <div className="glass-panel p-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">AI Tools</h3>
          <div className="space-y-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all
                    ${selectedTool === tool.id 
                      ? 'bg-cyan-500/20 border border-cyan-500/50' 
                      : 'hover:bg-dark-700 border border-transparent'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                    ${selectedTool === tool.id ? 'bg-cyan-500' : 'bg-dark-600'}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-medium text-sm">{tool.label}</p>
                    <p className="text-xs text-gray-500">{tool.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Aspect Ratio */}
        <div className="glass-panel p-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Aspect Ratio</h3>
          <div className="grid grid-cols-3 gap-2">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio.value}
                onClick={() => setAspectRatio(ratio.value)}
                className={`p-2 rounded-lg border text-center transition-all
                  ${aspectRatio === ratio.value 
                    ? 'border-cyan-500 bg-cyan-500/20' 
                    : 'border-dark-600 hover:border-dark-500'
                  }`}
              >
                <p className="text-white font-medium text-sm">{ratio.label}</p>
                <p className="text-[10px] text-gray-500">{ratio.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Center - Video Preview */}
      <div className="flex-1 flex flex-col">
        <div className="glass-panel flex-1 flex items-center justify-center relative overflow-hidden">
          {/* Video Preview Area */}
          <div className={`relative bg-black rounded-lg overflow-hidden shadow-2xl
            ${aspectRatio === 'vertical' ? 'w-[280px] h-[500px]' : ''}
            ${aspectRatio === 'square' ? 'w-[400px] h-[400px]' : ''}
            ${aspectRatio === 'horizontal' ? 'w-[600px] h-[338px]' : ''}
          `}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Upload className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-sm">Drop video here or click to upload</p>
                <button className="mt-4 btn-primary text-sm">
                  <Upload className="w-4 h-4 inline mr-2" />
                  Upload Video
                </button>
              </div>
            </div>

            {/* Playback Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30"
                >
                  {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                </button>
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-cyan-500 rounded-full" />
                </div>
                <span className="text-white text-sm">0:15 / 0:45</span>
              </div>
            </div>
          </div>

          {/* Watermark */}
          <div className="absolute bottom-4 right-4 text-gray-600 text-xs">
            ShortFlow Infinity
          </div>
        </div>

        {/* Timeline */}
        <div className="glass-panel mt-4 p-4 h-32">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Timeline</span>
            <div className="flex items-center gap-2">
              <button className="p-1.5 hover:bg-dark-700 rounded">
                <Scissors className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 hover:bg-dark-700 rounded">
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
          <div className="h-16 bg-dark-800 rounded-lg relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-1 bg-cyan-500" />
            <div className="h-full flex items-center px-4 gap-1">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-8 w-12 bg-dark-600 rounded flex-shrink-0 border border-dark-500"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Export */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <div className="glass-panel p-4">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Export</h3>

          <div className="space-y-3 mb-4">
            <div>
              <label className="text-xs text-gray-500">Resolution</label>
              <select className="w-full mt-1 bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 text-sm text-white">
                <option>1080p (FHD)</option>
                <option>720p (HD)</option>
                <option>4K (UHD)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500">Format</label>
              <select className="w-full mt-1 bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 text-sm text-white">
                <option>MP4 (H.264)</option>
                <option>MOV</option>
                <option>WebM</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500">Quality</label>
              <input 
                type="range" 
                min="1" 
                max="100" 
                defaultValue="85"
                className="w-full mt-2 accent-cyan-500"
              />
            </div>
          </div>

          <button className="w-full btn-primary flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Export Video
          </button>
        </div>

        {/* AI Suggestions */}
        <div className="glass-panel p-4 mt-4">
          <h3 className="text-sm font-semibold text-cyan-400 flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4" />
            AI Suggestions
          </h3>
          <div className="space-y-2">
            {[
              'Add viral music at 0:15',
              'Trim first 3 seconds',
              'Enhance brightness +20%'
            ].map((suggestion, i) => (
              <button 
                key={i}
                className="w-full text-left p-2 rounded-lg bg-dark-800/50 hover:bg-dark-800 
                         text-sm text-gray-300 transition-colors border border-dark-600/50"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
