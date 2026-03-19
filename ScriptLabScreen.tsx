import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Copy, RefreshCw, Download, Clock, 
  Type, Save, Wand2, ChevronDown, Play
} from 'lucide-react';
import { useProjectStore } from '@/stores';

const tones = [
  { id: 'energetic', label: 'Energetic', desc: 'High energy, exciting' },
  { id: 'calm', label: 'Calm', desc: 'Relaxed, soothing' },
  { id: 'funny', label: 'Funny', desc: 'Humorous, entertaining' },
  { id: 'professional', label: 'Professional', desc: 'Formal, educational' },
  { id: 'emotional', label: 'Emotional', desc: 'Heartfelt, moving' },
];

const platforms = [
  { id: 'tiktok', label: 'TikTok', maxDuration: 180 },
  { id: 'instagram', label: 'Instagram Reels', maxDuration: 90 },
  { id: 'youtube', label: 'YouTube Shorts', maxDuration: 60 },
];

const generatedScript = {
  hook: "Stop scrolling! This 30-second hack will change how you cook pasta forever!",
  content: "Did you know you've been cooking pasta wrong your entire life? Here's the secret that Italian grandmothers have been hiding... First, never break your spaghetti. Second, add salt only after water boils. Third, and this is the game-changer, save a cup of pasta water before draining. This starchy liquid creates the creamiest sauces you've ever tasted. Try it tonight and thank me later!",
  cta: "Follow for more kitchen secrets! Drop a 🍝 if you're trying this tonight!",
  wordCount: 78,
  estimatedDuration: 28,
};

export function ScriptLabScreen() {
  const [topic, setTopic] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('tiktok');
  const [selectedTone, setSelectedTone] = useState('energetic');
  const [duration, setDuration] = useState(30);
  const [isGenerating, setIsGenerating] = useState(false);
  const [script, setScript] = useState<typeof generatedScript | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setScript(generatedScript);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (script) {
      navigator.clipboard.writeText(`${script.hook}\n\n${script.content}\n\n${script.cta}`);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            AI Script Lab
          </h1>
          <p className="text-gray-400 mt-1">Generate viral scripts with AI</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleGenerate}
            disabled={!topic || isGenerating}
            className="btn-primary flex items-center gap-2"
          >
            {isGenerating ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Wand2 className="w-5 h-5" />
            )}
            {isGenerating ? 'Generating...' : 'Generate Script'}
          </button>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Configuration Panel */}
        <div className="space-y-4 overflow-y-auto pr-2">
          {/* Topic Input */}
          <div className="glass-panel p-5">
            <label className="block text-sm font-medium text-gray-400 mb-2">Video Topic</label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Describe what your video is about..."
              className="input-field h-24 resize-none"
            />
          </div>

          {/* Platform Selection */}
          <div className="glass-panel p-5">
            <label className="block text-sm font-medium text-gray-400 mb-3">Platform</label>
            <div className="space-y-2">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all
                    ${selectedPlatform === platform.id 
                      ? 'bg-cyan-500/20 border-cyan-500' 
                      : 'bg-dark-800 border-dark-600 hover:border-dark-500'
                    }`}
                >
                  <span className="text-white font-medium">{platform.label}</span>
                  <span className="text-xs text-gray-500">{platform.maxDuration}s max</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tone Selection */}
          <div className="glass-panel p-5">
            <label className="block text-sm font-medium text-gray-400 mb-3">Tone of Voice</label>
            <div className="grid grid-cols-2 gap-2">
              {tones.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`p-3 rounded-xl border text-left transition-all
                    ${selectedTone === tone.id 
                      ? 'bg-cyan-500/20 border-cyan-500' 
                      : 'bg-dark-800 border-dark-600 hover:border-dark-500'
                    }`}
                >
                  <p className="text-white font-medium text-sm">{tone.label}</p>
                  <p className="text-xs text-gray-500">{tone.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Duration Slider */}
          <div className="glass-panel p-5">
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Target Duration: {duration}s
            </label>
            <input
              type="range"
              min="15"
              max={platforms.find(p => p.id === selectedPlatform)?.maxDuration || 180}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>15s</span>
              <span>{platforms.find(p => p.id === selectedPlatform)?.maxDuration || 180}s</span>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="glass-panel p-5">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Advanced Options</h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Include hook optimization</span>
                <input type="checkbox" defaultChecked className="accent-cyan-500" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Add call-to-action</span>
                <input type="checkbox" defaultChecked className="accent-cyan-500" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Trending hashtags</span>
                <input type="checkbox" className="accent-cyan-500" />
              </label>
            </div>
          </div>
        </div>

        {/* Script Output */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="glass-panel flex-1 flex flex-col p-6">
            {!script ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 rounded-full bg-dark-800 flex items-center justify-center mb-4">
                  <Type className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Ready to Create</h3>
                <p className="text-gray-500 max-w-md">
                  Configure your settings on the left and click Generate Script to create your viral content script
                </p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                      ✓ Generated
                    </span>
                    <span className="text-sm text-gray-500">
                      {script.wordCount} words • ~{script.estimatedDuration}s
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleCopy}
                      className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-dark-800 rounded-lg transition-colors" title="Save script">
                      <Save className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-dark-800 rounded-lg transition-colors" title="Download">
                      <Download className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto">
                  {/* Hook Section */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wide">Hook</span>
                      <span className="text-xs text-gray-500">Grab attention in 3 seconds</span>
                    </div>
                    <p className="text-white text-lg leading-relaxed">{script.hook}</p>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 rounded-xl bg-dark-800 border border-dark-600">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Content</span>
                      <span className="text-xs text-gray-500">Main message</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">{script.content}</p>
                  </div>

                  {/* CTA Section */}
                  <div className="p-4 rounded-xl bg-dark-800 border border-dark-600">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">Call-to-Action</span>
                      <span className="text-xs text-gray-500">Drive engagement</span>
                    </div>
                    <p className="text-white">{script.cta}</p>
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="mt-6 pt-6 border-t border-dark-700">
                  <h4 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    AI Suggestions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Add countdown timer',
                      'Include text overlay',
                      'Speed up middle section',
                      'Add trending sound',
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        className="px-3 py-1.5 rounded-full bg-dark-800 border border-dark-600 
                                 text-sm text-gray-400 hover:text-white hover:border-cyan-500/50 transition-all"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
