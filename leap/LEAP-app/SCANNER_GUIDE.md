# Guide du Scanner de Code-Barres

## Nouvelles Fonctionnalités

### 📸 Capture d'Image depuis la Caméra

Le scanner a été amélioré pour permettre la capture et l'affichage d'images :

#### Comment ça marche :

1. **Ouvrir la caméra**
   - Cliquez sur le bouton "Ouvrir la caméra"
   - La caméra s'active automatiquement
   - Le flux vidéo en direct s'affiche à l'écran

2. **Capturer l'image**
   - Pointez la caméra vers le code-barres du produit
   - Cliquez sur le bouton "📸 Capturer l'image"
   - L'image est capturée et affichée immédiatement

3. **Analyse automatique**
   - L'image capturée est affichée à l'écran
   - Le système analyse automatiquement le code-barres
   - Les résultats de comparaison de prix s'affichent

4. **Autres options**
   - Bouton "Arrêter" : ferme la caméra et revient aux options
   - Bouton "✕" sur l'image : ferme l'aperçu de l'image
   - "Galerie photo" : sélectionner une image existante
   - Saisie manuelle : entrer le code-barres manuellement

## Fonctionnalités Techniques

### Modifications apportées :

1. **scanner.ts**
   - Fonction `startCamera()` : ouvre la caméra avec le flux vidéo
   - Fonction `captureImage()` : capture l'image depuis la vidéo et l'affiche
   - Fonction `stopCamera()` : arrête proprement le flux vidéo
   - Gestion des événements pour les boutons de capture

2. **pages.ts**
   - Ajout du bouton "Capturer l'image" dans l'interface
   - Amélioration de la mise en page des contrôles vidéo
   - Canvas caché pour la capture d'image

### Flux de travail :

```
Clic "Ouvrir la caméra"
    ↓
Caméra activée → Flux vidéo affiché
    ↓
Clic "Capturer l'image"
    ↓
Image capturée → Canvas → Image affichée
    ↓
Analyse du code-barres (simulation)
    ↓
Résultats de comparaison de prix
```

## Test de la Fonctionnalité

Pour tester :

1. Lancez l'application : `npm run dev`
2. Naviguez vers la page Scanner
3. Cliquez sur "Ouvrir la caméra"
4. Autorisez l'accès à la caméra si demandé
5. Pointez vers un code-barres
6. Cliquez sur "Capturer l'image"
7. Vérifiez que l'image s'affiche correctement
8. Attendez l'analyse automatique

## Notes Importantes

- La caméra utilise `facingMode: 'environment'` pour utiliser la caméra arrière sur mobile
- L'image est capturée en format JPEG avec qualité 90%
- Le canvas est utilisé pour convertir le flux vidéo en image statique
- La simulation détecte automatiquement après 2 secondes (à remplacer par une vraie détection)
