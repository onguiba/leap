import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques du build
const distPath = join(__dirname, 'leap/LEAP-app/dist');

console.log(`📁 Serving files from: ${distPath}`);

// Middleware pour servir les fichiers statiques
app.use(express.static(distPath, {
  maxAge: '1d',
  etag: false
}));

// Rediriger toutes les routes vers index.html (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(join(distPath, 'index.html'), (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(404).send('File not found');
    }
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
});

// Démarrer le serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${distPath}`);
});
