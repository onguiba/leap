# ✅ PostgreSQL - Configuration Complète

Votre application PriceCheck est maintenant configurée pour utiliser PostgreSQL !

## 📦 Fichiers créés

### Configuration
- ✅ `.env` - Variables d'environnement avec DATABASE_URL
- ✅ `prisma/schema.prisma` - Schéma de base de données (déjà configuré)
- ✅ `prisma/seed.ts` - Script de peuplement (déjà configuré)

### Scripts
- ✅ `setup-database.ps1` - Installation automatique complète

### Documentation
- ✅ `SETUP_POSTGRESQL.md` - Guide d'installation détaillé
- ✅ `DEMARRAGE_RAPIDE_POSTGRESQL.md` - Guide de démarrage rapide
- ✅ `COMMANDES_POSTGRESQL.md` - Aide-mémoire des commandes
- ✅ `README.md` - Mis à jour avec PostgreSQL

## 🚀 Prochaines étapes

### 1. Installer PostgreSQL (si pas déjà fait)

**Option A: Installeur officiel (Recommandé)**
```
https://www.postgresql.org/download/windows/
```
- Mot de passe par défaut: `postgres`
- Port: `5432`

**Option B: Chocolatey**
```bash
choco install postgresql
```

### 2. Configurer la base de données

**Méthode automatique (Recommandé):**
```bash
.\setup-database.ps1
```

**Méthode manuelle:**
```bash
# 1. Créer la base de données
psql -U postgres -c "CREATE DATABASE pricecheck;"

# 2. Installer les dépendances
npm install

# 3. Générer le client Prisma
npm run db:generate

# 4. Créer les tables
npm run db:push

# 5. Ajouter les données de test
npm run db:seed
```

### 3. Démarrer l'application

**Terminal 1 - Backend:**
```bash
npm run dev:server
```
Devrait afficher:
```
🚀 API listening on http://localhost:3001
📊 Database: PostgreSQL
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Accédez à: http://localhost:5174

### 4. Tester la connexion

```bash
# Test API
curl http://localhost:3001/api/health

# Test PostgreSQL
psql -U postgres -d pricecheck -c "SELECT COUNT(*) FROM products;"
```

## 🔑 Compte de test

Utilisez ces identifiants pour vous connecter:

- **Email**: `test@pricecheck.cm`
- **Téléphone**: `+237690000000`
- **Mot de passe**: `password123`

## 📊 Données disponibles

Après le seeding, vous aurez:
- ✅ 10 produits avec codes-barres
- ✅ 10 magasins (Douala et Yaoundé)
- ✅ 50 prix (5 magasins par produit)
- ✅ 1 utilisateur de test
- ✅ 3 livreurs

## 🛠️ Commandes utiles

```bash
# Voir les données dans une interface graphique
npm run db:studio

# Réinitialiser la base de données
npm run db:push
npm run db:seed

# Voir les produits
psql -U postgres -d pricecheck -c "SELECT * FROM products;"

# Voir les magasins
psql -U postgres -d pricecheck -c "SELECT * FROM stores;"

# Voir les prix
psql -U postgres -d pricecheck -c "SELECT p.name, s.name as store, pr.price FROM prices pr JOIN products p ON pr.product_id = p.id JOIN stores s ON pr.store_id = s.id;"
```

## 📚 Documentation

- **Guide complet**: `SETUP_POSTGRESQL.md`
- **Démarrage rapide**: `DEMARRAGE_RAPIDE_POSTGRESQL.md`
- **Commandes**: `COMMANDES_POSTGRESQL.md`
- **README**: `README.md`

## 🔧 Structure de la base de données

### Tables principales

1. **products** - Produits avec codes-barres
   - id, name, image, imageUrl, category, barcode, description

2. **stores** - Magasins partenaires
   - id, name, logo, city, address, phone, hours, delivery, deliveryFee

3. **prices** - Prix par produit et magasin
   - id, productId, storeId, price, stock

4. **users** - Utilisateurs
   - id, name, email, phone, passwordHash, role, walletBalance, loyaltyPoints

5. **orders** - Commandes
   - id, userId, status, subtotal, deliveryFee, total, paymentMethod

6. **order_items** - Articles de commande
   - id, orderId, productId, storeId, quantity, price

7. **delivery_drivers** - Livreurs
   - id, name, phone, vehicle, rating, active

8. **deliveries** - Livraisons
   - id, orderId, driverId, status, estimatedTime

9. **reviews** - Avis clients
   - id, userId, productId, rating, comment, verified

10. **wallet_transactions** - Transactions portefeuille
    - id, userId, type, amount, description

11. **auth_events** - Événements d'authentification
    - id, userId, identifier, role, status, reason

## 🎯 Fonctionnalités Backend

### API Endpoints disponibles

**Authentification:**
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

**Produits:**
- `GET /api/products` - Liste des produits
- `GET /api/products/:id` - Détails d'un produit
- `GET /api/products/barcode/:barcode` - Recherche par code-barre
- `GET /api/products/search?q=...` - Recherche

**Magasins:**
- `GET /api/stores` - Liste des magasins
- `GET /api/stores/city/:city` - Magasins par ville

**Commandes (authentifié):**
- `POST /api/orders` - Créer une commande
- `GET /api/orders` - Mes commandes
- `GET /api/orders/:id` - Détails d'une commande
- `PATCH /api/orders/:id/status` - Mettre à jour le statut

**Profil (authentifié):**
- `GET /api/user/profile` - Mon profil

## ✨ Avantages de PostgreSQL

- ✅ **Performance** - Requêtes rapides et optimisées
- ✅ **Fiabilité** - Transactions ACID
- ✅ **Scalabilité** - Gère des millions de lignes
- ✅ **Relations** - Jointures et contraintes
- ✅ **Sécurité** - Authentification et permissions
- ✅ **Outils** - pgAdmin, Prisma Studio
- ✅ **Production-ready** - Utilisé par les plus grandes entreprises

## 🆚 Comparaison avec l'ancien système

| Fonctionnalité | Avant (JSON) | Maintenant (PostgreSQL) |
|----------------|--------------|-------------------------|
| Stockage | Fichiers JSON | Base de données |
| Performance | Lente | Rapide |
| Relations | Manuelles | Automatiques |
| Transactions | Non | Oui |
| Concurrent | Non | Oui |
| Recherche | Linéaire | Indexée |
| Sécurité | Basique | Avancée |
| Scalabilité | Limitée | Illimitée |

## 🎉 C'est prêt !

Votre application PriceCheck utilise maintenant PostgreSQL comme base de données professionnelle.

Vous pouvez:
- ✅ Créer des comptes utilisateurs
- ✅ Scanner des codes-barres
- ✅ Comparer les prix
- ✅ Passer des commandes
- ✅ Suivre les livraisons
- ✅ Gérer le portefeuille
- ✅ Laisser des avis

Tout est stocké de manière sécurisée et performante dans PostgreSQL !

## 📞 Besoin d'aide ?

Consultez les fichiers de documentation:
- `SETUP_POSTGRESQL.md` - Installation détaillée
- `DEMARRAGE_RAPIDE_POSTGRESQL.md` - Démarrage rapide
- `COMMANDES_POSTGRESQL.md` - Commandes utiles

Ou relancez le script d'installation:
```bash
.\setup-database.ps1
```

---

**Bon développement avec PostgreSQL ! 🚀**
