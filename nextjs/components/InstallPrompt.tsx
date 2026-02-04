'use client';

import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if already installed (standalone mode)
    const standalone = window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // Check if iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(ios);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      
      // Show banner after a short delay (let user see the app first)
      setTimeout(() => {
        setShowBanner(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // For iOS, show the banner after delay since there's no beforeinstallprompt
    if (ios && !standalone) {
      setTimeout(() => {
        setShowBanner(true);
      }, 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowBanner(false);
      setInstallPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    // Store dismissal in localStorage to not show again for 7 days
    localStorage.setItem('installPromptDismissed', Date.now().toString());
  };

  // Don't show if already installed
  if (isStandalone) return null;

  // Check if user dismissed recently
  useEffect(() => {
    const dismissed = localStorage.getItem('installPromptDismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < sevenDays) {
        setShowBanner(false);
      }
    }
  }, []);

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1e40af 100%)' }}
    >
      <div className="max-w-lg mx-auto relative">
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-5 w-5 text-white" />
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <img
              src="/icons/icon-72.png"
              alt="WSSC Water"
              className="w-14 h-14 rounded-xl"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg">Install WSSC Water</h3>
            <p className="text-white/80 text-sm">
              {isIOS
                ? 'Tap the share button, then "Add to Home Screen"'
                : 'Add to your home screen for quick access'}
            </p>
          </div>

          {!isIOS && (
            <button
              onClick={handleInstallClick}
              className="flex-shrink-0 px-4 py-2 bg-white text-blue-900 font-semibold rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Install
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
