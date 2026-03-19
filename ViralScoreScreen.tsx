import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, TrendingUp, Zap, Target, Clock, 
  Users, MessageCircle, Share2, AlertCircle, CheckCircle2
} from 'lucide-react';

const scoreCategories = [
  { id: 'hook', label: 'Hook Strength', score: 85, icon: Zap, color: 'from-yellow-400 to-orange-500' },
  { id: 'retention', label: 'Retention', score: 72, icon: Clock, color: 'from-blue-400 to-cyan-500' },
  { id: 'engagement', label: 'Engagement', score: 91, icon: MessageCircle, color: 'from-green-400 to-emerald-500' },
  { id: 'shareability', label: 'Shareability', score: 68, icon: Share2, color: 'from-purple-400 to-pink-500' },
];

const suggestions = [
  { type: 'improvement', text: 'Add a stronger hook in the first 3 seconds', impact: 'High' },
  { type: 'improvement', text: 'Include trending music to boost retention', impact: 'Medium' },
  { type: 'strength', text: 'CTA placement is optimal', impact: 'Positive' },
  { type: 'improvement', text: 'Add text overlays for accessibility', impact: 'Medium' },
];

export function ViralScoreScreen() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const overallScore = Math.round(scoreCategories.reduce((acc, cat) => acc + cat.score, 0) / scoreCategories.length);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-cyan-400" />
            Viral Score Engine
          </h1>
          <p className="text-gray-400 mt-1">AI-powered viral potential analysis</p>
        </div>

        <select className="input-field w-64">
          <option>Select video to analyze...</option>
          <option>Morning Routine 2024</option>
          <option>Tech Review Short</option>
          <option>Cooking Hack #12</option>
        </select>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Overall Score */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel p-8 flex flex-col items-center justify-center"
        >
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-dark-700"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={2 * Math.PI * 88 * (1 - overallScore / 100)}
                className={`${getScoreColor(overallScore)} transition-all duration-1000`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}
              </span>
              <span className="text-sm text-gray-500 mt-1">Viral Score</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium
              ${overallScore >= 80 ? 'bg-green-500/20 text-green-400' : ''}
              ${overallScore >= 60 && overallScore < 80 ? 'bg-yellow-500/20 text-yellow-400' : ''}
              ${overallScore < 60 ? 'bg-red-500/20 text-red-400' : ''}
            `}>
              {overallScore >= 80 ? '🚀 High Viral Potential' : ''}
              {overallScore >= 60 && overallScore < 80 ? '⚡ Good Potential' : ''}
              {overallScore < 60 ? '📈 Needs Improvement' : ''}
            </span>
          </div>

          <div className="mt-6 w-full pt-6 border-t border-dark-700">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Predicted Views</span>
              <span className="text-white font-medium">50K - 100K</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-400">Engagement Rate</span>
              <span className="text-green-400 font-medium">8.5%</span>
            </div>
          </div>
        </motion.div>

        {/* Category Scores */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-white">Score Breakdown</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {scoreCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} 
                                    flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-medium">{category.label}</span>
                    </div>
                    <span className={`text-2xl font-bold ${getScoreColor(category.score)}`}>
                      {category.score}
                    </span>
                  </div>
                  <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.score}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      className={`h-full rounded-full ${getScoreBg(category.score)}`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* AI Suggestions */}
          <div className="glass-panel p-5 mt-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              Optimization Suggestions
            </h3>
            <div className="space-y-3">
              {suggestions.map((suggestion, idx) => (
                <div 
                  key={idx}
                  className={`flex items-start gap-3 p-3 rounded-xl border
                    ${suggestion.type === 'strength' 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : 'bg-dark-800 border-dark-600'
                    }`}
                >
                  {suggestion.type === 'strength' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm ${suggestion.type === 'strength' ? 'text-green-400' : 'text-gray-300'}`}>
                      {suggestion.text}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full
                    ${suggestion.impact === 'High' ? 'bg-red-500/20 text-red-400' : ''}
                    ${suggestion.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                    ${suggestion.impact === 'Positive' ? 'bg-green-500/20 text-green-400' : ''}
                  `}>
                    {suggestion.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
