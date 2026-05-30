# 📱 Installation APK - Guide Simple

## ✅ Configuration Capacitor Terminée!

Votre application est prête à être compilée en APK Android natif.

## 🎯 Deux Options Simples

---

## Option 1: Avec Android Studio (Recommandé)

### Étape 1: Installer Android Studio

1. **Téléchargez Android Studio:**
   - https://developer.android.com/studio
   - Téléchargement: ~1 GB
   - Installation: ~3 GB

2. **Installez Android Studio:**
   - Lancez l'installateur
   - Acceptez les paramètres par défaut
   - Attendez l'installation (10-15 minutes)

3. **Premier lancement:**
   - Ouvrez Android Studio
   - Suivez le wizard de configuration
   - Installez Android SDK (automatique)

### Étape 2: Ouvrir votre projet

Dans le terminal (depuis `leap/LEAP-app`):

```bash
npx cap open android
```

Ou manuellement:
- Android Studio → Open
- Sélectionnez: `leap/LEAP-app/android`

### Étape 3: Attendre la synchronisation

Android Studio va:
- Télécharger les dépendances Gradle
- Synchroniser le projet
- Indexer les fichiers

⏱️ **Première fois: 5-10 minutes**

### Étape 4: Générer l'APK

1. Menu **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Attendez la compilation (2-5 minutes)
3. Notification: **"APK(s) generated successfully"**
4. Cliquez sur **"locate"**

### Étape 5: Installer sur votre téléphone

**L'APK est ici:**
```
leap/LEAP-app/android/app/build/outputs/apk/debug/app-debug.apk
```

**Installation:**
1. Copiez `app-debug.apk` sur votre téléphone (USB, email, etc.)
2. Sur votre téléphone, ouvrez le fichier APK
3. Autorisez "Sources inconnues" si demandé
4. Appuyez sur "Installer"
5. **C'est installé!** 🎉

---

## Option 2: Installation Directe via USB (Plus Rapide)

### Prérequis

1. **Android Studio installé** (voir Option 1, Étape 1)
2. **Téléphone connecté en USB**
3. **Mode Développeur activé:**
   - Paramètres → À propos du téléphone
   - Appuyez 7 fois sur "Numéro de build"
   - Retour → Options de développement
   - Activez "Débogage USB"

### Installation

Dans le terminal (depuis `leap/LEAP-app`):

```bash
npx cap run android
```

Cela va:
1. ✅ Builder l'application
2. ✅ Générer l'APK
3. ✅ L'installer sur votre téléphone
4. ✅ Lancer l'application automatiquement

⏱️ **Temps total: 3-5 minutes**

---

## 🚀 Option 3: Service en Ligne (Sans Installation)

Si vous ne voulez pas installer Android Studio:

### EAS Build (Expo)

```bash
npm install -g eas-cli
eas build --platform android
```

### AppFlow (Ionic)

1. Créez un compte: https://ionic.io/appflow
2. Connectez votre projet
3. Build dans le cloud

---

## 📦 Fichiers Générés

Après la compilation, vous aurez:

```
android/app/build/outputs/apk/debug/
└── app-debug.apk  (~20-30 MB)
```

**Cet APK peut être:**
- ✅ Installé sur n'importe quel téléphone Android
- ✅ Partagé avec d'autres personnes
- ✅ Testé sans connexion internet
- ❌ Pas encore prêt pour Google Play Store (version debug)

---

## 🎨 Personnalisation (Optionnel)

### Changer le nom de l'app

Éditez `android/app/src/main/res/values/strings.xml`:

```xml
<string name="app_name">PriceCheck</string>
```

### Changer l'icône

Remplacez les icônes dans:
```
android/app/src/main/res/
├── mipmap-hdpi/ic_launcher.png
├── mipmap-mdpi/ic_launcher.png
├── mipmap-xhdpi/ic_launcher.png
├── mipmap-xxhdpi/ic_launcher.png
└── mipmap-xxxhdpi/ic_launcher.png
```

Utilisez un générateur: https://icon.kitchen/

### Changer la couleur de démarrage

Éditez `capacitor.config.ts`:

```typescript
SplashScreen: {
  backgroundColor: "#00d084",  // Votre couleur
}
```

---

## 🐛 Problèmes Courants

### "SDK location not found"

**Solution:** Installez Android Studio (Option 1, Étape 1)

### "Gradle sync failed"

**Solution:** 
1. Supprimez `android/.gradle`
2. Dans Android Studio: File → Invalidate Caches / Restart

### L'app crash au démarrage

**Solution:** Vérifiez les logs:
```bash
npx cap run android -l
```

### Téléphone non détecté

**Solution:**
1. Vérifiez le câble USB
2. Activez "Débogage USB"
3. Autorisez l'ordinateur sur le téléphone

---

## 📊 Comparaison des Options

| Option | Temps Setup | Temps Build | Difficulté |
|--------|-------------|-------------|------------|
| Android Studio | 20 min | 5 min | Facile |
| USB Direct | 20 min | 3 min | Très facile |
| Service en ligne | 5 min | 10 min | Facile |

---

## ✅ Checklist

Avant de générer l'APK:

- [ ] Node.js installé
- [ ] `npm run build` fonctionne
- [ ] Capacitor configuré (`npx cap sync`)
- [ ] Android Studio installé (Option 1)
- [ ] Téléphone en mode développeur (Option 2)

---

## 🎯 Recommandation

**Pour tester rapidement:**
→ Utilisez **Option 2** (Installation directe via USB)

**Pour distribuer l'APK:**
→ Utilisez **Option 1** (Android Studio)

**Pour publier sur Google Play:**
→ Consultez `BUILD_APK.md` (APK signé)

---

## 📱 Après l'Installation

Une fois l'app installée sur votre téléphone:

✅ Fonctionne comme une vraie app native
✅ Icône sur l'écran d'accueil
✅ Scanner de code-barre avec la caméra
✅ Notifications (si configurées)
✅ Fonctionne hors ligne (avec Service Worker)
✅ Accès aux fonctionnalités natives Android

---

## 🚀 Prochaines Étapes

1. **Testez l'application** sur votre téléphone
2. **Partagez l'APK** avec d'autres testeurs
3. **Collectez les retours**
4. **Optimisez et corrigez**
5. **Publiez sur Google Play Store**

---

**Besoin d'aide?**
- Documentation Capacitor: https://capacitorjs.com/docs
- Guide Android: https://developer.android.com/studio

**Votre app native est prête à être compilée!** 🎉📱
