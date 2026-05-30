// PWA Installation prompt logic
import { getDbValue, setDbValue } from './app-db';

let deferredPrompt: any = null;

export function initPWAInstall() {
  const promptElement = document.getElementById('pwa-install-prompt');
  const installBtn = document.getElementById('pwa-install-btn');
  const closeBtn = document.getElementById('pwa-close-btn');
  const instructionsElement = document.getElementById('pwa-instructions');
  const descriptionElement = document.getElementById('pwa-description');

  if (!promptElement || !installBtn || !closeBtn) return;

  // Check if already dismissed
  const dismissed = getDbValue('pwa-install-dismissed');
  if (dismissed === 'true') return;

  // Detect platform
  const userAgent = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
  const isAndroid = /android/.test(userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                       (window.navigator as any).standalone === true;

  // Don't show if already installed
  if (isStandalone) return;

  // Handle beforeinstallprompt event (Android/Desktop Chrome)
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showPrompt('android');
  });

  // Show iOS instructions if on iOS Safari
  if (isIOS && isSafari) {
    setTimeout(() => showPrompt('ios'), 2000);
  } else if (isAndroid) {
    // For Android, wait for beforeinstallprompt or show after delay
    setTimeout(() => {
      if (!deferredPrompt) {
        showPrompt('android');
      }
    }, 3000);
  } else {
    // Desktop or other platforms
    setTimeout(() => showPrompt('desktop'), 3000);
  }

  function showPrompt(platform: 'ios' | 'android' | 'desktop') {
    if (!instructionsElement || !descriptionElement || !promptElement || !installBtn) return;

    if (platform === 'ios') {
      descriptionElement.textContent = 'Installez MALAP METSI sur votre iPhone/iPad';
      instructionsElement.innerHTML = `
        <div class="pwa-steps">
          <div class="pwa-step">
            <span class="pwa-step-icon">1️⃣</span>
            <span>Appuyez sur le bouton Partager <strong>⎙</strong></span>
          </div>
          <div class="pwa-step">
            <span class="pwa-step-icon">2️⃣</span>
            <span>Sélectionnez <strong>"Sur l'écran d'accueil"</strong></span>
          </div>
          <div class="pwa-step">
            <span class="pwa-step-icon">3️⃣</span>
            <span>Appuyez sur <strong>"Ajouter"</strong></span>
          </div>
        </div>
      `;
      installBtn.textContent = 'J\'ai compris';
      installBtn.onclick = () => {
        promptElement.style.display = 'none';
        setDbValue('pwa-install-dismissed', 'true');
      };
    } else if (platform === 'android') {
      descriptionElement.textContent = 'Installez MALAP METSI sur votre appareil Android';
      instructionsElement.innerHTML = `
        <div class="pwa-steps">
          <div class="pwa-step">
            <span class="pwa-step-icon">📱</span>
            <span>Accès rapide depuis votre écran d'accueil</span>
          </div>
          <div class="pwa-step">
            <span class="pwa-step-icon">⚡</span>
            <span>Fonctionne hors ligne</span>
          </div>
          <div class="pwa-step">
            <span class="pwa-step-icon">🔔</span>
            <span>Recevez des notifications de promotions</span>
          </div>
        </div>
      `;
      installBtn.textContent = 'Installer maintenant';
      installBtn.onclick = async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            console.log('PWA installed');
          }
          deferredPrompt = null;
        }
        promptElement.style.display = 'none';
        setDbValue('pwa-install-dismissed', 'true');
      };
    } else {
      descriptionElement.textContent = 'Installez MALAP METSI sur votre ordinateur';
      instructionsElement.innerHTML = `
        <div class="pwa-steps">
          <div class="pwa-step">
            <span class="pwa-step-icon">💻</span>
            <span>Accès rapide depuis votre bureau</span>
          </div>
          <div class="pwa-step">
            <span class="pwa-step-icon">⚡</span>
            <span>Expérience application native</span>
          </div>
          <div class="pwa-step">
            <span class="pwa-step-icon">🚀</span>
            <span>Plus rapide et plus fluide</span>
          </div>
        </div>
      `;
      installBtn.textContent = 'Installer';
      installBtn.onclick = async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            console.log('PWA installed');
          }
          deferredPrompt = null;
        }
        promptElement.style.display = 'none';
        setDbValue('pwa-install-dismissed', 'true');
      };
    }

    promptElement.style.display = 'flex';
  }

  // Close button handler
  closeBtn.onclick = () => {
    promptElement.style.display = 'none';
    setDbValue('pwa-install-dismissed', 'true');
  };

  // Close on background click
  promptElement.onclick = (e) => {
    if (e.target === promptElement) {
      promptElement.style.display = 'none';
      setDbValue('pwa-install-dismissed', 'true');
    }
  };
}
