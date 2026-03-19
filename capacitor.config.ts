import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shortflow.infinity',
  appName: 'ShortFlow Infinity',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: false
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
      signingType: "apksigner",
      releaseType: "AAB"
    },
    minSdkVersion: 31,
    targetSdkVersion: 34,
    compileSdkVersion: 34
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      launchFadeOutDuration: 1000,
      backgroundColor: "#0a0a0f",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#6366f1",
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#0a0a0f",
      overlaysWebView: false
    },
    Keyboard: {
      resize: "body",
      style: "dark",
      resizeOnFullScreen: true
    }
  }
};

export default config;
