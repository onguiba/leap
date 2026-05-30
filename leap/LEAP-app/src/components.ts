// Templates réutilisables pour les composants communs

export function getHeader(): string {
  return `
    <div class="history-nav-floating">
      <button class="history-nav-btn" data-history-nav="back" title="Retour">←</button>
      <button class="history-nav-btn" data-history-nav="forward" title="Avancer">→</button>
    </div>
    <header class="header">
      <div class="logo" data-nav="home" style="cursor: pointer;">
        <img src="/logo.svg" alt="MALAP METSI" class="logo-img" />
      </div>
      <div class="city-selector-container">
        <button class="city-selector" id="city-selector-btn">
          <span class="city-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg></span>
          <span class="city-name" id="selected-city">Douala</span>
          <span class="city-arrow">▼</span>
        </button>
        <div class="city-dropdown" id="city-dropdown" style="display: none;">
          <div class="city-dropdown-header">
            <span style="font-weight: 600; display:flex; align-items:center; gap:6px;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg> Choisir votre ville</span>
          </div>
          <div class="city-option" data-city="Douala">
            <span class="city-option-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg></span>
            <div>
              <div class="city-option-name">Douala</div>
              <div class="city-option-desc">Capitale économique</div>
            </div>
          </div>
          <div class="city-option" data-city="Yaoundé">
            <span class="city-option-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg></span>
            <div>
              <div class="city-option-name">Yaoundé</div>
              <div class="city-option-desc">Capitale politique</div>
            </div>
          </div>
          <div class="city-option" data-city="Bafoussam">
            <span class="city-option-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg></span>
            <div>
              <div class="city-option-name">Bafoussam</div>
              <div class="city-option-desc">Région de l'Ouest</div>
            </div>
          </div>
          <div class="city-option" data-city="Garoua">
            <span class="city-option-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg></span>
            <div>
              <div class="city-option-name">Garoua</div>
              <div class="city-option-desc">Région du Nord</div>
            </div>
          </div>
          <div class="city-option" data-city="Bamenda">
            <span class="city-option-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg></span>
            <div>
              <div class="city-option-name">Bamenda</div>
              <div class="city-option-desc">Région du Nord-Ouest</div>
            </div>
          </div>
          <div class="city-option" data-city="Maroua">
            <span class="city-option-icon"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg></span>
            <div>
              <div class="city-option-name">Maroua</div>
              <div class="city-option-desc">Région de l'Extrême-Nord</div>
            </div>
          </div>
        </div>
      </div>
      <nav class="header-nav">
        <a href="#" class="nav-link" data-nav="home">Accueil</a>
        <a href="#" class="nav-link" data-nav="promotions">Promotions</a>
        <a href="#" class="nav-link" data-nav="wallet">Wallet</a>
        <a href="#" class="nav-link" data-nav="tracking">Suivi</a>
        <a href="#" class="nav-link" data-nav="catalogues">Catalogue</a>
        <a href="#" class="nav-link" data-nav="popular">Produits Populaires</a>
      </nav>
      <div class="header-actions">
        <div class="cart-icon" data-nav="cart" style="cursor: pointer;">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span class="cart-count">0</span>
        </div>
        <div class="user-avatar" data-nav="profile" style="cursor:pointer;" title="Mon profil"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
      </div>
    </header>
  `;
}

export function getSimpleHeader(withBackButton: boolean = false): string {
  return `
    <header class="header-simple">
      ${withBackButton ? '<button class="back-btn" data-nav="home">← Retour</button>' : '<div></div>'}
      <div class="logo" data-nav="home" style="cursor: pointer;">
        <img src="/logo.svg" alt="MALAP METSI" class="logo-img" style="height:36px;" />
      </div>
      <div class="header-right">
        <span>Besoin d'aide ?</span>
        <div class="user-avatar"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
      </div>
    </header>
  `;
}

export function getFooter(): string {
  return `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo" data-nav="home" style="cursor:pointer;">
            <img src="/logo.svg" alt="MALAP METSI" class="logo-img" style="height:40px;" />
          </div>
          <p>Votre assistant intelligent pour des courses économiques. Comparez, économisez, profitez.</p>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h3>PRODUITS</h3>
            <a href="#" data-nav="scanner">Scanner mobile</a>
            <a href="#" data-nav="product">Comparateur de prix</a>
            <a href="#" data-nav="cart">Livraison à domicile</a>
            <a href="#" data-nav="popular">Liste de courses</a>
          </div>
          <div class="footer-column">
            <h3>ENTREPRISE</h3>
            <a href="#" data-alert-message="MALAP METSI compare les prix et facilite les courses dans votre ville.">À propos</a>
            <a href="#" data-alert-message="Partenaires: supermarchés, marchés et services de livraison locaux.">Partenaires</a>
            <a href="#" data-alert-message="La rubrique Carrières sera bientôt disponible.">Carrières</a>
            <a href="#" data-alert-message="Le blog MALAP METSI sera disponible prochainement.">Blog</a>
          </div>
          <div class="footer-column">
            <h3>SUPPORT</h3>
            <a href="#" data-alert-message="Centre d'aide: utilisez le profil ou le suivi de commande pour les actions principales.">Centre d'aide</a>
            <a href="#" data-alert-message="Contact support: +237 690 000 000">Contact</a>
            <a href="#" data-alert-message="Les CGU seront publiées dans une prochaine version.">CGU</a>
            <a href="#" data-alert-message="La politique de confidentialité sera publiée dans une prochaine version.">Confidentialité</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 MALAP METSI. Tous droits réservés.</p>
        <div class="social-links">
          <a href="#" data-external-url="https://facebook.com">Facebook</a>
          <a href="#" data-external-url="https://x.com">Twitter</a>
          <a href="#" data-external-url="https://instagram.com">Instagram</a>
        </div>
      </div>
    </footer>
  `;
}

export function getPageBackHeader(title: string, backPage: string = 'home'): string {
  return `
    <div class="page-back-header">
      <button class="page-back-btn" data-nav="${backPage}">← Retour</button>
      <h1 class="page-back-title">${title}</h1>
    </div>
  `;
}

export function getMinimalFooter(): string {
  return `
    <footer class="footer-minimal">
      <p>© 2024 MALAP METSI. Tous droits réservés.</p>
    </footer>
  `;
}

export function getPWAInstallPrompt(): string {
  return `
    <div id="pwa-install-prompt" class="pwa-install-prompt" style="display: none;">
      <div class="pwa-prompt-content">
        <button class="pwa-close-btn" id="pwa-close-btn">✕</button>
        <div class="pwa-icon"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></div>
        <h3 class="pwa-title">Installer MALAP METSI</h3>
        <p class="pwa-description" id="pwa-description">Installez l'application pour un accès rapide et une meilleure expérience</p>
        <div class="pwa-instructions" id="pwa-instructions"></div>
        <button class="pwa-install-btn" id="pwa-install-btn">Installer maintenant</button>
      </div>
    </div>
  `;
}
