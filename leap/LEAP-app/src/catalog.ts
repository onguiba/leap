import { attachNavigationListeners, navigateTo } from './router';
import { getAllProducts, searchProducts as dbSearchProducts, getStoresByCity } from './database';
import { getCurrentCity } from './city-selector';
import { generateProductCardImage } from './barcode-generator';
import { setDbJson } from './app-db';
import { addToCart } from './orders';

const products = getAllProducts();
let filteredProducts = [...products];

// ============================================================
// MODAL DE COMPARAISON DE PRIX
// ============================================================

function showPriceComparisonModal(productId: number) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  // Trier les prix du moins cher au plus cher
  const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedPrices[0]?.price;

  // Noms réels des supermarchés
  const storeDisplayNames: Record<string, string> = {
    'Supermarché A': 'Mahima Akwa',
    'Supermarché B': 'Casino Bonanjo',
    'Supermarché C': 'Carrefour Market',
    'Supermarché D': 'Santa Lucia',
    'Supermarché E': 'Score Supermarché',
    'Supermarché F': 'Orca Deco',
    'Supermarché G': 'Leader Price',
    'Supermarché H': 'Super U Douala',
  };

  const storeRows = sortedPrices.map((p, index) => {
    const displayName = storeDisplayNames[p.store] || p.store;
    const isBest = p.price === lowestPrice;
    const badge = isBest ? '<span style="background:#00d084;color:white;font-size:0.75em;padding:2px 8px;border-radius:12px;margin-left:8px;">Meilleur prix</span>' : '';
    const rowBg = isBest ? '#f0fdf4' : (index % 2 === 0 ? '#fafafa' : 'white');
    const stockInfo = p.stock !== undefined ? `<span style="color:#999;font-size:0.85em;">${p.stock} en stock</span>` : '';

    return `
      <tr style="background:${rowBg};">
        <td style="padding:14px 16px; font-weight:${isBest ? 'bold' : 'normal'};">
          <span style="font-size:1.1em;">🏪</span>
          ${displayName}${badge}
        </td>
        <td style="padding:14px 16px; text-align:right; font-weight:bold; color:${isBest ? '#00d084' : '#333'}; font-size:1.1em;">
          ${p.price.toLocaleString()} FCFA
        </td>
        <td style="padding:14px 16px; text-align:center;">${stockInfo}</td>
        <td style="padding:14px 16px; text-align:center;">
          <button class="modal-btn-order" data-product-id="${productId}" data-store="${p.store}" data-price="${p.price}"
            style="padding:8px 16px; background:#00d084; color:white; border:none; border-radius:6px; cursor:pointer; font-size:0.9em; font-weight:bold;">
            Commander
          </button>
        </td>
      </tr>
    `;
  }).join('');

  const modalHtml = `
    <div id="price-modal-overlay" style="
      position:fixed; top:0; left:0; width:100%; height:100%; 
      background:rgba(0,0,0,0.6); z-index:9999; 
      display:flex; align-items:center; justify-content:center;
      padding:16px; box-sizing:border-box;
    ">
      <div style="
        background:white; border-radius:16px; width:100%; max-width:640px;
        max-height:90vh; overflow-y:auto; box-shadow:0 20px 60px rgba(0,0,0,0.3);
      ">
        <!-- En-tête -->
        <div style="padding:24px 24px 16px; border-bottom:1px solid #eee; display:flex; align-items:center; justify-content:space-between;">
          <div>
            <h2 style="margin:0; font-size:1.3em; color:#222;">${product.name}</h2>
            <p style="margin:4px 0 0; color:#888; font-size:0.9em;">${product.category} • ${sortedPrices.length} supermarchés</p>
          </div>
          <button id="modal-close-btn" style="
            background:none; border:none; cursor:pointer; font-size:1.5em; 
            color:#999; padding:4px 8px; border-radius:8px;
          ">✕</button>
        </div>

        <!-- Meilleur prix en vedette -->
        <div style="padding:16px 24px; background:#f0fdf4; border-bottom:1px solid #d1fae5;">
          <div style="font-size:0.9em; color:#666;">🏆 Meilleur prix disponible</div>
          <div style="font-size:2em; font-weight:bold; color:#00d084;">${lowestPrice?.toLocaleString()} FCFA</div>
          <div style="font-size:0.9em; color:#555;">chez ${storeDisplayNames[sortedPrices[0]?.store] || sortedPrices[0]?.store}</div>
        </div>

        <!-- Tableau des prix -->
        <div style="padding:0;">
          <table style="width:100%; border-collapse:collapse;">
            <thead>
              <tr style="background:#f5f5f5;">
                <th style="padding:12px 16px; text-align:left; font-size:0.85em; color:#666; font-weight:600;">SUPERMARCHÉ</th>
                <th style="padding:12px 16px; text-align:right; font-size:0.85em; color:#666; font-weight:600;">PRIX</th>
                <th style="padding:12px 16px; text-align:center; font-size:0.85em; color:#666; font-weight:600;">STOCK</th>
                <th style="padding:12px 16px; text-align:center; font-size:0.85em; color:#666; font-weight:600;">ACTION</th>
              </tr>
            </thead>
            <tbody>
              ${storeRows}
            </tbody>
          </table>
        </div>

        <!-- Pied de modal -->
        <div style="padding:16px 24px; border-top:1px solid #eee; text-align:center;">
          <button id="modal-close-btn-2" style="
            padding:12px 32px; background:#eee; color:#555; border:none; 
            border-radius:8px; cursor:pointer; font-size:1em;
          ">Fermer</button>
        </div>
      </div>
    </div>
  `;

  // Injecter le modal dans le DOM
  const existing = document.getElementById('price-modal-overlay');
  if (existing) existing.remove();

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  // Fermer le modal
  const closeModal = () => {
    const overlay = document.getElementById('price-modal-overlay');
    if (overlay) overlay.remove();
  };

  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  document.getElementById('modal-close-btn-2')?.addEventListener('click', closeModal);
  document.getElementById('price-modal-overlay')?.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).id === 'price-modal-overlay') closeModal();
  });

  // Boutons Commander dans le modal
  document.querySelectorAll('.modal-btn-order').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const el = e.currentTarget as HTMLElement;
      const pId = parseInt(el.getAttribute('data-product-id')!);
      const store = el.getAttribute('data-store')!;
      const price = parseInt(el.getAttribute('data-price')!);
      const prod = products.find(p => p.id === pId);
      if (!prod) return;

      const orderData: any = {
        productId: pId,
        store,
        productImage: prod.image,
        price,
        shippingFee: 500,
        shippingTime: '30-45 min',
        distance: '1.5 km',
        orderType: 'delivery',
        productName: prod.name,
        barcode: prod.barcode
      };
      addToCart(orderData);
      closeModal();
      alert(`✅ ${prod.name} ajouté au panier !\nMagasin: ${storeDisplayNames[store] || store}\nPrix: ${price.toLocaleString()} FCFA`);
    });
  });
}

