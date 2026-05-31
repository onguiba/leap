import { attachNavigationListeners } from './router';
import { getProductByBarcode, getStoresByCity } from './database';
import { getCurrentCity } from './city-selector';
import { addToCart } from './orders';

interface ScannedProduct {
  barcode: string;
  name: string;
  image: string;
  currentStore: string;
  currentPrice: number;
  otherStores: Array<{
    name: string;
    price: number;
    distance: string;
    savings: number;
  }>;
}

let currentStream: MediaStream | null = null;

// Simulation de scan avec code-barres
function simulateScan(barcode?: string) {
  const testBarcode = barcode || '3760074380534'; // Code par défaut
  
  showNotification('🔍 Recherche du produit...', 'info');
  
  setTimeout(() => {
    const product = getProductByBarcode(testBarcode);
    
    if (product) {
      const currentCity = getCurrentCity();
      const cityStores = getStoresByCity(currentCity);
      const cityStoreNames = cityStores.map(s => s.name);
      
      // Filtrer les prix pour la ville actuelle
      const cityPrices = product.prices.filter(p => cityStoreNames.includes(p.store));
      
      if (cityPrices.length === 0) {
        showNotification('❌ Produit non disponible dans cette ville', 'error');
        return;
      }
      
      // Simuler le magasin actuel (premier de la liste)
      const currentStore = cityPrices[0];
      const otherStores = cityPrices.slice(1).map(store => ({
        name: store.store,
        price: store.price,
        distance: '2.5 km', // Distance simulée
        savings: currentStore.price - store.price
      }));
      
      const scannedProduct: ScannedProduct = {
        barcode: testBarcode,
        name: product.name,
        image: '📦',
        currentStore: currentStore.store,
        currentPrice: currentStore.price,
        otherStores: otherStores
      };
      
      showNotification('✅ Produit trouvé !', 'success');
      displayComparisonResults(scannedProduct);
    } else {
      showNotification('❌ Produit non trouvé dans notre base de données', 'error');
    }
  }, 1500);
}

// Démarrer la caméra
async function startCamera() {
  try {
    showNotification('📷 Démarrage de la caméra...', 'info');
    
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { 
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    });
    
    currentStream = stream;
    const video = document.getElementById('scanner-video') as HTMLVideoElement;
    const videoContainer = document.getElementById('video-container');
    const cameraBtn = document.getElementById('camera-btn');
    const galleryBtn = document.getElementById('gallery-btn');
    
    if (video && videoContainer) {
      video.srcObject = stream;
      videoContainer.style.display = 'block';
      
      // Masquer les boutons de démarrage
      if (cameraBtn) cameraBtn.style.display = 'none';
      if (galleryBtn) galleryBtn.style.display = 'none';
      
      showNotification('📷 Caméra prête ! Cliquez sur "Capturer" pour prendre une photo', 'success');
    }
  } catch (error) {
    console.error('Erreur caméra:', error);
    showNotification('❌ Impossible d\'accéder à la caméra. Utilisez la galerie photo.', 'error');
  }
}

// Arrêter la caméra
function stopCamera() {
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
    currentStream = null;
  }
  
  const video = document.getElementById('scanner-video') as HTMLVideoElement;
  const videoContainer = document.getElementById('video-container');
  const cameraBtn = document.getElementById('camera-btn');
  const galleryBtn = document.getElementById('gallery-btn');
  
  if (video) {
    video.srcObject = null;
  }
  
  if (videoContainer) {
    videoContainer.style.display = 'none';
  }
  
  // Réafficher les boutons de démarrage
  if (cameraBtn) cameraBtn.style.display = 'inline-block';
  if (galleryBtn) galleryBtn.style.display = 'inline-block';
}

// Capturer une image depuis la caméra
function captureImage() {
  const video = document.getElementById('scanner-video') as HTMLVideoElement;
  const canvas = document.getElementById('scanner-canvas') as HTMLCanvasElement;
  const imagePreviewContainer = document.getElementById('image-preview-container');
  const imagePreview = document.getElementById('preview-image') as HTMLImageElement;
  
  if (video && canvas && imagePreviewContainer && imagePreview) {
    // Configurer le canvas aux dimensions de la vidéo
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Dessiner l'image de la vidéo sur le canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convertir le canvas en image
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      imagePreview.src = imageDataUrl;
      imagePreviewContainer.style.display = 'block';
      
      // Arrêter la caméra
      stopCamera();
      
      showNotification('📸 Image capturée ! Analyse en cours...', 'info');
      
      // Simulation de détection après 2 secondes
      setTimeout(() => {
        showNotification('🎯 Code-barres détecté dans l\'image !', 'success');
        simulateScan();
      }, 2000);
    }
  }
}

