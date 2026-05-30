# 🏗️ Architecture du Projet PriceCheck

## Vue d'Ensemble

PriceCheck est une **Progressive Web App (PWA)** construite avec TypeScript et Vite, fonctionnant à la fois comme:
- 📱 **Application mobile** (iOS et Android)
- 💻 **Application desktop** (Windows, macOS, Linux)
- 🌐 **Site web** (tous navigateurs)

L'application utilise un système de routing personnalisé pour une expérience Single Page Application (SPA) fluide.

## 📐 Architecture Générale

```
┌─────────────────────────────────────────────────────┐
│                   index.html                        │
│                  (Point d'entrée)                   │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│                   main.ts                           │
│            (Initialisation de l'app)                │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│                  router.ts                          │
│         (Gestion de la navigation SPA)              │
└────────────────────┬────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
    ┌───────┐   ┌───────┐   ┌───────┐
    │ Pages │   │ Init  │   │ Data  │
    │  .ts  │   │  .ts  │   │  .ts  │
    └───────┘   └───────┘   └───────┘
```

## 📂 Structure des Dossiers

### `/src` - Code Source

#### Fichiers Principaux
- **main.ts** - Point d'entrée, initialise le router
- **router.ts** - Système de routing SPA
- **pages.ts** - Templates HTML des pages
- **components.ts** - Composants réutilisables (header, footer)
- **database.ts** - Gestion des données (produits, magasins)
- **style.css** - Styles globaux

#### Modules de Pages
Chaque page a son propre module avec:
- Template HTML (dans `pages.ts`)
- Logique d'initialisation (fichier `.ts`)
- Gestion des événements

**Pages disponibles:**
- `home.ts` - Page d'accueil vitrine
- `catalog.ts` - Catalogue de produits
- `scanner.ts` - Scanner de code-barre
- `product.ts` - Détails d'un produit
- `cart.ts` - Panier d'achat
- `checkout.ts` - Processus de paiement
- `confirmation.ts` - Confirmation de commande
- `promotions.ts` - Produits en promotion
- `wallet.ts` - Portefeuille et fidélité
- `tracking.ts` - Suivi de commande
- `reviews.ts` - Avis clients

### `/database` - Données

#### Fichiers JSON (Développement)
- `products.json` - 30 produits avec prix par magasin
- `stores.json` - 8 supermarchés avec infos complètes
- `users.json` - Données utilisateurs
- `orders.json` - Historique des commandes

#### Fichiers SQL (Migration Future)
- `schema.sql` - Structure des tables
- `seed.sql` - Données initiales
- `README.md` - Documentation de la base

### `/docs` - Documentation
- Guides d'utilisation
- Documentation technique
- Instructions de démarrage

### `/public` - Assets Statiques
- Images
- Icônes
- Fichiers statiques

## 🔄 Flux de Navigation

### 1. Chargement Initial
```
index.html → main.ts → router.ts → navigateTo('home')
```

### 2. Navigation Entre Pages
```
User Click → Event Listener → navigateTo(page) → 
  → getPageTemplate() → initPage() → Render
```

### 3. Exemple: Voir la Boutique
```
Home Page → Click "Voir Boutique" → 
  → navigateTo('product') → 
  → getProductPage() → 
  → initCatalog() → 
  → Render 30 products
```

## 🎯 Système de Routing

### Router (`router.ts`)

```typescript
type PageName = 'home' | 'scanner' | 'product' | 'cart' | ...

interface RouteConfig {
  render: () => string;  // Template HTML
  init: () => void;      // Initialisation
}

const routes: Record<PageName, RouteConfig> = {
  home: { render: getHomePage, init: initHome },
  product: { render: getProductPage, init: initCatalog },
  // ...
}
```

### Navigation
```typescript
navigateTo(page: PageName) {
  1. Récupère la route
  2. Génère le HTML (render)
  3. Injecte dans #app
  4. Initialise la page (init)
  5. Attache les listeners
}
```

## 💾 Gestion des Données

### Database Module (`database.ts`)

```typescript
// Fonctions principales
getAllProducts()           // Tous les produits
searchProducts(query)      // Recherche
getProductById(id)         // Par ID
getProductByBarcode(code)  // Par code-barre
getAllStores()             // Tous les magasins
```

### Structure des Données

