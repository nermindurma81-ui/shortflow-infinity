import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Image, Wand2, Download, RefreshCw, Palette, 
  Type, Sparkles, Check, ChevronDown, Upload
} from 'lucide-react';

const styles = [
  { id: 'minimal', label: 'Minimal', desc: 'Clean & simple', color: 'bg-gray-500' },
  { id: 'bold', label: 'Bold', desc: 'High contrast', color: 'bg-red-500' },
  { id: 'gradient', label: 'Gradient', desc: 'Colorful blends', color: 'bg-purple-500' },
  { id: 'cinematic', label: 'Cinematic', desc: 'Movie poster style', color: 'bg-blue-500' },
];

const generatedThumbnails = [
  { id: 1, style: 'minimal', selected: false },
  { id: 2, style: 'bold', selected: true },
  { id: 3, style: 'gradient', selected: false },
  { id: 4, style: 'cinematic', selected: false },
];

export function ThumbnailAIScreen() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('bold');
  const [isGenerating, setIsGenerating] = useState(false);
  const [thumbnails, setThumbnails] = useState(generatedThumbnails);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  const handleSelect = (id: number) => {
    setThumbnails(thumbnails.map(t => ({ ...t, selected: t.id === id })));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Image className="w-8 h-8 text-purple-400" />
            Thumbnail AI
          </h1>
          <p className="text-gray-400 mt-1">Generate viral thumbnails with AI</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="space-y-4">
          <div className="glass-panel p-5">
            <label className="block text-sm font-medium text-gray-400 mb-2">Video Description</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your video content..."
              className="input-field h-24 resize-none"
            />
          </div>

          <div className="glass-panel p-5">
            <label className="block text-sm font-medium text-gray-400 mb-3">Style</label>
            <div className="space-y-2">
              {styles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all
                    ${selectedStyle === style.id 
                      ? 'bg-cyan-500/20 border-cyan-500' 
                      : 'bg-dark-800 border-dark-600 hover:border-dark-500'
                    }`}
                >
                  <div className={`w-8 h-8 rounded-lg ${style.color}`} />
                  <div className="text-left">
                    <p className="text-white font-medium">{style.label}</p>
                    <p className="text-xs text-gray-500">{style.desc}</p>
                  </div>
                  {selectedStyle === style.id && (
                    <Check className="w-5 h-5 text-cyan-400 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5">
            <label className="block text-sm font-medium text-gray-400 mb-3">Text Overlay</label>
            <input 
              type="text"
              placeholder="Main headline..."
              className="input-field mb-3"
            />
            <div className="flex gap-2">
              <select className="input-field flex-1">
                <option>Arial Black</option>
                <option>Impact</option>
                <option>Montserrat</option>
              </select>
              <input type="color" defaultValue="#ffffff" className="w-12 h-10 rounded-lg bg-dark-800 border border-dark-600" />
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={!prompt || isGenerating}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Wand2 className="w-5 h-5" />
            )}
            {isGenerating ? 'Generating...' : 'Generate Thumbnails'}
          </button>
        </div>

        {/* Preview Grid */}
        <div className="lg:col-span-2">
          <div className="glass-panel p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Generated Thumbnails</h3>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-dark-800 rounded-lg">
                  <Upload className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {thumbnails.map((thumb, idx) => (
                <motion.div
                  key={thumb.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleSelect(thumb.id)}
                  className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer group
                    ${thumb.selected ? 'ring-2 ring-cyan-500' : 'ring-1 ring-dark-600'}
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-700 to-dark-800" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Image className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm capitalize">{thumb.style} Style</p>
                    </div>
                  </div>

                  {thumb.selected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-cyan-500 
                                  flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                                transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700">
                      <Download className="w-5 h-5 text-white" />
                    </button>
                    <button className="p-2 bg-dark-800 rounded-lg hover:bg-dark-700">
                      <RefreshCw className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {thumbnails.some(t => t.selected) && (
              <div className="mt-6 flex justify-end">
                <button className="btn-primary flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
