import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Key, Copy, Eye, EyeOff, Trash2, Plus, Check,
  AlertCircle, RefreshCw, ExternalLink
} from 'lucide-react';

const apiProviders = [
  { 
    id: 'base44', 
    name: 'Base44', 
    key: 'b44_live_************xyz',
    status: 'active',
    lastUsed: '2 minutes ago'
  },
  { 
    id: 'groq', 
    name: 'Groq AI', 
    key: 'gsk_************abc',
    status: 'active',
    lastUsed: '5 minutes ago'
  },
  { 
    id: 'openai', 
    name: 'OpenAI', 
    key: 'sk-************def',
    status: 'inactive',
    lastUsed: 'Never'
  },
  { 
    id: 'elevenlabs', 
    name: 'ElevenLabs', 
    key: 'el_************ghi',
    status: 'active',
    lastUsed: '1 hour ago'
  },
];

export function APIKeysScreen() {
  const [keys, setKeys] = useState(apiProviders);
  const [showKey, setShowKey] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (id: string, key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const toggleShowKey = (id: string) => {
    setShowKey(showKey === id ? null : id);
  };

  const handleRefresh = (id: string) => {
    setKeys(keys.map(k => 
      k.id === id ? { ...k, key: k.key.replace(/[a-z0-9]/g, () => Math.random().toString(36)[2]) } : k
    ));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Key className="w-8 h-8 text-yellow-400" />
            API Ključevi
          </h1>
          <p className="text-gray-400 mt-1">Manage your API integrations</p>
        </div>

        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Key
        </button>
      </div>

      {/* Warning Banner */}
      <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-yellow-400 font-medium">Keep your keys secure</p>
          <p className="text-sm text-yellow-400/70 mt-1">
            Never share your API keys or commit them to public repositories. 
            Keys are stored encrypted on your device.
          </p>
        </div>
      </div>

      {/* API Keys List */}
      <div className="space-y-4">
        {keys.map((provider, idx) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center">
                  <Key className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{provider.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-2 h-2 rounded-full 
                      ${provider.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} 
                    />
                    <span className="text-sm text-gray-500 capitalize">{provider.status}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-sm text-gray-500">Last used {provider.lastUsed}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleRefresh(provider.id)}
                  className="p-2 hover:bg-dark-800 rounded-lg"
                  title="Refresh key"
                >
                  <RefreshCw className="w-4 h-4 text-gray-400" />
                </button>
                <button 
                  className="p-2 hover:bg-dark-800 rounded-lg text-red-400"
                  title="Delete key"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type={showKey === provider.id ? 'text' : 'password'}
                  value={provider.key}
                  readOnly
                  className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 
                           text-sm text-gray-400 font-mono"
                />
              </div>
              <button 
                onClick={() => toggleShowKey(provider.id)}
                className="p-2 hover:bg-dark-800 rounded-lg"
              >
                {showKey === provider.id ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <button 
                onClick={() => handleCopy(provider.id, provider.key)}
                className="p-2 hover:bg-dark-800 rounded-lg"
              >
                {copied === provider.id ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Documentation Links */}
      <div className="glass-panel p-5">
        <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
        <div className="space-y-3">
          {[
            { label: 'Base44 Documentation', url: 'https://docs.base44.com' },
            { label: 'Groq API Reference', url: 'https://groq.com/docs' },
            { label: 'OpenAI API Docs', url: 'https://platform.openai.com/docs' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-dark-800/50 
                       hover:bg-dark-800 transition-colors group"
            >
              <span className="text-gray-300">{link.label}</span>
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
