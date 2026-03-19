#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying ShortFlow Infinity Project...\n');

const checks = {
  'Configuration Files': [
    'package.json',
    'capacitor.config.ts',
    'vite.config.ts',
    'tsconfig.json',
    'tailwind.config.js',
    'firebase.json',
    '.env.example',
    '.gitignore'
  ],
  'Core Screens': [
    'src/screens/DashboardScreen.tsx',
    'src/screens/VideoEditorScreen.tsx',
    'src/screens/AutoEditorScreen.tsx',
    'src/screens/MediaLibraryScreen.tsx',
    'src/screens/RenderJobsScreen.tsx',
    'src/screens/ScriptLabScreen.tsx',
    'src/screens/TrendDiscoveryScreen.tsx',
    'src/screens/CompetitorScreen.tsx',
    'src/screens/CalendarScreen.tsx',
    'src/screens/ViralScoreScreen.tsx',
    'src/screens/ThumbnailAIScreen.tsx',
    'src/screens/APIKeysScreen.tsx',
    'src/screens/SettingsScreen.tsx',
    'src/screens/AuthScreen.tsx'
  ],
  'Services & Stores': [
    'src/services/base44.ts',
    'src/services/ffmpeg.ts',
    'src/stores/projectStore.ts',
    'src/stores/userStore.ts',
    'src/stores/trendsStore.ts',
    'src/stores/index.ts'
  ],
  'Build & Deploy': [
    'build.sh',
    'deploy.sh',
    '.github/workflows/build.yml'
  ],
  'Documentation': [
    'README.md',
    'DEPLOYMENT.md',
    'QUICKSTART.md',
    'PROJECT_SUMMARY.md',
    'ANDROID_SETUP.md'
  ]
};

let totalChecks = 0;
let passedChecks = 0;

for (const [category, files] of Object.entries(checks)) {
  console.log(`\n📁 ${category}`);
  console.log('─'.repeat(50));

  for (const file of files) {
    totalChecks++;
    const exists = fs.existsSync(file);
    const status = exists ? '✅' : '❌';
    const size = exists ? `(${(fs.statSync(file).size / 1024).toFixed(1)} KB)` : '';
    console.log(`${status} ${file} ${size}`);
    if (exists) passedChecks++;
  }
}

console.log('\n' + '='.repeat(50));
console.log(`📊 Verification Complete: ${passedChecks}/${totalChecks} checks passed`);

if (passedChecks === totalChecks) {
  console.log('🎉 All files present! Project is ready to build.');
  process.exit(0);
} else {
  console.log('⚠️  Some files are missing. Please check the output above.');
  process.exit(1);
}
