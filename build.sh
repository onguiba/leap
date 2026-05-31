#!/bin/bash
set -e

echo "🔨 Building PriceCheck..."
cd leap/LEAP-app

# Nettoyer les anciens fichiers
rm -rf node_modules package-lock.json

# Installer les dépendances
npm install

# Corriger les vulnérabilités
npm audit fix --force

# Build
npm run build

echo "✅ Build successful!"
