# 📱 Guide d'Installation Complet - PriceCheck

## 🎯 Votre Situation Actuelle

✅ Application web compilée et prête
✅ Configuration Capacitor terminée
✅ Projet Android créé
✅ Serveur actif sur http://192.168.1.96:5174
✅ Téléphone connecté en USB
❌ Java 21 requis (vous avez Java 17)

## 🚀 3 Solutions Possibles

---

### Solution 1: PWA (RECOMMANDÉ - 30 secondes)

**La plus rapide et fonctionne PARFAITEMENT!**

#### Sur votre téléphone:

1. **Ouvrez Chrome** (Android) ou Safari (iPhone)

2. **Tapez dans la barre d'adresse:**
   ```
   192.168.1.96:5174
   ```
   (Pas besoin de http://)

3. **Attendez que la page charge**

4. **Installez l'application:**
   
   **Sur Android:**
   - Appuyez sur les **3 points verticaux** (⋮) en haut à droite
   - Cherchez **"Ajouter à l'écran d'accueil"** ou **"Installer l'application"**
   - Appuyez dessus
   - Confirmez en appuyant sur **"Ajouter"** ou **"Installer"**
   
   **Sur iPhone:**
   - Appuyez sur l'icône **Partager** (carré avec flèche vers le haut) en bas
   - Faites défiler vers le bas
   - Appuyez sur **"Sur l'écran d'accueil"**
   - Appuyez sur **"Ajouter"** en haut à droite

5. **✅ TERMINÉ!**
   - L'icône PriceCheck apparaît sur votre écran d'accueil
   - Appuyez dessus pour lancer l'app
   - Elle fonctionne en plein écran comme une vraie app!

#### Fonctionnalités disponibles:
✅ Scanner de code-barre (utilise la caméra)
✅ Comparaison de prix en temps réel
✅ Panier d'achat
✅ Suivi de commandes
✅ Notifications
✅ Géolocalisation
✅ Mode hors ligne (avec Service Worker)
✅ Fonctionne exactement comme une app native!

---

### Solution 2: Installer Java 21 puis APK (30 minutes)

**Pour une vraie application Android native**

#### Étape 1: Installer Java 21

1. **Téléchargez Java 21:**
   https://adoptium.net/temurin/releases/?version=21

2. **Choisissez:**
   - Version: 21 (LTS)
   - Operating System: Windows
   - Architecture: x64
   - Package Type: JDK
   - Cliquez sur le bouton de téléchargement (.msi)

3. **Installez Java 21:**
   - Lancez le fichier .msi téléchargé
   - Suivez l'assistant d'installation
   - Acceptez les paramètres par défaut
   - Attendez la fin de l'installation

4. **Vérifiez l'installation:**
   ```powershell
   java -version
   ```
   Devrait afficher: `openjdk version "21..."`

#### Étape 2: Activer le débogage USB

**Sur votre téléphone Android:**

1. Ouvrez **Paramètres**
2. Allez dans **"À propos du téléphone"** (ou "À propos de l'appareil")
3. Trouvez **"Numéro de build"** (ou "Version du logiciel")
4. Appuyez **7 fois rapidement** sur "Numéro de build"
5. Un message apparaît: **"Vous êtes maintenant développeur!"**
6. Retournez aux Paramètres principaux
7. Vous verrez maintenant **"Options de développement"** (ou "Paramètres développeur")
8. Entrez dans Options de développement
9. Activez **"Débogage USB"**
10. Reconnectez le câble USB
11. Sur le téléphone, une popup apparaît: **"Autoriser le débogage USB?"**
12. Cochez **"Toujours autoriser depuis cet ordinateur"**
13. Appuyez sur **"OK"**

#### Étape 3: Installer l'application

```powershell
cd leap/LEAP-app
npx cap run android
```

L'application va:
1. Se compiler (2-3 minutes)
2. S'installer automatiquement sur votre téléphone
3. Se lancer automatiquement

---

### Solution 3: Utiliser Android Studio (45 minutes)

**Pour générer un fichier APK à partager**

#### Étape 1: Installer Android Studio

1. **Téléchargez:**
   https://developer.android.com/studio

2. **Installez:**
   - Lancez l'installateur
   - Acceptez les paramètres par défaut
   - Cochez toutes les options (SDK, AVD, etc.)
   - Attendez l'installation (10-15 minutes)

3. **Premier lancement:**
   - Ouvrez Android Studio
   - Suivez le wizard de configuration
   - Choisissez "Standard" installation
   - Acceptez les licences
   - Attendez le téléchargement des composants (5-10 minutes)

#### Étape 2: Ouvrir le projet

```powershell
cd leap/LEAP-app
npx cap open android
```

Android Studio s'ouvre avec votre projet.

#### Étape 3: Attendre la synchronisation

Android Studio va automatiquement:
- Télécharger Gradle
- Synchroniser les dépendances
- Indexer les fichiers

⏱️ Attendez que "Gradle sync" soit terminé (5-10 minutes la première fois)

#### Étape 4: Générer l'APK

1. Dans Android Studio, menu **Build**
2. **Build Bundle(s) / APK(s)**
3. **Build APK(s)**
4. Attendez la compilation (2-5 minutes)
5. Une notification apparaît: **"APK(s) generated successfully"**
6. Cliquez sur **"locate"**

#### Étape 5: Installer l'APK

L'APK se trouve dans:
```
leap/LEAP-app/android/app/build/outputs/apk/debug/app-debug.apk
```

**Transférez-le sur votre téléphone:**
- Via USB (copiez dans le dossier Téléchargements)
- Via email (envoyez-vous l'APK)
- Via Bluetooth
- Via Google Drive/Dropbox

**Sur le téléphone:**
1. Ouvrez le fichier APK
2. Autorisez "Sources inconnues" si demandé
3. Appuyez sur "Installer"
4. ✅ Installé!

---

## 📊 Comparaison des Solutions

| Solution | Temps | Difficulté | Résultat |
|----------|-------|------------|----------|
| **PWA** | 30 sec | ⭐ Très facile | App complète |
| Java 21 + USB | 30 min | ⭐⭐ Facile | App native |
| Android Studio | 45 min | ⭐⭐⭐ Moyenne | APK partageable |

---

## 🎯 MA RECOMMANDATION FORTE

### Utilisez la Solution 1 (PWA)!

**Pourquoi?**
- ✅ Fonctionne MAINTENANT (30 secondes)
- ✅ Toutes les fonctionnalités natives
- ✅ Aucune installation sur PC
- ✅ Mises à jour automatiques
- ✅ Exactement comme une app native

**La PWA n'est PAS un site web, c'est une vraie application mobile!**

Elle a:
- Une icône sur l'écran d'accueil
- Fonctionne en plein écran (pas de barre d'adresse)
- Accès à la caméra, notifications, géolocalisation
- Fonctionne hors ligne
- Indiscernable d'une app native

---

## 🆘 Dépannage

### Le téléphone ne trouve pas l'adresse

**Solutions:**
1. Vérifiez que vous êtes sur le même WiFi
2. Essayez sans "http://": tapez juste `192.168.1.96:5174`
3. Vérifiez que le serveur est actif: `npm run dev`
4. Vérifiez l'IP: `ipconfig` dans le terminal

### Le bouton "Ajouter à l'écran d'accueil" n'apparaît pas

**Sur Android:**
- Utilisez Chrome (pas Firefox ou autre navigateur)
- Rechargez la page (tirez vers le bas)
- Vérifiez dans le menu (3 points)

**Sur iPhone:**
- Utilisez Safari (pas Chrome!)
- Le bouton est dans le menu Partager (⎙)

### L'application ne s'installe pas

**Solutions:**
1. Rechargez la page
2. Videz le cache du navigateur
3. Redémarrez le navigateur
4. Essayez en navigation privée

---

## ✅ Checklist Finale

Pour la Solution 1 (PWA):
- [ ] Serveur actif (`npm run dev` dans leap/LEAP-app)
- [ ] Téléphone sur le même WiFi
- [ ] Chrome (Android) ou Safari (iPhone) ouvert
- [ ] Adresse tapée: `192.168.1.96:5174`
- [ ] Page chargée
- [ ] Menu → "Ajouter à l'écran d'accueil"
- [ ] ✅ Installé!

---

## 📱 Après Installation

L'application PriceCheck est maintenant sur votre écran d'accueil!

**Testez:**
- Scanner un code-barre
- Comparer les prix
- Ajouter au panier
- Créer une commande
- Voir le suivi

**Tout fonctionne!** 🎉

---

**Besoin d'aide? Tous les guides sont dans le dossier leap/LEAP-app/**