function renderSearchBar() {
  return `
    <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-bottom: 30px;">
      <h2 style="margin: 0 0 20px 0; font-size: 1.8em;">Rechercher un produit</h2>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <input type="text" id="search-input" placeholder="Tapez le nom du produit (ex: lait, pain, riz...)" style="flex: 1; min-width: 300px; padding: 15px; border: 2px solid #ddd; border-radius: 10px; font-size: 1.1em;">
        <button id="search-btn" style="padding: 15px 30px; background: #00d084; color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 1.1em; font-weight: bold;">Rechercher</button>
        <button id="scanner-btn" style="padding: 15px 30px; background: #2196F3; color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 1.1em; font-weight: bold; display: flex; align-items: center; gap: 8px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          Scanner
        </button>
        <button id="reset-btn" style="padding: 15px 30px; background: #666; color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 1.1em;">Réinitialiser</button>
      </div>
      <p style="margin: 15px 0 0 0; color: #666; font-size: 0.95em;">💡 Astuce : Utilisez le scanner pour comparer les prix directement en magasin</p>
    </div>
  `;
}

function renderProducts() {
  const container = document.querySelector('.catalog-products');
  if (!container) return;

  // Filtrer les produits selon la ville sélectionnée
  const currentCity = getCurrentCity();
  const cityStores = getStoresByCity(currentCity);
  const cityStoreNames = cityStores.map(s => s.name);
  
  // Filtrer les produits qui ont au moins un prix dans la ville actuelle
  const productsInCity = filteredProducts.filter(product => 
    product.prices.some(p => cityStoreNames.includes(p.store))
  );

  if (productsInCity.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px; background: white; border-radius: 15px;">
        <div style="font-size: 4em; margin-bottom: 20px; opacity: 0.3;"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div>
        <h2>Aucun produit trouvé à ${currentCity}</h2>
        <p style="color: #666; margin: 15px 0;">Essayez de changer de ville ou de rechercher un autre produit</p>
        <button id="reset-search" style="padding: 12px 25px; background: #00d084; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1em; margin-top: 15px;">Voir tous les produits</button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="margin-bottom: 20px;">
      <h3 style="font-size: 1.5em;">${productsInCity.length} produit(s) trouvé(s) à ${currentCity}</h3>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
      ${productsInCity.map(product => {
        // Filtrer les prix pour la ville actuelle
        const cityPrices = product.prices.filter(p => cityStoreNames.includes(p.store));
        const lowestPrice = Math.min(...cityPrices.map(p => p.price));
        const bestStore = cityPrices.find(p => p.price === lowestPrice);
        
        return `
          <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'">
            <div style="text-align: center; margin-bottom: 15px;">
              <div style="margin-bottom: 10px;">${generateProductCardImage(product.barcode, product.image, product.imageUrl)}</div>
              <h3 style="margin: 0; font-size: 1.1em; min-height: 45px;">${product.name}</h3>
              <p style="color: #666; font-size: 0.9em; margin: 5px 0;">${product.category}</p>
            </div>
            
            <div style="background: #e8f5e9; padding: 12px; border-radius: 8px; margin: 15px 0;">
              <div style="font-size: 0.9em; color: #666; margin-bottom: 5px;">Meilleur prix à ${currentCity}:</div>
              <div style="font-size: 1.8em; font-weight: bold; color: #00d084;">${lowestPrice.toLocaleString()} FCFA</div>
              <div style="font-size: 0.9em; color: #666; margin-top: 5px;">chez ${bestStore?.store}</div>
            </div>
            
            <div style="display: flex; gap: 8px; margin-top: 15px;">
              <button class="btn-delivery" data-product-id="${product.id}" style="flex: 1; padding: 12px; background: #00d084; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 0.95em; font-weight: bold;">
                Livraison
              </button>
              <button class="btn-pickup" data-product-id="${product.id}" style="flex: 1; padding: 12px; background: #2196F3; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 0.95em; font-weight: bold;">
                Sur place
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  attachProductListeners();
}

function attachProductListeners() {
  document.querySelectorAll('.btn-delivery').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt((e.currentTarget as HTMLElement).getAttribute('data-product-id')!);
      handleOrder(productId, 'delivery');
    });
  });

  document.querySelectorAll('.btn-pickup').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = parseInt((e.currentTarget as HTMLElement).getAttribute('data-product-id')!);
      handleOrder(productId, 'pickup');
    });
  });

  const resetBtn = document.getElementById('reset-search');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      filteredProducts = [...products];
      renderProducts();
    });
  }
}

function handleOrder(productId: number, type: 'delivery' | 'pickup') {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const lowestPrice = Math.min(...product.prices.map(p => p.price));
  const bestStore = product.prices.find(p => p.price === lowestPrice);

  const orderData: any = {
    productId: productId,
    store: bestStore?.store || 'Mahima Akwa',
    productImage: product.image,
    price: lowestPrice,
    shippingFee: type === 'delivery' ? 500 : 0,
    shippingTime: type === 'delivery' ? "30-45 min" : "Retrait immédiat",
    distance: "1.5 km",
    orderType: type,
    productName: product.name,
    barcode: product.barcode
  };

  addToCart(orderData);
  
  if (type === 'pickup') {
    alert(`Commande confirmée!\n\nProduit: ${product.name}\nMagasin: ${bestStore?.store}\nPrix: ${lowestPrice.toLocaleString()} FCFA\n\nPaiement sur place lors du retrait`);
  } else {
    alert('✅ Produit ajouté au panier ! Vous pouvez continuer vos achats.');
  }
}

function searchProducts(query: string) {
  filteredProducts = dbSearchProducts(query);
  renderProducts();
}

export function initCatalog() {
  const container = document.querySelector('.catalog-container');
  if (container) {
    container.innerHTML = renderSearchBar() + '<div class="catalog-products"></div>';
  }
  
  filteredProducts = [...products];
  renderProducts();
  attachNavigationListeners();

  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const searchBtn = document.getElementById('search-btn');
  const scannerBtn = document.getElementById('scanner-btn');
  const resetBtn = document.getElementById('reset-btn');

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      if (searchInput) searchProducts(searchInput.value);
    });
  }

  if (scannerBtn) {
    scannerBtn.addEventListener('click', () => {
      navigateTo('scanner');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchProducts(searchInput.value);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      filteredProducts = [...products];
      renderProducts();
    });
  }
  
  // Écouter les changements de ville
  window.addEventListener('cityChanged', () => {
    renderProducts();
  });
}
