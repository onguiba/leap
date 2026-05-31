# 🚀 Déploiement sur Vercel - Guide Complet

Guide étape par étape pour déployer votre application PriceCheck sur Vercel.

---

## ✅ Prérequis

- Compte GitHub avec votre repository
- Compte Vercel (gratuit)
- Code poussé sur GitHub

---

## 🎯 Déploiement en 3 Étapes

### Étape 1: Pousser le Code sur GitHub

```bash
# Initialiser git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit: PriceCheck application"

# Ajouter le remote GitHub
git remote add origin https://github.com/YOUR_USERNAME/leap12.git

# Renommer la branche en 'main'
git branch -M main

# Pousser le code
git push -u origin main
```

**Remplacez `YOUR_USERNAME` par votre nom d'utilisateur GitHub!**

### Étape 2: Connecter Vercel à GitHub

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **Sign Up** (ou **Sign In** si vous avez déjà un compte)
3. Sélectionnez **Continue with GitHub**
4. Autorisez Vercel à accéder à vos repositories

### Étape 3: Créer un Nouveau Projet

1. Cliquez sur **New Project**
2. Sélectionnez votre repository `leap12`
3. Cliquez sur **Import**

### Étape 4: Configurer le Projet

Vercel devrait détecter automatiquement:
- **Framework:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

**Si ce n'est pas le cas, configurez manuellement:**

1. Cliquez sur **Environment Variables** (optionnel)
2. Ajoutez vos variables d'environnement si nécessaire
3. Cliquez sur **Deploy**

### Étape 5: Attendre le Déploiement

- Vercel va cloner votre repository
- Installer les dépendances
- Compiler le projet
- Déployer sur le CDN global

**Cela prend environ 2-3 minutes.**

### Étape 6: Accéder à Votre Site

Une fois le déploiement terminé:
- Vous verrez un message "Congratulations!"
- Votre site sera accessible à: `https://your-project.vercel.app/`
- Cliquez sur le lien pour visiter votre site

---

## 🔧 Configuration Avancée

### Configurer un Domaine Personnalisé

1. Allez sur votre projet Vercel
2. Cliquez sur **Settings** → **Domains**
3. Cliquez sur **Add Domain**
4. Entrez votre domaine (ex: `pricecheck.cm`)
5. Suivez les instructions pour configurer les DNS

### Configurer les Variables d'Environnement

1. Allez sur **Settings** → **Environment Variables**
2. Cliquez sur **Add New**
3. Entrez le nom et la valeur
4. Sélectionnez les environnements (Production, Preview, Development)
5. Cliquez sur **Save**

### Configurer les Redirects

Les redirects sont déjà configurés dans `vercel.json`:
```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```

Cela redirige toutes les routes vers `index.html` pour le SPA routing.

---

## 🔄 Déploiement Automatique

Une fois configuré, Vercel déploie automatiquement:
- À chaque push sur `main`
- À chaque pull request (preview deployment)

### Désactiver les Deployments Automatiques

1. Allez sur **Settings** → **Git**
2. Sous "Deploy on Push", cliquez sur **Disabled**

---

## 📊 Monitoring et Logs

### Voir les Logs de Build

1. Allez sur votre projet Vercel
2. Cliquez sur **Deployments**
3. Sélectionnez un déploiement
4. Cliquez sur **View Build Logs**

### Voir les Erreurs

Si le déploiement échoue:
1. Allez sur **Deployments**
2. Cliquez sur le déploiement échoué
3. Consultez les logs pour voir l'erreur

---

## 🐛 Dépannage

### Erreur: "Root directory does not exist"

**Solution:** Vercel cherche le `package.json` à la racine.

Vérifiez que:
1. `vercel.json` est à la racine du repository
2. `package.json` est à la racine du repository
3. `buildCommand` pointe vers le bon dossier

### Erreur: "npm ERR! code ENOENT"

**Solution:** Les dépendances ne sont pas installées.

Vérifiez que:
1. `package.json` existe dans `leap/LEAP-app/`
2. `package-lock.json` est commité
3. Pas de fichiers `.gitignore` qui excluent les dépendances

### Le site affiche une page blanche

**Solution:** Vérifiez les logs du navigateur (F12).

Causes possibles:
1. Les assets ne se chargent pas (vérifiez les chemins)
2. Une erreur JavaScript (vérifiez la console)
3. Le build n'a pas généré les fichiers correctement

### Les images ne s'affichent pas

**Solution:** Vérifiez les chemins des images.

1. Vérifiez que les images sont dans `public/IMAGES/`
2. Vérifiez que les chemins sont relatifs (ex: `/IMAGES/image.jpg`)
3. Vérifiez que les images sont incluses dans le build

---

## 📈 Performance

### Optimiser les Performances

1. **Compression:** Vercel compresse automatiquement les assets
2. **CDN:** Vercel utilise un CDN global
3. **Caching:** Configurez les headers de cache dans `vercel.json`

### Voir les Métriques

1. Allez sur votre projet Vercel
2. Cliquez sur **Analytics**
3. Consultez les métriques de performance

---

## 🔐 Sécurité

### Protéger les Variables d'Environnement

1. Ne commitez jamais `.env` sur GitHub
2. Utilisez les variables d'environnement Vercel
3. Utilisez des secrets pour les données sensibles

### Configurer les Headers de Sécurité

Vous pouvez ajouter des headers de sécurité dans `vercel.json`:

```json
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      {
        "key": "X-Content-Type-Options",
        "value": "nosniff"
      },
      {
        "key": "X-Frame-Options",
        "value": "DENY"
      }
    ]
  }
]
```

---

## 📚 Documentation Officielle

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ Checklist de Déploiement

- [ ] Code poussé sur GitHub
- [ ] Repository GitHub créé
- [ ] Compte Vercel créé
- [ ] Repository importé dans Vercel
- [ ] Configuration vérifiée
- [ ] Déploiement réussi
- [ ] Site accessible en ligne
- [ ] Fonctionnalités testées
- [ ] Domaine personnalisé configuré (optionnel)

---

## 🎉 Félicitations!

Votre application PriceCheck est maintenant en ligne sur Vercel!

**Prochaines étapes:**
1. Partager le lien avec vos utilisateurs
2. Configurer un domaine personnalisé
3. Ajouter le backend API
4. Configurer les paiements

---

*Guide créé pour PriceCheck - 31 Mai 2026*
