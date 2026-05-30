// Gestion du sélecteur de ville
import { getDbValue, setDbValue } from './app-db';

let currentCity = 'Douala';

export function initCitySelector() {
  const btn = document.getElementById('city-selector-btn');
  const dropdown = document.getElementById('city-dropdown');
  const cityNameEl = document.getElementById('selected-city');
  
  if (!btn || !dropdown || !cityNameEl) return;
  
  // Toggle dropdown
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = dropdown.style.display === 'block';
    dropdown.style.display = isVisible ? 'none' : 'block';
  });
  
  // Fermer le dropdown si on clique ailleurs
  document.addEventListener('click', () => {
    dropdown.style.display = 'none';
  });
  
  // Empêcher la fermeture si on clique dans le dropdown
  dropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  // Sélection d'une ville
  const cityOptions = dropdown.querySelectorAll('.city-option');
  cityOptions.forEach(option => {
    option.addEventListener('click', () => {
      const city = option.getAttribute('data-city');
      if (city) {
        currentCity = city;
        cityNameEl.textContent = city;
        dropdown.style.display = 'none';
        
        // Sauvegarder dans localStorage
        setDbValue('selectedCity', city);
        
        // Afficher une notification
        showCityChangeNotification(city);
        
        // Déclencher un événement personnalisé pour recharger les données
        window.dispatchEvent(new CustomEvent('cityChanged', { detail: { city } }));
        
        console.log(`Ville changée: ${city}`);
      }
    });
  });
  
  // Charger la ville sauvegardée
  const savedCity = getDbValue('selectedCity');
  if (savedCity) {
    currentCity = savedCity;
    cityNameEl.textContent = savedCity;
  }
}

function showCityChangeNotification(city: string) {
  // Créer une notification temporaire
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: linear-gradient(135deg, #00d084 0%, #00b872 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    font-weight: 600;
  `;
  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="font-size: 1.5em;">📍</span>
      <span>Ville changée: ${city}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Supprimer après 3 secondes
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

export function getCurrentCity(): string {
  return currentCity;
}

// Ajouter les animations CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
