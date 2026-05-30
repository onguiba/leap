# 📚 Index de la Documentation PriceCheck

## 🚀 Démarrage Rapide

**Nouveau sur le projet ?** Commencez ici:

1. **[POSTGRESQL_READY.md](POSTGRESQL_READY.md)** - Vue d'ensemble complète
2. **[DEMARRAGE_RAPIDE_POSTGRESQL.md](DEMARRAGE_RAPIDE_POSTGRESQL.md)** - Guide de démarrage rapide
3. **Exécutez:** `.\setup-database.ps1` - Installation automatique

## 📖 Documentation par Catégorie

### 🗄️ Base de Données PostgreSQL

| Fichier | Description | Quand l'utiliser |
|---------|-------------|------------------|
| **[POSTGRESQL_READY.md](POSTGRESQL_READY.md)** | Vue d'ensemble et prochaines étapes | Première lecture |
| **[DEMARRAGE_RAPIDE_POSTGRESQL.md](DEMARRAGE_RAPIDE_POSTGRESQL.md)** | Guide de démarrage rapide | Pour démarrer rapidement |
| **[SETUP_POSTGRESQL.md](SETUP_POSTGRESQL.md)** | Installation détaillée | Installation manuelle |
| **[COMMANDES_POSTGRESQL.md](COMMANDES_POSTGRESQL.md)** | Aide-mémoire des commandes | Référence quotidienne |
| **[MIGRATION_POSTGRESQL_COMPLETE.md](MIGRATION_POSTGRESQL_COMPLETE.md)** | Résumé de la migration | Vue d'ensemble |
| **[README_DATABASE.md](README_DATABASE.md)** | Documentation de la base | Schéma et structure |
| **[DATABASE_SETUP.md](DATABASE_SETUP.md)** | Configuration de la base | Setup initial |

### 📱 Application Mobile

| Fichier | Description | Quand l'utiliser |
|---------|-------------|------------------|
| **[README_MOBILE.md](README_MOBILE.md)** | Documentation mobile | Développement mobile |
| **[BUILD_APK.md](BUILD_APK.md)** | Build APK Android | Créer l'APK |
| **[INSTALLATION_MOBILE.md](INSTALLATION_MOBILE.md)** | Installation mobile | Installer sur téléphone |
| **[INSTALLATION_APK_SIMPLE.md](INSTALLATION_APK_SIMPLE.md)** | Installation simplifiée | Guide simple |
| **[INSTALLATION_COMPLETE.md](INSTALLATION_COMPLETE.md)** | Installation complète | Guide détaillé |
| **[TRANSFERT_APK_MANUEL.md](TRANSFERT_APK_MANUEL.md)** | Transfert manuel APK | Sans câble USB |
| **[INSTALLER_ANDROID_STUDIO.md](INSTALLER_ANDROID_STUDIO.md)** | Installation Android Studio | Setup développement |
| **[INSTALLER_SUR_TELEPHONE.txt](INSTALLER_SUR_TELEPHONE.txt)** | Installation téléphone | Guide utilisateur |

### 🔧 Fonctionnalités

| Fichier | Description | Quand l'utiliser |
|---------|-------------|------------------|
| **[SCANNER_GUIDE.md](SCANNER_GUIDE.md)** | Guide du scanner | Utiliser le scanner |
| **[ACCES_RAPIDE.md](ACCES_RAPIDE.md)** | Accès rapide | Raccourcis |
| **[SOLUTION_FINALE.md](SOLUTION_FINALE.md)** | Solution finale | Résolution problèmes |

### 🎨 Présentation

| Fichier | Description | Quand l'utiliser |
|---------|-------------|------------------|
| **[presentation-pricecheck.html](presentation-pricecheck.html)** | Présentation HTML | Démo visuelle |
| **[presentation-canva-guide.md](presentation-canva-guide.md)** | Guide Canva | Créer présentations |
| **[public/cahier-des-charges.html](public/cahier-des-charges.html)** | Cahier des charges | Spécifications |
| **[public/tech-database.html](public/tech-database.html)** | Documentation technique | Architecture |

### 🛠️ Scripts PowerShell

| Fichier | Description | Commande |
|---------|-------------|----------|
| **[setup-database.ps1](setup-database.ps1)** | Installation PostgreSQL | `.\setup-database.ps1` |
| **[installer-apk.ps1](installer-apk.ps1)** | Installation APK | `.\installer-apk.ps1` |
| **[check-android-setup.ps1](check-android-setup.ps1)** | Vérification Android | `.\check-android-setup.ps1` |
| **[install-direct.ps1](install-direct.ps1)** | Installation directe | `.\install-direct.ps1` |

### 📄 Documentation Générale

| Fichier | Description | Quand l'utiliser |
|---------|-------------|------------------|
| **[README.md](README.md)** | Documentation principale | Vue d'ensemble |
| **[INDEX_DOCUMENTATION.md](INDEX_DOCUMENTATION.md)** | Ce fichier | Navigation |

## 🎯 Guides par Objectif

### Je veux installer l'application

1. **Backend (PostgreSQL):**
   - Lisez: [DEMARRAGE_RAPIDE_POSTGRESQL.md](DEMARRAGE_RAPIDE_POSTGRESQL.md)
   - Exécutez: `.\setup-database.ps1`
   - Démarrez: `npm run dev:server`

