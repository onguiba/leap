#!/bin/bash
set -e

echo "🔨 Building PriceCheck..."
cd leap/LEAP-app
npm install
npm run build
echo "✅ Build successful!"
