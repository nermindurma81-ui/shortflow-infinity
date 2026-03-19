import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Bell, Shield, Globe, CreditCard, 
  Key, Palette, Smartphone, ChevronRight, 
  Moon, Sun, LogOut, Save
} from 'lucide-react';
import { useUserStore } from '@/stores';

const settingsSections = [
  {
    id: 'account',
    title: 'Account',
    icon: User,
    items: [
      { id: 'profile', label: 'Profile Information', desc: 'Update your name, email, and avatar' },
      { id: 'password', label: 'Password', desc: 'Change your password' },
      { id: '2fa', label: 'Two-Factor Auth', desc: 'Enable 2FA for security' },
    ]
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    items: [
      { id: 'push', label: 'Push Notifications', desc: 'Receive alerts on your device' },
      { id: 'email', label: 'Email Notifications', desc: 'Weekly digest and updates' },
      { id: 'marketing', label: 'Marketing', desc: 'Tips and promotional content' },
    ]
  },
  {
    id: 'api',
    title: 'API Keys',
    icon: Key,
    items: [
      { id: 'base44', label: 'Base44 API', desc: 'Manage your Base44 integration' },
      { id: 'ai', label: 'AI Providers', desc: 'Groq, Claude, OpenAI keys' },
      { id: 'webhooks', label: 'Webhooks', desc: 'Configure webhook endpoints' },
    ]
  },
  {
    id: 'billing',
    title: 'Billing',
    icon: CreditCard,
    items: [
      { id: 'plan', label: 'Current Plan', desc: 'Pro Plan - $29/month' },
      { id: 'usage', label: 'Usage', desc: '2,400 / 10,000 credits' },
      { id: 'invoices', label: 'Invoices', desc: 'View billing history' },
    ]
  },
];

export function SettingsScreen() {
  const { user, logout } = useUserStore();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    marketing: false,
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <User className="w-8 h-8 text-cyan-400" />
          Settings
        </h1>
        <p className="text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 
                        flex items-center justify-center text-3xl font-bold">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white">{user?.username || 'User'}</h2>
            <p className="text-gray-400">{user?.email || 'user@example.com'}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-medium">
                Pro Plan
              </span>
              <span className="text-sm text-gray-500">2,400 credits remaining</span>
            </div>
          </div>
          <button className="btn-secondary">
            Edit Profile
          </button>
        </div>
      </motion.div>

      {/* Quick Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center">
              {darkMode ? <Moon className="w-5 h-5 text-purple-400" /> : <Sun className="w-5 h-5 text-yellow-400" />}
            </div>
            <div>
              <p className="text-white font-medium">Dark Mode</p>
              <p className="text-xs text-gray-500">Always on in this version</p>
            </div>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full transition-colors relative
              ${darkMode ? 'bg-cyan-500' : 'bg-dark-600'}`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform
              ${darkMode ? 'left-7' : 'left-1'}`} 
            />
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-medium">Language</p>
              <p className="text-xs text-gray-500">English (US)</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </motion.div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {settingsSections.map((section, idx) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="glass-panel overflow-hidden"
            >
              <button
                onClick={() => setActiveSection(isActive ? null : section.id)}
                className="w-full p-5 flex items-center justify-between hover:bg-dark-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-dark-700 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform
                  ${isActive ? 'rotate-90' : ''}`} 
                />
              </button>

              {isActive && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  className="border-t border-dark-700"
                >
                  <div className="p-5 space-y-4">
                    {section.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-white font-medium">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        {section.id === 'notifications' ? (
                          <button 
                            onClick={() => setNotifications(prev => ({
                              ...prev,
                              [item.id]: !prev[item.id as keyof typeof prev]
                            }))}
                            className={`w-10 h-5 rounded-full transition-colors relative
                              ${notifications[item.id as keyof typeof notifications] ? 'bg-cyan-500' : 'bg-dark-600'}`}
                          >
                            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform
                              ${notifications[item.id as keyof typeof notifications] ? 'left-6' : 'left-1'}`} 
                            />
                          </button>
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Danger Zone */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-panel p-5 border border-red-500/30"
      >
        <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
        <div className="space-y-3">
          <button className="w-full p-3 rounded-xl border border-red-500/50 text-red-400 
                           hover:bg-red-500/10 transition-colors text-left">
            <p className="font-medium">Delete Account</p>
            <p className="text-sm text-red-400/70">This action cannot be undone</p>
          </button>
          <button 
            onClick={logout}
            className="w-full p-3 rounded-xl border border-dark-600 text-gray-400 
                     hover:bg-dark-800 transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </motion.div>

      {/* Version */}
      <div className="text-center text-gray-600 text-sm">
        ShortFlow Infinity v1.0.0 (Build 2024.1)
      </div>
    </div>
  );
}
