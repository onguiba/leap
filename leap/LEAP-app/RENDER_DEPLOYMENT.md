# 🚀 Déploiement sur Render.com - Guide Complet

Guide étape par étape pour déployer votre application PriceCheck sur Render.com.

---

## ✅ Prérequis

- Compte GitHub avec votre repository
- Compte Render.com (gratuit)
- Code poussé sur GitHub

---

## 🎯 Déploiement en 4 Étapes

### Étape 1: Pousser le Code sur GitHub

```bash
# Ajouter tous les fichiers
git add .

# Créer un commit
git commit -m "Add Render deployment configuration"

# Pousser le code
git push origin main
```

### Étape 2: Créer un Compte Render

1. Allez sur [render.com](https://render.com)
2. Cliquez sur **Sign Up**
3. Sélectionnez **Continue with GitHub**
4. Autorisez Render à accéder à vos repositories

### Étape 3: Créer un Nouveau Service

1. Cliquez sur **New +**
2. Sélectionnez **Web Service**
3. Sélectionnez votre repository `leap12`
4. Cliquez **Connect**

### Étape 4: Configurer le Service

Remplissez les informations:

- **Name:** `pricecheck` (ou votre nom)
- **Environment:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Plan:** `Free` (gratuit)

Cliquez **Create Web Service**

### Étape 5: Attendre le Déploiement

- Render va cloner votre repository
- Installer les dépendances
- Compiler le projet
- Déployer sur le serveur

**Cela prend environ 3-5 minutes.**

### Étape 6: Accéder à Votre Site

Une fois le déploiement terminé:
- Vous verrez un message "Deploy successful"
- Votre site sera accessible à: `https://pricecheck.onrender.com/`
- Cliquez sur le lien pour visiter votre site

---

## 🔧 Configuration Avancée

### Configurer les Variables d'Environnement

1. Allez sur votre service Render
2. Cliquez sur **Environment**
3. Cliquez sur **Add Environment Variable**
4. Entrez le nom et la valeur
5. Cliquez **Save**

Exemple:
```
VITE_API_URL=https://your-api.com
NODE_ENV=production
```

### Configurer un Domaine Personnalisé

1. Allez sur votre service Render
2. Cliquez sur **Settings**
3. Sous "Custom Domain", entrez votre domaine
4. Suivez les instructions pour configurer les DNS

### Configurer les Logs

1. Allez sur votre service Render
2. Cliquez sur **Logs**
3. Consultez les logs en temps réel

---

## 🔄 Déploiement Automatique

Une fois configuré, Render déploie automatiquement:
- À chaque push sur `main`
- À chaque pull request (preview deployment)

### Désactiver les Deployments Automatiques

1. Allez sur **Settings**
2. Sous "Auto-Deploy", sélectionnez **Off**

---

## 📊 Monitoring

### Voir les Logs de Build

1. Allez sur votre service Render
2. Cliquez sur **Logs**
3. Consultez les logs de build

### Voir les Erreurs

Si le déploiement échoue:
1. Allez sur **Logs**
2. Consultez les logs pour voir l'erreur

---

## 🐛 Dépannage

### Erreur: "Cannot find module"

**Solution:** Vérifiez que les dépendances sont installées.

```bash
# Vérifier que package.json existe à la racine
ls package.json

# Vérifier que les dépendances sont listées
cat package.json | grep dependencies
```

### Erreur: "Build failed"

**Solution:** Vérifiez les logs de build.

1. Allez sur **Logs**
2. Consultez les erreurs
3. Corrigez le problème
4. Poussez le code
5. Render redéploiera automatiquement

### Le site affiche une page blanche

**Solution:** Vérifiez les logs du navigateur (F12).

Causes possibles:
1. Les assets ne se chargent pas
2. Une erreur JavaScript
3. Le build n'a pas généré les fichiers correctement

### Les images ne s'affichent pas

**Solution:** Vérifiez les chemins des images.

1. Vérifiez que les images sont dans `public/IMAGES/`
2. Vérifiez que les chemins sont relatifs
3. Vérifiez que les images sont incluses dans le build

---

## 📈 Performance

### Optimiser les Performances

1. **Compression:** Render compresse automatiquement les assets
2. **Caching:** Configurez les headers de cache
3. **CDN:** Render utilise un CDN global

### Voir les Métriques

1. Allez sur votre service Render
2. Cliquez sur **Metrics**
3. Consultez les métriques de performance

---

## 🔐 Sécurité

### Protéger les Variables d'Environnement

1. Ne commitez jamais `.env` sur GitHub
2. Utilisez les variables d'environnement Render
3. Utilisez des secrets pour les données sensibles

---

## 📚 Documentation Officielle

- [Render Documentation](https://render.com/docs)
- [Render Node.js Guide](https://render.com/docs/deploy-node-express-app)
- [Render Environment Variables](https://render.com/docs/environment-variables)

---

## ✅ Checklist de Déploiement

- [ ] Code poussé sur GitHub
- [ ] Repository GitHub créé
- [ ] Compte Render créé
- [ ] Service créé dans Render
- [ ] Configuration vérifiée
- [ ] Déploiement réussi
- [ ] Site accessible en ligne
- [ ] Fonctionnalités testées
- [ ] Domaine personnalisé configuré (optionnel)

---

## 🎉 Félicitations!

Votre application PriceCheck est maintenant en ligne sur Render!

**Prochaines étapes:**
1. Partager le lien avec vos utilisateurs
2. Configurer un domaine personnalisé
3. Ajouter le backend API
4. Configurer les paiements

---

*Guide créé pour PriceCheck - 31 Mai 2026*
