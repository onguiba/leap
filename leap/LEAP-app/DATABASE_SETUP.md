# 🗄️ Configuration de la Base de Données PostgreSQL

Ce guide vous aide à configurer PostgreSQL pour PriceCheck.

## 📋 Prérequis

- Node.js 18+
- PostgreSQL 14+ installé

## 🚀 Installation Rapide

### 1. Installer PostgreSQL

#### Windows
```bash
# Télécharger depuis: https://www.postgresql.org/download/windows/
# Ou avec Chocolatey:
choco install postgresql
```

#### macOS
```bash
brew install postgresql@14
brew services start postgresql@14
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Créer la Base de Données

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Dans psql:
CREATE DATABASE pricecheck;
CREATE USER pricecheck_user WITH PASSWORD 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE pricecheck TO pricecheck_user;
\q
```

### 3. Configurer les Variables d'Environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer .env et mettre à jour:
DATABASE_URL="postgresql://pricecheck_user:votre_mot_de_passe@localhost:5432/pricecheck?schema=public"
JWT_SECRET="générer-une-clé-secrète-ici"
```

Pour générer une clé JWT sécurisée:
```bash
# Linux/macOS
openssl rand -base64 32

# Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### 4. Installer les Dépendances

```bash
npm install
```

### 5. Initialiser la Base de Données

```bash
# Générer le client Prisma
npm run db:generate

# Créer les tables
npm run db:push

# Peupler avec les données initiales
npm run db:seed
```

## 🎯 Commandes Utiles

### Développement

```bash
# Démarrer le frontend
npm run dev

# Démarrer le backend (dans un autre terminal)
npm run dev:server

# Ouvrir Prisma Studio (interface graphique)
npm run db:studio
```

### Base de Données

```bash
# Créer une migration
npm run db:migrate

# Réinitialiser la base de données
npx prisma migrate reset

# Voir les données (interface web)
npm run db:studio
```

## 📊 Structure de la Base de Données

### Tables Principales

- **products** - Catalogue de produits
- **stores** - Magasins partenaires
- **prices** - Prix par produit et magasin
- **users** - Utilisateurs de l'application
- **orders** - Commandes
- **order_items** - Articles de commande
- **delivery_drivers** - Livreurs
- **deliveries** - Livraisons
- **reviews** - Avis clients
- **wallet_transactions** - Transactions du portefeuille
- **auth_events** - Journal d'authentification

## 🔐 Utilisateur de Test

Après le seeding, vous pouvez vous connecter avec:

- **Email**: test@pricecheck.cm
- **Téléphone**: +237690000000
- **Mot de passe**: password123

## 🐳 Alternative: Docker (Optionnel)

Si vous préférez utiliser Docker:

```bash
# Créer docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: pricecheck
      POSTGRES_USER: pricecheck_user
      POSTGRES_PASSWORD: pricecheck_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
EOF

# Démarrer PostgreSQL
docker-compose up -d

# Mettre à jour .env
DATABASE_URL="postgresql://pricecheck_user:pricecheck_password@localhost:5432/pricecheck?schema=public"
```

## 🔧 Dépannage

### Erreur de connexion PostgreSQL

```bash
# Vérifier que PostgreSQL est démarré
# Windows
pg_ctl status

# macOS
brew services list

# Linux
sudo systemctl status postgresql
```

### Réinitialiser complètement

```bash
# Supprimer et recréer la base
psql -U postgres -c "DROP DATABASE IF EXISTS pricecheck;"
psql -U postgres -c "CREATE DATABASE pricecheck;"

# Réinitialiser Prisma
npx prisma migrate reset --force
npm run db:seed
```

### Erreur "relation does not exist"

```bash
# Recréer les tables
npm run db:push
```

## 📚 Ressources

- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation PostgreSQL](https://www.postgresql.org/docs/)
- [Prisma Studio](https://www.prisma.io/studio)

## 🎉 Prochaines Étapes

Une fois la base de données configurée:

1. Démarrer le backend: `npm run dev:server`
2. Démarrer le frontend: `npm run dev`
3. Ouvrir http://localhost:5174
4. Tester l'authentification avec l'utilisateur de test

---

**Besoin d'aide?** Consultez les logs du serveur pour plus de détails sur les erreurs.
