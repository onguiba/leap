import { navigateTo } from './router';
import { getAllProducts, searchProducts, getStoresByCity } from './database';
import { getCurrentCity } from './city-selector';
import { generateProductCardImage } from './barcode-generator';
import { addToCart } from './orders';

const products = getAllProducts();
const POPULAR_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 10 produits populaires page d'accueil
let filteredProducts = products.filter(p => POPULAR_IDS.includes(p.id));
const onCityChanged = () => renderProducts();

function renderProducts() {
  const container = document.querySelector('.popular-products-grid');
  console.log('renderProducts called');
  console.log('Container found:', container);
  console.log('Products count:', filteredProducts.length);
  
  if (!container) {
    console.error('Container .popular-products-grid not found!');
    return;
  }

  // Obtenir la ville actuelle et les magasins de cette ville
  const currentCity = getCurrentCity();
  const cityStores = getStoresByCity(currentCity);
  const cityStoreNames = cityStores.map(s => s.name);

  const countDiv = document.getElementById('product-count');
  if (countDiv) {
    countDiv.textContent = `${filteredProducts.length} Produits Disponibles à ${currentCity}`;
  }

  container.innerHTML = filteredProducts.map(product => {
    // Filtrer les prix pour la ville actuelle
    const cityPrices = product.prices.filter(p => cityStoreNames.includes(p.store));
    
    if (cityPrices.length === 0) return ''; // Ne pas afficher si pas disponible dans la ville
    
    const minPrice = Math.min(...cityPrices.map(p => p.price));
    const bestStore = cityPrices.find(p => p.price === minPrice)?.store;
    
    return `
      <div class="product-card product-card-horizontal">
        <div class="product-card-top">
          <div class="product-image">${generateProductCardImage(product.barcode, product.image, product.imageUrl)}</div>
          <h3 class="product-name">${product.name}</h3>
          <span class="product-category">${product.category}</span>
        </div>
        <div class="product-card-body">
          <div class="product-best-price">
            <div class="product-best-price-label">Meilleur prix à ${currentCity}</div>
            <div class="product-price">${minPrice.toLocaleString()} FCFA</div>
            <div class="product-best-store">Meilleur chez : ${bestStore}</div>
          </div>
          <div class="product-stores">
            <div class="product-stores-title">Disponible dans ${cityPrices.length} magasin(s)</div>
            ${cityPrices.slice(0, 3).map(p => `
              <div class="product-store-row">
                <span class="product-store-name">${p.store}</span>
                <span class="product-store-price">${p.price.toLocaleString()} FCFA</span>
              </div>
            `).join('')}
            ${cityPrices.length > 3 ? `<div class="product-more-stores">+${cityPrices.length - 3} autre(s) magasin(s)</div>` : ''}
          </div>
          <div class="product-card-actions">
            <button class="btn-order-delivery btn btn-primary" data-product-id="${product.id}" data-product-name="${product.name.replace(/"/g, '&quot;')}" onclick="event.stopPropagation();">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>Livraison
            </button>
            <button class="btn-order-pickup btn btn-secondary" data-product-id="${product.id}" data-product-name="${product.name.replace(/"/g, '&quot;')}" onclick="event.stopPropagation();">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:5px"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>Retrait
            </button>
          </div>
        </div>
      </div>
    `;
  }).filter(html => html !== '').join('');

  attachProductListeners();
}

function attachProductListeners() {
  // Search functionality
  const searchInput = document.getElementById('search-input-home') as HTMLInputElement;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value;
      filteredProducts = searchProducts(query);
      renderProducts();
    });
  }

  // Delivery buttons
  document.querySelectorAll('.btn-order-delivery').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = parseInt((e.currentTarget as HTMLElement).getAttribute('data-product-id')!);
      const productName = (e.currentTarget as HTMLElement).getAttribute('data-product-name')!;
      handleOrder(productId, 'delivery', productName);
    });
  });

  // Pickup buttons
  document.querySelectorAll('.btn-order-pickup').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = parseInt((e.currentTarget as HTMLElement).getAttribute('data-product-id')!);
      const productName = (e.currentTarget as HTMLElement).getAttribute('data-product-name')!;
      handleOrder(productId, 'pickup', productName);
    });
  });
}

export function initPopularProductsSection() {
  filteredProducts = products.filter(p => POPULAR_IDS.includes(p.id));
  renderProducts();
  window.removeEventListener('cityChanged', onCityChanged);
  window.addEventListener('cityChanged', onCityChanged);
}

// Fonction globale pour commander un produit
(window as any).orderProduct = function(productId: number, productName: string) {
  handleOrder(productId, 'delivery', productName);
};

function handleOrder(productId: number, type: 'delivery' | 'pickup', _productName: string) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const minPrice = Math.min(...product.prices.map(p => p.price));
  const bestStore = product.prices.find(p => p.price === minPrice)!;

  addToCart({
    productId: product.id,
    productName: product.name,
    productImage: product.image,
    barcode: product.barcode,
    store: bestStore.store,
    price: bestStore.price,
    orderType: type,
    shippingFee: type === 'delivery' ? 500 : 0
  });
  
  alert('✅ Produit ajouté au panier ! Vous pouvez continuer vos achats.');
}

export function initHome() {
  console.log('initHome called');
  
  // Attacher les événements aux boutons de navigation
  document.querySelectorAll('[data-nav]').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      const page = target.getAttribute('data-nav');
      if (page) {
        navigateTo(page as any);
      }
    });
  });

  // Logo click
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', () => {
      navigateTo('home');
    });
  }

  // Cart icon
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      navigateTo('cart');
    });
  }
  
}
