#!/bin/bash
set -e

echo "🔨 Building PriceCheck..."
cd leap/LEAP-app
npm install --legacy-peer-deps
npm run build
echo "✅ Build successful!"
