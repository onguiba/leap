# 🎯 Premiers Pas - PriceCheck

Bienvenue! Voici comment démarrer rapidement avec PriceCheck.

---

## 1️⃣ Installation Locale (5 minutes)

### Prérequis
- Node.js 18+ ([télécharger](https://nodejs.org/))
- Git ([télécharger](https://git-scm.com/))

### Installation
```bash
# Cloner le projet
git clone https://github.com/YOUR_USERNAME/LEAP-app.git
cd LEAP-app

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

**Accédez à:** `http://localhost:5174/`

---

## 2️⃣ Tester Localement (2 minutes)

### Fonctionnalités à tester

1. **Accueil**
   - Cliquez sur "Voir le catalogue"
   - Vérifiez que les images s'affichent

2. **Catalogue**
   - Recherchez un produit (ex: "Lait")
   - Cliquez sur un produit pour voir les détails
   - Vérifiez les prix par magasin

3. **Panier**
   - Cliquez "Ajouter au panier"
   - Allez au panier (icône 🛒)
   - Vérifiez le total

4. **Scanner** (Simulation)
   - Allez à "Scanner"
   - Cliquez "Simuler un scan"
   - Vérifiez les résultats

---

## 3️⃣ Déployer en Ligne (3 minutes)

### Option A: Vercel (Recommandé)

```bash
# 1. Pousser sur GitHub
git push origin main

# 2. Allez sur vercel.com
# 3. Cliquez "New Project"
# 4. Importez votre repo GitHub
# 5. Cliquez "Deploy"
```

**Votre site:** `https://your-project.vercel.app/`

### Option B: GitHub Pages

```bash
# 1. Pousser sur GitHub
git push origin main

# 2. Allez sur Settings → Pages
# 3. Sélectionnez "GitHub Actions"
# 4. Attendez le déploiement
```

**Votre site:** `https://YOUR_USERNAME.github.io/LEAP-app/`

### Option C: Netlify

```bash
# 1. Pousser sur GitHub
git push origin main

# 2. Allez sur netlify.com
# 3. Cliquez "New site from Git"
# 4. Sélectionnez votre repo
# 5. Cliquez "Deploy"
```

**Votre site:** `https://your-site.netlify.app/`

---

## 4️⃣ Personnaliser (10 minutes)

### Changer les couleurs
Éditez `src/style.css`:
```css
:root {
  --primary: #00d084;      /* Vert */
  --secondary: #6366f1;    /* Bleu */
  --accent: #a855f7;       /* Violet */
}
```

### Ajouter vos produits
Éditez `src/database.ts`:
```typescript
const products = [
  {
    id: 1,
    name: "Votre produit",
    barcode: "1234567890",
    // ...
  }
];
```

### Changer le nom de l'app
Éditez `index.html`:
```html
<title>Votre Nom d'App</title>
```

---

## 5️⃣ Ajouter un Backend (Optionnel)

Si vous avez besoin d'une base de données:

```bash
# Générer le client Prisma
npm run db:generate

# Synchroniser la base de données
npm run db:push

# Peupler avec des données
npm run db:seed

# Voir l'interface graphique
npm run db:studio
```

---

## 📱 Tester sur Mobile

### Localement
```bash
# Votre IP locale (ex: 192.168.1.100)
http://192.168.1.100:5174/
```

### En ligne
- Ouvrez votre site Vercel/Netlify/GitHub Pages
- Cliquez "Ajouter à l'écran d'accueil"
- L'app s'installe comme une app native

---

## 🐛 Dépannage

### Le site ne démarre pas
```bash
# Vérifier les erreurs
npm run dev

# Réinstaller les dépendances
rm -r node_modules package-lock.json
npm install
```

### Les images ne s'affichent pas
- Vérifiez que les images sont dans `public/IMAGES/`
- Vérifiez les chemins dans le code
- Vérifiez la console (F12) pour les erreurs

### Le déploiement échoue
- Vérifiez les logs dans GitHub Actions / Vercel / Netlify
- Assurez-vous que `npm run build` fonctionne localement
- Vérifiez que `.env` n'est pas commité

---

## 📚 Documentation Complète

- **Déploiement:** Consultez `DEPLOYMENT.md`
- **Déploiement rapide:** Consultez `QUICK_DEPLOY.md`
- **Status du projet:** Consultez `PROJECT_STATUS.md`
- **Fonctionnalités:** Consultez `README.md`

---

## 🎉 Vous êtes Prêt!

Vous avez maintenant:
- ✅ Une app fonctionnelle localement
- ✅ Une app déployée en ligne
- ✅ Une app personnalisée
- ✅ Une app prête pour les utilisateurs

**Prochaines étapes:**
1. Partager le lien avec vos amis
2. Ajouter plus de produits
3. Configurer les paiements
4. Ajouter un backend API

---

## 💡 Conseils

- **Testez régulièrement** sur mobile
- **Sauvegardez votre code** sur GitHub
- **Lisez la documentation** pour les fonctionnalités avancées
- **Demandez de l'aide** si vous êtes bloqué

---

**Besoin d'aide?** Consultez les fichiers de documentation ou les commentaires dans le code.

**Bonne chance!** 🚀
