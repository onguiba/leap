import { getHeader, getFooter, getSimpleHeader, getMinimalFooter, getPWAInstallPrompt, getPageBackHeader } from './components';
import { getAllProducts } from './database';

const heroBackgroundAds = getAllProducts()
  .filter(product => !!product.imageUrl)
  .slice(0, 5);
const homeShowcaseSlides = Array.from({ length: 6 }, () => '/assets/hero-business-purple.png');

export function getHomePage() {
  const header = getHeader();
  const footer = getFooter();
  const pwaPrompt = getPWAInstallPrompt();
  return `
    <div class="container">
      ${header}
      <main class="home-main">
        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-floating-ads" aria-hidden="true">
            ${heroBackgroundAds.map((product, index) => `
              <div class="hero-float-card hero-float-card-${index + 1}">
                <img src="${product.imageUrl}" alt="" loading="lazy" />
              </div>
            `).join('')}
          </div>
          <div class="hero-content">
            <span class="hero-kicker">Plateforme de comparaison de prix #1</span>
            <h1 class="hero-title">Comparez. Économisez.<br>Achetez mieux.</h1>
            <p class="hero-subtitle">Trouvez les meilleurs prix dans les supermarchés de votre ville au Cameroun, avec des informations mises a jour en temps reel.</p>
            <div class="hero-buttons">
              <button class="hero-btn hero-btn-primary" data-nav="product">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>Comparer les prix
              </button>
              <button class="hero-btn hero-btn-secondary" data-nav="scanner">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>Scanner un produit
              </button>
            </div>
            <div class="hero-trust">
              <span>+10 000 utilisateurs actifs</span>
              <span>Donnees locales verifiees</span>
              <span>Livraison des 500 FCFA</span>
            </div>
          </div>
        </section>

        <section class="home-showcase-strip" aria-label="Banniere business">
          <div class="home-showcase-track">
            ${homeShowcaseSlides.map((img) => `
              <div class="home-showcase-item">
                <img src="${img}" alt="Business comparateur de prix en ligne" loading="lazy" />
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Features Section -->
        <section class="features-section">
          <h2 class="section-title" style="color:var(--dark);">Pourquoi MALAP METSI ?</h2>
          <div class="features-marquee">
            <div class="features-track">
              <div class="feature-card">
                <span class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></span>
                <h3 class="feature-title">Économisez de l'argent</h3>
                <p class="feature-description">Comparez les prix de 30+ produits dans tous les supermarchés et marchés de votre ville</p>
              </div>
              <div class="feature-card">
                <span class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg></span>
                <h3 class="feature-title">6 Villes disponibles</h3>
                <p class="feature-description">Douala, Yaoundé, Bafoussam, Garoua, Bamenda, Maroua — les meilleurs prix près de chez vous</p>
              </div>
              <div class="feature-card">
                <span class="feature-icon"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></span>
                <h3 class="feature-title">Livraison rapide</h3>
                <p class="feature-description">Commandez en ligne et recevez vos courses à domicile en 30–45 minutes</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Stats Section -->
        <section class="stats-section">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">30+</div>
              <div class="stat-label">Produits</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">27</div>
              <div class="stat-label">Supermarchés</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">6</div>
              <div class="stat-label">Villes</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">500 FCFA</div>
              <div class="stat-label">Livraison</div>
            </div>
          </div>
        </section>

      </main>
      ${footer}
      ${pwaPrompt}
    </div>
  `;
}

export function getScannerPage() {
  const header = getSimpleHeader(false);
  const pwaPrompt = getPWAInstallPrompt();
  return `
    <div class="container">
      ${header}
      <main class="scanner-page" style="padding: 20px; max-width: 800px; margin: 0 auto;">
        ${getPageBackHeader('Scanner de code-barres', 'home')}

        <!-- Info Box -->
        <div class="card" style="background: var(--primary-light); border-left: 4px solid var(--primary); margin-bottom: 20px; padding: 1rem;">
          <div style="display: flex; align-items: start; gap: 1rem;">
            <span style="font-size: 1.5rem; display:flex; align-items:center;"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span>
            <div style="flex: 1;">
              <strong style="color: var(--primary);">Astuce:</strong>
              <p style="margin: 0.5rem 0 0 0; color: var(--gray); font-size: 0.95rem;">
                Si la caméra ne fonctionne pas, utilisez le bouton "Galerie photo" pour sélectionner une image existante, 
                ou entrez le code-barres manuellement ci-dessous.
              </p>
            </div>
          </div>
        </div>

        <!-- Scanner Controls -->
        <div class="scanner-controls card" style="text-align: center;">
          <!-- Video Preview -->
          <div id="video-container" style="display: none; margin-bottom: 20px;">
            <video id="scanner-video" autoplay playsinline style="width: 100%; max-width: 500px; border-radius: 12px; box-shadow: var(--shadow-md);"></video>
            <canvas id="scanner-canvas" style="display: none;"></canvas>
            <div style="display: flex; gap: 10px; justify-content: center; margin-top: 1rem; flex-wrap: wrap;">
              <button id="capture-btn" class="btn btn-primary" style="padding: 12px 24px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>📸 Capturer l'image
              </button>
              <button id="stop-camera-btn" class="btn btn-secondary" style="padding: 12px 24px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" style="vertical-align:middle;margin-right:6px"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>Arrêter
              </button>
            </div>
          </div>

          <!-- Image Preview -->
          <div id="image-preview-container" style="display: none; margin-bottom: 20px;">
            <div style="position: relative; display: inline-block;">
              <img id="preview-image" style="max-width: 100%; max-height: 400px; border-radius: 12px; box-shadow: var(--shadow-md);" />
              <button id="close-image-btn" style="position: absolute; top: 10px; right: 10px; background: rgba(244, 67, 54, 0.9); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 1.5rem; cursor: pointer; box-shadow: var(--shadow-md); display: flex; align-items: center; justify-content: center;">
                ✕
              </button>
            </div>
            <p style="margin-top: 1rem; color: var(--gray); font-size: 0.9rem; display:flex; align-items:center; justify-content:center; gap:6px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>Image du code-barres analysée
            </p>
          </div>

          <!-- Scan Buttons -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 30px;">
            <button class="btn btn-primary" id="camera-btn" style="padding: 1.2rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>Ouvrir la caméra
            </button>
            <button class="btn btn-secondary" id="gallery-btn" style="padding: 1.2rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>Galerie photo
            </button>
          </div>

          <!-- Hidden File Input -->
          <input type="file" id="file-input" accept="image/*" capture="environment" style="display: none;" />

          <!-- Manual Input -->
          <div style="margin: 30px 0; padding-top: 30px; border-top: 2px solid var(--border);">
            <p style="color: var(--gray); margin-bottom: 15px; font-weight: 600;">ou entrez le code-barres manuellement</p>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
              <input type="text" class="manual-barcode-input search-input" placeholder="Ex: 3760074380534" style="max-width: 300px; flex: 1; min-width: 200px;">
              <button class="manual-search-btn btn btn-primary">Rechercher</button>
            </div>
            <p style="color: var(--gray); font-size: 0.85rem; margin-top: 1rem;">
              Exemples de codes-barres camerounais :
              <br>• 6170001000016 (Eau Tangui)
              <br>• 6170001001013 (Bière 33 Export)
              <br>• 6173001000012 (Maggi Etoile)
              <br>• 6171200010116 (Huile Mayor)
            </p>
          </div>
        </div>

        <!-- Scan Results -->
        <div class="scan-results hidden" style="margin-top: 30px;">
          <h2 class="scanned-product-name" style="font-size: 1.8em; text-align: center; margin-bottom: 20px;"></h2>
          <div class="comparison-stores-list"></div>
        </div>
      </main>
      ${pwaPrompt}
    </div>
  `;
}

export function getProductPage() {
  const header = getHeader();
  const footer = getFooter();
  const pwaPrompt = getPWAInstallPrompt();
  return `
    <div class="container">
      ${header}
      <main class="main-content">
        ${getPageBackHeader('Comparer les Prix', 'home')}
        <p style="color:var(--gray-2); margin-bottom:2rem; font-size:1rem;">Trouvez les meilleurs prix pour vos produits préférés</p>
        <div class="catalog-container"></div>
      </main>
      ${footer}
      ${pwaPrompt}
    </div>
  `;
}

export function getCartPage() {
  const header = getHeader();
  const footer = getFooter();
  return `
    <div class="container">
      ${header}
      <main class="main-content">
        <div style="max-width:700px; margin:0 auto;">
          ${getPageBackHeader('Votre Panier', 'home')}
          <div class="cart-items"></div>
          <button class="btn btn-primary btn-full btn-lg checkout-btn" data-nav="checkout" style="margin-top:1rem;">
            Passer à la caisse →
          </button>
        </div>
      </main>
      ${footer}
    </div>
  `;
}

export function getCheckoutPage() {
  const header = getSimpleHeader(false);
  const footer = getMinimalFooter();
  return `
    <div class="container">
      ${header}
      <main class="main-content">
        <div style="max-width:800px; margin:0 auto;">
          ${getPageBackHeader('Paiement', 'cart')}
          <p style="color:var(--gray-2); margin-bottom:2rem; font-size:0.95rem;">Choisissez votre mode de paiement et confirmez votre commande</p>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
            <div>
              <h2 style="font-size:1rem; font-weight:800; margin-bottom:1rem; color:var(--dark); text-transform:uppercase; letter-spacing:0.05em;">Mode de paiement</h2>
              <div class="payment-methods"></div>
            </div>
            <div>
              <h2 style="font-size:1rem; font-weight:800; margin-bottom:1rem; color:var(--dark); text-transform:uppercase; letter-spacing:0.05em;">Récapitulatif</h2>
              <div class="cart-summary order-items"></div>
              <button class="btn btn-primary btn-full btn-lg confirm-payment-btn" style="margin-top:1rem;">
                ✓ Confirmer et Payer
              </button>
            </div>
          </div>
        </div>
      </main>
      ${footer}
    </div>
  `;
}

export function getConfirmationPage() {
  const header = getSimpleHeader(false);
  const footer = getMinimalFooter();
  return `
    <div class="container">
      ${header}
      <main class="main-content">
        <div class="order-items-list"></div>
      </main>
      ${footer}
    </div>
  `;
}

export function getPromotionsPage() {
  const header = getHeader();
  const footer = getFooter();
  const pwaPrompt = getPWAInstallPrompt();
  return `
    <div class="container">
      ${header}
      <main class="main-content">
        ${getPageBackHeader('Promotions du Moment', 'home')}
        <p style="color:var(--gray-2); margin-bottom:2rem; font-size:1rem;">Profitez des meilleures offres et réductions</p>
        <div class="promo-products-grid"></div>
      </main>
      ${footer}
      ${pwaPrompt}
    </div>
  `;
}

export function getCataloguesPage() {
  const header = getHeader();
  const footer = getFooter();
  const pwaPrompt = getPWAInstallPrompt();

  return `
    <div class="container">
      ${header}
      <main class="main-content">
        ${getPageBackHeader('Catalogue des Boutiques', 'tracking')}
        <p style="color:var(--gray-2); margin-bottom:1.5rem; font-size:1rem;">
          Prospectus et publicites en cours, avec periodes mises a jour automatiquement.
        </p>
        
        <!-- Scanner Button -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 15px;">
            <div style="flex: 1; min-width: 250px;">
              <h3 style="color: white; margin: 0 0 8px 0; font-size: 1.3em; display: flex; align-items: center; gap: 10px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                Scanner un produit en magasin
              </h3>
              <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 0.95em;">Comparez les prix instantanément avec votre caméra</p>
            </div>
            <button class="btn btn-light" data-nav="scanner" style="padding: 14px 28px; font-size: 1.05em; font-weight: bold; background: white; color: #667eea; border: none; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
              📸 Ouvrir le scanner
            </button>
          </div>
        </div>

        <!-- Types de Boutiques -->
        <div style="background: white; padding: 25px; border-radius: 12px; margin-bottom: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <h3 style="margin: 0 0 20px 0; font-size: 1.4em; color: var(--dark);">🏪 Types de boutiques disponibles</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
            
            <!-- Boutique Électronique -->
            <div style="border: 2px solid #e0e0e0; border-radius: 10px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.12)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
              <div style="height: 180px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-size: 4em;">
                📱
              </div>
              <div style="padding: 15px;">
                <h4 style="margin: 0 0 8px 0; font-size: 1.2em; color: var(--dark);">Boutiques Électronique</h4>
                <p style="margin: 0; color: var(--gray); font-size: 0.9em;">Smartphones, tablettes, accessoires high-tech et gadgets électroniques</p>
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e0e0e0;">
                  <span style="color: #00d084; font-weight: bold; font-size: 0.9em;">✓ Disponible dans votre ville</span>
                </div>
              </div>
            </div>

            <!-- Boutique Accessoires -->
            <div style="border: 2px solid #e0e0e0; border-radius: 10px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.12)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
              <div style="height: 180px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); display: flex; align-items: center; justify-content: center; font-size: 4em;">
                🎧
              </div>
              <div style="padding: 15px;">
                <h4 style="margin: 0 0 8px 0; font-size: 1.2em; color: var(--dark);">Accessoires & Audio</h4>
                <p style="margin: 0; color: var(--gray); font-size: 0.9em;">Casques, écouteurs, chargeurs, coques et accessoires mobiles</p>
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e0e0e0;">
                  <span style="color: #00d084; font-weight: bold; font-size: 0.9em;">✓ Disponible dans votre ville</span>
                </div>
              </div>
            </div>

            <!-- Supermarché -->
            <div style="border: 2px solid #e0e0e0; border-radius: 10px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.12)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
              <div style="height: 180px; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); display: flex; align-items: center; justify-content: center; font-size: 4em;">
                🛒
              </div>
              <div style="padding: 15px;">
                <h4 style="margin: 0 0 8px 0; font-size: 1.2em; color: var(--dark);">Supermarchés</h4>
                <p style="margin: 0; color: var(--gray); font-size: 0.9em;">Alimentation, boissons, produits frais et articles ménagers</p>
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e0e0e0;">
                  <span style="color: #00d084; font-weight: bold; font-size: 0.9em;">✓ Disponible dans votre ville</span>
                </div>
              </div>
            </div>

            <!-- Produits Camerounais -->
            <div style="border: 2px solid #e0e0e0; border-radius: 10px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.12)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
              <div style="height: 180px; background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); display: flex; align-items: center; justify-content: center; font-size: 4em;">
                🇨🇲
              </div>
              <div style="padding: 15px;">
                <h4 style="margin: 0 0 8px 0; font-size: 1.2em; color: var(--dark);">Produits Camerounais</h4>
                <p style="margin: 0; color: var(--gray); font-size: 0.9em;">Made in Cameroon - Produits locaux, épices, condiments et spécialités</p>
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e0e0e0;">
                  <span style="color: #00d084; font-weight: bold; font-size: 0.9em;">✓ Disponible dans votre ville</span>
                </div>
              </div>
            </div>

            <!-- Emballages & Conditionnement -->
            <div style="border: 2px solid #e0e0e0; border-radius: 10px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.12)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
              <div style="height: 180px; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); display: flex; align-items: center; justify-content: center; font-size: 4em;">
                📦
              </div>
              <div style="padding: 15px;">
                <h4 style="margin: 0 0 8px 0; font-size: 1.2em; color: var(--dark);">Emballages & Sachets</h4>
                <p style="margin: 0; color: var(--gray); font-size: 0.9em;">Emballages alimentaires, sachets, films et solutions de conditionnement</p>
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e0e0e0;">
                  <span style="color: #00d084; font-weight: bold; font-size: 0.9em;">✓ Disponible dans votre ville</span>
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <h3 style="margin: 25px 0 15px 0; font-size: 1.4em;">📋 Catalogues et Promotions</h3>
        <div class="catalogues-grid" id="catalogues-grid"></div>
      </main>
      ${footer}
      ${pwaPrompt}
    </div>
  `;
}

export function getPopularProductsPage() {
  const header = getHeader();
  const footer = getFooter();
  const pwaPrompt = getPWAInstallPrompt();

  return `
    <div class="container">
      ${header}
      <main class="main-content">
        ${getPageBackHeader('Produits Populaires', 'home')}
        <p style="color:var(--gray-2); margin-bottom:1.5rem; font-size:1rem;">
          Retrouvez les produits les plus consultes et comparez les meilleurs prix selon votre ville.
        </p>
        <section class="features-section home-products-section" style="padding: 1.5rem;">
          <div class="home-products-toolbar">
            <input
              id="search-input-home"
              class="search-input home-search-input"
              type="search"
              placeholder="Rechercher un produit populaire..."
              aria-label="Rechercher un produit populaire"
            />
            <div id="product-count" class="home-product-count">Produits disponibles</div>
          </div>
          <div class="popular-products-grid"></div>
        </section>
      </main>
      ${footer}
      ${pwaPrompt}
    </div>
  `;
}

export function getAdminPage() {
  const header = getHeader();
  const footer = getFooter();
  const pwaPrompt = getPWAInstallPrompt();

  return `
    <div class="container">
      ${header}
      <main class="main-content">
        ${getPageBackHeader('Compte Administrateur', 'home')}
        <p style="color:var(--gray-2); margin-bottom:1.5rem; font-size:1rem;">
          Espace de gestion: authentification, produits, prix, magasins, promotions et deconnexion.
        </p>
        <section class="admin-panel" id="admin-panel">
          <div class="admin-toolbar">
            <span class="badge badge-success">Session admin active</span>
            <span class="badge badge-warning hidden" id="admin-notif-badge">0 nouvelle(s) commande(s)</span>
            <button id="admin-logout-btn" class="btn btn-ghost btn-sm">Se deconnecter</button>
          </div>
          <div id="admin-notif-banner" class="admin-form-feedback admin-form-feedback-success hidden" style="margin-top: 0.25rem;"></div>
          <section class="admin-form-shell">
            <div class="admin-form-card">
              <div class="admin-form-head">
                <div>
                  <span class="badge badge-info">Formulaire admin</span>
                  <h2 id="admin-form-title">Choisissez une action</h2>
                  <p id="admin-form-description">Selectionnez une action ci-dessous pour afficher un formulaire adapte.</p>
                </div>
              </div>
              <form id="admin-action-form" class="admin-action-form">
                <div id="admin-form-fields" class="admin-form-fields">
                  <div class="admin-form-empty">
                    <strong>Aucune action selectionnee</strong>
                    <span>Utilisez les boutons des cartes pour afficher le bon formulaire ici.</span>
                  </div>
                </div>
                <div class="admin-form-footer">
                  <button type="button" id="admin-form-reset" class="btn btn-ghost">Reinitialiser</button>
                  <button type="submit" id="admin-form-submit" class="btn btn-primary" disabled>Executer l action</button>
                </div>
                <div id="admin-form-feedback" class="admin-form-feedback hidden"></div>
              </form>
            </div>
          </section>
          <div class="admin-grid">
            <article class="admin-task-card">
              <h3>Produits</h3>
              <p id="admin-products-count">0 produit(s)</p>
              <div class="admin-task-actions">
                <button class="btn btn-primary btn-sm" data-admin-action="add-product">Ajouter les produits</button>
                <button class="btn btn-secondary btn-sm" data-admin-action="edit-product">Modifier les produits</button>
                <button class="btn btn-secondary btn-sm" data-admin-action="edit-product-image">Modifier la photo</button>
                <button class="btn btn-outline btn-sm" data-admin-action="view-product">Voir les produits</button>
              </div>
            </article>

            <article class="admin-task-card">
              <h3>Prix</h3>
              <p id="admin-prices-count">0 prix enregistres</p>
              <div class="admin-task-actions">
                <button class="btn btn-primary btn-sm" data-admin-action="add-price">Ajouter des prix</button>
                <button class="btn btn-secondary btn-sm" data-admin-action="edit-price">Modifier les prix</button>
                <button class="btn btn-outline btn-sm" data-admin-action="view-price">Voir les prix</button>
              </div>
            </article>

            <article class="admin-task-card">
              <h3>Magasins</h3>
              <p id="admin-stores-count">0 magasin(s)</p>
              <div class="admin-task-actions">
                <button class="btn btn-primary btn-sm" data-admin-action="add-store">Ajouter des magasins</button>
                <button class="btn btn-secondary btn-sm" data-admin-action="delete-store">Supprimer un supermarche</button>
              </div>
            </article>

            <article class="admin-task-card">
              <h3>Promotions</h3>
              <p id="admin-promotions-count">8 promotions actives</p>
              <div class="admin-task-actions">
                <button class="btn btn-primary btn-sm" data-admin-action="add-promo">Ajouter les promotions</button>
                <button class="btn btn-secondary btn-sm" data-admin-action="edit-promo">Modifier les promotions</button>
              </div>
            </article>

            <article class="admin-task-card">
              <h3>Commandes</h3>
              <p id="admin-orders-count">0 commande(s) en attente</p>
              <div class="admin-task-actions">
                <button class="btn btn-primary btn-sm" data-admin-action="validate-order">Valider une commande</button>
              </div>
            </article>
          </div>
        </section>
      </main>
      ${footer}
      ${pwaPrompt}
    </div>
  `;
}