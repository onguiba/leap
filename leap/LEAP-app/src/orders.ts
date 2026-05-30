import { getDbJson, setDbJson } from './app-db';
import { getCurrentUser } from './auth';
import type { Order } from './database';
import { apiCreateOrder, apiUpdateOrderStatus } from './api/backend';

const ORDERS_KEY = 'pc_orders';
const LAST_ORDER_KEY = 'pc_last_order_id';

export interface CheckoutSelection {
  productId: number;
  productName: string;
  productImage?: string;
  barcode: string;
  store: string;
  price: number;
  orderType: 'delivery' | 'pickup';
  shippingFee: number;
  shippingTime?: string;
  distance?: string;
  logo?: string;
  name?: string;
  childItems?: CheckoutSelection[];
}

function normalizeSelection(raw: any): CheckoutSelection | null {
  if (!raw) return null;

  const store = raw.store || raw.name;
  const productName = raw.productName;
  const barcode = raw.barcode;

  if (!store || !productName || !barcode) return null;

  return {
    productId: Number(raw.productId ?? raw.id ?? 0),
    productName,
    productImage: raw.productImage || raw.logo || '',
    barcode,
    store,
    price: Number(raw.price || 0),
    orderType: raw.orderType === 'pickup' ? 'pickup' : 'delivery',
    shippingFee: Number(raw.shippingFee || 0),
    shippingTime: raw.shippingTime || (raw.orderType === 'pickup' ? 'Retrait immediat' : '30-45 min'),
    distance: raw.distance || '1.5 km',
    logo: raw.logo || raw.productImage || '',
    name: store
  };
}

export function getCheckoutSelection(): CheckoutSelection | null {
  const preferred = normalizeSelection(getDbJson<any>('selectedStore', null));
  if (preferred) return preferred;
  return normalizeSelection(getDbJson<any>('currentOrder', null));
}

export function saveCheckoutSelection(selection: CheckoutSelection): void {
  const payload = {
    ...selection,
    name: selection.store,
    logo: selection.logo || selection.productImage || ''
  };
  setDbJson('selectedStore', payload);
  setDbJson('currentOrder', payload);
}

export function getOrders(): Order[] {
  return getDbJson<Order[]>(ORDERS_KEY, []);
}

export function getCart(): CheckoutSelection[] {
  return getDbJson<CheckoutSelection[]>('pc_cart', []);
}

export function addToCart(item: CheckoutSelection): void {
  const cart = getCart();
  cart.push(item);
  setDbJson('pc_cart', cart);
}

export function removeFromCart(index: number): void {
  const cart = getCart();
  cart.splice(index, 1);
  setDbJson('pc_cart', cart);
}

export function createOrderFromSelection(selection: CheckoutSelection, paymentMethod: string): Order {
  const user = getCurrentUser();
  const now = new Date();
  const order: Order = {
    id: `PC-${now.getTime()}`,
    userId: user?.telephone === 'admin' ? 0 : 1,
    date: now.toLocaleDateString('fr-FR'),
    status: 'pending',
    items: selection.childItems ? selection.childItems.map(s => ({
      productId: s.productId,
      productName: s.productName,
      quantity: 1,
      price: s.price,
      store: s.store
    })) : [
      {
        productId: selection.productId,
        productName: selection.productName,
        quantity: 1,
        price: selection.price,
        store: selection.store
      }
    ],
    subtotal: selection.price,
    deliveryFee: selection.shippingFee,
    total: selection.price + selection.shippingFee,
    paymentMethod,
    deliveryAddress: selection.orderType === 'pickup' ? 'Retrait en magasin' : 'Adresse client'
  };

  const orders = getOrders();
  orders.unshift(order);
  setDbJson(ORDERS_KEY, orders);
  setDbJson(LAST_ORDER_KEY, order.id);

  // Synchronisation backend (fire-and-forget)
  // Permet au tracking/admin de fonctionner aussi côté serveur.
  const apiOrder = {
    items: order.items.map(item => ({
      productId: item.productId,
      storeId: 1, // Default store ID
      quantity: item.quantity,
      price: item.price
    })),
    subtotal: order.subtotal,
    deliveryFee: order.deliveryFee,
    total: order.total,
    paymentMethod: order.paymentMethod,
    deliveryAddress: order.deliveryAddress
  };
  void apiCreateOrder(apiOrder).catch((err) => {
    console.warn('[API] createOrder failed (local still works):', err);
  });

  return order;
}

export function getLastOrder(): Order | null {
  const lastId = getDbJson<string | null>(LAST_ORDER_KEY, null);
  if (!lastId) return null;
  return getOrders().find((order) => order.id === lastId) || null;
}

export function updateOrderStatus(
  orderId: string,
  status: Order['status'],
  deliveryDriver?: Order['deliveryDriver']
): boolean {
  const orders = getOrders();
  const order = orders.find((entry) => entry.id === orderId);
  if (!order) return false;
  order.status = status;
  if (deliveryDriver) order.deliveryDriver = deliveryDriver;
  setDbJson(ORDERS_KEY, orders);
  if (getDbJson<string | null>(LAST_ORDER_KEY, null) === orderId) {
    setDbJson(LAST_ORDER_KEY, orderId);
  }

  // Synchronisation backend (fire-and-forget)
  void apiUpdateOrderStatus(orderId, status, undefined).catch((err) => {
    console.warn('[API] updateOrderStatus failed (local still works):', err);
  });

  return true;
}

export function getPendingOrders(): Order[] {
  return getOrders().filter((order) => order.status === 'pending');
}
