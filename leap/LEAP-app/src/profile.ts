import { attachNavigationListeners, navigateTo } from './router';
import { getCurrentUser, isAdmin, logout } from './auth';

export function getProfilePage(): string {
  const user = getCurrentUser();
  const fullName = user ? `${user.prenom} ${user.nom}` : 'Utilisateur';
  const tel = user ? user.telephone : '+237 6xx xxx xxx';
  const adminAccess = isAdmin()
    ? `
        <div class="profile-info-card" style="margin-bottom:1rem;">
          <button class="btn btn-primary" id="admin-access-btn" style="width:100%;">Acceder au compte administrateur</button>
        </div>
      `
    : '';

  return `
    <div class="container">
      <header class="header" style="justify-content: space-between;">
        <button class="page-back-btn" data-nav="home" style="margin-left:0;">← Retour</button>
        <div class="logo" data-nav="home" style="cursor: pointer;">
          <img src="/logo.svg" alt="MALAP METSI" class="logo-img" style="height:36px;" />
        </div>
        <div class="header-actions">
          <div class="cart-icon" data-nav="tracking" style="cursor: pointer;" title="Mes notifications"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
          <div class="cart-icon" data-alert-message="Paramètres du profil: fonctionnalité en cours d'amélioration." style="cursor: pointer;" title="Paramètres"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div>
        </div>
      </header>

      <main class="main-content" style="max-width: 600px; margin: 0 auto; padding: 2rem 1rem;">

        <!-- Avatar & Name -->
        <div class="profile-hero">
          <div class="profile-avatar-wrapper">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=00d084&color=fff&size=100" alt="Avatar" class="profile-avatar" />
            <button class="profile-avatar-edit" data-alert-message="Modification de photo de profil disponible prochainement."><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></button>
          </div>
          <h2 class="profile-name">${fullName}</h2>
          <p class="profile-subtitle">Membre Gold depuis Janvier 2024</p>
          <button class="btn btn-primary profile-edit-btn" data-alert-message="Modification du profil disponible prochainement.">Modifier le Profil</button>
        </div>

        <!-- Informations Personnelles -->
        <section class="profile-section">
          <h3 class="profile-section-title">Informations Personnelles</h3>
          <div class="profile-info-card">
            <div class="profile-info-row">
              <span class="profile-info-icon" style="background:#e8f5e9;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
              <div class="profile-info-content">
                <div class="profile-info-label">NOM COMPLET</div>
                <div class="profile-info-value">${fullName}</div>
              </div>
              <span class="profile-info-arrow">›</span>
            </div>
            <div class="profile-info-row">
              <span class="profile-info-icon" style="background:#e8f5e9;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.48a16 16 0 0 0 5.61 5.61l1.54-1.54a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 14.92z"/></svg></span>
              <div class="profile-info-content">
                <div class="profile-info-label">TÉLÉPHONE</div>
                <div class="profile-info-value">${tel}</div>
              </div>
              <span class="profile-info-arrow">›</span>
            </div>
          </div>
        </section>

        <!-- Adresses -->
        <section class="profile-section">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
            <h3 class="profile-section-title" style="margin-bottom:0;">Adresses Enregistrées</h3>
            <button class="btn" data-alert-message="Ajout d'adresse disponible prochainement." style="color:var(--primary); background:none; padding:0; font-weight:700; font-size:0.95rem;">+ Ajouter</button>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
            <div class="address-card address-card-active">
              <span class="address-badge">PRINCIPAL</span>
              <div class="address-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div class="address-name">Maison</div>
              <div class="address-detail">Rue de la Paix, Douala, Cameroun</div>
              <button class="address-menu" data-alert-message="Gestion de l'adresse disponible prochainement.">⋮</button>
            </div>
            <div class="address-card">
              <div class="address-icon"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></div>
              <div class="address-name">Bureau</div>
              <div class="address-detail">Immeuble Shell, Yaoundé, Cameroun</div>
              <button class="address-menu" data-alert-message="Gestion de l'adresse disponible prochainement.">⋮</button>
            </div>
          </div>
        </section>

        <!-- Modes de Paiement -->
        <section class="profile-section">
          <h3 class="profile-section-title">Modes de Paiement</h3>
          <div class="profile-info-card">
            <div class="profile-info-row">
              <span class="payment-badge" style="background:#ff6600; color:white;">OM</span>
              <div class="profile-info-content">
                <div class="profile-info-value">Orange Money</div>
                <div class="profile-info-label">698 *** 452</div>
              </div>
              <span style="color:var(--primary); font-size:1.3rem;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
            </div>
            <div class="profile-info-row">
              <span class="payment-badge" style="background:#ffcc00; color:#333;">MTN</span>
              <div class="profile-info-content">
                <div class="profile-info-value">MTN Mobile Money</div>
                <div class="profile-info-label">677 *** 129</div>
              </div>
              <span style="color:var(--gray); font-size:0.8rem; font-weight:700;">DÉFINIR PAR DÉFAUT</span>
            </div>
            <div class="profile-info-row" style="border-bottom:none;">
              <span class="payment-badge" style="background:#e0e0e0; color:#555;">CB</span>
              <div class="profile-info-content">
                <div class="profile-info-value">Visa Card</div>
                <div class="profile-info-label">**** **** **** 1024</div>
              </div>
              <span style="color:#ccc; font-size:1.2rem; cursor:pointer;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></span>
            </div>
          </div>
        </section>

        <!-- Notifications -->
        <section class="profile-section">
          <h3 class="profile-section-title">Notifications</h3>
          <div class="profile-info-card">
            <div class="profile-info-row">
              <div class="profile-info-content">
                <div class="profile-info-value">Offres Promotionnelles</div>
                <div class="profile-info-label">Alertes sur les baisses de prix</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked id="notif-promo">
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="profile-info-row" style="border-bottom:none;">
              <div class="profile-info-content">
                <div class="profile-info-value">Statut de livraison</div>
                <div class="profile-info-label">Suivi en temps réel des commandes</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" checked id="notif-delivery">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </section>

        ${adminAccess}

        <!-- Déconnexion -->
        <div class="profile-info-card" style="margin-bottom:1rem;">
          <button class="profile-logout-btn" id="logout-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>Déconnexion
          </button>
        </div>

        <p style="text-align:center; color:#bbb; font-size:0.8rem; margin-bottom:2rem;">MALAP METSI v2.41 • 2024</p>
      </main>
    </div>
  `;
}

export function initProfile() {
  attachNavigationListeners();

  document.getElementById('admin-access-btn')?.addEventListener('click', () => {
    navigateTo('admin');
  });

  document.getElementById('logout-btn')?.addEventListener('click', () => {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
      logout();
      navigateTo('auth');
    }
  });
}
