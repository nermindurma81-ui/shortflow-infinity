# ShortFlow Infinity - AI Video Factory

![ShortFlow Infinity](https://img.shields.io/badge/ShortFlow-Infinity-cyan)
![Android](https://img.shields.io/badge/Android-12+-green)
![React](https://img.shields.io/badge/React-18-blue)
![Capacitor](https://img.shields.io/badge/Capacitor-6.0-blue)

A comprehensive Android application for viral short video creation, built with React, Capacitor, and integrated with Base44 backend.

## Features

### Video Lab
- **Video Editor** - Full-featured mobile video editing
- **Auto Editor (AI)** - One-click AI editing with smart cuts
- **Media Library** - Organize and manage video assets
- **Video Assembly** - Stitch multiple clips together
- **Render Jobs** - Background video processing
- **Zakazane Objave** - Scheduled posts management
- **Platform Accounts** - Multi-platform integration
- **Storyboard** - Visual story planning
- **Viral Score** - AI-powered viral potential analysis
- **Thumbnail AI** - Generate viral thumbnails

### Script & Content
- **AI Script Lab** - Generate viral scripts with AI
- **Video Generator** - Automated video creation pipeline

### Growth Lab
- **Trend Discovery** - Find trending hashtags and sounds
- **Content Calendar** - Schedule and plan content
- **Puni Kalendar** - Full calendar view
- **Channel Creator** - Channel optimization tools
- **Competitor Analysis** - Track and analyze competitors
- **Viral Strategija** - Strategy recommendations

### System
- **API Keys** - Manage API integrations
- **Settings** - App configuration

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Mobile**: Capacitor 6 (Android 12+)
- **Styling**: Tailwind CSS + Framer Motion
- **State**: Zustand
- **Backend**: Base44 (Backend-as-a-Service)
- **AI**: Groq, Claude, OpenAI integrations
- **Hosting**: Firebase / GitHub Pages
- **CI/CD**: GitHub Actions

## Prerequisites

- Node.js 20+
- npm 10+
- Java 17 (for Android builds)
- Android Studio (for emulator/testing)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/shortflow-infinity.git
cd shortflow-infinity
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your API keys
```

4. Initialize Capacitor for Android:
```bash
npx cap add android
npx cap sync android
```

## Development

### Web Development
```bash
npm run dev
```

### Android Development
```bash
npm run build
npx cap sync android
npx cap open android
```

## Building

### Build Android APK (Debug)
```bash
./build.sh
```

### Build Android APK (Release)
```bash
cd android
./gradlew assembleRelease
```

The APK will be at:
- Debug: `android/app/build/outputs/apk/debug/app-debug.apk`
- Release: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

## Deployment

### Option 1: Firebase App Distribution

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
firebase login
```

2. Initialize Firebase:
```bash
firebase init
```

3. Deploy:
```bash
./deploy.sh
# Select option 2 for Firebase App Distribution
```

### Option 2: GitHub Releases (Automated)

Push to `main` branch - GitHub Actions will automatically:
1. Build the APK
2. Create a new release
3. Upload the APK as a release asset

### Option 3: Firebase Hosting (Web Preview)

```bash
./deploy.sh
# Select option 1 for Firebase Hosting
```

## Configuration

### Base44 Integration

1. Create an account at [base44.com](https://base44.com)
2. Get your API key from the dashboard
3. Add to `.env`:
```
VITE_BASE44_API_KEY=your_key_here
```

### AI Providers

Configure AI providers in API Keys screen:
- **Groq** - Fast inference (recommended)
- **OpenAI** - GPT-4, DALL-E
- **Claude** - Anthropic models
- **ElevenLabs** - Voice generation

## App Structure

```
shortflow-infinity/
├── src/
│   ├── components/          # Reusable components
│   │   └── AppLayout.tsx   # Main navigation layout
│   ├── screens/            # Page components
│   │   ├── DashboardScreen.tsx
│   │   ├── VideoEditorScreen.tsx
│   │   ├── ScriptLabScreen.tsx
│   │   ├── TrendDiscoveryScreen.tsx
│   │   ├── CompetitorScreen.tsx
│   │   ├── CalendarScreen.tsx
│   │   ├── ViralScoreScreen.tsx
│   │   ├── ThumbnailAIScreen.tsx
│   │   ├── AutoEditorScreen.tsx
│   │   ├── APIKeysScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── AuthScreen.tsx
│   ├── services/           # API services
│   │   └── base44.ts      # Base44 integration
│   ├── stores/            # State management
│   │   ├── projectStore.ts
│   │   ├── userStore.ts
│   │   └── trendsStore.ts
│   ├── types/             # TypeScript types
│   └── utils/             # Utilities
├── android/               # Android native project
├── ios/                   # iOS native project (optional)
├── .github/workflows/     # CI/CD
├── build.sh              # Build script
├── deploy.sh             # Deployment script
├── capacitor.config.ts   # Capacitor config
└── package.json
```

## Maintenance & Updates

### Regular Updates

1. **Dependencies**:
```bash
npm update
npx cap sync
```

2. **Capacitor plugins**:
```bash
npm install @capacitor/android@latest
npx cap sync
```

3. **Android SDK**: Update through Android Studio

### Monitoring

- Use Firebase Crashlytics for crash reporting
- Monitor API usage in Base44 dashboard
- Track app analytics in Firebase Console

### Backups

- Code: Git repository
- Data: Base44 handles database backups
- User files: Firebase Storage

## Security

- API keys are stored in environment variables
- User tokens use secure storage (Capacitor Preferences)
- HTTPS only for API communication
- Android: ProGuard enabled for release builds

## Troubleshooting

### Build Issues

**Gradle sync fails**:
```bash
cd android
./gradlew clean
npx cap sync android
```

**Node modules issues**:
```bash
rm -rf node_modules package-lock.json
npm install
```

**Capacitor sync issues**:
```bash
npx cap sync android --force
```

### Runtime Issues

**White screen on Android**:
- Check `capacitor.config.ts` webDir is set to `dist`
- Ensure `npm run build` completed successfully
- Check Chrome DevTools for errors

**API calls failing**:
- Verify `.env` variables are set
- Check network permissions in `AndroidManifest.xml`
- Ensure CORS is configured on backend

## License

MIT License - see LICENSE file

## Support

For issues and feature requests, please use GitHub Issues.

## Roadmap

- [ ] iOS support
- [ ] Desktop app (Electron)
- [ ] Advanced AI editing
- [ ] Collaboration features
- [ ] Analytics dashboard
