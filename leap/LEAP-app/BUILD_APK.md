# 📦 Guide de Génération APK - PriceCheck

## ✅ Configuration Terminée!

Capacitor est maintenant configuré. Voici comment générer l'APK.

## 🚀 Méthode 1: Avec Android Studio (Recommandé)

### Étape 1: Ouvrir le projet Android

```bash
npx cap open android
```

Cela va ouvrir Android Studio avec votre projet.

### Étape 2: Attendre la synchronisation Gradle

Android Studio va automatiquement:
- Télécharger les dépendances
- Synchroniser le projet
- Indexer les fichiers

⏱️ Cela peut prendre 5-10 minutes la première fois.

### Étape 3: Générer l'APK

Dans Android Studio:

1. **Menu Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Attendez la compilation (2-5 minutes)
3. Une notification apparaît: **"APK(s) generated successfully"**
4. Cliquez sur **"locate"** pour trouver l'APK

### Étape 4: Localiser l'APK

L'APK se trouve dans:
```
leap/LEAP-app/android/app/build/outputs/apk/debug/app-debug.apk
```

### Étape 5: Installer sur votre téléphone

**Option A: Via USB**
1. Connectez votre téléphone en USB
2. Activez le "Mode Développeur" sur Android:
   - Paramètres → À propos du téléphone
   - Appuyez 7 fois sur "Numéro de build"
3. Activez "Débogage USB"
4. Dans Android Studio: **Run** → **Run 'app'**

**Option B: Transfert manuel**
1. Copiez `app-debug.apk` sur votre téléphone
2. Ouvrez le fichier sur votre téléphone
3. Autorisez "Sources inconnues" si demandé
4. Installez l'application

---

## 🔧 Méthode 2: Ligne de Commande (Sans Android Studio)

### Prérequis

Installez Android SDK:
- Téléchargez: https://developer.android.com/studio#command-tools
- Ou installez Android Studio (plus simple)

### Générer l'APK

```bash
cd leap/LEAP-app/android
./gradlew assembleDebug
```

L'APK sera dans:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📱 Méthode 3: Installation Directe (Plus Rapide)

Si vous voulez juste tester rapidement:

```bash
# Connectez votre téléphone en USB
# Activez le débogage USB

# Installez directement
npx cap run android
```

Cela va:
1. Builder l'app
2. Générer l'APK
3. L'installer automatiquement sur votre téléphone
4. Lancer l'application

---

## 🎨 Personnalisation de l'Icône

### Créer les icônes

1. Créez une icône 1024x1024px
2. Utilisez un générateur en ligne:
   - https://icon.kitchen/
   - https://www.appicon.co/

3. Téléchargez les icônes Android
4. Remplacez dans:
   ```
   android/app/src/main/res/
   ├── mipmap-hdpi/
   ├── mipmap-mdpi/
   ├── mipmap-xhdpi/
   ├── mipmap-xxhdpi/
   └── mipmap-xxxhdpi/
   ```

### Modifier le nom de l'app

Éditez `android/app/src/main/res/values/strings.xml`:

```xml
<resources>
    <string name="app_name">PriceCheck</string>
    <string name="title_activity_main">PriceCheck</string>
    <string name="package_name">com.pricecheck.app</string>
    <string name="custom_url_scheme">com.pricecheck.app</string>
</resources>
```

---

## 🔐 APK Signé (Pour Production)

Pour publier sur Google Play Store:

### 1. Créer une clé de signature

```bash
keytool -genkey -v -keystore pricecheck-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias pricecheck
```

### 2. Configurer Gradle

Créez `android/key.properties`:

```properties
storePassword=VOTRE_MOT_DE_PASSE
keyPassword=VOTRE_MOT_DE_PASSE
keyAlias=pricecheck
storeFile=../pricecheck-release-key.jks
```

### 3. Modifier `android/app/build.gradle`

Ajoutez avant `android {`:

```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Dans `android { ... }`, ajoutez:

```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
        storePassword keystoreProperties['storePassword']
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

### 4. Générer l'APK signé

```bash
cd android
./gradlew assembleRelease
```

L'APK signé sera dans:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 🐛 Dépannage

### Erreur: "SDK not found"

Installez Android Studio ou définissez `ANDROID_HOME`:

```bash
# Windows
setx ANDROID_HOME "C:\Users\VOTRE_NOM\AppData\Local\Android\Sdk"

# Linux/Mac
export ANDROID_HOME=$HOME/Android/Sdk
```

### Erreur: "Gradle sync failed"

Dans Android Studio:
- File → Invalidate Caches / Restart
- Ou supprimez `android/.gradle` et resynchronisez

### L'app crash au démarrage

Vérifiez les logs:

```bash
npx cap run android -l
```

Ou dans Android Studio: **View → Tool Windows → Logcat**

### Permissions caméra/localisation

Éditez `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.INTERNET" />
```

---

## 📊 Taille de l'APK

- **Debug APK**: ~20-30 MB
- **Release APK**: ~10-15 MB (avec minification)
- **AAB (Android App Bundle)**: ~8-12 MB

Pour réduire la taille:
1. Utilisez le format AAB pour Google Play
2. Activez ProGuard/R8
3. Supprimez les ressources inutilisées

---

## 🚀 Prochaines Étapes

1. **Tester l'APK** sur plusieurs appareils
2. **Optimiser les performances**
3. **Ajouter un splash screen**
4. **Configurer les notifications push**
5. **Publier sur Google Play Store**

---

## 📚 Ressources

- [Documentation Capacitor](https://capacitorjs.com/docs)
- [Guide Android Studio](https://developer.android.com/studio/build/building-cmdline)
- [Publication Google Play](https://support.google.com/googleplay/android-developer/answer/9859152)

---

**Votre application native est prête!** 🎉📱
