import { attachNavigationListeners, navigateTo } from './router';
import { setDbJson } from './app-db';
import { createOrderFromSelection, getCheckoutSelection } from './orders';

const paymentMethods = [
  { id: 'orange', name: 'Orange Money', icon: '🟧', desc: 'Paiement mobile sécurisé', color: '#ff6600' },
  { id: 'mtn', name: 'MTN Mobile Money', icon: '🟨', desc: 'MoMo rapide et fiable', color: '#ffcc00' },
  { id: 'card', name: 'Carte Bancaire', icon: '💳', desc: 'Visa, Mastercard acceptées', color: '#1a73e8' }
];

let selectedPayment = 'orange';

function renderPaymentMethods() {
  const container = document.querySelector('.payment-methods');
  if (!container) return;
  container.innerHTML = paymentMethods.map(m => `
    <div class="payment-method-card ${m.id === selectedPayment ? 'selected' : ''}" data-id="${m.id}">
      <div style="width:42px;height:42px;border-radius:10px;background:${m.color}22;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;">${m.icon}</div>
      <div style="flex:1;">
        <div style="font-weight:700;font-size:0.95rem;color:var(--dark);">${m.name}</div>
        <div style="font-size:0.8rem;color:var(--gray-2);">${m.desc}</div>
      </div>
      <div class="payment-check">${m.id === selectedPayment ? '✓' : ''}</div>
    </div>
  `).join('');

  document.querySelectorAll('.payment-method-card').forEach(card => {
    card.addEventListener('click', () => {
      selectedPayment = (card as HTMLElement).dataset.id!;
      renderPaymentMethods();
    });
  });
}

function renderOrderSummary() {
  const store = getCheckoutSelection();
  const container = document.querySelector('.order-items');
  if (!container || !store?.store) return;
  const total = (store.price || 0) + (store.shippingFee || 0);
  container.innerHTML = `
    <div class="cart-summary-row">
      <span style="color:var(--gray-2);">Produit</span>
      <span style="font-weight:600;font-size:0.9rem;">${store.productName || 'Produit'}</span>
    </div>
    <div class="cart-summary-row">
      <span style="color:var(--gray-2);">Magasin</span>
      <span style="font-weight:600;">${store.store}</span>
    </div>
    <div class="cart-summary-row">
      <span style="color:var(--gray-2);">Prix</span>
      <span style="font-weight:600;">${(store.price || 0).toLocaleString()} FCFA</span>
    </div>
    <div class="cart-summary-row">
      <span style="color:var(--gray-2);">Livraison</span>
      <span style="font-weight:600;color:${store.shippingFee === 0 ? 'var(--primary)' : 'var(--dark)'};">
        ${store.shippingFee === 0 ? 'GRATUITE' : (store.shippingFee || 0).toLocaleString() + ' FCFA'}
      </span>
    </div>
    <div class="cart-summary-row" style="border-bottom:none;padding-top:0.75rem;">
      <span style="font-weight:800;">Total</span>
      <span class="cart-total">${total.toLocaleString()} FCFA</span>
    </div>
  `;
}

export function initCheckout() {
  renderPaymentMethods();
  renderOrderSummary();
  attachNavigationListeners();

  document.querySelector('.confirm-payment-btn')?.addEventListener('click', () => {
    const store = getCheckoutSelection();
    if (!store) return;
    const method = paymentMethods.find(p => p.id === selectedPayment)!;
    const order = createOrderFromSelection(store, method.name);
    const invoice = {
      number: order.id,
      date: order.date,
      store: store.store || 'Magasin',
      product: store.productName || 'Produit',
      price: store.price || 0,
      shipping: store.shippingFee || 0,
      total: (store.price || 0) + (store.shippingFee || 0),
      payment: method.name,
      status: order.status
    };
    setDbJson('invoice', invoice);
    setDbJson('last_invoice', invoice);
    navigateTo('confirmation');
  });
}
