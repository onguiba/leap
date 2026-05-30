import { attachNavigationListeners, navigateTo } from './router';
import { setDbJson } from './app-db';
import { addToCart } from './orders';

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  barcode: string;
  prices: Array<{ store: string; price: number; }>;
}

const products: Product[] = [
  { id: 1, name: "Lait Entier Bio 1L", image: "🥛", category: "Produits laitiers", barcode: "3760074380534", prices: [{ store: "Mahima Akwa", price: 2200 }, { store: "Casino", price: 2350 }] },
  { id: 2, name: "Pain Complet 500g", image: "🍞", category: "Boulangerie", barcode: "3760074380535", prices: [{ store: "Leader Price", price: 1500 }, { store: "Carrefour", price: 1600 }] },
  { id: 3, name: "Œufs Bio x12", image: "🥚", category: "Produits frais", barcode: "3760074380536", prices: [{ store: "Santa Lucia", price: 3200 }, { store: "Orca Deco", price: 3100 }] },
  { id: 4, name: "Huile d'Olive 1L", image: "🫒", category: "Épicerie", barcode: "3760074380537", prices: [{ store: "Carrefour", price: 4500 }, { store: "Casino", price: 4400 }] },
  { id: 5, name: "Riz Basmati 2kg", image: "🍚", category: "Épicerie", barcode: "3760074380538", prices: [{ store: "Score", price: 5800 }, { store: "Super U", price: 5900 }] },
  { id: 6, name: "Poulet Fermier 1kg", image: "🍗", category: "Viandes", barcode: "3760074380539", prices: [{ store: "Leader Price", price: 8500 }, { store: "Mahima", price: 8700 }] },
  { id: 7, name: "Tomates 1kg", image: "🍅", category: "Fruits & Légumes", barcode: "3760074380540", prices: [{ store: "Casino", price: 2000 }, { store: "Santa Lucia", price: 1900 }] },
  { id: 8, name: "Bananes 1kg", image: "🍌", category: "Fruits & Légumes", barcode: "3760074380541", prices: [{ store: "Mahima", price: 1500 }, { store: "Orca Deco", price: 1450 }] },
  { id: 9, name: "Fromage Emmental 200g", image: "🧀", category: "Produits laitiers", barcode: "3760074380542", prices: [{ store: "Carrefour", price: 3500 }, { store: "Casino", price: 3600 }] },
  { id: 10, name: "Yaourt Nature x8", image: "🥛", category: "Produits laitiers", barcode: "3760074380543", prices: [{ store: "Leader Price", price: 2800 }, { store: "Super U", price: 2900 }] },
  { id: 11, name: "Pâtes Spaghetti 500g", image: "🍝", category: "Épicerie", barcode: "3760074380544", prices: [{ store: "Score", price: 1200 }, { store: "Mahima", price: 1250 }] },
  { id: 12, name: "Sauce Tomate 400g", image: "🥫", category: "Épicerie", barcode: "3760074380545", prices: [{ store: "Casino", price: 800 }, { store: "Carrefour", price: 850 }] },
  { id: 13, name: "Café Moulu 250g", image: "☕", category: "Boissons", barcode: "3760074380546", prices: [{ store: "Leader Price", price: 3200 }, { store: "Santa Lucia", price: 3300 }] },
  { id: 14, name: "Thé Vert x20", image: "🍵", category: "Boissons", barcode: "3760074380547", prices: [{ store: "Orca Deco", price: 1800 }, { store: "Super U", price: 1850 }] },
  { id: 15, name: "Jus d'Orange 1L", image: "🍊", category: "Boissons", barcode: "3760074380548", prices: [{ store: "Mahima", price: 2500 }, { store: "Casino", price: 2600 }] },
  { id: 16, name: "Eau Minérale 1.5L x6", image: "💧", category: "Boissons", barcode: "3760074380549", prices: [{ store: "Score", price: 3000 }, { store: "Leader Price", price: 2900 }] },
  { id: 17, name: "Beurre Doux 250g", image: "🧈", category: "Produits laitiers", barcode: "3760074380550", prices: [{ store: "Carrefour", price: 2200 }, { store: "Santa Lucia", price: 2150 }] },
  { id: 18, name: "Sucre Blanc 1kg", image: "🍬", category: "Épicerie", barcode: "3760074380551", prices: [{ store: "Mahima", price: 1500 }, { store: "Casino", price: 1550 }] },
  { id: 19, name: "Farine de Blé 1kg", image: "🌾", category: "Épicerie", barcode: "3760074380552", prices: [{ store: "Leader Price", price: 1200 }, { store: "Orca Deco", price: 1250 }] },
  { id: 20, name: "Sel Fin 1kg", image: "🧂", category: "Épicerie", barcode: "3760074380553", prices: [{ store: "Super U", price: 600 }, { store: "Score", price: 650 }] },
  { id: 21, name: "Poivre Noir Moulu 50g", image: "🌶️", category: "Épicerie", barcode: "3760074380554", prices: [{ store: "Casino", price: 1800 }, { store: "Carrefour", price: 1850 }] },
  { id: 22, name: "Pommes de Terre 2kg", image: "🥔", category: "Fruits & Légumes", barcode: "3760074380555", prices: [{ store: "Mahima", price: 2000 }, { store: "Santa Lucia", price: 1950 }] },
  { id: 23, name: "Oignons 1kg", image: "🧅", category: "Fruits & Légumes", barcode: "3760074380556", prices: [{ store: "Leader Price", price: 1200 }, { store: "Casino", price: 1250 }] },
  { id: 24, name: "Carottes 1kg", image: "🥕", category: "Fruits & Légumes", barcode: "3760074380557", prices: [{ store: "Orca Deco", price: 1500 }, { store: "Super U", price: 1550 }] },
  { id: 25, name: "Poisson Frais 1kg", image: "🐟", category: "Poissons", barcode: "3760074380558", prices: [{ store: "Score", price: 7500 }, { store: "Mahima", price: 7600 }] },
  { id: 26, name: "Crevettes 500g", image: "🦐", category: "Poissons", barcode: "3760074380559", prices: [{ store: "Casino", price: 9500 }, { store: "Carrefour", price: 9600 }] },
  { id: 27, name: "Bœuf Haché 500g", image: "🥩", category: "Viandes", barcode: "3760074380560", prices: [{ store: "Leader Price", price: 6500 }, { store: "Santa Lucia", price: 6600 }] },
  { id: 28, name: "Saucisses x6", image: "🌭", category: "Viandes", barcode: "3760074380561", prices: [{ store: "Orca Deco", price: 4500 }, { store: "Super U", price: 4600 }] },
  { id: 29, name: "Chocolat Noir 100g", image: "🍫", category: "Confiserie", barcode: "3760074380562", prices: [{ store: "Mahima", price: 2500 }, { store: "Casino", price: 2600 }] },
  { id: 30, name: "Biscuits 250g", image: "🍪", category: "Confiserie", barcode: "3760074380563", prices: [{ store: "Score", price: 1800 }, { store: "Leader Price", price: 1750 }] }
];

