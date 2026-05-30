// Client API pour MALAP METSI avec authentification

const API_BASE_URL: string =
  (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3001';

// Gestion du token JWT
let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
}

export function getAuthToken(): string | null {
  if (!authToken) {
    authToken = localStorage.getItem('authToken');
  }
  return authToken;
}

export function clearAuthToken() {
  authToken = null;
  localStorage.removeItem('authToken');
}

// Fonction générique pour les appels API
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string> || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    
    // Si 401, déconnecter l'utilisateur
    if (res.status === 401) {
      clearAuthToken();
    }
    
    throw new Error(`API ${path} failed: ${res.status} ${text}`);
  }

  return (await res.json()) as T;
}

// ============================================================
// TYPES
// ============================================================

export interface User {
  id: number;
  name: string;
  email?: string;
  phone: string;
  role: string;
  walletBalance?: number;
  loyaltyPoints?: number;
  loyaltyLevel?: string;
}

export interface Product {
  id: number;
  name: string;
  image?: string;
  imageUrl?: string;
  category: string;
  barcode: string;
  description?: string;
  prices: Array<{
    id: number;
    price: number;
    stock?: number;
    store: Store;
  }>;
  reviews?: Review[];
}

export interface Store {
  id: number;
  name: string;
  logo?: string;
  city: string;
  address: string;
  phone?: string;
  hours?: string;
  delivery: boolean;
  deliveryFee: number;
  minOrder: number;
  rating: number;
  latitude?: number;
  longitude?: number;
}

export interface Order {
  id: string;
  userId: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered';
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod?: string;
  deliveryAddress?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  delivery?: Delivery;
}

export interface OrderItem {
  id: number;
  productId: number;
  storeId: number;
  quantity: number;
  price: number;
  product: Product;
  store: Store;
}

export interface Delivery {
  id: number;
  orderId: string;
  driverId?: number;
  status: string;
  estimatedTime?: string;
  actualTime?: string;
  driver?: DeliveryDriver;
}

export interface DeliveryDriver {
  id: number;
  name: string;
  phone?: string;
  vehicle?: string;
  rating: number;
}

export interface Review {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  comment?: string;
  verified: boolean;
  createdAt: string;
  user: {
    name: string;
  };
}

// ============================================================
// AUTHENTIFICATION
// ============================================================

export async function apiRegister(data: {
  name: string;
  email?: string;
  phone: string;
  password: string;
  address?: string;
}): Promise<{ ok: boolean; token: string; user: User }> {
  const result = await apiFetch<{ ok: boolean; token: string; user: User }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  
  if (result.ok && result.token) {
    setAuthToken(result.token);
  }
  
  return result;
}

export async function apiLogin(data: {
  identifier: string; // email ou phone
  password: string;
}): Promise<{ ok: boolean; token: string; user: User }> {
  const result = await apiFetch<{ ok: boolean; token: string; user: User }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  
  if (result.ok && result.token) {
    setAuthToken(result.token);
  }
  
  return result;
}

export function apiLogout() {
  clearAuthToken();
}

// ============================================================
// PRODUITS
// ============================================================

export async function apiGetProducts(): Promise<{ ok: boolean; products: Product[] }> {
  return apiFetch('/api/products');
}

export async function apiGetProduct(id: number): Promise<{ ok: boolean; product: Product }> {
  return apiFetch(`/api/products/${id}`);
}

export async function apiGetProductByBarcode(barcode: string): Promise<{ ok: boolean; product: Product }> {
  return apiFetch(`/api/products/barcode/${encodeURIComponent(barcode)}`);
}

export async function apiSearchProducts(query: string): Promise<{ ok: boolean; products: Product[] }> {
  return apiFetch(`/api/products/search?q=${encodeURIComponent(query)}`);
}

// ============================================================
// MAGASINS
// ============================================================

export async function apiGetStores(): Promise<{ ok: boolean; stores: Store[] }> {
  return apiFetch('/api/stores');
}

export async function apiGetStoresByCity(city: string): Promise<{ ok: boolean; stores: Store[] }> {
  return apiFetch(`/api/stores/city/${encodeURIComponent(city)}`);
}

// ============================================================
// COMMANDES
// ============================================================

export async function apiCreateOrder(order: {
  items: Array<{
    productId: number;
    storeId: number;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  deliveryAddress: string;
}): Promise<{ ok: boolean; order: Order }> {
  return apiFetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify(order)
  });
}

export async function apiGetOrder(orderId: string): Promise<{ ok: boolean; order: Order }> {
  return apiFetch(`/api/orders/${encodeURIComponent(orderId)}`);
}

export async function apiGetOrders(): Promise<{ ok: boolean; orders: Order[] }> {
  return apiFetch('/api/orders');
}

export async function apiUpdateOrderStatus(
  orderId: string,
  status: Order['status'],
  driverId?: number
): Promise<{ ok: boolean; order: Order }> {
  return apiFetch(`/api/orders/${encodeURIComponent(orderId)}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status, driverId })
  });
}

// ============================================================
// PROFIL UTILISATEUR
// ============================================================

export async function apiGetProfile(): Promise<{ ok: boolean; user: User }> {
  return apiFetch('/api/user/profile');
}

// ============================================================
// UTILITAIRES
// ============================================================

export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
