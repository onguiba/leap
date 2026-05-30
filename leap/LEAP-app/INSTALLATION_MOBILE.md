# 📱 Guide d'Installation Mobile - PriceCheck

## Méthode 1: Installation PWA (Recommandé - Déjà Prêt!)

### ✅ Avantages
- Installation immédiate (30 secondes)
- Mises à jour automatiques
- Fonctionne comme une app native
- Pas besoin de Google Play Store

### 📱 Sur Android (Chrome)

1. **Ouvrir l'application**
   - Ouvrez Chrome sur votre téléphone
   - Tapez: `http://192.168.1.96:5174`
   - Attendez que la page charge

2. **Installer l'application**
   - Appuyez sur les **3 points** (⋮) en haut à droite
   - Sélectionnez **"Ajouter à l'écran d'accueil"** ou **"Installer l'application"**
   - Une popup apparaît: "Ajouter PriceCheck à l'écran d'accueil?"
   - Appuyez sur **"Ajouter"** ou **"Installer"**

3. **Utiliser l'application**
   - L'icône PriceCheck apparaît sur votre écran d'accueil
   - Appuyez dessus pour lancer l'app
   - Elle s'ouvre en plein écran comme une vraie app!

### 🍎 Sur iPhone/iPad (Safari)

1. **Ouvrir l'application**
   - Ouvrez Safari (pas Chrome!)
   - Tapez: `http://192.168.1.96:5174`
   - Attendez que la page charge

2. **Installer l'application**
   - Appuyez sur le bouton **Partager** (⎙) en bas de l'écran
   - Faites défiler vers le bas
   - Sélectionnez **"Sur l'écran d'accueil"**
   - Modifiez le nom si vous voulez (par défaut: "PriceCheck")
   - Appuyez sur **"Ajouter"** en haut à droite

3. **Utiliser l'application**
   - L'icône PriceCheck apparaît sur votre écran d'accueil
   - Appuyez dessus pour lancer l'app
   - Elle fonctionne comme une app native!

---

## Méthode 2: Application Native (APK Android)

### 📦 Créer un APK avec Capacitor

Si vous voulez un vrai fichier APK à installer:

#### Étape 1: Installer Capacitor

```bash
cd leap/LEAP-app
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
npx cap init
```

#### Étape 2: Configurer l'application

Répondez aux questions:
- App name: `PriceCheck`
- App ID: `com.pricecheck.app`
- Web directory: `dist`

#### Étape 3: Build et ajouter Android

```bash
npm run build
npx cap add android
npx cap sync
```

#### Étape 4: Ouvrir dans Android Studio

```bash
npx cap open android
```

#### Étape 5: Générer l'APK

Dans Android Studio:
1. Build → Build Bundle(s) / APK(s) → Build APK(s)
2. Attendez la compilation
3. Cliquez sur "locate" pour trouver l'APK
4. Transférez l'APK sur votre téléphone
5. Installez-le (activez "Sources inconnues" si nécessaire)

---

## 🔧 Dépannage

### L'app ne se charge pas sur le téléphone

**Vérifiez:**
1. Votre téléphone est sur le même WiFi que votre PC
2. Le serveur Vite est bien démarré (`npm run dev`)
3. L'adresse IP est correcte (192.168.1.96)
4. Le port 5174 n'est pas bloqué par le pare-feu

**Tester la connexion:**
```bash
# Sur votre PC
ipconfig
# Notez l'adresse IPv4
```

### Le bouton "Ajouter à l'écran d'accueil" n'apparaît pas

**Sur Android:**
- Utilisez Chrome (pas Firefox ou autre)
- Assurez-vous que le site est en HTTPS ou localhost
- Vérifiez que le manifest.json est accessible

**Sur iPhone:**
- Utilisez Safari (pas Chrome!)
- Le bouton est dans le menu Partager (⎙)

### L'app ne fonctionne pas hors ligne

Pour activer le mode hors ligne, il faut ajouter un Service Worker.
Voir le fichier `docs/MOBILE_PWA.md` pour plus de détails.

---

## 📊 Comparaison des Méthodes

| Critère | PWA | APK Natif |
|---------|-----|-----------|
| Temps d'installation | 30 secondes | 10-30 minutes |
| Taille | ~2 MB | ~20-50 MB |
| Mises à jour | Automatiques | Manuelles |
| Permissions | Limitées | Complètes |
| Distribution | Lien web | Fichier APK |
| Stores | Non requis | Optionnel |

---

## 🎯 Recommandation

**Utilisez la Méthode 1 (PWA)** pour:
- Tests rapides
- Développement
- Distribution facile
- Mises à jour fréquentes

**Utilisez la Méthode 2 (APK)** pour:
- Publication sur Google Play Store
- Permissions système avancées
- Distribution hors ligne
- Branding complet

---

## 📱 Fonctionnalités Disponibles

Une fois installée, l'application offre:

✅ Scanner de code-barre (caméra)
✅ Comparaison de prix en temps réel
✅ Panier d'achat
✅ Suivi de commandes
✅ Notifications de promotions
✅ Mode hors ligne (avec Service Worker)
✅ Géolocalisation des magasins
✅ Partage de produits

---

**Besoin d'aide?** Consultez `docs/MOBILE_PWA.md` pour plus de détails! 📚
