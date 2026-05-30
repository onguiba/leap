import { attachNavigationListeners } from './router';
import { getDbJson } from './app-db';
import { getLastOrder } from './orders';

export function initConfirmation() {
  attachNavigationListeners();
  const invoice = getDbJson<any>('invoice', {});
  const order = getLastOrder();
  const container = document.querySelector('.order-items-list');
  if (!container) return;

  if (!invoice.number) {
    container.innerHTML = `<div style="text-align:center;padding:3rem;"><p style="color:var(--gray-2);">Aucune commande trouvée.</p></div>`;
    return;
  }

  container.innerHTML = `
    <div class="confirmation-card">
      <div class="confirmation-success">✓</div>
      <h2 style="text-align:center;font-size:1.5rem;font-weight:800;color:var(--dark);margin-bottom:0.4rem;">Paiement Réussi !</h2>
        <p style="text-align:center;color:var(--gray-2);font-size:0.9rem;margin-bottom:2rem;">Votre commande est enregistrée et en attente de validation par l'administrateur</p>

      <div class="invoice-box">
        <h3 style="text-align:center;font-weight:800;margin-bottom:1.25rem;color:var(--primary-dark);font-size:1rem;text-transform:uppercase;letter-spacing:0.05em;">Facture</h3>
        <div class="invoice-row"><span style="color:var(--gray-2);">N° Facture</span><strong style="color:var(--primary);">${invoice.number}</strong></div>
        <div class="invoice-row"><span style="color:var(--gray-2);">Date</span><strong>${invoice.date}</strong></div>
        <div class="invoice-row"><span style="color:var(--gray-2);">Magasin</span><strong>${invoice.store}</strong></div>
        <div class="invoice-row"><span style="color:var(--gray-2);">Produit</span><strong>${invoice.product}</strong></div>
        <div class="invoice-row"><span style="color:var(--gray-2);">Prix</span><strong>${(invoice.price || 0).toLocaleString()} FCFA</strong></div>
        <div class="invoice-row"><span style="color:var(--gray-2);">Livraison</span><strong style="color:${invoice.shipping === 0 ? 'var(--primary)' : 'var(--dark)'};">${invoice.shipping === 0 ? 'GRATUITE' : (invoice.shipping || 0).toLocaleString() + ' FCFA'}</strong></div>
        <div class="invoice-row"><span style="color:var(--gray-2);">Paiement</span><strong style="color:var(--primary);">${invoice.payment}</strong></div>
        <div class="invoice-row"><span style="color:var(--gray-2);">Statut</span><strong style="color:var(--primary);">${order?.status === 'confirmed' ? 'Validee' : 'En attente de validation'}</strong></div>
        <div class="invoice-total"><span>TOTAL PAYÉ</span><span>${(invoice.total || 0).toLocaleString()} FCFA</span></div>
      </div>

      <div style="display:flex;gap:0.75rem;margin-top:1.75rem;flex-wrap:wrap;">
        <button onclick="window.print()" class="btn btn-ghost" style="flex:1;">Imprimer</button>
        <button class="btn btn-secondary return-home-btn" data-nav="tracking" style="flex:1;">Suivi commande</button>
        <button class="btn btn-primary return-home-btn" data-nav="home" style="flex:1;">Accueil</button>
      </div>

      <div style="margin-top:1.5rem;padding:1rem;background:var(--gray-6);border-radius:var(--radius-md);text-align:center;">
        <p style="color:var(--gray-2);font-size:0.85rem;margin-bottom:0.3rem;">Suivi activé dès validation admin de la commande</p>
        <p style="color:var(--primary);font-weight:700;font-size:0.9rem;">Merci de votre confiance !</p>
      </div>
    </div>
  `;
}
