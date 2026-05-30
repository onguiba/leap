import { getAllProducts, getAllStores } from './database';
import { logout } from './auth';
import { navigateTo } from './router';
import { addOrUpdatePrice, addProduct, addStore, removeStore, updateProductImage, updateProductName } from './admin-data';
import { addPromotion, getPromotionCount, updatePromotionPrice } from './promotions';
import { getPendingOrders, updateOrderStatus } from './orders';
import { generateProductCardImage } from './barcode-generator';

type AdminFieldType = 'text' | 'number' | 'select';

interface AdminFieldConfig {
  name: string;
  label: string;
  type: AdminFieldType;
  placeholder?: string;
  value?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string; }>;
  fullWidth?: boolean;
}

interface AdminActionConfig {
  title: string;
  description: string;
  submitLabel: string;
  fields: AdminFieldConfig[];
  onSubmit: (data: Record<string, string>) => { ok: boolean; message: string; };
}

let currentAction: string | null = null;

function getStoreOptions() {
  return getAllStores().map((store) => ({ value: store.name, label: `${store.name} (${store.city})` }));
}

function renderProductsViewHtml(): string {
  const products = getAllProducts();

  if (!products.length) {
    return `
      <div class="admin-form-empty">
        <strong>Aucun produit disponible</strong>
        <span>Ajoutez d'abord un produit depuis le formulaire.</span>
      </div>
    `;
  }

  return `
    <div class="admin-view-products-grid">
      ${products.map((p) => {
        const prices = p.prices || [];
        const minPrice = prices.length ? Math.min(...prices.map((x) => x.price)) : null;
        const bestStore = minPrice === null ? '' : (prices.find((x) => x.price === minPrice)?.store || '');
        return `
          <div class="admin-view-product-card">
            <div class="admin-view-product-image">
              ${generateProductCardImage(p.barcode, p.image, p.imageUrl)}
            </div>
            <div class="admin-view-product-title" title="${p.name}">${p.name}</div>
            <div class="admin-view-product-meta">${p.category}</div>
            <div class="admin-view-product-meta" style="font-family: monospace;">${p.barcode}</div>
            <div class="admin-view-product-best">
              <span class="admin-view-product-best-label">Meilleur prix :</span>
              <span class="admin-view-product-best-value">
                ${minPrice === null ? 'N/A' : `${minPrice.toLocaleString()} FCFA`}
              </span>
              ${bestStore ? `<span class="admin-view-product-best-store">chez ${bestStore}</span>` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function getActionConfigs(): Record<string, AdminActionConfig> {
  const firstStore = getAllStores()[0];
  const pendingOrders = getPendingOrders();

  return {
    'add-product': {
      title: 'Ajouter un produit',
      description: 'Renseignez les informations du produit et son prix initial.',
      submitLabel: 'Ajouter le produit',
      fields: [
        { name: 'name', label: 'Nom du produit', type: 'text', placeholder: 'Nouveau produit', required: true },
        { name: 'category', label: 'Categorie', type: 'text', placeholder: 'Epicerie', value: 'Epicerie', required: true },
        { name: 'barcode', label: 'Code-barres', type: 'text', value: `${Date.now()}`, required: true },
        { name: 'price', label: 'Prix initial (FCFA)', type: 'number', value: '1000', required: true }
      ],
      onSubmit: (data) => {
        addProduct({
          name: data.name,
          category: data.category,
          barcode: data.barcode,
          price: Math.max(0, Number(data.price || 0))
        });
        return { ok: true, message: 'Produit ajoute. Il apparaitra automatiquement dans les pages produits.' };
      }
    },
    'edit-product': {
      title: 'Modifier un produit',
      description: 'Mettez a jour le nom d un produit existant.',
      submitLabel: 'Modifier le produit',
      fields: [
        { name: 'id', label: 'ID du produit', type: 'number', value: '1', required: true },
        { name: 'name', label: 'Nouveau nom', type: 'text', placeholder: 'Produit modifie', required: true }
      ],
      onSubmit: (data) => {
        const ok = updateProductName(Number(data.id), data.name);
        return { ok, message: ok ? 'Produit modifie avec succes.' : 'Produit introuvable.' };
      }
    },
    'edit-product-image': {
      title: 'Modifier la photo produit',
      description: 'Changez l URL de la photo et, si besoin, le texte image de secours.',
      submitLabel: 'Mettre a jour la photo',
      fields: [
        { name: 'id', label: 'ID du produit', type: 'number', value: '1', required: true },
        { name: 'imageUrl', label: 'URL de la photo', type: 'text', value: '/IMAGES/produit.jpg', required: true, fullWidth: true },
        { name: 'fallbackImage', label: 'Texte/image de secours', type: 'text', value: 'produit' }
      ],
      onSubmit: (data) => {
        const ok = updateProductImage(Number(data.id), data.imageUrl, data.fallbackImage || undefined);
        return { ok, message: ok ? 'Photo du produit modifiee avec succes.' : 'Produit introuvable.' };
      }
    },
    'add-price': {
      title: 'Ajouter un prix',
      description: 'Ajoutez un prix a un produit pour un supermarche.',
      submitLabel: 'Ajouter le prix',
      fields: [
        { name: 'id', label: 'ID du produit', type: 'number', value: '1', required: true },
        { name: 'store', label: 'Magasin', type: 'select', value: firstStore?.name || '', options: getStoreOptions(), required: true },
        { name: 'price', label: 'Prix (FCFA)', type: 'number', value: '1000', required: true }
      ],
      onSubmit: (data) => {
        const ok = addOrUpdatePrice(Number(data.id), data.store, Number(data.price || 0));
        return { ok, message: ok ? 'Prix ajoute avec succes.' : 'Produit introuvable.' };
      }
    },
    'edit-price': {
      title: 'Modifier un prix',
      description: 'Mettez a jour le prix d un produit pour un magasin donne.',
      submitLabel: 'Mettre a jour le prix',
      fields: [
        { name: 'id', label: 'ID du produit', type: 'number', value: '1', required: true },
        { name: 'store', label: 'Magasin', type: 'select', value: firstStore?.name || '', options: getStoreOptions(), required: true },
        { name: 'price', label: 'Nouveau prix (FCFA)', type: 'number', value: '1500', required: true }
      ],
      onSubmit: (data) => {
        const ok = addOrUpdatePrice(Number(data.id), data.store, Number(data.price || 0));
        return { ok, message: ok ? 'Prix modifie avec succes.' : 'Produit introuvable.' };
      }
    },
    'add-store': {
      title: 'Ajouter un supermarche',
      description: 'Creez rapidement un nouveau supermarche dans une ville.',
      submitLabel: 'Ajouter le supermarche',
      fields: [
        { name: 'name', label: 'Nom du magasin', type: 'text', placeholder: 'Nouveau Supermarche', required: true },
        { name: 'city', label: 'Ville', type: 'text', value: 'Douala', required: true }
      ],
      onSubmit: (data) => {
        addStore({ name: data.name, city: data.city });
        return { ok: true, message: 'Magasin ajoute avec succes.' };
      }
    },
    'delete-store': {
      title: 'Supprimer un supermarche',
      description: 'Supprimez un magasin et retirez ses prix associes des produits.',
      submitLabel: 'Supprimer le supermarche',
      fields: [
        { name: 'id', label: 'ID du supermarche', type: 'number', value: '1', required: true }
      ],
      onSubmit: (data) => {
        const ok = removeStore(Number(data.id));
        return { ok, message: ok ? 'Supermarche supprime avec succes.' : 'Supermarche introuvable.' };
      }
    },
    'add-promo': {
      title: 'Ajouter une promotion',
      description: 'Creez une nouvelle offre promotionnelle sur un produit.',
      submitLabel: 'Ajouter la promotion',
      fields: [
        { name: 'name', label: 'Nom du produit', type: 'text', placeholder: 'Produit promo', required: true },
        { name: 'barcode', label: 'Code-barres', type: 'text', value: `${Date.now()}`, required: true },
        { name: 'store', label: 'Magasin', type: 'select', value: firstStore?.name || '', options: getStoreOptions(), required: true },
        { name: 'oldPrice', label: 'Ancien prix (FCFA)', type: 'number', value: '2000', required: true },
        { name: 'newPrice', label: 'Nouveau prix (FCFA)', type: 'number', value: '1500', required: true },
        { name: 'endDate', label: 'Date de fin', type: 'text', value: '31 Dec 2026', required: true, fullWidth: true }
      ],
      onSubmit: (data) => {
        addPromotion({
          name: data.name,
          barcode: data.barcode,
          store: data.store,
          oldPrice: Number(data.oldPrice || 0),
          newPrice: Number(data.newPrice || 0),
          endDate: data.endDate
        });
        return { ok: true, message: 'Promotion ajoutee avec succes.' };
      }
    },
    'edit-promo': {
      title: 'Modifier une promotion',
      description: 'Changez le prix d une promotion existante.',
      submitLabel: 'Modifier la promotion',
      fields: [
        { name: 'id', label: 'ID de la promotion', type: 'number', value: '1', required: true },
        { name: 'newPrice', label: 'Nouveau prix promo (FCFA)', type: 'number', value: '1200', required: true }
      ],
      onSubmit: (data) => {
        const ok = updatePromotionPrice(Number(data.id), Number(data.newPrice || 0));
        return { ok, message: ok ? 'Promotion modifiee avec succes.' : 'Promotion introuvable.' };
      }
    },
    'validate-order': {
      title: 'Valider une commande',
      description: 'Confirmez une commande en attente pour lancer sa preparation.',
      submitLabel: 'Valider la commande',
      fields: [
        {
          name: 'orderId',
          label: 'Commande en attente',
          type: 'select',
          value: pendingOrders[0]?.id || '',
          options: pendingOrders.map((order) => ({
            value: order.id,
            label: `${order.id} - ${order.items[0]?.productName || 'Commande'}`
          })),
          required: true,
          fullWidth: true
        }
      ],
      onSubmit: (data) => {
        const ok = updateOrderStatus(data.orderId, 'confirmed', {
          name: 'Livreur LEAP',
          phone: '+237 690 000 000',
          vehicle: 'Moto',
          rating: 4.8
        });
        return { ok, message: ok ? 'Commande validee avec succes.' : 'Commande introuvable.' };
      }
    }
  };
}

function setFeedback(message: string, type: 'success' | 'error'): void {
  const feedback = document.getElementById('admin-form-feedback');
  if (!feedback) return;
  feedback.textContent = message;
  feedback.className = `admin-form-feedback admin-form-feedback-${type}`;
}

function clearFeedback(): void {
  const feedback = document.getElementById('admin-form-feedback');
  if (!feedback) return;
  feedback.textContent = '';
  feedback.className = 'admin-form-feedback hidden';
}

function renderActionForm(action: string | null): void {
  const title = document.getElementById('admin-form-title');
  const description = document.getElementById('admin-form-description');
  const fieldsContainer = document.getElementById('admin-form-fields');
  const submitBtn = document.getElementById('admin-form-submit') as HTMLButtonElement | null;
  const form = document.getElementById('admin-action-form') as HTMLFormElement | null;
  const configs = getActionConfigs();

  if (!title || !description || !fieldsContainer || !submitBtn || !form) return;

  currentAction = action;
  clearFeedback();

  if (!action || !configs[action]) {
    title.textContent = 'Choisissez une action';
    description.textContent = 'Selectionnez une action ci-dessous pour afficher un formulaire adapte.';
    fieldsContainer.innerHTML = `
      <div class="admin-form-empty">
        <strong>Aucune action selectionnee</strong>
        <span>Utilisez les boutons des cartes pour afficher le bon formulaire ici.</span>
      </div>
    `;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Executer l action';
    return;
  }

  const config = configs[action];
  title.textContent = config.title;
  description.textContent = config.description;
  submitBtn.disabled = false;
  submitBtn.textContent = config.submitLabel;

  fieldsContainer.innerHTML = config.fields.map((field) => {
    const wrapperClass = field.fullWidth ? 'admin-form-group admin-form-group-full' : 'admin-form-group';
    if (field.type === 'select') {
      const options = (field.options || []).map((option) => `
        <option value="${option.value}" ${option.value === (field.value || '') ? 'selected' : ''}>${option.label}</option>
      `).join('');
      return `
        <div class="${wrapperClass}">
          <label for="admin-field-${field.name}">${field.label}</label>
          <select id="admin-field-${field.name}" name="${field.name}" class="admin-form-select" ${field.required ? 'required' : ''}>
            ${options}
          </select>
        </div>
      `;
    }

    return `
      <div class="${wrapperClass}">
        <label for="admin-field-${field.name}">${field.label}</label>
        <input
          id="admin-field-${field.name}"
          name="${field.name}"
          type="${field.type}"
          class="admin-form-input"
          placeholder="${field.placeholder || ''}"
          value="${field.value || ''}"
          ${field.required ? 'required' : ''}
        />
      </div>
    `;
  }).join('');
}

function getPricesCount(): number {
  return getAllProducts().reduce((count, product) => count + product.prices.length, 0);
}

function refreshAdminStats(): void {
  const productCount = document.getElementById('admin-products-count');
  const storeCount = document.getElementById('admin-stores-count');
  const priceCount = document.getElementById('admin-prices-count');
  const promoCount = document.getElementById('admin-promotions-count');
  const orderCount = document.getElementById('admin-orders-count');

  if (productCount) productCount.textContent = `${getAllProducts().length} produit(s)`;
  if (storeCount) storeCount.textContent = `${getAllStores().length} magasin(s)`;
  if (priceCount) priceCount.textContent = `${getPricesCount()} prix enregistres`;
  if (promoCount) promoCount.textContent = `${getPromotionCount()} promotions actives`;
  if (orderCount) orderCount.textContent = `${getPendingOrders().length} commande(s) en attente`;
}

export function initAdmin(): void {
  refreshAdminStats();
  renderActionForm(null);

  const logoutBtn = document.getElementById('admin-logout-btn');
  const form = document.getElementById('admin-action-form') as HTMLFormElement | null;
  const resetBtn = document.getElementById('admin-form-reset');
  const notifBadge = document.getElementById('admin-notif-badge');
  const notifBanner = document.getElementById('admin-notif-banner');

  let lastPendingCount = getPendingOrders().length;
  let initialBannerShown = false;

  function refreshAdminNotificationsUI(): void {
    const pendingCount = getPendingOrders().length;

    if (notifBadge) {
      notifBadge.textContent = `${pendingCount} nouvelle(s) commande(s)`;
      notifBadge.classList.toggle('hidden', pendingCount === 0);
    }

    if (!notifBanner) return;

    // Affichage initial si des commandes sont deja en attente
    if (!initialBannerShown && pendingCount > 0) {
      notifBanner.textContent = `Vous avez ${pendingCount} commande(s) en attente.`;
      notifBanner.classList.remove('hidden');
      notifBanner.classList.add('admin-form-feedback-success');
      initialBannerShown = true;
      setTimeout(() => notifBanner.classList.add('hidden'), 4500);
    }

    // Toast si une nouvelle commande arrive pendant que l'admin est sur la page
    if (pendingCount > lastPendingCount) {
      notifBanner.textContent = `Nouvelle commande recus : ${pendingCount} en attente.`;
      notifBanner.classList.remove('hidden');
      notifBanner.classList.add('admin-form-feedback-success');
      setTimeout(() => notifBanner.classList.add('hidden'), 4500);
    }

    lastPendingCount = pendingCount;
  }

  // Premiere synchronisation + mise a jour reguliere
  refreshAdminNotificationsUI();
  setInterval(refreshAdminNotificationsUI, 2500);

  logoutBtn?.addEventListener('click', () => {
    logout();
    navigateTo('auth');
  });

  resetBtn?.addEventListener('click', () => {
    renderActionForm(null);
  });

  document.querySelectorAll('[data-admin-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = (btn as HTMLElement).dataset.adminAction;
      if (action === 'view-product') {
        renderActionForm(null);
        const fieldsContainer = document.getElementById('admin-form-fields');
        if (fieldsContainer) fieldsContainer.innerHTML = renderProductsViewHtml();
        setFeedback(`Produits disponibles: ${getAllProducts().length}`, 'success');
        refreshAdminStats();
        return;
      }
      if (action === 'view-price') {
        renderActionForm(null);
        setFeedback(`Total des prix enregistres: ${getPricesCount()}`, 'success');
        refreshAdminStats();
        return;
      }
      renderActionForm(action || null);
    });
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const configs = getActionConfigs();
    if (!currentAction || !configs[currentAction]) return;

    const formData = new FormData(form);
    const values = Object.fromEntries(Array.from(formData.entries()).map(([key, value]) => [key, String(value).trim()]));
    const result = configs[currentAction].onSubmit(values);

    if (result.ok) {
      refreshAdminStats();
      renderActionForm(currentAction);
    }

    setFeedback(result.message, result.ok ? 'success' : 'error');
  });
}