let filteredProducts = [...products];

function renderSearchBar() {
  const container = document.querySelector('.catalog-container');
  if (!container) return;

  container.innerHTML = `
    <div style="background: white; padding: 25px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin-bottom: 25px;">
      <h2 style="margin: 0 0 15px 0; font-size: 1.5em; color: #333;">🔍 Rechercher un produit</h2>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <input type="text" id="search-input" placeholder="Tapez le nom du produit (ex: lait, pain, riz...)" style="flex: 1; min-width: 250px; padding: 12px 15px; border: 2px solid #ddd; border-radius: 8px; font-size: 1em;">
        <button id="search-btn" style="padding: 12px 25px; background: #00d084; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1em; font-weight: 600;">Rechercher</button>
        <button id="reset-btn" style="padding: 12px 25px; background: #666; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1em;">Réinitialiser</button>
      </div>
      <p style="margin: 12px 0 0 0; color: #666; font-size: 0.9em;">💡 ${filteredProducts.length} produit(s) trouvé(s)</p>
    </div>
    <div id="products-grid"></div>
  `;

  renderProducts();
  attachSearchListeners();
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div style="text-align: center; padding: 50px; background: white; border-radius: 12px;">
        <div style="font-size: 3em; margin-bottom: 15px;">😕</div>
        <h2>Aucun produit trouvé</h2>
        <p style="color: #666; margin: 10px 0;">Essayez avec un autre terme de recherche</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px;">
      ${filteredProducts.map(product => {
        const lowestPrice = Math.min(...product.prices.map(p => p.price));
        const bestStore = product.prices.find(p => p.price === lowestPrice);
        
        return `
          <div style="background: white; border-radius: 10px; padding: 18px; box-shadow: 0 2px 6px rgba(0,0,0,0.08); transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.08)'">
            <div style="text-align: center; margin-bottom: 12px;">
              <div style="font-size: 3.5em; margin-bottom: 8px;">${product.image}</div>
              <h3 style="margin: 0; font-size: 1.05em; min-height: 40px; line-height: 1.3;">${product.name}</h3>
              <p style="color: #888; font-size: 0.85em; margin: 4px 0;">${product.category}</p>
              <p style="color: #aaa; font-size: 0.8em; font-family: monospace; margin: 4px 0;">📊 ${product.barcode}</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #e8f5e9 0%, #f1f8f4 100%); padding: 10px; border-radius: 6px; margin: 12px 0;">
              <div style="font-size: 0.85em; color: #666; margin-bottom: 3px;">Meilleur prix:</div>
              <div style="font-size: 1.6em; font-weight: bold; color: #00d084;">${lowestPrice.toLocaleString()} FCFA</div>
              <div style="font-size: 0.85em; color: #666; margin-top: 3px;">chez ${bestStore?.store}</div>
            </div>
            
            <div style="display: flex; gap: 6px; margin-top: 12px;">
              <button class="btn-delivery" data-product-id="${product.id}" style="flex: 1; padding: 10px; background: #00d084; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9em; font-weight: 600; transition: background 0.2s;" onmouseover="this.style.background='#00b872'" onmouseout="this.style.background='#00d084'">
                🚚 Livraison
              </button>
              <button class="btn-pickup" data-product-id="${product.id}" style="flex: 1; padding: 10px; background: #2196F3; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9em; font-weight: 600; transition: background 0.2s;" onmouseover="this.style.background='#1976D2'" onmouseout="this.style.background='#2196F3'">
                🏪 Sur place
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  attachProductListeners();
}

function attachSearchListeners() {
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const searchBtn = document.getElementById('search-btn');
  const resetBtn = document.getElementById('reset-btn');

  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      if (searchInput) searchProducts(searchInput.value);
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
      renderSearchBar();
    });
  }
}

function searchProducts(query: string) {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      p.barcode.includes(searchTerm)
    );
  }
  renderSearchBar();
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
    alert(`✅ Commande confirmée pour retrait!\n\nProduit: ${product.name}\nCode-barres: ${product.barcode}\nMagasin: ${bestStore?.store}\nPrix: ${lowestPrice.toLocaleString()} FCFA\n\n📍 Paiement sur place lors du retrait`);
  } else {
    alert('✅ Produit ajouté au panier ! Vous pouvez continuer vos achats.');
  }
}

export function initProduct() {
  console.log('initProduct called');
  const container = document.querySelector('.catalog-container');
  console.log('Container found:', container);
  
  filteredProducts = [...products];
  renderSearchBar();
  attachNavigationListeners();
}

export function getCartItems() {
  return [];
}
