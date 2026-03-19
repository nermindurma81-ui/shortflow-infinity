import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wand2, Upload, Play, Pause, SkipForward, SkipBack,
  Scissors, Music, Type, Sparkles, Settings, Download
} from 'lucide-react';

const aiFeatures = [
  { id: 'jumpcut', label: 'Auto Jump Cuts', desc: 'Remove silences automatically', enabled: true },
  { id: 'captions', label: 'AI Captions', desc: 'Generate word-by-word subtitles', enabled: true },
  { id: 'music', label: 'Smart Music', desc: 'Match music to content mood', enabled: false },
  { id: 'color', label: 'Auto Color', desc: 'Optimize colors and lighting', enabled: true },
  { id: 'zoom', label: 'Smart Zooms', desc: 'Add emphasis zooms automatically', enabled: false },
];

export function AutoEditorScreen() {
  const [features, setFeatures] = useState(aiFeatures);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggleFeature = (id: string) => {
    setFeatures(features.map(f => 
      f.id === id ? { ...f, enabled: !f.enabled } : f
    ));
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Wand2 className="w-8 h-8 text-pink-400" />
            Auto Editor (AI)
          </h1>
          <p className="text-gray-400 mt-1">Let AI edit your video in one click</p>
        </div>

        <button 
          onClick={handleProcess}
          disabled={isProcessing}
          className="btn-primary flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          {isProcessing ? 'Processing...' : 'Auto Edit'}
        </button>
      </div>

      <div className="flex-1 grid lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Video Preview */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="glass-panel flex-1 flex items-center justify-center relative overflow-hidden">
            <div className="w-full max-w-md aspect-video bg-dark-800 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Upload className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Upload video or drag & drop</p>
                <button className="mt-4 btn-secondary">
                  Select Video
                </button>
              </div>
            </div>

            {isProcessing && (
              <div className="absolute inset-0 bg-dark-900/90 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-dark-700 border-t-cyan-500 
                                animate-spin mx-auto mb-4" />
                  <p className="text-white font-medium">AI is editing your video...</p>
                  <p className="text-gray-400 text-sm mt-1">{progress}% complete</p>
                  <div className="w-64 h-2 bg-dark-700 rounded-full mt-4 overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Timeline */}
          <div className="glass-panel mt-4 p-4">
            <div className="flex items-center justify-center gap-4">
              <button className="p-2 hover:bg-dark-800 rounded-lg">
                <SkipBack className="w-5 h-5 text-white" />
              </button>
              <button className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-400">
                <Play className="w-5 h-5 text-white ml-0.5" />
              </button>
              <button className="p-2 hover:bg-dark-800 rounded-lg">
                <SkipForward className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* AI Features Panel */}
        <div className="overflow-y-auto">
          <div className="glass-panel p-5">
            <h3 className="text-lg font-semibold text-white mb-4">AI Features</h3>
            <div className="space-y-3">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-3 rounded-xl bg-dark-800 border border-dark-600"
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={feature.enabled}
                      onChange={() => toggleFeature(feature.id)}
                      className="mt-1 accent-cyan-500 w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{feature.label}</p>
                      <p className="text-xs text-gray-500">{feature.desc}</p>
                    </div>
                  </label>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5 mt-4">
            <h3 className="text-lg font-semibold text-white mb-4">Style Preset</h3>
            <select className="input-field mb-3">
              <option>Viral Fast-Paced</option>
              <option>Cinematic</option>
              <option>Tutorial</option>
              <option>Vlog Style</option>
            </select>
            <p className="text-xs text-gray-500">
              AI will adapt editing style based on this preset
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
