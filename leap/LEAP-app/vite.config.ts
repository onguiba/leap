import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5174,
    strictPort: false,
    host: '0.0.0.0', // ← Permet l'accès depuis le réseau local
    open: false,
    // Désactiver complètement le cache
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store'
    },
    hmr: {
      overlay: true,
      host: 'localhost' // HMR sur localhost
    },
    watch: {
      usePolling: true
    }
  },
  clearScreen: false,
  // Forcer le rechargement des modules
  optimizeDeps: {
    force: true
  },
  build: {
    // Désactiver le cache pour le build
    rollupOptions: {
      output: {
        // Ajouter un hash unique à chaque build
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`
      }
    }
  }
})
