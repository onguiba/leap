# 🚀 Démarrage Rapide - PostgreSQL

## Installation automatique (Recommandé)

Exécutez simplement ce script PowerShell qui fait tout pour vous:

```powershell
.\setup-database.ps1
```

Le script va:
- ✅ Vérifier que PostgreSQL est installé
- ✅ Créer la base de données `pricecheck`
- ✅ Configurer le fichier `.env`
- ✅ Générer le client Prisma
- ✅ Créer toutes les tables
- ✅ Ajouter des données de test

## Installation manuelle

### 1. Installer PostgreSQL

Si PostgreSQL n'est pas installé:

**Option A: Installeur officiel**
- Téléchargez: https://www.postgresql.org/download/windows/
- Installez avec le mot de passe: `postgres`
- Port: `5432`

**Option B: Chocolatey**
```bash
choco install postgresql
```

### 2. Créer la base de données

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE pricecheck;

# Quitter
\q
```

### 3. Configurer l'application

Le fichier `.env` est déjà créé avec:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pricecheck?schema=public"
```

Si votre mot de passe est différent, modifiez la ligne.

### 4. Initialiser la base de données

```bash
# Installer les dépendances
npm install

# Générer le client Prisma
npm run db:generate

# Créer les tables
npm run db:push

# Ajouter des données de test
npm run db:seed
```

## Démarrer l'application

### Terminal 1: Backend
```bash
npm run dev:server
```

Vous devriez voir:
```
🚀 API listening on http://localhost:3001
📊 Database: PostgreSQL
```

### Terminal 2: Frontend
```bash
npm run dev
```

Accédez à: http://localhost:5174

## Compte de test

Utilisez ces identifiants pour vous connecter:

- **Email**: test@pricecheck.cm
- **Téléphone**: +237690000000
- **Mot de passe**: password123

## Commandes utiles

```bash
# Voir les données dans une interface graphique
npm run db:studio

# Réinitialiser la base de données
npm run db:push
npm run db:seed

# Voir les logs PostgreSQL
psql -U postgres -d pricecheck -c "SELECT * FROM products LIMIT 5;"
```

## Vérification rapide

Testez l'API:
```bash
curl http://localhost:3001/api/health
```

Réponse attendue:
```json
{"ok":true,"message":"API is running"}
```

## Problèmes courants

### "psql: command not found"
Ajoutez PostgreSQL au PATH ou utilisez le chemin complet:
```bash
"C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres
```

### "password authentication failed"
Vérifiez le mot de passe dans le fichier `.env`

### "database does not exist"
Créez la base de données:
```bash
psql -U postgres -c "CREATE DATABASE pricecheck;"
```

### Le service PostgreSQL ne démarre pas
```bash
net start postgresql-x64-16
```

## Documentation complète

Pour plus de détails, consultez: `SETUP_POSTGRESQL.md`