// Gérer l'upload d'image
function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageContainer = document.getElementById('image-preview-container');
      const imagePreview = document.getElementById('preview-image') as HTMLImageElement;
      
      if (imageContainer && imagePreview && e.target?.result) {
        imagePreview.src = e.target.result as string;
        imageContainer.style.display = 'block';
        
        showNotification('🖼️ Image chargée ! Analyse en cours...', 'info');
        
        // Simulation de détection après 2 secondes
        setTimeout(() => {
          showNotification('🎯 Code-barres détecté dans l\'image !', 'success');
          simulateScan();
        }, 2000);
      }
    };
    reader.readAsDataURL(file);
  }
}

// Afficher une notification
function showNotification(message: string, type: 'success' | 'info' | 'error' = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed; top: 20px; right: 20px; z-index: 10000;
    padding: 15px 20px; border-radius: 8px; color: white; font-weight: 600;
    animation: slideIn 0.3s ease; max-width: 300px; word-wrap: break-word;
    background: ${type === 'success' ? '#00d084' : type === 'error' ? '#f44336' : '#2196F3'};
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

function attachOrderButtons() {
  // Boutons de commande pour le magasin actuel (retrait)
  document.querySelectorAll('.btn-order-current').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const store = target.getAttribute('data-store')!;
      const price = parseInt(target.getAttribute('data-price')!);
      const productName = target.getAttribute('data-product-name')!;
      const barcode = target.getAttribute('data-barcode')!;
      
      handleScanOrder(productName, barcode, store, price, 'pickup');
    });
  });

  // Boutons de livraison pour le magasin actuel
  document.querySelectorAll('.btn-delivery-current').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const store = target.getAttribute('data-store')!;
      const price = parseInt(target.getAttribute('data-price')!);
      const productName = target.getAttribute('data-product-name')!;
      const barcode = target.getAttribute('data-barcode')!;
      
      handleScanOrder(productName, barcode, store, price, 'delivery');
    });
  });

  // Boutons de commande pour les autres magasins (retrait)
  document.querySelectorAll('.btn-order-store').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const store = target.getAttribute('data-store')!;
      const price = parseInt(target.getAttribute('data-price')!);
      const productName = target.getAttribute('data-product-name')!;
      const barcode = target.getAttribute('data-barcode')!;
      
      handleScanOrder(productName, barcode, store, price, 'pickup');
    });
  });

  // Boutons de livraison pour les autres magasins
  document.querySelectorAll('.btn-delivery-store').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const store = target.getAttribute('data-store')!;
      const price = parseInt(target.getAttribute('data-price')!);
      const productName = target.getAttribute('data-product-name')!;
      const barcode = target.getAttribute('data-barcode')!;
      
      handleScanOrder(productName, barcode, store, price, 'delivery');
    });
  });
}

function handleScanOrder(productName: string, barcode: string, store: string, price: number, orderType: 'pickup' | 'delivery') {
  addToCart({
    productId: 0, // ID générique pour les produits scannés
    productName: productName,
    productImage: 'scan', // Image générique pour les produits scannés
    barcode: barcode,
    store: store,
    price: price,
    orderType: orderType,
    shippingFee: orderType === 'delivery' ? 500 : 0
  });
  alert('✅ Produit ajouté au panier ! Vous pouvez continuer vos achats.');
}

