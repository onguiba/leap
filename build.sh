#!/bin/bash
set -e

echo "🔨 Building PriceCheck..."
cd leap/LEAP-app

# Installer les dépendances
npm install --legacy-peer-deps

# Build
npm run build

echo "✅ Build successful!"
