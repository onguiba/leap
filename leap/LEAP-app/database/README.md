# 📊 Base de Données PriceCheck

## Structure de la Base de Données

### Tables Principales

#### 1. Products (Produits)
- **30 produits** répartis en 10 catégories
- Chaque produit contient:
  - ID unique
  - Nom
  - Image (emoji)
  - Catégorie
  - Code-barre (13 chiffres)
  - Prix dans différents magasins
  - Stock disponible

#### 2. Stores (Magasins)
- **8 supermarchés** à Douala, Cameroun
- Informations complètes:
  - Nom et logo
  - Adresse complète
  - Téléphone
  - Horaires d'ouverture
  - Livraison disponible
  - Frais de livraison (500 FCFA)
  - Commande minimum (5000 FCFA)
  - Note client (sur 5)
  - Coordonnées GPS

#### 3. Users (Utilisateurs)
- Profil utilisateur
- Solde wallet
- Points de fidélité
- Niveau (Bronze/Gold/Platinum)
- Historique des commandes

#### 4. Orders (Commandes)
- Numéro de commande unique
- Statut de livraison
- Articles commandés
- Montants (sous-total, livraison, total)
- Mode de paiement
- Adresse de livraison
- Info livreur

## Catégories de Produits

1. **Produits laitiers** (5 produits)
2. **Boulangerie** (1 produit)
3. **Produits frais** (1 produit)
4. **Épicerie** (9 produits)
5. **Boissons** (4 produits)
6. **Fruits & Légumes** (5 produits)
7. **Viandes** (3 produits)
8. **Poissons** (2 produits)
9. **Confiserie** (2 produits)

## Utilisation

### Importer la base de données:
```typescript
import { getAllProducts, searchProducts, STORES } from './database';

// Récupérer tous les produits
const products = getAllProducts();

// Rechercher des produits
const results = searchProducts('lait');

// Récupérer un produit par ID
const product = getProductById(1);

// Récupérer un produit par code-barre
const product = getProductByBarcode('3760074380534');
```

## Fichiers JSON

- `products.json` - Liste complète des produits
- `stores.json` - Liste des 8 magasins
- `users.json` - Données utilisateurs
- `orders.json` - Historique des commandes

## Service TypeScript

Le fichier `src/database.ts` fournit:
- Interfaces TypeScript pour tous les types
- Constantes avec toutes les données
- Fonctions utilitaires pour accéder aux données
- Fonctions de recherche et filtrage

## Données Complètes

### 30 Produits avec Codes-Barres:
1. Lait Entier Bio 1L - 3760074380534
2. Pain Complet 500g - 3760074380535
3. Œufs Bio x12 - 3760074380536
... (voir database.ts pour la liste complète)

### 8 Supermarchés:
1. Mahima Akwa
2. Casino Bonanjo
3. Carrefour Market
4. Santa Lucia
5. Score Supermarché
6. Orca Deco
7. Leader Price
8. Super U Douala

## Statut

✅ Base de données complète et fonctionnelle
✅ 30 produits avec codes-barres
✅ 8 magasins avec informations complètes
✅ Service TypeScript avec fonctions utilitaires
✅ Fichiers JSON pour persistance
