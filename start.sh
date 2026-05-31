#!/bin/bash
set -e

echo "🚀 Starting PriceCheck..."
cd leap/LEAP-app/dist

# Utiliser un serveur HTTP simple
npx http-server -p 3000 -c-1