#### Produit
```typescript
{
  id: number
  name: string
  image: string (emoji)
  category: string
  barcode: string (13 chiffres)
  prices: [
    { store: string, price: number }
  ]
}
```

#### Magasin
```typescript
{
  id: number
  name: string
  address: string
  phone: string
  hours: string
  coordinates: { lat, lng }
  deliveryFee: number
  deliveryTime: string
}
```

## 🎨 Système de Composants

### Components (`components.ts`)

#### Header
- Logo cliquable
- Navigation principale
- Icône panier
- Responsive

#### Footer
- Informations de contact
- Liens utiles
- Réseaux sociaux

### Utilisation
```typescript
const header = getHeader();
const footer = getFooter();
return `<div>${header}<main>...</main>${footer}</div>`;
```

## 🔐 Gestion de l'État

### LocalStorage
Utilisé pour:
- Panier d'achat
- Commande en cours
- Préférences utilisateur
- Historique de navigation

```typescript
// Exemple: Panier
localStorage.setItem('cart', JSON.stringify(items));
const cart = JSON.parse(localStorage.getItem('cart') || '[]');
```

## 📱 Pages Détaillées

### Page d'Accueil (Home)
**Sections:**
1. Hero - Titre + 2 CTA
2. Features - 3 cartes
3. Stats - 4 chiffres clés
4. How It Works - 3 étapes
5. CTA Final

**Navigation:**
- "Voir la Boutique" → product
- "Scanner" → scanner

### Catalogue (Product/Catalog)
**Fonctionnalités:**
- Barre de recherche
- Affichage en grille
- Filtres par catégorie
- Comparaison de prix
- Boutons Livraison/Retrait

**Données:**
- 30 produits depuis `database.ts`
- Prix de 8 magasins
- Codes-barres

### Scanner
**Fonctionnalités:**
- Simulation de scan
- Comparaison instantanée
- Affichage des prix
- Navigation vers détails

### Panier (Cart)
**Fonctionnalités:**
- Liste des articles
- Modification quantités
- Calcul total
- Frais de livraison
- Navigation checkout

### Checkout
**Étapes:**
1. Choix mode de paiement
2. Informations livraison
3. Récapitulatif
4. Confirmation

**Paiements:**
- Orange Money
- MTN Mobile Money
- Carte bancaire

### Confirmation
**Affichage:**
- Numéro de commande
- Récapitulatif
- Code-barre de commande
- Bouton impression
- Suivi de commande

## 🔧 Configuration

### Vite (`vite.config.ts`)
```typescript
{
  server: {
    port: 5174,
    headers: {
      'Cache-Control': 'no-store'
    }
  }
}
```

### TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true
  }
}
```

## 🚀 Build & Déploiement

### Développement
```bash
npm run dev  # Port 5174
```

### Production
```bash
npm run build  # → dist/
```

### Déploiement
Le dossier `dist/` peut être déployé sur:
- Netlify
- Vercel
- GitHub Pages
- Serveur Apache/Nginx

## 📊 Performance

### Optimisations
- Code splitting par page
- Lazy loading des images
- Minification CSS/JS
- Tree shaking
- Compression gzip

### Métriques Cibles
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90

## 🔒 Sécurité

### Bonnes Pratiques
- Validation des entrées
- Sanitization du HTML
- HTTPS obligatoire
- Pas de données sensibles en localStorage
- CSP headers

## 🧪 Tests (À Implémenter)

### Tests Unitaires
- Fonctions de database.ts
- Logique de routing
- Calculs de prix

### Tests d'Intégration
- Navigation entre pages
- Ajout au panier
- Processus de checkout

### Tests E2E
- Parcours utilisateur complet
- Scénarios de commande

## 📈 Évolutions Futures

### Court Terme
- [ ] Authentification utilisateur
- [ ] Historique des commandes
- [ ] Favoris
- [ ] Notifications push

### Moyen Terme
- [ ] API Backend
- [ ] Base de données PostgreSQL
- [ ] Paiements réels
- [ ] Tracking GPS

### Long Terme
- [ ] Application mobile (React Native)
- [ ] IA pour recommandations
- [ ] Chatbot support
- [ ] Programme d'affiliation

---

**Dernière mise à jour:** Aujourd'hui  
**Version:** 2.0  
**Mainteneur:** Équipe PriceCheck
