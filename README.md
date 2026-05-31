# 🛒 LEAP - PriceCheck

Application mobile et web pour comparer les prix des produits dans les supermarchés de Douala, Cameroun.

## 📁 Structure du Projet

```
leap12/
├── leap/
│   └── LEAP-app/          # Application principale
│       ├── src/           # Code source
│       ├── public/        # Assets statiques
│       ├── dist/          # Build production
│       ├── package.json   # Dépendances
│       └── ...
├── vercel.json            # Configuration Vercel
├── package.json           # Scripts racine
└── README.md              # Ce fichier
```

## 🚀 Démarrage Rapide

### Installation
```bash
npm run install-all
```

### Développement
```bash
npm run dev
```

### Build Production
```bash
npm run build
```

### Prévisualisation
```bash
npm run preview
```

## 📱 Application

L'application principale se trouve dans `leap/LEAP-app/`.

Pour plus de détails, consultez:
- `leap/LEAP-app/README.md` - Documentation complète
- `leap/LEAP-app/START_DEPLOYMENT.md` - Guide de déploiement
- `leap/LEAP-app/FIRST_STEPS.md` - Guide pour les premiers pas

## 🌐 Déploiement

### Vercel (Recommandé)
```bash
# Le déploiement se fait automatiquement via GitHub
# Vercel détecte vercel.json et déploie automatiquement
```

### GitHub Pages
```bash
git push origin main
# Le workflow GitHub Actions se déclenche automatiquement
```

### Netlify
```bash
# Connectez votre repository GitHub à Netlify
# Netlify détecte netlify.toml et déploie automatiquement
```

## 📚 Documentation

- **Déploiement:** `leap/LEAP-app/DEPLOYMENT.md`
- **Premiers pas:** `leap/LEAP-app/FIRST_STEPS.md`
- **Configuration GitHub:** `leap/LEAP-app/GITHUB_SETUP.md`
- **Status du projet:** `leap/LEAP-app/PROJECT_STATUS.md`

## ✨ Fonctionnalités

- 🔍 Recherche de produits
- 📱 Scanner de code-barre
- 💰 Comparaison de prix
- 🛍️ Panier d'achat
- 💳 Paiements multiples
- 📊 Suivi de commande
- ⭐ Avis clients
- 💰 Programme fidélité

## 🛠️ Technologies

- **Frontend:** TypeScript, HTML5, CSS3, Vite
- **Backend:** Node.js, Express, Prisma ORM
- **Base de données:** PostgreSQL
- **Mobile:** Capacitor, PWA
- **Déploiement:** Vercel, GitHub Pages, Netlify

## 📝 License

MIT

## 👥 Auteurs

Équipe PriceCheck

---

**Prêt à déployer?** Consultez `leap/LEAP-app/START_DEPLOYMENT.md`
