import { useEffect, useState } from 'react';
import { App } from '@capacitor/app';
import { Keyboard } from '@capacitor/keyboard';
import { Network } from '@capacitor/network';

export function useMobileOptimized() {
  const [isOnline, setIsOnline] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [appState, setAppState] = useState('active');

  useEffect(() => {
    // Network status
    Network.getStatus().then(status => setIsOnline(status.connected));
    const networkListener = Network.addListener('networkStatusChange', (status) => {
      setIsOnline(status.connected);
    });

    // Keyboard events
    const keyboardShow = Keyboard.addListener('keyboardWillShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardHide = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardVisible(false);
    });

    // App state
    const appStateChange = App.addListener('appStateChange', ({ isActive }) => {
      setAppState(isActive ? 'active' : 'background');
    });

    // Back button handling
    const backButton = App.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        App.exitApp();
      }
    });

    return () => {
      networkListener.remove();
      keyboardShow.remove();
      keyboardHide.remove();
      appStateChange.remove();
      backButton.remove();
    };
  }, []);

  return { isOnline, keyboardVisible, appState };
}
