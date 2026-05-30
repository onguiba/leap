import { attachNavigationListeners } from './router';

interface ShopCatalogue {
  id: number;
  shopName: string;
  city: string;
  imageUrl: string;
  startOffsetDays: number;
  durationDays: number;
  note: string;
}

const shopCatalogues: ShopCatalogue[] = [
  {
    id: 1,
    shopName: 'Lidl',
    city: 'Douala',
    imageUrl: '/assets/catalogue-lidl.png',
    startOffsetDays: -2,
    durationDays: 10,
    note: 'Offres hebdomadaires et remboursements exceptionnels'
  },
  {
    id: 2,
    shopName: 'Bureau en Gros',
    city: 'Yaounde',
    imageUrl: '/assets/catalogue-bureau.png',
    startOffsetDays: 0,
    durationDays: 7,
    note: 'Aubaines high-tech, bureautique et accessoires'
  }
];

function toStartOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  }).format(date);
}

function formatRange(start: Date, end: Date): string {
  return `${formatDate(start)} - ${formatDate(end)}`;
}

function computeStatus(start: Date, end: Date, now: Date): { label: string; className: string } {
  if (now < start) return { label: 'A venir', className: 'catalogue-status-upcoming' };
  if (now > end) return { label: 'Expire', className: 'catalogue-status-expired' };
  return { label: 'Actif', className: 'catalogue-status-active' };
}

export function initCatalogues() {
  const container = document.getElementById('catalogues-grid');
  if (!container) return;

  const today = toStartOfDay(new Date());

  container.innerHTML = shopCatalogues.map((catalogue) => {
    const startDate = addDays(today, catalogue.startOffsetDays);
    const endDate = addDays(startDate, catalogue.durationDays - 1);
    const status = computeStatus(startDate, endDate, today);
    const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) + 1);

    return `
      <article class="catalogue-card">
        <div class="catalogue-image-wrap">
          <img src="${catalogue.imageUrl}" alt="Catalogue ${catalogue.shopName}" class="catalogue-image" loading="lazy" />
        </div>
        <div class="catalogue-content">
          <div class="catalogue-head">
            <h3>${catalogue.shopName}</h3>
            <span class="catalogue-status ${status.className}">${status.label}</span>
          </div>
          <p class="catalogue-meta">${catalogue.city} • ${catalogue.note}</p>
          <p class="catalogue-dates">${formatRange(startDate, endDate)}</p>
          <div class="catalogue-footer">
            <span class="catalogue-days-left">${daysLeft} jour(s) restant(s)</span>
            <button class="btn btn-primary btn-sm" data-nav="promotions">Voir les promotions</button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  attachNavigationListeners();
}