2. **Frontend:**
   - Installez: `npm install`
   - Démarrez: `npm run dev`

3. **Mobile (Android):**
   - Lisez: [BUILD_APK.md](BUILD_APK.md)
   - Exécutez: `.\installer-apk.ps1`

### Je veux comprendre la base de données

1. [POSTGRESQL_READY.md](POSTGRESQL_READY.md) - Vue d'ensemble
2. [README_DATABASE.md](README_DATABASE.md) - Schéma détaillé
3. [COMMANDES_POSTGRESQL.md](COMMANDES_POSTGRESQL.md) - Commandes SQL

### Je veux développer une fonctionnalité

1. [README.md](README.md) - Architecture générale
2. [public/tech-database.html](public/tech-database.html) - Documentation technique
3. Code source dans `src/`

### Je veux déployer en production

1. [SETUP_POSTGRESQL.md](SETUP_POSTGRESQL.md) - Configuration production
2. [BUILD_APK.md](BUILD_APK.md) - Build mobile
3. `npm run build` - Build frontend

### J'ai un problème

1. [SOLUTION_FINALE.md](SOLUTION_FINALE.md) - Solutions courantes
2. [COMMANDES_POSTGRESQL.md](COMMANDES_POSTGRESQL.md) - Débogage PostgreSQL
3. Relancez: `.\setup-database.ps1`

## 📊 Structure du Projet

```
LEAP-app/
├── 📚 Documentation
│   ├── POSTGRESQL_READY.md              ⭐ Commencez ici
│   ├── DEMARRAGE_RAPIDE_POSTGRESQL.md   ⭐ Guide rapide
│   ├── SETUP_POSTGRESQL.md              📖 Installation détaillée
│   ├── COMMANDES_POSTGRESQL.md          📋 Commandes SQL
│   ├── README.md                        📄 Documentation principale
│   └── INDEX_DOCUMENTATION.md           📚 Ce fichier
│
├── 🔧 Scripts
│   ├── setup-database.ps1               ⚡ Installation auto PostgreSQL
│   ├── installer-apk.ps1                📱 Installation APK
│   └── check-android-setup.ps1          ✅ Vérification Android
│
├── 💾 Base de données
│   ├── prisma/schema.prisma             📊 Schéma Prisma
│   ├── prisma/seed.ts                   🌱 Données de test
│   └── .env                             🔐 Configuration
│
├── 🎨 Frontend
│   ├── src/                             💻 Code source
│   ├── public/                          🖼️ Assets
│   └── index.html                       🏠 Page principale
│
└── 🔌 Backend
    └── server/index.ts                  🚀 API Express
```

## 🔗 Liens Rapides

### Commandes Essentielles

```bash
# Installation
.\setup-database.ps1

# Développement
npm run dev:server    # Backend (port 3001)
npm run dev           # Frontend (port 5174)

# Base de données
npm run db:studio     # Interface graphique
npm run db:seed       # Données de test

# Mobile
.\installer-apk.ps1   # Build et install APK
```

### URLs Importantes

- Frontend: http://localhost:5174
- Backend API: http://localhost:3001
- Prisma Studio: http://localhost:5555
- API Health: http://localhost:3001/api/health

### Compte de Test

```
Email: test@pricecheck.cm
Téléphone: +237690000000
Mot de passe: password123
```

## 🎓 Parcours d'Apprentissage

### Niveau Débutant

1. [DEMARRAGE_RAPIDE_POSTGRESQL.md](DEMARRAGE_RAPIDE_POSTGRESQL.md)
2. [README.md](README.md)
3. Exécutez: `.\setup-database.ps1`
4. Testez l'application

### Niveau Intermédiaire

1. [SETUP_POSTGRESQL.md](SETUP_POSTGRESQL.md)
2. [README_DATABASE.md](README_DATABASE.md)
3. [COMMANDES_POSTGRESQL.md](COMMANDES_POSTGRESQL.md)
4. Explorez le code source

### Niveau Avancé

1. [public/tech-database.html](public/tech-database.html)
2. Modifiez `prisma/schema.prisma`
3. Créez des migrations
4. Déployez en production

## 📞 Support

### Problèmes PostgreSQL
- Consultez: [COMMANDES_POSTGRESQL.md](COMMANDES_POSTGRESQL.md)
- Section débogage: [SETUP_POSTGRESQL.md](SETUP_POSTGRESQL.md)

### Problèmes Mobile
- Consultez: [SOLUTION_FINALE.md](SOLUTION_FINALE.md)
- Vérifiez: `.\check-android-setup.ps1`

### Problèmes Généraux
- Relancez: `.\setup-database.ps1`
- Consultez: [README.md](README.md)

## 🎉 Prêt à Commencer ?

**Étape 1:** Lisez [POSTGRESQL_READY.md](POSTGRESQL_READY.md)

**Étape 2:** Exécutez `.\setup-database.ps1`

**Étape 3:** Démarrez l'application:
```bash
npm run dev:server  # Terminal 1
npm run dev         # Terminal 2
```

**Étape 4:** Accédez à http://localhost:5174

---

**Bon développement ! 🚀**
