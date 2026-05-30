# Configuration PostgreSQL pour PriceCheck

## Installation de PostgreSQL sur Windows

### Option 1: Installation avec l'installeur officiel (Recommandé)

1. Téléchargez PostgreSQL depuis: https://www.postgresql.org/download/windows/
2. Lancez l'installeur et suivez les étapes:
   - Choisissez le répertoire d'installation
   - Sélectionnez les composants (PostgreSQL Server, pgAdmin 4, Command Line Tools)
   - Définissez le mot de passe pour l'utilisateur `postgres` (par défaut: `postgres`)
   - Port par défaut: `5432`
   - Locale: `French, France` ou `Default locale`

3. Vérifiez l'installation:
```bash
psql --version
```

### Option 2: Installation avec Chocolatey

```bash
choco install postgresql
```

## Configuration de la base de données

### 1. Créer la base de données

Ouvrez PowerShell ou CMD et connectez-vous à PostgreSQL:

```bash
psql -U postgres
```

Entrez le mot de passe que vous avez défini lors de l'installation.

Puis créez la base de données:

```sql
CREATE DATABASE pricecheck;
\q
```

### 2. Configurer le fichier .env

Le fichier `.env` a été créé avec la configuration par défaut:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pricecheck?schema=public"
```

Si vous avez utilisé un mot de passe différent, modifiez la ligne:
```env
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/pricecheck?schema=public"
```

### 3. Initialiser la base de données avec Prisma

```bash
# Générer le client Prisma
npm run db:generate

# Créer les tables dans la base de données
npm run db:push

# Peupler la base de données avec des données de test
npm run db:seed
```

## Commandes utiles

### Gestion de la base de données

```bash
# Générer le client Prisma après modification du schema
npm run db:generate

# Synchroniser le schema avec la base de données (développement)
npm run db:push

# Créer une migration (production)
npm run db:migrate

# Peupler la base de données
npm run db:seed

# Ouvrir Prisma Studio (interface graphique)
npm run db:studio
```

### Commandes PostgreSQL

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Lister les bases de données
\l

# Se connecter à une base de données
\c pricecheck

# Lister les tables
\dt

# Voir la structure d'une table
\d products

# Quitter
\q
```

### Réinitialiser la base de données

Si vous voulez repartir de zéro:

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Supprimer et recréer la base de données
DROP DATABASE pricecheck;
CREATE DATABASE pricecheck;
\q

# Puis réinitialiser avec Prisma
npm run db:push
npm run db:seed
```

## Vérification de l'installation

1. Démarrez le serveur:
```bash
npm run dev:server
```

2. Vérifiez que le serveur se connecte à PostgreSQL:
```
🚀 API listening on http://localhost:3001
📊 Database: PostgreSQL
```

3. Testez l'API:
```bash
curl http://localhost:3001/api/health
```

Vous devriez recevoir:
```json
{"ok":true,"message":"API is running"}
```

## Dépannage

### Erreur: "password authentication failed"

Vérifiez que le mot de passe dans `DATABASE_URL` correspond au mot de passe PostgreSQL.

### Erreur: "database does not exist"

Créez la base de données:
```bash
psql -U postgres -c "CREATE DATABASE pricecheck;"
```

### Erreur: "psql: command not found"

Ajoutez PostgreSQL au PATH:
1. Cherchez le dossier d'installation (généralement `C:\Program Files\PostgreSQL\16\bin`)
2. Ajoutez-le aux variables d'environnement PATH

### Le serveur PostgreSQL ne démarre pas

Vérifiez le service Windows:
```bash
# Démarrer le service
net start postgresql-x64-16

# Vérifier le statut
sc query postgresql-x64-16
```

## Accès à pgAdmin 4

pgAdmin 4 est une interface graphique pour gérer PostgreSQL:

1. Ouvrez pgAdmin 4 depuis le menu Démarrer
2. Connectez-vous avec le mot de passe `postgres`
3. Naviguez vers: Servers > PostgreSQL > Databases > pricecheck
4. Explorez les tables, exécutez des requêtes SQL, etc.

## Migration depuis SQLite (si applicable)

Si vous aviez une base SQLite, vous pouvez exporter/importer les données:

1. Exportez les données depuis SQLite
2. Utilisez `prisma db push` pour créer les tables PostgreSQL
3. Importez les données dans PostgreSQL

Ou utilisez simplement `npm run db:seed` pour repartir avec des données de test.
