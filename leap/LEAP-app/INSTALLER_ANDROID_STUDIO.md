# 🎨 Installation d'Android Studio - Guide Rapide

## ⚠️ Problème Actuel

L'installation directe via USB nécessite Android Studio et Android SDK.

**Erreur rencontrée:**
```
SDK location not found. Define a valid SDK location with an ANDROID_HOME environment variable
```

## 📥 Solution: Installer Android Studio

### Étape 1: Télécharger Android Studio

**Lien de téléchargement:**
https://developer.android.com/studio

**Taille:**
- Téléchargement: ~1 GB
- Installation complète: ~3-4 GB

**Temps:**
- Téléchargement: 5-15 minutes (selon votre connexion)
- Installation: 10-15 minutes

### Étape 2: Installer Android Studio

1. **Lancez l'installateur** téléchargé
2. **Acceptez les paramètres par défaut**
3. **Cochez toutes les options:**
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device
4. **Cliquez sur "Next" puis "Install"**
5. **Attendez la fin de l'installation**

### Étape 3: Premier Lancement

1. **Ouvrez Android Studio**
2. **Suivez le wizard de configuration:**
   - Choisissez "Standard" installation
   - Acceptez les licences
   - Attendez le téléchargement des composants SDK
3. **Temps: 5-10 minutes**

### Étape 4: Vérifier l'Installation

Android Studio va automatiquement configurer:
- ✅ Android SDK
- ✅ ANDROID_HOME
- ✅ ADB (Android Debug Bridge)
- ✅ Gradle

### Étape 5: Activer le Débogage USB sur votre Téléphone

**Sur votre téléphone Android:**

1. **Ouvrez les Paramètres**
2. **Allez dans "À propos du téléphone"**
3. **Appuyez 7 fois sur "Numéro de build"**
   - Un message apparaît: "Vous êtes maintenant développeur!"
4. **Retour → Options de développement**
5. **Activez "Débogage USB"**
6. **Connectez le téléphone en USB**
7. **Sur le téléphone, autorisez le débogage USB**
   - Une popup apparaît: "Autoriser le débogage USB?"
   - Cochez "Toujours autoriser depuis cet ordinateur"
   - Appuyez sur "OK"

### Étape 6: Installer l'Application

Une fois Android Studio installé:

```bash
cd leap/LEAP-app
npx cap run android
```

Cela va:
1. ✅ Compiler l'application
2. ✅ Générer l'APK
3. ✅ L'installer automatiquement sur votre téléphone
4. ✅ Lancer l'application

**Temps: 3-5 minutes**

---

## 🚀 Alternative: PWA (Sans Android Studio)

**En attendant l'installation d'Android Studio, utilisez la PWA:**

### Sur votre téléphone:

1. **Ouvrez Chrome** (Android) ou **Safari** (iPhone)
2. **Tapez:** `http://192.168.1.96:5174`
3. **Menu → "Ajouter à l'écran d'accueil"**
4. **✅ Installé en 30 secondes!**

**Avantages:**
- Installation immédiate
- Fonctionne comme une app native
- Scanner de code-barre
- Notifications
- Mode hors ligne

---

## 📊 Comparaison

| Méthode | Temps Setup | Avantages |
|---------|-------------|-----------|
| PWA | 30 secondes | Immédiat, aucune installation PC |
| APK natif | 30 minutes | App native complète, Google Play |

---

## 🎯 Recommandation

**Maintenant:**
→ Utilisez la **PWA** (30 secondes)

**Plus tard:**
→ Installez **Android Studio** pour l'APK natif

---

## 🔗 Liens Utiles

- **Android Studio:** https://developer.android.com/studio
- **Guide d'installation:** https://developer.android.com/studio/install
- **Documentation Capacitor:** https://capacitorjs.com/docs

---

## ✅ Checklist

Après installation d'Android Studio:

- [ ] Android Studio installé
- [ ] SDK téléchargé
- [ ] Mode Développeur activé sur le téléphone
- [ ] Débogage USB activé
- [ ] Téléphone connecté en USB
- [ ] Autorisation accordée sur le téléphone

Ensuite:
```bash
npx cap run android
```

---

**Votre application sera installée sur votre téléphone!** 🎉📱
