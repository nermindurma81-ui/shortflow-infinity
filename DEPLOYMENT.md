# 🚀 Deployment Guide - ShortFlow Infinity

## Overview

This guide covers deploying the ShortFlow Infinity Android APK to various platforms.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Build Process](#build-process)
3. [Deployment Options](#deployment-options)
4. [Post-Deployment](#post-deployment)
5. [Maintenance](#maintenance)

---

## Prerequisites

### System Requirements

- **OS**: macOS, Linux, or Windows with WSL2
- **RAM**: 8GB minimum (16GB recommended)
- **Storage**: 10GB free space
- **Node.js**: v20.x LTS
- **Java**: OpenJDK 17
- **Android Studio**: Latest stable version

### Accounts Required

1. **Base44 Account** - Backend services
   - Sign up at https://base44.com
   - Create an app and get API keys

2. **Firebase Account** - App distribution & analytics
   - Sign up at https://firebase.google.com
   - Create a new project
   - Enable App Distribution

3. **GitHub Account** - CI/CD (optional)
   - For automated builds
   - GitHub Actions included

---

## Build Process

### 1. Local Development Build

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### 2. Android Debug Build

```bash
# Sync Capacitor
npx cap sync android

# Open in Android Studio
npx cap open android

# Or build directly
cd android
./gradlew assembleDebug
```

### 3. Android Release Build

```bash
# Build release APK
./build.sh

# Or manually:
cd android
./gradlew assembleRelease
```

**Output**: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

### 4. Sign the APK (Required for distribution)

```bash
# Generate keystore (do this once)
keytool -genkey -v   -keystore shortflow.keystore   -alias shortflow   -keyalg RSA   -keysize 2048   -validity 10000

# Sign APK
jarsigner -verbose   -sigalg SHA1withRSA   -digestalg SHA1   -keystore shortflow.keystore   app-release-unsigned.apk   shortflow

# Align APK (recommended)
zipalign -v 4   app-release-unsigned.apk   shortflow-infinity.apk
```

---

## Deployment Options

### Option 1: Firebase App Distribution (Recommended)

Best for: Beta testing, internal distribution

**Setup:**

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
firebase login
```

2. Initialize Firebase:
```bash
firebase init appdistribution
```

3. Configure CI/CD:
   - Go to Firebase Console → Project Settings → Service Accounts
   - Generate new private key
   - Add to GitHub Secrets as `FIREBASE_SERVICE_ACCOUNT`

4. Deploy:
```bash
firebase appdistribution:distribute app-release.apk \
  --app YOUR_APP_ID \
  --groups testers \
  --release-notes "New features added"
```

**Automated with GitHub Actions:**
Already configured in `.github/workflows/build.yml`

### Option 2: Google Play Store

Best for: Public distribution

**Prerequisites:**
- Google Play Developer Account ($25 one-time fee)
- Signed APK/AAB
- App privacy policy
- Screenshots and graphics

**Steps:**

1. Create app in Play Console
2. Fill store listing (title, description, screenshots)
3. Upload signed AAB (recommended) or APK
4. Set up content rating
5. Configure pricing & distribution
6. Publish to Internal Testing → Closed Testing → Open Testing → Production

**Build App Bundle (AAB) - Recommended:**
```bash
cd android
./gradlew bundleRelease
```

Upload: `android/app/build/outputs/bundle/release/app-release.aab`

### Option 3: GitHub Releases

Best for: Direct APK distribution

**Manual:**
1. Go to GitHub repository → Releases
2. Click "Draft a new release"
3. Upload signed APK
4. Add release notes
5. Publish release

**Automated:**
Already configured in `.github/workflows/build.yml`
Pushes to main branch automatically create releases.

### Option 4: Firebase Hosting (Web Preview)

Best for: Web demo, testing

```bash
# Build web app
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

**URL**: `https://your-project.web.app`

---

## Post-Deployment

### 1. Verify Installation

```bash
# Install on device
adb install shortflow-infinity.apk

# Check logs
adb logcat | grep "ShortFlow"
```

### 2. Monitor Analytics

Set up Firebase Analytics:
- Open Firebase Console
- Go to Analytics → Dashboard
- Monitor active users, retention, crashes

### 3. Enable Crashlytics

Already integrated. View crashes in:
Firebase Console → Crashlytics

### 4. Configure Push Notifications

Add to `capacitor.config.ts`:
```typescript
plugins: {
  PushNotifications: {
    presentationOptions: ["badge", "sound", "alert"]
  }
}
```

---

## Maintenance

### Regular Updates

**Weekly:**
```bash
# Update dependencies
npm update
npx cap sync

# Check for security vulnerabilities
npm audit
npm audit fix
```

**Monthly:**
```bash
# Update Capacitor
npm install @capacitor/core@latest @capacitor/android@latest
npx cap sync

# Update Android SDK
# Open Android Studio → SDK Manager
```

### Version Management

Follow semantic versioning: `MAJOR.MINOR.PATCH`

Update in:
- `package.json` - `"version": "1.0.0"`
- `capacitor.config.ts` - app version
- Android `build.gradle` - versionCode and versionName

### Backup Strategy

1. **Code**: Git repository (GitHub)
2. **Keystore**: Store `shortflow.keystore` securely (password manager)
3. **API Keys**: Document in secure location
4. **User Data**: Base44 handles database backups

### Rollback Procedure

If critical bug in production:

1. **Firebase App Distribution**:
   - Upload previous stable APK
   - Notify testers

2. **Google Play Store**:
   - Go to Play Console → Release
   - "Promote" previous release
   - Or create new release with reverted code

---

## Troubleshooting

### Build Failures

**Gradle sync failed:**
```bash
cd android
./gradlew clean
rm -rf .gradle
npx cap sync android
```

**Out of memory:**
Add to `android/gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx4g
org.gradle.daemon=true
```

**Dependency conflicts:**
```bash
npm ls
npm dedupe
```

### Runtime Issues

**App crashes on launch:**
- Check Android Studio Logcat
- Verify `capacitor.config.ts` webDir is `dist`
- Ensure `npm run build` completed

**White screen:**
- Enable WebView debugging:
```bash
adb shell am set-debug-app -w com.shortflow.infinity
```
- Check Chrome DevTools: `chrome://inspect`

**API not working:**
- Check `.env` variables
- Verify network permissions in AndroidManifest.xml
- Test API endpoints separately

---

## Cost Estimation

### Free Tier (Recommended for start)

| Service | Free Tier | Limit |
|---------|-----------|-------|
| Base44 | ✅ | 10,000 requests/month |
| Firebase Hosting | ✅ | 1GB storage, 10GB/month |
| Firebase App Distribution | ✅ | Unlimited |
| GitHub Actions | ✅ | 2,000 minutes/month |
| Google Play Store | ❌ | $25 one-time |

### Estimated Costs (1,000 active users)

| Service | Monthly Cost |
|---------|--------------|
| Base44 Pro | $29/month |
| Firebase Blaze | ~$10-20/month |
| AI APIs (Groq) | ~$20-50/month |
| **Total** | **~$60-100/month** |

---

## Support & Resources

- **Documentation**: See README.md
- **Issues**: GitHub Issues
- **Base44 Docs**: https://docs.base44.com
- **Capacitor Docs**: https://capacitorjs.com/docs
- **Android Docs**: https://developer.android.com/guide

---

## Checklist

Before each release:

- [ ] Version bumped in all files
- [ ] Changelog updated
- [ ] Tests passing
- [ ] APK signed with release keystore
- [ ] Release notes written
- [ ] Screenshots updated (if UI changed)
- [ ] Privacy policy current
- [ ] Analytics verified
- [ ] Crashlytics enabled

---

**Last Updated**: 2024
**Version**: 1.0.0
