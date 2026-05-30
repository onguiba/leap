# 🛒 PriceCheck - Comparateur de Prix

Application mobile et web (PWA) pour comparer les prix des produits dans les supermarchés de Douala, Cameroun.

## 📱 Multi-Plateforme

PriceCheck est une **Progressive Web App (PWA)** qui fonctionne sur:
- 📱 **Mobile** - iOS et Android (installable)
- 💻 **Desktop** - Windows, macOS, Linux
- 🌐 **Web** - Tous les navigateurs modernes

### Installation Mobile
1. Ouvrez l'application dans votre navigateur mobile
2. Cliquez sur "Ajouter à l'écran d'accueil"
3. L'application s'installe comme une app native
4. Fonctionne hors ligne avec le cache

## ✨ Fonctionnalités

- 🔍 **Recherche de produits** - Par nom, catégorie ou code-barre
- 📱 **Scanner de code-barre** - Comparaison instantanée en magasin
- 💰 **Comparaison de prix** - 8 supermarchés partenaires
- 🛍️ **Catalogue complet** - 30+ produits disponibles
- 🚚 **Livraison rapide** - 30-45 minutes
- 🏪 **Retrait en magasin** - Paiement sur place
- 💳 **Paiements multiples** - Orange Money, MTN Mobile Money, Carte bancaire
- 📊 **Suivi de commande** - Tracking en temps réel
- 💰 **Programme fidélité** - Points et cashback
- ⭐ **Avis clients** - Notes et commentaires

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- npm ou yarn
- PostgreSQL 14+ (pour le backend)

### Installation

```bash
# Cloner le projet
git clone <repository-url>

# Installer les dépendances
npm install

# Configurer PostgreSQL (automatique)
.\setup-database.ps1

# Ou manuellement:
# 1. Créer la base de données: psql -U postgres -c "CREATE DATABASE pricecheck;"
# 2. Configurer .env avec DATABASE_URL
# 3. npm run db:generate && npm run db:push && npm run db:seed
```

### Démarrer l'application

```bash
# Terminal 1: Backend API (port 3001)
npm run dev:server

# Terminal 2: Frontend (port 5174)
npm run dev
```

- Frontend: `http://localhost:5174/`
- Backend API: `http://localhost:3001/`

### Build Production

```bash
npm run build
```

### Compte de test

- Email: `test@pricecheck.cm`
- Téléphone: `+237690000000`
- Mot de passe: `password123`

## 📁 Structure du Projet

```
LEAP-app/
├── src/
│   ├── main.ts           # Point d'entrée
│   ├── router.ts         # Gestion des routes
│   ├── pages.ts          # Templates des pages
│   ├── components.ts     # Composants réutilisables
│   ├── database.ts       # Base de données (produits, magasins)
│   ├── home.ts           # Page d'accueil
│   ├── catalog.ts        # Catalogue de produits
│   ├── scanner.ts        # Scanner de code-barre
│   ├── cart.ts           # Panier
│   ├── checkout.ts       # Paiement
│   ├── confirmation.ts   # Confirmation de commande
│   ├── product.ts        # Détails produit
│   ├── promotions.ts     # Promotions
│   ├── wallet.ts         # Portefeuille & fidélité
│   ├── tracking.ts       # Suivi de commande
│   ├── reviews.ts        # Avis clients
│   └── style.css         # Styles globaux
├── database/
│   ├── products.json     # Données produits
│   ├── stores.json       # Données magasins
│   ├── users.json        # Données utilisateurs
│   ├── orders.json       # Données commandes
│   ├── schema.sql        # Schéma SQL
│   └── seed.sql          # Données initiales SQL
├── docs/                 # Documentation
├── public/               # Assets statiques
├── index.html            # Page HTML principale
├── package.json          # Dépendances
├── tsconfig.json         # Configuration TypeScript
└── vite.config.ts        # Configuration Vite
```

## 🏪 Supermarchés Partenaires

1. Mahima Akwa
2. Casino Bonanjo
3. Carrefour Market
4. Santa Lucia
5. Score Supermarché
6. Orca Deco
7. Leader Price
8. Super U Douala

## 📦 Produits

30+ produits répartis en 10 catégories:
- Produits laitiers
- Boulangerie
- Épicerie
- Boissons
- Fruits & Légumes
- Viandes
- Poissons
- Confiserie
- Produits frais
- Hygiène

## 🛠️ Technologies

- **Frontend**: TypeScript, HTML5, CSS3
- **Backend**: Node.js, Express, Prisma ORM
- **Base de données**: PostgreSQL
- **Architecture**: Progressive Web App (PWA)
- **Build Tool**: Vite
- **Routing**: Custom SPA Router
- **State Management**: LocalStorage + API REST
- **Styling**: CSS Modules, Inline Styles
- **Mobile**: Responsive Design, Touch Events, Capacitor
- **Authentification**: JWT, bcrypt
- **Offline**: Service Worker (à implémenter)

## 📱 Pages de l'Application

- **Accueil** - Page vitrine avec hero section et fonctionnalités
- **Catalogue** - Liste complète des produits avec recherche
- **Scanner** - Scanner de code-barre pour comparaison en magasin
- **Panier** - Gestion du panier d'achat
- **Checkout** - Paiement et confirmation
- **Confirmation** - Récapitulatif de commande avec facture
- **Promotions** - Produits en promotion
- **Wallet** - Portefeuille et programme fidélité
- **Tracking** - Suivi de commande en temps réel
- **Reviews** - Avis et notes des produits

## 💳 Méthodes de Paiement

- Orange Money
- MTN Mobile Money
- Carte bancaire (Visa, Mastercard)

## 🚚 Options de Livraison

- **Livraison à domicile** - 500 FCFA, 30-45 minutes
- **Retrait en magasin** - Gratuit, paiement sur place

## 📊 Base de Données

### PostgreSQL avec Prisma ORM

L'application utilise PostgreSQL comme base de données principale:

**Configuration rapide:**
```bash
.\setup-database.ps1
```

**Commandes utiles:**
```bash
npm run db:generate  # Générer le client Prisma
npm run db:push      # Synchroniser le schéma
npm run db:migrate   # Créer une migration
npm run db:seed      # Peupler la base de données
npm run db:studio    # Interface graphique
```

**Tables principales:**
- `products` - 30+ produits avec codes-barres
- `stores` - 10 supermarchés partenaires
- `users` - Utilisateurs avec authentification
- `orders` - Commandes et historique
- `prices` - Prix par produit et magasin
- `reviews` - Avis clients
- `delivery_drivers` - Livreurs
- `wallet_transactions` - Transactions portefeuille

**Documentation complète:** `SETUP_POSTGRESQL.md` et `DEMARRAGE_RAPIDE_POSTGRESQL.md`

## 🎨 Design

- Design moderne et responsive
- Dégradés de couleurs (vert, bleu, violet)
- Animations au survol
- Emojis pour l'engagement
- Typographie hiérarchisée
- Ombres et bordures arrondies

## 📖 Documentation

Documentation complète disponible dans le dossier `docs/`:
- Guide de démarrage rapide
- Guide complet des fonctionnalités
- Documentation de la base de données
- Guide de la boutique
- Instructions d'utilisation

## 🤝 Contribution

Les contributions sont les bienvenues! N'hésitez pas à:
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT.

## 👥 Auteurs

- Équipe PriceCheck

## 🙏 Remerciements

- Tous les supermarchés partenaires
- La communauté open source
- Les utilisateurs pour leurs retours

---

**PriceCheck** - Économisez sur vos courses quotidiennes! 🛒💰
