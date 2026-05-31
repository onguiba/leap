# 🚀 Guide de Déploiement - PriceCheck

## Déploiement sur GitHub Pages

### 1. Prérequis
- Compte GitHub
- Git installé localement
- Node.js 18+

### 2. Configuration Initiale

#### Étape 1: Créer un repository GitHub
```bash
# Initialiser git (si pas déjà fait)
git init
git add .
git commit -m "Initial commit: PriceCheck application"

# Ajouter le remote GitHub
git remote add origin https://github.com/YOUR_USERNAME/LEAP-app.git
git branch -M main
git push -u origin main
```

#### Étape 2: Activer GitHub Pages
1. Allez sur votre repository GitHub
2. Cliquez sur **Settings** → **Pages**
3. Sous "Build and deployment":
   - Source: **GitHub Actions**
   - Cliquez sur **Save**

### 3. Déploiement Automatique

Le workflow GitHub Actions se déclenche automatiquement à chaque push sur `main`:

```yaml
# Le workflow:
1. Installe les dépendances (npm ci)
2. Compile le projet (npm run build)
3. Déploie sur GitHub Pages
```

**Votre site sera disponible à:** `https://YOUR_USERNAME.github.io/LEAP-app/`

### 4. Vérifier le Déploiement

1. Allez sur **Actions** dans votre repository
2. Vérifiez que le workflow s'est exécuté avec succès (✅)
3. Visitez votre site: `https://YOUR_USERNAME.github.io/LEAP-app/`

### 5. Déploiement Manuel (Alternative)

Si vous préférez déployer manuellement:

```bash
# Build le projet
npm run build

# Déployer avec gh-pages
npm install -g gh-pages
gh-pages -d dist
```

## Déploiement sur Vercel (Recommandé)

Vercel offre un déploiement plus rapide et des performances meilleures.

### 1. Connecter Vercel à GitHub
1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **New Project**
3. Importez votre repository GitHub
4. Cliquez sur **Import**

### 2. Configuration Vercel
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- Cliquez sur **Deploy**

**Votre site sera disponible à:** `https://your-project-name.vercel.app/`

## Déploiement sur Netlify

### 1. Connecter Netlify à GitHub
1. Allez sur [netlify.com](https://netlify.com)
2. Cliquez sur **New site from Git**
3. Sélectionnez GitHub et votre repository
4. Cliquez sur **Connect**

### 2. Configuration Netlify
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- Cliquez sur **Deploy site**

**Votre site sera disponible à:** `https://your-site-name.netlify.app/`

## Variables d'Environnement

Pour les déploiements en production, configurez les variables d'environnement:

### GitHub Pages
1. Allez sur **Settings** → **Secrets and variables** → **Actions**
2. Cliquez sur **New repository secret**
3. Ajoutez vos variables (si nécessaire)

### Vercel/Netlify
1. Allez sur **Settings** → **Environment Variables**
2. Ajoutez vos variables:
   - `VITE_API_URL` (URL de votre API backend)
   - Autres variables nécessaires

## Checklist de Déploiement

- [ ] Code compilé sans erreurs (`npm run build`)
- [ ] Tous les fichiers sensibles sont dans `.gitignore`
- [ ] `.env` n'est pas commité
- [ ] Repository est public (ou accessible)
- [ ] GitHub Actions est activé
- [ ] GitHub Pages est configuré
- [ ] Site est accessible en ligne
- [ ] Fonctionnalités testées en production

## Dépannage

### Le site ne se déploie pas
1. Vérifiez les logs dans **Actions**
2. Assurez-vous que `npm run build` fonctionne localement
3. Vérifiez que `.gitignore` n'exclut pas les fichiers nécessaires

### Le site affiche une page blanche
1. Vérifiez la console du navigateur (F12)
2. Vérifiez que les assets sont chargés correctement
3. Vérifiez le chemin de base dans `vite.config.ts`

### Les images ne s'affichent pas
1. Vérifiez que les images sont dans le dossier `public/`
2. Vérifiez les chemins relatifs dans le code
3. Vérifiez que les images sont incluses dans le build

## Support

Pour plus d'aide:
- [Documentation Vite](https://vitejs.dev/)
- [Documentation GitHub Pages](https://docs.github.com/en/pages)
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Netlify](https://docs.netlify.com/)

---

**PriceCheck est maintenant prêt pour la production!** 🎉
