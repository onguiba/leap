import { PRODUCTS, STORES, type Product, type Store } from './database';
import { getDbJson, setDbJson } from './app-db';

const PRODUCTS_KEY = 'pc_products_data';
const STORES_KEY = 'pc_stores_data';

let hydrated = false;

function saveProducts() {
  setDbJson(PRODUCTS_KEY, PRODUCTS);
}

function saveStores() {
  setDbJson(STORES_KEY, STORES);
}

export function hydrateAdminData() {
  if (hydrated) return;
  hydrated = true;

  const parsedProducts = getDbJson<Product[] | null>(PRODUCTS_KEY, null);
  if (parsedProducts) PRODUCTS.splice(0, PRODUCTS.length, ...parsedProducts);

  const parsedStores = getDbJson<Store[] | null>(STORES_KEY, null);
  if (parsedStores) STORES.splice(0, STORES.length, ...parsedStores);
}

export function addProduct(input: {
  name: string;
  category: string;
  barcode: string;
  image?: string;
  imageUrl?: string;
  store?: string;
  price: number;
}) {
  const nextId = PRODUCTS.length ? Math.max(...PRODUCTS.map(p => p.id)) + 1 : 1;
  const fallbackStore = input.store || STORES[0]?.name || 'Supermarché A';

  PRODUCTS.push({
    id: nextId,
    name: input.name,
    category: input.category,
    barcode: input.barcode,
    image: input.image || 'produit',
    imageUrl: input.imageUrl || '',
    prices: [{ store: fallbackStore, price: input.price }]
  });

  saveProducts();
}

export function updateProductName(productId: number, name: string) {
  const p = PRODUCTS.find(product => product.id === productId);
  if (!p) return false;
  p.name = name;
  saveProducts();
  return true;
}

export function updateProductImage(productId: number, imageUrl: string, fallbackImage?: string) {
  const p = PRODUCTS.find(product => product.id === productId);
  if (!p) return false;
  p.imageUrl = imageUrl;
  if (fallbackImage) p.image = fallbackImage;
  saveProducts();
  return true;
}

export function addOrUpdatePrice(productId: number, store: string, price: number) {
  const p = PRODUCTS.find(product => product.id === productId);
  if (!p) return false;
  const existing = p.prices.find(row => row.store === store);
  if (existing) existing.price = price;
  else p.prices.push({ store, price });
  saveProducts();
  return true;
}

export function addStore(input: { name: string; city: string; address?: string; phone?: string }) {
  const nextId = STORES.length ? Math.max(...STORES.map(s => s.id)) + 1 : 1;
  STORES.push({
    id: nextId,
    name: input.name,
    logo: input.name.charAt(0).toUpperCase(),
    city: input.city,
    address: input.address || 'Adresse non renseignee',
    phone: input.phone || '+237 600 000 000',
    hours: '8h00 - 20h00',
    delivery: true,
    deliveryFee: 500,
    minOrder: 5000,
    rating: 4.0,
    coordinates: { lat: 0, lng: 0 }
  });
  saveStores();
}

export function removeStore(storeId: number) {
  const storeIndex = STORES.findIndex(store => store.id === storeId);
  if (storeIndex === -1) return false;

  const [removedStore] = STORES.splice(storeIndex, 1);
  PRODUCTS.forEach((product) => {
    product.prices = product.prices.filter((price) => price.store !== removedStore.name);
  });

  saveStores();
  saveProducts();
  return true;
}
