# 🔧 Correction du Déploiement Render.com

**Problème:** Render essayait de lancer `node server.js` mais le fichier n'existait pas à la racine.

**Solution:** Créer un serveur Express à la racine pour servir l'application compilée.

---

## 📁 Fichiers Ajoutés

### 1. `server.js`
Serveur Express qui:
- Sert les fichiers statiques du build (`leap/LEAP-app/dist`)
- Redirige toutes les routes vers `index.html` (SPA routing)
- Écoute sur le port 3000

```javascript
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques
const distPath = join(__dirname, 'leap/LEAP-app/dist');
app.use(express.static(distPath));

// Rediriger toutes les routes vers index.html
app.get('*', (req, res) => {
  res.sendFile(join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

### 2. `render.yaml`
Configuration Render pour:
- Build: `cd leap/LEAP-app && npm install && npm run build`
- Start: `cd leap/LEAP-app && npm run preview`

### 3. `package.json` (Mise à jour)
Ajout de:
- `"type": "module"` - Pour utiliser les imports ES6
- `"start": "node server.js"` - Script de démarrage
- `"express": "^5.2.1"` - Dépendance Express

---

## 🚀 Déploiement Render.com (Corrigé)

### Étape 1: Pousser sur GitHub
```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### Étape 2: Créer un Service Render
1. Allez sur [render.com](https://render.com)
2. Cliquez **New +** → **Web Service**
3. Sélectionnez votre repository `leap12`
4. Cliquez **Connect**

### Étape 3: Configurer le Service
- **Name:** `pricecheck`
- **Environment:** `Node`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Plan:** `Free`

### Étape 4: Déploiement Réussi
- Render va cloner votre repository
- Installer les dépendances
- Compiler le projet
- Lancer le serveur Express
- Votre site sera accessible à: `https://pricecheck.onrender.com/`

---

## 📚 Guides Disponibles

- **RENDER_DEPLOYMENT.md** - Guide complet pour Render
- **leap/LEAP-app/START_DEPLOYMENT.md** - Commencer le déploiement
- **leap/LEAP-app/QUICK_DEPLOY.md** - Déploiement rapide
- **leap/LEAP-app/DEPLOYMENT.md** - Toutes les options

---

## ✅ Checklist

- [ ] Fichiers ajoutés (server.js, render.yaml, package.json)
- [ ] Code poussé sur GitHub
- [ ] Service créé dans Render
- [ ] Build réussi
- [ ] Site accessible en ligne

---

## 🎯 Avantages de Render

- ✅ Gratuit (plan Free)
- ✅ Déploiement automatique
- ✅ Support Node.js
- ✅ Variables d'environnement
- ✅ Domaine personnalisé
- ✅ Logs en temps réel
- ✅ Monitoring

---

**Votre déploiement Render est maintenant corrigé!** 🎉
