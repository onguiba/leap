# 📱 PriceCheck - Déploiement Mobile

## ✅ Configuration Terminée!

Votre application PriceCheck est maintenant configurée pour le déploiement mobile avec **Capacitor**.

## 🎯 3 Façons d'Installer sur Téléphone

### 1. PWA - Installation Immédiate (30 secondes) ⚡

**La plus rapide! Déjà disponible!**

Sur votre téléphone:
1. Ouvrez Chrome (Android) ou Safari (iPhone)
2. Allez sur: `http://192.168.1.96:5174`
3. Menu → "Ajouter à l'écran d'accueil"
4. ✅ Installé!

**Avantages:**
- Installation instantanée
- Mises à jour automatiques
- Fonctionne comme une app native
- Scanner de code-barre, notifications, etc.

---

### 2. Installation Directe USB (5 minutes) 🔌

**Pour une vraie app Android native**

**Prérequis:**
- Android Studio installé
- Téléphone connecté en USB
- Mode Développeur activé

**Commande:**
```bash
cd leap/LEAP-app
npx cap run android
```

Cela installe automatiquement l'app sur votre téléphone!

---

### 3. Générer un APK (20 minutes) 📦

**Pour distribuer l'app à d'autres personnes**

**Étapes:**
1. Installez Android Studio
2. Ouvrez le projet: `npx cap open android`
3. Build → Build APK(s)
4. L'APK est dans: `android/app/build/outputs/apk/debug/app-debug.apk`
5. Copiez l'APK sur n'importe quel téléphone Android

---

## 📚 Documentation Complète

| Fichier | Description |
|---------|-------------|
| `INSTALLER_SUR_TELEPHONE.txt` | Guide rapide (ce fichier en texte) |
| `INSTALLATION_APK_SIMPLE.md` | Guide pas à pas détaillé |
| `BUILD_APK.md` | Guide avancé avec dépannage |
| `check-android-setup.ps1` | Script de vérification |

---

## 🛠️ Commandes Utiles

```bash
# Compiler l'application web
npm run build

# Synchroniser avec Android
npx cap sync

# Ouvrir dans Android Studio
npx cap open android

# Installer directement sur téléphone
npx cap run android

# Vérifier l'environnement
powershell -ExecutionPolicy Bypass -File check-android-setup.ps1
```

---

## 📁 Structure du Projet

```
leap/LEAP-app/
├── android/                    # Projet Android natif (créé)
├── capacitor.config.ts         # Configuration Capacitor
├── dist/                       # Build de l'application web
├── src/                        # Code source
├── INSTALLER_SUR_TELEPHONE.txt # Guide rapide
├── INSTALLATION_APK_SIMPLE.md  # Guide détaillé
├── BUILD_APK.md                # Guide avancé
└── check-android-setup.ps1     # Script de vérification
```

---

## 🎨 Fonctionnalités Natives

Une fois installée, l'application offre:

✅ Scanner de code-barre (caméra)
✅ Comparaison de prix en temps réel
✅ Panier d'achat
✅ Suivi de commandes
✅ Notifications de promotions
✅ Géolocalisation des magasins
✅ Partage de produits
✅ Mode hors ligne (avec Service Worker)

---

## 🚀 Prochaines Étapes

### Pour Tester Maintenant:
1. Utilisez la **PWA** (Option 1) - Installation immédiate
2. Testez toutes les fonctionnalités
3. Vérifiez le scanner, le panier, etc.

### Pour Distribuer:
1. Installez **Android Studio**
2. Générez l'**APK** (Option 3)
3. Partagez l'APK avec d'autres testeurs

### Pour Publier:
1. Créez un compte **Google Play Developer** ($25)
2. Générez un **APK signé** (voir BUILD_APK.md)
3. Soumettez à Google Play Store

---

## 🐛 Dépannage Rapide

**Le serveur ne démarre pas:**
```bash
npm run dev
```

**L'app ne se connecte pas:**
- Vérifiez que le téléphone est sur le même WiFi
- Vérifiez l'adresse IP: `ipconfig`

**Erreur "SDK not found":**
- Installez Android Studio
- Ou définissez ANDROID_HOME

**Le téléphone n'est pas détecté:**
- Activez "Débogage USB"
- Autorisez l'ordinateur sur le téléphone

---

## 📊 Comparaison des Options

| Option | Temps | Difficulté | Distribution |
|--------|-------|------------|--------------|
| PWA | 30 sec | Très facile | Lien web |
| USB Direct | 5 min | Facile | Non |
| APK | 20 min | Moyenne | Fichier APK |

---

## 🎯 Recommandation

**Pour vous (test):**
→ Utilisez la **PWA** (Option 1)

**Pour distribuer:**
→ Générez l'**APK** (Option 3)

**Pour publier:**
→ Consultez **BUILD_APK.md**

---

## 📱 Serveur Actif

Votre serveur de développement est actuellement actif sur:

- **Local:** http://localhost:5174
- **Réseau:** http://192.168.1.96:5174

Accédez à cette adresse depuis votre téléphone pour tester l'application!

---

## 💡 Astuces

1. **Testez d'abord en PWA** - C'est le plus rapide
2. **Utilisez le débogage USB** - Pour voir les logs en temps réel
3. **Activez le mode développeur** - Pour déboguer facilement
4. **Partagez l'APK** - Pour avoir des retours avant de publier

---

## 🔗 Liens Utiles

- [Documentation Capacitor](https://capacitorjs.com/docs)
- [Android Studio](https://developer.android.com/studio)
- [Guide Google Play](https://support.google.com/googleplay/android-developer)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

---

**Votre application est prête pour le mobile!** 🎉

Choisissez l'option qui vous convient et commencez à tester! 📱✨
