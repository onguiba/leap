import { attachNavigationListeners } from './router';
import { getHeader, getFooter } from './components';

const walletData = {
  balance: 15000, points: 2450, level: 'Gold',
  transactions: [
    { id: 'T001', type: 'credit', amount: 5000, description: 'Rechargement Orange Money', date: '2024-12-15' },
    { id: 'T002', type: 'debit', amount: 2200, description: 'Achat Lait Bio', date: '2024-12-14' },
    { id: 'T003', type: 'credit', amount: 500, description: 'Bonus fidélité', date: '2024-12-13' },
    { id: 'T004', type: 'debit', amount: 1500, description: 'Achat Pain', date: '2024-12-12' }
  ]
};

export function getWalletPage(): string {
  const pointsToNext = 5000;
  const progress = Math.min((walletData.points / pointsToNext) * 100, 100);
  return `
    <div class="container">
      ${getHeader()}
      <main class="main-content">
        <div class="wallet-page">
          <div class="page-back-header">
            <button class="page-back-btn" data-nav="home">← Retour</button>
            <h1 class="page-back-title">Mon Portefeuille</h1>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.75rem;">
            <div class="wallet-card wallet-card-green">
              <div class="wallet-label">Solde disponible</div>
              <div class="wallet-balance">${walletData.balance.toLocaleString()} <span style="font-size:1rem;opacity:0.8;">FCFA</span></div>
              <button id="recharge-btn" style="margin-top:1rem;width:100%;padding:0.75rem;background:rgba(255,255,255,0.2);color:white;border:1.5px solid rgba(255,255,255,0.4);border-radius:var(--radius-md);font-weight:700;cursor:pointer;font-size:0.9rem;backdrop-filter:blur(4px);">
                + Recharger
              </button>
            </div>
            <div class="wallet-card wallet-card-orange">
              <div class="wallet-label">Points de fidélité</div>
              <div class="wallet-balance">${walletData.points.toLocaleString()} <span style="font-size:1rem;opacity:0.8;">pts</span></div>
              <div style="font-size:0.82rem;opacity:0.85;margin-top:0.25rem;">Niveau ${walletData.level} &#9733;</div>
              <div class="wallet-progress"><div class="wallet-progress-bar" style="width:${progress}%;"></div></div>
              <div style="font-size:0.78rem;opacity:0.85;">${pointsToNext - walletData.points} pts pour Platinum</div>
            </div>
          </div>

          <div class="card" style="margin-bottom:1.5rem;">
            <h2 style="font-size:1.1rem;font-weight:800;margin-bottom:1.25rem;color:var(--dark);">Programme de Fidélité</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:1.25rem;">
              <div class="tier-card">
                <div style="font-size:1.5rem;margin-bottom:0.5rem;"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#cd7f32" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M9 20l3-3 3 3"/></svg></div>
                <div style="font-weight:700;font-size:0.95rem;">Bronze</div>
                <div style="color:var(--gray-2);font-size:0.8rem;margin:0.25rem 0;">0 – 999 points</div>
                <div style="color:var(--primary);font-size:0.82rem;font-weight:600;">✓ 1% cashback</div>
              </div>
              <div class="tier-card active">
                <div style="font-size:1.5rem;margin-bottom:0.5rem;"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffd700" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M9 20l3-3 3 3"/></svg></div>
                <div style="font-weight:700;font-size:0.95rem;">Gold <span style="font-size:0.7rem;background:var(--warning);color:white;padding:1px 6px;border-radius:20px;margin-left:4px;">ACTUEL</span></div>
                <div style="color:var(--gray-2);font-size:0.8rem;margin:0.25rem 0;">1 000 – 4 999 pts</div>
                <div style="color:var(--warning);font-size:0.82rem;font-weight:600;">✓ 3% cashback + livraison offerte</div>
              </div>
              <div class="tier-card premium">
                <div style="font-size:1.5rem;margin-bottom:0.5rem;"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9333ea" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
                <div style="font-weight:700;font-size:0.95rem;">Platinum</div>
                <div style="color:var(--gray-2);font-size:0.8rem;margin:0.25rem 0;">5 000+ points</div>
                <div style="color:#9333ea;font-size:0.82rem;font-weight:600;">✓ 5% cashback + offres exclusives</div>
              </div>
            </div>
            <div style="background:var(--primary-light);padding:1rem;border-radius:var(--radius-md);border-left:3px solid var(--primary);">
              <div style="font-weight:700;color:var(--primary-dark);margin-bottom:0.5rem;font-size:0.9rem;">Comment gagner des points ?</div>
              <ul style="margin:0;padding-left:1.25rem;color:var(--gray-1);font-size:0.85rem;line-height:1.9;">
                <li>1 point = 100 FCFA dépensés</li>
                <li>Bonus 500 pts à chaque 10ème commande</li>
                <li>Parrainage : 1 000 pts par ami inscrit</li>
                <li>Avis produit : 50 pts par avis vérifié</li>
              </ul>
            </div>
          </div>

          <div class="card">
            <h2 style="font-size:1.1rem;font-weight:800;margin-bottom:1.25rem;color:var(--dark);">Historique des transactions</h2>
            ${walletData.transactions.map(tx => `
              <div class="tx-item">
                <div class="tx-icon tx-icon-${tx.type}">${tx.type === 'credit' ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>'}</div>
                <div style="flex:1;">
                  <div style="font-weight:700;font-size:0.9rem;color:var(--dark);">${tx.description}</div>
                  <div style="color:var(--gray-3);font-size:0.78rem;">${new Date(tx.date).toLocaleDateString('fr-FR')} • ${tx.id}</div>
                </div>
                <div class="tx-amount-${tx.type}">${tx.type === 'credit' ? '+' : '-'}${tx.amount.toLocaleString()} FCFA</div>
              </div>
            `).join('')}
          </div>
        </div>
      </main>
      ${getFooter()}

      <!-- Recharge Modal -->
      <div id="recharge-modal" style="display:none;position:fixed;inset:0;background:rgba(15,23,42,0.6);backdrop-filter:blur(4px);z-index:9999;align-items:center;justify-content:center;padding:1rem;">
        <div style="background:white;border-radius:var(--radius-xl);padding:2rem;max-width:420px;width:100%;box-shadow:var(--shadow-xl);">
          <h2 style="font-size:1.2rem;font-weight:800;margin-bottom:1.5rem;color:var(--dark);">Recharger le Portefeuille</h2>
          <input type="number" id="recharge-amount" placeholder="Montant (FCFA)" style="width:100%;padding:0.85rem 1rem;border:1.5px solid var(--border);border-radius:var(--radius-md);font-size:0.95rem;margin-bottom:0.75rem;font-family:inherit;color:var(--dark);" />
          <select id="recharge-method" style="width:100%;padding:0.85rem 1rem;border:1.5px solid var(--border);border-radius:var(--radius-md);font-size:0.9rem;margin-bottom:1.25rem;font-family:inherit;color:var(--dark);background:white;">
            <option>Orange Money</option>
            <option>MTN Mobile Money</option>
            <option>Carte Bancaire</option>
          </select>
          <div style="display:flex;gap:0.75rem;">
            <button id="recharge-confirm" class="btn btn-primary" style="flex:1;">Confirmer</button>
            <button id="recharge-cancel" class="btn btn-ghost" style="flex:1;">Annuler</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function initWallet() {
  attachNavigationListeners();
  const modal = document.getElementById('recharge-modal')!;
  document.getElementById('recharge-btn')?.addEventListener('click', () => { modal.style.display = 'flex'; });
  document.getElementById('recharge-cancel')?.addEventListener('click', () => { modal.style.display = 'none'; });
  document.getElementById('recharge-confirm')?.addEventListener('click', () => {
    const amount = (document.getElementById('recharge-amount') as HTMLInputElement).value;
    if (!amount || parseInt(amount) <= 0) { alert('Veuillez entrer un montant valide.'); return; }
    modal.style.display = 'none';
    alert(`Rechargement de ${parseInt(amount).toLocaleString()} FCFA effectué avec succès !`);
  });
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
}
