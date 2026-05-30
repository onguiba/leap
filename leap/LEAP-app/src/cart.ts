import { navigateTo } from './router';
import { getCart, removeFromCart, saveCheckoutSelection } from './orders';

export function initCart() {
  const cartItems = getCart();
  const cartContainer = document.querySelector('.cart-items');
  if (!cartContainer) return;

  // Track which items are checked (default to all)
  const selectedIndexes = new Set<number>(cartItems.map((_, i) => i));

  function render() {
    if (cartItems.length === 0) {
      cartContainer!.innerHTML = `
        <div style="text-align:center; padding:4rem 2rem; background:white; border-radius:var(--radius-lg); border:1px solid var(--border);">
          <div style="font-size:4rem; margin-bottom:1rem;">🛒</div>
          <h2 style="font-size:1.3rem; font-weight:800; margin-bottom:0.5rem; color:var(--dark);">Votre panier est vide</h2>
          <p style="color:var(--gray-2); margin-bottom:1.5rem; font-size:0.9rem;">Ajoutez des produits pour commencer vos achats</p>
          <button class="btn btn-primary" data-nav="product">Voir les produits</button>
        </div>
      `;
      // Bind navigation for the new button
      document.querySelectorAll('[data-nav="product"]').forEach(btn => btn.addEventListener('click', () => navigateTo('product')));
      return;
    }

    let subtotal = 0;
    let maxShipping = 0;

    const itemsHtml = cartItems.map((store, i) => {
      const isSelected = selectedIndexes.has(i);
      if (isSelected) {
        subtotal += store.price || 0;
        maxShipping = Math.max(maxShipping, store.shippingFee || 0);
      }

      return `
        <div class="cart-item-card" style="display: flex; align-items: center; gap: 1rem; position: relative;">
          <input type="checkbox" class="cart-item-cb" data-index="${i}" ${isSelected ? 'checked' : ''} style="width:20px;height:20px;cursor:pointer;">
          <div style="font-size:3rem; flex-shrink: 0;">${store.logo || store.productImage || '🛒'}</div>
          <div style="flex:1; min-width: 0;">
            <div style="font-weight:700; font-size:1rem; color:var(--dark); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${store.productName || 'Produit'}</div>
            <div style="color:var(--gray-2); font-size:0.85rem; margin-top:3px;">📍 ${store.store || store.name}</div>
            <div style="color:var(--gray-2); font-size:0.85rem;">📦 ${store.shippingTime || '30-45 min'}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:1.1rem; font-weight:800; color:var(--primary);">${(store.price || 0).toLocaleString()} FCFA</div>
            <button class="cart-remove-btn" data-index="${i}" style="margin-top: 5px; background: none; border: none; color: red; font-size: 0.8rem; cursor: pointer; text-decoration: underline;">Retirer</button>
          </div>
        </div>
      `;
    }).join('');

    const total = subtotal + maxShipping;

    cartContainer!.innerHTML = `
      <div style="margin-bottom: 1rem; font-size: 0.9rem;">
        Sélectionnez les commandes que vous souhaitez valider :
      </div>
      ${itemsHtml}
      
      <div class="cart-summary" style="margin-top:1.5rem;">
        <div class="cart-summary-row">
          <span style="color:var(--gray-2);">Sous-total</span>
          <span style="font-weight:600;">${subtotal.toLocaleString()} FCFA</span>
        </div>
        <div class="cart-summary-row">
          <span style="color:var(--gray-2);">Livraison (max)</span>
          <span style="font-weight:600; color:${maxShipping === 0 ? 'var(--primary)' : 'var(--dark)'};">
            ${maxShipping === 0 ? 'GRATUITE' : maxShipping.toLocaleString() + ' FCFA'}
          </span>
        </div>
        <div class="cart-summary-row" style="border-bottom:none; padding-top:0.75rem;">
          <span style="font-weight:800; font-size:1rem;">Total</span>
          <span class="cart-total">${total.toLocaleString()} FCFA</span>
        </div>
      </div>
    `;

    // Listeners for checkboxes
    document.querySelectorAll('.cart-item-cb').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const index = parseInt(target.dataset.index!);
        if (target.checked) selectedIndexes.add(index);
        else selectedIndexes.delete(index);
        render(); // re-render to update totals
      });
    });

    // Listeners for remove
    document.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt((e.target as HTMLElement).dataset.index!);
        removeFromCart(index);
        cartItems.splice(index, 1);
        selectedIndexes.delete(index);
        // Shift selected indexes
        const newSelected = new Set<number>();
        selectedIndexes.forEach(idx => {
          if (idx > index) newSelected.add(idx - 1);
          else if (idx < index) newSelected.add(idx);
        });
        selectedIndexes.clear();
        newSelected.forEach(i => selectedIndexes.add(i));
        
        render();
      });
    });
  }

  render();

  document.querySelector('.checkout-btn')?.addEventListener('click', () => {
    if (selectedIndexes.size === 0) {
      alert("Veuillez sélectionner au moins un article.");
      return;
    }

    const selectedItems = cartItems.filter((_, i) => selectedIndexes.has(i));
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.price || 0), 0);
    const maxShipping = Math.max(...selectedItems.map(item => item.shippingFee || 0), 0);
    const combinedStoreName = Array.from(new Set(selectedItems.map(i => i.store || i.name))).join(', ');
    
    // Create a combined checkout selection
    const combinedSelection = {
      productId: 0,
      productName: selectedItems.length + (selectedItems.length > 1 ? " articles sélectionnés" : " article sélectionné"),
      barcode: "MULTIPLE",
      store: combinedStoreName,
      price: subtotal,
      shippingFee: maxShipping,
      orderType: selectedItems.some(s => s.orderType === 'delivery') ? 'delivery' as const : 'pickup' as const,
      logo: '🛒',
      childItems: selectedItems
    };

    saveCheckoutSelection(combinedSelection);
    navigateTo('checkout');
  });
}
