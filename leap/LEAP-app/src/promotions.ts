import { attachNavigationListeners, navigateTo } from './router';
import { generateProductCardImage } from './barcode-generator';
import { getDbJson, setDbJson } from './app-db';
import { addToCart } from './orders';

const PROMOTIONS_KEY = 'pc_promotions_data';

const promoProducts = [
  { id: 1, name: "Lait Entier Frais 1L", image: "lait", imageUrl: "/IMAGES/Lait Entier Frais 1L.jpg", barcode: "3760074380534", oldPrice: 2500, newPrice: 1800, discount: 28, store: "Supermarché A", endDate: "31 Déc 2024" },
  { id: 2, name: "Pain Complet 500g", image: "pain", imageUrl: "/IMAGES/Pain Complet 500g.jpg", barcode: "3760074380535", oldPrice: 1500, newPrice: 1000, discount: 33, store: "Boulangerie I", endDate: "25 Déc 2024" },
  { id: 3, name: "Huile Végétale Mayor 1L", image: "huile", imageUrl: "/IMAGES/Huile Végétale Mayor 1L.webp", barcode: "6171200010116", oldPrice: 2800, newPrice: 2200, discount: 21, store: "Supermarché C", endDate: "30 Déc 2024" },
  { id: 4, name: "Riz Basmati 2kg", image: "riz", imageUrl: "/IMAGES/Riz Basmati 2kg.jpg", barcode: "3760074380538", oldPrice: 5800, newPrice: 4500, discount: 22, store: "Supermarché E", endDate: "28 Déc 2024" },
  { id: 5, name: "Oeufs Frais x12", image: "oeufs", imageUrl: "/IMAGES/Oeufs Frais x12.jpg", barcode: "3760074380536", oldPrice: 3200, newPrice: 2400, discount: 25, store: "Supermarché D", endDate: "29 Déc 2024" },
  { id: 6, name: "Tomates Fraîches 1kg", image: "tomates", imageUrl: "/IMAGES/Tomates Fraîches 1kg.jpg", barcode: "3760074380540", oldPrice: 2000, newPrice: 1500, discount: 25, store: "Supermarché B", endDate: "26 Déc 2024" },
  { id: 7, name: "Eau Tangui 1.5L", image: "eau", imageUrl: "/IMAGES/Eau Minérale Tangui 1.5L.png", barcode: "6170001000016", oldPrice: 600, newPrice: 480, discount: 20, store: "Supermarché G", endDate: "31 Déc 2024" },
  { id: 8, name: "Bouillon Maggi Etoile x8", image: "maggi", imageUrl: "/IMAGES/Bouillon Maggi Etoile 4g.jpg", barcode: "6173001000012", oldPrice: 450, newPrice: 350, discount: 22, store: "Supermarché A", endDate: "31 Déc 2024" }
];

function getPromotionList() {
  return getDbJson<any[]>(PROMOTIONS_KEY, promoProducts);
}

function savePromotionList(list: any[]) {
  setDbJson(PROMOTIONS_KEY, list);
}

export function getPromotionCount() {
  return getPromotionList().length;
}

export function addPromotion(item: { name: string; barcode: string; store: string; oldPrice: number; newPrice: number; endDate: string; image?: string; imageUrl?: string; }) {
  const list = getPromotionList();
  const nextId = list.length ? Math.max(...list.map((p: any) => p.id)) + 1 : 1;
  const discount = item.oldPrice > 0 ? Math.round(((item.oldPrice - item.newPrice) / item.oldPrice) * 100) : 0;
  list.push({
    id: nextId,
    name: item.name,
    image: item.image || 'promo',
    imageUrl: item.imageUrl || '',
    barcode: item.barcode,
    oldPrice: item.oldPrice,
    newPrice: item.newPrice,
    discount,
    store: item.store,
    endDate: item.endDate
  });
  savePromotionList(list);
}

export function updatePromotionPrice(id: number, newPrice: number) {
  const list = getPromotionList();
  const promo = list.find((p: any) => p.id === id);
  if (!promo) return false;
  promo.newPrice = newPrice;
  promo.discount = promo.oldPrice > 0 ? Math.round(((promo.oldPrice - promo.newPrice) / promo.oldPrice) * 100) : 0;
  savePromotionList(list);
  return true;
}

function renderPromoProducts() {
  const container = document.querySelector('.promo-products-grid');
  if (!container) return;
  const list = getPromotionList();
  container.innerHTML = `
    ${list.map((p: any) => `
      <div class="promo-card promo-card-horizontal">
        <div class="promo-card-top">
          <div class="promo-badge">-${p.discount}%</div>
          <div style="margin-bottom:0.75rem;">${generateProductCardImage(p.barcode, p.image, (p as any).imageUrl)}</div>
          <h3 class="product-name">${p.name}</h3>
          <div class="promo-store-tag">${p.store}</div>
        </div>
        <div class="promo-card-body">
          <div class="promo-price-block">
            <div class="promo-old-price">${p.oldPrice.toLocaleString()} FCFA</div>
            <div class="promo-new-price">${p.newPrice.toLocaleString()} FCFA</div>
          </div>
          <div class="promo-savings">Economie : ${(p.oldPrice - p.newPrice).toLocaleString()} FCFA</div>
          <div class="promo-deadline">Offre valable jusqu'au <strong>${p.endDate}</strong></div>
        </div>
        <div class="promo-card-cta">
          <button class="btn btn-danger btn-promo-order" data-promo-id="${p.id}">
            Commander maintenant
          </button>
        </div>
      </div>
    `).join('')}
  `;

  document.querySelectorAll('.btn-promo-order').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt((e.currentTarget as HTMLElement).dataset.promoId!);
      const p = list.find((x: any) => x.id === id)!;
      addToCart({
        productId: p.id,
        store: p.store, productImage: p.image, price: p.newPrice,
        shippingFee: 500, shippingTime: '30-45 min', orderType: 'delivery',
        productName: p.name, barcode: p.barcode
      });
      alert('✅ Produit ajouté au panier !');
    });
  });
}

export function initPromotions() {
  renderPromoProducts();
  attachNavigationListeners();
}
