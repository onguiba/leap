# 📋 Commandes PostgreSQL - Aide-Mémoire

## 🚀 Installation et Configuration

### Installation PostgreSQL

```bash
# Avec Chocolatey
choco install postgresql

# Vérifier l'installation
psql --version
```

### Configuration automatique

```bash
# Tout en un seul script
.\setup-database.ps1
```

## 🗄️ Gestion de la Base de Données

### Connexion

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Se connecter à une base spécifique
psql -U postgres -d pricecheck
```

### Création/Suppression

```bash
# Créer la base de données
psql -U postgres -c "CREATE DATABASE pricecheck;"

# Supprimer la base de données
psql -U postgres -c "DROP DATABASE pricecheck;"

# Recréer (reset complet)
psql -U postgres -c "DROP DATABASE IF EXISTS pricecheck;"
psql -U postgres -c "CREATE DATABASE pricecheck;"
```

### Commandes SQL dans psql

```sql
-- Lister toutes les bases de données
\l

-- Se connecter à une base
\c pricecheck

-- Lister toutes les tables
\dt

-- Voir la structure d'une table
\d products
\d+ products  -- Version détaillée

-- Lister les utilisateurs
\du

-- Quitter
\q
```

## 📊 Requêtes SQL Utiles

### Consulter les données

```sql
-- Voir tous les produits
SELECT * FROM products;

-- Voir les 5 premiers produits
SELECT * FROM products LIMIT 5;

-- Compter les produits
SELECT COUNT(*) FROM products;

-- Voir les magasins
SELECT * FROM stores;

-- Voir les prix avec détails
SELECT p.name, s.name as store, pr.price 
FROM prices pr
JOIN products p ON pr.product_id = p.id
JOIN stores s ON pr.store_id = s.id
ORDER BY p.name, pr.price;

-- Voir les utilisateurs
SELECT id, name, email, phone, role FROM users;

-- Voir les commandes récentes
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;
```

### Modifier les données

```sql
-- Mettre à jour un prix
UPDATE prices SET price = 1500 WHERE product_id = 1 AND store_id = 1;

-- Ajouter du solde à un utilisateur
UPDATE users SET wallet_balance = wallet_balance + 10000 WHERE id = 1;

-- Supprimer toutes les commandes
DELETE FROM orders;

-- Réinitialiser une table
TRUNCATE TABLE orders CASCADE;
```

### Statistiques

```sql
-- Prix moyen par produit
SELECT p.name, AVG(pr.price) as avg_price
FROM products p
JOIN prices pr ON p.id = pr.product_id
GROUP BY p.name
ORDER BY avg_price DESC;

-- Nombre de produits par catégorie
SELECT category, COUNT(*) as count
FROM products
GROUP BY category
ORDER BY count DESC;

-- Magasins par ville
SELECT city, COUNT(*) as count
FROM stores
GROUP BY city;

-- Commandes par statut
SELECT status, COUNT(*) as count
FROM orders
GROUP BY status;
```

## 🔧 Commandes Prisma

### Génération et Migration

```bash
# Générer le client Prisma (après modification du schema)
npm run db:generate

# Synchroniser le schéma avec la base (développement)
npm run db:push

# Créer une migration (production)
npm run db:migrate

# Appliquer les migrations
npx prisma migrate deploy

# Réinitialiser la base de données
npx prisma migrate reset
```

### Seeding

```bash
# Peupler la base de données
npm run db:seed

# Ou directement
npx tsx prisma/seed.ts
```

### Prisma Studio

```bash
# Ouvrir l'interface graphique
npm run db:studio

# Ou directement
npx prisma studio
```

Prisma Studio s'ouvre sur `http://localhost:5555`

## 🔍 Débogage

### Vérifier la connexion

```bash
# Tester la connexion
psql -U postgres -d pricecheck -c "SELECT 1;"

# Voir les connexions actives
psql -U postgres -c "SELECT * FROM pg_stat_activity WHERE datname = 'pricecheck';"
```

### Logs PostgreSQL

```bash
# Voir les logs (Windows)
# Emplacement: C:\Program Files\PostgreSQL\16\data\log\

# Ou via psql
psql -U postgres -c "SHOW log_directory;"
psql -U postgres -c "SHOW log_filename;"
```

### Service Windows

```bash
# Démarrer le service
net start postgresql-x64-16

# Arrêter le service
net stop postgresql-x64-16

# Redémarrer le service
net stop postgresql-x64-16 && net start postgresql-x64-16

# Vérifier le statut
sc query postgresql-x64-16
```

## 🔐 Gestion des Utilisateurs PostgreSQL

```sql
-- Créer un nouvel utilisateur
CREATE USER pricecheck_user WITH PASSWORD 'secure_password';

-- Donner tous les droits sur la base
GRANT ALL PRIVILEGES ON DATABASE pricecheck TO pricecheck_user;

-- Donner les droits sur toutes les tables
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO pricecheck_user;

-- Voir les utilisateurs
\du
```

## 💾 Sauvegarde et Restauration

### Sauvegarde

```bash
# Sauvegarder la base de données
pg_dump -U postgres pricecheck > backup.sql

# Sauvegarder avec compression
pg_dump -U postgres pricecheck | gzip > backup.sql.gz

# Sauvegarder uniquement les données
pg_dump -U postgres --data-only pricecheck > data.sql

# Sauvegarder uniquement le schéma
pg_dump -U postgres --schema-only pricecheck > schema.sql
```

### Restauration

```bash
# Restaurer depuis un fichier
psql -U postgres pricecheck < backup.sql

# Restaurer depuis un fichier compressé
gunzip -c backup.sql.gz | psql -U postgres pricecheck

# Restaurer en recréant la base
psql -U postgres -c "DROP DATABASE IF EXISTS pricecheck;"
psql -U postgres -c "CREATE DATABASE pricecheck;"
psql -U postgres pricecheck < backup.sql
```

## 📈 Performance

### Analyser les requêtes

```sql
-- Voir le plan d'exécution
EXPLAIN SELECT * FROM products WHERE category = 'Épicerie';

-- Avec analyse détaillée
EXPLAIN ANALYZE SELECT * FROM products WHERE category = 'Épicerie';

-- Voir les index
\di

-- Créer un index
CREATE INDEX idx_products_category ON products(category);
```

### Statistiques

```sql
-- Taille de la base de données
SELECT pg_size_pretty(pg_database_size('pricecheck'));

-- Taille des tables
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Nombre de lignes par table
SELECT 
  schemaname,
  tablename,
  n_live_tup as row_count
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;
```

## 🛠️ Maintenance

```sql
-- Nettoyer et analyser
VACUUM ANALYZE;

-- Nettoyer une table spécifique
VACUUM ANALYZE products;

-- Réindexer
REINDEX DATABASE pricecheck;

-- Mettre à jour les statistiques
ANALYZE;
```

## 🔗 Ressources

- Documentation PostgreSQL: https://www.postgresql.org/docs/
- Documentation Prisma: https://www.prisma.io/docs/
- pgAdmin 4: Interface graphique pour PostgreSQL
- Prisma Studio: Interface graphique pour Prisma

## 📞 Support

En cas de problème:
1. Vérifiez que PostgreSQL est démarré: `sc query postgresql-x64-16`
2. Testez la connexion: `psql -U postgres -d pricecheck -c "SELECT 1;"`
3. Vérifiez le fichier `.env`
4. Consultez les logs PostgreSQL
5. Relancez `.\setup-database.ps1`
