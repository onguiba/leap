# 🐙 Configuration GitHub - PriceCheck

Guide étape par étape pour créer et configurer votre repository GitHub.

---

## 1️⃣ Créer un Repository GitHub

### Étape 1: Créer le repository
1. Allez sur [github.com](https://github.com)
2. Cliquez sur **+** (en haut à droite) → **New repository**
3. Remplissez les informations:
   - **Repository name:** `LEAP-app` (ou votre nom)
   - **Description:** `PriceCheck - Comparateur de prix pour Douala`
   - **Public** (pour que tout le monde puisse voir)
   - **Add a README file:** Non (on en a déjà un)
   - **Add .gitignore:** Non (on en a déjà un)
4. Cliquez **Create repository**

### Étape 2: Copier l'URL
Vous verrez une URL comme:
```
https://github.com/YOUR_USERNAME/LEAP-app.git
```

---

## 2️⃣ Pousser le Code sur GitHub

### Depuis votre ordinateur

```bash
# Aller dans le dossier du projet
cd leap/LEAP-app

# Initialiser git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit: PriceCheck application"

# Ajouter le remote GitHub
git remote add origin https://github.com/YOUR_USERNAME/LEAP-app.git

# Renommer la branche en 'main'
git branch -M main

# Pousser le code
git push -u origin main
```

**Remplacez `YOUR_USERNAME` par votre nom d'utilisateur GitHub!**

---

## 3️⃣ Vérifier que le Code est sur GitHub

1. Allez sur votre repository: `https://github.com/YOUR_USERNAME/LEAP-app`
2. Vérifiez que tous les fichiers sont présents
3. Vérifiez que le README s'affiche

---

## 4️⃣ Configurer GitHub Pages (Optionnel)

Si vous voulez déployer sur GitHub Pages:

1. Allez sur votre repository
2. Cliquez sur **Settings** (en haut)
3. Allez à **Pages** (dans le menu de gauche)
4. Sous "Build and deployment":
   - **Source:** Sélectionnez **GitHub Actions**
   - Cliquez **Save**

Le workflow GitHub Actions se déclenche automatiquement à chaque push!

---

## 5️⃣ Configurer les Secrets (Optionnel)

Si vous avez besoin de variables d'environnement:

1. Allez sur **Settings** → **Secrets and variables** → **Actions**
2. Cliquez **New repository secret**
3. Ajoutez vos secrets:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-api.com`
4. Cliquez **Add secret**

---

## 6️⃣ Configurer les Collaborateurs (Optionnel)

Si vous voulez que d'autres personnes contribuent:

1. Allez sur **Settings** → **Collaborators**
2. Cliquez **Add people**
3. Entrez le nom d'utilisateur GitHub
4. Sélectionnez le rôle (Maintainer, Developer, etc.)
5. Cliquez **Add**

---

## 7️⃣ Configurer les Branches (Optionnel)

Pour protéger votre branche main:

1. Allez sur **Settings** → **Branches**
2. Cliquez **Add rule**
3. Entrez `main` comme nom de branche
4. Cochez:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass
5. Cliquez **Create**

---

## 8️⃣ Configurer les Actions (Optionnel)

Pour activer les workflows GitHub Actions:

1. Allez sur **Actions**
2. Vérifiez que le workflow `deploy.yml` est présent
3. Cliquez sur le workflow
4. Vérifiez qu'il s'exécute correctement

---

## 9️⃣ Ajouter un Badge au README (Optionnel)

Pour montrer le status du build:

```markdown
[![Build and Deploy](https://github.com/YOUR_USERNAME/LEAP-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/LEAP-app/actions/workflows/deploy.yml)
```

---

## 🔟 Configurer un Domaine Personnalisé (Optionnel)

Si vous avez un domaine:

1. Allez sur **Settings** → **Pages**
2. Sous "Custom domain":
   - Entrez votre domaine (ex: `pricecheck.cm`)
   - Cliquez **Save**
3. Configurez les DNS records chez votre registraire

---

## 📋 Commandes Git Utiles

```bash
# Voir le status
git status

# Voir l'historique
git log

# Créer une nouvelle branche
git checkout -b feature/ma-feature

# Pousser une branche
git push origin feature/ma-feature

# Créer une Pull Request
# (Allez sur GitHub et cliquez "Compare & pull request")

# Fusionner une branche
git merge feature/ma-feature

# Supprimer une branche
git branch -d feature/ma-feature
```

---

## 🚀 Déploiement Automatique

Une fois que vous avez poussé le code:

1. Le workflow GitHub Actions se déclenche automatiquement
2. Il compile le projet
3. Il déploie sur GitHub Pages (si configuré)
4. Votre site est accessible à: `https://YOUR_USERNAME.github.io/LEAP-app/`

---

## 🐛 Dépannage

### Le code ne se pousse pas
```bash
# Vérifier la configuration git
git config --list

# Vérifier la connexion SSH
ssh -T git@github.com

# Utiliser HTTPS au lieu de SSH
git remote set-url origin https://github.com/YOUR_USERNAME/LEAP-app.git
```

### Le workflow ne s'exécute pas
1. Vérifiez que `.github/workflows/deploy.yml` existe
2. Vérifiez que GitHub Actions est activé
3. Vérifiez les logs dans l'onglet **Actions**

### Le site ne se déploie pas
1. Vérifiez que GitHub Pages est configuré
2. Vérifiez que le workflow s'est exécuté avec succès
3. Attendez quelques minutes (le déploiement peut prendre du temps)

---

## 📚 Documentation Officielle

- [GitHub Docs](https://docs.github.com/)
- [GitHub Pages](https://docs.github.com/en/pages)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Git Documentation](https://git-scm.com/doc)

---

## ✅ Checklist

- [ ] Repository créé sur GitHub
- [ ] Code poussé sur GitHub
- [ ] Tous les fichiers sont présents
- [ ] GitHub Pages configuré (optionnel)
- [ ] Workflow GitHub Actions fonctionne
- [ ] Site accessible en ligne
- [ ] Domaine personnalisé configuré (optionnel)

---

**Félicitations! Votre repository GitHub est prêt!** 🎉

Prochaines étapes:
1. Déployer sur Vercel/Netlify (recommandé)
2. Configurer un domaine personnalisé
3. Ajouter des collaborateurs
4. Commencer à développer!

---

*Guide créé pour PriceCheck - 31 Mai 2026*
