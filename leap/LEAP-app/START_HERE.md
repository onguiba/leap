# 🚀 COMMENCEZ ICI - PriceCheck avec PostgreSQL

## ⚡ Démarrage Ultra-Rapide (3 minutes)

### Étape 1: Installer PostgreSQL

Si PostgreSQL n'est pas installé, téléchargez-le ici:
👉 **https://www.postgresql.org/download/windows/**

Ou avec Chocolatey:
```bash
choco install postgresql
```

### Étape 2: Configuration Automatique

Exécutez ce script qui fait TOUT pour vous:

```bash
.\setup-database.ps1
```

Ce script va:
- ✅ Vérifier PostgreSQL
- ✅ Créer la base de données `pricecheck`
- ✅ Configurer `.env`
- ✅ Générer le client Prisma
- ✅ Créer toutes les tables
- ✅ Ajouter des données de test

### Étape 3: Démarrer l'Application

**Terminal 1 - Backend:**
```bash
npm run dev:server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Étape 4: Tester

Ouvrez votre navigateur: **http://localhost:5174**

Connectez-vous avec:
- Email: `test@pricecheck.cm`
- Mot de passe: `password123`

---

## 📚 Documentation Complète

Si vous voulez en savoir plus:

| Fichier | Description |
|---------|-------------|
| **[POSTGRESQL_READY.md](POSTGRESQL_READY.md)** | Vue d'ensemble complète ⭐ |
| **[DEMARRAGE_RAPIDE_POSTGRESQL.md](DEMARRAGE_RAPIDE_POSTGRESQL.md)** | Guide de démarrage rapide |
| **[INDEX_DOCUMENTATION.md](INDEX_DOCUMENTATION.md)** | Index de toute la documentation |
| **[RESUME_CONFIGURATION.txt](RESUME_CONFIGURATION.txt)** | Résumé visuel |

---

## 🛠️ Commandes Essentielles

```bash
# Installation automatique
.\setup-database.ps1

# Développement
npm run dev:server    # Backend (port 3001)
npm run dev           # Frontend (port 5174)

# Base de données
npm run db:studio     # Interface graphique
npm run db:seed       # Ajouter des données de test

# PostgreSQL
psql -U postgres -d pricecheck    # Se connecter à la base
```

---

## ❓ Problèmes ?

1. **PostgreSQL n'est pas installé**
   - Installez-le depuis: https://www.postgresql.org/download/windows/

2. **Erreur de connexion**
   - Vérifiez que PostgreSQL est démarré: `sc query postgresql-x64-16`
   - Vérifiez le mot de passe dans `.env`

3. **Autres problèmes**
   - Relancez: `.\setup-database.ps1`
   - Consultez: [DEMARRAGE_RAPIDE_POSTGRESQL.md](DEMARRAGE_RAPIDE_POSTGRESQL.md)

---

## 🎯 C'est Tout !

Vous êtes prêt à développer avec PostgreSQL !

**Prochaine étape:** Exécutez `.\setup-database.ps1` 🚀