function displayComparisonResults(product: ScannedProduct) {
  const resultsSection = document.querySelector('.scan-results');
  const scannerControls = document.querySelector('.scanner-controls');
  const currentCity = getCurrentCity();
  
  if (resultsSection && scannerControls) {
    scannerControls.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    
    const productName = document.querySelector('.scanned-product-name');
    if (productName) {
      productName.innerHTML = `<span style="font-size: 2em; margin-right: 0.5rem;">${product.image}</span>${product.name}`;
    }
    
    const storesList = document.querySelector('.comparison-stores-list');
    if (storesList) {
      storesList.innerHTML = `
        <div style="background: #e8f5e9; padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #00d084;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="background: #00d084; color: white; padding: 5px 10px; border-radius: 5px; display: inline-block; margin-bottom: 10px; font-size: 0.9em;">📍 VOUS ÊTES ICI</div>
              <h3 style="margin: 5px 0; font-size: 1.3em;">${product.currentStore}</h3>
              <p style="margin: 5px 0; color: #666;">📍 ${currentCity}</p>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 2em; font-weight: bold; color: #00d084;">${product.currentPrice.toLocaleString()} FCFA</div>
            </div>
          </div>
          <div style="display: flex; gap: 10px; margin-top: 15px;">
            <button class="btn-order-current" data-store="${product.currentStore}" data-price="${product.currentPrice}" data-product-name="${product.name}" data-barcode="${product.barcode}" style="flex: 1; padding: 12px; background: #00d084; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 1em;">
              🛒 Commander ici (Retrait)
            </button>
            <button class="btn-delivery-current" data-store="${product.currentStore}" data-price="${product.currentPrice}" data-product-name="${product.name}" data-barcode="${product.barcode}" style="flex: 1; padding: 12px; background: #2196F3; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 1em;">
              🚚 Livraison (+500 FCFA)
            </button>
          </div>
        </div>
        
        <h3 style="margin: 20px 0;">Comparez avec d'autres magasins à ${currentCity}:</h3>
        
        ${product.otherStores.length > 0 ? product.otherStores.map(store => `
          <div style="background: white; padding: 20px; margin: 10px 0; border-radius: 10px; border: 2px solid ${store.savings > 0 ? '#00d084' : '#ddd'};">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="flex: 1;">
                <h3 style="margin: 0; font-size: 1.2em;">${store.name}</h3>
                <p style="margin: 5px 0; color: #666;">📍 ${store.distance}</p>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 1.5em; font-weight: bold;">${store.price.toLocaleString()} FCFA</div>
                ${store.savings > 0 
                  ? `<div style="color: #00d084; font-weight: bold; margin-top: 5px;">💰 Économisez ${store.savings} FCFA</div>`
                  : store.savings < 0
                  ? `<div style="color: #f44336; margin-top: 5px;">+${Math.abs(store.savings)} FCFA</div>`
                  : '<div style="color: #666; margin-top: 5px;">Même prix</div>'
                }
              </div>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 15px;">
              <button class="btn-order-store" data-store="${store.name}" data-price="${store.price}" data-product-name="${product.name}" data-barcode="${product.barcode}" style="flex: 1; padding: 10px; background: #00d084; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                🛒 Commander (Retrait)
              </button>
              <button class="btn-delivery-store" data-store="${store.name}" data-price="${store.price}" data-product-name="${product.name}" data-barcode="${product.barcode}" style="flex: 1; padding: 10px; background: #2196F3; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                🚚 Livraison (+500)
              </button>
              <button onclick="window.open('https://www.google.com/maps/search/${encodeURIComponent(store.name + ' ' + currentCity)}', '_blank')" style="flex: 0.5; padding: 10px; background: #666; color: white; border: none; border-radius: 5px; cursor: pointer;">
                📍
              </button>
            </div>
          </div>
        `).join('') : '<p style="text-align: center; color: #666; padding: 20px;">Aucun autre magasin disponible dans cette ville</p>'}
      `;
      
      // Attacher les événements aux boutons de commande
      attachOrderButtons();
    }
  }
}

export function initScanner() {
  attachNavigationListeners();
  
  const cameraBtn = document.getElementById('camera-btn');
  const stopCameraBtn = document.getElementById('stop-camera-btn');
  const captureBtn = document.getElementById('capture-btn');
  const galleryBtn = document.getElementById('gallery-btn');
  const closeImageBtn = document.getElementById('close-image-btn');
  const fileInput = document.getElementById('file-input') as HTMLInputElement;
  const manualInput = document.querySelector('.manual-barcode-input') as HTMLInputElement;
  const manualSearchBtn = document.querySelector('.manual-search-btn');
  
  // Bouton caméra
  if (cameraBtn) {
    cameraBtn.addEventListener('click', () => {
      startCamera();
    });
  }
  
  // Bouton arrêter caméra
  if (stopCameraBtn) {
    stopCameraBtn.addEventListener('click', () => {
      stopCamera();
      showNotification('📷 Caméra arrêtée', 'info');
    });
  }
  
  // Bouton capturer image
  if (captureBtn) {
    captureBtn.addEventListener('click', () => {
      captureImage();
    });
  }
  
  // Bouton galerie
  if (galleryBtn && fileInput) {
    galleryBtn.addEventListener('click', () => {
      fileInput.click();
    });
  }
  
  // Bouton fermer image
  if (closeImageBtn) {
    closeImageBtn.addEventListener('click', () => {
      const imageContainer = document.getElementById('image-preview-container');
      if (imageContainer) {
        imageContainer.style.display = 'none';
      }
    });
  }
  
  // Upload d'image
  if (fileInput) {
    fileInput.addEventListener('change', handleImageUpload);
  }
  
  // Recherche manuelle
  if (manualSearchBtn) {
    manualSearchBtn.addEventListener('click', () => {
      if (manualInput && manualInput.value) {
        simulateScan(manualInput.value);
      } else {
        showNotification('⚠️ Veuillez entrer un code-barres', 'error');
      }
    });
  }

  if (manualInput) {
    manualInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && manualInput.value) {
        simulateScan(manualInput.value);
      }
    });
  }
  
  // Nettoyer la caméra si on quitte la page
  window.addEventListener('beforeunload', () => {
    stopCamera();
  });
}