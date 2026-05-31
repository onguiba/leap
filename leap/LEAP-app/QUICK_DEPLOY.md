# ⚡ Déploiement Rapide - 3 Étapes

## Option 1: GitHub Pages (Gratuit, Simple)

### Étape 1: Créer un repository GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/LEAP-app.git
git branch -M main
git push -u origin main
```

### Étape 2: Activer GitHub Pages
1. Allez sur votre repo → **Settings** → **Pages**
2. Sélectionnez **GitHub Actions** comme source
3. Cliquez **Save**

### Étape 3: Vérifier le déploiement
- Allez sur **Actions** et attendez que le workflow se termine ✅
- Votre site sera à: `https://YOUR_USERNAME.github.io/LEAP-app/`

---

## Option 2: Vercel (Recommandé, Très Rapide)

### Étape 1: Pousser sur GitHub
```bash
git push origin main
```

### Étape 2: Déployer sur Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez **New Project**
3. Importez votre repository GitHub
4. Cliquez **Deploy**

### Étape 3: Accéder au site
- Votre site sera à: `https://your-project.vercel.app/`

---

## Option 3: Netlify (Gratuit, Facile)

### Étape 1: Pousser sur GitHub
```bash
git push origin main
```

### Étape 2: Déployer sur Netlify
1. Allez sur [netlify.com](https://netlify.com)
2. Cliquez **New site from Git**
3. Sélectionnez GitHub et votre repo
4. Cliquez **Deploy site**

### Étape 3: Accéder au site
- Votre site sera à: `https://your-site.netlify.app/`

---

## ✅ Vérification Finale

Après le déploiement, testez:

- [ ] Page d'accueil charge correctement
- [ ] Catalogue des produits s'affiche
- [ ] Recherche fonctionne
- [ ] Panier fonctionne
- [ ] Images s'affichent correctement
- [ ] Responsive design (mobile/desktop)
- [ ] Pas d'erreurs dans la console (F12)

---

## 🎉 Félicitations!

Votre application PriceCheck est maintenant en ligne et accessible au monde entier!

**Prochaines étapes:**
1. Partager le lien avec vos utilisateurs
2. Configurer un domaine personnalisé (optionnel)
3. Ajouter un backend API (si nécessaire)
4. Configurer les paiements (Orange Money, MTN)

---

**Besoin d'aide?** Consultez `DEPLOYMENT.md` pour plus de détails.
